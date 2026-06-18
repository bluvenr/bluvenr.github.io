"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dict, Locale, Dict, getDict } from "@/lib/i18n";

const TITLES: Record<Locale, string> = {
  en: "bluvenr — Developer & Open Source Enthusiast",
  zh: "bluvenr — 开发者 & 开源爱好者",
};

type I18nContextType = {
  locale: Locale;
  t: Dict;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  t: dict.en,
  toggleLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "zh" || saved === "en")) {
      setLocale(saved);
    } else {
      const lang = navigator.language.toLowerCase();
      const detected: Locale = lang.startsWith("zh") ? "zh" : "en";
      setLocale(detected);
      localStorage.setItem("locale", detected);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = TITLES[locale];
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === "zh" ? "en" : "zh";
      localStorage.setItem("locale", next);
      return next;
    });
  };

  return (
    <I18nContext.Provider value={{ locale, t: getDict(locale), toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
