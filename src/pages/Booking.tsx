import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowLeft, Calendar as CalendarIcon, Check, ChevronLeft, Clock, CreditCard, Lock, MapPin, Sparkles, Star, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getStylist } from "@/data/stylists";
import { useAuth } from "@/contexts/AuthContext";
import { addBooking } from "@/data/bookings";

const SLOTS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name zu kurz").max(80),
  email: z.string().trim().email("Ungültige E-Mail").max(160),
  phone: z.string().trim().min(6, "Telefonnummer zu kurz").max(30),
});

type Step = 1 | 2 | 3 | 4;

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const stylist = id ? getStylist(id) : undefined;

  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState<string | undefined>(params.get("service") || undefined);
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [time, setTime] = useState<string | undefined>();
  const [payment, setPayment] = useState<"card" | "paypal" | "klarna">("card");
  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const service = useMemo(
    () => stylist?.services.find((s) => s.id === serviceId),
    [stylist, serviceId],
  );

  if (!stylist) {
    return <Navigate to="/discover" replace />;
  }

  const next = () => setStep((s) => Math.min(4, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);
  const canNext =
    (step === 1 && !!serviceId) ||
    (step === 2 && !!date && !!time) ||
    step === 3;

  const handleConfirm = async () => {
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const map: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        map[i.path[0] as string] = i.message;
      });
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1100));
    if (!service || !date || !time) {
      setSubmitting(false);
      return;
    }
    const booking = addBooking({
      userId: user?.id || "guest",
      stylistId: stylist.id,
      stylistName: stylist.name,
      stylistImg: stylist.img,
      serviceName: service.name,
      price: service.price,
      duration: service.duration,
      date: format(date, "yyyy-MM-dd"),
      time,
      paymentMethod: payment,
    });
    setConfirmedId(booking.id);
    setSubmitting(false);
    setDone(true);
    toast.success("Buchung bestätigt", {
      description: `${service.name} am ${format(date, "d. MMM", { locale: de })} um ${time}`,
    });
  };

  if (done) {
    return (
      <div className="pt-32 pb-24">
        <div className="container max-w-2xl">
          <div className="bg-card border border-border rounded-3xl p-12 text-center shadow-elegant animate-fade-up">
            <div className="h-16 w-16 rounded-full gradient-gold mx-auto flex items-center justify-center shadow-gold mb-6">
              <Check className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl mb-3">Termin bestätigt</h1>
            <p className="text-muted-foreground mb-8">
              Wir haben dir eine Bestätigung an {form.email} gesendet. Buchungs-Nr.{" "}
              <span className="font-mono text-xs">{confirmedId?.slice(0, 8)}</span>
            </p>
            <div className="bg-secondary/60 rounded-2xl p-6 text-left space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stylist</span>
                <span className="font-medium">{stylist.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{service?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Termin</span>
                <span className="font-medium">
                  {date && format(date, "d. MMM yyyy", { locale: de })} · {time}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-muted-foreground">Bezahlt</span>
                <span className="font-display text-xl">{service?.price} €</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {user ? (
                <Button asChild variant="premium">
                  <Link to="/dashboard">Meine Buchungen</Link>
                </Button>
              ) : (
                <Button asChild variant="premium">
                  <Link to="/register">Konto erstellen</Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link to="/discover">Weiter entdecken</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="container max-w-4xl">
        <Link to={`/stylists/${stylist.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Profil
        </Link>

        <div className="bg-card border border-border/60 rounded-3xl overflow-hidden shadow-elegant">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-border/60">
            <div className="flex items-center gap-4">
              <img src={stylist.img} alt={stylist.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-2xl">Termin bei {stylist.name}</h1>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {stylist.city}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" /> {stylist.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className={cn("h-1 flex-1 rounded-full transition-smooth", step >= n ? "bg-gold" : "bg-secondary")} />
              ))}
            </div>
            <div className="flex justify-between text-[0.7rem] uppercase tracking-widest text-muted-foreground pt-2">
              <span className={step >= 1 ? "text-foreground" : ""}>Service</span>
              <span className={step >= 2 ? "text-foreground" : ""}>Termin</span>
              <span className={step >= 3 ? "text-foreground" : ""}>Daten</span>
              <span className={step >= 4 ? "text-foreground" : ""}>Bezahlen</span>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {step === 1 && (
              <div className="space-y-3 animate-fade-in">
                <h3 className="font-display text-xl mb-4">Wähle deinen Service</h3>
                {stylist.services.map((s) => {
                  const active = serviceId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={cn(
                        "w-full text-left p-5 rounded-2xl border transition-smooth flex items-center justify-between gap-4",
                        active ? "border-gold bg-gold/5 shadow-soft" : "border-border hover:border-foreground/30",
                      )}
                    >
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.duration} Min.</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-xl">{s.price} €</span>
                        <span className={cn("h-5 w-5 rounded-full border flex items-center justify-center transition-smooth", active ? "bg-gold border-gold" : "border-border")}>
                          {active && <Check className="h-3 w-3 text-primary-foreground" />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                <div>
                  <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gold" /> Datum
                  </h3>
                  <div className="rounded-2xl border border-border p-2 bg-background">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => isBefore(d, startOfToday())}
                      locale={de}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" /> Uhrzeit
                  </h3>
                  {date ? (
                    <div className="grid grid-cols-3 gap-2">
                      {SLOTS.map((slot) => {
                        const active = time === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setTime(slot)}
                            className={cn("py-3 rounded-xl border text-sm transition-smooth", active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground/40")}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Bitte wähle zuerst ein Datum.</p>
                  )}
                  {date && time && (
                    <p className="text-xs text-muted-foreground mt-4">
                      Ausgewählt: {format(date, "EEEE, d. MMMM yyyy", { locale: de })} · {time}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-6">
                <h3 className="font-display text-xl">Deine Daten</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="fullName">Voller Name</Label>
                    <Input id="fullName" value={form.fullName} maxLength={80} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Anna Müller" />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" type="email" value={form.email} maxLength={160} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="anna@example.com" />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" value={form.phone} maxLength={30} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+49 ..." />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>
                <div className="rounded-2xl bg-secondary/60 border border-border p-5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Bestellübersicht</h4>
                  <div className="flex justify-between text-sm"><span>{service?.name}</span><span>{service?.price} €</span></div>
                  <div className="flex justify-between text-sm text-muted-foreground"><span>{date && format(date, "d. MMM yyyy", { locale: de })} · {time}</span><span>{service?.duration} Min.</span></div>
                  <div className="hairline" />
                  <div className="flex justify-between font-display text-xl"><span>Gesamt</span><span>{service?.price} €</span></div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in space-y-6">
                <h3 className="font-display text-xl">Zahlungsart wählen</h3>
                <RadioGroup value={payment} onValueChange={(v) => setPayment(v as typeof payment)} className="space-y-3">
                  {[
                    { id: "card", label: "Kredit- oder Debitkarte", icon: CreditCard, hint: "Visa, Mastercard, Amex" },
                    { id: "paypal", label: "PayPal", icon: Wallet, hint: "Sicher mit deinem PayPal-Konto" },
                    { id: "klarna", label: "Klarna — Später bezahlen", icon: Sparkles, hint: "In 30 Tagen oder in 3 Raten" },
                  ].map((p) => {
                    const active = payment === p.id;
                    return (
                      <Label key={p.id} htmlFor={p.id} className={cn("flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-smooth", active ? "border-gold bg-gold/5" : "border-border hover:border-foreground/30")}>
                        <RadioGroupItem value={p.id} id={p.id} className="border-foreground/40" />
                        <p.icon className="h-5 w-5 text-gold" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{p.label}</div>
                          <div className="text-xs text-muted-foreground">{p.hint}</div>
                        </div>
                      </Label>
                    );
                  })}
                </RadioGroup>

                {payment === "card" && (
                  <div className="grid sm:grid-cols-2 gap-4 animate-fade-in">
                    <div className="sm:col-span-2 space-y-2">
                      <Label>Kartennummer</Label>
                      <Input placeholder="1234 5678 9012 3456" maxLength={19} inputMode="numeric" />
                    </div>
                    <div className="space-y-2"><Label>Gültig bis</Label><Input placeholder="MM / JJ" maxLength={7} /></div>
                    <div className="space-y-2"><Label>CVC</Label><Input placeholder="123" maxLength={4} inputMode="numeric" /></div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Sichere SSL-Verschlüsselung. Wir speichern keine Kartendaten.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-border/60 bg-secondary/40 flex items-center justify-between gap-4">
            <div className="text-sm">
              {service && (
                <>
                  <span className="text-muted-foreground">Gesamt</span>{" "}
                  <span className="font-display text-xl">{service.price} €</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {step > 1 && (
                <Button variant="ghost" onClick={back} disabled={submitting}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Zurück
                </Button>
              )}
              {step < 4 && (
                <Button variant="premium" onClick={next} disabled={!canNext}>Weiter</Button>
              )}
              {step === 4 && (
                <Button variant="gold" onClick={handleConfirm} disabled={submitting}>
                  {submitting ? "Wird gebucht…" : `Jetzt buchen · ${service?.price} €`}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
