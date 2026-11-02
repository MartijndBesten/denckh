import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { FormPrices } from "@/components/grammar/FormPrices";
import { PriceLine } from "@/components/grammar/PriceLine";
import { BTW_NOTE, EXTRA, FORM_PRICES, INCLUDED, NOT_INCLUDED, PRICE_PDF, SOCIAL, START_STOPS, WEB_ADDRESS } from "@/lib/prices";

const description = "Richtprijzen van Denckh: het eerste gesprek is gratis, een uur samen denken kost €45 en een werkend resultaat begint vanaf €295. Je weet vooraf wat jouw idee kost.";

export const metadata: Metadata = {
  title: "Prijzen",
  description,
  alternates: { canonical: "/prijzen/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Denckh",
    url: "/prijzen/",
    title: "Wat kan een idee kosten? · Denckh",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "denckh. van idee naar vorm" }],
  },
};

export default function Prijzen() {
  // de prijslijst verschijnt pas als het bestand er echt staat: nooit een kapotte link
  const hasPdf = fs.existsSync(path.join(process.cwd(), "public", PRICE_PDF));

  return (
    <main id="inhoud">
      <div className="section-shell price-page">
        <Header compact />
        <header className="price-page__header">
          <p className="eyebrow">prijzen</p>
          <h1>Wat kan een idee kosten?</h1>
          <p>Een eerste gesprek is gratis. Pas als we afspreken dat ik iets voor je uitzoek, ontwerp of maak, kost het iets. Hieronder staan richtprijzen voor compacte, goed afgebakende opdrachten; na de intake weet je vooraf wat jouw idee kost.</p>
        </header>

        <section className="price-page__section" aria-labelledby="begin-titel">
          <h2 id="begin-titel">Hoe het begint.</h2>
          <PriceLine stops={START_STOPS} label="Kennismaken, Even Denckh en een project" />
        </section>

        <section className="price-page__section" aria-labelledby="vormen-titel">
          <header className="price-page__head">
            <h2 id="vormen-titel">Richtprijzen per vorm.</h2>
            <p>{BTW_NOTE}</p>
          </header>
          <FormPrices items={FORM_PRICES} />
        </section>

        <section className="price-page__section price-page__scope" aria-labelledby="standaard-titel">
          <div>
            <h2 id="standaard-titel">Wat zit er standaard bij?</h2>
            <ul className="scope-list scope-list--in">{INCLUDED.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h2 id="niet-titel">Niet standaard inbegrepen</h2>
            <ul className="scope-list" aria-labelledby="niet-titel">{NOT_INCLUDED.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="price-page__small">Heb je iets hiervan nodig? Dan spreken we het vooraf apart af.</p>
          </div>
        </section>

        <section className="price-page__section price-page__notes" aria-label="Webadres, hosting en meerwerk">
          <div>
            <h3>Je eigen webadres en hosting</h3>
            <ul className="scope-list scope-list--small">{WEB_ADDRESS.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h3>{EXTRA.title}</h3>
            <p>{EXTRA.text}</p>
          </div>
        </section>

        <section className="price-page__section" id="maatschappelijk" aria-labelledby="maatschappelijk-titel">
          <h2 id="maatschappelijk-titel">{SOCIAL.title}</h2>
          <p className="price-page__lead" style={{ maxWidth: "42rem" }}>{SOCIAL.text}</p>
        </section>

        {hasPdf && (
          <section className="price-page__pdf" aria-labelledby="pdf-titel">
            <p id="pdf-titel">Liever alles even op een rij?</p>
            <a className="link-draw" href={PRICE_PDF} download>Download de prijslijst</a>
          </section>
        )}

        <div className="case-page__next">
          <p>Benieuwd wat jouw idee kost?</p>
          <Link className="button button--dark" href="/#contact">Vertel je idee</Link>
        </div>
        <Footer />
      </div>
    </main>
  );
}
