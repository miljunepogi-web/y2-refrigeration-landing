# Supabase Booking System

This project uses Supabase as the single source of truth for bookings.

## Required environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Tables

- `customers`
- `bookings`
- `technicians`
- `technician_calendars`
- `booking_assignments`
- `booking_status_history`
- `automation_events`
- `reminders`
- `reviews`
- `activity_logs`

## Suggested automation flow

1. Website booking form writes to Supabase through the Next.js API route.
2. An `automation_events` row is created for n8n pickup.
3. n8n reads Supabase, assigns technicians, creates calendar events, and sends notifications.
4. After completion, n8n creates a review request.
