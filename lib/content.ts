/**
 * Central content model for the public marketing site. Kept as plain data so a
 * CMS can replace it later without touching components. Copy is written in
 * Othayoth Villa's voice: warm, calm, premium, Kerala-rooted, no em dashes.
 */

import type { VillaPhotoKey } from "@/lib/images";

export const site = {
  name: "Othayoth Villa",
  /** Short form used mid-sentence, especially before a descriptive clause. */
  shortName: "Othayoth",
  tagline: "A private pool villa in Varam, near Kannur",
  location: "Varam, Kannur, Kerala",
  phoneDisplay: "+91 88938 60226",
  phoneHref: "+918893860226",
  whatsapp: "918893860226",
  // No monitored inbox yet; keep contact to phone/WhatsApp only until one exists.
  address: "Othayoth Villa, Near O V Madhavan Stupam, Varam-Kadangode Road, Varam, Kannur, Kerala 670594",
  // Structured postal address, used for LodgingBusiness / LocalBusiness schema.
  postalAddress: {
    street: "Near O V Madhavan Stupam, Varam-Kadangode Road",
    locality: "Varam, Kannur",
    region: "Kerala",
    postalCode: "670594",
    country: "IN",
  },
  // Exact coordinate from the "Othayoth House" pin on Google Maps.
  geo: { lat: 11.90426341501372, lng: 75.41050493717194 },
  checkInTime: "14:00",
  checkOutTime: "11:00",
  bedrooms: 2,
  sleeps: 6,
  // One network for the whole villa; not per-reservation.
  wifi: { network: "Othayoth_Villa", password: "Othayothvilla2026" },
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "The Villa", href: "/villa" },
  { label: "Stay Experience", href: "/stay-experience" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Experiences", href: "/experiences" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "The Villa", href: "/villa" },
      { label: "Stay Experience", href: "/stay-experience" },
      { label: "Rooms & Spaces", href: "/rooms" },
      { label: "Amenities", href: "/amenities" },
    ],
  },
  {
    title: "Plan",
    items: [
      { label: "Gallery", href: "/gallery" },
      { label: "Location", href: "/location" },
      { label: "Experiences", href: "/experiences" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Book",
    items: [
      { label: "Check Availability", href: "/book" },
      { label: "Contact", href: "/contact" },
      { label: "Guest Portal", href: "/guest/login" },
    ],
  },
];

export type Highlight = { title: string; body: string; icon: string };

export const highlights: Highlight[] = [
  {
    title: "A pool that is only yours",
    body: "A private, screened pool deck framed by palms. No shared loungers, no queues, no strangers. Just water, light and quiet.",
    icon: "pool",
  },
  {
    title: "The whole villa, exclusively",
    body: "Book the entire home for your people alone. Two bedrooms, generous shared spaces and a garden that keeps the world out.",
    icon: "key",
  },
  {
    title: "Rooted in Kannur",
    body: "In Varam, near the Valapattanam river, close to Theyyam shrines and the slow rhythm of north Kerala, yet tucked behind a green wall of coconut and areca.",
    icon: "leaf",
  },
  {
    title: "Hosted, never crowded",
    body: "A caretaker on call and housekeeping that stays out of sight. Hospitality you feel, rarely see.",
    icon: "hand",
  },
];

export type Feature = { title: string; body: string };

export const experienceHighlights: Feature[] = [
  {
    title: "Slow mornings by the water",
    body: "Filter coffee at the pool's edge as the light comes up through the palms, birdsong instead of traffic.",
  },
  {
    title: "A Kerala table, set for you",
    body: "Sadya on banana leaf, fresh Malabar seafood, cooked the way the coast means it to taste.",
  },
  {
    title: "Evenings that linger",
    body: "Brass lamps lit along the veranda, a candlelight dinner by the pool, the garden warm and close after rain.",
  },
  {
    title: "Made for celebrations",
    body: "Anniversaries, reunions, quiet milestones. We set the scene and then leave you entirely to it.",
  },
];

export type GalleryImage = {
  id: string;
  category: "Exterior" | "Pool" | "Interiors" | "Dining" | "Ambience";
  caption: string;
  photo: VillaPhotoKey;
};

/**
 * Only real photography appears here. Categories the current photo set
 * cannot honestly fill (bedrooms, bathrooms, food, close-up details) are left
 * out rather than padded with placeholder art.
 */
export const gallery: GalleryImage[] = [
  { id: "g1", category: "Exterior", caption: "Othayoth Villa at dusk, framed by palms", photo: "exteriorDusk" },
  { id: "g2", category: "Exterior", caption: "The main gate, lit for evening arrival", photo: "mainGate" },
  { id: "g3", category: "Pool", caption: "A quiet hour of yoga by the pool", photo: "poolYoga" },
  { id: "g4", category: "Dining", caption: "Living and dining, open to the garden", photo: "livingDining" },
  { id: "g5", category: "Interiors", caption: "The living room, dressed for evening", photo: "livingRoom" },
  { id: "g6", category: "Interiors", caption: "The kitchen, ready for a home-cooked meal", photo: "kitchen" },
  { id: "g7", category: "Ambience", caption: "The garden path, lantern-lit at dusk", photo: "gardenWalkway" },
  { id: "g8", category: "Ambience", caption: "A private sitout, ready for the evening", photo: "privateSitout" },
];

export type Room = {
  name: string;
  kind: string;
  body: string;
  features: string[];
  tone: string;
  /** Real photo key, when one exists. Falls back to the abstract Scene if absent. */
  photo?: VillaPhotoKey;
};

export const rooms: Room[] = [
  {
    name: "The Master Suite",
    kind: "Bedroom",
    body: "A king bed under a slow ceiling fan, tall shutters opening to the garden, and a spa-style bath in warm stone.",
    features: ["King bed", "Ensuite rain shower", "Garden view", "Air-conditioned", "Walk-in wardrobe"],
    tone: "palm",
  },
  {
    name: "The Family Room",
    kind: "Bedroom",
    body: "A flexible twin-or-king room with extra bedding on request, close to the shared living spaces. Between the two bedrooms, the villa comfortably sleeps up to six.",
    features: ["Twin or king", "Ensuite bath", "Extra bedding", "Air-conditioned"],
    tone: "brass",
  },
  {
    name: "Living & Lounge",
    kind: "Living",
    body: "An open, high-ceilinged living room in teak and linen, flowing to the veranda and the pool beyond.",
    features: ["Smart TV", "Lounge seating", "Veranda access", "Board games & books"],
    tone: "palm",
    photo: "livingRoom",
  },
  {
    name: "The Pool Deck",
    kind: "Outdoor",
    body: "A private pool with sunloungers, a shaded daybed and a dining spot set for long, slow evenings.",
    features: ["Private pool", "Sunloungers", "Shaded daybed", "Outdoor dining", "Evening lighting"],
    tone: "monsoon",
    photo: "poolYoga",
  },
  {
    name: "Kitchen & Pantry",
    kind: "Kitchen",
    body: "A fully equipped modern kitchen for your own cooking, with a pantry stocked to request.",
    features: ["Full kitchen", "Filter water", "Tea & coffee station", "Stocked pantry"],
    tone: "sand",
    photo: "kitchen",
  },
  {
    name: "Courtyard Garden",
    kind: "Outdoor",
    body: "A green, walled courtyard with a stone path, tropical planting and quiet corners to disappear into.",
    features: ["Tropical garden", "Seating nooks", "Outdoor shower", "Fully private"],
    tone: "palm",
    photo: "gardenWalkway",
  },
];

export type AmenityGroup = { title: string; icon: string; items: string[] };

export const amenityGroups: AmenityGroup[] = [
  {
    title: "Comfort",
    icon: "leaf",
    items: ["Air-conditioning in every room", "Ceiling fans throughout", "Premium linen & towels", "Blackout shutters", "Fresh flowers on arrival"],
  },
  {
    title: "Connectivity",
    icon: "wifi",
    items: ["Smart TV with streaming", "Bluetooth speaker", "Strong mobile coverage", "Work-friendly corners"],
  },
  {
    title: "The Pool & Outdoors",
    icon: "pool",
    items: ["Private swimming pool", "Sunloungers & daybed", "Poolside dining setup", "Evening garden lighting", "Outdoor shower"],
  },
  {
    title: "Kitchen & Dining",
    icon: "utensils",
    items: ["Fully equipped kitchen", "Kerala & continental menus", "Tea & filter coffee station", "Stocked pantry to request"],
  },
  {
    title: "Peace of Mind",
    icon: "shield",
    items: ["24x7 power backup", "Gated, private entry", "CCTV at perimeter only", "On-call caretaker", "First-aid kit & safety guide"],
  },
  {
    title: "Care",
    icon: "hand",
    items: ["Daily housekeeping", "Fresh towels on request", "Laundry on request", "Baby cot & high chair", "Airport pickup on request"],
  },
];

export type Experience = { title: string; body: string; tone: string; photo?: VillaPhotoKey };

export const experiences: Experience[] = [
  { title: "Private Kerala Sadya", body: "A traditional feast on banana leaf, prepared fresh and laid out for your table at lunch.", tone: "brass", photo: "keralaSadya" },
  { title: "Candlelight Poolside Dinner", body: "A curated menu served by the water, lamps lit, the garden quiet around you.", tone: "monsoon", photo: "poolsideDinner" },
  { title: "Malabar Seafood Evening", body: "The day's catch from the coast, cooked north-Kerala style for your table.", tone: "palm", photo: "seafood" },
  { title: "Celebration Setup", body: "Flowers, lights and a cake for anniversaries and milestones. Tell us the occasion.", tone: "sand", photo: "celebration" },
  { title: "Slow Morning Wellness", body: "Yoga on the deck and an in-villa Ayurvedic massage, arranged with local practitioners.", tone: "palm", photo: "poolYoga" },
  { title: "Local Discovery", body: "A gentle guide to backwater kayaking, Theyyam season, Kannur's beaches and quiet corners.", tone: "monsoon", photo: "localDiscovery" },
];

export type FAQ = { q: string; a: string; group: string };

export const faqs: FAQ[] = [
  { group: "Stay", q: "What are the check-in and check-out times?", a: "Check-in is from 2:00 PM and check-out by 11:00 AM; early or late arrangements can often be made, just ask ahead." },
  { group: "Stay", q: "Is the whole villa private to my group?", a: "Yes. Othayoth is only ever booked as a whole villa, so the home, garden and pool are exclusively yours for the length of your stay." },
  { group: "Pool", q: "Are there rules for the private pool?", a: "The pool is yours to enjoy through the day; there is no lifeguard, so please keep children supervised and glassware away from the water." },
  { group: "Food", q: "What are the food options?", a: "Cook in the full kitchen, or arrange Kerala and continental menus with us, including sadya, seafood evenings and candlelight dinners." },
  { group: "Guests", q: "Can we have extra guests or day visitors?", a: "The villa sleeps up to six; extra guests and day visitors can be accommodated on request for a small charge." },
  { group: "Guests", q: "Are children welcome?", a: "Very much so. We provide a baby cot and high chair on request, just keep little ones supervised near the open pool and garden." },
  { group: "Guests", q: "Do you allow pets?", a: "We love animals, but to keep the villa comfortable for every guest we are not able to accommodate pets at this time." },
  { group: "Stay", q: "Is there a noise policy?", a: "Celebrations are welcome. We simply ask that music is kept gentle after 10:30 PM out of respect for the quiet neighbourhood around us." },
  { group: "Booking", q: "What is the cancellation policy?", a: "Free cancellation up to 14 days before check-in; inside that window the advance is non-refundable, though we will always try to help you reschedule." },
  { group: "Practical", q: "Is parking available?", a: "Yes, there is secure, gated parking on the property for two to three cars, right at the entrance." },
  { group: "Practical", q: "How reliable is the power supply?", a: "The villa has full 24x7 power backup, so a monsoon outage never interrupts your stay." },
];

export type Review = { name: string; from: string; quote: string; stars: number };

export const reviews: Review[] = [
  { name: "Divya R.", from: "Bengaluru", stars: 5, quote: "We had the whole place to ourselves and never wanted to leave the pool. The sadya on arrival set the tone. This is how Kerala should feel." },
  { name: "Arun & Meera", from: "Chennai", stars: 5, quote: "Booked it for our anniversary. The candlelight dinner by the water was quietly perfect. Midhun took care of everything without ever being in the way." },
  { name: "The Kapoor family", from: "Mumbai", stars: 5, quote: "Three generations, one villa, endless space for the kids. Clean, calm and genuinely private. We are already planning the next trip." },
  { name: "Sneha T.", from: "Kochi", stars: 5, quote: "Rain on the tiled roof, warm light inside, brilliant food. The most restful three days we have had in years." },
];

export type LocationPoint = { name: string; detail: string; distance: string; duration?: string };

/**
 * Distances and drive times are owner-confirmed. Airport and railway station
 * distances are still marked TODO until confirmed against an actual drive.
 */
export const nearby: LocationPoint[] = [
  { name: "Varam Kadavu", detail: "A scenic riverside walk along the Valapattanam", distance: "2.5 km", duration: "4 min" },
  { name: "Kattampally Backwaters", detail: "Kayaking through quiet paddy-fringed canals", distance: "8.5 km", duration: "16 min" },
  { name: "Payyambalam Beach", detail: "Kannur's promenade beach, best at sunset", distance: "10.5 km", duration: "20 min" },
  { name: "St. Angelo Fort", detail: "A 16th-century sea-facing Portuguese fort", distance: "10.5 km", duration: "20 min" },
  { name: "Thottada Beach", detail: "A quiet cove of soft sand", distance: "11.4 km", duration: "21 min" },
  { name: "Kizhunna Beach", detail: "Golden sand, rarely crowded", distance: "12 km", duration: "21 min" },
  { name: "Parassinikadavu Sri Muthappan Temple", detail: "A riverside temple famed for its daily rituals", distance: "14.8 km", duration: "20 min" },
  { name: "Muzhappilangad Drive-in Beach", detail: "A 4 km stretch of firm, driveable golden sand", distance: "16 km", duration: "30 min" },
  { name: "Neeliyar Kottam", detail: "A Theyyam performance shrine (seasonal, October to May)", distance: "20 km", duration: "36 min" },
  // TODO: confirm exact drive time/distance from the villa; not on the owner's map.
  { name: "Kannur International Airport (CNN)", detail: "Direct road connection", distance: "≈ 19 km" },
];
