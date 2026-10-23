// De uitgewerkte projecten. Eén bron voor de homepage (een selectie) en /projecten/ (alles).
// Alleen geverifieerde inhoud (docs/cases/).
import Link from "next/link";
import { Construct } from "@/components/grammar/Construct";

/** Deegh: product → merk → webshop (docs/cases/deegh.md). */
export function DeeghCase() {
  return (
    <article className="case">
      <Construct project="deegh" label="deegh.nl, schematisch" />
      <div className="case__text">
        <p className="case__kind">product → merk → webshop</p>
        <h3>Deegh</h3>
        <p className="case__lead">Van deegbol tot een plek waar je bestelt en leert hoe het werkt.</p>
        <dl className="case__facts">
          <div><dt>Aanleiding</dt><dd>Een eigen product, ambachtelijk pizzadeeg, had een plek nodig die net zo helder is als het product zelf.</dd></div>
          <div><dt>Denckh</dt><dd>Een eigen webshop op WordPress en WooCommerce, met een eigen thema: producten, uitleg in stappen, recepten, verkooppunten en een zakelijke route.</dd></div>
          <div><dt>Vorm</dt><dd>deegh.nl: bestellen, en leren hoe je van een bol deeg een pizza maakt.</dd></div>
        </dl>
        <p className="case__links">
          <Link className="link-draw" href="/projecten/deegh/">Bekijk het project</Link>
          <a className="link-draw" href="https://deegh.nl" rel="noopener">deegh.nl</a>
        </p>
      </div>
    </article>
  );
}

/** De demokoffer, anoniem en schematisch (docs/cases/intusens-demokoffer.md, B-029). */
export function KofferCase() {
  return (
    <article className="case case--flip case--night">
      <Construct project="koffer" label="interactieve gids bij een demokoffer" tone="night" />
      <div className="case__text">
        <p className="case__kind">complexe techniek → begrijpelijke uitleg</p>
        <h3>Een koffer die zichzelf uitlegt</h3>
        <p className="case__lead">Een demokoffer vol sensortechniek kreeg een digitale gids die je opent met een QR-code op de koffer.</p>
        <dl className="case__facts">
          <div><dt>Aanleiding</dt><dd>Hoe snapt iemand die de koffer openmaakt meteen wat erin zit en hoe je het bedient?</dd></div>
          <div><dt>Denckh</dt><dd>Een verkenner van de koffer, de bediening stap voor stap nagebootst en een demomodus om mee te presenteren. In drie talen, ook offline.</dd></div>
          <div><dt>Vorm</dt><dd>Een interactieve uitleg die naast het echte product werkt.</dd></div>
        </dl>
        <p className="case__note">Zonder merknaam of productbeelden: het gaat hier om de manier van uitleggen.</p>
      </div>
    </article>
  );
}

/** Loflijn: een beurt in het spel (docs/cases/loflijn.md). */
export function LoflijnCase() {
  return (
    <article className="case case--flip">
      <Construct project="spel" label="Loflijn, schematisch: een beurt van kaart tot tijdlijn" end="van psalm tot praise" ratio={0.62} />
      <div className="case__text">
        <p className="case__kind">spel op tafel → uitleg in drie tellen</p>
        <h3>Loflijn</h3>
        <p className="case__lead">Een muziekspel voor op tafel. Online moest je in een paar tellen snappen hoe een beurt werkt.</p>
        <dl className="case__facts">
          <div><dt>Aanleiding</dt><dd>Van Psalm tot Praise is een fysiek muziekspel: je scant een kaart, luistert naar het lied en legt de kaart op de tijdlijn. Wie het nog niet kent, moet dat meteen zien.</dd></div>
          <div><dt>Denckh</dt><dd>De website en webshop: een beurt uitgelegd in drie stappen, productinformatie en een route naar bestellen.</dd></div>
          <div><dt>Vorm</dt><dd>loflijn.nl, waar je het spel leert kennen en bestelt.</dd></div>
        </dl>
        <p className="case__links"><a className="link-draw" href="https://loflijn.nl" rel="noopener">loflijn.nl</a></p>
      </div>
    </article>
  );
}

/** LYEV.: eindigt in een echte schermafbeelding van lyev.nl (docs/cases/lyev.md). */
export function LyevCase() {
  return (
    <article className="case case--lyev">
      <Construct project="lyev" label="LYEV.: van strasssteentje tot webshop, met een echte schermafbeelding van lyev.nl op de telefoon" end="lyev.nl op de telefoon" ratio={0.85} narrowRatio={1.3} />
      <div className="case__text">
        <p className="case__kind">zelfgemaakte accessoires → eigen webshop</p>
        <h3>LYEV.</h3>
        <p className="case__lead">Een webshop vol sparkle.</p>
        <dl className="case__facts">
          <div><dt>Aanleiding</dt><dd>Lynn en Evy versieren accessoires met strass en wilden een eigen plek om ze te laten zien en te verkopen.</dd></div>
          <div><dt>Denckh</dt><dd>Merkuitstraling, ontwerp en de complete webshop: producten waarbij je zelf een kleur of naam kiest, een eigen bestel- en aanvraagproces en een eenvoudig beheer op de telefoon.</dd></div>
          <div><dt>Vorm</dt><dd>lyev.nl: een vrolijke, mobielvriendelijke webshop waarin de producten centraal staan.</dd></div>
        </dl>
        <p className="case__links">
          <Link className="link-draw" href="/projecten/lyev/">Bekijk het project</Link>
          <a className="link-draw" href="https://lyev.nl" rel="noopener">lyev.nl</a>
        </p>
      </div>
    </article>
  );
}

/** TCLP: schematisch, zonder logo of schermafbeeldingen (docs/cases/tclp.md). Toestemming opdrachtgever voor naam en link: 2026-10-23. */
export function TclpCase() {
  return (
    <article className="case case--flip case--tclp">
      <Construct project="tclp" label="TCLP, schematisch: van armatuur via een kringloop van zes stappen naar alle partijen verbonden" ratio={0.78} />
      <div className="case__text">
        <p className="case__kind">ingewikkelde keten → één helder verhaal</p>
        <h3>TCLP</h3>
        <p className="case__lead">Van afvalstroom naar waardestroom.</p>
        <dl className="case__facts">
          <div><dt>Aanleiding</dt><dd>TCLP organiseert de keten die nodig is om hergebruik van professionele verlichting net zo makkelijk te maken als nieuw inkopen. Daar zijn veel partijen bij nodig, en het verhaal moest in één keer te volgen zijn.</dd></div>
          <div><dt>Denckh</dt><dd>Verhaal en opbouw van de site, het logo verfijnd vanuit de eigen schets van de oprichter, en een beeldtaal van lijnen en punten: een draaiende kringloop van demonteren tot opnieuw inzetten, de partijen in de keten en het productlabel als tekening.</dd></div>
          <div><dt>Vorm</dt><dd>tclp.nl: een rustige site in losse pagina&rsquo;s, gemaakt voor de telefoon, zonder cookies of trackers.</dd></div>
        </dl>
        <p className="case__links"><a className="link-draw" href="https://tclp.nl" rel="noopener">tclp.nl</a></p>
      </div>
    </article>
  );
}
