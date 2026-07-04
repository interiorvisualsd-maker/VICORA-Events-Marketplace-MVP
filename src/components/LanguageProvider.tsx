"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TRANSLATIONS, type Language, type TranslationKey } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string | readonly string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("vicora_lang") : null) as Language | null;
    if (saved === "en" || saved === "es") {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("vicora_lang", l);
    }
  };

  const t = (key: TranslationKey): string | readonly string[] => {
    return TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback for SSR / outside provider
    return { lang: "es" as Language, setLang: () => {}, t: ((key: TranslationKey) => TRANSLATIONS.es[key] ?? key) as (key: TranslationKey) => string | readonly string[] };
  }
  return ctx;
}
