import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { Construct } from "@/components/grammar/Construct";

const description = "Denckh ontwierp en ontwikkelde de webshop van Deegh voor ambachtelijk pizzadeeg: producten, recepten, uitleg en verkooppunten, op WordPress en WooCommerce.";

export const metadata: Metadata = {
  title: "Deegh: webshop voor ambachtelijk pizzadeeg",
  description,
  alternates: { canonical: "/projecten/deegh/" },
};

// De webshop is werk van Denckh; Deegh is het merk waarvoor hij is gemaakt, met een eigen site (B-091).
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
          <p className="eyebrow">webshop · WooCommerce</p>
          <h1>Van deegbol naar<br /><em>een plek die klopt.</em></h1>
          <p>Een webshop voor ambachtelijk pizzadeeg, ontworpen en ontwikkeld door Denckh. Met aandacht voor product, presentatie en verkoop.</p>
        </header>
        <Construct project="deegh" label="deegh.nl, schematisch" />
        <div className="case-page__facts">
          <section><h2>Idee</h2><p>Pizzadeeg niet alleen verkopen, maar ook laten zien hoe je ermee werkt, wat je kunt maken en waar je het vindt.</p></section>
          <section><h2>Denckh</h2><p>Ontwerp en ontwikkeling van de webshop op WordPress en WooCommerce: snel, overzichtelijk en gemaakt om ambachtelijk deeg online te verkopen.</p></section>
          <section><h2>Vorm</h2><p>Een webshop met producten, recepten, uitleg in stappen, verkooppunten en een zakelijke route.</p></section>
        </div>
        <div className="case-page__next"><p>Heb je zelf iets dat vorm mag krijgen?</p><Link className="button button--dark" href="/#contact">Vertel het me</Link></div>
        <Footer />
      </div>
    </main>
  );
}
