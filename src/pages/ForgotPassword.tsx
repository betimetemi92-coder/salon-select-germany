import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({ email: z.string().trim().email("Bitte gültige E-Mail eingeben") });

const ForgotPassword = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError("");
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen flex items-center">
      <div className="container max-w-md">
        {done ? (
          <div className="bg-card border border-border rounded-3xl p-10 text-center shadow-soft animate-fade-up">
            <div className="h-14 w-14 rounded-full gradient-gold mx-auto flex items-center justify-center mb-5 shadow-gold">
              <MailCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl mb-3">E-Mail gesendet</h1>
            <p className="text-muted-foreground mb-6">
              Wir haben einen Link zum Zurücksetzen des Passworts an <b>{email}</b> gesendet.
              Bitte prüfe auch deinen Spam-Ordner.
            </p>
            <Button asChild variant="premium" className="w-full">
              <Link to="/login">Zurück zum Login</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl mb-2">Passwort vergessen</h1>
              <p className="text-muted-foreground">
                Gib deine E-Mail ein – wir senden dir einen Link zum Zurücksetzen.
              </p>
            </div>
            <form onSubmit={onSubmit} className="bg-card border border-border rounded-3xl p-8 shadow-soft space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="anna@example.com" />
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>
              <Button type="submit" variant="premium" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Wird gesendet…</>
                ) : (
                  "Reset-Link senden"
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                <Link to="/login" className="text-gold hover:underline">Zurück zum Login</Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
