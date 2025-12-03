# Frame Fables LLC - Automation Backend

A comprehensive backend automation system for social media content management, built with FastAPI and Python 3.

## 🚀 Features

- **Lead Capture**: Webhook integration with Typeform for automatic lead intake
- **CRM Sync**: Automatic synchronization with Notion database
- **AI Content Generation**: OpenAI GPT-4 powered content creation
- **Social Scheduling**: Automated post scheduling via Buffer
- **PDF Reports**: Professional weekly content reports
- **Email Automation**: Automated report delivery via MailerLite
- **Client Portal API**: RESTful API for client management

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Example Payloads](#example-payloads)
- [Weekly Automation](#weekly-automation)
- [Deployment on Replit](#deployment-on-replit)

## 🛠 Technology Stack

- **Framework**: FastAPI 0.109.0
- **Server**: Uvicorn
- **Database**: SQLite with SQLAlchemy ORM
- **AI**: OpenAI GPT-4
- **PDF Generation**: ReportLab
- **Integrations**: Typeform, Notion, Buffer, MailerLite

## 📁 Project Structure

```
.
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── webhooks.py      # Typeform webhook
│   │   ├── clients.py       # Client management
│   │   ├── content.py       # Content generation & reports
│   │   └── automation.py    # Weekly automation
│   ├── services/
│   │   ├── __init__.py
│   │   ├── notion_service.py
│   │   ├── openai_service.py
│   │   ├── buffer_service.py
│   │   ├── pdf_service.py
│   │   ├── mailerlite_service.py
│   │   └── automation_service.py
│   └── utils/
│       └── __init__.py
├── reports/                 # Generated PDF reports
├── .env                     # Environment variables (create this)
├── .env.example            # Example environment variables
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🔧 Setup Instructions

### 1. Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd FPS-
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials (see [Environment Variables](#environment-variables) section).

### 4. Initialize the Database

The database will be automatically created when you first run the application.

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key

# Notion CRM
NOTION_API_KEY=secret_your-notion-integration-token
NOTION_CRM_DATABASE_ID=your-notion-database-id

# Buffer
BUFFER_ACCESS_TOKEN=your-buffer-access-token

# MailerLite
MAILERLITE_API_KEY=your-mailerlite-api-key

# Application
APP_BASE_URL=https://your-replit-url.repl.co
PORT=8000

# Typeform (optional)
TYPEFORM_WEBHOOK_SECRET=your-typeform-webhook-secret
```

### Getting API Keys

- **OpenAI**: https://platform.openai.com/api-keys
- **Notion**: https://www.notion.so/my-integrations
- **Buffer**: https://buffer.com/developers/api
- **MailerLite**: https://www.mailerlite.com/integrations/api

## 🏃 Running the Application

### Local Development

```bash
python -m app.main
```

Or using uvicorn directly:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

### On Replit

1. Upload all project files to your Replit
2. Create a `.env` file with your environment variables (use Replit Secrets)
3. Click "Run" button or use:

```bash
python -m app.main
```

## 📡 API Endpoints

### Health & Info

- `GET /` - API information
- `GET /health` - Health check with integration status

### Webhooks

- `POST /webhooks/typeform` - Receive new leads from Typeform

### Clients

- `GET /clients` - List all clients (optional `?status=active_client`)
- `GET /clients/{client_id}` - Get client details
- `PUT /clients/{client_id}` - Update client information
- `POST /clients/{client_id}/sync-notion` - Manually sync to Notion

### Content Generation

- `POST /clients/{client_id}/generate-weekly-content` - Generate AI content
- `POST /clients/{client_id}/schedule-buffer-for-week` - Schedule in Buffer
- `POST /clients/{client_id}/generate-weekly-report` - Create PDF report
- `POST /clients/{client_id}/send-weekly-report-email` - Send email report

### Automation

- `POST /automation/run-weekly` - Trigger full weekly automation

## 📝 Example Payloads

### 1. Typeform Webhook

```json
{
  "event_id": "01H123456789ABCDEF",
  "event_type": "form_response",
  "form_response": {
    "answers": [
      {
        "type": "text",
        "text": "John Doe",
        "field": {
          "id": "field1",
          "ref": "name"
        }
      },
      {
        "type": "email",
        "email": "john@example.com",
        "field": {
          "id": "field2",
          "ref": "email"
        }
      },
      {
        "type": "text",
        "text": "Acme Corp",
        "field": {
          "id": "field3",
          "ref": "business_name"
        }
      },
      {
        "type": "text",
        "text": "E-commerce",
        "field": {
          "id": "field4",
          "ref": "niche"
        }
      },
      {
        "type": "text",
        "text": "Increase brand awareness and drive sales",
        "field": {
          "id": "field5",
          "ref": "goals"
        }
      }
    ]
  }
}
```

### 2. Generate Weekly Content

```json
{
  "week_start_date": "2025-12-08"
}
```

**Response:**
```json
[
  {
    "id": 1,
    "client_id": 1,
    "platform": "post",
    "content_text": "🌟 Exciting news for e-commerce enthusiasts! ...",
    "scheduled_time": null,
    "buffer_post_id": null,
    "created_for_week": "2025-12-08T00:00:00",
    "created_at": "2025-12-03T10:30:00"
  }
]
```

### 3. Schedule Buffer for Week

```json
{
  "week_start_date": "2025-12-08",
  "starting_date": "2025-12-08",
  "time_of_day": "09:00"
}
```

**Response:**
```json
{
  "message": "Successfully scheduled 20 posts in Buffer",
  "details": {
    "scheduled_count": 20,
    "total_content": 20,
    "buffer_profile": "instagram"
  }
}
```

### 4. Generate Weekly Report

```json
{
  "week_start_date": "2025-12-08"
}
```

**Response:**
```json
{
  "id": 1,
  "client_id": 1,
  "week_start_date": "2025-12-08T00:00:00",
  "pdf_url_or_path": "reports/client_1_week_2025-12-08.pdf",
  "email_sent_at": null,
  "created_at": "2025-12-03T10:35:00"
}
```

### 5. Send Weekly Report Email

```json
{
  "week_start_date": "2025-12-08"
}
```

**Response:**
```json
{
  "message": "Weekly report email sent successfully",
  "details": {
    "recipient": "john@example.com",
    "report_id": 1
  }
}
```

### 6. Update Client

```json
{
  "niche": "Sustainable E-commerce",
  "goals": "Increase brand awareness, drive sales, and promote sustainability",
  "status": "active_client"
}
```

## 🤖 Weekly Automation

The system includes a complete automation workflow that can be triggered manually or scheduled.

### Manual Trigger

```bash
curl -X POST http://localhost:8000/automation/run-weekly
```

### What It Does

For each active client, the automation:

1. **Generates Content** - Creates 20 pieces of AI-generated content (5 posts, 5 reels, 5 TikToks, 5 stories)
2. **Schedules in Buffer** - Automatically schedules posts throughout the week
3. **Creates PDF Report** - Generates a professional weekly report
4. **Sends Email** - Delivers the report to the client via MailerLite

### Setting Up Weekly Scheduling on Replit

1. Go to your Replit project
2. Click on "Tools" → "Cron"
3. Add a new cron job:
   ```
   0 9 * * 1 curl -X POST http://localhost:8000/automation/run-weekly
   ```
   This runs every Monday at 9:00 AM

Or create a simple Python script:

```python
# cron_weekly.py
import requests
import os

def run_weekly_automation():
    base_url = os.getenv("APP_BASE_URL", "http://localhost:8000")
    response = requests.post(f"{base_url}/automation/run-weekly")
    print(response.json())

if __name__ == "__main__":
    run_weekly_automation()
```

## 🚀 Deployment on Replit

### Step 1: Create New Repl

1. Go to https://replit.com
2. Click "Create Repl"
3. Select "Python" as the language
4. Name it "frame-fables-backend"

### Step 2: Upload Files

Upload all project files to your Repl or use Git import.

### Step 3: Configure Secrets

1. Click on "Tools" → "Secrets"
2. Add each environment variable:
   - `OPENAI_API_KEY`
   - `NOTION_API_KEY`
   - `NOTION_CRM_DATABASE_ID`
   - `BUFFER_ACCESS_TOKEN`
   - `MAILERLITE_API_KEY`
   - `APP_BASE_URL` (use your Replit URL)

### Step 4: Install Dependencies

In the Shell:
```bash
pip install -r requirements.txt
```

### Step 5: Run the App

Click the "Run" button or execute:
```bash
python -m app.main
```

### Step 6: Configure Webhooks

Update your Typeform webhook URL to point to:
```
https://your-replit-url.repl.co/webhooks/typeform
```

## 🧪 Testing the API

### Using the Interactive Docs

1. Navigate to http://localhost:8000/docs
2. Try the endpoints directly from the Swagger UI

### Using cURL

```bash
# Health check
curl http://localhost:8000/health

# List clients
curl http://localhost:8000/clients

# Generate content for client ID 1
curl -X POST http://localhost:8000/clients/1/generate-weekly-content \
  -H "Content-Type: application/json" \
  -d '{"week_start_date": "2025-12-08"}'
```

### Using Python

```python
import requests

base_url = "http://localhost:8000"

# Generate weekly content
response = requests.post(
    f"{base_url}/clients/1/generate-weekly-content",
    json={"week_start_date": "2025-12-08"}
)
print(response.json())
```

## 📊 Database Schema

### Client
- `id` - Primary key
- `name` - Client name
- `email` - Email address (unique)
- `business_name` - Business name
- `niche` - Business niche/industry
- `social_handles` - JSON object with social media handles
- `goals` - Marketing goals
- `status` - lead / active_client / inactive
- `notion_page_id` - Notion CRM page ID

### ContentItem
- `id` - Primary key
- `client_id` - Foreign key to Client
- `platform` - post / reel / tiktok / story
- `content_text` - Generated content
- `scheduled_time` - When post is scheduled
- `buffer_post_id` - Buffer API post ID
- `created_for_week` - Week start date

### WeeklyReport
- `id` - Primary key
- `client_id` - Foreign key to Client
- `week_start_date` - Start of report week
- `pdf_url_or_path` - Path to PDF file
- `email_sent_at` - When email was sent

## 🐛 Troubleshooting

### Database Issues

If you encounter database errors, delete the `frame_fables.db` file and restart the app.

### API Integration Errors

Check the logs for specific error messages. Verify all API keys are correct in `.env`.

### Notion Integration

Make sure your Notion integration has access to the database:
1. Go to your Notion database
2. Click "..." → "Connections"
3. Add your integration

## 📄 License

© 2025 Frame Fables LLC. All rights reserved.

## 🤝 Support

For issues or questions, contact the Frame Fables team.
