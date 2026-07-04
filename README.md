# VICORA — Events Marketplace MVP

Working demo of VICORA — a premium marketplace for event venues in Latin America, inspired by Airbnb + Booking + CRM for the events industry.

## What's in the demo

### Landing page (`/`)
Premium hero with full-bleed imagery, category picker (Hacienda, Rooftop, Garden, Ballroom), featured venues grid, "how it works" section, and a venue-onboarding CTA. Spanish-language UI for the LATAM market.

### Venue directory (`/venues`)
Smart filter sidebar: search, city, venue type, event type, min capacity, max price. Responsive grid of venue cards with photos, ratings, capacity, and pricing.

### Venue detail (`/venues/[id]`)
Image gallery with thumbnails, full description, quick facts (capacity/price/rating), amenities list, ideal-for event types, sticky inquiry CTA sidebar. Inquiry form captures name, email, phone, event type, date, guest count, message. Form submission creates an inquiry in the in-memory store and shows a success state.

### Admin CRM dashboard (`/admin`)
Stats tiles (total/new/contacted/qualified/closed), filter chips, full inquiry table with client details, venue link, event info, status management dropdown. WhatsApp AI chatbot mockup showing the 24/7 customer support flow. Architecture overview card showing the production stack.

## Sample data
- 8 venues across 6 cities (Cali, Medellín, Bogotá, Cartagena, Santa Marta, Mexico City, Lima, Buenos Aires)
- 4 venue types (Hacienda, Rooftop, Garden, Ballroom, Beach)
- Realistic pricing, capacities, ratings, amenities
- 2 pre-seeded inquiries in different statuses

## Tech stack
- **Next.js 14** (App Router) + TypeScript
- **TailwindCSS 3** — premium events-industry aesthetic
- **Playfair Display + Inter** typography
- In-memory store (production would use Supabase Postgres + Airtable sync)

## Deploy to Vercel
1. Push to GitHub
2. Import to Vercel
3. No env vars needed
4. Deploy

## Production architecture (per the VICORA spec)
- Next.js for the marketplace frontend
- Supabase for Postgres + Auth + Realtime
- Stripe for secure payments
- WhatsApp Business API for 24/7 AI chatbot
- Google Calendar for availability sync
- Make.com for CRM sync to Airtable
- Claude API for the AI chatbot intelligence
