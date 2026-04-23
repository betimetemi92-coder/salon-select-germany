import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff, Loader2, User as UserIcon, Scissors, Mars, Venus, Transgender } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, Role, Gender } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    name: z.string().trim().min(2, "Name zu kurz").max(80),
    email: z.string().trim().email("Bitte gültige E-Mail eingeben").max(160),
    password: z.string().min(8, "Mindestens 8 Zeichen"),
    confirm: z.string(),
    role: z.enum(["customer", "stylist"]),
    gender: z.enum(["male", "female", "diverse"], {
      errorMap: () => ({ message: "Bitte Geschlecht wählen" }),
    }),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirm"],
  });

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "customer" as Role,
    gender: "" as Gender | "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (map[i.path[0] as string] = i.message));
      setErrors(map);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const u = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        gender: form.gender as Gender,
      });
      toast.success("Willkommen bei Coiffure!");
      navigate(u.role === "stylist" ? "/dashboard/stylist" : "/dashboard", { replace: true });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Registrierung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen flex items-center">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl mb-2">Konto erstellen</h1>
          <p className="text-muted-foreground">Werde Teil von Deutschlands Beauty-Marktplatz.</p>
        </div>

        <form onSubmit={onSubmit} className="bg-card border border-border rounded-3xl p-8 shadow-soft space-y-5">
          {serverError && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          {/* Role selector */}
          <div className="space-y-2">
            <Label>Ich bin…</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "customer", label: "Kunde", desc: "Termine buchen", icon: UserIcon },
                { v: "stylist", label: "Stylist", desc: "Kunden gewinnen", icon: Scissors },
              ].map((r) => {
                const active = form.role === r.v;
                return (
                  <button
                    type="button"
                    key={r.v}
                    onClick={() => set("role", r.v as Role)}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-smooth",
                      active ? "border-gold bg-gold/5" : "border-border hover:border-foreground/30",
                    )}
                  >
                    <r.icon className={cn("h-5 w-5 mb-2", active ? "text-gold" : "text-muted-foreground")} />
                    <div className="font-medium text-sm">{r.label}</div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Voller Name</Label>
            <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Anna Müller" maxLength={80} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="anna@example.com" maxLength={160} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <div className="relative">
              <Input id="password" type={show ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Mind. 8 Zeichen" />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Passwort anzeigen">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Passwort bestätigen</Label>
            <Input id="confirm" type={show ? "text" : "password"} value={form.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Passwort wiederholen" />
            {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
          </div>

          <p className="text-xs text-muted-foreground">
            Mit der Registrierung akzeptierst du unsere{" "}
            <Link to="/terms" className="text-gold hover:underline">AGB</Link> und{" "}
            <Link to="/privacy" className="text-gold hover:underline">Datenschutzerklärung</Link>.
          </p>

          <Button type="submit" variant="premium" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Wird erstellt…</>
            ) : (
              "Konto erstellen"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Schon ein Konto?{" "}
            <Link to="/login" className="text-gold hover:underline font-medium">Anmelden</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
