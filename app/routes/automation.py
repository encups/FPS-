"""
Automation endpoints for triggering weekly workflows.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import logging
from app.database import get_db
from app.services.automation_service import automation_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/automation", tags=["automation"])


@router.post("/run-weekly")
def run_weekly_automation(db: Session = Depends(get_db)):
    """
    Manually trigger the weekly automation workflow.

    Runs the complete automation for all active clients:
    1. Generate weekly content (OpenAI)
    2. Schedule posts (Buffer)
    3. Generate PDF reports
    4. Send email reports (MailerLite)

    This endpoint can be:
    - Called manually for testing
    - Triggered by Replit's cron scheduler
    - Integrated with external scheduling services

    Returns detailed results for each client processed.
    """
    logger.info("Manual weekly automation triggered")

    results = automation_service.run_weekly_automation(db)

    return {
        "message": "Weekly automation completed",
        "summary": {
            "total_clients": results["total_clients"],
            "successful": results["successful"],
            "failed": results["failed"]
        },
        "details": results["client_results"]
    }
