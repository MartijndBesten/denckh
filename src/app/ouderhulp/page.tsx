import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { InkRule } from "@/components/grammar/InkRule";
import { Route } from "@/components/ouderhulp/Route";
import { Rollen } from "@/components/ouderhulp/Rollen";
import { Scherm } from "@/components/ouderhulp/Scherm";
import { GESPREK_MAIL, OUDERHULP_CONTACT, SHOTS } from "@/lib/ouderhulp";

// Ouderhulp. (eigen product van Denckh, B-096). Alle beschreven functies zijn in de applicatie gebouwd en getest;
// alle beelden komen uit de applicatie met fictieve gegevens (Voorbeeldschool). Geen schoolnamen of -logo's.
const title = "Ouderhulp. · ouderhulp op de basisschool organiseren";
const description = "Ouderhulp. verzamelt hulpvragen van leerkrachten, vraagt ouders wanneer ze kunnen helpen en maakt er één duidelijke planning van. Een product van Denckh voor basisscholen.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/ouderhulp/" },
  openGraph: {
    type: "website", locale: "nl_NL", siteName: "Denckh", url: "/ouderhulp/", title, description,
    images: [{ url: "/images/ouderhulp/og-ouderhulp.png", width: 1200, height: 630, alt: "Ouderhulp. Ouderhulp organiseren, met overzicht voor iedereen. Een product van Denckh." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/ouderhulp/og-ouderhulp.png"] },
};

const product = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ouderhulp.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Webbrowser",
  description,
  url: "https://denckh.nl/ouderhulp/",
  inLanguage: "nl-NL",
  publisher: { "@id": "https://denckh.nl/#organisatie" },
};

const VOORDELEN = [
  ["Gegevens op één plek", "Hulpvragen, lijsten, reacties, planning en punten staan in dezelfde omgeving, niet verspreid over mail, formulieren en spreadsheets."],
  ["Minder dubbel invoeren", "Wat een leerkracht invult, gaat zonder overtypen mee naar de lijst, de ouders en de planning."],
  ["Zicht op ontbrekende reacties", "Per lijst zie je welke gezinnen hebben ingediend, nog een concept hebben of nog niet reageerden. Een herinnering stuur je in één keer."],
  ["Zicht op bezetting en tekorten", "Per dienst: hoeveel ouders nodig zijn, wie reageerde, wie voorlopig of definitief is ingedeeld en wat nog open staat."],
  ["Punten centraal ingesteld", "De school bepaalt per soort activiteit hoeveel punten een dienst oplevert, ook nul. Wie een deel van de tijd helpt, krijgt naar rato."],
  ["Eén gezin, één administratie", "Een gezin met kinderen in meerdere klassen heeft één opgave en één puntenoverzicht. Beide ouders kunnen inloggen."],
] as const;

const START = [
  ["Instellingen", "Schoolnaam, logo, contactgegevens en schooljaar."],
  ["Klassen en gezinnen", "Inlezen uit een export van de leerlingadministratie (CSV of Excel), met een controlevoorbeeld vóór verwerken."],
  ["Activiteitsoorten en punten", "Excursie, pleinwacht, schoonmaak, sportdag, klushulp: met het aantal helpers en de punten die de school kiest."],
  ["Eerste ouderhulplijst", "Samen de eerste uitvraag samenstellen en versturen."],
  ["Instructie en proefronde", "Uitleg voor beheerder en leerkrachten, en eerst een proefronde voordat alle ouders meedoen."],
] as const;

const VRAGEN = [
  ["Moeten ouders een app installeren?", "Nee. Ouderhulp. werkt in de browser van de telefoon of computer. Er is niets te installeren."],
  ["Hoe werkt aanmelden?", "Ouders vullen hun e-mailadres in en krijgen een inlogcode per e-mail; een wachtwoord is niet nodig. Leerkrachten en beheerders loggen in met e-mailadres en wachtwoord, en in de echte schoolomgeving ook met een tweede stap via een authenticator-app. Elke school heeft een eigen adres, dat de school zelf aan ouders en medewerkers geeft."],
  ["Hoe werkt een gezin met meerdere kinderen?", "Het gezin ziet de activiteiten van alle klassen van de eigen kinderen en van de hele school, in één opgave. Ook de punten staan per gezin. Beide ouders kunnen met een eigen e-mailadres inloggen en werken in dezelfde opgave."],
  ["Kan iemand een deel van een tijdvak helpen?", "Ja. Naast ‘de hele tijd’ en ‘niet’ kiest een ouder ‘een deel’ en vult de begin- en eindtijd in. De punten gaan dan naar rato."],
  ["Wie bepaalt de punten?", "De school, centraal per soort activiteit. Leerkrachten vullen geen punten in. Een latere wijziging geldt voor nieuwe activiteiten; wat al is vastgelegd, verandert niet ongemerkt."],
  ["Kan de school zelf activiteiten toevoegen?", "Ja. Leerkrachten maken hulpvragen voor hun eigen klassen. De beheerder voegt schoolbrede activiteiten toe, zoals pleinwacht of een schoonmaakavond, en beheert de soorten activiteiten."],
  ["Hoe begint een nieuwe school?", "Met een eigen, lege omgeving. Klassen en gezinnen worden ingelezen uit een bestand van de leerlingadministratie; een automatische koppeling met ParnasSys of een ander systeem is er niet. Daarna volgen de soorten activiteiten en punten, en een eerste lijst als proefronde."],
  ["Hoe worden gegevens afgeschermd?", "Elke school heeft een eigen omgeving met een eigen database. Ouders zien alleen hun eigen gezin, leerkrachten alleen hun eigen klassen en geen e-mailadressen van ouders, en de beheerder alleen de eigen school. Elke handeling wordt op de server op rechten gecontroleerd. Afspraken over de verwerking van gegevens maken we met de school vóór de ingebruikname."],
] as const;

export default function OuderhulpPage() {
  return (
    <main id="inhoud" className="oh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <div className="shell"><Header compact /></div>

      <section className="shell oh-hero" aria-labelledby="oh-titel">
        <div className="oh-hero__text">
          <p className="oh-brand">
            <span className="oh-name">Ouderhulp<span className="oh-dot">.</span></span>
            <span className="oh-by">Een product van <Image src="/brand/denckh-logo-signature.svg" alt="Denckh." width={1000} height={302} /></span>
          </p>
          <h1 id="oh-titel">Ouderhulp organiseren, met overzicht voor iedereen.</h1>
          <p className="oh-lead">Verzamel hulpvragen van leerkrachten, vraag ouders wanneer ze kunnen helpen en maak er één duidelijke planning van. Voor excursies, pleinwacht, schoonmaak, sportdagen en klushulp.</p>
          <div className="oh-actions">
            <a className="ink-button" href={GESPREK_MAIL}>Bespreek het voor onze school</a>
            <a className="link-draw" href="#werking">Bekijk hoe het werkt</a>
          </div>
        </div>
        <div className="oh-hero__shot">
          <Scherm shot={SHOTS.ouderActiviteit} priority />
        </div>
      </section>

      <section className="shell oh-section oh-problem" aria-labelledby="oh-probleem">
        <h2 id="oh-probleem">Ouderhulp regelen is nu vaak puzzelen.</h2>
        <div className="oh-problem__grid">
          <p>Een leerkracht zoekt rijders voor een excursie, de school zoekt hulp voor pleinwacht en de schoonmaakavond. Elk verzoek komt via een eigen mail of formulier. De antwoorden komen in een spreadsheet, en iemand houdt bij wie al reageerde en waar nog mensen ontbreken.</p>
          <ul className="oh-pieces" aria-label="Wat scholen nu combineren">
            <li>losse hulpvragen</li><li>formulieren</li><li>e-mails</li><li>Excel-overzichten</li><li>reacties en tekorten handmatig nalopen</li>
          </ul>
        </div>
      </section>

      <div className="shell"><InkRule /></div>

      <section className="shell oh-section" id="werking" aria-labelledby="oh-werking">
        <header className="oh-head">
          <h2 id="oh-werking">Zo werkt het.</h2>
          <p>Vier stappen, dezelfde volgorde als op school. Kies een stap om het voorbeeld te zien.</p>
        </header>
        <Route />
      </section>

      <section className="shell oh-section" aria-labelledby="oh-rollen">
        <header className="oh-head">
          <h2 id="oh-rollen">Voor iedere rol een eigen overzicht.</h2>
          <p>Iedereen ziet wat bij de eigen taak hoort. Beelden uit de applicatie, met fictieve gegevens.</p>
        </header>
        <Rollen />
      </section>

      <section className="shell oh-section" aria-labelledby="oh-voordelen">
        <header className="oh-head"><h2 id="oh-voordelen">Wat het oplevert.</h2></header>
        <ul className="oh-benefits">
          {VOORDELEN.map(([kop, tekst]) => <li key={kop}><h3>{kop}</h3><p>{tekst}</p></li>)}
        </ul>
      </section>

      <section className="shell oh-section oh-proof" aria-labelledby="oh-voorbeeld">
        <header className="oh-head">
          <h2 id="oh-voorbeeld">Zo ziet het eruit.</h2>
          <p>Drie schermen uit één ronde: de beheerder kiest, de ouder reageert, de beheerder ziet de bezetting.</p>
        </header>
        <div className="oh-proof__row">
          <Scherm shot={SHOTS.beheerLijst} size="desk" />
          <Scherm shot={SHOTS.ouderOverzicht} />
        </div>
        <Scherm shot={SHOTS.beheerReacties} size="desk" />
        <p className="oh-note">Voorbeeldschool met fictieve gezinnen en leerkrachten. Er wordt niets verstuurd vanaf deze pagina.</p>
      </section>

      <section className="shell oh-section" aria-labelledby="oh-start">
        <header className="oh-head">
          <h2 id="oh-start">Zo begint een school.</h2>
          <p>Denckh richt de omgeving samen met de school in en begeleidt de eerste ronde.</p>
        </header>
        <ol className="oh-start">
          {START.map(([kop, tekst]) => <li key={kop}><h3>{kop}</h3><p>{tekst}</p></li>)}
        </ol>
      </section>

      <section className="shell oh-section oh-offer" aria-labelledby="oh-aanbod">
        <h2 id="oh-aanbod">Een voorstel passend bij uw school.</h2>
        <div className="oh-offer__grid">
          <div><h3>Eenmalige inrichting</h3><p>Omgeving, instellingen, klassen en gezinnen, soorten activiteiten en de eerste lijst.</p></div>
          <div><h3>Jaarlicentie</h3><p>Gebruik van Ouderhulp. door de school, per schooljaar.</p></div>
          <div><h3>Maatwerk apart</h3><p>Extra wensen bespreken we los, met vooraf een duidelijke afspraak.</p></div>
        </div>
        <p className="oh-note">Er zijn nog geen vaste prijzen: u krijgt een voorstel op maat van de school.</p>
      </section>

      <section className="shell oh-section" aria-labelledby="oh-vragen">
        <header className="oh-head"><h2 id="oh-vragen">Veelgestelde vragen.</h2></header>
        <div className="oh-faq">
          {VRAGEN.map(([v, a]) => (
            <details key={v}><summary>{v}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>

      <div className="shell"><InkRule /></div>

      <section className="shell oh-section oh-contact" id="contact" aria-labelledby="oh-contact">
        <h2 id="oh-contact">Benieuwd of het bij uw school past?</h2>
        <p>Stuur een korte mail met de naam van de school en uw rol. Meer is niet nodig; daarna maken we een afspraak voor een gesprek.</p>
        <div className="oh-actions">
          <a className="ink-button" href={GESPREK_MAIL}>Bespreek het voor onze school</a>
          <a className="link-draw" href={`mailto:${OUDERHULP_CONTACT}`}>{OUDERHULP_CONTACT}</a>
        </div>
        <p className="oh-note">Al klant? Log in via het adres van uw eigen schoolomgeving; dat krijgt u van uw school. Toegangscodes staan nooit op deze site.</p>
        <p className="oh-note">Meer van Denckh: <Link className="link-draw" href="/projecten/">projecten</Link> · <Link className="link-draw" href="/">denckh.nl</Link></p>
      </section>

      <div className="shell"><Footer /></div>
    </main>
  );
}
