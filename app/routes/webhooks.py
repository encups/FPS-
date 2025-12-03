"""
Webhook endpoints for external integrations.
"""
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import logging
from typing import Dict, Any
from app.database import get_db
from app.models import Client
from app.schemas import TypeformWebhookPayload, MessageResponse
from app.services.notion_service import notion_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/typeform", response_model=MessageResponse)
async def typeform_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Receive new leads from Typeform webhook.

    Processes Typeform submissions and:
    1. Creates a new client record in the database
    2. Syncs the client to Notion CRM
    3. Returns success response

    Expected Typeform payload structure:
    {
        "event_id": "string",
        "event_type": "form_response",
        "form_response": {
            "answers": [
                {
                    "type": "text",
                    "text": "answer",
                    "field": {
                        "id": "field_id",
                        "ref": "field_ref"
                    }
                }
            ]
        }
    }
    """
    try:
        # Parse the incoming JSON payload
        payload = await request.json()
        logger.info(f"Received Typeform webhook: {payload.get('event_type')}")

        # Extract form response data
        form_response = payload.get("form_response", {})
        answers = form_response.get("answers", [])

        # Extract data from answers
        # You'll need to map these based on your actual Typeform field IDs
        client_data = _extract_client_data_from_typeform(answers)

        if not client_data.get("name") or not client_data.get("email"):
            raise HTTPException(
                status_code=400,
                detail="Missing required fields: name and email"
            )

        # Check if client already exists
        existing_client = db.query(Client).filter(Client.email == client_data["email"]).first()

        if existing_client:
            # Update existing client
            for key, value in client_data.items():
                if value:
                    setattr(existing_client, key, value)
            db.commit()
            db.refresh(existing_client)
            client = existing_client
            logger.info(f"Updated existing client: {client.id}")
        else:
            # Create new client with status "lead"
            client = Client(
                name=client_data.get("name"),
                email=client_data.get("email"),
                business_name=client_data.get("business_name"),
                niche=client_data.get("niche"),
                goals=client_data.get("goals"),
                social_handles=client_data.get("social_handles"),
                status="lead"
            )

            db.add(client)
            db.commit()
            db.refresh(client)
            logger.info(f"Created new client: {client.id}")

        # Check if we should mark as active_client
        # (e.g., if all required fields are present)
        if _should_activate_client(client):
            client.status = "active_client"
            db.commit()
            logger.info(f"Activated client: {client.id}")

        # Sync to Notion CRM
        notion_page_id = notion_service.sync_client_to_notion(client)
        if notion_page_id and not client.notion_page_id:
            client.notion_page_id = notion_page_id
            db.commit()
            logger.info(f"Synced client {client.id} to Notion page {notion_page_id}")

        return MessageResponse(
            message="Lead processed successfully",
            details={
                "client_id": client.id,
                "status": client.status,
                "notion_synced": notion_page_id is not None
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing Typeform webhook: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing webhook: {str(e)}")


def _extract_client_data_from_typeform(answers: list) -> Dict[str, Any]:
    """
    Extract client data from Typeform answers.

    This function maps Typeform field references to client fields.
    You'll need to adjust the field mappings based on your actual Typeform setup.

    Args:
        answers: List of Typeform answers

    Returns:
        Dictionary with client data
    """
    client_data = {
        "name": None,
        "email": None,
        "business_name": None,
        "niche": None,
        "goals": None,
        "social_handles": {}
    }

    # Field reference mappings (adjust these to match your Typeform)
    field_mappings = {
        "name": ["name", "full_name", "your_name"],
        "email": ["email", "email_address", "your_email"],
        "business_name": ["business", "business_name", "company"],
        "niche": ["niche", "industry", "sector"],
        "goals": ["goals", "marketing_goals", "objectives"],
        "instagram": ["instagram", "instagram_handle", "ig"],
        "tiktok": ["tiktok", "tiktok_handle", "tt"],
        "facebook": ["facebook", "fb", "facebook_page"]
    }

    for answer in answers:
        field_ref = answer.get("field", {}).get("ref", "").lower()
        field_type = answer.get("type")

        # Get the answer value based on type
        value = None
        if field_type == "email":
            value = answer.get("email")
        elif field_type in ["text", "short_text", "long_text"]:
            value = answer.get("text")
        elif field_type == "choice":
            value = answer.get("choice", {}).get("label")

        if not value:
            continue

        # Map to client data
        for field_name, refs in field_mappings.items():
            if any(ref in field_ref for ref in refs):
                if field_name in ["instagram", "tiktok", "facebook"]:
                    client_data["social_handles"][field_name] = value
                else:
                    client_data[field_name] = value
                break

    return client_data


def _should_activate_client(client: Client) -> bool:
    """
    Determine if a lead should be activated as an active client.

    Args:
        client: Client object

    Returns:
        True if client should be activated
    """
    # Activate if we have name, email, business name, and niche
    required_fields = [
        client.name,
        client.email,
        client.business_name,
        client.niche
    ]

    return all(required_fields)
