import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"DE" | "EN">("DE");

  const links = [
    { label: lang === "DE" ? "Entdecken" : "Discover", href: "#discover" },
    { label: lang === "DE" ? "So funktioniert's" : "How it works", href: "#how" },
    { label: lang === "DE" ? "Für Stylisten" : "For Stylists", href: "#stylists" },
    { label: lang === "DE" ? "Kontakt" : "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight">Coiffure<span className="text-gold">.</span></span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-foreground/80 hover:text-foreground transition-smooth relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "DE" ? "EN" : "DE")}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang}
          </button>
          <Button variant="ghost" size="sm">{lang === "DE" ? "Anmelden" : "Sign in"}</Button>
          <Button variant="premium" size="sm">{lang === "DE" ? "Termin buchen" : "Book now"}</Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background animate-fade-in">
          <div className="container py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base">{l.label}</a>
            ))}
            <Button variant="premium" className="w-full">{lang === "DE" ? "Termin buchen" : "Book now"}</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
