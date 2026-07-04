"use client";

import { useState } from "react";
import Link from "next/link";
import type { Inquiry } from "@/lib/data";

const STATUS_CONFIG: Record<Inquiry["status"], { label: string; color: string }> = {
  new: { label: "Nueva", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contactada", color: "bg-amber-100 text-amber-700" },
  qualified: { label: "Calificada", color: "bg-purple-100 text-purple-700" },
  closed: { label: "Cerrada", color: "bg-emerald-100 text-emerald-700" },
};

export default function AdminClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [filter, setFilter] = useState<string>("all");

  async function updateStatus(id: string, status: Inquiry["status"]) {
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    qualified: inquiries.filter((i) => i.status === "qualified").length,
    closed: inquiries.filter((i) => i.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-white font-serif font-bold text-sm">V</div>
            <span className="font-serif text-lg text-slate-900 font-semibold">VICORA</span>
          </Link>
          <Link href="/venues" className="btn-ghost text-sm">← Ver venues</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-slate-900 mb-1">CRM Dashboard</h1>
          <p className="text-sm text-slate-500">Solicitudes de cotización recibidas</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Stat label="Total" value={stats.total} color="text-slate-900" />
          <Stat label="Nuevas" value={stats.new} color="text-blue-600" />
          <Stat label="Contactadas" value={stats.contacted} color="text-amber-600" />
          <Stat label="Calificadas" value={stats.qualified} color="text-purple-600" />
          <Stat label="Cerradas" value={stats.closed} color="text-emerald-600" />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-6">
          {["all", "new", "contacted", "qualified", "closed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${filter === s ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-stone-200"}`}
            >
              {s === "all" ? "Todas" : STATUS_CONFIG[s as Inquiry["status"]].label}
            </button>
          ))}
        </div>

        {/* Inquiries table */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-slate-500 mb-2">No hay solicitudes en este estado.</p>
              <p className="text-xs text-slate-400">Las solicitudes enviadas desde las páginas de venue aparecerán aquí.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Cliente</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Venue</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Evento</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{inquiry.clientName}</p>
                      <p className="text-xs text-slate-500">{inquiry.clientEmail}</p>
                      <p className="text-xs text-slate-500">{inquiry.clientPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/venues/${inquiry.venueId}`} className="text-slate-900 hover:text-amber-900">
                        {inquiry.venueName}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-900">{inquiry.eventType}</p>
                      <p className="text-xs text-slate-500">{inquiry.guestCount} invitados</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-900">{new Date(inquiry.eventDate).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}</p>
                      <p className="text-xs text-slate-500">Recibido {timeAgo(inquiry.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${STATUS_CONFIG[inquiry.status].color}`}>{STATUS_CONFIG[inquiry.status].label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={inquiry.status}
                        onChange={(e) => updateStatus(inquiry.id, e.target.value as Inquiry["status"])}
                        className="text-xs rounded-md border border-stone-300 px-2 py-1"
                      >
                        <option value="new">Nueva</option>
                        <option value="contacted">Contactada</option>
                        <option value="qualified">Calificada</option>
                        <option value="closed">Cerrada</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* AI chatbot placeholder */}
        <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🤖</div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-slate-900 mb-1">Asistente VICORA AI (WhatsApp 24/7)</h3>
              <p className="text-sm text-slate-600 mb-3">
                El chatbot atiende a los clientes en WhatsApp 24/7, responde preguntas frecuentes, recomienda venues según el evento, y deriva solicitudes complejas al equipo humano.
              </p>
              <div className="bg-white rounded-xl border border-amber-200 p-3 text-xs space-y-2 max-w-md">
                <div className="flex gap-2">
                  <span className="text-slate-400 shrink-0">Cliente:</span>
                  <span>¿Tienen venues para bodas en Cali con capacidad para 200 personas?</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-700 shrink-0 font-medium">VICORA AI:</span>
                  <span>¡Sí! Tenemos 3 venues en Cali ideales para bodas de 200 personas. Te muestro opciones y precios. ¿Quieres que agende una visita?</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture note */}
        <div className="mt-6 bg-slate-900 text-white rounded-2xl p-5">
          <h3 className="font-serif text-lg mb-2">🏗️ Arquitectura MVP</h3>
          <p className="text-sm text-white/70 mb-3">
            Stack: Next.js + Supabase + Stripe + WhatsApp Business API + Google Calendar + Make.com
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">Frontend</p>
              <p className="text-white/60">Next.js + Tailwind</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">Database</p>
              <p className="text-white/60">Supabase Postgres</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">CRM sync</p>
              <p className="text-white/60">Airtable via Make</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">Chatbot</p>
              <p className="text-white/60">Claude + WhatsApp API</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 px-4 py-3">
      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / (60 * 60 * 1000));
  if (hours < 1) return "hace unos minutos";
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}
