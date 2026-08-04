import { NextResponse, type NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteBookingRequest, setBookingRequestStatus } from "@/lib/booking-requests";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const status = (body as Record<string, unknown>).status;
  if (status !== "new" && status !== "contacted" && status !== "dismissed") {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }
  const { id } = await params;
  await setBookingRequestStatus(id, status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }
  const { id } = await params;
  await deleteBookingRequest(id);
  return NextResponse.json({ ok: true });
}
