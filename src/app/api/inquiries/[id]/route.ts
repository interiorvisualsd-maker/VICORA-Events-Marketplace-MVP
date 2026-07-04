import { NextRequest, NextResponse } from "next/server";
import { updateInquiryStatus } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validStatuses = ["new", "contacted", "qualified", "closed"];
  if (!body.status || !validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  updateInquiryStatus(params.id, body.status as "new" | "contacted" | "qualified" | "closed");
  return NextResponse.json({ ok: true });
}
