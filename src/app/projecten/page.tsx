import type { Metadata } from "next";
import { Footer, Header } from "@/components/Header";
import { DeeghCase, KofferCase, LoflijnCase, LyevCase, TclpCase } from "@/components/Cases";
import { MoreWork } from "@/components/grammar/MoreWork";

const description = "Projecten van Denckh: webshops, een interactieve productuitleg, een spel, een website over hergebruik van verlichting, apps en kleinere vormen. Elk idee kreeg zijn eigen vorm.";

export const metadata: Metadata = {
  title: "Projecten",
  description,
  alternates: { canonical: "/projecten/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Denckh",
    url: "/projecten/",
    title: "Wat er al vorm kreeg · Denckh",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "denckh. van idee naar vorm" }],
  },
};

// Het volledige openbare portfolio (B-090). De projecten en "Ook gemaakt" stonden eerst op de homepage; de
// componenten zijn verplaatst, niet opnieuw gebouwd. De homepage toont een selectie.
export default function Projecten() {
  return (
    <main id="inhoud">
      <div className="section-shell price-page">
        <Header compact />
        <header className="price-page__header">
          <p className="eyebrow">projecten</p>
          <h1>Wat er al vorm kreeg.</h1>
          <p>Vijf ideeën, vijf soorten denken. Scroll, en kijk hoe een lijn elk project wordt.</p>
        </header>
      </div>

      <section className="shell projects" id="projecten" aria-labelledby="uitgewerkt-titel">
        <h2 id="uitgewerkt-titel" className="visually-hidden">Uitgewerkte projecten</h2>
        <DeeghCase />
        <KofferCase />
        <LoflijnCase />
        <LyevCase />
        <TclpCase />
      </section>

      <section className="shell more-section" id="ook-gemaakt" aria-labelledby="ook-titel">
        <header className="projects__head">
          <h2 id="ook-titel">Ook gemaakt.</h2>
          <p>Kleinere vormen, dezelfde manier van denken.</p>
        </header>
        <MoreWork />
      </section>

      <div className="shell"><Footer /></div>
    </main>
  );
}
