"use client";

// Vertel → Samen denken → Vorm geven, getekend met jouw eigen lijn. Wat er in de hero gebeurde, is de werkwijze in het klein.
import { useRef } from "react";
import { bbox, linePath, resample } from "@/lib/ink/geometry";
import { useInView } from "@/lib/ink/hooks";
import { SHAPES } from "@/lib/ink/shapes";
import { place, useSketch } from "@/lib/ink/store";

const W = 240, H = 170;
const kindToShape: Record<string, keyof typeof SHAPES> = { knop: "knop", scherm: "website", schuif: "tool", grafiek: "visualisatie", route: "uitleg", kaart: "uitleg", punt: "knop" };

const STEPS = [
  { title: "Vertel", text: "Je hebt een idee, een probleem of een vraag. Eén zin of een krabbel is genoeg." },
  { title: "Samen denken", text: "We zoeken uit wat je werkelijk nodig hebt. Soms is het antwoord: gebruik iets wat al bestaat." },
  { title: "Vorm geven", text: "Is het zinvol om iets te maken, dan maak ik het. Zo dat je er zelf mee verder kunt." },
];

export function Werkwijze() {
  const ref = useRef<HTMLOListElement>(null);
  const seen = useInView(ref);
  const sketch = useSketch();
  const pts = resample(place(sketch.points, 30, 26, W - 60, H - 52), 96);
  const b = bbox(pts);
  const shape = SHAPES[kindToShape[sketch.kind] ?? "uitleg"]({ w: W, h: H });
  const arm = 10, pad = 10;
  const x0 = b.x0 - pad, y0 = b.y0 - pad, x1 = b.x1 + pad, y1 = b.y1 + pad;
  const brackets = `M${x0} ${y0 + arm} V${y0} H${x0 + arm} M${x1 - arm} ${y0} H${x1} V${y0 + arm} M${x1} ${y1 - arm} V${y1} H${x1 - arm} M${x0 + arm} ${y1} H${x0} V${y1 - arm}`;

  const figures = [
    <g key="1"><path d={linePath(pts)} pathLength={1} className="ww-idea ww-anim" /><circle cx={pts[0].x} cy={pts[0].y} r={5} className="ww-dot" /></g>,
    <g key="2"><path d={linePath(pts)} className="ww-idea ww-idea--quiet" /><path d={brackets} pathLength={1} className="ww-look ww-anim" /><path d={`M${x0} ${y1 + 12} H${x1}`} pathLength={1} className="ww-look ww-anim" /></g>,
    <g key="3"><path d={linePath(shape.outline, shape.closed)} pathLength={1} className="ww-form ww-anim" />{shape.details.map((d, i) => <path key={i} d={d} pathLength={1} className="ww-form ww-form--detail ww-anim" />)}</g>,
  ];

  return (
    <ol ref={ref} className={`werkwijze${seen ? " is-drawn" : ""}`}>
      {STEPS.map((s, i) => (
        <li key={s.title} style={{ ["--i" as string]: i }}>
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">{figures[i]}</svg>
          <h3><span className="werkwijze__n">{i + 1}</span>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
