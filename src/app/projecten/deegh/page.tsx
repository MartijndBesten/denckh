import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { Construct } from "@/components/grammar/Construct";

const description = "Denckh maakte de webshop van Deegh, een apart merk voor ambachtelijk pizzadeeg: producten, bereiding, recepten, verkooppunten en een zakelijke route.";

export const metadata: Metadata = {
  title: "Deegh: webshop voor een pizzadeegmerk",
  description,
  alternates: { canonical: "/projecten/deegh/" },
};

// Deegh is hier het onderwerp van werk van Denckh, met een eigen site; geen onderdeel van Denckh (B-091).
const project = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://denckh.nl/projecten/deegh/#project",
  name: "Webshop deegh.nl",
  url: "https://denckh.nl/projecten/deegh/",
  description,
  creator: { "@id": "https://denckh.nl/#organisatie" },
  about: { "@type": "Brand", name: "Deegh", url: "https://deegh.nl/" },
};

export default function DeeghCase() {
  return (
    <main id="inhoud">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(project) }} />
      <div className="section-shell case-page">
        <Header compact />
        <Link className="back-link" href="/projecten/">← Alle projecten</Link>
        <header className="case-page__header">
          <p className="eyebrow">eigen product · webshop</p>
          <h1>Van deegbol naar<br /><em>een plek die klopt.</em></h1>
          <p>Van productidee tot herkenbaar pizzadeegmerk. Met aandacht voor product, presentatie en verkoop.</p>
        </header>
        <Construct project="deegh" label="deegh.nl, schematisch" />
        <div className="case-page__facts">
          <section><h2>Idee</h2><p>Een product niet alleen aanbieden, maar ook laten zien hoe je ermee werkt, wat je kunt maken en waar je het vindt.</p></section>
          <section><h2>Denckh</h2><p>Merk, presentatie en een eigen webshop: snel, overzichtelijk en gemaakt om ambachtelijk deeg online te verkopen.</p></section>
          <section><h2>Vorm</h2><p>Een webshop met pizzabol- en deegpakketten, bereiding, recepten, verkooppunten, een zakelijke route en een helder merkverhaal.</p></section>
        </div>
        <div className="case-page__next"><p>Heb je zelf iets dat vorm mag krijgen?</p><Link className="button button--dark" href="/#contact">Vertel het me</Link></div>
        <Footer />
      </div>
    </main>
  );
}
