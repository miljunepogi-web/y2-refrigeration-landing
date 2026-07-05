# n8n Booking Flow

## End-to-End Flow

1. Visitor fills out the booking form on the landing page.
2. The browser sends a `POST` request to `/api/book-service`.
3. The Next.js route validates the payload with Zod.
4. The route forwards the validated payload to your `n8n` webhook.
5. `n8n` receives the booking data and can:
   - send an email notification
   - save the lead to Google Sheets
   - notify Messenger/Telegram/Slack
   - push the lead to a CRM
6. The site shows success or error feedback to the visitor.

## Payload Sent To n8n

```json
{
  "name": "Juan Dela Cruz",
  "phone": "09561234567",
  "address": "Bacoor, Cavite",
  "airconType": "Split Type",
  "serviceNeeded": "Aircon Cleaning",
  "preferredDate": "2026-07-10",
  "message": "1 unit, weak airflow, prefers morning schedule.",
  "source": "ysquared-landing-page",
  "submittedAt": "2026-07-05T12:34:56.000Z"
}
```

## Suggested n8n Workflow

1. `Webhook` node
   - Method: `POST`
2. `Set` or `Edit Fields` node
   - clean/rename fields if needed
3. Optional branches:
   - `Google Sheets` append row
   - `Gmail` or email node
   - `Telegram`, `Slack`, or Messenger-compatible relay
   - CRM node or HTTP Request node
4. `Respond to Webhook` node
   - return `200 OK`

## Environment Variables

```text
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/ysquared-booking
N8N_WEBHOOK_SECRET=optional-shared-secret
```

If `N8N_WEBHOOK_SECRET` is set, the site sends:

```text
x-webhook-secret: your-secret
```
