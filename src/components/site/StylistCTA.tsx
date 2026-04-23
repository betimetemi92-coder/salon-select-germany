import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Eigenes Online-Profil mit Portfolio",
  "Smarter Buchungskalender 24/7",
  "Sichere Zahlungen & Auszahlungen",
  "Mehr Kunden in deiner Stadt",
];

const StylistCTA = () => {
  return (
    <section id="stylists" className="py-24 md:py-32">
      <div className="container">
        <div className="relative rounded-[2rem] overflow-hidden bg-primary text-primary-foreground p-10 md:p-20 shadow-elegant">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Für Stylisten</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Wachse mit dem Marktplatz, der dich <span className="italic text-gold">wertschätzt</span>.
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg">
                Schließe dich über 2.400 Profis an, die ihr Geschäft mit Coiffure ausbauen — keine Einrichtungsgebühr, transparente Konditionen.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gold" size="lg">Jetzt registrieren</Button>
                <Button variant="ghostLight" size="lg">Mehr erfahren</Button>
              </div>
            </div>

            <ul className="space-y-5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-4 group">
                  <span className="h-8 w-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold transition-smooth">
                    <Check className="h-4 w-4 text-gold group-hover:text-primary transition-smooth" />
                  </span>
                  <span className="text-lg pt-0.5">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StylistCTA;
