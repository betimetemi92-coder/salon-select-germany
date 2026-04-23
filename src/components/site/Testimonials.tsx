import { Star } from "lucide-react";

const reviews = [
  {
    quote: "Die Buchung war kinderleicht und mein Balayage sieht traumhaft aus. Definitiv mein neuer Lieblingsservice.",
    author: "Anna K.",
    city: "Berlin",
  },
  {
    quote: "Endlich eine Plattform, die echte Profis zeigt. Transparente Preise, faire Bewertungen.",
    author: "Julian R.",
    city: "München",
  },
  {
    quote: "Ich habe meine Stamm-Friseurin über Coiffure gefunden. Premium-Erlebnis von Anfang bis Ende.",
    author: "Sarah M.",
    city: "Hamburg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Stimmen</p>
          <h2 className="font-display text-4xl md:text-5xl">Geliebt von Tausenden</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="bg-card rounded-2xl p-8 shadow-soft border border-border/60 hover:shadow-elegant transition-smooth"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="font-display text-xl leading-snug italic mb-6">"{r.quote}"</blockquote>
              <figcaption className="text-sm">
                <span className="font-medium">{r.author}</span>
                <span className="text-muted-foreground"> · {r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
