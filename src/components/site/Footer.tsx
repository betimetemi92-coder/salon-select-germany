import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 max-w-sm">
            <div className="font-display text-3xl mb-4">Coiffure<span className="text-gold">.</span></div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Deutschlands Marktplatz für premium Hairstyling. Verifiziert, transparent, exquisit.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-primary transition-smooth">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Plattform", links: ["Entdecken", "So funktioniert's", "Preise", "Geschenkkarten"] },
            { title: "Stylisten", links: ["Registrieren", "Pro werden", "Ressourcen", "Hilfe-Center"] },
            { title: "Unternehmen", links: ["Über uns", "Karriere", "Presse", "Kontakt"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-lg mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-primary-foreground/60 hover:text-gold transition-smooth">{l}</a>
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
            <a href="#" className="hover:text-gold transition-smooth">Impressum</a>
            <a href="#" className="hover:text-gold transition-smooth">Datenschutz</a>
            <a href="#" className="hover:text-gold transition-smooth">AGB</a>
            <a href="#" className="hover:text-gold transition-smooth">Cookies</a>
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
