// Vijf projecten, vijf soorten denken. Alleen geverifieerde inhoud (zie docs/cases/). Geen logo's of beelden van derden:
// de eindbeelden zijn schematische weergaven, zo gemarkeerd. Uitzondering: LYEV. (eigen project) eindigt in een echte
// schermafbeelding van de eigen site.
import { SHAPES } from "@/lib/ink/shapes";
import { resample } from "@/lib/ink/geometry";
import { rr, type Build } from "./Construct";

const D = (d: string, key: number) => <path key={key} d={d} pathLength={1} className="c-anim" />;

/** Deegh: product → merk → webshop. Namen uit de broncode van de webshop (menu en producten).
 *  Het logo is eigen werk van de eigenaar (docs/cases/deegh.md); de deegbol rijst, de lijn wordt een cirkel en maakt
 *  plaats voor het echte logo. */
export const deeghBuild: Build = (w, h) => {
  const bol = SHAPES.deegbol({ w, h });
  const shop = SHAPES.webshop({ w, h });
  const lr = Math.min(w, h) * 0.34, lcx = w / 2, lcy = h / 2;
  const merk = resample(Array.from({ length: 129 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 128) * Math.PI * 2;
    return { x: lcx + Math.cos(a) * lr, y: lcy + Math.sin(a) * lr };
  }), 128);
  // het echte logo (public/images/deegh-logo.png, 626 × 640, transparant): schijf met middelpunt (318,5; 320) en straal
  // ca. 241 px; de spetters eromheen horen erbij. De schijf komt precies op de cirkel die de lijn net getekend heeft.
  const ls = lr / 241, logo = { x: lcx - 318.5 * ls, y: lcy - 320 * ls, w: 626 * ls, h: 640 * ls };
  const W = Math.min(w * 0.86, h * 1.5), H = W / 1.5, x = (w - W) / 2, y = (h - H) / 2;
  const tw = (W - 56) / 3;
  const nav = ["Webshop", "Zo werkt Deegh", "Verkooppunten", "Zakelijk"];
  const products = [["Deegh Gezin", "6 pizzabollen"], ["Deegh Voorraad", "12 pizzabollen"], ["Deegh Pizza-avond", "24 pizzabollen"]];
  const fs = Math.max(8, Math.min(11, W / 48));
  // tekstbreedte in em: gemeten in Manrope plus 8 % marge (andere woorden: ruim geschat per teken). Op een smal scherm
  // krimpt de letter mee in plaats van dat woorden over elkaar schuiven.
  const EM: Record<string, number> = { deegh: 3.07, Webshop: 4.35, "Zo werkt Deegh": 7.2, Verkooppunten: 7.05, Zakelijk: 3.45 };
  const em = (t: string, bold = false) => (EM[t] ?? t.length * (bold ? 0.62 : 0.56)) * 1.08;
  const navFrom = x + 14 + em("deegh", true) * (fs + 3) + 16, navTo = x + W - 14, gap = 1.6;
  const navEm = nav.reduce((sum, n) => sum + em(n), 0) + gap * (nav.length - 1);
  const nfs = Math.min(fs, (navTo - navFrom) / navEm);
  const navX = nav.map((_, i) => Math.max(navFrom, navTo - navEm * nfs) + (nav.slice(0, i).reduce((sum, n) => sum + em(n), 0) + gap * i) * nfs);
  const pfs = Math.min(fs, tw / Math.max(...products.map(([n]) => em(n, true))));
  return {
    stages: [
      { ...bol, caption: "een deegbol", details: bol.details.map(D) },
      { outline: merk, closed: true, caption: "een merk", hideLine: true, details: [
        <image key="logo" href="/images/deegh-logo.png" x={logo.x} y={logo.y} width={logo.w} height={logo.h} className="c-logo" />,
      ] },
      { ...shop, caption: "een plek om te bestellen", details: shop.details.map(D) },
    ],
    final: (
      <g className="deegh-shot">
        <path d={rr(x, y, W, H, 10)} fill="#ffffff" stroke="#554f4f" strokeOpacity=".35" />
        <path d={rr(x, y, W, 26, 10)} fill="#f0e8d3" />
        <text x={x + 14} y={y + 17} fontSize={fs + 3} fontWeight="700" fill="#554f4f">deegh</text>
        {nav.map((n, i) => <text key={n} x={navX[i]} y={y + 17} fontSize={nfs} fill="#554f4f">{n}</text>)}
        <text x={x + 16} y={y + 56} fontSize={fs + 5} fontWeight="700" fill="#554f4f">Ons deeg</text>
        {products.map(([n, s], i) => (
          <g key={n}>
            <path d={rr(x + 16 + i * (tw + 12), y + 70, tw, H * 0.38, 6)} fill="#f0e8d3" />
            <circle cx={x + 16 + i * (tw + 12) + tw / 2} cy={y + 70 + H * 0.19} r={Math.min(tw, H * 0.38) * 0.22} fill="#fbf7ec" stroke="#554f4f" strokeOpacity=".25" />
            <text x={x + 16 + i * (tw + 12)} y={y + 86 + H * 0.38} fontSize={pfs} fontWeight="700" fill="#554f4f">{n}</text>
            <text x={x + 16 + i * (tw + 12)} y={y + 100 + H * 0.38} fontSize={pfs - 1} fill="#554f4f">{s}</text>
          </g>
        ))}
      </g>
    ),
  };
};

/** Demokoffer: complexe techniek → begrijpelijke uitleg. Zonder merknamen of productbeelden (toestemming open). */
export const kofferBuild: Build = (w, h) => {
  const koffer = SHAPES.demo({ w, h });
  const W = Math.min(w * 0.8, h * 1.45), H = W / 1.45, x = (w - W) / 2, y = (h - H) / 2 + 10;
  const callouts = [
    { cx: x + W * 0.25, cy: y + H / 2, n: 1, lx: x + W * 0.06, ly: y + H * 0.14 },
    { cx: x + W * 0.75, cy: y + H / 2, n: 2, lx: x + W * 0.94, ly: y + H * 0.14 },
    { cx: x + W * 0.75, cy: y + H / 2 + H * 0.2, n: 3, lx: x + W * 0.94, ly: y + H * 0.9 },
  ];
  const flow = resample([{ x: w * 0.12, y: h * 0.5 }, { x: w * 0.88, y: h * 0.5 }], 128);
  const steps = [0.12, 0.38, 0.62, 0.88].map((t) => ({ x: w * t, y: h * 0.5 }));
  const labels = ["ontgrendel", "kies", "draai", "klaar"];
  return {
    stages: [
      { ...koffer, caption: "een koffer vol techniek", details: koffer.details.map(D) },
      { ...koffer, caption: "wat zit waar?", details: [
        ...koffer.details.map(D),
        ...callouts.map((c, i) => (
          <g key={`c${i}`} className="callout">
            <path d={`M${c.cx} ${c.cy} L${c.lx} ${c.ly}`} pathLength={1} className="c-anim" />
            <circle cx={c.lx} cy={c.ly} r={11} />
            <text x={c.lx} y={c.ly + 4} textAnchor="middle">{c.n}</text>
          </g>
        )),
      ] },
      { outline: flow, closed: false, caption: "bediening in stappen", details: steps.map((s, i) => (
        <g key={i} className="callout">
          <circle cx={s.x} cy={s.y} r={14} />
          <text x={s.x} y={s.y + 4} textAnchor="middle">{i + 1}</text>
          <text x={s.x} y={s.y + 36} textAnchor="middle" className="callout__label">{labels[i]}</text>
        </g>
      )) },
    ],
  };
};

/** Loflijn: een beurt in het spel. Kaart (QR) → lied → plek op de tijdlijn. Schematisch: geen kaartontwerpen,
 *  productfoto's of muziek overgenomen. Spelstappen van de live site (docs/cases/loflijn.md). */
export const spelBuild: Build = (w, h) => {
  // 1 · de kaart, met een abstracte QR-code
  const cH = h * 0.78, cW = cH * 0.68, cx = (w - cW) / 2, cy = (h - cH) / 2;
  const card = resample(rrPts(cx, cy, cW, cH, 12), 128);
  const q = cW * 0.66, qx = cx + (cW - q) / 2, qy = cy + cH * 0.18, m = q / 9;
  const sq = (a: number, b: number, s: number) => `M${qx + a * m} ${qy + b * m} h${s * m} v${s * m} h${-s * m} Z`;
  const finders = [[0, 0], [6, 0], [0, 6]];
  const modules = [[4, 0], [3, 1], [5, 1], [4, 2], [0, 4], [2, 4], [4, 4], [5, 5], [7, 4], [8, 5], [3, 6], [4, 7], [6, 6], [7, 7], [8, 8], [5, 8], [3, 8]];
  const cardDetails = [
    <path key="f" d={finders.map(([a, b]) => rr(qx + a * m, qy + b * m, m * 3, m * 3, 2)).join(" ")} pathLength={1} className="c-anim" />,
    <path key="m" d={[...finders.map(([a, b]) => sq(a + 0.9, b + 0.9, 1.2)), ...modules.map(([a, b]) => sq(a + 0.08, b + 0.08, 0.84))].join(" ")} className="c-fade" />,
    <path key="l" d={`M${cx + cW * 0.3} ${cy + cH * 0.86} H${cx + cW * 0.7}`} pathLength={1} className="c-anim" />,
  ];

  // 2 · het lied: de lijn gaat trillen
  const x0 = w * 0.1, x1 = w * 0.9, mid = h * 0.46;
  const wave = Array.from({ length: 128 }, (_, i) => {
    const t = i / 127, env = Math.sin(Math.PI * t) * (0.55 + 0.45 * Math.sin(t * 9.3));
    return { x: x0 + (x1 - x0) * t, y: mid + Math.sin(t * Math.PI * 18) * h * 0.2 * env };
  });
  const pr = Math.min(18, h * 0.07), px = w / 2, py = h * 0.84;
  const waveDetails = [`M${px - pr} ${py} a${pr} ${pr} 0 1 0 ${2 * pr} 0 a${pr} ${pr} 0 1 0 ${-2 * pr} 0`,
    `M${px - pr * 0.3} ${py - pr * 0.45} L${px + pr * 0.5} ${py} L${px - pr * 0.3} ${py + pr * 0.45} Z`,
    `M${x0} ${py} H${px - pr - 10} M${px + pr + 10} ${py} H${x1}`];

  // 3 · de tijdlijn: drie kaarten liggen er al, de nieuwe zoekt zijn plek
  const ly = h * 0.7, lx0 = w * 0.06, lx1 = w * 0.94;
  const line = resample([{ x: lx0, y: ly }, { x: lx1, y: ly }], 128);
  const tw = Math.min(54, w * 0.1), th = tw * 1.4;
  const placed = [0.2, 0.5, 0.8].map((t) => lx0 + (lx1 - lx0) * t);
  const gap = (placed[1] + placed[2]) / 2;
  const lineDetails = [
    ...placed.map((x, i) => <path key={`p${i}`} d={`${rr(x - tw / 2, ly - th - 10, tw, th, 5)} M${x} ${ly - 6} V${ly + 6}`} pathLength={1} className="c-anim" />),
    <path key="new" d={`${rr(gap - tw / 2, ly - th * 2 - 22, tw, th, 5)} M${gap} ${ly - th - 18} V${ly - 8}`} pathLength={1} className="c-anim c-idea" />,
  ];

  // eindbeeld: een volle tijdlijn, van psalm tot praise (op dezelfde lijn als stap 3)
  const n = 7, slot = (lx1 - lx0) / n, fw = Math.min(42, slot * 0.72), fh = fw * 1.4, fs = Math.max(10, Math.min(13, w / 40));
  return {
    stages: [
      { outline: card, closed: true, caption: "scan de kaart", details: cardDetails },
      { outline: wave, closed: false, caption: "luister naar het lied", details: waveDetails.map(D) },
      { outline: line, closed: false, caption: "leg hem op de tijdlijn", details: lineDetails },
    ],
    final: (
      <g className="loflijn-shot">
        <path d={`M${lx0} ${ly} H${lx1}`} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
        {Array.from({ length: n }, (_, i) => {
          const x = lx0 + slot * (i + 0.5);
          return <path key={i} d={rr(x - fw / 2, ly - fh - 10, fw, fh, 5)} className={i === 4 ? "loflijn-shot__new" : "loflijn-shot__card"} />;
        })}
        <text x={lx0} y={ly + 26} fontSize={fs}>psalm</text>
        <text x={lx1} y={ly + 26} fontSize={fs} textAnchor="end">praise</text>
      </g>
    ),
  };
};

/** LYEV.: een strasssteentje → een product met jouw kleur en naam → een webshop op de telefoon. Het eindbeeld is een
 *  echte schermafbeelding van de homepage van lyev.nl (docs/cases/lyev.md), in het telefoonkader dat de lijn tekende. */
export const lyevBuild: Build = (w, h) => {
  // 1 · een strasssteentje van boven: achthoek met facetten en een glinstering
  const s = Math.min(w, h) * 0.3, gx = w / 2, gy = h / 2;
  const oct = Array.from({ length: 9 }, (_, i) => {
    const a = -Math.PI / 2 + Math.PI / 8 + (i / 8) * Math.PI * 2;
    return { x: gx + Math.cos(a) * s, y: gy + Math.sin(a) * s };
  });
  const gem = resample(oct, 128);
  const inner = oct.slice(0, 8).map((p) => ({ x: gx + (p.x - gx) * 0.5, y: gy + (p.y - gy) * 0.5 }));
  const sx = gx + s * 0.95, sy = gy - s * 0.95, sr = s * 0.2;
  const gemDetails = [
    D(`M${inner.map((p) => `${p.x} ${p.y}`).join(" L")} Z`, 0),
    D(inner.map((p, i) => `M${p.x} ${p.y} L${oct[i].x} ${oct[i].y}`).join(" "), 1),
    <path key="spark" d={`M${sx} ${sy - sr} V${sy + sr} M${sx - sr} ${sy} H${sx + sr}`} pathLength={1} className="c-anim c-idea" />,
  ];

  // 2 · een product dat je zelf kiest: een label met kleurrondjes en een naamregel
  const tW = Math.min(w * 0.6, h * 0.95), tH = tW * 0.62, tx = (w - tW) / 2, ty = (h - tH) / 2;
  const tag = resample(rrPts(tx, ty, tW, tH, 14), 128);
  const dr = tH * 0.085;
  const ring = (cx: number, cy: number, r: number) => `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
  const tagDetails = [
    <path key="gat" d={ring(tx + tW * 0.1, ty + tH * 0.2, dr * 0.6)} pathLength={1} className="c-anim" />,
    ...[0, 1, 2, 3].map((i) => (
      <path key={`k${i}`} d={ring(tx + tW * 0.24 + i * dr * 3, ty + tH * 0.42, dr)} pathLength={1} className={i === 1 ? "c-anim c-idea" : "c-anim"} />
    )),
    <path key="naam" d={`M${tx + tW * 0.24 - dr} ${ty + tH * 0.72} H${tx + tW * 0.82}`} pathLength={1} className="c-anim" />,
  ];

  // 3 · een webshop op de telefoon, in dezelfde verhouding als de schermafbeelding (540 × 1169)
  const pH = h * 0.92, pW = pH * (540 / 1169), px = (w - pW) / 2, py = (h - pH) / 2;
  const phone = resample(rrPts(px, py, pW, pH, pW * 0.12), 128);
  const m = pW * 0.1, cell = (pW - m * 3) / 2;
  const shopDetails = [
    `M${px + m} ${py + pH * 0.1} H${px + pW - m}`,
    `M${px + m} ${py + pH * 0.2} H${px + pW * 0.7} M${px + m} ${py + pH * 0.26} H${px + pW * 0.55}`,
    ...[0, 1, 2, 3].map((i) => rr(px + m + (i % 2) * (cell + m), py + pH * 0.36 + Math.floor(i / 2) * (cell + m), cell, cell, 5)),
    rr(px + m, py + pH * 0.36 + 2 * (cell + m), pW - 2 * m, pH * 0.07, pH * 0.035),
  ].map(D);
  const bezel = pW * 0.035;
  return {
    stages: [
      { outline: gem, closed: true, caption: "een strasssteentje", details: gemDetails },
      { outline: tag, closed: true, caption: "jouw kleur, jouw naam", details: tagDetails },
      { outline: phone, closed: true, caption: "een webshop op je telefoon", details: shopDetails },
    ],
    final: (
      <g className="lyev-shot">
        <defs>
          <clipPath id="lyev-scherm"><path d={rr(px + bezel, py + bezel, pW - bezel * 2, pH - bezel * 2, pW * 0.1)} /></clipPath>
        </defs>
        <path d={rr(px, py, pW, pH, pW * 0.12)} className="lyev-shot__frame" />
        <image href="/images/projecten/lyev-home.webp" x={px + bezel} y={py + bezel} width={pW - bezel * 2} height={pH - bezel * 2}
          preserveAspectRatio="xMidYMin slice" clipPath="url(#lyev-scherm)" />
      </g>
    ),
  };
};

/** TCLP: een armatuur → de keten als kringloop → alle partijen verbonden. Schematisch, zonder het TCLP-logo of beelden
 *  van de site; stapnamen en rollen zoals op tclp.nl (docs/cases/tclp.md). */
export const tclpBuild: Build = (w, h) => {
  // 1 · een armatuur aan het eind van een project: pendelkap aan een snoer
  const cx = w / 2, s = Math.min(w, h), ky = h * 0.36, kh = s * 0.3, top = s * 0.14, bot = s * 0.34;
  const shade = resample([
    { x: cx - top, y: ky }, { x: cx + top, y: ky }, { x: cx + bot, y: ky + kh }, { x: cx - bot, y: ky + kh }, { x: cx - top, y: ky },
  ], 128);
  const lampDetails = [
    `M${cx} ${ky} V${h * 0.06}`,
    `M${cx - s * 0.08} ${ky + kh} A${s * 0.08} ${s * 0.08} 0 0 0 ${cx + s * 0.08} ${ky + kh}`,
  ].map(D);

  // 2 · zes stappen in een kring: van demonteren tot opnieuw inzetten (de korte namen uit de draaiende hero)
  const r = s * 0.33, cy = h / 2;
  const ring = resample(Array.from({ length: 129 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 128) * Math.PI * 2;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  }), 128);
  const names = ["Demonteren", "Ophalen", "Controleren", "Herstellen", "Opslaan", "Herinzetten"];
  const at = (i: number, k = 1) => { const a = -Math.PI / 2 + (i / 6) * Math.PI * 2; return { x: cx + Math.cos(a) * r * k, y: cy + Math.sin(a) * r * k }; };
  const roomy = w >= 440;
  const ringDetails = names.map((n, i) => {
    const p = at(i), l = at(i, i % 3 === 0 ? 1.3 : 1.14), side = Math.abs(l.x - cx) < 4 ? "middle" : l.x > cx ? "start" : "end";
    return (
      <g key={n} className="callout">
        <circle cx={p.x} cy={p.y} r={12} />
        <text x={p.x} y={p.y + 4} textAnchor="middle">{i + 1}</text>
        {roomy && <text x={l.x} y={l.y + 4} textAnchor={side} className="callout__label">{n}</text>}
      </g>
    );
  });

  // 3 · alle partijen verbonden: vijf rollen rond een middelpunt, het middelpunt is TCLP
  const pr = s * 0.36;
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 5) * Math.PI * 2;
    return { x: cx + Math.cos(a) * pr, y: cy + Math.sin(a) * pr };
  });
  const net = resample([...pts, pts[0]], 128);
  const roles = ["klant", "installateur", "fabrikant", "logistiek", "volgend project"];
  const netDetails = [
    ...pts.map((p, i) => {
      const k = 12 / pr; // de spaken beginnen buiten het middelpunt
      return <path key={`s${i}`} d={`M${cx + (p.x - cx) * k} ${cy + (p.y - cy) * k} L${p.x} ${p.y}`} pathLength={1} className="c-anim" />;
    }),
    ...pts.map((p, i) => {
      const l = { x: cx + (p.x - cx) * 1.3, y: cy + (p.y - cy) * 1.3 }, side = Math.abs(l.x - cx) < 4 ? "middle" : l.x > cx ? "start" : "end";
      return (
        <g key={`p${i}`} className="callout">
          <circle cx={p.x} cy={p.y} r={7} />
          {roomy && <text x={l.x} y={l.y + 4} textAnchor={side} className="callout__label">{roles[i]}</text>}
        </g>
      );
    }),
    <path key="tclp" d={`M${cx - 9} ${cy} a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0`} pathLength={1} className="c-anim c-idea" />,
  ];
  return {
    stages: [
      { outline: shade, closed: true, caption: "een armatuur", details: lampDetails },
      { outline: ring, closed: true, caption: "zes stappen in een kring", details: ringDetails },
      { outline: net, closed: true, caption: "alle partijen verbonden", details: netDetails },
    ],
  };
};

/** Afgeronde rechthoek als puntenreeks (voor vormen die moeten kunnen morphen). */
function rrPts(x: number, y: number, w: number, h: number, r: number) {
  const pts: { x: number; y: number }[] = [];
  const corner = (ccx: number, ccy: number, a0: number) => {
    for (let i = 0; i <= 8; i++) { const a = a0 + (i / 8) * (Math.PI / 2); pts.push({ x: ccx + Math.cos(a) * r, y: ccy + Math.sin(a) * r }); }
  };
  corner(x + r, y + r, Math.PI); corner(x + w - r, y + r, -Math.PI / 2); corner(x + w - r, y + h - r, 0); corner(x + r, y + h - r, Math.PI / 2);
  pts.push({ ...pts[0] });
  return pts;
}

export const BUILDS = { deegh: deeghBuild, koffer: kofferBuild, spel: spelBuild, lyev: lyevBuild, tclp: tclpBuild };
