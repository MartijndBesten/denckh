import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";
import { PreekhulpProbeer } from "@/components/preekhulp/Probeer";
import { PROEF_MAIL } from "@/lib/preekhulp";

// Preekhulp. zelf proberen (B-101): echte uitkomsten van Preekhulp 0.1, vooraf berekend zonder AI en zonder externe
// databanken, geëxporteerd met `scripts/voorbeelden-export.ts` uit de Preekhulp-repository. Geen server, geen AI, geen sleutel.
const title = "Preekhulp. · probeer het zelf";
const description = "Klik zelf door echte uitkomsten van Preekhulp. bij Genesis 31:13, Psalm 23 en Lucas 15:20: grondtekst, verbanden, oude uitleg en ‘Wat zie ik over het hoofd?’. Zonder account, zonder AI.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/preekhulp/probeer/" },
  openGraph: { type: "website", locale: "nl_NL", siteName: "Denckh", url: "/preekhulp/probeer/", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function PreekhulpProbeerPage() {
  return (
    <main id="inhoud" className="oh ph">
      <div className="shell"><Header compact /></div>

      <section className="shell oh-section phd-intro" aria-labelledby="phd-titel">
        <p className="oh-brand">
          <Link href="/preekhulp/" className="oh-name">Preekhulp<span className="oh-dot">.</span></Link>
          <span className="oh-by">Een product van <Image src="/brand/denckh-logo-signature.svg" alt="Denckh." width={1000} height={302} /></span>
        </p>
        <h1 id="phd-titel">Probeer het zelf.</h1>
        <p className="oh-lead">Drie echte onderzoeken uit Preekhulp. Tik op een Hebreeuws of Grieks woord, open het bewijs achter een verband, lees wat Calvijn of de Kanttekeningen schrijven, en laat Preekhulp je eigen preekgedachte naast de tekst leggen.</p>
        <p className="oh-note">Eerlijk vooraf: dit zijn vooraf berekende uitkomsten van Preekhulp 0.1, zonder AI en zonder externe databanken. Hier kies je uit drie gedeelten; met de app zelf onderzoek je elk gedeelte, met je eigen documenten en optioneel AI.</p>
      </section>

      <section className="shell oh-section phd-sectie" aria-label="Preekhulp proberen">
        <PreekhulpProbeer />
        <noscript><p className="oh-note">Deze pagina heeft JavaScript nodig. Op de <Link href="/preekhulp/">productpagina</Link> staan schermafbeeldingen.</p></noscript>
      </section>

      <section className="shell oh-section oh-offer" aria-labelledby="phd-niet">
        <h2 id="phd-niet">Wat de app nog meer doet.</h2>
        <div className="oh-offer__grid">
          <div><h3>AI-analyse</h3><p>Vergelijking van perspectieven, tegenlezing en homiletische aanknopingspunten. In de app met je eigen sleutel en een kostengrens die je vooraf ziet.</p></div>
          <div><h3>Externe bronnen</h3><p>Academische databanken, boekcatalogi en YouTube. In de app gebouwd; de proefronde moet laten zien wat ze waard zijn.</p></div>
          <div><h3>Je eigen documenten</h3><p>Preken, notities en transcripten doorzoeken. Die blijven in de app op je eigen computer.</p></div>
        </div>
        <div className="oh-actions">
          <a className="ink-button" href={PROEF_MAIL}>Doe mee aan de proefronde</a>
          <Link className="link-draw" href="/preekhulp/">Terug naar Preekhulp.</Link>
        </div>
        <p className="oh-note">Bronnen op deze pagina: Statenvertaling en Kanttekeningen (vrij te gebruiken), Berean Standard Bible (publiek domein), grondtekst en woordenboek van STEP Bible (Tyndale House Cambridge, CC BY 4.0), kruisverwijzingen van OpenBible.info (CC BY), Calvijn en Matthew Henry (publiek domein).</p>
      </section>

      <div className="shell"><Footer /></div>
    </main>
  );
}
