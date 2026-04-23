import s1 from "@/assets/stylist-1.jpg";
import s2 from "@/assets/stylist-2.jpg";
import s3 from "@/assets/stylist-3.jpg";
import s4 from "@/assets/stylist-4.jpg";

export type Service = { id: string; name: string; price: number; duration: number };

export type StylistFull = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  cityKey: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  priceLabel: string;
  img: string;
  bio: string;
  services: Service[];
  portfolio: string[];
  reviewsList: { name: string; rating: number; text: string; date: string }[];
};

export const stylists: StylistFull[] = [
  {
    id: "lena-hoffmann",
    name: "Lena Hoffmann",
    specialty: "Cuts & Bobs",
    city: "Berlin · Mitte",
    cityKey: "Berlin",
    rating: 4.9,
    reviews: 218,
    priceFrom: 75,
    priceLabel: "ab 75 €",
    img: s1,
    bio: "Mit 12 Jahren Erfahrung in Berlin und Paris ist Lena auf präzise Cuts und Signature Bobs spezialisiert. Editorial-Arbeiten für Vogue Germany und Zalando.",
    services: [
      { id: "cut-w", name: "Damen Schnitt & Föhn", price: 75, duration: 60 },
      { id: "cut-bob", name: "Signature Bob", price: 95, duration: 75 },
      { id: "style", name: "Event Styling", price: 120, duration: 90 },
    ],
    portfolio: [s1, s3, s4, s2, s1, s3],
    reviewsList: [
      { name: "Anna K.", rating: 5, text: "Bester Schnitt meines Lebens. Lena hat ein unfassbares Auge für Proportionen.", date: "vor 2 Wochen" },
      { name: "Marie B.", rating: 5, text: "Sehr professionell, ruhige Atmosphäre, perfektes Ergebnis.", date: "vor 1 Monat" },
      { name: "Julia S.", rating: 4, text: "Tolle Beratung, der Bob sitzt perfekt.", date: "vor 1 Monat" },
    ],
  },
  {
    id: "marco-lange",
    name: "Marco Lange",
    specialty: "Barber & Beard",
    city: "München · Glockenbach",
    cityKey: "München",
    rating: 5.0,
    reviews: 184,
    priceFrom: 55,
    priceLabel: "ab 55 €",
    img: s2,
    bio: "Master Barber mit Fokus auf klassische Cuts, Bart-Konturen und Hot-Towel-Service. Trainiert in London und Mailand.",
    services: [
      { id: "cut-m", name: "Herren Schnitt", price: 55, duration: 45 },
      { id: "beard", name: "Bart-Trim & Hot Towel", price: 35, duration: 30 },
      { id: "combo", name: "Cut & Beard Combo", price: 80, duration: 75 },
    ],
    portfolio: [s2, s4, s1, s3, s2, s4],
    reviewsList: [
      { name: "Tobias R.", rating: 5, text: "Bester Barber Münchens. Punkt.", date: "vor 1 Woche" },
      { name: "Felix M.", rating: 5, text: "Atmosphäre wie in einem Old-School-Salon, mit moderner Präzision.", date: "vor 3 Wochen" },
    ],
  },
  {
    id: "sophie-bauer",
    name: "Sophie Bauer",
    specialty: "Balayage Expert",
    city: "Hamburg · Eppendorf",
    cityKey: "Hamburg",
    rating: 4.9,
    reviews: 312,
    priceFrom: 180,
    priceLabel: "ab 180 €",
    img: s3,
    bio: "Spezialistin für Balayage, Highlights und natürliche Farbverläufe. Wella Master Color Expert.",
    services: [
      { id: "bal", name: "Balayage", price: 220, duration: 180 },
      { id: "high", name: "Highlights & Toner", price: 180, duration: 150 },
      { id: "color", name: "Coloration komplett", price: 160, duration: 120 },
    ],
    portfolio: [s3, s1, s4, s2, s3, s1],
    reviewsList: [
      { name: "Lisa P.", rating: 5, text: "Mein Balayage sieht auch nach 3 Monaten noch perfekt aus.", date: "vor 2 Wochen" },
      { name: "Sara H.", rating: 5, text: "Sophie nimmt sich Zeit für die Beratung. Ergebnis traumhaft.", date: "vor 1 Monat" },
    ],
  },
  {
    id: "elena-vogt",
    name: "Elena Vogt",
    specialty: "Color & Editorial",
    city: "Frankfurt · Westend",
    cityKey: "Frankfurt",
    rating: 4.8,
    reviews: 156,
    priceFrom: 120,
    priceLabel: "ab 120 €",
    img: s4,
    bio: "Editorial-Coloristin mit Erfahrung bei Pariser Couture-Häusern. Spezialgebiet: kräftige, modisch inspirierte Farben.",
    services: [
      { id: "edit", name: "Editorial Color", price: 240, duration: 180 },
      { id: "gloss", name: "Gloss Treatment", price: 120, duration: 60 },
      { id: "cut-e", name: "Schnitt & Style", price: 130, duration: 75 },
    ],
    portfolio: [s4, s3, s1, s2, s4, s3],
    reviewsList: [
      { name: "Nora F.", rating: 5, text: "Mutige Farbe, perfekt umgesetzt. Genau das was ich wollte.", date: "vor 1 Woche" },
      { name: "Hannah W.", rating: 4, text: "Sehr kreativ, tolle Beratung.", date: "vor 1 Monat" },
    ],
  },
];

export const cities = ["Berlin", "München", "Hamburg", "Frankfurt", "Köln", "Düsseldorf"];
export const serviceCategories = ["Schnitt", "Coloration", "Balayage", "Bart", "Styling"];

export const getStylist = (id: string) => stylists.find((s) => s.id === id);
