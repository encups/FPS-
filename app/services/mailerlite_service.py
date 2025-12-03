"""
MailerLite email service.
Sends weekly reports via email using MailerLite API.
"""
import os
import logging
from typing import Optional
import requests

logger = logging.getLogger(__name__)


class MailerLiteService:
    """Service for sending emails via MailerLite API."""

    def __init__(self):
        self.api_key = os.getenv("MAILERLITE_API_KEY")
        self.base_url = "https://connect.mailerlite.com/api"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    def send_weekly_report_email(
        self,
        to_email: str,
        client_name: str,
        week_start_date: str,
        pdf_url: str,
        content_summary: str = ""
    ) -> bool:
        """
        Send weekly content report email to client.

        Args:
            to_email: Recipient email address
            client_name: Name of the client
            week_start_date: Week start date (formatted string)
            pdf_url: URL or path to the PDF report
            content_summary: Optional summary text

        Returns:
            True if email sent successfully, False otherwise
        """
        try:
            subject = f"Frame Fables Weekly Content Report - Week of {week_start_date}"

            html_content = self._build_email_html(
                client_name=client_name,
                week_start_date=week_start_date,
                pdf_url=pdf_url,
                content_summary=content_summary
            )

            # MailerLite email payload
            data = {
                "to": to_email,
                "from": {
                    "email": "reports@framefables.com",
                    "name": "Frame Fables Team"
                },
                "subject": subject,
                "html": html_content,
                "text": self._build_email_text(client_name, week_start_date, pdf_url)
            }

            url = f"{self.base_url}/emails"

            response = requests.post(url, json=data, headers=self.headers)
            response.raise_for_status()

            logger.info(f"Successfully sent weekly report email to {to_email}")
            return True

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to send email via MailerLite: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"Response: {e.response.text}")
            return False

    def _build_email_html(
        self,
        client_name: str,
        week_start_date: str,
        pdf_url: str,
        content_summary: str
    ) -> str:
        """
        Build HTML email content.

        Args:
            client_name: Name of the client
            week_start_date: Week start date
            pdf_url: URL to PDF report
            content_summary: Summary text

        Returns:
            HTML email string
        """
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weekly Content Report</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Frame Fables LLC</h1>
        <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Weekly Content Report</p>
    </div>

    <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
        <h2 style="color: #667eea; margin-top: 0;">Hi {client_name}! 👋</h2>

        <p>We're excited to share your weekly content report for the week of <strong>{week_start_date}</strong>.</p>

        <p>This week's content has been carefully crafted to align with your brand voice and marketing goals. Our team has generated engaging posts, reels, TikToks, and story ideas designed to captivate your audience.</p>

        {f'<div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;"><p style="margin: 0;"><strong>Summary:</strong> {content_summary}</p></div>' if content_summary else ''}

        <div style="text-align: center; margin: 30px 0;">
            <a href="{pdf_url}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                📄 Download Your Report
            </a>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin-top: 30px;">
            <h3 style="color: #667eea; margin-top: 0;">What's Next?</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Review the content and provide any feedback</li>
                <li>We'll schedule approved posts to your social channels</li>
                <li>Track performance and engagement throughout the week</li>
            </ul>
        </div>

        <p style="margin-top: 30px;">If you have any questions or need revisions, just reply to this email. We're here to help!</p>

        <p style="margin-top: 20px;">
            Best regards,<br>
            <strong>The Frame Fables Team</strong>
        </p>
    </div>

    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p>Frame Fables LLC | Your Content Marketing Partner</p>
        <p>© {week_start_date.split('-')[0]} Frame Fables LLC. All rights reserved.</p>
    </div>
</body>
</html>
"""
        return html

    def _build_email_text(
        self,
        client_name: str,
        week_start_date: str,
        pdf_url: str
    ) -> str:
        """
        Build plain text email content.

        Args:
            client_name: Name of the client
            week_start_date: Week start date
            pdf_url: URL to PDF report

        Returns:
            Plain text email string
        """
        text = f"""
Frame Fables LLC - Weekly Content Report

Hi {client_name},

We're excited to share your weekly content report for the week of {week_start_date}.

This week's content has been carefully crafted to align with your brand voice and marketing goals.

Download your report: {pdf_url}

What's Next?
- Review the content and provide any feedback
- We'll schedule approved posts to your social channels
- Track performance and engagement throughout the week

If you have any questions or need revisions, just reply to this email. We're here to help!

Best regards,
The Frame Fables Team

---
Frame Fables LLC | Your Content Marketing Partner
© {week_start_date.split('-')[0]} Frame Fables LLC. All rights reserved.
"""
        return text


# Singleton instance
mailerlite_service = MailerLiteService()
