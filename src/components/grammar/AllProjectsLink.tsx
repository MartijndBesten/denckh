"use client";

// "Bekijk alle projecten →": in de knop bladert jouw eigen lijn (uit de hero) door de projecten die je op de homepage
// nog niet zag. Lijn → koffer → spelkaart → … → weer jouw lijn. Bij aanwijzen of focus bladert hij sneller.
// Alleen in beeld en met een zichtbaar tabblad; bij reduced motion staat er één vorm stil.
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { linePath, resample } from "@/lib/ink/geometry";
import { useMorph } from "@/lib/ink/hooks";
import { SHAPES, SN } from "@/lib/ink/shapes";
import { place, useSketch } from "@/lib/ink/store";
import { useReducedMotion } from "@/lib/ink/useReducedMotion";

// de vormen uit /projecten/ die niet op de homepage staan (zelfde tekeningen als daar)
const STOPS: { shape: keyof typeof SHAPES; name: string }[] = [
  { shape: "demo", name: "de demokoffer" },
  { shape: "spel", name: "Loflijn" },
  { shape: "webshop", name: "LYEV." },
  { shape: "agenda", name: "Autowasdag Sionkerk" },
  { shape: "kerk", name: "Kerckh." },
  { shape: "dart", name: "OKKIE." },
  { shape: "presentatie", name: "een presentatie" },
  { shape: "gebouw", name: "een werkdag in 3D" },
];
// tekenen in een vast kader en via viewBox verkleinen: de vormen zijn op deze maat ontworpen
const W = 300, H = 186;

export function AllProjectsLink() {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const sketch = useSketch();
  const [visible, setVisible] = useState(false);
  const [fast, setFast] = useState(false);
  // -1 = jouw lijn, 0..7 = een project
  const [step, setStep] = useState(-1);

  const line = useMemo(() => resample(place(sketch.points, W * 0.18, H * 0.12, W * 0.64, H * 0.76), SN), [sketch]);
  const shapes = useMemo(() => STOPS.map((s) => SHAPES[s.shape]({ w: W, h: H })), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setStep((s) => (s + 1 < STOPS.length ? s + 1 : -1));
    }, fast ? 700 : 1600);
    return () => window.clearInterval(id);
  }, [reduced, visible, fast]);

  const shown = reduced ? 0 : step;
  const shape = shown >= 0 ? shapes[shown] : null;
  const morph = fast ? 380 : 720;
  const pts = useMorph(shape ? shape.outline : line, morph, reduced);
  // de naam wisselt halverwege de vervorming, zodat hij bij de vorm hoort die verschijnt
  const [named, setNamed] = useState(shown);
  useEffect(() => {
    const id = window.setTimeout(() => setNamed(shown), reduced ? 0 : morph / 2);
    return () => window.clearTimeout(id);
  }, [shown, morph, reduced]);
  const now = named >= 0 ? STOPS[named].name : sketch.own ? "jouw lijn" : "een lijn";

  return (
    <Link ref={ref} className="all-link" href="/projecten/"
      onMouseEnter={() => setFast(true)} onMouseLeave={() => setFast(false)} onFocus={() => setFast(true)} onBlur={() => setFast(false)}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <path d={linePath(pts, !!shape?.closed)} className={`all-link__line${shape ? "" : " is-sketch"}`} />
        {shape && (
          <g key={shown} className="all-link__details" style={{ ["--wait" as string]: `${reduced ? 0 : fast ? 260 : 520}ms` }}>
            {shape.details.map((d, i) => <path key={i} d={d} pathLength={1} />)}
          </g>
        )}
        <circle cx={pts[0].x} cy={pts[0].y} r={9} className="all-link__dot" />
      </svg>
      <span className="all-link__text">
        <span className="all-link__label">Bekijk alle projecten <span className="all-link__arrow">→</span></span>
        <span className="all-link__now" aria-hidden="true">{reduced ? `en nog ${STOPS.length} projecten` : now}</span>
      </span>
    </Link>
  );
}
