import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { FORM_PRICES, inclBtw } from "@/lib/prices";

// Waar Denckh mee helpt, in gewone woorden. Elke categorie wijst naar echt, gerealiseerd werk (B-084); de toon is
// meedenken eerst, maken waar het helpt (B-099).
const description = "Een website, app of tool, terugkerend werk automatiseren, techniek en verlichting, of hulp met wat je al hebt. Denckh in Houten denkt mee voor particulieren, ondernemers, verenigingen en andere kleine initiatieven.";
// "€295 excl. btw (€356,95 incl.)": excl. btw voor zakelijk, incl. btw voor particulieren (B-100)
const vanaf = (key: string) => { const p = FORM_PRICES.find((f) => f.key === key)?.price ?? 0; return `${p} excl. btw (${inclBtw(p)} incl.)`; };

type Dienst = { id: string; titel: string; tekst: string; voorbeelden: string[]; bewijs: { label: string; href: string }[]; prijs?: string };

const DIENSTEN: Dienst[] = [
  {
    id: "website",
    titel: "Websites en webshops",
    tekst: "Een duidelijke website voor je bedrijf, vereniging of idee. Goed leesbaar op de telefoon, snel en zonder overbodige toeters. Ook een compacte webshop op een bestaand platform. Heb je al een website? Dan kijk ik ook graag of die met een paar aanpassingen duidelijker wordt.",
    voorbeelden: ["een website voor een zelfstandige, vereniging of klein bedrijf", "een webshop met een geteste mobiele checkout", "een bestaande website die duidelijker moet"],
    bewijs: [{ label: "Deegh: webshop voor ambachtelijk pizzadeeg", href: "/projecten/deegh/" }, { label: "LYEV.: webshop met eigen keuzes in kleur en naam", href: "/projecten/lyev/" }, { label: "loflijn.nl: website en webshop voor een spel", href: "https://loflijn.nl" }, { label: "tclp.nl: website voor hergebruik van professionele verlichting", href: "https://tclp.nl" }],
    prijs: `website vanaf €${vanaf("website")}, webshop vanaf €${vanaf("webshop")}`,
  },
  {
    id: "app",
    titel: "Apps en digitale hulpmiddelen",
    tekst: "Een kleine app of tool die één ding goed doet. Zonder account als dat niet nodig is, en werkend op de telefoon die je al hebt. Ook een interactieve uitleg, een spel of een presentatie die je bedient kan zo'n hulpmiddel zijn.",
    voorbeelden: ["een app voor je vereniging, club of hobby", "een rekenhulp of keuzehulp", "een eerste werkende versie om een idee te testen"],
    bewijs: [{ label: "OKKIE.: darttrainer, gratis en zonder account", href: "/projecten/okkie/" }],
    prijs: `prototype vanaf €${vanaf("prototype")}, kleine tool vanaf €${vanaf("uitleg")}`,
  },
  {
    id: "automatiseren",
    titel: "Terugkerend werk automatiseren",
    tekst: "Werk dat elke week terugkomt en eigenlijk vanzelf zou moeten gaan: aanvragen verwerken, roosters bijhouden, bevestigingen mailen of gegevens overzetten. Vaak kan dat met software die je al hebt, goed ingesteld.",
    voorbeelden: ["aanvragen of reserveringen op één plek", "automatische bevestigingen en herinneringen", "lijstjes en Excel-bestanden die op elkaar aansluiten"],
    bewijs: [{ label: "Kerckh.: zaalverhuur en organisatie voor kerken", href: "/projecten/kerckh/" }],
  },
  {
    id: "techniek",
    titel: "Techniek, verlichting en sensoren",
    tekst: "Ik ben elektrotechnisch opgeleid en werk al jaren met verlichting, lichtsturing en slimme gebouwen. Ik help met een technische vraag, een slimme oplossing thuis of in een kleine bedrijfsruimte, of een uitleg die iedereen snapt.",
    voorbeelden: ["advies over lichtsturing en sensoren", "slimme verlichting thuis eenvoudig bedienen", "een technisch product begrijpelijk uitleggen"],
    bewijs: [{ label: "lichtsturing.info: lichtsturing begrijpelijk gemaakt", href: "https://lichtsturing.info/nl/" }],
  },
  {
    id: "idee",
    titel: "Bijzondere ideeën en maatschappelijke initiatieven",
    tekst: "Een idee waar nog geen naam voor is, of een plan van een vereniging, kerk of groep vrijwilligers. We halen het samen uit elkaar en ik maak er een eerste vorm van: een schets, een visual, een prototype of een presentatie. Bij kleine maatschappelijke initiatieven kijken we samen wat qua vergoeding past.",
    voorbeelden: ["een idee voor een product of dienst", "iets organiseren met vrijwilligers", "iets waarvoor nog geen goede naam bestaat"],
    bewijs: [{ label: "Autowasdag Sionkerk: reserveren en vrijwilligers op één plek", href: "https://autowasdagsionkerk.nl" }, { label: "Bekijk alle projecten", href: "/projecten/" }],
    prijs: `eerste vorm vanaf €${vanaf("visual")}`,
  },
];

export const metadata: Metadata = {
  title: "Diensten: website, app, automatiseren en techniek",
  description,
  alternates: { canonical: "/diensten/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Denckh",
    url: "/diensten/",
    title: "Waar Denckh mee helpt · Denckh",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "denckh. van idee naar vorm" }],
  },
};

export default function Diensten() {
  const services = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: DIENSTEN.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: d.titel, description: d.tekst, url: `https://denckh.nl/diensten/#${d.id}`, provider: { "@id": "https://denckh.nl/#organisatie" }, areaServed: ["Houten", "Nieuwegein", "Utrecht", "Bunnik"] },
    })),
  };

  return (
    <main id="inhoud">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(services) }} />
      <div className="section-shell price-page">
        <Header compact />
        <header className="price-page__header">
          <p className="eyebrow">diensten</p>
          <h1>Waar ik mee help.</h1>
          <p>Je hoeft niet te weten in welk hokje je vraag past. Hieronder staat wat er vaak uit komt, met echt werk als voorbeeld. Voor particulieren, ondernemers, verenigingen en andere kleine initiatieven in Houten en omgeving.</p>
        </header>

        {DIENSTEN.map((d) => (
          <section key={d.id} id={d.id} className="price-page__section" aria-labelledby={`${d.id}-titel`}>
            <header className="price-page__head">
              <h2 id={`${d.id}-titel`}>{d.titel}</h2>
              {d.prijs && <p>{d.prijs}</p>}
            </header>
            <p className="price-page__lead" style={{ maxWidth: "42rem", marginBottom: "1.2rem" }}>{d.tekst}</p>
            <ul className="scope-list">{d.voorbeelden.map((v) => <li key={v}>{v}</li>)}</ul>
            <p className="case__links" style={{ marginTop: "1.4rem" }}>
              {d.bewijs.map((b) => (b.href.startsWith("/")
                ? <Link key={b.href} className="link-draw" href={b.href}>{b.label} →</Link>
                : <a key={b.href} className="link-draw" href={b.href} rel="noopener">{b.label} →</a>))}
            </p>
          </section>
        ))}

        <section className="price-page__section" id="bestaand" aria-labelledby="bestaand-titel">
          <h2 id="bestaand-titel">Niets nieuws nodig? Ook goed.</h2>
          <p className="price-page__lead" style={{ maxWidth: "42rem" }}>Soms is er al een goede oplossing. Dan help ik je die te kiezen, in te stellen of te begrijpen: bestaande software, een app, je website of je verlichting. Ik maak liever iets waar je zelf mee verder kunt dan iets waarvoor je steeds bij mij terug moet.</p>
        </section>

        <section className="price-page__section" aria-labelledby="start-titel">
          <h2 id="start-titel">Zo begint het.</h2>
          <p className="price-page__lead">Het eerste gesprek is gratis en vrijblijvend. Wil je daarna dat ik iets uitwerk of maak, dan spreken we vooraf af wat het wordt en wat het kost. <Link className="link-draw" href="/prijzen/">Bekijk de richtprijzen</Link> of mail naar <a className="link-draw" href="mailto:info@denckh.nl">info@denckh.nl</a>.</p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
