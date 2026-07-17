# YSquared Booking Automation

## Production data flow

```text
Landing page -> POST /api/book-service -> Supabase
                                      -> bookings + automation_events
Supabase Database Webhook -> n8n -> booking lookup -> notifications + calendar
```

Supabase is the source of truth. The landing page never calls n8n directly in the production flow, so an n8n outage cannot discard a booking.

## Booking-created workflow

1. **Webhook**: receive the Supabase Database Webhook for an `automation_events` insert.
2. **IF**: continue only when `record.event_type` equals `booking.created`.
3. **Supabase - Get booking**: fetch `bookings`, `customers`, and any active assignment using `record.booking_id`.
4. **Technician availability**: query active technician calendars, then check Google Calendar availability.
5. **Assign technician**: insert `booking_assignments` and update `bookings.status` to `assigned`.
6. **Google Calendar**: create the appointment on the assigned technician's calendar.
7. **Notifications**: send a customer confirmation and an admin notification.
8. **Supabase - Update automation event**: set `processed_at` and store the n8n execution ID.

## Other workflows

- **24-hour reminder**: scheduled workflow reads unprocessed `reminders` due within the next 24 hours, sends the reminder, then marks it sent.
- **1-hour reminder**: same pattern for jobs due within the next hour.
- **Completion and review**: when staff updates a booking to `completed`, create a review request and send it after the selected delay.

## n8n credentials

Create these as n8n credentials, not as node text values:

- Supabase service-role connection for server-side reads and writes
- Google Calendar OAuth for each technician or a delegated shared-calendar account
- Gmail/Resend/SMTP for confirmation and admin messages

## Supabase Database Webhook

Create the webhook in Supabase after activating the n8n workflow:

- Table: `automation_events`
- Event: `INSERT`
- Target URL: the **Production URL** shown by n8n's Webhook node
- Include a secret header, for example `x-ysquared-webhook-secret`

Store the matching secret only in n8n credentials. Do not expose it to the browser or use a `NEXT_PUBLIC_` variable.

## Local testing

For local n8n, use the Webhook node's test URL while the workflow is listening. For production, activate the workflow and use its production URL in Supabase.
