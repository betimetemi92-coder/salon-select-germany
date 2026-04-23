import { Link } from "react-router-dom";

const LegalPage = ({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) => (
  <div className="pt-28 pb-24">
    <div className="container max-w-3xl">
      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Rechtliches</p>
      <h1 className="font-display text-5xl mb-6">{title}</h1>
      <p className="text-muted-foreground mb-12 leading-relaxed">{intro}</p>
      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-2xl mb-3">{s.heading}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.body}</p>
          </section>
        ))}
      </div>
      <div className="mt-16 text-sm text-muted-foreground">
        Stand: Januar 2025 ·{" "}
        <Link to="/contact" className="text-gold hover:underline">Bei Fragen kontaktiere uns</Link>
      </div>
    </div>
  </div>
);

export const Privacy = () => (
  <LegalPage
    title="Datenschutzerklärung"
    intro="Der Schutz deiner persönlichen Daten ist uns sehr wichtig. Diese Datenschutzerklärung informiert dich darüber, wie wir personenbezogene Daten verarbeiten, wenn du Coiffure nutzt — gemäß DSGVO."
    sections={[
      { heading: "1. Verantwortlicher", body: "Coiffure GmbH\nTorstraße 130\n10119 Berlin\nE-Mail: datenschutz@coiffure.de" },
      { heading: "2. Erhobene Daten", body: "Bei der Registrierung erfassen wir Name, E-Mail und (bei Stylisten) Berufsangaben. Bei einer Buchung zusätzlich Telefon, Adresse und Zahlungsdaten — letztere werden ausschließlich von unseren PCI-DSS-zertifizierten Zahlungsanbietern verarbeitet." },
      { heading: "3. Cookies", body: "Wir verwenden technisch notwendige Cookies sowie — mit deiner Einwilligung — Analyse-Cookies, um die Plattform zu verbessern. Deine Einwilligung kannst du jederzeit über den Cookie-Banner widerrufen." },
      { heading: "4. Deine Rechte", body: "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wende dich jederzeit an datenschutz@coiffure.de." },
      { heading: "5. Speicherdauer", body: "Wir speichern deine Daten so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen es vorschreiben." },
    ]}
  />
);

export const Terms = () => (
  <LegalPage
    title="Allgemeine Geschäftsbedingungen"
    intro="Diese AGB regeln das Vertragsverhältnis zwischen der Coiffure GmbH und allen Nutzern (Kunden und Stylisten) der Plattform."
    sections={[
      { heading: "1. Vertragsgegenstand", body: "Coiffure betreibt eine Online-Plattform, die Kunden mit professionellen Hairstylisten in Deutschland zusammenbringt. Der Behandlungsvertrag kommt direkt zwischen Kunde und Stylist zustande." },
      { heading: "2. Buchung & Stornierung", body: "Buchungen sind ab Bestätigung verbindlich. Stornierungen sind bis 24 Stunden vor dem Termin kostenfrei möglich. Spätere Absagen können mit bis zu 50% des Behandlungspreises in Rechnung gestellt werden." },
      { heading: "3. Zahlungen", body: "Die Zahlung erfolgt bei Buchung über unsere zertifizierten Zahlungspartner (Karte, PayPal, Klarna). Coiffure leitet den Betrag nach erfolgter Behandlung an den Stylist weiter, abzüglich der vereinbarten Servicegebühr." },
      { heading: "4. Haftung", body: "Coiffure haftet nicht für Behandlungsergebnisse oder Schäden, die durch den Stylist verursacht werden. Stylisten sind selbst für ihre fachliche Qualifikation und Versicherung verantwortlich." },
      { heading: "5. Schlussbestimmungen", body: "Es gilt deutsches Recht. Gerichtsstand ist Berlin, sofern der Kunde Kaufmann ist. Sollten einzelne Bestimmungen unwirksam sein, bleibt der übrige Vertrag wirksam." },
    ]}
  />
);

export const Impressum = () => (
  <LegalPage
    title="Impressum"
    intro="Angaben gemäß § 5 TMG"
    sections={[
      { heading: "Anbieter", body: "Coiffure GmbH\nTorstraße 130\n10119 Berlin" },
      { heading: "Vertretungsberechtigt", body: "Geschäftsführerin: Lena Hoffmann" },
      { heading: "Kontakt", body: "Telefon: +49 30 1234 5678\nE-Mail: hallo@coiffure.de" },
      { heading: "Registereintrag", body: "Eintragung im Handelsregister.\nRegistergericht: Amtsgericht Berlin-Charlottenburg\nRegisternummer: HRB 234567" },
      { heading: "Umsatzsteuer-ID", body: "Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789" },
    ]}
  />
);
