import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Heart, Settings, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Booking, getBookingsByUser, updateBookingStatus } from "@/data/bookings";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { stylists } from "@/data/stylists";
import { toast } from "sonner";

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) setBookings(getBookingsByUser(user.id));
  }, [user]);

  const cancel = (id: string) => {
    updateBookingStatus(id, "cancelled");
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status: "cancelled" } : x)));
    toast.success("Buchung storniert");
  };

  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const past = bookings.filter((b) => b.status !== "upcoming");

  const recommended = stylists.slice(0, 3);

  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Mein Konto</p>
            <h1 className="font-display text-4xl md:text-5xl">Hallo, {user?.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground mt-2">Verwalte deine Termine, Favoriten und Daten.</p>
          </div>
          <Button asChild variant="premium"><Link to="/discover">Neuen Termin buchen</Link></Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Anstehende Termine", value: upcoming.length, icon: Calendar },
            { label: "Vergangene Besuche", value: past.length, icon: Sparkles },
            { label: "Favoriten", value: 4, icon: Heart },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gold/15 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-display text-3xl">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-display text-2xl mb-4">Anstehende Termine</h2>
              {upcoming.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-10 text-center">
                  <p className="text-muted-foreground mb-4">Du hast keine anstehenden Termine.</p>
                  <Button asChild variant="premium"><Link to="/discover">Jetzt buchen</Link></Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((b) => (
                    <div key={b.id} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                      <img src={b.stylistImg} alt={b.stylistName} className="h-14 w-14 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{b.serviceName}</div>
                        <div className="text-xs text-muted-foreground">
                          bei {b.stylistName} · {format(new Date(b.date), "d. MMM yyyy", { locale: de })} · {b.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg">{b.price} €</div>
                        <button onClick={() => cancel(b.id)} className="text-xs text-destructive hover:underline">Stornieren</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">Vergangen</h2>
              {past.length === 0 ? (
                <p className="text-sm text-muted-foreground">Noch keine vergangenen Termine.</p>
              ) : (
                <div className="space-y-3">
                  {past.map((b) => (
                    <div key={b.id} className="bg-card/50 border border-border rounded-2xl p-5 flex items-center gap-4 opacity-80">
                      <img src={b.stylistImg} alt={b.stylistName} className="h-12 w-12 rounded-full object-cover grayscale" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{b.serviceName}</div>
                        <div className="text-xs text-muted-foreground">
                          {b.stylistName} · {format(new Date(b.date), "d. MMM yyyy", { locale: de })} · {b.time}
                        </div>
                      </div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {b.status === "cancelled" ? "Storniert" : "Abgeschlossen"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">Empfohlen für dich</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {recommended.map((s) => (
                  <Link key={s.id} to={`/stylists/${s.id}`} className="group block">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-muted">
                      <img src={s.img} alt={s.name} className="h-full w-full object-cover transition-smooth group-hover:scale-110" />
                    </div>
                    <div className="font-display text-lg">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.specialty}</div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-xl mb-4">Konto</h3>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Name</span><div>{user?.name}</div></div>
                <div><span className="text-muted-foreground">E-Mail</span><div>{user?.email}</div></div>
                <div><span className="text-muted-foreground">Mitglied seit</span><div>{user && format(new Date(user.createdAt), "MMMM yyyy", { locale: de })}</div></div>
              </div>
              <Button variant="outline" className="w-full mt-5"><Settings className="h-4 w-4 mr-2" /> Einstellungen</Button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-xl mb-4 flex items-center gap-2"><CreditCard className="h-4 w-4 text-gold" /> Zahlungsmethoden</h3>
              <div className="text-sm text-muted-foreground mb-4">Visa endend auf 4242</div>
              <Button variant="outline" className="w-full">Karte hinzufügen</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
