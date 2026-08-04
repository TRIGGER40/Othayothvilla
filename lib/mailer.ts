import "server-only";
import nodemailer from "nodemailer";
import { SITE_URL } from "@/lib/seo";
import type { BookingRequest } from "@/lib/booking-requests";

const BOOKINGS_INBOX = "midhun2k14@gmail.com";
const SENDER_ADDRESS = "bookings@othayothvilla.com";

function getTransport() {
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASSWORD;
  if (!user || !pass) {
    throw new Error("ZOHO_SMTP_USER and ZOHO_SMTP_PASSWORD must be set to send email.");
  }
  return nodemailer.createTransport({
    // This mailbox lives on Zoho's India data center (mail.zoho.in), which
    // has its own SMTP endpoint distinct from the global smtp.zoho.com.
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

/** Notifies the owner of a new booking inquiry, with full details and a link to review it. */
export async function sendBookingRequestNotification(req: BookingRequest): Promise<void> {
  const adminUrl = `${SITE_URL}/admin/login`;
  const nights = Math.max(
    0,
    Math.round((new Date(req.checkOut).getTime() - new Date(req.checkIn).getTime()) / 86400000),
  );

  const lines = [
    `New booking request from the website.`,
    ``,
    `Name: ${req.name}`,
    `Email: ${req.email}`,
    `Phone: ${req.phone}`,
    `Dates: ${req.checkIn} to ${req.checkOut} (${nights} night${nights === 1 ? "" : "s"})`,
    `Guests: ${req.guestsAdults} adults, ${req.guestsChildren} children`,
    req.occasion ? `Occasion: ${req.occasion}` : null,
    req.specialRequests ? `Special requests: ${req.specialRequests}` : null,
    ``,
    `Review it and reply from the admin panel:`,
    adminUrl,
  ].filter((l): l is string => l !== null);

  const transport = getTransport();
  const info = await transport.sendMail({
    from: `"Othayoth Villa" <${SENDER_ADDRESS}>`,
    to: BOOKINGS_INBOX,
    replyTo: req.email,
    subject: `New booking request: ${req.name}, ${req.checkIn} to ${req.checkOut}`,
    text: lines.join("\n"),
  });
  console.log("Booking request email accepted by SMTP server:", {
    messageId: info.messageId,
    response: info.response,
    accepted: info.accepted,
    rejected: info.rejected,
  });
}
