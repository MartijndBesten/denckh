import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { DeeghCase, TclpCase } from "@/components/Cases";
import { PuntStage } from "@/components/punt/PuntStage";
import { AllProjectsLink } from "@/components/grammar/AllProjectsLink";
import { ContactReturn } from "@/components/grammar/ContactReturn";
import { InkRule } from "@/components/grammar/InkRule";
import { Outcomes } from "@/components/grammar/Outcomes";
import { PriceLine } from "@/components/grammar/PriceLine";
import { SettleTitle } from "@/components/grammar/SettleTitle";
import { Werkwijze } from "@/components/grammar/Werkwijze";
import { HOME_STOPS } from "@/lib/prices";

export default function Home() {
  return (
    <main id="inhoud">
      <section className="hero" aria-label="Begin met een punt">
        <div className="shell"><Header /></div>
        <div className="shell hero__stage"><PuntStage /></div>
      </section>

      <div className="shell"><InkRule note="jouw lijn" /></div>

      <section className="shell story" aria-labelledby="idee-titel">
        <SettleTitle id="idee-titel" text="Van idee naar vorm." className="story__title" />
        <div className="story__text">
          <p className="story__lead">Het begint niet bij techniek, maar bij jouw vraag. Je hoeft zelf niets van techniek of AI te weten.</p>
          <p>Soms bestaat de oplossing al en hoef je niets nieuws te laten maken. Dan zeg ik dat gewoon, en help ik je het goed in te stellen. Soms ontstaat er wel iets nieuws: een website, een app of digitaal hulpmiddel, een interactieve uitleg of presentatie, een automatisering of een technische oplossing met verlichting en sensoren. <Link className="link-draw" href="/diensten/">Bekijk waar ik mee help</Link></p>
        </div>
      </section>

      <section className="shell projects" id="projecten" aria-labelledby="projecten-titel">
        <header className="projects__head">
          <h2 id="projecten-titel">Wat er al vorm kreeg.</h2>
          <p>Twee ideeën, twee soorten denken. Scroll, en kijk hoe een lijn elk project wordt.</p>
        </header>

        <DeeghCase />
        <TclpCase />
        <p className="projects__all"><AllProjectsLink /></p>
      </section>

      <section className="shell outcomes-section" aria-labelledby="uitkomst-titel">
        <header className="projects__head">
          <h2 id="uitkomst-titel">Wat kan een idee worden?</h2>
          <p>Dat weet je niet altijd vooraf. De vorm volgt uit wat het idee nodig heeft, en soms is dat iets wat al bestaat. Juist iets technisch of ingewikkelds? Mooi. Daar begint het vaak.</p>
        </header>
        <Outcomes />
      </section>

      <section className="shell ww-section" id="werkwijze" aria-labelledby="werkwijze-titel">
        <header className="ww-section__head">
          <h2 id="werkwijze-titel">Zo werkt het.</h2>
          <p>Wat er bovenaan met je lijn gebeurde, is precies hoe het werkt.</p>
        </header>
        <Werkwijze />
      </section>

      <section className="shell prices" id="prijzen" aria-labelledby="prijzen-titel">
        <header className="prices__head">
          <h2 id="prijzen-titel">Wat kost zoiets?</h2>
          <p>Een eerste gesprek kost niets. Pas als we afspreken dat ik iets voor je uitwerk of maak, kost het iets, en dat weet je vooraf. Een vereniging of vrijwilligersinitiatief met een klein budget? Vertel het gerust.</p>
        </header>
        <PriceLine stops={HOME_STOPS} label="Van even samen denken tot echt maken" />
        <div className="prices__more">
          <div className="prices__cta">
            <Link className="ink-button" href="/prijzen/">Bekijk de richtprijzen</Link>
            <a className="link-draw link-draw--dot" href="#contact">Vertel je idee</a>
          </div>
        </div>
      </section>

      <section className="shell small" aria-labelledby="klein-titel">
        <figure className="small__photo">
          <Image src="/images/portret.jpg" width={600} height={750} sizes="(max-width: 760px) 260px, 360px"
            alt="De maker van Denckh aan tafel in een restaurant, armen over elkaar, kijkend naar de menukaart." />
        </figure>
        <div className="small__text">
          <h2 id="klein-titel">Denckh is klein. Bewust.</h2>
          <p>Ik vind het leuk om nieuwe dingen te ontdekken en uit te zoeken wat ermee mogelijk is. Nog leuker vind ik het wanneer iemand anders daar echt iets aan heeft. Daar komt Denckh uit voort.</p>
          <p>Je werkt rechtstreeks met mij: degene die meedenkt én maakt. Denckh hoeft niet groot te worden. Ik maak liever iets wat werkelijk helpt dan iets omdat het nu eenmaal kan.</p>
          <p>Mijn achtergrond ligt op het snijvlak van techniek en commercie: elektrotechnisch opgeleid en al jaren bezig met verlichting, lichtsturing en slimme gebouwen.</p>
          <p><a className="link-draw" href="/downloads/denckh-achter-denckh.pdf">Meer over mijn achtergrond →</a></p>
        </div>
      </section>

      <div className="shell"><InkRule /></div>

      <section className="shell contact" id="contact" aria-labelledby="contact-titel">
        <h2 id="contact-titel">Waar loop jij tegenaan?</h2>
        <p className="contact__lead">Een idee, een probleem of gewoon een vraag is genoeg. Je hoeft nog geen plan of budget te hebben. Ik denk graag met je mee, en het eerste gesprek is gratis.</p>
        <ContactReturn />
      </section>

      <div className="shell"><Footer /></div>
    </main>
  );
}
