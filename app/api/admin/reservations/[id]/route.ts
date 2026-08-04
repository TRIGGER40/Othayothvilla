import { NextResponse, type NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteReservation, updateReservation } from "@/lib/reservations";
import { parseReservationInput } from "@/lib/admin-reservation-input";

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

  const parsed = parseReservationInput(body as Record<string, unknown>);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const { id } = await params;
  try {
    const reservation = await updateReservation(id, parsed.input);
    if (!reservation) {
      return NextResponse.json({ ok: false, error: "Reservation not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, reservation });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("duplicate key") || message.includes("unique constraint")) {
      return NextResponse.json({ ok: false, error: "That booking reference is already in use." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: "Could not update the reservation." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }
  const { id } = await params;
  await deleteReservation(id);
  return NextResponse.json({ ok: true });
}
