"""
Client management API routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import logging
from app.database import get_db
from app.models import Client
from app.schemas import ClientResponse, ClientUpdate, MessageResponse
from app.services.notion_service import notion_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/clients", tags=["clients"])


@router.get("", response_model=List[ClientResponse])
def list_clients(
    status: str = None,
    db: Session = Depends(get_db)
):
    """
    List all clients from the database.

    Query Parameters:
    - status: Optional filter by client status (lead, active_client, inactive)

    Returns list of all clients with their information.
    """
    try:
        query = db.query(Client)

        if status:
            query = query.filter(Client.status == status)

        clients = query.order_by(Client.created_at.desc()).all()
        logger.info(f"Retrieved {len(clients)} clients")

        return clients

    except Exception as e:
        logger.error(f"Error listing clients: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving clients: {str(e)}")


@router.get("/{client_id}", response_model=ClientResponse)
def get_client(
    client_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a single client by ID.

    Returns client information including:
    - Basic details (name, email, business)
    - Status and goals
    - Notion CRM sync status
    - Next content week if available
    """
    try:
        client = db.query(Client).filter(Client.id == client_id).first()

        if not client:
            raise HTTPException(status_code=404, detail=f"Client {client_id} not found")

        logger.info(f"Retrieved client {client_id}")
        return client

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting client {client_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving client: {str(e)}")


@router.put("/{client_id}", response_model=ClientResponse)
def update_client(
    client_id: int,
    client_update: ClientUpdate,
    db: Session = Depends(get_db)
):
    """
    Update client information.

    Allows updating:
    - Name and business details
    - Niche and goals
    - Social media handles
    - Client status

    Changes are automatically synced to Notion CRM.
    """
    try:
        client = db.query(Client).filter(Client.id == client_id).first()

        if not client:
            raise HTTPException(status_code=404, detail=f"Client {client_id} not found")

        # Update fields
        update_data = client_update.dict(exclude_unset=True)

        for field, value in update_data.items():
            setattr(client, field, value)

        db.commit()
        db.refresh(client)

        # Sync to Notion
        notion_page_id = notion_service.sync_client_to_notion(client)
        if notion_page_id and not client.notion_page_id:
            client.notion_page_id = notion_page_id
            db.commit()

        logger.info(f"Updated client {client_id}")
        return client

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating client {client_id}: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating client: {str(e)}")


@router.post("/{client_id}/sync-notion", response_model=MessageResponse)
def sync_client_to_notion(
    client_id: int,
    db: Session = Depends(get_db)
):
    """
    Manually sync a client to Notion CRM.

    Useful for:
    - Re-syncing after Notion database changes
    - Initial sync if webhook failed
    - Updating Notion with latest client data
    """
    try:
        client = db.query(Client).filter(Client.id == client_id).first()

        if not client:
            raise HTTPException(status_code=404, detail=f"Client {client_id} not found")

        notion_page_id = notion_service.sync_client_to_notion(client)

        if notion_page_id:
            if not client.notion_page_id:
                client.notion_page_id = notion_page_id
                db.commit()

            logger.info(f"Synced client {client_id} to Notion")
            return MessageResponse(
                message="Client synced to Notion successfully",
                details={"notion_page_id": notion_page_id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to sync to Notion")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error syncing client {client_id} to Notion: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error syncing to Notion: {str(e)}")
