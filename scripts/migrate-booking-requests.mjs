// Schema for incoming booking inquiries (the public "check availability" form).
// Run with: node --env-file=.env.local scripts/migrate-booking-requests.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS booking_requests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests_adults INTEGER NOT NULL DEFAULT 1,
    guests_children INTEGER NOT NULL DEFAULT 0,
    occasion TEXT,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

console.log("Migration complete: booking_requests table is ready.");
