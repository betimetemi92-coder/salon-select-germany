import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("Bitte gültige E-Mail eingeben"),
  password: z.string().min(6, "Mindestens 6 Zeichen"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (map[i.path[0] as string] = i.message));
      setErrors(map);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const u = await login(email, password, remember);
      toast.success(`Willkommen zurück, ${u.name.split(" ")[0]}!`);
      const from = (location.state as { from?: string })?.from;
      const roleHome =
        u.role === "admin" ? "/admin" : u.role === "stylist" ? "/dashboard/stylist" : "/dashboard";
      const target = from || roleHome;
      navigate(target, { replace: true });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Login fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen flex items-center">
      <div className="container max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl mb-2">Willkommen zurück</h1>
          <p className="text-muted-foreground">Melde dich in deinem Coiffure-Konto an.</p>
        </div>

        <form onSubmit={onSubmit} className="bg-card border border-border rounded-3xl p-8 shadow-soft space-y-5">
          {serverError && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anna@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Passwort</Label>
              <Link to="/forgot-password" className="text-xs text-gold hover:underline">
                Passwort vergessen?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Passwort anzeigen"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
            Angemeldet bleiben
          </label>

          <Button type="submit" variant="premium" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Wird angemeldet…</>
            ) : (
              "Anmelden"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Noch kein Konto?{" "}
            <Link to="/register" className="text-gold hover:underline font-medium">Registrieren</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
