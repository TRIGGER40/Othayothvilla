// One-off schema setup for the guest reservations table. Run with:
//   node --env-file=.env.local scripts/migrate.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    booking_ref TEXT NOT NULL UNIQUE,
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_last4 TEXT NOT NULL,
    access_token TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'confirmed',
    package_name TEXT NOT NULL,
    guests_adults INTEGER NOT NULL DEFAULT 1,
    guests_children INTEGER NOT NULL DEFAULT 0,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    check_in_time TEXT NOT NULL DEFAULT '2:00 PM',
    check_out_time TEXT NOT NULL DEFAULT '11:00 AM',
    nightly_rate INTEGER NOT NULL DEFAULT 0,
    amount_paid INTEGER NOT NULL DEFAULT 0,
    balance_due INTEGER NOT NULL DEFAULT 0,
    add_ons JSONB NOT NULL DEFAULT '[]',
    special_requests TEXT,
    wifi_network TEXT NOT NULL,
    wifi_password TEXT NOT NULL,
    host_name TEXT NOT NULL,
    host_phone TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`CREATE INDEX IF NOT EXISTS reservations_booking_ref_idx ON reservations (booking_ref)`;

console.log("Migration complete: reservations table is ready.");
