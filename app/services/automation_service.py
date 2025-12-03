"""
Weekly automation orchestration service.
Coordinates the full automation workflow for all active clients.
"""
import logging
from datetime import datetime, timedelta
from typing import List, Dict
from sqlalchemy.orm import Session
from app.models import Client, ContentItem, WeeklyReport
from app.services.openai_service import openai_service
from app.services.buffer_service import buffer_service
from app.services.pdf_service import pdf_service
from app.services.mailerlite_service import mailerlite_service
import os

logger = logging.getLogger(__name__)


class AutomationService:
    """
    Service for orchestrating weekly content automation.
    """

    def run_weekly_automation(self, db: Session) -> Dict:
        """
        Run the full weekly automation for all active clients.

        Steps for each active client:
        1. Generate weekly content using OpenAI
        2. Schedule content in Buffer
        3. Generate PDF report
        4. Send report email via MailerLite

        Args:
            db: Database session

        Returns:
            Dictionary with automation results
        """
        logger.info("Starting weekly automation run")

        # Get all active clients
        active_clients = db.query(Client).filter(
            Client.status == "active_client"
        ).all()

        logger.info(f"Found {len(active_clients)} active clients")

        results = {
            "total_clients": len(active_clients),
            "successful": 0,
            "failed": 0,
            "client_results": []
        }

        # Calculate next week's start date (next Monday)
        today = datetime.now()
        days_until_monday = (7 - today.weekday()) % 7
        if days_until_monday == 0:
            days_until_monday = 7
        next_monday = today + timedelta(days=days_until_monday)
        week_start_date = next_monday.replace(hour=0, minute=0, second=0, microsecond=0)

        for client in active_clients:
            logger.info(f"Processing client {client.id}: {client.name}")

            client_result = {
                "client_id": client.id,
                "client_name": client.name,
                "status": "processing",
                "steps_completed": [],
                "errors": []
            }

            try:
                # Step 1: Generate weekly content
                logger.info(f"[Client {client.id}] Generating weekly content")
                content_items = self._generate_content_for_client(
                    db=db,
                    client=client,
                    week_start_date=week_start_date
                )
                client_result["steps_completed"].append("content_generation")
                client_result["content_count"] = len(content_items)

                # Step 2: Schedule in Buffer
                logger.info(f"[Client {client.id}] Scheduling content in Buffer")
                scheduled_count = self._schedule_content_in_buffer(
                    db=db,
                    client=client,
                    content_items=content_items,
                    week_start_date=week_start_date
                )
                client_result["steps_completed"].append("buffer_scheduling")
                client_result["scheduled_count"] = scheduled_count

                # Step 3: Generate PDF report
                logger.info(f"[Client {client.id}] Generating PDF report")
                report = self._generate_pdf_report(
                    db=db,
                    client=client,
                    week_start_date=week_start_date,
                    content_items=content_items
                )
                client_result["steps_completed"].append("pdf_generation")
                client_result["report_id"] = report.id

                # Step 4: Send email report
                logger.info(f"[Client {client.id}] Sending email report")
                email_sent = self._send_email_report(
                    db=db,
                    client=client,
                    report=report,
                    week_start_date=week_start_date
                )
                client_result["steps_completed"].append("email_sent")
                client_result["email_sent"] = email_sent

                client_result["status"] = "success"
                results["successful"] += 1
                logger.info(f"[Client {client.id}] Automation completed successfully")

            except Exception as e:
                error_msg = str(e)
                logger.error(f"[Client {client.id}] Automation failed: {error_msg}")
                client_result["status"] = "failed"
                client_result["errors"].append(error_msg)
                results["failed"] += 1

            results["client_results"].append(client_result)

        logger.info(f"Weekly automation completed: {results['successful']} successful, {results['failed']} failed")
        return results

    def _generate_content_for_client(
        self,
        db: Session,
        client: Client,
        week_start_date: datetime
    ) -> List[ContentItem]:
        """Generate weekly content for a client."""
        # Check if content already exists
        existing_content = db.query(ContentItem).filter(
            ContentItem.client_id == client.id,
            ContentItem.created_for_week == week_start_date
        ).all()

        if existing_content:
            logger.info(f"Content already exists for client {client.id}, using existing")
            return existing_content

        # Get previous content for context
        previous_content = db.query(ContentItem).filter(
            ContentItem.client_id == client.id
        ).order_by(ContentItem.created_at.desc()).limit(10).all()

        previous_texts = [item.content_text for item in previous_content]

        # Generate content
        generated_content = openai_service.generate_weekly_content(
            client_name=client.name,
            business_name=client.business_name or "N/A",
            niche=client.niche or "General",
            goals=client.goals or "Increase engagement and brand awareness",
            previous_content=previous_texts
        )

        # Save to database
        created_items = []

        for post_text in generated_content.get("feed_posts", []):
            item = ContentItem(
                client_id=client.id,
                platform="post",
                content_text=post_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        for reel_text in generated_content.get("reels", []):
            item = ContentItem(
                client_id=client.id,
                platform="reel",
                content_text=reel_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        for tiktok_text in generated_content.get("tiktoks", []):
            item = ContentItem(
                client_id=client.id,
                platform="tiktok",
                content_text=tiktok_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        for story_text in generated_content.get("stories", []):
            item = ContentItem(
                client_id=client.id,
                platform="story",
                content_text=story_text,
                created_for_week=week_start_date
            )
            db.add(item)
            created_items.append(item)

        db.commit()

        for item in created_items:
            db.refresh(item)

        return created_items

    def _schedule_content_in_buffer(
        self,
        db: Session,
        client: Client,
        content_items: List[ContentItem],
        week_start_date: datetime
    ) -> int:
        """Schedule content in Buffer."""
        # Get unscheduled items
        unscheduled_items = [item for item in content_items if not item.buffer_post_id]

        if not unscheduled_items:
            logger.info(f"All content already scheduled for client {client.id}")
            return 0

        # Get Buffer profile
        buffer_profile = buffer_service.get_profile_by_service("instagram")

        if not buffer_profile:
            logger.warning(f"No Buffer profile found for client {client.id}, skipping scheduling")
            return 0

        # Prepare content
        content_list = [
            {"id": item.id, "content_text": item.content_text, "platform": item.platform}
            for item in unscheduled_items
        ]

        # Schedule starting from the week start date
        results = buffer_service.schedule_content_batch(
            profile_id=buffer_profile["id"],
            content_items=content_list,
            starting_date=week_start_date,
            time_of_day="09:00"
        )

        # Update database
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
        return scheduled_count

    def _generate_pdf_report(
        self,
        db: Session,
        client: Client,
        week_start_date: datetime,
        content_items: List[ContentItem]
    ) -> WeeklyReport:
        """Generate PDF report."""
        # Check if report exists
        existing_report = db.query(WeeklyReport).filter(
            WeeklyReport.client_id == client.id,
            WeeklyReport.week_start_date == week_start_date
        ).first()

        if existing_report:
            logger.info(f"Report already exists for client {client.id}")
            return existing_report

        # Generate PDF
        pdf_path = pdf_service.generate_weekly_report(
            client_name=client.name,
            client_id=client.id,
            business_name=client.business_name or "N/A",
            week_start_date=week_start_date,
            content_items=content_items
        )

        # Create report record
        weekly_report = WeeklyReport(
            client_id=client.id,
            week_start_date=week_start_date,
            pdf_url_or_path=pdf_path
        )

        db.add(weekly_report)
        db.commit()
        db.refresh(weekly_report)

        return weekly_report

    def _send_email_report(
        self,
        db: Session,
        client: Client,
        report: WeeklyReport,
        week_start_date: datetime
    ) -> bool:
        """Send email report."""
        if report.email_sent_at:
            logger.info(f"Email already sent for report {report.id}")
            return True

        # Build PDF URL
        base_url = os.getenv("APP_BASE_URL", "http://localhost:8000")
        pdf_url = f"{base_url}/reports/{os.path.basename(report.pdf_url_or_path)}"

        # Get content count for summary
        content_count = db.query(ContentItem).filter(
            ContentItem.client_id == client.id,
            ContentItem.created_for_week == week_start_date
        ).count()

        content_summary = f"This week's package includes {content_count} pieces of content across multiple platforms."

        # Send email
        success = mailerlite_service.send_weekly_report_email(
            to_email=client.email,
            client_name=client.name,
            week_start_date=week_start_date.strftime("%Y-%m-%d"),
            pdf_url=pdf_url,
            content_summary=content_summary
        )

        if success:
            report.email_sent_at = datetime.utcnow()
            db.commit()

        return success


# Singleton instance
automation_service = AutomationService()
