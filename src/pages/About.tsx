import { Link } from "react-router-dom";
import { Award, Heart, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

const About = () => {
  const values = [
    { icon: Shield, title: "Verifiziert", desc: "Jeder Stylist wird persönlich geprüft, bevor er auf Coiffure erscheint." },
    { icon: Heart, title: "Kuratiert", desc: "Wir wählen nur die Profis aus, die unsere Standards für Handwerk und Service erfüllen." },
    { icon: Award, title: "Premium", desc: "Eine Plattform, die der Qualität deutscher Hairstyling-Kunst gerecht wird." },
    { icon: Sparkles, title: "Mühelos", desc: "Buchung in unter 60 Sekunden — auf jedem Gerät, in jeder Stadt." },
  ];

  return (
    <div className="pt-28 pb-24">
      <div className="container">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Über uns</p>
            <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
              Wir feiern <span className="italic text-gold">Handwerk</span> in jeder Schere.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Coiffure wurde 2024 in Berlin gegründet, mit einer einfachen Idee: Deutschlands beste
              Hairstylisten und ihre Kunden mühelos zu verbinden — auf eine Weise, die der Qualität
              ihrer Arbeit würdig ist.
            </p>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
            <img src={heroImg} alt="Über Coiffure" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Values */}
        <section className="mb-24">
          <h2 className="font-display text-4xl text-center mb-12">Unsere Werte</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="h-14 w-14 rounded-full gradient-gold mx-auto flex items-center justify-center mb-4 shadow-gold">
                  <v.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="max-w-3xl mx-auto mb-24 prose-lg">
          <h2 className="font-display text-4xl mb-6 text-center">Unsere Geschichte</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Was als Frustration über zerbrochene Buchungssysteme und unpersönliche Salon-Apps begann,
              wurde zur Mission, ein Werkzeug zu bauen, das Stylisten den Respekt — und Kunden die
              Erfahrung — gibt, die sie verdienen.
            </p>
            <p>
              Heute zählt Coiffure über 2.400 verifizierte Profis in zwölf deutschen Städten und mehr
              als 50.000 zufriedene Kunden. Wir wachsen weiter — mit derselben Sorgfalt, mit der ein
              Master Colorist eine Strähne setzt.
            </p>
          </div>
        </section>

        {/* Numbers */}
        <section className="bg-primary text-primary-foreground rounded-3xl p-12 text-center mb-12">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { v: "2.400+", l: "Stylisten" },
              { v: "50.000+", l: "Buchungen" },
              { v: "12", l: "Städte" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-5xl text-gold mb-2">{s.v}</div>
                <div className="text-sm uppercase tracking-widest text-primary-foreground/60">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Button asChild variant="premium" size="lg"><Link to="/discover">Stylisten entdecken</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default About;
