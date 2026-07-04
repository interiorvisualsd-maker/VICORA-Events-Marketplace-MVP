"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { VENUES, CITIES, VENUE_TYPES, EVENT_TYPES, filterVenues, type Venue } from "@/lib/data";

export default function VenuesClient({
  searchParams,
}: {
  searchParams: { city?: string; type?: string; eventType?: string; minCapacity?: string; maxPrice?: string; search?: string };
}) {
  const { t } = useLang();
  const tt = (k: Parameters<typeof t>[0]) => t(k) as string;

  const venues = filterVenues({
    city: searchParams.city,
    type: searchParams.type,
    eventType: searchParams.eventType,
    minCapacity: searchParams.minCapacity ? parseInt(searchParams.minCapacity) : undefined,
    maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
    search: searchParams.search,
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-white font-serif font-bold text-sm">V</div>
            <span className="font-serif text-lg text-slate-900 font-semibold">VICORA</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link href="/admin" className="btn-ghost text-sm">{tt("nav_dashboard")}</Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2">
            {searchParams.city ? `${tt("dir_venuesIn")} ${searchParams.city}` : tt("dir_allVenues")}
          </h1>
          <p className="text-sm text-slate-500">{venues.length} {tt("dir_available")}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <aside className="lg:col-span-1">
            <form method="get" className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 sticky top-24">
              <h2 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">{tt("dir_filters")}</h2>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{tt("dir_search")}</label>
                <input type="search" name="search" defaultValue={searchParams.search || ""} placeholder={tt("dir_searchPh")} className="input" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{tt("dir_city")}</label>
                <select name="city" defaultValue={searchParams.city || ""} className="input">
                  <option value="">{tt("dir_allCities")}</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{tt("dir_venueType")}</label>
                <select name="type" defaultValue={searchParams.type || ""} className="input">
                  <option value="">{tt("dir_all")}</option>
                  {VENUE_TYPES.map((ty) => <option key={ty} value={ty}>{ty}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{tt("dir_eventType")}</label>
                <select name="eventType" defaultValue={searchParams.eventType || ""} className="input">
                  <option value="">{tt("dir_all")}</option>
                  {EVENT_TYPES.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{tt("dir_minCapacity")}</label>
                <select name="minCapacity" defaultValue={searchParams.minCapacity || ""} className="input">
                  <option value="">{tt("dir_any")}</option>
                  <option value="50">50 {tt("dir_guests")}</option>
                  <option value="100">100 {tt("dir_guests")}</option>
                  <option value="200">200 {tt("dir_guests")}</option>
                  <option value="300">300 {tt("dir_guests")}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{tt("dir_maxPrice")}</label>
                <select name="maxPrice" defaultValue={searchParams.maxPrice || ""} className="input">
                  <option value="">{tt("dir_any")}</option>
                  <option value="100">$100</option>
                  <option value="150">$150</option>
                  <option value="200">$200</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full">{tt("dir_apply")}</button>
              <Link href="/venues" className="btn-ghost w-full text-xs">{tt("dir_clear")}</Link>
            </form>
          </aside>

          {/* Venue grid */}
          <div className="lg:col-span-3">
            {venues.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <p className="text-slate-500 mb-4">{tt("dir_noResults")}</p>
                <Link href="/venues" className="btn-secondary text-sm">{tt("dir_viewAll")}</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <Link key={venue.id} href={`/venues/${venue.id}`} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={venue.coverImage} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">⭐ {venue.rating} · {venue.reviewCount}</div>
                      <div className="absolute top-3 right-3 bg-amber-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">{venue.type}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg text-slate-900 mb-1 group-hover:text-amber-900 transition-colors">{venue.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">📍 {venue.city}, {venue.country}</p>
                      <p className="text-xs text-slate-600 mb-3 line-clamp-2">{venue.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <div>
                          <p className="text-xs text-slate-500">{tt("dir_capacity")}</p>
                          <p className="text-sm font-medium text-slate-900">{venue.capacity} {tt("dir_people")}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">{tt("dir_from")}</p>
                          <p className="text-sm font-medium text-slate-900">${venue.pricePerHour}<span className="text-xs text-slate-400">{tt("dir_hr")}</span></p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
