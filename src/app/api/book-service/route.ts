import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { supabaseAdmin } from "@/lib/supabase-admin";

const legacyWebhookUrl = process.env.N8N_WEBHOOK_URL;
const legacyWebhookSecret = process.env.N8N_WEBHOOK_SECRET;

function buildNotes(values: ContactFormValues) {
  const notes = [values.additionalNotes, values.message].filter(Boolean).join("\n");
  return notes.trim();
}

function mapUnitCount(numberOfAircons?: number) {
  if (!numberOfAircons || Number.isNaN(numberOfAircons)) {
    return 1;
  }

  return Math.max(1, Math.floor(numberOfAircons));
}

async function forwardToLegacyWebhook(payload: Record<string, unknown>) {
  if (!legacyWebhookUrl) {
    return NextResponse.json(
      { message: "Booking storage is not configured yet. Add Supabase env vars in Vercel." },
      { status: 503 },
    );
  }

  const webhookResponse = await fetch(legacyWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(legacyWebhookSecret ? { "x-webhook-secret": legacyWebhookSecret } : {}),
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });

  if (!webhookResponse.ok) {
    return NextResponse.json(
      { message: "Booking request failed. Please try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Booking request sent successfully." });
}

export async function POST(request: Request) {
  try {
    const values = contactFormSchema.parse(await request.json());
    const normalizedPhone = values.phone.replace(/\D/g, "");
    const normalizedEmail = values.email?.trim().toLowerCase() || null;
    const parsedNumberOfAircons =
      typeof values.numberOfAircons === "string" ? Number.parseInt(values.numberOfAircons, 10) : undefined;
    const bookingPayload = {
      full_name: values.name.trim(),
      mobile_number: normalizedPhone,
      email: normalizedEmail,
      complete_address: values.address.trim(),
      google_map_pin: values.googleMapPin?.trim() || null,
      service_type: values.serviceNeeded.trim(),
      number_of_aircons: mapUnitCount(Number.isNaN(parsedNumberOfAircons ?? Number.NaN) ? undefined : parsedNumberOfAircons),
      preferred_date: values.preferredDate,
      preferred_time: values.preferredTime?.trim() || null,
      additional_notes: buildNotes(values),
      source: "ysquared-landing-page",
    };

    if (!supabaseAdmin) {
      return forwardToLegacyWebhook({
        ...bookingPayload,
        submittedAt: new Date().toISOString(),
      });
    }

    const { data, error } = await supabaseAdmin.rpc("create_booking_request", {
      payload: bookingPayload,
    });

    if (error) {
      return NextResponse.json(
        {
          message: "Unable to store booking in Supabase. Please check your database setup.",
          detail: error.message,
        },
        { status: 502 },
      );
    }

    const bookingRow = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      message: "Booking request saved to Supabase successfully.",
      bookingId: bookingRow?.booking_id ?? null,
    });
  } catch (error) {
    if (error instanceof ZodError) {
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
