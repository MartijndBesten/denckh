"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/ink/hooks";
import { useReducedMotion } from "@/lib/ink/useReducedMotion";
import { useHydrated } from "./useHydrated";

// De keten van hulpvraag naar planning, in vier stappen. Speelt één keer af als hij in beeld komt; daarna kiest de
// bezoeker zelf een stap. Zonder JavaScript staan alle vier stappen met hun voorbeeld onder elkaar.
const STEPS = [
  { who: "Leerkracht", title: "maakt een hulpvraag", text: "Soort, klas, titel en tijdvak. Punten staan centraal vast. Bewaren als concept kan; doorzetten stuurt de vraag naar de beheerder." },
  { who: "Beheerder", title: "bundelt in een ouderhulplijst", text: "Hulpvragen en schoolactiviteiten in één uitvraag, voor de hele school of voor gekozen klassen. Eerst controleren, dan bewust versturen." },
  { who: "Ouders", title: "geven beschikbaarheid op", text: "Per activiteit: de hele tijd, een deel of niet. Alles wordt meteen bewaard; de school ziet het pas na indienen." },
  { who: "School", title: "maakt en bevestigt de indeling", text: "Reacties en tekorten per dienst in één overzicht. Eerst een voorlopige indeling, daarna publiceren. Ouders krijgen hun afspraken met agenda-bestand." },
] as const;

function Voorbeeld({ i }: { i: number }) {
  if (i === 0) return (
    <div className="oh-mini" aria-hidden="true">
      <p className="oh-mini__title">Excursie kinderboerderij</p>
      <p className="oh-mini__meta">Groep 3 · za 28 nov, 9:00–12:00 · 3 helpers</p>
      <p><span className="oh-chip oh-chip--info">Aangevraagd</span></p>
    </div>
  );
  if (i === 1) return (
    <div className="oh-mini" aria-hidden="true">
      <p className="oh-mini__title">Ouderhulplijst · Voorjaar groep 3</p>
      <ul className="oh-mini__checks"><li>Excursie kinderboerderij</li><li>Schoonmaakavond</li></ul>
      <p className="oh-mini__meta">Stap 5 van 5 · Versturen</p>
    </div>
  );
  if (i === 2) return (
    <div className="oh-mini" aria-hidden="true">
      <p className="oh-mini__title">Excursie kinderboerderij</p>
      <p className="oh-mini__opts"><span>de hele tijd</span><span className="is-on">een deel · 9:00–11:00</span><span>niet</span></p>
      <p className="oh-mini__meta">Bewaard als concept</p>
    </div>
  );
  return (
    <div className="oh-mini" aria-hidden="true">
      <p className="oh-mini__title">Excursie kinderboerderij</p>
      <p className="oh-mini__meta">3 nodig · 5 gereageerd</p>
      <p><span className="oh-chip oh-chip--prov">2 voorlopig</span> <span className="oh-chip oh-chip--final">1 definitief</span></p>
    </div>
  );
}

export function Route() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, "0px 0px -30% 0px");
  const reduced = useReducedMotion();
  const enhanced = useHydrated();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  // Eén keer de hele route laten zien; stopt bij de laatste stap of zodra de bezoeker zelf kiest.
  useEffect(() => {
    if (!seen || reduced || touched) return;
    if (active >= STEPS.length - 1) return;
    const t = window.setTimeout(() => setActive((a) => a + 1), 1500);
    return () => window.clearTimeout(t);
  }, [seen, reduced, touched, active]);
  const pick = (i: number) => { setTouched(true); setActive(i); };

  return (
    <div ref={ref} className={`oh-route${enhanced ? " is-enhanced" : ""}${seen || reduced ? " is-seen" : ""}`} style={{ ["--step" as string]: active }}>
      <span className="oh-route__line" aria-hidden="true"><span /></span>
      <ol className="oh-route__steps">
        {STEPS.map((s, i) => (
          <li key={s.who} className={`oh-route__step${enhanced && i <= active ? " is-reached" : ""}${enhanced && i === active ? " is-active" : ""}`}>
            {enhanced ? (
              <button type="button" onClick={() => pick(i)} aria-current={i === active ? "step" : undefined} aria-controls="oh-route-panel">
                <span className="oh-route__num" aria-hidden="true">{i + 1}</span>
                <span className="oh-route__who">{s.who}</span>
                <span className="oh-route__what">{s.title}</span>
              </button>
            ) : (
              <div className="oh-route__static">
                <span className="oh-route__num" aria-hidden="true">{i + 1}</span>
                <span className="oh-route__who">{s.who}</span>
                <span className="oh-route__what">{s.title}</span>
                <p>{s.text}</p>
                <Voorbeeld i={i} />
              </div>
            )}
          </li>
        ))}
      </ol>
      {enhanced && (
        <div className="oh-route__panel" id="oh-route-panel" aria-live="polite">
          <div className="oh-route__text" key={`t${active}`}>
            <p className="oh-route__label">{STEPS[active].who} {STEPS[active].title}</p>
            <p>{STEPS[active].text}</p>
          </div>
          <div className="oh-route__example" key={`v${active}`}><Voorbeeld i={active} /></div>
        </div>
      )}
    </div>
  );
}
