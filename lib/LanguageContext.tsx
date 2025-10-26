"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Language, getTranslation, type TranslationKey } from "./translations";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const stored = localStorage.getItem("site-lang");
      if (stored === "ml" || stored === "en") return stored;
    } catch {
      /* ignore */
    }
    return "en";
  });

  useEffect(() => {
    // update document lang and persist
    try {
      document.documentElement.lang = lang;
      localStorage.setItem("site-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = (key: TranslationKey) => getTranslation(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
