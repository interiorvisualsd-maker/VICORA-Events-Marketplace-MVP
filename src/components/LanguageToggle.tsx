"use client";

import { useLang } from "@/components/LanguageProvider";

export function LanguageToggle({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`inline-flex items-center rounded-full p-0.5 text-xs font-medium ${light ? "bg-white/10 backdrop-blur-md border border-white/20" : "bg-stone-100 border border-stone-200"}`}>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-white text-slate-900 shadow-sm" : light ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`px-2.5 py-1 rounded-full transition-all ${lang === "es" ? "bg-white text-slate-900 shadow-sm" : light ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
      >
        ES
      </button>
    </div>
  );
}
