// Sample venue data — realistic LATAM event venues

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  type: "Wedding" | "Corporate" | "Hacienda" | "Rooftop" | "Garden" | "Ballroom" | "Beach";
  capacity: number;
  pricePerHour: number;
  currency: string;
  rating: number;
  reviewCount: number;
  coverImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  eventTypes: string[];
  contactPhone: string;
  contactEmail: string;
  featured: boolean;
}

// Using Unsplash source URLs for premium demo imagery
const img = (id: string, w = 1200, h = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

export const VENUES: Venue[] = [
  {
    id: "v1",
    name: "Hacienda San Andrés",
    city: "Cali",
    country: "Colombia",
    type: "Hacienda",
    capacity: 250,
    pricePerHour: 95,
    currency: "USD",
    rating: 4.9,
    reviewCount: 127,
    coverImage: img("1519167758481-83f550bb49b3"),
    gallery: [
      img("1519167758481-83f550bb49b3"),
      img("1511795409834-ef04bbd61622"),
      img("1464366400600-7168b8af9d3f"),
    ],
    description: "A historic colonial hacienda set on 12 acres of tropical gardens just 20 minutes from central Cali. Perfect for weddings, quinceañeras, and corporate retreats. The main courtyard seats 180 for dinner, and the chapel is available for ceremonies.",
    amenities: ["Parking for 80 cars", "On-site chapel", "Catering kitchen", "Bridal suite", "Air conditioning", "WiFi", "Garden", "Pool"],
    eventTypes: ["Weddings", "Quinceañeras", "Corporate retreats", "Birthday parties"],
    contactPhone: "+57 602 555 0142",
    contactEmail: "eventos@haciendasanandres.co",
    featured: true,
  },
  {
    id: "v2",
    name: "Skyline Terrace Medellín",
    city: "Medellín",
    country: "Colombia",
    type: "Rooftop",
    capacity: 120,
    pricePerHour: 140,
    currency: "USD",
    rating: 4.8,
    reviewCount: 89,
    coverImage: img("1517457373958-b7bdd4587205"),
    gallery: [
      img("1517457373958-b7bdd4587205"),
      img("1492684223066-81342ee5ff30"),
      img("1505236858219-8359eb29e329"),
    ],
    description: "Modern rooftop venue on the 28th floor with panoramic views of Medellín's valley. Includes LED lighting system, DJ booth, and a glass-walled cocktail area. Ideal for product launches, corporate dinners, and upscale celebrations.",
    amenities: ["Panoramic city views", "LED lighting", "DJ booth", "Cocktail bar", "Elevator access", "WiFi", "Climate controlled"],
    eventTypes: ["Corporate events", "Product launches", "Cocktail parties", "Networking"],
    contactPhone: "+57 604 555 0198",
    contactEmail: "hola@skylineterrace.co",
    featured: true,
  },
  {
    id: "v3",
    name: "Jardín Botánico Eventos",
    city: "Bogotá",
    country: "Colombia",
    type: "Garden",
    capacity: 180,
    pricePerHour: 75,
    currency: "USD",
    rating: 4.7,
    reviewCount: 156,
    coverImage: img("1467810563316-b5476525c0f9"),
    gallery: [
      img("1467810563316-b5476525c0f9"),
      img("1478146896981-b80fe3468e7f"),
      img("1511795409834-ef04bbd61622"),
    ],
    description: "An indoor-outdoor garden venue inside the Botanical Garden of Bogotá. Two event spaces: the Orquídeas Pavilion (90 guests) and the main garden lawn (180 guests). Includes basic tables and chairs, with preferred caterers available.",
    amenities: ["Garden setting", "Two event spaces", "Tables & chairs included", "Parking", "Natural light", "Ceremony arch"],
    eventTypes: ["Weddings", "Birthday parties", "Baby showers", "Corporate offsites"],
    contactPhone: "+57 601 555 0234",
    contactEmail: "reservas@jardinbotanicoeventos.gov.co",
    featured: true,
  },
  {
    id: "v4",
    name: "Salón Cristal Cartagena",
    city: "Cartagena",
    country: "Colombia",
    type: "Ballroom",
    capacity: 400,
    pricePerHour: 180,
    currency: "USD",
    rating: 4.9,
    reviewCount: 203,
    coverImage: img("1519225421980-715cb0215aed"),
    gallery: [
      img("1519225421980-715cb0215aed"),
      img("1530103862676-de8c9debad1d"),
      img("1505236858219-8359eb29e329"),
    ],
    description: "Cartagena's premier ballroom with crystal chandeliers, marble floors, and ocean views from the terrace. The main hall seats 320 for plated dinner, with breakout rooms for smaller gatherings. Full production capabilities including stage and sound system.",
    amenities: ["Ocean views", "Crystal chandeliers", "Stage & sound system", "Breakout rooms", "Valet parking", "Climate controlled", "Catering kitchen"],
    eventTypes: ["Galas", "Conferences", "Weddings", "Award ceremonies", "Corporate dinners"],
    contactPhone: "+57 605 555 0177",
    contactEmail: "eventos@saloncristal.co",
    featured: true,
  },
  {
    id: "v5",
    name: "Playa Azul Eventos",
    city: "Santa Marta",
    country: "Colombia",
    type: "Beach",
    capacity: 150,
    pricePerHour: 110,
    currency: "USD",
    rating: 4.6,
    reviewCount: 78,
    coverImage: img("1515890004-9c2b4e84e01f"),
    gallery: [
      img("1515890004-9c2b4e84e01f"),
      img("1507525428034-b723cf961d3e"),
      img("1517849845537-4d257902454a"),
    ],
    description: "Beachfront event space on the Caribbean coast. Open-air palapa for ceremonies and a covered reception area for dinner. Sunset views are unmatched. Preferred caterers specialize in coastal Caribbean cuisine.",
    amenities: ["Beachfront", "Sunset views", "Open-air palapa", "Covered reception", "Restrooms", "Parking", "Tiki bar"],
    eventTypes: ["Beach weddings", "Sunset ceremonies", "Birthday parties", "Corporate retreats"],
    contactPhone: "+57 605 555 0312",
    contactEmail: "reservas@playaazuleventos.co",
    featured: false,
  },
  {
    id: "v6",
    name: "Casa Reforma",
    city: "Mexico City",
    country: "Mexico",
    type: "Ballroom",
    capacity: 220,
    pricePerHour: 165,
    currency: "USD",
    rating: 4.8,
    reviewCount: 142,
    coverImage: img("1511578317324-d7851f6c3a8b"),
    gallery: [
      img("1511578317324-d7851f6c3a8b"),
      img("1530103862676-de8c9debad1d"),
      img("1464366400600-7168b8af9d3f"),
    ],
    description: "An elegant event space in the heart of Polanco, Mexico City. Modern architecture with classic touches, two floors of event space, and a rooftop terrace with skyline views. Full-service production available.",
    amenities: ["Two floors", "Rooftop terrace", "Skyline views", "Production team", "Elevator", "Valet", "Climate controlled"],
    eventTypes: ["Corporate galas", "Weddings", "Conferences", "Cocktail receptions"],
    contactPhone: "+52 55 5555 0184",
    contactEmail: "eventos@casareforma.mx",
    featured: true,
  },
  {
    id: "v7",
    name: "Quinta Los Olivos",
    city: "Lima",
    country: "Peru",
    type: "Hacienda",
    capacity: 200,
    pricePerHour: 85,
    currency: "USD",
    rating: 4.7,
    reviewCount: 94,
    coverImage: img("1464366400600-7168b8af9d3f"),
    gallery: [
      img("1464366400600-7168b8af9d3f"),
      img("1519167758481-83f550bb49b3"),
      img("1478146896981-b80fe3468e7f"),
    ],
    description: "A traditional Peruvian quinta with olive gardens, a historic chapel, and two indoor salons. Located 30 minutes from Miraflores. Specializes in weddings and family celebrations with traditional Peruvian catering available.",
    amenities: ["Olive gardens", "Historic chapel", "Two indoor salons", "Parking for 60 cars", "Traditional catering", "Ceremony space"],
    eventTypes: ["Weddings", "Quinceañeras", "Family celebrations", "Religious ceremonies"],
    contactPhone: "+51 1 555 0263",
    contactEmail: "eventos@quintalosolivos.pe",
    featured: false,
  },
  {
    id: "v8",
    name: "Rooftop Buenos Aires",
    city: "Buenos Aires",
    country: "Argentina",
    type: "Rooftop",
    capacity: 100,
    pricePerHour: 130,
    currency: "USD",
    rating: 4.8,
    reviewCount: 67,
    coverImage: img("1492684223066-81342ee5ff30"),
    gallery: [
      img("1492684223066-81342ee5ff30"),
      img("1517457373958-b7bdd4587205"),
      img("1505236858219-8359eb29e329"),
    ],
    description: "Chic rooftop in Palermo Soho with views of the Buenos Aires skyline. Industrial-chic design with string lights, a cocktail bar, and a small stage. Perfect for fashion events, product launches, and intimate gatherings.",
    amenities: ["Skyline views", "Industrial-chic design", "Cocktail bar", "Small stage", "String lighting", "WiFi"],
    eventTypes: ["Fashion events", "Product launches", "Cocktail parties", "Photo shoots"],
    contactPhone: "+54 11 5555 0149",
    contactEmail: "eventos@rooftopba.ar",
    featured: false,
  },
];

export const CITIES = Array.from(new Set(VENUES.map((v) => v.city))).sort();
export const VENUE_TYPES = Array.from(new Set(VENUES.map((v) => v.type))).sort();
export const EVENT_TYPES = Array.from(new Set(VENUES.flatMap((v) => v.eventTypes))).sort();

export function getVenueById(id: string): Venue | undefined {
  return VENUES.find((v) => v.id === id);
}

export function filterVenues(opts: {
  city?: string;
  type?: string;
  eventType?: string;
  minCapacity?: number;
  maxPrice?: number;
  search?: string;
}): Venue[] {
  return VENUES.filter((v) => {
    if (opts.city && v.city !== opts.city) return false;
    if (opts.type && v.type !== opts.type) return false;
    if (opts.eventType && !v.eventTypes.includes(opts.eventType)) return false;
    if (opts.minCapacity && v.capacity < opts.minCapacity) return false;
    if (opts.maxPrice && v.pricePerHour > opts.maxPrice) return false;
    if (opts.search) {
      const q = opts.search.toLowerCase();
      if (!v.name.toLowerCase().includes(q) && !v.city.toLowerCase().includes(q) && !v.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}

// ============================================================
// Inquiry store (in-memory, simulates Airtable/Supabase)
// ============================================================

export interface Inquiry {
  id: string;
  venueId: string;
  venueName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  message: string;
  status: "new" | "contacted" | "qualified" | "closed";
  createdAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __vicoraInquiries: Inquiry[] | undefined;
}

export function getInquiries(): Inquiry[] {
  if (!global.__vicoraInquiries) {
    // Seed with 2 sample inquiries
    global.__vicoraInquiries = [
      {
        id: "i1",
        venueId: "v1",
        venueName: "Hacienda San Andrés",
        clientName: "María González",
        clientEmail: "maria.gonzalez@example.com",
        clientPhone: "+57 300 555 0142",
        eventType: "Weddings",
        eventDate: "2026-09-12",
        guestCount: 180,
        message: "Hi, I'm planning my wedding for September and would love to visit the hacienda. Is the chapel available for a Catholic ceremony?",
        status: "new",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "i2",
        venueId: "v2",
        venueName: "Skyline Terrace Medellín",
        clientName: "Carlos Restrepo",
        clientEmail: "carlos.restrepo@techcorp.co",
        clientPhone: "+57 310 555 0198",
        eventType: "Corporate events",
        eventDate: "2026-08-20",
        guestCount: 85,
        message: "We're hosting our annual product launch for 85 guests. Need LED lighting, DJ, and catering. What's included in the package?",
        status: "contacted",
        createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }
  return global.__vicoraInquiries;
}

export function createInquiry(input: Omit<Inquiry, "id" | "status" | "createdAt">): Inquiry {
  const inquiry: Inquiry = {
    ...input,
    id: `i${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  getInquiries().unshift(inquiry);
  return inquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]): void {
  const inquiries = getInquiries();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx !== -1) inquiries[idx].status = status;
}
