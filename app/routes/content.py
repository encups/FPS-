"""
Content generation and management API routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import logging
import os
from typing import List
from app.database import get_db
from app.models import Client, ContentItem, WeeklyReport
from app.schemas import (
    GenerateWeeklyContentRequest,
    ScheduleBufferRequest,
    GenerateWeeklyReportRequest,
    SendWeeklyReportEmailRequest,
    ContentItemResponse,
    WeeklyReportResponse,
    MessageResponse
)
from app.services.openai_service import openai_service
from app.services.buffer_service import buffer_service
from app.services.pdf_service import pdf_service
from app.services.mailerlite_service import mailerlite_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/clients/{client_id}", tags=["content"])


@router.post("/generate-weekly-content", response_model=List[ContentItemResponse])
def generate_weekly_content(
    client_id: int,
    request: GenerateWeeklyContentRequest,
    db: Session = Depends(get_db)
):
    """
    Generate a week's worth of AI content for a client.

    Uses OpenAI GPT-4 to generate:
    - 5 feed posts
    - 5 reels scripts
    - 5 TikTok scripts
    - 5 story ideas

    Content is tailored to the client's niche, goals, and brand voice.
    All generated content is saved to the database.
    """
    try:
        # Get client
        client = db.query(Client).filter(Client.id == client_id).first()
        if not client:
            raise HTTPException(status_code=404, detail=f"Client {client_id} not found")

        # Parse week start date
        week_start_date = datetime.strptime(request.week_start_date, "%Y-%m-%d")

        # Check if content already exists for this week
        existing_content = db.query(ContentItem).filter(
            ContentItem.client_id == client_id,
            ContentItem.created_for_week == week_start_date
        ).first()

        if existing_content:
            logger.warning(f"Content already exists for client {client_id} week {request.week_start_date}")
            # Return existing content
            all_content = db.query(ContentItem).filter(
                ContentItem.client_id == client_id,
                ContentItem.created_for_week == week_start_date
            ).all()
            return all_content

        # Get previous content for context
        previous_content = db.query(ContentItem).filter(
            ContentItem.client_id == client_id
        ).order_by(ContentItem.created_at.desc()).limit(10).all()

        previous_texts = [item.content_text for item in previous_content]

        # Generate content using OpenAI
        logger.info(f"Generating weekly content for client {client_id}")
        generated_content = openai_service.generate_weekly_content(
            client_name=client.name,
            business_name=client.business_name or "N/A",
            niche=client.niche or "General",
            goals=client.goals or "Increase engagement and brand awareness",
            previous_content=previous_texts
        )

        # Save content to database
        created_items = []

        # Feed posts
        for post_text in generated_content.get("feed_posts", []):
            item = ContentItem(
                client_id=client_id,
                platform="post",
                content_text=post_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        # Reels
        for reel_text in generated_content.get("reels", []):
            item = ContentItem(
                client_id=client_id,
                platform="reel",
                content_text=reel_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        # TikToks
        for tiktok_text in generated_content.get("tiktoks", []):
            item = ContentItem(
                client_id=client_id,
                platform="tiktok",
                content_text=tiktok_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        # Stories
        for story_text in generated_content.get("stories", []):
            item = ContentItem(
                client_id=client_id,
                platform="story",
                content_text=story_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        db.commit()

        # Refresh all items to get IDs
        for item in created_items:
            db.refresh(item)

        logger.info(f"Created {len(created_items)} content items for client {client_id}")
        return created_items

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating content: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error generating content: {str(e)}")


@router.post("/schedule-buffer-for-week", response_model=MessageResponse)
def schedule_buffer_for_week(
    client_id: int,
    request: ScheduleBufferRequest,
    db: Session = Depends(get_db)
):
    """
    Schedule content in Buffer for a specific week.

    Fetches generated content and schedules it across the week
    using the Buffer API. Posts are distributed to avoid
    overwhelming the audience.
    """
    try:
        # Get client
        client = db.query(Client).filter(Client.id == client_id).first()
        if not client:
            raise HTTPException(status_code=404, detail=f"Client {client_id} not found")

        # Parse dates
        week_start_date = datetime.strptime(request.week_start_date, "%Y-%m-%d")
        starting_date = datetime.strptime(request.starting_date, "%Y-%m-%d")

        # Get content items for this week that aren't scheduled yet
        content_items = db.query(ContentItem).filter(
            ContentItem.client_id == client_id,
            ContentItem.created_for_week == week_start_date,
            ContentItem.buffer_post_id.is_(None)
        ).all()

        if not content_items:
            return MessageResponse(
                message="No unscheduled content found for this week",
                details={"scheduled_count": 0}
            )

        # Get Buffer profile (using Instagram as default, can be customized)
        buffer_profile = buffer_service.get_profile_by_service("instagram")

        if not buffer_profile:
            raise HTTPException(
                status_code=400,
                detail="No Buffer profile configured. Please connect a social account in Buffer."
            )

        # Prepare content for scheduling
        content_list = [
            {"id": item.id, "content_text": item.content_text, "platform": item.platform}
            for item in content_items
        ]

        # Schedule in Buffer
        results = buffer_service.schedule_content_batch(
            profile_id=buffer_profile["id"],
            content_items=content_list,
            starting_date=starting_date,
            time_of_day=request.time_of_day
        )

        # Update database with scheduling results
        scheduled_count = 0
        for result in results:
            if result["success"]:
                content_item = db.query(ContentItem).filter(
                    ContentItem.id == result["content_item_id"]
                ).first()

                if content_item:
                    content_item.buffer_post_id = result["buffer_post_id"]
                    content_item.scheduled_time = result["scheduled_time"]
                    scheduled_count += 1

        db.commit()

        logger.info(f"Scheduled {scheduled_count} posts in Buffer for client {client_id}")

        return MessageResponse(
            message=f"Successfully scheduled {scheduled_count} posts in Buffer",
            details={
                "scheduled_count": scheduled_count,
                "total_content": len(content_items),
                "buffer_profile": buffer_profile["service"]
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error scheduling Buffer content: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error scheduling content: {str(e)}")


@router.post("/generate-weekly-report", response_model=WeeklyReportResponse)
def generate_weekly_report(
    client_id: int,
    request: GenerateWeeklyReportRequest,
    db: Session = Depends(get_db)
):
    """
    Generate a PDF report for the week's content.

    Creates a professional PDF summary including:
    - All generated content for the week
    - Scheduled post times
    - Content breakdown by platform
    - Summary statistics
    """
    try:
        # Get client
        client = db.query(Client).filter(Client.id == client_id).first()
        if not client:
            raise HTTPException(status_code=404, detail=f"Client {client_id} not found")

        # Parse week start date
        week_start_date = datetime.strptime(request.week_start_date, "%Y-%m-%d")

        # Check if report already exists
        existing_report = db.query(WeeklyReport).filter(
            WeeklyReport.client_id == client_id,
            WeeklyReport.week_start_date == week_start_date
        ).first()

        if existing_report:
            logger.info(f"Report already exists for client {client_id} week {request.week_start_date}")
            return existing_report

        # Get content items for this week
        content_items = db.query(ContentItem).filter(
            ContentItem.client_id == client_id,
            ContentItem.created_for_week == week_start_date
        ).all()

        if not content_items:
            raise HTTPException(
                status_code=404,
                detail=f"No content found for week {request.week_start_date}"
            )

        # Generate PDF
        logger.info(f"Generating PDF report for client {client_id}")
        pdf_path = pdf_service.generate_weekly_report(
            client_name=client.name,
            client_id=client_id,
            business_name=client.business_name or "N/A",
            week_start_date=week_start_date,
            content_items=content_items
        )

        # Create WeeklyReport record
        base_url = os.getenv("APP_BASE_URL", "http://localhost:8000")
        pdf_url = f"{base_url}/reports/{os.path.basename(pdf_path)}"

        weekly_report = WeeklyReport(
            client_id=client_id,
            week_start_date=week_start_date,
            pdf_url_or_path=pdf_path
        )

        db.add(weekly_report)
        db.commit()
        db.refresh(weekly_report)

        logger.info(f"Created weekly report {weekly_report.id} for client {client_id}")
        return weekly_report

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating report: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")


@router.post("/send-weekly-report-email", response_model=MessageResponse)
def send_weekly_report_email(
    client_id: int,
    request: SendWeeklyReportEmailRequest,
    db: Session = Depends(get_db)
):
    """
    Send the weekly report via email using MailerLite.

    Sends a professional email with:
    - Report summary
    - Link to download PDF
    - Next steps for the client
    """
    try:
        # Get client
        client = db.query(Client).filter(Client.id == client_id).first()
        if not client:
            raise HTTPException(status_code=404, detail=f"Client {client_id} not found")

        # Parse week start date
        week_start_date = datetime.strptime(request.week_start_date, "%Y-%m-%d")

        # Get weekly report
        weekly_report = db.query(WeeklyReport).filter(
            WeeklyReport.client_id == client_id,
            WeeklyReport.week_start_date == week_start_date
        ).first()

        if not weekly_report:
            raise HTTPException(
                status_code=404,
                detail=f"No report found for week {request.week_start_date}. Generate report first."
            )

        if weekly_report.email_sent_at:
            logger.warning(f"Email already sent for report {weekly_report.id}")
            return MessageResponse(
                message="Email was already sent for this report",
                details={
                    "sent_at": weekly_report.email_sent_at.isoformat(),
                    "report_id": weekly_report.id
                }
            )

        # Build PDF URL
        base_url = os.getenv("APP_BASE_URL", "http://localhost:8000")
        pdf_url = f"{base_url}/reports/{os.path.basename(weekly_report.pdf_url_or_path)}"

        # Get content summary
        content_items = db.query(ContentItem).filter(
            ContentItem.client_id == client_id,
            ContentItem.created_for_week == week_start_date
        ).all()

        content_summary = f"This week's package includes {len(content_items)} pieces of content across multiple platforms."

        # Send email
        logger.info(f"Sending weekly report email to {client.email}")
        success = mailerlite_service.send_weekly_report_email(
            to_email=client.email,
            client_name=client.name,
            week_start_date=request.week_start_date,
            pdf_url=pdf_url,
            content_summary=content_summary
        )

        if success:
            weekly_report.email_sent_at = datetime.utcnow()
            db.commit()

            logger.info(f"Sent weekly report email for client {client_id}")
            return MessageResponse(
                message="Weekly report email sent successfully",
                details={
                    "recipient": client.email,
                    "report_id": weekly_report.id
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to send email via MailerLite")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error sending report email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error sending email: {str(e)}")
