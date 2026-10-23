import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://denckh.nl"),
  title: {
    default: "Denckh · websites, apps en slimme techniek in Houten",
    template: "%s · Denckh",
  },
  description: "Denckh maakt websites, handige apps en slimme technische oplossingen. Voor particulieren, zelfstandigen en kleine bedrijven in Houten en omgeving.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Denckh",
    title: "Denckh · websites, apps en slimme techniek in Houten",
    description: "Websites, handige apps en slimme technische oplossingen voor particulieren, zelfstandigen en kleine bedrijven.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "denckh. van idee naar vorm" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: "Denckh · websites, apps en slimme techniek in Houten",
    description: "Van idee naar vorm.",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  colorScheme: "light",
};

// Denckh als eigen merk (B-091). Bewust zonder straat en btw-nummer: die deelt Denckh met Deegh (zelfde inschrijving)
// en ze staan zichtbaar in de footer. In de gestructureerde gegevens maakten ze van twee merken één bedrijf.
const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://denckh.nl/#organisatie",
      name: "Denckh",
      alternateName: "Denckh.",
      url: "https://denckh.nl/",
      logo: "https://denckh.nl/brand/denckh-logo-signature-transparent-web.png",
      image: "https://denckh.nl/og.png",
      slogan: "van idee naar vorm",
      description: "Websites, handige apps en slimme technische oplossingen voor particulieren, zelfstandigen en kleine bedrijven.",
      email: "info@denckh.nl",
      address: { "@type": "PostalAddress", addressLocality: "Houten", addressRegion: "Utrecht", addressCountry: "NL" },
      areaServed: ["Houten", "Nieuwegein", "Utrecht", "Bunnik"],
      knowsAbout: ["websites", "webshops", "apps", "automatiseren", "lichtsturing", "sensoren"],
      sameAs: ["https://www.instagram.com/denckh.nl/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://denckh.nl/#website",
      name: "Denckh",
      alternateName: ["Denckh.", "denckh.nl"],
      url: "https://denckh.nl/",
      inLanguage: "nl-NL",
      publisher: { "@id": "https://denckh.nl/#organisatie" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/fraunces-denckh.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/manrope-denckh.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <a className="skip-link" href="#inhoud">Ga naar de inhoud</a>
        {children}
        <script defer src="https://dashboard.denckh.nl/s.js" data-brand="denckh" />
      </body>
    </html>
  );
}
