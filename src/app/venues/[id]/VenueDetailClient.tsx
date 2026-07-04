"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Venue } from "@/lib/data";

interface Props {
  venue: Venue;
}

const EVENT_TYPES = [
  "Bodas",
  "Quinceañeras",
  "Eventos corporativos",
  "Cumpleaños",
  "Conferencias",
  "Cocktail parties",
  "Otro",
];

export default function VenueDetailClient({ venue }: Props) {
  const router = useRouter();

  const [activeImage, setActiveImage] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail || !form.clientPhone || !form.eventType || !form.eventDate || !form.guestCount) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          venueId: venue.id,
          venueName: venue.name,
          guestCount: parseInt(form.guestCount),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => router.refresh(), 1000);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/venues" className="text-sm text-slate-500 hover:text-slate-900">← Volver a venues</Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded bg-slate-900 text-white font-serif font-bold text-xs">V</div>
            <span className="font-serif text-base text-slate-900 font-semibold">VICORA</span>
          </Link>
          <Link href="/admin" className="btn-ghost text-sm">Dashboard</Link>
        </div>
      </header>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-3 aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
            <img src={venue.gallery[activeImage]} alt={venue.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
            {venue.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-amber-600" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={img} alt={`${venue.name} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge bg-amber-100 text-amber-800">{venue.type}</span>
                <span className="badge bg-stone-100 text-stone-700">⭐ {venue.rating} ({venue.reviewCount} reseñas)</span>
              </div>
              <h1 className="font-serif text-4xl text-slate-900 mb-2">{venue.name}</h1>
              <p className="text-sm text-slate-500">📍 {venue.city}, {venue.country}</p>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <p className="text-slate-700 leading-relaxed">{venue.description}</p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Capacidad</p>
                <p className="font-serif text-2xl text-slate-900 mt-1">{venue.capacity}</p>
                <p className="text-xs text-slate-500">personas</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Desde</p>
                <p className="font-serif text-2xl text-slate-900 mt-1">${venue.pricePerHour}</p>
                <p className="text-xs text-slate-500">por hora</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Valoración</p>
                <p className="font-serif text-2xl text-slate-900 mt-1">{venue.rating}</p>
                <p className="text-xs text-slate-500">/ 5.0</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t border-stone-200 pt-6">
              <h2 className="font-serif text-xl text-slate-900 mb-4">Servicios e instalaciones</h2>
              <div className="grid grid-cols-2 gap-2">
                {venue.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="text-emerald-600">✓</span> {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Event types */}
            <div className="border-t border-stone-200 pt-6">
              <h2 className="font-serif text-xl text-slate-900 mb-4">Ideal para</h2>
              <div className="flex flex-wrap gap-2">
                {venue.eventTypes.map((e) => (
                  <span key={e} className="badge bg-stone-100 text-stone-700">{e}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: inquiry CTA */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sticky top-24">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl mb-4">✓</div>
                  <h3 className="font-serif text-xl text-slate-900 mb-2">¡Solicitud enviada!</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    El venue recibió tu solicitud y te contactará por WhatsApp dentro de las próximas 24 horas.
                  </p>
                  <button onClick={() => setShowInquiryForm(false)} className="btn-secondary text-sm">Cerrar</button>
                </div>
              ) : !showInquiryForm ? (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Desde</p>
                  <p className="font-serif text-3xl text-slate-900 mb-1">${venue.pricePerHour}<span className="text-base text-slate-400">/hr</span></p>
                  <p className="text-xs text-slate-500 mb-6">Hasta {venue.capacity} personas</p>

                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="btn-primary w-full mb-3"
                  >
                    Solicitar cotización
                  </button>

                  <a
                    href={`https://wa.me/${venue.contactPhone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full"
                  >
                    💬 WhatsApp directo
                  </a>

                  <div className="mt-6 pt-6 border-t border-stone-200 space-y-2 text-xs text-slate-500">
                    <p>✓ Respuesta garantizada en 24h</p>
                    <p>✓ Sin comisiones por cotizar</p>
                    <p>✓ Pagos seguros con Stripe</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <h3 className="font-serif text-lg text-slate-900 mb-2">Solicitar cotización</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nombre completo *</label>
                    <input value={form.clientName} onChange={(e) => update("clientName", e.target.value)} className="input" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email *</label>
                    <input type="email" value={form.clientEmail} onChange={(e) => update("clientEmail", e.target.value)} className="input" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                    <input value={form.clientPhone} onChange={(e) => update("clientPhone", e.target.value)} placeholder="+57 300 555 0000" className="input" required />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Tipo de evento *</label>
                      <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className="input" required>
                        <option value="">Selecciona</option>
                        {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Invitados *</label>
                      <input type="number" min="1" value={form.guestCount} onChange={(e) => update("guestCount", e.target.value)} className="input" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Fecha del evento *</label>
                    <input type="date" value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} className="input" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Mensaje (opcional)</label>
                    <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={3} className="input" placeholder="Cuéntanos sobre tu evento..." />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full">
                    {submitting ? "Enviando..." : "Enviar solicitud →"}
                  </button>
                  <button type="button" onClick={() => setShowInquiryForm(false)} className="btn-ghost w-full text-xs">Cancelar</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
