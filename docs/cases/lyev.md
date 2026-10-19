# LYEV. — projectvermelding

- Bron: https://lyev.nl (live versie `4e106ff`) en repository `MartijndBesten/lyev` (privé), `main` @ `4e106ff`.
- Gecontroleerd: 2026-10-19/20. Broncode gelezen (o.a. `src/domain/personalisatie.ts`, `src/domain/homepage.ts`,
  `src/web/beheer/snel.tsx`, `src/web/beheer/homepage.tsx`, `public/assets/lyev.css`); `npm run check` → 75/75 tests.
- Rechten: LYEV. is een handelsnaam van Denckh. (eigen project). Naam en link op verzoek van de eigenaar (opdracht 19-10-2026).
- Status: projectkaart op de homepage (*Wat er al vorm kreeg.*) en projectpagina `/projecten/lyev/` (B-088).

## Wat aantoonbaar bestaat

| Onderdeel | Bewijs |
|---|---|
| Eigen logo en huisstijl | `public/assets/merk/`, live kopbalk |
| Mobielvriendelijke webshop | live, gecontroleerd op 390 px |
| Kleur- en naamkeuze met meerprijs per product | `personalisatie.ts`, migratie `0004`, tests `personaliseren.test.ts`; beheerscherm in de demo |
| Maatwerkaanvraag met kleuren en naam (aanvraag → voorstel → akkoord) | live `/maak-het-persoonlijk` |
| Product toevoegen in twee stappen op de telefoon, publicatie na controle | `snel.tsx`, `snel.test.ts` |
| Hoofdfoto's zelf kiezen, ordenen, voorbeeld, publiceren | `homepage.ts`, `homepage.test.ts` |
| Eigen bestelproces zonder betaalprovider | `bestellen.ts`, `bestellen.test.ts` |
| Animaties hoofdfoto's (entree, diepte, glans, reduced motion) | `lyev.css`, `lyev.js` |
| Hosting en beveiliging | Cloudflare Workers + D1, HTTPS/HSTS, sessies, CSRF, rate limiting |

## Bewust niet genoemd

- De winkel staat nog dicht voor echte bestellingen (`WINKEL_OPEN = "false"`); de teksten beloven daarom geen
  lopende verkoop. Een kleurkeuze staat nog bij geen live product aan; de pagina noemt het als functie van de webshop.
- Geen leeftijd, school, adres of accountgegevens van de makers.

## Beelden

- `lyev-home.webp` (kaart en projectpagina): homepage lyev.nl, 390 × 844 @3x, 19-10-2026.
- `lyev-persoonlijk.webp`: `/maak-het-persoonlijk`, bovenste deel.
- `lyev-beheer-keuzes.webp`: beheer *Nieuw product* in een lokale demo-omgeving met fictief account en fictieve gegevens.
- In een productfoto staat het merk van een gebruikte (versierde) parfumfles klein in beeld; het gaat om een eigen
  product van LYEV., niet om een samenwerking.
