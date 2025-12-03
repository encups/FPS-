"""
Buffer API integration service.
Handles scheduling social media posts through Buffer.
"""
import os
import logging
from typing import Optional, List, Dict
from datetime import datetime, timedelta
import requests

logger = logging.getLogger(__name__)


class BufferService:
    """Service for scheduling posts via Buffer API."""

    def __init__(self):
        self.access_token = os.getenv("BUFFER_ACCESS_TOKEN")
        self.base_url = "https://api.bufferapp.com/1"

    def get_profiles(self) -> List[Dict]:
        """
        Get all Buffer profiles (social media accounts).

        Returns:
            List of profile dictionaries
        """
        url = f"{self.base_url}/profiles.json"
        params = {"access_token": self.access_token}

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            profiles = response.json()
            logger.info(f"Retrieved {len(profiles)} Buffer profiles")
            return profiles

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to get Buffer profiles: {str(e)}")
            return []

    def schedule_post(
        self,
        profile_id: str,
        text: str,
        scheduled_at: datetime,
        media: Optional[Dict] = None
    ) -> Optional[str]:
        """
        Schedule a single post to Buffer.

        Args:
            profile_id: Buffer profile ID (social account)
            text: Post content text
            scheduled_at: When to publish the post
            media: Optional media attachment data

        Returns:
            Buffer post ID if successful, None otherwise
        """
        url = f"{self.base_url}/updates/create.json"

        # Convert datetime to Unix timestamp
        scheduled_timestamp = int(scheduled_at.timestamp())

        data = {
            "access_token": self.access_token,
            "profile_ids[]": profile_id,
            "text": text,
            "scheduled_at": scheduled_timestamp,
            "now": False
        }

        if media:
            data["media"] = media

        try:
            response = requests.post(url, data=data)
            response.raise_for_status()

            result = response.json()
            if result.get("success"):
                post_id = result["updates"][0]["id"]
                logger.info(f"Scheduled Buffer post {post_id} for {scheduled_at}")
                return post_id
            else:
                logger.error(f"Buffer API returned success=False: {result}")
                return None

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to schedule Buffer post: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"Response: {e.response.text}")
            return None

    def schedule_content_batch(
        self,
        profile_id: str,
        content_items: List[Dict],
        starting_date: datetime,
        time_of_day: str = "09:00"
    ) -> List[Dict]:
        """
        Schedule multiple content items spread across days.

        Args:
            profile_id: Buffer profile ID
            content_items: List of dicts with 'content_text' and 'platform'
            starting_date: Date to start scheduling from
            time_of_day: Time to post (HH:MM format)

        Returns:
            List of scheduled results with buffer_post_id and scheduled_time
        """
        results = []
        current_date = starting_date

        # Parse time of day
        hour, minute = map(int, time_of_day.split(":"))

        for idx, item in enumerate(content_items):
            # Schedule posts every other day to avoid overwhelming the feed
            if idx > 0 and idx % 2 == 0:
                current_date = current_date + timedelta(days=1)

            scheduled_time = current_date.replace(hour=hour, minute=minute)

            buffer_post_id = self.schedule_post(
                profile_id=profile_id,
                text=item["content_text"],
                scheduled_at=scheduled_time
            )

            results.append({
                "content_item_id": item.get("id"),
                "buffer_post_id": buffer_post_id,
                "scheduled_time": scheduled_time,
                "success": buffer_post_id is not None
            })

            # Move to next day for next post
            current_date = current_date + timedelta(days=1)

        logger.info(f"Scheduled {len([r for r in results if r['success']])} out of {len(content_items)} posts")
        return results

    def get_profile_by_service(self, service_name: str) -> Optional[Dict]:
        """
        Get the first Buffer profile matching a service type.

        Args:
            service_name: Service name (e.g., 'instagram', 'facebook', 'twitter')

        Returns:
            Profile dict if found, None otherwise
        """
        profiles = self.get_profiles()

        for profile in profiles:
            if profile.get("service") == service_name:
                return profile

        logger.warning(f"No Buffer profile found for service: {service_name}")
        return None


# Singleton instance
buffer_service = BufferService()
