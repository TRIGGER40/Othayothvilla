/**
 * Content for the stay-only guest portal. Static per-property guidance that is
 * safe to render for any confirmed guest (no personal data lives here — that
 * comes from the reservation record).
 */

export type PortalLink = { label: string; href: string; icon: string; blurb: string };

export const portalNav: PortalLink[] = [
  { label: "Dashboard", href: "/guest/dashboard", icon: "home", blurb: "Your stay at a glance" },
  { label: "Check-in", href: "/guest/check-in", icon: "key", blurb: "Arrival & access" },
  { label: "House Guide", href: "/guest/house-guide", icon: "book", blurb: "How everything works" },
  { label: "Services", href: "/guest/services", icon: "bell", blurb: "Requests & add-ons" },
  { label: "Around", href: "/guest/recommendations", icon: "map", blurb: "Local favourites" },
  { label: "Emergency", href: "/guest/emergency", icon: "shield", blurb: "Help, any hour" },
  { label: "Reservation", href: "/guest/reservation", icon: "receipt", blurb: "Booking & receipts" },
];

export const checkInSteps: { title: string; body: string }[] = [
  { title: "Reaching the villa", body: "Follow the coconut backroad off the Thottada junction. The last stretch is a quiet lane. Your live location pin is in the dashboard, and the caretaker will meet you at the gate." },
  { title: "Parking", body: "Drive straight in through the gate. Secure parking for two to three cars is on your right, just inside the entrance." },
  { title: "Getting in", body: "Vinod will welcome you and hand over the keys. If you arrive after dark, the veranda and path lights are already on for you." },
  { title: "On arrival", body: "Settle in with a welcome drink, take a walk through the house and garden, and tell us if you would like the pool towels set out." },
];

export type GuideItem = { title: string; icon: string; steps: string[] };

export const houseGuide: GuideItem[] = [
  { title: "Lights", icon: "leaf", steps: ["Switch panels are by each doorway, labelled room by room.", "Garden and pool lights are on the panel by the main veranda door.", "A soft night path light stays on automatically after dusk."] },
  { title: "Air-conditioning", icon: "wind", steps: ["Every bedroom has its own remote on the bedside table.", "Set to 24 to 26 degrees for the most comfortable, efficient cooling.", "Please switch off the AC when you head out for the day."] },
  { title: "Water heater (geyser)", icon: "flame", steps: ["Each bathroom geyser has a switch just outside the door.", "Switch on 15 minutes before you shower, then off after.", "Hot water is plentiful, so there is no need to leave it running."] },
  { title: "Smart TV", icon: "tv", steps: ["Use the Smart TV remote and select the HDMI or app you want.", "Wi-Fi is already connected. Sign in to your own streaming accounts.", "Please sign out of personal accounts before check-out."] },
  { title: "Kitchen", icon: "utensils", steps: ["The kitchen is fully equipped and yours to use freely.", "Filter drinking water is at the dispenser by the sink.", "Tea, coffee and basics are stocked. Ask for anything more."] },
  { title: "The pool", icon: "pool", steps: ["Open through the day for your group only. There is no lifeguard.", "Always supervise children in and around the water.", "Please keep glass away from the pool. A shower before swimming keeps it clean."] },
  { title: "Safety", icon: "shield", steps: ["A first-aid kit is in the kitchen pantry cupboard.", "Fire extinguisher is by the main entrance.", "Emergency contacts are in the Emergency tab and on the fridge card."] },
  { title: "Waste & recycling", icon: "recycle", steps: ["Two bins in the kitchen: green for wet waste, black for dry.", "Leave bags by the back door and housekeeping will clear them.", "Please rinse and separate plastics where you can."] },
  { title: "Power backup", icon: "bolt", steps: ["Backup switches over automatically within seconds of any outage.", "AC and the geyser may pause briefly during a long outage.", "If anything stays off, message the caretaker and we will sort it."] },
];

export type ServiceOption = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  cta: string;
};

export const services: ServiceOption[] = [
  { id: "housekeeping", title: "Housekeeping", blurb: "Request a tidy-up, a bin clear or a full service at a time that suits you.", icon: "hand", cta: "Request housekeeping" },
  { id: "towels", title: "Fresh towels & linen", blurb: "Extra towels, pool towels or a linen change, brought over promptly.", icon: "leaf", cta: "Request towels" },
  { id: "chef", title: "Private chef & meals", blurb: "Breakfast, a Kerala sadya, seafood dinners or a full-day chef.", icon: "utensils", cta: "Plan a meal" },
  { id: "celebration", title: "Celebration setup", blurb: "Flowers, lights and a cake for anniversaries and milestones.", icon: "sparkle", cta: "Set up a celebration" },
  { id: "transport", title: "Transport help", blurb: "Airport transfers, a car for the day or local drop-offs.", icon: "car", cta: "Arrange transport" },
  { id: "maintenance", title: "Maintenance", blurb: "Something not working as it should? We will look at it right away.", icon: "wrench", cta: "Report an issue" },
];

export type Recommendation = {
  category: string;
  icon: string;
  places: { name: string; note: string; distance: string }[];
};

export const recommendations: Recommendation[] = [
  {
    category: "Eat & drink",
    icon: "utensils",
    places: [
      { name: "Odayanchal Toddy Shop", note: "Legendary Malabar seafood, worth the short drive", distance: "6 km" },
      { name: "MVK Restaurant", note: "Classic Kannur breakfast, puttu and beef fry", distance: "8 km" },
      { name: "Kaipad Cafe", note: "Coffee, sea views and a slow afternoon", distance: "4 km" },
    ],
  },
  {
    category: "Beaches",
    icon: "wave",
    places: [
      { name: "Thottada Beach", note: "Your closest cove, quiet and swimmable", distance: "1.5 km" },
      { name: "Kizhunna Ezhara", note: "Golden sand, rarely crowded", distance: "3 km" },
      { name: "Payyambalam Beach", note: "Long promenade, best at sunset", distance: "9 km" },
    ],
  },
  {
    category: "See & do",
    icon: "map",
    places: [
      { name: "St. Angelo Fort", note: "Sea-facing fort with wide views", distance: "10 km" },
      { name: "Loknath Weavers", note: "Watch Kannur handloom being woven", distance: "9 km" },
      { name: "Theyyam (in season)", note: "Ask us, we will find a ritual near you", distance: "varies" },
    ],
  },
  {
    category: "Practical",
    icon: "shield",
    places: [
      { name: "Aster MIMS Pharmacy", note: "Well-stocked, long hours", distance: "7 km" },
      { name: "Federal Bank ATM", note: "Nearest reliable cash point", distance: "5 km" },
      { name: "More Supermarket", note: "Groceries and essentials", distance: "6 km" },
    ],
  },
];

export const emergencyContacts: { label: string; value: string; href?: string; note?: string }[] = [
  { label: "Your host, Vinod", value: "+91 98470 00000", href: "tel:+919847000000", note: "First call for anything, any hour" },
  { label: "Othayoth Villa 24x7 support", value: "+91 98470 11111", href: "tel:+919847011111", note: "If you cannot reach the host" },
  { label: "Ambulance", value: "108", href: "tel:108" },
  { label: "Police", value: "100", href: "tel:100" },
  { label: "Fire & rescue", value: "101", href: "tel:101" },
  { label: "Aster MIMS Hospital, Kannur", value: "+91 497 000 0000", href: "tel:+914970000000", note: "Nearest multi-speciality, approx 7 km" },
];

export const outageGuidance: { title: string; body: string }[] = [
  { title: "Power outage", body: "Backup switches over automatically within seconds. If anything stays off after a minute, message the caretaker and we will restore it." },
  { title: "Water supply", body: "The villa has a large tank, so short municipal cuts go unnoticed. If a tap runs dry, tell us and we will top up straight away." },
  { title: "Wi-Fi down", body: "Restart the router by the TV console (switch off, wait ten seconds, switch on). If it is still down after two minutes, message us." },
];
