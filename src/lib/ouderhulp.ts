// Ouderhulp. (eigen product van Denckh): gegevens voor de productpagina op één plek.

/** Contactadres voor scholen. Bedoeld is school@denckh.nl, maar dat adres (alias van info@denckh.nl) is nog niet
 *  ingericht en getest (zie HANDOFF, B-096). Tot die tijd het werkende hoofdadres; daarna alleen deze regel wijzigen. */
export const OUDERHULP_CONTACT = "info@denckh.nl";

export const ouderhulpMailto = (subject: string, body: string) =>
  `mailto:${OUDERHULP_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const GESPREK_MAIL = ouderhulpMailto(
  "Ouderhulp. voor onze school",
  "Hallo,\n\nWij willen Ouderhulp. graag bespreken voor onze school.\n\nSchool en plaats:\nIk ben (rol):\nWat wij nu gebruiken voor ouderhulp:\n\nMet vriendelijke groet,\n",
);

export type Shot = { src: string; alt: string; width: number; height: number; role: string; task: string };

export const SHOTS = {
  ouderActiviteit: { src: "/images/ouderhulp/ouder-activiteit.webp", width: 585, height: 1266, role: "Ouder", task: "Beschikbaarheid opgeven, één activiteit per scherm",
    alt: "Telefoonscherm van een ouder bij de activiteit Excursie kinderboerderij: één dienst van 9:00 tot 12:00 met de keuzes Ik kan en Ik kan niet, en daaronder Alleen een deel van de tijd. Ik kan is gekozen." },
  ouderOverzicht: { src: "/images/ouderhulp/ouder-overzicht.webp", width: 585, height: 1266, role: "Ouder", task: "Overzicht vóór het indienen",
    alt: "Telefoonscherm Uw opgave: per activiteit wat de ouder heeft ingevuld, wat nog open staat, en de knoppen Verder invullen en Beschikbaarheid indienen." },
  ouderOntvangen: { src: "/images/ouderhulp/ouder-ontvangen.webp", width: 585, height: 1266, role: "Ouder", task: "Na het indienen",
    alt: "Telefoonscherm van een gezin met twee kinderen: bij de lijst Voorjaar groep 3 staat Ingediend en Uw beschikbaarheid is ontvangen. U hoeft nu niets te doen." },
  leerkrachtHulpvraag: { src: "/images/ouderhulp/leerkracht-hulpvraag.webp", width: 585, height: 1285, role: "Leerkracht", task: "Nieuwe hulpvraag",
    alt: "Formulier Nieuwe hulpvraag: soort activiteit Excursie, klas Groep 3, titel Excursie kinderboerderij, punten centraal ingesteld en datum en tijd." },
  leerkrachtKlas: { src: "/images/ouderhulp/leerkracht-mijn-klas.webp", width: 585, height: 1266, role: "Leerkracht", task: "Mijn klas met de status van elke hulpvraag",
    alt: "Telefoonscherm Mijn klas van een leerkracht met de knop Nieuwe hulpvraag en hulpvragen met statussen als Aangevraagd en Open voor reacties." },
  beheerDashboard: { src: "/images/ouderhulp/beheer-dashboard.webp", width: 1440, height: 1012, role: "Schoolbeheerder", task: "Werkoverzicht met nieuwe hulpvragen",
    alt: "Werkoverzicht van de schoolbeheerder: Nu te doen, 3 nieuwe hulpvragen van leerkrachten, met de knoppen Hulpvragen bekijken en Nieuwe ouderhulplijst, en daaronder de binnengekomen hulpvragen." },
  beheerLijst: { src: "/images/ouderhulp/beheer-lijst-kiezen.webp", width: 1440, height: 1012, role: "Schoolbeheerder", task: "Ouderhulplijst samenstellen, stap 2 van 5",
    alt: "Stappenplan voor de ouderhulplijst Voorjaar groep 3: stap Hulpvragen kiezen met aangevinkte activiteiten en filters op klas en soort." },
  beheerReacties: { src: "/images/ouderhulp/beheer-reacties.webp", width: 1440, height: 1012, role: "Schoolbeheerder", task: "Reacties en bezetting per dienst",
    alt: "Tabel Reacties en bezetting: per dienst hoeveel ouders nodig zijn, hoeveel gezinnen reageerden en hoeveel plekken nog gevuld moeten worden, met een knop om te exporteren naar Excel." },
} satisfies Record<string, Shot>;
