import { useNavigate } from "react-router-dom";

const cities = [
  { name: "Berlin", count: "640+ Stylisten" },
  { name: "München", count: "420+ Stylisten" },
  { name: "Hamburg", count: "380+ Stylisten" },
  { name: "Frankfurt", count: "290+ Stylisten" },
  { name: "Köln", count: "260+ Stylisten" },
  { name: "Düsseldorf", count: "210+ Stylisten" },
];

const Cities = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 border-y border-border/60 bg-secondary/40">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Verfügbar in</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cities.map((c) => (
            <button
              key={c.name}
              onClick={() => navigate(`/discover?city=${encodeURIComponent(c.name)}`)}
              className="group text-center py-4 transition-smooth hover:-translate-y-1"
            >
              <div className="font-display text-2xl md:text-3xl group-hover:text-gold transition-smooth">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.count}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cities;
