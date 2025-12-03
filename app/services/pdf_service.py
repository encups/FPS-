"""
PDF report generation service.
Generates weekly content reports using ReportLab.
"""
import os
import logging
from typing import List
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from app.models import ContentItem

logger = logging.getLogger(__name__)


class PDFService:
    """Service for generating PDF reports."""

    def __init__(self):
        self.reports_dir = "reports"
        os.makedirs(self.reports_dir, exist_ok=True)

    def generate_weekly_report(
        self,
        client_name: str,
        client_id: int,
        business_name: str,
        week_start_date: datetime,
        content_items: List[ContentItem]
    ) -> str:
        """
        Generate a weekly content report PDF.

        Args:
            client_name: Name of the client
            client_id: Client ID
            business_name: Business name
            week_start_date: Start date of the week
            content_items: List of ContentItem objects for the week

        Returns:
            Path to the generated PDF file
        """
        try:
            # Generate filename
            week_str = week_start_date.strftime("%Y-%m-%d")
            filename = f"client_{client_id}_week_{week_str}.pdf"
            filepath = os.path.join(self.reports_dir, filename)

            # Create PDF document
            doc = SimpleDocTemplate(
                filepath,
                pagesize=letter,
                rightMargin=72,
                leftMargin=72,
                topMargin=72,
                bottomMargin=18
            )

            # Container for the 'Flowable' objects
            elements = []

            # Define styles
            styles = getSampleStyleSheet()

            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Heading1'],
                fontSize=24,
                textColor=colors.HexColor('#2C3E50'),
                spaceAfter=30,
                alignment=TA_CENTER
            )

            heading_style = ParagraphStyle(
                'CustomHeading',
                parent=styles['Heading2'],
                fontSize=16,
                textColor=colors.HexColor('#34495E'),
                spaceAfter=12,
                spaceBefore=12
            )

            # Add title
            elements.append(Paragraph("Frame Fables LLC", title_style))
            elements.append(Paragraph("Weekly Content Report", styles['Heading2']))
            elements.append(Spacer(1, 0.2 * inch))

            # Add client info
            week_end = week_start_date.replace(day=week_start_date.day + 6)
            client_info = f"""
            <b>Client:</b> {client_name}<br/>
            <b>Business:</b> {business_name}<br/>
            <b>Week:</b> {week_start_date.strftime('%B %d, %Y')} - {week_end.strftime('%B %d, %Y')}<br/>
            <b>Report Generated:</b> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
            """
            elements.append(Paragraph(client_info, styles['Normal']))
            elements.append(Spacer(1, 0.3 * inch))

            # Group content by platform
            platforms = {
                'post': 'Feed Posts',
                'reel': 'Reels',
                'tiktok': 'TikToks',
                'story': 'Stories'
            }

            for platform_key, platform_name in platforms.items():
                platform_items = [item for item in content_items if item.platform == platform_key]

                if platform_items:
                    elements.append(Paragraph(f"{platform_name} ({len(platform_items)})", heading_style))

                    # Create table data
                    table_data = [['#', 'Content', 'Scheduled']]

                    for idx, item in enumerate(platform_items, 1):
                        content_preview = item.content_text[:150] + "..." if len(item.content_text) > 150 else item.content_text
                        scheduled = item.scheduled_time.strftime('%b %d, %I:%M %p') if item.scheduled_time else 'Not scheduled'
                        table_data.append([str(idx), content_preview, scheduled])

                    # Create table
                    table = Table(table_data, colWidths=[0.5*inch, 4.5*inch, 1.5*inch])
                    table.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3498DB')),
                        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                        ('FONTSIZE', (0, 0), (-1, 0), 12),
                        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                        ('GRID', (0, 0), (-1, -1), 1, colors.black),
                        ('FONTSIZE', (0, 1), (-1, -1), 9),
                        ('PADDING', (0, 0), (-1, -1), 6),
                    ]))

                    elements.append(table)
                    elements.append(Spacer(1, 0.2 * inch))

            # Add summary
            elements.append(Spacer(1, 0.3 * inch))
            elements.append(Paragraph("Summary", heading_style))

            total_content = len(content_items)
            scheduled_content = len([item for item in content_items if item.scheduled_time])

            summary_text = f"""
            <b>Total Content Pieces:</b> {total_content}<br/>
            <b>Scheduled Posts:</b> {scheduled_content}<br/>
            <b>Pending Scheduling:</b> {total_content - scheduled_content}
            """
            elements.append(Paragraph(summary_text, styles['Normal']))

            # Add footer
            elements.append(Spacer(1, 0.5 * inch))
            footer_style = ParagraphStyle(
                'Footer',
                parent=styles['Normal'],
                fontSize=10,
                textColor=colors.grey,
                alignment=TA_CENTER
            )
            elements.append(Paragraph("Thank you for choosing Frame Fables LLC for your content needs!", footer_style))

            # Build PDF
            doc.build(elements)

            logger.info(f"Generated PDF report: {filepath}")
            return filepath

        except Exception as e:
            logger.error(f"Error generating PDF report: {str(e)}")
            raise


# Singleton instance
pdf_service = PDFService()
