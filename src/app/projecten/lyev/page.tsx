import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";

const description = "Voor LYEV. bouwde Denckh. een webshop waarin Lynn en Evy hun eigen accessoires presenteren en verkopen, met eenvoudig beheer op de telefoon.";

export const metadata: Metadata = {
  title: "LYEV. webshop vol sparkle",
  description,
  alternates: { canonical: "/projecten/lyev/" },
};

// Projectpagina LYEV. (B-088). Teksten gecontroleerd tegen de actuele site en broncode (docs/cases/lyev.md).
export default function LyevCase() {
  return (
    <ProjectCase
      eyebrow="eigen project · webshop"
      title={<>LYEV.<br /><em>Een webshop vol sparkle.</em></>}
      lead="Voor LYEV. bouwde Denckh. een webshop waarin Lynn en Evy hun eigen accessoires kunnen presenteren en verkopen. Van een herkenbare huisstijl tot een eenvoudig beheer op hun telefoon: producten toevoegen, foto's aanpassen en klanten hun favoriete kleuren of een naam laten kiezen."
      link={{ label: "Bekijk lyev.nl", href: "https://lyev.nl" }}
      shots={[
        { src: "/images/projecten/lyev-home.webp", alt: "Homepage van lyev.nl op een telefoon: donkerpaarse kopbalk met het logo, de kop Kies jouw favoriet en drie productfoto's als kaartjes.", width: 540, height: 1169 },
        { src: "/images/projecten/lyev-persoonlijk.webp", alt: "Pagina Maak het persoonlijk: in drie stappen van aanvraag via voorstel naar akkoord, met velden voor kleuren en een naam.", width: 540, height: 1292 },
        { src: "/images/projecten/lyev-beheer-keuzes.webp", alt: "Beheer op de telefoon: kleuren aantikken die de klant mag kiezen, naam of letters toestaan en een meerprijs invullen.", width: 540, height: 1169 },
      ]}
      parts={[
        { title: "De vraag", text: "Een eigen plek waar Lynn en Evy hun zelfgemaakte en versierde accessoires kunnen laten zien en verkopen." },
        { title: "De oplossing", text: "Een vrolijke, herkenbare webshop waarin de producten centraal staan en klanten waar mogelijk zelf kleuren of een naam kiezen." },
        { title: "Achter de schermen", text: "Een eenvoudig beheer op de telefoon: de makers zetten zelf nieuwe producten online, passen prijzen, foto's en keuzes in kleur en naam aan en handelen bestellingen en aanvragen af." },
        { title: "Het resultaat", text: "Een zelfstandige, mobielvriendelijke webshop met een eigen uitstraling, waar klanten direct kunnen bestellen." },
      ]}
      made={[
        "Merkuitstraling en websiteontwerp, met een eigen logo en huisstijl",
        "Een webshop die op de telefoon net zo goed werkt als op de computer",
        "Producten met persoonlijke keuzes: een kleur, een naam of letters, met meerprijs",
        "Productbeheer in twee stappen: wat heb je gemaakt, en een foto erbij",
        "Hoofdfoto's op de homepage die de makers zelf kiezen, ordenen en eerst als voorbeeld bekijken",
        "Een eigen bestel- en aanvraagproces, met voor maatwerk eerst een voorstel",
        "Favorieten en delen, met korting voor wie een product deelt",
        "Animaties en een speelse productpresentatie",
        "Technische realisatie, hosting en beveiliging",
      ]}
      source="Schermen van lyev.nl. Het beheerscherm komt uit de demo-omgeving, met fictieve gegevens."
    />
  );
}
