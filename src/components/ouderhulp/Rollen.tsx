"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Scherm } from "./Scherm";
import { useHydrated } from "./useHydrated";
import { SHOTS, type Shot } from "@/lib/ouderhulp";

// Eén overzicht per rol. Met JavaScript tabbladen (pijltjestoetsen, Home/End); zonder JavaScript staan de drie rollen
// gewoon onder elkaar.
const ROLLEN: { id: string; naam: string; kop: string; punten: string[]; shots: Shot[] }[] = [
  { id: "leerkracht", naam: "Leerkrachten", kop: "Hulp vragen zonder formulieren en mailtjes.",
    punten: ["Een hulpvraag maken in een paar velden; de punten staan al vast.", "Eigen klassen bekijken, met de status van elke hulpvraag.", "Reacties en bezetting volgen per dienst, zonder e-mailadressen van ouders."],
    shots: [SHOTS.leerkrachtHulpvraag, SHOTS.leerkrachtKlas] },
  { id: "beheerder", naam: "Schoolbeheerder", kop: "Eén werkoverzicht in plaats van losse lijstjes.",
    punten: ["Nieuwe aanvragen beoordelen, of de leerkracht om aanvulling vragen.", "Ouderhulplijsten samenstellen in vijf stappen, met controle vóór versturen.", "Reacties, tekorten, planning en punten beheren, met een export voor Excel (CSV)."],
    shots: [SHOTS.beheerDashboard, SHOTS.beheerLijst, SHOTS.beheerReacties] },
  { id: "ouder", naam: "Ouders", kop: "Zien wat voor hun gezin relevant is.",
    punten: ["Alleen activiteiten van de klassen van de eigen kinderen en van de hele school.", "Per dienst de hele tijd, een deel of niet aangeven.", "Eén begrijpelijk overzicht vóór het indienen.", "Definitieve afspraken terugvinden, ook in de eigen agenda."],
    shots: [SHOTS.ouderActiviteit, SHOTS.ouderOverzicht, SHOTS.ouderOntvangen] },
];

function Paneel({ r }: { r: (typeof ROLLEN)[number] }) {
  return (
    <>
      <div className="oh-role__text">
        <h3>{r.kop}</h3>
        <ul>{r.punten.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
      <div className={`oh-role__shots oh-role__shots--${r.id}`}>
        {r.shots.map((s) => <Scherm key={s.src} shot={s} size={s.width > 1000 ? "desk" : "phone"} />)}
      </div>
    </>
  );
}

export function Rollen() {
  const enhanced = useHydrated();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const n = ROLLEN.length;
    const next = e.key === "ArrowRight" ? (active + 1) % n : e.key === "ArrowLeft" ? (active - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault(); setActive(next); tabs.current[next]?.focus();
  };

  if (!enhanced) {
    return (
      <div className="oh-roles">
        {ROLLEN.map((r) => (
          <section key={r.id} className="oh-role" aria-labelledby={`oh-rol-${r.id}`}>
            <h3 id={`oh-rol-${r.id}`} className="oh-role__name">{r.naam}</h3>
            <Paneel r={r} />
          </section>
        ))}
      </div>
    );
  }
  return (
    <div className="oh-roles is-enhanced">
      <div className="oh-roles__tabs" role="tablist" aria-label="Kies een rol" onKeyDown={onKey}>
        {ROLLEN.map((r, i) => (
          <button key={r.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`oh-tab-${r.id}`}
            aria-selected={i === active} aria-controls={`oh-paneel-${r.id}`} tabIndex={i === active ? 0 : -1}
            className={i === active ? "is-active" : undefined} onClick={() => setActive(i)}>
            {r.naam}
          </button>
        ))}
      </div>
      {ROLLEN.map((r, i) => (
        <div key={r.id} className="oh-role" role="tabpanel" id={`oh-paneel-${r.id}`} aria-labelledby={`oh-tab-${r.id}`} hidden={i !== active} tabIndex={0}>
          <Paneel r={r} />
        </div>
      ))}
    </div>
  );
}
