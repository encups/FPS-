"""
OpenAI content generation service.
Generates social media content using GPT-4.
"""
import os
import logging
import json
from typing import Dict, List
from openai import OpenAI

logger = logging.getLogger(__name__)


class OpenAIService:
    """Service for generating content using OpenAI API."""

    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key)
        self.model = "gpt-4o"  # Latest GPT-4 model

    def generate_weekly_content(
        self,
        client_name: str,
        business_name: str,
        niche: str,
        goals: str,
        previous_content: List[str] = None
    ) -> Dict[str, List[str]]:
        """
        Generate a week's worth of social media content.

        Args:
            client_name: Name of the client
            business_name: Business name
            niche: Business niche/industry
            goals: Client's marketing goals
            previous_content: Optional list of previous content for context

        Returns:
            Dictionary with keys: feed_posts, reels, tiktoks, stories
        """
        try:
            prompt = self._build_content_generation_prompt(
                client_name=client_name,
                business_name=business_name,
                niche=niche,
                goals=goals,
                previous_content=previous_content
            )

            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert social media content strategist for Frame Fables LLC, "
                                   "specializing in creating engaging, high-converting content for businesses. "
                                   "You understand platform-specific best practices and content trends."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.8,
                response_format={"type": "json_object"}
            )

            content_json = json.loads(response.choices[0].message.content)

            # Validate the response structure
            required_keys = ["feed_posts", "reels", "tiktoks", "stories"]
            for key in required_keys:
                if key not in content_json:
                    logger.error(f"Missing key '{key}' in OpenAI response")
                    content_json[key] = []

            logger.info(f"Successfully generated weekly content for {client_name}")
            return content_json

        except Exception as e:
            logger.error(f"Error generating content with OpenAI: {str(e)}")
            # Return empty structure on error
            return {
                "feed_posts": [],
                "reels": [],
                "tiktoks": [],
                "stories": []
            }

    def _build_content_generation_prompt(
        self,
        client_name: str,
        business_name: str,
        niche: str,
        goals: str,
        previous_content: List[str] = None
    ) -> str:
        """
        Build the prompt for content generation.

        Args:
            client_name: Name of the client
            business_name: Business name
            niche: Business niche
            goals: Marketing goals
            previous_content: Previous content for reference

        Returns:
            Formatted prompt string
        """
        prompt = f"""Generate a week's worth of social media content for the following client:

**Client**: {client_name}
**Business**: {business_name}
**Niche/Industry**: {niche}
**Marketing Goals**: {goals}

"""

        if previous_content and len(previous_content) > 0:
            prompt += f"""
**Previous Content Examples** (for reference and tone consistency):
{chr(10).join(f"- {content[:100]}..." for content in previous_content[:3])}

"""

        prompt += """
**Requirements**:
Generate exactly 5 pieces of content for each platform below. Each piece should be:
- Engaging and platform-appropriate
- Aligned with the client's niche and goals
- Include relevant hashtags where appropriate
- Vary in tone and topic to avoid repetition

**Platforms**:
1. **Feed Posts** (Instagram/Facebook): Regular social media posts with captions and hashtags
2. **Reels** (Instagram Reels): Short-form video scripts with hooks and CTAs
3. **TikToks**: TikTok video scripts optimized for the platform's style
4. **Stories**: Instagram story ideas with text overlays and engagement prompts

**Output Format**:
Return a JSON object with this exact structure:
{
  "feed_posts": ["post 1", "post 2", "post 3", "post 4", "post 5"],
  "reels": ["reel script 1", "reel script 2", "reel script 3", "reel script 4", "reel script 5"],
  "tiktoks": ["tiktok script 1", "tiktok script 2", "tiktok script 3", "tiktok script 4", "tiktok script 5"],
  "stories": ["story idea 1", "story idea 2", "story idea 3", "story idea 4", "story idea 5"]
}

Make the content creative, engaging, and conversion-focused!
"""

        return prompt


# Singleton instance
openai_service = OpenAIService()
