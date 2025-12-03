"""
SQLAlchemy database models for Frame Fables automation system.
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Client(Base):
    """
    Client/Lead model - stores all client information and CRM sync data.
    """
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    business_name = Column(String(255))
    niche = Column(String(255))
    social_handles = Column(JSON)  # Store as JSON: {"instagram": "@handle", "tiktok": "@handle"}
    goals = Column(Text)
    status = Column(String(50), default="lead")  # lead / active_client / inactive
    notion_page_id = Column(String(255), nullable=True)  # Notion CRM page ID
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    content_items = relationship("ContentItem", back_populates="client", cascade="all, delete-orphan")
    weekly_reports = relationship("WeeklyReport", back_populates="client", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Client(id={self.id}, name='{self.name}', email='{self.email}', status='{self.status}')>"


class ContentItem(Base):
    """
    Content item model - stores generated social media content.
    """
    __tablename__ = "content_items"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False, index=True)
    platform = Column(String(50), nullable=False)  # post / reel / tiktok / story
    content_text = Column(Text, nullable=False)
    scheduled_time = Column(DateTime, nullable=True)
    buffer_post_id = Column(String(255), nullable=True)  # Buffer API post ID
    created_for_week = Column(DateTime, nullable=False, index=True)  # Start of content week
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    client = relationship("Client", back_populates="content_items")

    def __repr__(self):
        return f"<ContentItem(id={self.id}, client_id={self.client_id}, platform='{self.platform}')>"


class WeeklyReport(Base):
    """
    Weekly report model - tracks generated PDF reports and email status.
    """
    __tablename__ = "weekly_reports"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False, index=True)
    week_start_date = Column(DateTime, nullable=False, index=True)
    pdf_url_or_path = Column(String(500), nullable=False)
    email_sent_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    client = relationship("Client", back_populates="weekly_reports")

    def __repr__(self):
        return f"<WeeklyReport(id={self.id}, client_id={self.client_id}, week={self.week_start_date})>"
