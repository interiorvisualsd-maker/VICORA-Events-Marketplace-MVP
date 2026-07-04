import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["venueId", "venueName", "clientName", "clientEmail", "clientPhone", "eventType", "eventDate", "guestCount"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.clientEmail as string)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const inquiry = createInquiry({
    venueId: body.venueId as string,
    venueName: body.venueName as string,
    clientName: body.clientName as string,
    clientEmail: body.clientEmail as string,
    clientPhone: body.clientPhone as string,
    eventType: body.eventType as string,
    eventDate: body.eventDate as string,
    guestCount: body.guestCount as number,
    message: (body.message as string) || "",
  });

  return NextResponse.json({ ok: true, id: inquiry.id });
}
