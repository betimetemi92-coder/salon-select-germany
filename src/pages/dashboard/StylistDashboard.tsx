import { useState } from "react";
import { TrendingUp, Calendar as CalendarIcon, Euro, Star, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import s1 from "@/assets/stylist-1.jpg";
import s2 from "@/assets/stylist-2.jpg";
import s3 from "@/assets/stylist-3.jpg";

// Mock bookings shown to the stylist
const mockBookings = [
  { id: "b1", customer: "Anna Müller", service: "Damen Schnitt & Föhn", date: "Heute", time: "10:30", price: 75, img: s1 },
  { id: "b2", customer: "Lisa Klein", service: "Balayage", date: "Heute", time: "13:00", price: 220, img: s3 },
  { id: "b3", customer: "Marie Becker", service: "Event Styling", date: "Morgen", time: "09:00", price: 120, img: s2 },
  { id: "b4", customer: "Sophie Fischer", service: "Signature Bob", date: "Fr, 28.", time: "15:30", price: 95, img: s1 },
];

const earningsData = [
  { week: "KW 14", value: 980 },
  { week: "KW 15", value: 1240 },
  { week: "KW 16", value: 1110 },
  { week: "KW 17", value: 1480 },
  { week: "KW 18", value: 1620 },
  { week: "KW 19", value: 1390 },
];

const StylistDashboard = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [blocked, setBlocked] = useState<Date[]>([]);

  const toggleBlocked = (d: Date | undefined) => {
    if (!d) return;
    setBlocked((prev) => {
      const exists = prev.some((p) => p.toDateString() === d.toDateString());
      return exists ? prev.filter((p) => p.toDateString() !== d.toDateString()) : [...prev, d];
    });
    setDate(d);
  };

  const maxEarning = Math.max(...earningsData.map((e) => e.value));
  const totalThisMonth = earningsData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Stylist Dashboard</p>
            <h1 className="font-display text-4xl md:text-5xl">Hallo, {user?.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground mt-2">Verwalte Buchungen, Verfügbarkeit und Einnahmen.</p>
          </div>
          <Button variant="premium">Profil bearbeiten</Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Einnahmen (Monat)", value: `${totalThisMonth.toLocaleString("de-DE")} €`, icon: Euro, trend: "+12%" },
            { label: "Buchungen heute", value: 2, icon: CalendarIcon },
            { label: "Stammkunden", value: 87, icon: Users, trend: "+4" },
            { label: "Bewertung", value: "4.9", icon: Star },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center">
                  <s.icon className="h-4 w-4 text-gold" />
                </div>
                {s.trend && <span className="text-xs text-gold flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {s.trend}</span>}
              </div>
              <div className="font-display text-3xl">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bookings list */}
          <section className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-display text-2xl mb-4">Heute & Diese Woche</h2>
              <div className="space-y-3">
                {mockBookings.map((b) => (
                  <div key={b.id} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                    <img src={b.img} alt={b.customer} className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{b.customer}</div>
                      <div className="text-xs text-muted-foreground">{b.service} · {b.date} · {b.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg">{b.price} €</div>
                      <div className="flex gap-2 mt-1">
                        <button className="text-xs text-gold hover:underline">Bestätigen</button>
                        <button className="text-xs text-muted-foreground hover:text-destructive">Ablehnen</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings chart */}
            <div>
              <div className="flex items-end justify-between mb-4">
                <h2 className="font-display text-2xl">Einnahmen</h2>
                <span className="text-sm text-muted-foreground">Letzte 6 Wochen</span>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-end justify-between gap-3 h-48">
                  {earningsData.map((e) => {
                    const h = (e.value / maxEarning) * 100;
                    return (
                      <div key={e.week} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs text-muted-foreground">{e.value}€</div>
                        <div
                          className="w-full rounded-t-lg gradient-gold transition-all"
                          style={{ height: `${h}%` }}
                        />
                        <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{e.week}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Availability */}
          <aside className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-xl mb-2">Verfügbarkeit</h3>
              <p className="text-xs text-muted-foreground mb-4">Klick auf einen Tag, um ihn als nicht verfügbar zu markieren.</p>
              <Calendar
                mode="single"
                selected={date}
                onSelect={toggleBlocked}
                modifiers={{ blocked }}
                modifiersClassNames={{ blocked: "bg-destructive/20 text-destructive line-through" }}
                locale={de}
                className={cn("p-0 pointer-events-auto")}
              />
              {blocked.length > 0 && (
                <div className="mt-4 text-xs text-muted-foreground">
                  Blockiert: {blocked.map((d) => format(d, "d. MMM", { locale: de })).join(", ")}
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-xl mb-4">Auszahlung</h3>
              <div className="text-3xl font-display mb-1">{(totalThisMonth * 0.85).toFixed(0)} €</div>
              <p className="text-xs text-muted-foreground mb-4">Verfügbar zur Auszahlung</p>
              <Button variant="gold" className="w-full">Jetzt auszahlen</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StylistDashboard;
