// Preekhulp. (eigen product van Denckh): gegevens voor de productpagina op één plek.
import type { Shot } from "@/lib/ouderhulp";

export const PREEKHULP_CONTACT = "info@denckh.nl";

export const preekhulpMailto = (subject: string, body: string) =>
  `mailto:${PREEKHULP_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const PROEF_MAIL = preekhulpMailto(
  "Preekhulp. proefronde",
  "Hallo,\n\nIk wil graag meedoen aan de proefronde van Preekhulp.\n\nIk ben (rol, kerk/gemeente):\nWaar ik nu mee werk (commentaren, Logos, AI):\nWat ik vooral wil onderzoeken:\n\nMet vriendelijke groet,\n",
);

// Echte schermen uit Preekhulp. 0.1 (lokale installatie, 1 november 2026), referentiecasus Genesis 31:13.
// Onderzoek zonder AI-aanbieder: tekstdata, berekende verbanden en historische commentaren.
export const SHOTS = {
  start: { src: "/images/preekhulp/start-telefoon.webp", width: 585, height: 1266, role: "Start", task: "Eén vraag, en kiezen hoe diep",
    alt: "Telefoonscherm Wat wil je onderzoeken? met de vraag over Genesis 31:13 en een doopdienst over Terug naar de belofte, en de keuzes Verkennen, Verdiepen en Kritisch onderzoeken." },
  tekst: { src: "/images/preekhulp/tekst-grondtaal.webp", width: 1440, height: 1012, role: "Tekst en grondtaal", task: "Genesis 31:13 woord voor woord",
    alt: "Genesis 31:13 in de Statenvertaling en de Berean Standard Bible, met daaronder de Hebreeuwse woorden en hun betekenis. Het woord matsevah (zuil) is geopend met lemma, morfologie en lexicon." },
  lijnen: { src: "/images/preekhulp/dossier-onderzoekslijnen.webp", width: 1440, height: 1012, role: "Onderzoeksdossier", task: "Nieuwe onderzoekslijnen met het bewijs erbij",
    alt: "Onderdeel Nieuwe of onverwachte onderzoekslijnen: tekstverbanden tussen Genesis 31:13 en Genesis 28:18–22, Genesis 35:1–3, Jesaja 19 en Numeri 30, elk met bewijsniveau en een geopend bewijsstuk met de gedeelde Hebreeuwse woorden." },
  commentaren: { src: "/images/preekhulp/historische-commentaren.webp", width: 1440, height: 1012, role: "Historische uitleg", task: "Kanttekeningen en Calvijn bij hetzelfde vers",
    alt: "Historische commentaren bij Genesis 31:13: de Kanttekeningen bij de Statenvertaling en Calvijns uitleg, met de rechtenstatus publiek domein." },
} satisfies Record<string, Shot>;
