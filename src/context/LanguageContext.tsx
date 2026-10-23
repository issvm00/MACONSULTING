"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export type Language = "ar" | "en";

interface LanguageContextValue {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = "ma_overseas_lang";

const LanguageContext = createContext<LanguageContextValue>({
  language: "ar",
  isRTL: true,
  setLanguage: () => {},
  toggleLanguage: () => {},
});

function persistLanguagePreference(lang: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Ignore storage write errors
  }

  try {
    const isSecure =
      typeof window !== "undefined" && window.location.protocol === "https:";
    const sameSite = isSecure ? "SameSite=None; Secure" : "SameSite=Lax";
    document.cookie = `${STORAGE_KEY}=${lang}; path=/; max-age=31536000; ${sameSite}`;
  } catch {
    // Ignore cookie write errors
  }
}

export function LanguageProvider({
  children,
  initialLanguage = "ar",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // Hydrate saved language preference on client mount and ensure cookie is synced
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") {
        if (saved !== language) {
          setLanguageState(saved);
        }
        persistLanguagePreference(saved);
      } else {
        persistLanguagePreference(language);
      }
    } catch {
      // Ignore storage access errors in restricted webviews
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync HTML & Body lang/dir attributes and document title whenever language changes
  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dir = dir;

    const isPostuler =
      typeof window !== "undefined" &&
      window.location.pathname.includes("/postuler");

    if (isPostuler) {
      document.title =
        language === "ar"
          ? "تقديم طلب الدراسة والاستشارة المجانية | M&A OVERSEAS CONSULTING"
          : "Free Study Consultation & Application | M&A OVERSEAS CONSULTING";
    } else {
      document.title =
        language === "ar"
          ? "M&A OVERSEAS CONSULTING | الدراسة في أوروبا"
          : "M&A OVERSEAS CONSULTING | Study in Europe";
    }
  }, [language]);

  const setLanguage = useCallback((nextLang: Language) => {
    setLanguageState(nextLang);
    persistLanguagePreference(nextLang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      persistLanguagePreference(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      language,
      isRTL: language === "ar",
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
