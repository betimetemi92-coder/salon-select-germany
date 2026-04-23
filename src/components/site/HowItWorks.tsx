import { Search, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Entdecke",
    desc: "Filtere nach Stadt, Service, Preis und Stil. Stöbere durch Portfolios echter Arbeiten.",
  },
  {
    icon: CalendarCheck,
    title: "Buche",
    desc: "Wähle deinen Wunschtermin in Echtzeit. Bezahle sicher mit Klarna, Karte oder PayPal.",
  },
  {
    icon: Sparkles,
    title: "Genieße",
    desc: "Lehn dich zurück. Dein neuer Look wartet — perfekt von verifizierten Profis.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">So funktioniert's</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">In drei Schritten zum perfekten Look</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="font-display text-7xl text-gold/20 absolute -top-6 left-1/2 -translate-x-1/2 select-none">
                0{i + 1}
              </div>
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
      </div>
    </section>
  );
};

export default HowItWorks;
