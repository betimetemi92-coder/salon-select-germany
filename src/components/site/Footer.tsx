import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const cols = [
    {
      title: "Plattform",
      links: [
        { label: "Stylisten entdecken", to: "/discover" },
        { label: "So funktioniert's", to: "/how-it-works" },
        { label: "Über uns", to: "/about" },
        { label: "Kontakt", to: "/contact" },
      ],
    },
    {
      title: "Stylisten",
      links: [
        { label: "Pro werden", to: "/register" },
        { label: "Anmelden", to: "/login" },
        { label: "Stylist Dashboard", to: "/dashboard/stylist" },
        { label: "Hilfe-Center", to: "/contact" },
      ],
    },
    {
      title: "Rechtliches",
      links: [
        { label: "Impressum", to: "/impressum" },
        { label: "Datenschutz", to: "/privacy" },
        { label: "AGB", to: "/terms" },
        { label: "Cookie-Richtlinie", to: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 max-w-sm">
            <Link to="/" className="font-display text-3xl mb-4 inline-block">
              Coiffure<span className="text-gold">.</span>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6 mt-2">
              Deutschlands Marktplatz für premium Hairstyling. Verifiziert, transparent, exquisit.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="h-10 w-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-primary transition-smooth"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-lg mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-primary-foreground/60 hover:text-gold transition-smooth"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>© 2025 Coiffure GmbH · Berlin, Deutschland</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/impressum" className="hover:text-gold transition-smooth">Impressum</Link>
            <Link to="/privacy" className="hover:text-gold transition-smooth">Datenschutz</Link>
            <Link to="/terms" className="hover:text-gold transition-smooth">AGB</Link>
          </div>
          <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest">
            <span>Visa</span><span>·</span><span>Mastercard</span><span>·</span><span>PayPal</span><span>·</span><span>Klarna</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
