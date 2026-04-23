import { Link } from "react-router-dom";
import { Search, CalendarCheck, Sparkles, Shield, CreditCard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Search, title: "Entdecke", desc: "Filtere nach Stadt, Service, Preis und Stil. Stöbere durch Portfolios echter Arbeiten." },
  { icon: CalendarCheck, title: "Buche", desc: "Wähle deinen Wunschtermin in Echtzeit. Bezahle sicher mit Klarna, Karte oder PayPal." },
  { icon: Sparkles, title: "Genieße", desc: "Lehn dich zurück. Dein neuer Look wartet — perfekt von verifizierten Profis." },
];

const features = [
  { icon: Shield, title: "100% verifiziert", desc: "Jeder Stylist durchläuft eine persönliche Prüfung." },
  { icon: CreditCard, title: "Sichere Zahlung", desc: "Karte, PayPal, Klarna — mit SSL-Verschlüsselung." },
  { icon: Star, title: "Echte Bewertungen", desc: "Nur von Kunden, die wirklich gebucht haben." },
];

const faqs = [
  { q: "Wie buche ich einen Termin?", a: "Wähle einen Stylist, einen Service und einen freien Slot. Bestätige mit deinen Daten und einer Zahlungsmethode — fertig." },
  { q: "Was passiert, wenn ich absagen muss?", a: "Bis 24 Stunden vor dem Termin kannst du kostenlos stornieren. Danach behält der Stylist 50% des Preises ein." },
  { q: "Wie funktioniert die Bezahlung?", a: "Du bezahlst direkt bei der Buchung mit Karte, PayPal oder Klarna. Dein Stylist erhält die Zahlung nach dem Termin automatisch." },
  { q: "Kann ich Stylist auf Coiffure werden?", a: "Ja — registriere dich als Stylist, durchlaufe unsere kurze Verifizierung und beginne mit deinem eigenen Profil." },
];

const HowItWorksPage = () => {
  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">So funktioniert's</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">In 3 Schritten zum Look</h1>
          <p className="text-muted-foreground">Von der Entdeckung bis zum perfekten Ergebnis — schnell, transparent, premium.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-24">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="font-display text-7xl text-gold/20 absolute -top-6 left-1/2 -translate-x-1/2 select-none">0{i + 1}</div>
              <div className="relative bg-card rounded-2xl p-8 shadow-soft border border-border/60 hover:shadow-elegant hover:-translate-y-1 transition-smooth">
                <div className="h-14 w-14 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6 shadow-gold">
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <section className="mb-24">
          <h2 className="font-display text-4xl text-center mb-12">Warum Coiffure?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-8">
                <f.icon className="h-6 w-6 text-gold mb-4" />
                <h3 className="font-display text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl text-center mb-10">Häufige Fragen</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-card border border-border rounded-2xl p-6 cursor-pointer">
                <summary className="font-medium flex items-center justify-between list-none">
                  {f.q}
                  <span className="text-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Button asChild variant="premium" size="lg"><Link to="/discover">Jetzt Stylist finden</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
