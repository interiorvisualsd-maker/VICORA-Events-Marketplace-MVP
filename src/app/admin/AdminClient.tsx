"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Inquiry } from "@/lib/data";

export default function AdminClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const { t, lang } = useLang();
  const tt = (k: Parameters<typeof t>[0]) => t(k) as string;

  const STATUS_CONFIG: Record<Inquiry["status"], { label: string; color: string }> = {
    new: { label: tt("admin_new"), color: "bg-blue-100 text-blue-700" },
    contacted: { label: tt("admin_contacted"), color: "bg-amber-100 text-amber-700" },
    qualified: { label: tt("admin_qualified"), color: "bg-purple-100 text-purple-700" },
    closed: { label: tt("admin_closed"), color: "bg-emerald-100 text-emerald-700" },
  };

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

  const revenue = inquiries.filter((i) => i.status === "closed").length * 250; // avg $250 commission

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-white font-serif font-bold text-sm">V</div>
            <span className="font-serif text-lg text-slate-900 font-semibold">VICORA</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link href="/venues" className="btn-ghost text-sm">{lang === "es" ? "← Ver venues" : "← View venues"}</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-slate-900 mb-1">{tt("admin_title")}</h1>
          <p className="text-sm text-slate-500">{tt("admin_subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <Stat label={tt("admin_total")} value={stats.total} color="text-slate-900" />
          <Stat label={tt("admin_new")} value={stats.new} color="text-blue-600" />
          <Stat label={tt("admin_contacted")} value={stats.contacted} color="text-amber-600" />
          <Stat label={tt("admin_qualified")} value={stats.qualified} color="text-purple-600" />
          <Stat label={tt("admin_closed")} value={stats.closed} color="text-emerald-600" />
          <Stat label={lang === "es" ? "Ingresos" : "Revenue"} value={`$${revenue}`} color="text-emerald-700" />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-6">
          {["all", "new", "contacted", "qualified", "closed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${filter === s ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-stone-200"}`}
            >
              {s === "all" ? tt("admin_all") : STATUS_CONFIG[s as Inquiry["status"]].label}
            </button>
          ))}
        </div>

        {/* Inquiries table */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-slate-500 mb-2">{tt("admin_noInquiries")}</p>
              <p className="text-xs text-slate-400">{tt("admin_inquiriesAppear")}</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">{tt("admin_client")}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">{tt("admin_venue")}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">{tt("admin_event")}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">{tt("admin_date")}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">{tt("admin_status")}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">{tt("admin_action")}</th>
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
                      <Link href={`/venues/${inquiry.venueId}`} className="text-slate-900 hover:text-amber-900">{inquiry.venueName}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-900">{inquiry.eventType}</p>
                      <p className="text-xs text-slate-500">{inquiry.guestCount} {lang === "es" ? "invitados" : "guests"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-900">{new Date(inquiry.eventDate).toLocaleDateString(lang === "es" ? "es-CO" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                      <p className="text-xs text-slate-500">{tt("admin_received")} {timeAgo(inquiry.createdAt, lang)}</p>
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
                        <option value="new">{tt("admin_new")}</option>
                        <option value="contacted">{tt("admin_contacted")}</option>
                        <option value="qualified">{tt("admin_qualified")}</option>
                        <option value="closed">{tt("admin_closed")}</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Google Calendar availability + Stripe payment row */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {/* Google Calendar */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📅</div>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-slate-900 mb-1">{lang === "es" ? "Disponibilidad (Google Calendar)" : "Availability (Google Calendar)"}</h3>
                <p className="text-sm text-slate-600 mb-3">{lang === "es" ? "Cada venue sincroniza su calendario. Las solicitudes se cruzan con disponibilidad real antes de confirmar." : "Each venue syncs their calendar. Requests cross-check real availability before confirming."}</p>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const booked = [2, 5, 9, 12].includes(i);
                    return (
                      <div key={i} className={`aspect-square rounded flex items-center justify-center ${booked ? "bg-red-100 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                        {booked ? "✗" : "✓"}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Stripe payments */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💳</div>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-slate-900 mb-1">{lang === "es" ? "Pagos seguros (Stripe)" : "Secure payments (Stripe)"}</h3>
                <p className="text-sm text-slate-600 mb-3">{lang === "es" ? "Reserva con depósito, saldo al confirmar. Comisión del 10% por evento confirmado." : "Reserve with deposit, balance on confirmation. 10% commission per confirmed event."}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{lang === "es" ? "Depósito promedio" : "Avg deposit"}</span>
                    <span className="font-medium text-slate-900">$250</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{lang === "es" ? "Comisión VICORA" : "VICORA commission"}</span>
                    <span className="font-medium text-emerald-600">$25</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-stone-100">
                    <span className="text-slate-500">{lang === "es" ? "Pagos este mes" : "Payments this month"}</span>
                    <span className="font-medium text-slate-900">{stats.closed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI chatbot */}
        <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🤖</div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-slate-900 mb-1">{tt("admin_chatbotTitle")}</h3>
              <p className="text-sm text-slate-600 mb-3">{tt("admin_chatbotDesc")}</p>
              <div className="bg-white rounded-xl border border-amber-200 p-3 text-xs space-y-2 max-w-md">
                <div className="flex gap-2">
                  <span className="text-slate-400 shrink-0">{tt("admin_chatbotClient")}</span>
                  <span>{tt("admin_chatbotMsg")}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-700 shrink-0 font-medium">{tt("admin_chatbotAI")}</span>
                  <span>{tt("admin_chatbotReply")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture note */}
        <div className="mt-6 bg-slate-900 text-white rounded-2xl p-5">
          <h3 className="font-serif text-lg mb-2">{tt("admin_archTitle")}</h3>
          <p className="text-sm text-white/70 mb-3">{tt("admin_archDesc")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">{tt("admin_frontend")}</p>
              <p className="text-white/60">Next.js + Tailwind</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">{tt("admin_database")}</p>
              <p className="text-white/60">Supabase Postgres</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">{tt("admin_crmSync")}</p>
              <p className="text-white/60">Airtable via Make</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="font-medium">{tt("admin_chatbot")}</p>
              <p className="text-white/60">Claude + WhatsApp</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 px-4 py-3">
      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

function timeAgo(iso: string, lang: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / (60 * 60 * 1000));
  if (lang === "es") {
    if (hours < 1) return "hace unos minutos";
    if (hours < 24) return `hace ${hours}h`;
    const days = Math.floor(hours / 24);
    return `hace ${days}d`;
  }
  if (hours < 1) return "a few min ago";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
