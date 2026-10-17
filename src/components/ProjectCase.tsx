import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/Header";

// Projectpagina met echte schermafbeeldingen (B-085). Zelfde opbouw als /projecten/deegh/: idee, Denckh, vorm.
export type Shot = { src: string; alt: string; width: number; height: number };
export type ProjectCaseProps = {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  facts: { idee: string; denckh: string; vorm: string };
  shots: Shot[];
  link: { label: string; href: string };
  source: string;
};

export function ProjectCase({ eyebrow, title, lead, facts, shots, link, source }: ProjectCaseProps) {
  return (
    <main id="inhoud">
      <div className="section-shell case-page">
        <Header compact />
        <Link className="back-link" href="/#projecten">← Alle projecten</Link>
        <header className="case-page__header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
          <p className="case__links"><a className="link-draw" href={link.href} rel="noopener">{link.label} →</a></p>
        </header>
        <div className="case-page__shots">
          {shots.map((s) => (
            <Image key={s.src} src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 760px) 90vw, 360px" />
          ))}
        </div>
        <div className="case-page__facts">
          <section><h2>Idee</h2><p>{facts.idee}</p></section>
          <section><h2>Denckh</h2><p>{facts.denckh}</p></section>
          <section><h2>Vorm</h2><p>{facts.vorm}</p></section>
        </div>
        <aside className="case-page__source"><strong>Wat hier staat</strong><p>{source}</p></aside>
        <div className="case-page__next"><p>Heb je zelf iets dat vorm mag krijgen?</p><Link className="button button--dark" href="/#contact">Vertel het me</Link></div>
        <Footer />
      </div>
    </main>
  );
}
