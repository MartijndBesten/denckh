import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";

const description = "Kerckh. brengt commissies, vrijwilligers, roosters, activiteiten en zaalverhuur van een kerk samen op één plek. Een eigen product van Denckh.";

export const metadata: Metadata = {
  title: "Kerckh. organisatie en zaalverhuur voor kerken",
  description,
  alternates: { canonical: "/projecten/kerckh/" },
};

export default function KerckhCase() {
  return (
    <ProjectCase
      eyebrow="eigen product · platform"
      title={<>De mensen veranderen.<br /><em>De organisatie blijft.</em></>}
      lead="In een kerk gebeurt veel door vrijwilligers, maar de kennis zit vaak bij een paar mensen en in losse lijstjes. Kerckh. zet het op één plek."
      link={{ label: "Bekijk Kerckh.", href: "https://kerckh.nl" }}
      shots={[
        { src: "/images/projecten/kerckh-aanvraag-demo.webp", alt: "Mobiel aanvraagformulier voor zaalgebruik in de demo-omgeving van Kerckh., met fictieve gegevens.", width: 540, height: 1003 },
        { src: "/images/projecten/kerckh-modules.webp", alt: "Moduletegels van Kerckh.: organisatie, vrijwilligers, catechisatie, clubs, activiteiten, roosters, documenten en zaalverhuur.", width: 540, height: 600 },
      ]}
      facts={{
        idee: "Taken, roosters en zaalverhuur blijven doorlopen, ook als vrijwilligers wisselen. Iedereen ziet alleen wat bij de eigen taak hoort.",
        denckh: "Eigen product: ontwerp, ontwikkeling en beheer. Elke kerk krijgt een eigen omgeving; begonnen met één module die echt werkt, zaalverhuur.",
        vorm: "Modules voor organisatie, vrijwilligers, roosters, catechisatie, activiteiten en zaalverhuur met agendakoppeling en bevestigingsmails.",
      }}
      source="Gebaseerd op kerckh.nl en de broncode. De schermen komen uit de demo-omgeving met fictieve gegevens."
    />
  );
}
