import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { Construct } from "@/components/grammar/Construct";

export const metadata: Metadata = {
  title: "Deegh",
  description: "Een eigen product kreeg een webshop met producten, bereiding, recepten, verkooppunten en een zakelijke route.",
  alternates: { canonical: "/projecten/deegh/" },
};

export default function DeeghCase() {
  return (
    <main id="inhoud">
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
