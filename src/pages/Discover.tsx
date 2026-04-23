import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star, MapPin, BadgeCheck, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { stylists, cities, serviceCategories } from "@/data/stylists";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Discover = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [city, setCity] = useState(params.get("city") || "all");
  const [maxPrice, setMaxPrice] = useState<number>(Number(params.get("max") || 300));
  const [minRating, setMinRating] = useState<number>(Number(params.get("rating") || 0));
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (city && city !== "all") next.set("city", city);
    if (maxPrice !== 300) next.set("max", String(maxPrice));
    if (minRating > 0) next.set("rating", String(minRating));
    setParams(next, { replace: true });
  }, [query, city, maxPrice, minRating, setParams]);

  const filtered = useMemo(() => {
    return stylists.filter((s) => {
      if (city !== "all" && s.cityKey !== city) return false;
      if (s.priceFrom > maxPrice) return false;
      if (s.rating < minRating) return false;
      if (
        query &&
        !`${s.name} ${s.specialty} ${s.city} ${s.services.map((sv) => sv.name).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      if (
        selectedServices.length > 0 &&
        !selectedServices.some((cat) =>
          s.services.some((sv) => sv.name.toLowerCase().includes(cat.toLowerCase())),
        )
      )
        return false;
      return true;
    });
  }, [query, city, maxPrice, minRating, selectedServices]);

  const toggleService = (cat: string) =>
    setSelectedServices((prev) =>
      prev.includes(cat) ? prev.filter((p) => p !== cat) : [...prev, cat],
    );

  const reset = () => {
    setQuery("");
    setCity("all");
    setMaxPrice(300);
    setMinRating(0);
    setSelectedServices([]);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Stylisten entdecken</p>
          <h1 className="font-display text-4xl md:text-5xl">Finde deinen Profi</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">
            {filtered.length} verifizierte Stylisten verfügbar. Filtere nach Stadt, Service, Preis und Bewertung.
          </p>
        </div>

        {/* Search + filter toggle */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nach Name, Service oder Spezialität suchen…"
              className="pl-11 h-12 rounded-full bg-card"
            />
          </div>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setShowFilters((s) => !s)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block space-y-8 lg:sticky lg:top-28 lg:self-start`}>
            <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-display text-lg mb-3">Stadt</h3>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Alle Städte" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="all">Alle Städte</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <h3 className="font-display text-lg">Max. Preis</h3>
                  <span className="text-sm text-gold">{maxPrice} €</span>
                </div>
                <Slider
                  min={50}
                  max={300}
                  step={10}
                  value={[maxPrice]}
                  onValueChange={(v) => setMaxPrice(v[0])}
                />
              </div>

              <div>
                <h3 className="font-display text-lg mb-3">Mindestbewertung</h3>
                <div className="flex gap-2">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-smooth ${
                        minRating === r
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-foreground/40"
                      }`}
                    >
                      {r === 0 ? "Alle" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg mb-3">Services</h3>
                <div className="space-y-2">
                  {serviceCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm">
                      <Checkbox
                        checked={selectedServices.includes(cat)}
                        onCheckedChange={() => toggleService(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={reset}>Filter zurücksetzen</Button>
            </div>
          </aside>

          {/* Results */}
          <div>
            {filtered.length === 0 ? (
              <div className="bg-card border border-border/60 rounded-2xl p-16 text-center">
                <h3 className="font-display text-2xl mb-2">Keine Treffer</h3>
                <p className="text-muted-foreground mb-6">Probiere andere Filter aus.</p>
                <Button variant="outline" onClick={reset}>Filter zurücksetzen</Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((s) => (
                  <Link
                    key={s.id}
                    to={`/stylists/${s.id}`}
                    className="group block animate-fade-up"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-muted">
                      <img
                        src={s.img}
                        alt={s.name}
                        className="h-full w-full object-cover transition-smooth group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs">
                        <BadgeCheck className="h-3.5 w-3.5 text-gold" /> Verifiziert
                      </div>
                      <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-medium">
                        <Star className="h-3 w-3 fill-gold text-gold" /> {s.rating}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl">{s.name}</h3>
                        <span className="text-sm text-gold font-medium">{s.priceLabel}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{s.specialty}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                        <MapPin className="h-3 w-3" /> {s.city} · {s.reviews} Bewertungen
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
