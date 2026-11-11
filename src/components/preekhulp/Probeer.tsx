"use client";
// Preekhulp. zelf proberen: echte uitkomsten van Preekhulp 0.1 (zonder AI, zonder externe bronnen), vooraf berekend en als
// JSON meegeleverd (public/preekhulp/voorbeelden/). Alles draait in de browser; er gaat niets naar een server.
// De controle "Wat zie ik over het hoofd?" met een eigen gedachte is een vereenvoudigde versie van die in de app.
import { useEffect, useMemo, useState } from "react";

type Niveau = "direct_aangetoond" | "onderbouwde_interpretatie" | "mogelijke_onderzoekslijn" | "omstreden" | "niet_geverifieerd";
interface Woord { vkey: number; taal: "he" | "gr"; vorm: string; translit: string | null; lemma: string | null; strong: string | null; glosse: string | null; lex: string | null; morf: string | null }
interface Bewijs { label: string; soort: string; bron: string; locatie: string; tekst: string; url: string | null }
interface Signaal { soort: string; ernst: "hoog" | "middel" | "laag"; titel: string; toelichting: string; actie: string; verzen?: string[] }
interface Voorbeeld {
  id: string; titel: string; sub: string; vraag: string; voorbeeldGedachte: string;
  berekend: { datum: string; preekhulpCommit: string; modus: string };
  focus: { label: string; SV: string | null; BSB: string | null }[];
  context: string | null;
  woorden: Woord[];
  beweringen: { id: string; sectie: string; tekst: string; niveau: Niveau; verwijzingen: string[] }[];
  bewijs: Bewijs[];
  interteksten: { label: string; gedeeld: string[]; zelfdeBoek: boolean }[];
  ntVerbanden: { label: string; stemmen: number; via: string }[];
  overHetHoofd: Signaal[];
  controle: { tekstWoorden: string[]; kandidaten: { label: string; waarom: string }[] };
  bronnen: { titel: string; brontype: string; licentie: string | null; ladder: string }[];
}
interface Index { voorbeelden: { id: string; titel: string; sub: string }[]; boeknamen: string[] }

const NIVEAU: Record<Niveau, string> = {
  direct_aangetoond: "Direct aangetoond", onderbouwde_interpretatie: "Onderbouwde interpretatie", mogelijke_onderzoekslijn: "Mogelijke onderzoekslijn", omstreden: "Omstreden", niet_geverifieerd: "Niet geverifieerd",
};
const TABS = [
  ["tekst", "Tekst en grondtaal"],
  ["verbanden", "Verbanden"],
  ["uitleg", "Oude uitleg"],
  ["hoofd", "Wat zie ik over het hoofd?"],
  ["bronnen", "Bronnen"],
] as const;
type Tab = (typeof TABS)[number][0];

// Zelfde regels als in Preekhulp (src/lib/research/overhoofd.ts), vereenvoudigd.
const GEWOON = new Set(["eigenlijk", "daarom", "waarin", "waarbij", "omdat", "zodat", "terwijl", "wanneer", "andere", "anderen", "steeds", "telkens", "gemeente", "preek", "prediking", "vandaag", "mensen", "worden", "werden", "hebben", "kunnen", "moeten", "zullen", "zouden", "tekst", "verhaal", "betekent", "betekenis", "laten", "bijvoorbeeld", "voordat", "tegemoet"]);
const schoon = (w: string) => w.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}]/gu, "");
function inTekst(woord: string, woorden: string[], stammen: Set<string>): boolean {
  const w = schoon(woord);
  if (stammen.has(w.slice(0, 6))) return true;
  return woorden.some((t) => Math.min(t.length, w.length) >= 3 && Math.abs(t.length - w.length) <= 2 && (t.startsWith(w) || w.startsWith(t)));
}
function noemtGedeelte(gedachte: string, label: string): boolean {
  const m = /^(.+?)\s(\d+)(?::|$)/.exec(label);
  if (!m) return false;
  const boek = m[1].toLowerCase();
  const hfst = m[2];
  for (const r of gedachte.matchAll(/([1-3]?\s?[A-Za-zÀ-ÿ]+)\.?\s*(\d+)/g)) {
    const t = r[1].toLowerCase().replace(/\s/g, " ").trim();
    if (t.length >= 3 && boek.startsWith(t) && r[2] === hfst) return true;
  }
  return false;
}

export function PreekhulpProbeer() {
  const [index, setIndex] = useState<Index | null>(null);
  const [id, setId] = useState("genesis-31-13");
  const [v, setV] = useState<Voorbeeld | null>(null);
  const [tab, setTab] = useState<Tab>("tekst");
  const [woord, setWoord] = useState<Woord | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [gedachte, setGedachte] = useState("");
  const [gecontroleerd, setGecontroleerd] = useState<string | null>(null);
  const [fout, setFout] = useState<string | null>(null);

  useEffect(() => {
    fetch("/preekhulp/voorbeelden/index.json").then((r) => r.json()).then(setIndex).catch(() => setFout("De voorbeelden konden niet worden geladen."));
  }, []);
  function kies(nieuw: string) {
    if (nieuw === id) return;
    setV(null);
    setWoord(null);
    setOpen(null);
    setGecontroleerd(null);
    setId(nieuw);
  }
  useEffect(() => {
    fetch(`/preekhulp/voorbeelden/${id}.json`).then((r) => r.json()).then((j: Voorbeeld) => { setV(j); setGedachte(j.voorbeeldGedachte); }).catch(() => setFout("Dit voorbeeld kon niet worden geladen."));
  }, [id]);

  const bewijs = useMemo(() => new Map((v?.bewijs ?? []).map((b) => [b.label, b])), [v]);
  const extra = useMemo<Signaal[]>(() => {
    if (!v || !gecontroleerd || !index) return [];
    const uit: Signaal[] = [];
    const niet = v.controle.kandidaten.filter((k) => !noemtGedeelte(gecontroleerd, k.label));
    if (niet.length) uit.push({ soort: "verband", ernst: "middel", titel: `Je gedachte noemt ${Math.min(5, niet.length)} mogelijk relevante gedeelten niet`, toelichting: `${niet.slice(0, 5).map((k) => `${k.label} — ${k.waarom}`).join("; ")}. Gevonden via gedeelde zeldzame woorden en kruisverwijzingen: sommige zijn inhoudelijk sterk, andere toevallig woordgebruik.`, actie: "Ga na of deze gedeelten je gedachte bevestigen, nuanceren of tegenspreken.", verzen: niet.slice(0, 5).map((k) => k.label) });
    const stammen = new Set(v.controle.tekstWoorden.map((t) => t.slice(0, 6)));
    const boeken = new Set(index.boeknamen);
    const kandidaatWoorden = [...new Set(gecontroleerd.split(/[^\p{L}-]+/u).filter((w) => w.length >= 6 && !GEWOON.has(w.toLowerCase()) && !boeken.has(w.toLowerCase())))];
    // Themawoorden die het dossier al meldt, niet nog eens noemen
    const alGemeld = v.overHetHoofd.filter((x) => x.soort === "thema").map((x) => x.titel.toLowerCase()).join(" ");
    const buiten = kandidaatWoorden.filter((w) => !inTekst(w, v.controle.tekstWoorden, stammen) && !alGemeld.includes(`‘${w.toLowerCase()}’`)).slice(0, 6);
    if (buiten.length) uit.push({ soort: "thema", ernst: "middel", titel: "Begrippen uit je gedachte die niet in de tekst staan", toelichting: `${buiten.map((w) => `‘${w}’`).join(", ")} ${buiten.length > 1 ? "komen" : "komt"} niet voor in de tekst van ${v.context ?? v.titel} (Statenvertaling en BSB). Soms is dat een synoniem; soms leg je er een eigen kader op.`, actie: "Ga per begrip na: staat het (met een ander woord) in de tekst, of komt het uit je eigen theologische kader?" });
    return uit;
  }, [v, gecontroleerd, index]);

  if (fout) return <p className="phd-melding" role="alert">{fout}</p>;

  const bewijsKnop = (label: string) => (
    <button key={label} type="button" className={`phd-ref${open === label ? " is-open" : ""}`} aria-expanded={open === label} onClick={() => setOpen(open === label ? null : label)}>{label}</button>
  );
  const paneel = (labels: string[]) => {
    if (!open || !labels.includes(open)) return null;
    const b = bewijs.get(open);
    if (!b) return <p className="phd-paneel">Dit bewijsstuk zit niet in deze uitsnede.</p>;
    return (
      <div className="phd-paneel">
        <p className="phd-paneel__kop"><b>{b.label}</b> · {b.bron} · {b.locatie}{b.url && <> · <a href={b.url} target="_blank" rel="noreferrer">bron</a></>}</p>
        <p className="phd-paneel__tekst">{b.tekst}</p>
      </div>
    );
  };
  const bewering = (b: Voorbeeld["beweringen"][number]) => (
    <li key={b.id} className="phd-bewering">
      <span className={`phd-niveau phd-niveau--${b.niveau}`}>{NIVEAU[b.niveau]}</span>
      <p>{b.tekst}</p>
      <p className="phd-meta">berekend uit de tekstdata · bewijs: {b.verwijzingen.length ? b.verwijzingen.map((l) => bewijsKnop(l)) : "geen"}</p>
      {paneel(b.verwijzingen)}
    </li>
  );
  const signaalLijst = (lijst: Signaal[]) => (
    <ul className="phd-lijst">
      {lijst.map((s, i) => (
        <li key={i} className="phd-signaal">
          <span className={`phd-ernst phd-ernst--${s.ernst}`}>{s.soort} · {s.ernst}</span>
          <p className="phd-signaal__titel">{s.titel}</p>
          <p>{s.toelichting}</p>
          <p className="phd-meta">→ {s.actie}</p>
        </li>
      ))}
    </ul>
  );

  const perWerk = new Map<string, Bewijs[]>();
  for (const b of v?.bewijs ?? []) if (b.soort === "commentaar") (perWerk.get(b.bron) ?? perWerk.set(b.bron, []).get(b.bron)!).push(b);

  return (
    <div className="phd">
      <div className="phd-keuze" role="radiogroup" aria-label="Kies een voorbeeld">
        {(index?.voorbeelden ?? []).map((x) => (
          <button key={x.id} type="button" role="radio" aria-checked={id === x.id} className={`phd-keuze__knop${id === x.id ? " is-actief" : ""}`} onClick={() => kies(x.id)}>
            <b>{x.titel}</b><span>{x.sub}</span>
          </button>
        ))}
      </div>

      {!v ? <p className="phd-laden" aria-live="polite">Voorbeeld laden…</p> : (
        <>
          <p className="phd-vraag"><span>Onderzoeksvraag</span> {v.vraag}</p>
          <p className="phd-herkomst">Uitkomst van Preekhulp 0.1, modus <b>{v.berekend.modus}</b>, berekend op {v.berekend.datum} · zonder AI en zonder externe databanken · {v.beweringen.length} berekende beweringen, {v.bewijs.length} bewijsstukken in deze uitsnede.</p>

          <div className="phd-tabs" role="tablist" aria-label="Onderdelen van het dossier">
            {TABS.map(([t, naam]) => (
              <button key={t} type="button" role="tab" id={`phd-tab-${t}`} aria-selected={tab === t} aria-controls={`phd-paneel-${t}`} className={`phd-tab${tab === t ? " is-actief" : ""}`} onClick={() => setTab(t)}>{naam}</button>
            ))}
          </div>

          <section className="phd-blad" role="tabpanel" id={`phd-paneel-${tab}`} aria-labelledby={`phd-tab-${tab}`}>
            {tab === "tekst" && (
              <>
                {v.focus.map((q) => (
                  <div key={q.label} className="phd-vers">
                    <h3>{q.label}</h3>
                    <p><span className="phd-vt">SV</span> {q.SV}</p>
                    <p className="phd-zacht"><span className="phd-vt">BSB</span> {q.BSB}</p>
                    <p className="phd-uitleg">Tik op een woord in de grondtekst:</p>
                    <div className={`phd-woorden${v.woorden[0]?.taal === "he" ? " is-hebreeuws" : ""}`}>
                      {v.woorden.filter((w) => q.label.split(" ").pop() === `${Math.floor(w.vkey / 1000) % 1000}:${w.vkey % 1000}`).map((w, i) => (
                        <button key={i} type="button" className={`phd-woord${woord === w ? " is-open" : ""}`} onClick={() => setWoord(woord === w ? null : w)} aria-pressed={woord === w}>
                          <span lang={w.taal === "he" ? "he" : "grc"} className="phd-woord__vorm">{w.vorm}</span>
                          <span className="phd-woord__glosse">{w.glosse}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {woord && (
                  <div className="phd-paneel" aria-live="polite">
                    <p className="phd-paneel__kop"><span lang={woord.taal === "he" ? "he" : "grc"} className="phd-groot">{woord.vorm}</span> · {woord.translit} · grondwoord <span lang={woord.taal === "he" ? "he" : "grc"}>{woord.lemma}</span> · {woord.strong}</p>
                    <p>{woord.glosse}{woord.lex && woord.lex !== woord.glosse ? ` — woordenboek: ${woord.lex}` : ""}</p>
                    {woord.morf && <p className="phd-meta">{woord.morf}</p>}
                  </div>
                )}
                <ul className="phd-lijst">{v.beweringen.filter((b) => b.sectie === "grondtaal" || b.sectie === "context").map((b) => bewering(b))}</ul>
              </>
            )}

            {tab === "verbanden" && (
              <>
                <p className="phd-uitleg">Preekhulp telt zelf in de Hebreeuwse en Griekse tekst welke zeldzame woorden elders terugkomen. Een gedeeld woord is een vindplaats, geen bewijs van een bedoeld verband.</p>
                <ul className="phd-lijst">{v.beweringen.filter((b) => b.sectie === "lijnen").map((b) => bewering(b))}</ul>
                {v.ntVerbanden.length > 0 && <p className="phd-meta">Kruisverwijzingen naar het Nieuwe Testament (OpenBible.info): {v.ntVerbanden.map((n) => `${n.label} (${n.stemmen} stemmen${n.via !== "direct" ? `, via ${n.via}` : ""})`).join("; ")}.</p>}
              </>
            )}

            {tab === "uitleg" && (
              <>
                <p className="phd-uitleg">Wat oudere uitleggers bij dit gedeelte schrijven, met de vindplaats. In de app staat de volledige tekst; hier een ingekorte versie.</p>
                {[...perWerk.entries()].map(([werk, lijst]) => (
                  <details key={werk} className="phd-werk" open={perWerk.size <= 3}>
                    <summary>{werk} <span className="phd-zacht">({lijst.length})</span></summary>
                    {lijst.map((b) => <blockquote key={b.label} className="phd-citaat"><p className="phd-meta"><b>{b.label}</b> · {b.locatie}{b.url && <> · <a href={b.url} target="_blank" rel="noreferrer">bron</a></>}</p><p>{b.tekst}</p></blockquote>)}
                  </details>
                ))}
                {perWerk.size === 0 && <p>Geen oude uitleg bij precies deze verzen in deze uitsnede.</p>}
              </>
            )}

            {tab === "hoofd" && (
              <>
                <p className="phd-uitleg">Preekhulp legt je dossier en je eigen preekgedachte naast de tekst. Wat in deze lijst staat, zijn signalen om te toetsen, geen oordelen.</p>
                <form className="phd-gedachte" onSubmit={(e) => { e.preventDefault(); setGecontroleerd(gedachte.trim() || null); }}>
                  <label htmlFor="phd-gedachte">Je voorlopige gedachte of preeklijn</label>
                  <textarea id="phd-gedachte" value={gedachte} onChange={(e) => setGedachte(e.target.value)} rows={3} maxLength={1500} />
                  <button type="submit" className="ink-button">Controleer mijn gedachte</button>
                </form>
                {gecontroleerd && (extra.length ? signaalLijst(extra) : <p>Geen extra signalen bij deze gedachte. Dat betekent niet dat er niets ontbreekt.</p>)}
                <h3 className="phd-tussenkop">Signalen uit het dossier zelf</h3>
                {signaalLijst(v.overHetHoofd)}
                <p className="phd-meta">In de app kun je hierna ook de AI laten meelezen (met je eigen sleutel en een vooraf getoonde kostengrens). Dat zit niet op deze pagina.</p>
              </>
            )}

            {tab === "bronnen" && (
              <>
                <p className="phd-uitleg">Elke bron met type, licentie en hoe ver Preekhulp ermee kwam: van gevonden, via relevant, tot inhoud gelezen en citaat gecontroleerd.</p>
                <ul className="phd-bronnen">
                  {v.bronnen.map((b) => <li key={b.titel}><b>{b.titel}</b><span>{b.brontype}{b.licentie ? ` · ${b.licentie}` : ""}</span><span className="phd-zacht">{b.ladder}</span></li>)}
                </ul>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
