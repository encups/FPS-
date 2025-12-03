"""
Notion CRM integration service.
Handles creating and updating client records in Notion database.
"""
import os
import logging
from typing import Optional, Dict
import requests
from app.models import Client

logger = logging.getLogger(__name__)


class NotionService:
    """Service for interacting with Notion API."""

    def __init__(self):
        self.api_key = os.getenv("NOTION_API_KEY")
        self.database_id = os.getenv("NOTION_CRM_DATABASE_ID")
        self.base_url = "https://api.notion.com/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        }

    def sync_client_to_notion(self, client: Client) -> Optional[str]:
        """
        Create or update a client record in Notion CRM database.

        Args:
            client: Client object to sync

        Returns:
            Notion page ID if successful, None otherwise
        """
        try:
            if client.notion_page_id:
                # Update existing page
                return self._update_notion_page(client)
            else:
                # Create new page
                return self._create_notion_page(client)
        except Exception as e:
            logger.error(f"Error syncing client {client.id} to Notion: {str(e)}")
            return None

    def _create_notion_page(self, client: Client) -> Optional[str]:
        """
        Create a new page in Notion database.

        Args:
            client: Client object

        Returns:
            Notion page ID if successful
        """
        url = f"{self.base_url}/pages"

        properties = self._build_notion_properties(client)

        data = {
            "parent": {"database_id": self.database_id},
            "properties": properties
        }

        try:
            response = requests.post(url, json=data, headers=self.headers)
            response.raise_for_status()

            page_id = response.json()["id"]
            logger.info(f"Created Notion page {page_id} for client {client.id}")
            return page_id

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to create Notion page for client {client.id}: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"Response: {e.response.text}")
            return None

    def _update_notion_page(self, client: Client) -> Optional[str]:
        """
        Update an existing Notion page.

        Args:
            client: Client object with notion_page_id

        Returns:
            Notion page ID if successful
        """
        url = f"{self.base_url}/pages/{client.notion_page_id}"

        properties = self._build_notion_properties(client)

        data = {"properties": properties}

        try:
            response = requests.patch(url, json=data, headers=self.headers)
            response.raise_for_status()

            logger.info(f"Updated Notion page {client.notion_page_id} for client {client.id}")
            return client.notion_page_id

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to update Notion page for client {client.id}: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"Response: {e.response.text}")
            return None

    def _build_notion_properties(self, client: Client) -> Dict:
        """
        Build Notion properties object from Client data.

        Args:
            client: Client object

        Returns:
            Dictionary of Notion properties
        """
        properties = {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": client.name
                        }
                    }
                ]
            },
            "Email": {
                "email": client.email
            },
            "Status": {
                "select": {
                    "name": client.status.replace("_", " ").title()
                }
            }
        }

        # Add optional fields if they exist
        if client.business_name:
            properties["Business"] = {
                "rich_text": [
                    {
                        "text": {
                            "content": client.business_name
                        }
                    }
                ]
            }

        if client.niche:
            properties["Niche"] = {
                "rich_text": [
                    {
                        "text": {
                            "content": client.niche
                        }
                    }
                ]
            }

        if client.goals:
            properties["Goals"] = {
                "rich_text": [
                    {
                        "text": {
                            "content": client.goals[:2000]  # Notion has text limit
                        }
                    }
                ]
            }

        return properties


# Singleton instance
notion_service = NotionService()
