import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "DE" | "EN";

type Dict = Record<string, { DE: string; EN: string }>;

const dict: Dict = {
  "nav.home": { DE: "Home", EN: "Home" },
  "nav.discover": { DE: "Stylisten", EN: "Discover" },
  "nav.how": { DE: "So funktioniert's", EN: "How it works" },
  "nav.about": { DE: "Über uns", EN: "About" },
  "nav.contact": { DE: "Kontakt", EN: "Contact" },
  "nav.login": { DE: "Anmelden", EN: "Login" },
  "nav.register": { DE: "Registrieren", EN: "Register" },
  "nav.dashboard": { DE: "Dashboard", EN: "Dashboard" },
  "nav.logout": { DE: "Abmelden", EN: "Logout" },
  "cta.book": { DE: "Termin buchen", EN: "Book now" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("coiffure_lang") as Lang) || "DE";
  });
  useEffect(() => {
    localStorage.setItem("coiffure_lang", lang);
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);
  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => dict[key]?.[lang] ?? key;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
