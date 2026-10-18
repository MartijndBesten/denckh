import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";

const description = "OKKIE. is een gratis darttrainer als webapp: scoretraining, 301 en 501, statistieken en badges. Zonder account, ook offline. Ontwikkeld door Denckh.";

export const metadata: Metadata = {
  title: "OKKIE. darttrainer (app)",
  description,
  alternates: { canonical: "/projecten/okkie/" },
};

export default function OkkieCase() {
  return (
    <ProjectCase
      eyebrow="eigen project · app"
      title={<>Een darttrainer die<br /><em>elke pijl telt.</em></>}
      lead="Een handige dartsapp waarmee je je scores bijhoudt, wedstrijden speelt en ziet of je vooruitgaat. Op elke telefoon, ook offline."
      link={{ label: "Bekijk OKKIE.", href: "https://okkiedarts.nl" }}
      shots={[
        { src: "/images/projecten/okkie-training.webp", alt: "Invoerscherm van OKKIE. met gemiddelde, beurttotaal en knoppen voor double, triple en de getallen.", width: 540, height: 1015 },
        { src: "/images/projecten/okkie-statistieken.webp", alt: "Statistiekenscherm van OKKIE. met gemiddelde, beste training en het blok Word ik beter?", width: 540, height: 1015 },
      ]}
      facts={{
        idee: "Thuis darten is leuk, maar word je ook beter? Een trainer die elke pijl bijhoudt en die vraag beantwoordt.",
        denckh: "Concept, ontwerp en ontwikkeling: een installeerbare webapp die op elke telefoon werkt, ook offline. Geen account, geen reclame; je gegevens blijven op je eigen toestel.",
        vorm: "Scoretraining, rond de klok, 301 en 501 met uitgooi-advies, statistieken met trendlijn, een trefferkaart en badges.",
      }}
      source="Schermen uit de app, met een fictieve speler."
    />
  );
}
