import Link from "next/link";
import { VENUES, VENUE_TYPES, CITIES } from "@/lib/data";

export default function LandingPage() {
  const featuredVenues = VENUES.filter((v) => v.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-serif font-bold text-lg">V</div>
            <span className="font-serif text-xl text-white font-semibold">VICORA</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/venues" className="text-white/80 hover:text-white transition-colors">Explorar venues</Link>
            <Link href="/admin" className="text-white/80 hover:text-white transition-colors">Para venues</Link>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contacto</a>
          </nav>
          <Link href="/venues" className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-50 transition-colors">
            Buscar venue
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[88vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2000&h=1200&fit=crop&q=80"
            alt="Elegant event venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-amber-200 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in">
            El marketplace de eventos en Latinoamérica
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-medium leading-tight mb-6 animate-fade-in">
            Encuentra el lugar<br />perfecto para tu evento
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto animate-fade-in">
            Haciendas, rooftops, jardines y salones premium en las mejores ciudades. Cotiza en segundos, reserva con confianza.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 animate-scale-in">
            <form action="/venues" method="get" className="flex-1 flex gap-2">
              <select name="city" className="flex-1 rounded-xl border-0 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200">
                <option value="">Todas las ciudades</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="type" className="flex-1 rounded-xl border-0 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200">
                <option value="">Tipo de venue</option>
                {VENUE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <button type="submit" className="btn-primary px-6">Buscar</button>
            </form>
          </div>

          <p className="text-white/60 text-xs mt-6">
            ✓ Venues verificados  ·  ✓ Cotización instantánea  ·  ✓ Sin comisiones ocultas
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-2">Explora por tipo</p>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Cada evento merece el lugar ideal</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: "Hacienda", emoji: "🏛️", desc: "Bodas y quinceañeras" },
            { type: "Rooftop", emoji: "🌆", desc: "Eventos corporativos" },
            { type: "Garden", emoji: "🌿", desc: "Celebraciones al aire libre" },
            { type: "Ballroom", emoji: "✨", desc: "Galas y conferencias" },
          ].map((cat) => (
            <Link
              key={cat.type}
              href={`/venues?type=${encodeURIComponent(cat.type)}`}
              className="card p-6 text-center hover:shadow-lg transition-all duration-200 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</div>
              <h3 className="font-serif text-lg text-slate-900 mb-1">{cat.type}</h3>
              <p className="text-xs text-slate-500">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured venues */}
      <section className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-2">Destacados</p>
              <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Venues premium</h2>
            </div>
            <Link href="/venues" className="btn-secondary text-sm">Ver todos →</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVenues.map((venue) => (
              <Link
                key={venue.id}
                href={`/venues/${venue.id}`}
                className="group animate-fade-in"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
                  <img
                    src={venue.coverImage}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    ⭐ {venue.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-2xl">
                    <p className="text-white font-medium text-sm">{venue.city}, {venue.country}</p>
                  </div>
                </div>
                <h3 className="font-serif text-lg text-slate-900 mb-1 group-hover:text-amber-900 transition-colors">{venue.name}</h3>
                <p className="text-sm text-slate-500 mb-1">Hasta {venue.capacity} invitados · {venue.type}</p>
                <p className="text-sm font-medium text-slate-900">${venue.pricePerHour} <span className="text-slate-400 font-normal">/ hora</span></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-2">Simple y rápido</p>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Cómo funciona</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Busca y descubre", text: "Filtra por ciudad, tipo de evento y capacidad. Ve fotos, precios y disponibilidad en tiempo real." },
            { num: "02", title: "Cotiza en segundos", text: "Envía una solicitud con los detalles de tu evento. El venue responde directamente por WhatsApp." },
            { num: "03", title: "Reserva con confianza", text: "Pagos seguros con Stripe. Sin comisiones ocultas, sin sorpresas el día del evento." },
          ].map((step) => (
            <div key={step.num} className="text-center">
              <p className="font-serif text-4xl text-amber-700/30 mb-3">{step.num}</p>
              <h3 className="font-serif text-xl text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For venues CTA */}
      <section id="contact" className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-amber-300 text-xs font-medium tracking-widest uppercase mb-3">Para venues</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">¿Tienes un venue increíble?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Únete a VICORA y recibe solicitudes calificadas de clientes serios. Sin costos de listing, solo una pequeña comisión por evento confirmado.
          </p>
          <Link href="/admin" className="inline-flex bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-amber-50 transition-colors">
            Ver dashboard de venues
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-white font-serif font-bold text-xs">V</div>
            <span className="font-serif text-base text-slate-900 font-semibold">VICORA</span>
          </div>
          <p>© 2026 VICORA · El marketplace de eventos en Latinoamérica · Demo MVP</p>
        </div>
      </footer>
    </div>
  );
}
