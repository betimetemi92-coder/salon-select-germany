import { FormEvent, useState } from "react";
import { z } from "zod";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Name zu kurz").max(80),
  email: z.string().trim().email("Ungültige E-Mail").max(160),
  subject: z.string().trim().min(2, "Betreff fehlt").max(120),
  message: z.string().trim().min(10, "Mindestens 10 Zeichen").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (map[i.path[0] as string] = i.message));
      setErrors(map);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Nachricht gesendet", { description: "Wir melden uns innerhalb von 24h." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Kontakt</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">Sprich mit uns</h1>
          <p className="text-muted-foreground">Fragen zu Buchungen, Stylisten oder Geschäftsanfragen — wir sind für dich da.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: Mail, title: "E-Mail", value: "hallo@coiffure.de" },
              { icon: Phone, title: "Telefon", value: "+49 30 1234 5678" },
              { icon: MapPin, title: "Office", value: "Torstraße 130\n10119 Berlin" },
            ].map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-2xl p-6">
                <c.icon className="h-5 w-5 text-gold mb-3" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{c.title}</div>
                <div className="font-medium whitespace-pre-line">{c.value}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={160} />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Betreff</Label>
              <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={120} />
              {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Nachricht</Label>
              <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} maxLength={2000} />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" variant="premium" size="lg" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Wird gesendet…</>
              ) : (
                <><Send className="h-4 w-4 mr-2" /> Nachricht senden</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
