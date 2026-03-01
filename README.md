# Franklin CHA Voice Survey

Voice AI-powered Community Health Assessment survey for the City of Franklin, Wisconsin. Residents call a phone number to complete a 15-question health survey via natural conversation with an AI agent. Responses are parsed, stored, and displayed on a real-time analytics dashboard.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Charts:** Recharts
- **Database:** Supabase (PostgreSQL) with real-time subscriptions
- **Voice AI:** Retell AI (inbound calls, webhook-driven)
- **Transcript Parsing:** Anthropic Claude API
- **Hosting:** Vercel

## Architecture

```
Resident calls phone number
        |
        v
   Retell AI Agent
   (conducts survey)
        |
        v
  POST /api/webhook/retell
        |
        |---> Supabase: insert call record
        |---> Claude API: parse transcript into structured responses
        |---> Supabase: insert survey_responses
                |
                v
        Dashboard updates in real-time
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with animated conversation preview |
| `/dashboard` | Single-viewport analytics dashboard (stat cards, charts, key findings) |
| `/calls` | Call log table with slide-over detail panel |
| `/dashboard/[callId]` | Individual call detail (responses + transcript) |

## Survey Sections (15 Questions)

1. **Community Health Perception** (Q1-Q4) - open-ended + 1-5 scale
2. **Community Connectedness** (Q5-Q7) - scale, yes/no, open-ended
3. **Mental & Behavioral Health** (Q8-Q10) - scale, yes/no, open-ended
4. **Physical Activity & Nutrition** (Q11-Q12) - multiple choice, scale
5. **Healthcare Access** (Q13-Q14) - scale, multiple choice
6. **Demographics** (Q15) - age range and zip code

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project
- A Retell AI account
- An Anthropic API key

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in the values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `RETELL_API_KEY` | Retell AI API key |
| `RETELL_WEBHOOK_SECRET` | Retell webhook signing secret |
| `ANTHROPIC_API_KEY` | Anthropic API key for transcript parsing |

### 3. Set up the database

Run the migration in your Supabase SQL Editor:

```
supabase/migrations/001_initial_schema.sql
```

This creates the `calls`, `survey_responses`, and `survey_questions` tables with RLS policies and real-time enabled.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Configure Retell webhook

Set your Retell agent's webhook URL to:

```
https://your-domain.com/api/webhook/retell
```

## Project Structure

```
app/
  page.tsx                    # Landing page
  layout.tsx                  # Root layout (dark theme)
  globals.css                 # Global styles + animation keyframes
  dashboard/
    page.tsx                  # Analytics dashboard
    [callId]/page.tsx         # Call detail page
  calls/
    page.tsx                  # Call log with slide-over panel
  api/webhook/retell/
    route.ts                  # Retell webhook handler

components/
  Navbar.tsx                  # Navigation bar
  StatCard.tsx                # Stat card component
  CallLogTable.tsx            # Call log table
  CallDetailPanel.tsx         # Slide-over detail panel
  charts/
    CallsOverTimeChart.tsx    # Call volume area chart
    ScaleDistributionChart.tsx # Rating distribution bar chart
    TopHealthConcernsChart.tsx # Top concerns horizontal bar chart
    YesNoChart.tsx            # Yes/No pie chart

lib/
  types.ts                    # TypeScript interfaces
  questions.ts                # Survey question definitions
  supabase-browser.ts         # Supabase client (browser)
  supabase-server.ts          # Supabase client (server)
  parseTranscript.ts          # Claude-powered transcript parser

supabase/
  migrations/
    001_initial_schema.sql    # Database schema + seed data

scripts/
  seed-data.ts                # Test data seeder
```

## Deployment (Vercel)

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add all 6 environment variables in Vercel project settings
4. Deploy (Vercel auto-detects Next.js)
5. Update the Retell webhook URL to your Vercel domain

## License

Private - City of Franklin Health Department.
