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
  tagline: "A private pool villa where the coast slows down",
  location: "Kannur, Kerala",
  phoneDisplay: "+91 98470 00000",
  phoneHref: "+919847000000",
  whatsapp: "919847000000",
  email: "stay@othayothvilla.example",
  address: "Off the coconut backroads near Thottada Beach, Kannur, Kerala 670007",
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
    body: "Book the entire home for your people alone. Four bedrooms, generous shared spaces and a garden that keeps the world out.",
    icon: "key",
  },
  {
    title: "Rooted in Kannur",
    body: "Minutes from Thottada's quiet beaches and the slow rhythm of north Kerala, yet tucked behind a green wall of coconut and areca.",
    icon: "leaf",
  },
  {
    title: "Hosted, never crowded",
    body: "A caretaker on call, a chef when you want one, and housekeeping that stays out of sight. Hospitality you feel, rarely see.",
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
    body: "Sadya on banana leaf, fresh Malabar seafood, a private chef who cooks the coast the way it is meant to taste.",
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
    name: "The Palm Room",
    kind: "Bedroom",
    body: "Teak headboard, cane details and a reading nook framed by coconut palms. Made for unhurried mornings.",
    features: ["Queen bed", "Ensuite bath", "Pool-facing", "Air-conditioned", "Reading nook"],
    tone: "monsoon",
  },
  {
    name: "The Garden Room",
    kind: "Bedroom",
    body: "A calm, light-filled room that opens straight onto the courtyard garden and its morning birdsong.",
    features: ["Queen bed", "Ensuite bath", "Courtyard access", "Air-conditioned"],
    tone: "sand",
  },
  {
    name: "The Family Room",
    kind: "Bedroom",
    body: "Flexible twin-or-king setup with room for children, close to the shared living spaces.",
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
    body: "A fully equipped modern kitchen for your chef or your own cooking, with a pantry stocked to request.",
    features: ["Full kitchen", "Chef-ready", "Filter water", "Tea & coffee station"],
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
    items: ["High-speed fibre Wi-Fi", "Smart TV with streaming", "Bluetooth speaker", "Strong mobile coverage", "Work-friendly corners"],
  },
  {
    title: "The Pool & Outdoors",
    icon: "pool",
    items: ["Private swimming pool", "Sunloungers & daybed", "Poolside dining setup", "Evening garden lighting", "Outdoor shower"],
  },
  {
    title: "Kitchen & Dining",
    icon: "utensils",
    items: ["Fully equipped kitchen", "Private chef on request", "Kerala & continental menus", "Tea & filter coffee station", "Stocked pantry to request"],
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
  { title: "Private Kerala Sadya", body: "A traditional feast on banana leaf, prepared fresh and laid out for your table at lunch.", tone: "brass" },
  { title: "Candlelight Poolside Dinner", body: "A curated menu served by the water, lamps lit, the garden quiet around you.", tone: "monsoon" },
  { title: "Malabar Seafood Evening", body: "The day's catch from the coast, cooked north-Kerala style by your private chef.", tone: "palm" },
  { title: "Celebration Setup", body: "Flowers, lights and a cake for anniversaries and milestones. Tell us the occasion.", tone: "sand" },
  { title: "Slow Morning Wellness", body: "Yoga on the deck and an in-villa Ayurvedic massage, arranged with local practitioners.", tone: "palm", photo: "poolYoga" },
  { title: "Local Discovery", body: "A gentle guide to Thottada's beaches, Theyyam season, weavers and Kannur's quiet corners.", tone: "monsoon" },
];

export type FAQ = { q: string; a: string; group: string };

export const faqs: FAQ[] = [
  { group: "Stay", q: "What are the check-in and check-out times?", a: "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can often be arranged, just ask ahead and we will do our best." },
  { group: "Stay", q: "Is the whole villa private to my group?", a: "Yes. Othayoth is only ever booked as a whole villa, so the home, garden and pool are exclusively yours for the length of your stay." },
  { group: "Pool", q: "Are there rules for the private pool?", a: "The pool is yours to enjoy through the day. For everyone's safety, children should always be supervised and we ask that glassware is kept away from the water. There is no lifeguard on site." },
  { group: "Food", q: "What are the food options?", a: "You can cook in the full kitchen, or book our private chef for Kerala and continental menus. A welcome sadya, seafood evenings and candlelight dinners can all be arranged in advance." },
  { group: "Guests", q: "Can we have extra guests or day visitors?", a: "The villa comfortably sleeps up to nine. Extra guests and day visitors can be accommodated on request for a small charge, so we can prepare properly and keep things comfortable." },
  { group: "Guests", q: "Are children welcome?", a: "Very much so. We provide a baby cot and high chair on request. Please note the open pool and garden, and keep little ones supervised." },
  { group: "Guests", q: "Do you allow pets?", a: "We love animals, but to keep the villa comfortable for every guest we are not able to accommodate pets at this time." },
  { group: "Stay", q: "Is there a noise policy?", a: "Celebrations are welcome. We simply ask that music is kept gentle after 10:30 PM out of respect for the quiet neighbourhood around us." },
  { group: "Booking", q: "What is the cancellation policy?", a: "Free cancellation up to 14 days before check-in with a full refund of any advance. Within 14 days the advance is non-refundable, though we will always try to help you reschedule." },
  { group: "Practical", q: "Is parking available?", a: "Yes, there is secure, gated parking on the property for two to three cars, right at the entrance." },
  { group: "Practical", q: "How reliable are Wi-Fi and power?", a: "The villa has high-speed fibre Wi-Fi throughout and full 24x7 power backup, so a monsoon outage never interrupts your stay." },
];

export type Review = { name: string; from: string; quote: string; stars: number };

export const reviews: Review[] = [
  { name: "Divya R.", from: "Bengaluru", stars: 5, quote: "We had the whole place to ourselves and never wanted to leave the pool. The sadya on arrival set the tone. This is how Kerala should feel." },
  { name: "Arun & Meera", from: "Chennai", stars: 5, quote: "Booked it for our anniversary. The candlelight dinner by the water was quietly perfect. Vinod took care of everything without ever being in the way." },
  { name: "The Kapoor family", from: "Mumbai", stars: 5, quote: "Three generations, one villa, endless space for the kids. Clean, calm and genuinely private. We are already planning the next trip." },
  { name: "Sneha T.", from: "Kochi", stars: 5, quote: "Rain on the tiled roof, warm light inside, brilliant food. The most restful three days we have had in years." },
];

export type LocationPoint = { name: string; detail: string; distance: string };

export const nearby: LocationPoint[] = [
  { name: "Thottada Beach", detail: "A quiet cove of soft sand, minutes away", distance: "1.5 km" },
  { name: "Kizhunna Beach", detail: "Golden, uncrowded and swimmable", distance: "3 km" },
  { name: "Kannur town", detail: "Markets, weavers and cafes", distance: "8 km" },
  { name: "St. Angelo Fort", detail: "Sea-facing Portuguese fort", distance: "10 km" },
  { name: "Payyambalam Beach", detail: "Long promenade and sunsets", distance: "9 km" },
  { name: "Kannur Airport (CNN)", detail: "Direct road connection", distance: "30 km" },
];
