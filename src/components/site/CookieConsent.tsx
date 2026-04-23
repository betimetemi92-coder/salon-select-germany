import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };
  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md z-50 animate-fade-up">
      <div className="bg-card border border-border/60 rounded-2xl shadow-elegant p-6 relative">
        <button onClick={decline} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Schließen">
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-display text-xl mb-2">Cookies & Privatsphäre</h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed pr-6">
          Wir nutzen Cookies, um dein Erlebnis zu verbessern. Du kannst jederzeit deine Präferenzen anpassen. Mehr in unserer{" "}
          <a href="#" className="text-gold underline underline-offset-2">Datenschutzerklärung</a>.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={decline} className="flex-1">Nur Notwendige</Button>
          <Button variant="premium" size="sm" onClick={accept} className="flex-1">Akzeptieren</Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
