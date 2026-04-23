import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star, MapPin, BadgeCheck, Clock, ArrowLeft, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getStylist } from "@/data/stylists";
import { cn } from "@/lib/utils";
import { addDays, isBefore, startOfToday } from "date-fns";
import { de } from "date-fns/locale";

const StylistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stylist = id ? getStylist(id) : undefined;
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));

  if (!stylist) {
    return (
      <div className="pt-32 pb-24 container text-center">
        <h1 className="font-display text-4xl mb-4">Stylist nicht gefunden</h1>
        <Button asChild><Link to="/discover">Zurück zur Übersicht</Link></Button>
      </div>
    );
  }

  const goBook = (serviceId?: string) => {
    const params = new URLSearchParams();
    if (serviceId) params.set("service", serviceId);
    navigate(`/book/${stylist.id}${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <Link to="/discover" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6">
          <ArrowLeft className="h-4 w-4" /> Alle Stylisten
        </Link>

        {/* Header */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-10 mb-16">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant bg-muted">
            <img src={stylist.img} alt={stylist.name} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6 lg:pt-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs">
              <BadgeCheck className="h-3.5 w-3.5 text-gold" /> Verifizierter Profi
            </div>
            <div>
              <h1 className="font-display text-5xl md:text-6xl mb-2">{stylist.name}</h1>
              <p className="text-lg text-muted-foreground">{stylist.specialty}</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-medium">{stylist.rating}</span>
                <span className="text-muted-foreground">({stylist.reviews} Bewertungen)</span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" /> {stylist.city}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{stylist.bio}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="premium" size="lg" onClick={() => goBook()}>
                <CalendarCheck className="h-4 w-4 mr-2" /> Termin buchen
              </Button>
              <Button variant="outline" size="lg">
                <span className="text-sm">Ab </span>
                <span className="font-display text-xl ml-1">{stylist.priceFrom} €</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-16">
            {/* Portfolio */}
            <section>
              <h2 className="font-display text-3xl mb-6">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stylist.portfolio.map((p, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted group">
                    <img src={p} alt={`Portfolio ${i + 1}`} className="h-full w-full object-cover transition-smooth group-hover:scale-110" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section>
              <h2 className="font-display text-3xl mb-6">Services & Preise</h2>
              <div className="space-y-3">
                {stylist.services.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card hover:border-foreground/30 transition-smooth"
                  >
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                        <Clock className="h-3 w-3" /> {s.duration} Min.
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-xl">{s.price} €</span>
                      <Button variant="premium" size="sm" onClick={() => goBook(s.id)}>Buchen</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-display text-3xl mb-6">Bewertungen</h2>
              <div className="space-y-4">
                {stylist.reviewsList.map((r, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{r.name}</div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star
                            key={k}
                            className={cn("h-3.5 w-3.5", k < r.rating ? "fill-gold text-gold" : "text-border")}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{r.text}</p>
                    <p className="text-xs text-muted-foreground/70">{r.date}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Availability sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-2xl mb-4">Verfügbarkeit</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => isBefore(d, startOfToday())}
                locale={de}
                className={cn("p-0 pointer-events-auto")}
              />
              <Button variant="gold" className="w-full mt-4" onClick={() => goBook()}>
                Termin buchen
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StylistProfile;
