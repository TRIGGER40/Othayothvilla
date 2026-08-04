import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listBookingRequests } from "@/lib/booking-requests";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }
  const requests = await listBookingRequests();
  return NextResponse.json({ ok: true, requests });
}
