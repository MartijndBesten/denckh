import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { InkRule } from "@/components/grammar/InkRule";
import { Scherm } from "@/components/ouderhulp/Scherm";
import { PREEKHULP_CONTACT, PROEF_MAIL, SHOTS } from "@/lib/preekhulp";

// Preekhulp. (eigen product van Denckh, B-098). Alleen wat in versie 0.1 gebouwd én getest is staat als functie op
// de pagina; wat nog in de proefronde wordt getest, staat apart onder "Waar het nu staat". Beelden: echte schermen.
const title = "Preekhulp. · onderzoek voor je preek, met de bron erbij";
const description = "Preekhulp. brengt Bijbeltekst, grondtekst, oude en nieuwe uitleg en je eigen aantekeningen samen in één controleerbaar onderzoeksdossier. Geen preekschrijver. Een product van Denckh voor predikanten.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/preekhulp/" },
  openGraph: { type: "website", locale: "nl_NL", siteName: "Denckh", url: "/preekhulp/", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const product = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Preekhulp.",
  applicationCategory: "ReferenceApplication",
  operatingSystem: "Windows, macOS, Linux (lokaal, in de browser)",
  description,
  url: "https://denckh.nl/preekhulp/",
  inLanguage: "nl-NL",
  publisher: { "@id": "https://denckh.nl/#organisatie" },
};

const STAPPEN = [
  ["Vraag begrijpen", "Welk gedeelte, welk thema, welke dienst, en welke aannames zitten er in je vraag?"],
  ["Zoekvragen", "In het Nederlands en Engels, met Bijbelverwijzingen en vaktermen, zonder twintig keer hetzelfde."],
  ["Bronnen verzamelen", "Tekst, grondtekst, kruisverwijzingen, oude commentaren, je eigen documenten en externe bronnen."],
  ["Bronnen beoordelen", "Wat voor bron is het, uit welke traditie, en is de inhoud echt gelezen of alleen de titel?"],
  ["Vergelijken", "Waar uitleggers het eens zijn, waar niet, en wat de tekst zelf zegt naast wat later is ontwikkeld."],
  ["Nieuwe lijnen", "Verbanden en vragen die niet in je vraag stonden, elk met een eerlijke inschatting van de sterkte."],
  ["Tegenlezen", "Wat is te zwak onderbouwd, wat ontbreekt, en stuurt een mooie preekgedachte de uitleg?"],
  ["Dossier", "Dertien vaste onderdelen, met de bronnenlijst. Te bewaren, af te drukken en te exporteren."],
] as const;

const ANDERS = [
  ["Elke bewering met bewijs", "Bij iedere bewering staat het bewijsstuk waar hij op rust. Verwijzingen die niet bestaan, worden verwijderd. Een citaat dat niet letterlijk in de bron staat, wordt weggelaten. Het bewijsniveau gaat dan omlaag, en dat zie je."],
  ["Vijf bewijsniveaus", "Direct aangetoond, onderbouwde interpretatie, mogelijke onderzoekslijn, omstreden of niet geverifieerd. Wat de tekst zegt en wat latere uitleg ervan maakt, blijven gescheiden."],
  ["Verbanden uit de grondtekst", "Preekhulp telt zelf in de Hebreeuwse en Griekse tekst: welke zeldzame woorden terugkomen en waar. Bij Genesis 31:13 vond het zo Genesis 28:18–22, Genesis 35 en, via Genesis 28:12, Johannes 1:51."],
  ["Oude uitleg naast de tekst", "De Kanttekeningen bij de Statenvertaling (1637), Calvijn en Matthew Henry, per vers, met de volledige tekst. Dus te controleren in plaats van na te vertellen."],
  ["Werkt ook zonder AI", "Tekst en grondtaal, verbanden, commentaren, je eigen bibliotheek en het dossier werken zonder AI en zonder internet. AI is een extra laag, met je eigen sleutel en een budget dat je vooraf ziet."],
  ["Jouw documenten blijven bij jou", "Preekhulp draait op je eigen computer. Eigen preken en aantekeningen zijn privé en gaan niet naar een AI-dienst, tenzij je dat zelf instelt."],
] as const;

const BRONNEN = [
  ["Bijbeltekst", "Statenvertaling met Kanttekeningen en de Berean Standard Bible (beide vrij te gebruiken)."],
  ["Grondtekst", "Hebreeuwse en Griekse tekst met grondwoord, woordvorm en woordenboek, van STEP Bible (Tyndale House Cambridge)."],
  ["Kruisverwijzingen", "Ruim 340.000 verwijzingen van OpenBible.info."],
  ["Historische uitleg", "Kanttekeningen, Calvijn en Matthew Henry."],
  ["Eigen bibliotheek", "Je eigen preken, notities en transcripten (PDF, Word, tekst, ondertitels)."],
] as const;

const VRAGEN = [
  ["Schrijft Preekhulp mijn preek?", "Nee. Je krijgt een onderzoeksdossier: tekst, uitleg, verbanden, vragen en kritiek. De keuzes en de preek blijven van jou."],
  ["Heb ik AI nodig?", "Nee. Zonder AI werken de tekst- en grondtaallaag, de verbanden, de oude commentaren, je eigen bibliotheek en het dossier. Met AI komen de vergelijking van perspectieven, homiletische aanknopingspunten en de uitgebreide tegenlezing erbij. Daarvoor gebruik je een eigen sleutel van Anthropic of OpenAI, of een lokaal model. Vóór elk onderzoek zie je de maximale kosten."],
  ["Waar staan mijn gegevens?", "Op je eigen computer. Preekhulp draait lokaal en is niet via internet bereikbaar. Je kunt documenten en onderzoeken zelf verwijderen, inclusief de zoekindex."],
  ["Welke Bijbelvertalingen zitten erin?", "De Statenvertaling en de Berean Standard Bible, omdat die vrij te gebruiken zijn. De HSV, NBV21 en andere moderne vertalingen zijn beschermd en zitten er bewust niet in."],
  ["Kan ik Logos koppelen?", "Niet als bibliotheek: daar is voor nieuwe gebruikers geen officiële koppeling voor. Preekhulp zet per vers wel een link naar de passage in Logos klaar; die link testen we in de proefronde."],
  ["Kan Preekhulp YouTube-preken analyseren?", "Video's zoeken via YouTube is gebouwd (met een eigen YouTube-sleutel) en testen we in de proefronde. De inhoud analyseren kan alleen met een transcript dat je rechtmatig hebt, bijvoorbeeld van je eigen kanaal of zelf gemaakt. Dan krijg je ook links naar het juiste moment in de video."],
] as const;

export default function PreekhulpPage() {
  return (
    <main id="inhoud" className="oh ph">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <div className="shell"><Header compact /></div>

      <section className="shell oh-hero" aria-labelledby="ph-titel">
        <div className="oh-hero__text">
          <p className="oh-brand">
            <span className="oh-name">Preekhulp<span className="oh-dot">.</span></span>
            <span className="oh-by">Een product van <Image src="/brand/denckh-logo-signature.svg" alt="Denckh." width={1000} height={302} /></span>
          </p>
          <h1 id="ph-titel">Onderzoek voor je preek, met de bron erbij.</h1>
          <p className="oh-lead">Preekhulp brengt Bijbeltekst, grondtekst, oude en nieuwe uitleg en je eigen aantekeningen samen in één onderzoeksdossier. Elke bewering met de bron waar hij op rust. Geen preekschrijver: jij blijft eigenaar van uitleg en preek.</p>
          <div className="oh-actions">
            <Link className="ink-button" href="/preekhulp/probeer/">Probeer Preekhulp</Link>
            <a className="link-draw" href={PROEF_MAIL}>Doe mee aan de proefronde</a>
          </div>
          <p className="oh-note">Proefversie 0.1 · draait op je eigen computer.</p>
        </div>
        <div className="oh-hero__shot">
          <Scherm shot={SHOTS.start} priority />
        </div>
      </section>

      <section className="shell oh-section oh-problem" aria-labelledby="ph-probleem">
        <h2 id="ph-probleem">Goed onderzoek kost tijd. Een chatbot is snel tevreden.</h2>
        <div className="oh-problem__grid">
          <p>Lange commentaren doorzoeken, uitleggers naast elkaar leggen, een lezing van een uur bekijken waarvan vijf minuten over jouw tekst gaan. En een AI-gesprek bevestigt je preekgedachte vaak te snel, mist nuances in de tekst en noemt verbanden zonder te laten zien waar ze vandaan komen.</p>
          <ul className="oh-pieces" aria-label="Wat een predikant nu combineert">
            <li>commentaren</li><li>grondtekst</li><li>Logos</li><li>Google en artikelen</li><li>YouTube-preken</li><li>AI-chat</li><li>eigen aantekeningen</li>
          </ul>
        </div>
      </section>

      <div className="shell"><InkRule /></div>

      <section className="shell oh-section" id="werking" aria-labelledby="ph-werking">
        <header className="oh-head">
          <h2 id="ph-werking">Zo werkt het.</h2>
          <p>Geen één lang antwoord, maar acht gescheiden stappen. Elke stap kun je los opnieuw laten doen, met een eigen vervolgvraag.</p>
        </header>
        <ol className="oh-start">
          {STAPPEN.map(([kop, tekst]) => <li key={kop}><h3>{kop}</h3><p>{tekst}</p></li>)}
        </ol>
        <p className="oh-note">Drie dieptes: <b>verkennen</b> (snelle oriëntatie), <b>verdiepen</b> (grondig) en <b>kritisch onderzoeken</b> (elk perspectief apart, zware tegenlezing).</p>
      </section>

      <section className="shell oh-section" aria-labelledby="ph-anders">
        <header className="oh-head"><h2 id="ph-anders">Wat het anders doet.</h2></header>
        <ul className="oh-benefits">
          {ANDERS.map(([kop, tekst]) => <li key={kop}><h3>{kop}</h3><p>{tekst}</p></li>)}
        </ul>
      </section>

      <section className="shell oh-section oh-proof" aria-labelledby="ph-voorbeeld">
        <header className="oh-head">
          <h2 id="ph-voorbeeld">Zo ziet het eruit.</h2>
          <p>Echte schermen bij Genesis 31:13, de testcasus van een doopdienst over ‘Terug naar de belofte’.</p>
        </header>
        <Scherm shot={SHOTS.lijnen} size="desk" />
        <div className="oh-proof__row">
          <Scherm shot={SHOTS.tekst} size="desk" />
          <Scherm shot={SHOTS.commentaren} size="desk" />
        </div>
        <p className="oh-note">Deze schermen komen uit een onderzoek zonder AI: alles wat je ziet is tekstdata, berekend verband of letterlijke oude uitleg.</p>
        <div className="oh-actions"><Link className="ink-button" href="/preekhulp/probeer/">Klik er zelf doorheen</Link></div>
      </section>

      <section className="shell oh-section" aria-labelledby="ph-bronnen">
        <header className="oh-head">
          <h2 id="ph-bronnen">Open bronnen, eerlijk gebruikt.</h2>
          <p>Alleen wat vrij gebruikt mag worden, staat in Preekhulp zelf. De rest is een link naar de bron.</p>
        </header>
        <ul className="oh-benefits">
          {BRONNEN.map(([kop, tekst]) => <li key={kop}><h3>{kop}</h3><p>{tekst}</p></li>)}
        </ul>
        <p className="oh-note">Geen overgenomen teksten van betaalde bibliotheken, geen beschermde vertalingen, geen omwegen om video-ondertitels binnen te halen.</p>
      </section>

      <section className="shell oh-section oh-offer" aria-labelledby="ph-stand">
        <h2 id="ph-stand">Waar het nu staat.</h2>
        <div className="oh-offer__grid">
          <div><h3>Werkt en getest</h3><p>Tekst en grondtaal, verbanden uit de grondtekst, oude commentaren, eigen bibliotheek, het dossier en de controle op bronnen en citaten.</p></div>
          <div><h3>In de proefronde</h3><p>De AI-laag met een eigen sleutel, en zoeken in academische databanken, boekcatalogi en YouTube. Gebouwd, maar nog niet met een echte predikant getest.</p></div>
          <div><h3>Daarna</h3><p>Wat de proefronde oplevert. Prijzen zijn er nog niet; de proefronde bespreken we persoonlijk.</p></div>
        </div>
      </section>

      <section className="shell oh-section" aria-labelledby="ph-vragen">
        <header className="oh-head"><h2 id="ph-vragen">Veelgestelde vragen.</h2></header>
        <div className="oh-faq">
          {VRAGEN.map(([v, a]) => (
            <details key={v}><summary>{v}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>

      <div className="shell"><InkRule /></div>

      <section className="shell oh-section oh-contact" id="contact" aria-labelledby="ph-contact">
        <h2 id="ph-contact">Wil je meedenken in de proefronde?</h2>
        <p>Stuur een korte mail met je rol en waar je nu mee werkt. Daarna maken we een afspraak.</p>
        <div className="oh-actions">
          <a className="ink-button" href={PROEF_MAIL}>Doe mee aan de proefronde</a>
          <a className="link-draw" href={`mailto:${PREEKHULP_CONTACT}`}>{PREEKHULP_CONTACT}</a>
        </div>
        <p className="oh-note">Meer van Denckh: <Link className="link-draw" href="/projecten/">projecten</Link> · <Link className="link-draw" href="/ouderhulp/">Ouderhulp. voor scholen</Link> · <Link className="link-draw" href="/">denckh.nl</Link></p>
      </section>

      <div className="shell"><Footer /></div>
    </main>
  );
}
