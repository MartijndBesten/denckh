import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { DeeghCase, TclpCase } from "@/components/Cases";
import { PuntStage } from "@/components/punt/PuntStage";
import { ContactReturn } from "@/components/grammar/ContactReturn";
import { InkRule } from "@/components/grammar/InkRule";
import { Outcomes } from "@/components/grammar/Outcomes";
import { PriceLine } from "@/components/grammar/PriceLine";
import { Promo } from "@/components/Promo";
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
          <p className="story__lead">Een website voor je bedrijf. Een handige app. Een klus die elke week terugkomt en eigenlijk vanzelf zou moeten gaan.</p>
          <p>Daarvoor kun je bij Denckh terecht. Ook voor hulp bij verlichting, sensoren of een technisch probleem, of voor een bijzonder idee dat je praktisch wilt uitwerken. Je hoeft nog niet te weten wat het moet worden: Denckh denkt mee en maakt het. <Link className="link-draw" href="/diensten/">Bekijk wat je kunt aanvragen</Link></p>
        </div>
      </section>

      <section className="shell projects" id="projecten" aria-labelledby="projecten-titel">
        <header className="projects__head">
          <h2 id="projecten-titel">Wat er al vorm kreeg.</h2>
          <p>Twee ideeën, twee soorten denken. Scroll, en kijk hoe een lijn elk project wordt.</p>
        </header>

        <DeeghCase />
        <TclpCase />
        <p className="projects__all"><Link className="link-draw" href="/projecten/">Bekijk alle projecten →</Link></p>
      </section>

      <section className="shell outcomes-section" aria-labelledby="uitkomst-titel">
        <header className="projects__head">
          <h2 id="uitkomst-titel">Wat kan een idee worden?</h2>
          <p>Dat weet je niet altijd vooraf. De vorm volgt uit wat het idee nodig heeft. Juist iets technisch of ingewikkelds? Mooi. Daar begint het vaak.</p>
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
          <p>Dat hangt af van wat het idee nodig heeft. Een richtprijs krijg je zonder eerst een offerte aan te vragen.</p>
        </header>
        <PriceLine stops={HOME_STOPS} label="Van even samen denken tot echt maken" />
        <Promo which="website" id="oktoberactie" className="promo promo--home" />
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
          <p>Heb je een idee, product of technisch verhaal dat nog niet helemaal in vorm is? Dan help ik je uitzoeken wat het eigenlijk nodig heeft, en maak ik het concreet. Je werkt rechtstreeks met mij: degene die meedenkt én maakt.</p>
          <p>Mijn achtergrond ligt op het snijvlak van techniek en commercie: elektrotechnisch opgeleid en al jaren bezig met verlichting, lichtsturing en slimme gebouwen. Naast Denckh maak ik Deegh, ambachtelijk pizzadeeg.</p>
          <p><a className="link-draw" href="/downloads/denckh-achter-denckh.pdf">Meer over mijn achtergrond →</a></p>
        </div>
      </section>

      <div className="shell"><InkRule /></div>

      <section className="shell contact" id="contact" aria-labelledby="contact-titel">
        <h2 id="contact-titel">En wat zit er bij jou in je hoofd?</h2>
        <p className="contact__lead">Het hoeft nog geen plan te zijn. Een half idee, een vraag of een probleem is genoeg om mee te beginnen.</p>
        <ContactReturn />
      </section>

      <div className="shell"><Footer /></div>
    </main>
  );
}
