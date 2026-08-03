import { redirect } from "next/navigation";
import { getCurrentReservation } from "@/lib/auth";

// /guest sends confirmed guests to their dashboard, everyone else to login.
export default async function GuestIndex() {
  const reservation = await getCurrentReservation();
  redirect(reservation ? "/guest/dashboard" : "/guest/login");
}
