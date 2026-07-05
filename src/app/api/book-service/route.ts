import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";

const webhookUrl = process.env.N8N_WEBHOOK_URL;
const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Booking webhook is not configured yet. Add N8N_WEBHOOK_URL in Vercel." },
      { status: 503 },
    );
  }

  try {
    const payload = contactFormSchema.parse(await request.json());

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
      },
      body: JSON.stringify({
        ...payload,
        source: "ysquared-landing-page",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { message: "Webhook request failed. Please check your n8n workflow." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Booking request sent successfully.",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { message: "Please review the form fields and try again." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Something went wrong while sending your booking request." },
      { status: 500 },
    );
  }
}
