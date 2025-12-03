"""
Pydantic schemas for API request/response validation.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, List
from datetime import datetime


# ============= Client Schemas =============

class ClientBase(BaseModel):
    name: str
    email: EmailStr
    business_name: Optional[str] = None
    niche: Optional[str] = None
    social_handles: Optional[Dict[str, str]] = None
    goals: Optional[str] = None


class ClientCreate(ClientBase):
    """Schema for creating a new client."""
    pass


class ClientUpdate(BaseModel):
    """Schema for updating client information."""
    name: Optional[str] = None
    business_name: Optional[str] = None
    niche: Optional[str] = None
    social_handles: Optional[Dict[str, str]] = None
    goals: Optional[str] = None
    status: Optional[str] = None


class ClientResponse(ClientBase):
    """Schema for client response."""
    id: int
    status: str
    notion_page_id: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ============= Content Item Schemas =============

class ContentItemBase(BaseModel):
    platform: str  # post / reel / tiktok / story
    content_text: str


class ContentItemCreate(ContentItemBase):
    """Schema for creating content item."""
    client_id: int
    created_for_week: datetime


class ContentItemResponse(ContentItemBase):
    """Schema for content item response."""
    id: int
    client_id: int
    scheduled_time: Optional[datetime]
    buffer_post_id: Optional[str]
    created_for_week: datetime
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Weekly Report Schemas =============

class WeeklyReportResponse(BaseModel):
    """Schema for weekly report response."""
    id: int
    client_id: int
    week_start_date: datetime
    pdf_url_or_path: str
    email_sent_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Request Schemas =============

class TypeformWebhookPayload(BaseModel):
    """Schema for Typeform webhook payload."""
    event_id: Optional[str] = None
    event_type: Optional[str] = None
    form_response: Optional[Dict] = None


class GenerateWeeklyContentRequest(BaseModel):
    """Request schema for generating weekly content."""
    week_start_date: str  # YYYY-MM-DD format


class ScheduleBufferRequest(BaseModel):
    """Request schema for scheduling content in Buffer."""
    week_start_date: str  # YYYY-MM-DD format
    starting_date: str  # YYYY-MM-DD format
    time_of_day: str  # HH:MM format (e.g., "09:00")


class GenerateWeeklyReportRequest(BaseModel):
    """Request schema for generating weekly PDF report."""
    week_start_date: str  # YYYY-MM-DD format


class SendWeeklyReportEmailRequest(BaseModel):
    """Request schema for sending weekly report email."""
    week_start_date: str  # YYYY-MM-DD format


# ============= Response Schemas =============

class GeneratedContentResponse(BaseModel):
    """Response for generated content."""
    feed_posts: List[str]
    reels: List[str]
    tiktoks: List[str]
    stories: List[str]
    content_items_created: List[ContentItemResponse]


class ScheduledContentResponse(BaseModel):
    """Response for scheduled content in Buffer."""
    scheduled_count: int
    content_items: List[ContentItemResponse]


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
    details: Optional[Dict] = None


class ErrorResponse(BaseModel):
    """Error response schema."""
    error: str
    detail: Optional[str] = None
