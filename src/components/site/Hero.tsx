import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Scissors, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-warm" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-blush blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 -right-20 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-3xl -z-10" />

      <div className="container grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/60 text-xs tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Deutschlands Beauty-Marktplatz
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            Dein Look,
            <br />
            <span className="italic text-gold">perfekt</span> gebucht.
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Entdecke Berlins, Münchens und Hamburgs feinste Hairstylisten und Barbiere. Verifizierte Profis, transparente Preise, sofortige Buchung.
          </p>

          {/* Search bar */}
          <div className="bg-card rounded-2xl shadow-elegant border border-border/60 p-2 flex flex-col sm:flex-row gap-2 max-w-2xl">
            <div className="flex items-center gap-3 flex-1 px-4 py-3 sm:border-r border-border/60">
              <MapPin className="h-4 w-4 text-gold shrink-0" />
              <input
                type="text"
                placeholder="Stadt oder PLZ"
                className="bg-transparent w-full text-sm outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="flex items-center gap-3 flex-1 px-4 py-3">
              <Scissors className="h-4 w-4 text-gold shrink-0" />
              <input
                type="text"
                placeholder="Service – z.B. Coloration"
                className="bg-transparent w-full text-sm outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <Button variant="premium" size="lg" className="sm:w-auto w-full">
              <Search className="h-4 w-4 mr-2" /> Suchen
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="font-display text-2xl">2.400+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Stylisten</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl flex items-center gap-1.5">4.9 <Star className="h-4 w-4 fill-gold text-gold" /></div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Bewertung</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl">12 Städte</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Deutschland</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="lg:col-span-6 relative animate-fade-in">
          <div className="relative aspect-[4/5] max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-elegant">
              <img
                src={heroImg}
                alt="Elegante Frau im Premium-Salon mit perfektem Haar"
                className="h-full w-full object-cover transition-smooth hover:scale-105"
                width={1536}
                height={1536}
              />
              <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
            </div>

            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elegant p-4 flex items-center gap-3 border border-border/60 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Star className="h-5 w-5 fill-gold text-gold" />
              </div>
              <div>
                <div className="text-sm font-medium">Verifizierte Profis</div>
                <div className="text-xs text-muted-foreground">Geprüfte Qualität</div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-elegant px-5 py-3 border border-border/60 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Heute frei</div>
              <div className="font-display text-xl">14:30 · Berlin</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
