import { useState } from "react";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingDialog, { type Stylist } from "./BookingDialog";
import s1 from "@/assets/stylist-1.jpg";
import s2 from "@/assets/stylist-2.jpg";
import s3 from "@/assets/stylist-3.jpg";
import s4 from "@/assets/stylist-4.jpg";

const stylists: (Stylist & { specialty: string; reviews: number; priceLabel: string })[] = [
  {
    name: "Lena Hoffmann",
    specialty: "Cuts & Bobs",
    city: "Berlin · Mitte",
    rating: 4.9,
    reviews: 218,
    priceLabel: "ab 75 €",
    img: s1,
    services: [
      { id: "cut-w", name: "Damen Schnitt & Föhn", price: 75, duration: 60 },
      { id: "cut-bob", name: "Signature Bob", price: 95, duration: 75 },
      { id: "style", name: "Event Styling", price: 120, duration: 90 },
    ],
  },
  {
    name: "Marco Lange",
    specialty: "Barber & Beard",
    city: "München · Glockenbach",
    rating: 5.0,
    reviews: 184,
    priceLabel: "ab 55 €",
    img: s2,
    services: [
      { id: "cut-m", name: "Herren Schnitt", price: 55, duration: 45 },
      { id: "beard", name: "Bart-Trim & Hot Towel", price: 35, duration: 30 },
      { id: "combo", name: "Cut & Beard Combo", price: 80, duration: 75 },
    ],
  },
  {
    name: "Sophie Bauer",
    specialty: "Balayage Expert",
    city: "Hamburg · Eppendorf",
    rating: 4.9,
    reviews: 312,
    priceLabel: "ab 180 €",
    img: s3,
    services: [
      { id: "bal", name: "Balayage", price: 220, duration: 180 },
      { id: "high", name: "Highlights & Toner", price: 180, duration: 150 },
      { id: "color", name: "Coloration komplett", price: 160, duration: 120 },
    ],
  },
  {
    name: "Elena Vogt",
    specialty: "Color & Editorial",
    city: "Frankfurt · Westend",
    rating: 4.8,
    reviews: 156,
    priceLabel: "ab 120 €",
    img: s4,
    services: [
      { id: "edit", name: "Editorial Color", price: 240, duration: 180 },
      { id: "gloss", name: "Gloss Treatment", price: 120, duration: 60 },
      { id: "cut-e", name: "Schnitt & Style", price: 130, duration: 75 },
    ],
  },
];

const FeaturedStylists = () => {
  const [selected, setSelected] = useState<Stylist | null>(null);
  const [open, setOpen] = useState(false);

  const book = (st: Stylist) => {
    setSelected(st);
    setOpen(true);
  };

  return (
    <section id="discover" className="py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Empfohlen</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Stylisten der Saison</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Handverlesene Profis, ausgezeichnet für ihre Handwerkskunst und höchste Kundenzufriedenheit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stylists.map((st, i) => (
            <article
              key={st.name}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => book(st)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-muted">
                <img
                  src={st.img}
                  alt={`${st.name}, ${st.specialty}`}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-110"
                  loading="lazy"
                  width={768}
                  height={1024}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth" style={{ background: "var(--gradient-overlay)" }} />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs">
                  <BadgeCheck className="h-3.5 w-3.5 text-gold" /> Verifiziert
                </div>
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-medium">
                  <Star className="h-3 w-3 fill-gold text-gold" /> {st.rating}
                </div>
                <Button
                  variant="premium"
                  size="sm"
                  className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-smooth"
                  onClick={(e) => {
                    e.stopPropagation();
                    book(st);
                  }}
                >
                  Termin buchen
                </Button>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl">{st.name}</h3>
                  <span className="text-sm text-gold font-medium">{st.priceLabel}</span>
                </div>
                <p className="text-sm text-muted-foreground">{st.specialty}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                  <MapPin className="h-3 w-3" /> {st.city} · {st.reviews} Bewertungen
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button variant="outline" size="lg">Alle Stylisten entdecken</Button>
        </div>
      </div>

      <BookingDialog open={open} onOpenChange={setOpen} stylist={selected} />
    </section>
  );
};

export default FeaturedStylists;
