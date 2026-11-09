<!-- BEGIN AUTONOMIE 2026-11-09 -->
## Werkafspraak: zelfstandig afronden (besluit Martijn, 9 november 2026)

Deze actuele afspraak geldt voor ChatGPT, Codex, Claude Code en andere ontwikkelagents. Zij vervangt oudere algemene goedkeurings-, publicatie- en testverplichtingen in deze repository voor software- en websitewerk. Bewaar inhoudelijke productbesluiten, gegevensbeleid en technische feiten.

- **Rolverdeling:** Martijn bepaalt doel, gewenste functies, vormgeving en belangrijke productkeuzes. De AI draagt de technische uitvoering, kiest de eenvoudigste passende oplossing en rondt de afgesproken route zelfstandig af. Vraag geen akkoord voor gewone technische keuzes.
- **Mandaat:** onderzoek, code en documentatie wijzigen, dependencies onderhouden, fouten oplossen, gericht testen, committen, pushen, PR's maken en technisch beoordelen, mergen, bouwen, uitrollen en herstellen zijn vooraf toegestaan binnen de afgesproken productrichting. Een aparte toestemming per stap of publicatie is niet nodig. Gebruik bestaande accounts en uitrolroutes. Een expliciet aangehouden ontwerp of release blijft aangehouden; kies geen nieuwe vormgeving namens Martijn.
- **Kosten:** geen aankopen, abonnementen, betaalde API-aanroepen, betaalde runners, extra resources of verhoging van verbruikslimieten zonder voorafgaand kostenakkoord. Gebruik beschikbare gratis of reeds inbegrepen voorzieningen binnen de bestaande limieten; een bestaande sleutel is geen kostentoestemming.
- **Eerst GitHub lezen:** haal bij de start en vóór integratie/publicatie de actuele branch, relevante issues/PR's, besluiten en HANDOFF/status op. Werk vanuit de werkelijk laatste afspraken. Los technische vragen zelf uit bronnen op; leg de volgende concrete stap vast en ga door zolang de opdracht werk bevat. Oude wacht-op-akkoordregels zijn geen nieuwe blokkade.
- **Proportioneel controleren:** kies controles op basis van wat wijzigt. Tekst/documentatie: inhoud en verwijzingen; opmaak: betrokken scherm op relevante formaten; functionaliteit: gewijzigde gebruikersroute plus relevante regressies; rechten, betalingen of data: passende integratie- en beveiligingscontroles. Geen volledige testmatrix, nieuwe testtool, aparte proefperiode of extra reviewronde voor iedere kleine wijziging. Herhaal geslaagde controles alleen bij nieuwe wijzigingen, fouten of concrete twijfel. Behoud zinvolle bestaande CI en verplichte platformcontroles.
- **AI test zelf:** schuif reguliere klikroutes en acceptatietests niet naar Martijn. Herstel gevonden fouten en controleer gericht opnieuw. Voeg alleen duurzame tests toe die een belangrijk risico afdekken. Na uitrol kort veilig controleren en bij een defect herstellen of terugrollen. Meld beperkingen eerlijk; maak een optionele onuitvoerbare controle geen blokkade voor onafhankelijk werk.
- **Alleen echt escaleren:** kosten, een ontbrekende doorslaggevende product-/ontwerpkeuze, onvermijdelijke persoonlijke login/MFA of een handeling met onomkeerbaar dataverlies. Vraag uitsluitend het ontbrekende en werk aan de rest door. Beschikbare toegang eerst zelf onderzoeken.
- **Blijvende grenzen:** geen secrets publiceren, vertrouwelijke gegevens openbaar maken, echte berichten/bestellingen/reserveringen als test versturen, beveiligingscontroles omzeilen of ongerelateerd werk overschrijven. Softwaremandaat is geen toestemming om fysieke gebouwinstallaties, noodverlichting of klantapparatuur zonder passende projectopdracht te bedienen. Behoud echte data en bronbestanden; gebruik fictieve testdata.
- **Terugkoppeling:** kort: wat is afgerond/live, wat is relevant gecontroleerd en alleen de echte blokkade of keuze. Technische details en bewijs in GitHub. Geen standaardvraag “zal ik verdergaan?” en geen testhuiswerk voor Martijn.

Dit document geeft uitvoeringsmandaat; het schakelt geen platformpermissies uit en start op zichzelf geen permanent draaiende agent.
<!-- END AUTONOMIE 2026-11-09 -->

# CLAUDE.md

Werkinstructies voor Claude (en andere AI-assistenten) in deze repository. Lees ook [`HANDOFF.md`](HANDOFF.md)
voordat je iets wijzigt: daar staat de actuele stand.

## Het project

- **Denckh** is een kleine, onafhankelijke digitale werkplaats (B-099): meedenken eerst, maken waar het helpt.
- **Tagline:** `van idee naar vorm` (altijd zo geschreven: kleine letters, geen punt).
- Denckh denkt mee over een idee, probleem of vraag en werkt het uit tot **iets bruikbaars**; soms is het advies
  om iets bestaands te gebruiken. Eerste gesprek gratis. Mensen zelfstandig verder helpen, niet afhankelijk maken.
- Denckh is **nadrukkelijk breder dan webdesign** en geen traditioneel bureau. Positioneer het nooit als
  "webdesignbureau" of als verkoper van zoveel mogelijk opdrachten.
- Deze repo bevat de nieuwe website voor Denckh. Het beoogde domein is `denckh.nl`.

## Harde regels

1. **Niets verzinnen.** Geen verzonnen claims, cases, klanten, opdrachtgevers, testimonials, quotes, cijfers,
   resultaten, awards, teamleden of klantlogo's. Ook geen onverifieerbare superlatieven.
   Ontbreekt informatie? Gebruik een duidelijk gemarkeerde placeholder (`[TODO: …]`) en meld het. Schrijf nooit
   geloofwaardig ogende nep-inhoud, ook niet tijdelijk.
2. **Cases alleen na verificatie.** Beschrijf een project pas als case nadat je de werkelijke inhoud hebt bekeken
   (live site en/of repository). Leg bron, datum en bevindingen vast in [`docs/cases/`](docs/cases/README.md).
   Wat je niet hebt gecontroleerd, benoem je als onzeker.
3. **Merken en rechten van derden.** Gebruik geen logo's, screenshots of namen van derden (bijv. werkgevers,
   leveranciers, opdrachtgevers) zonder vastgelegde toestemming. Suggereer geen opdrachtgeverschap dat niet klopt.
4. **Beslissingen vastleggen.** Elke belangrijke technische of creatieve beslissing komt in het beslissingenlog in
   `HANDOFF.md`: datum, besluit, reden, gevolg. Werk ook *Huidige stand* en *Open punten* bij aan het eind van een
   werksessie.
5. **Buiten scope tot expliciet akkoord van de eigenaar:**
   - hosting inrichten of wijzigen (waaronder Cloud86);
   - DNS aanpassen;
   - `denckh.nl` live zetten of een productie-deploy doen;
   - GitHub Pages-instellingen of een andere publieke publicatie wijzigen;
   - secrets, API-keys of betaalde diensten toevoegen.
6. **Publieke repo.** Zolang deze repository publiek is, komt er geen vertrouwelijke informatie in (interne
   werkgeversinformatie, details uit privé-repositories, klantgegevens, contactgegevens van derden).

## Werkwijze

- **Taal:** websiteteksten en documentatie in het Nederlands. Code, bestandsnamen en identifiers mogen Engels zijn.
- **Toon (werkversie, nog vast te stellen in de creative direction):** direct, concreet, menselijk. Geen wollige
  marketingtaal.
- **Git:** `main` is de hoofdbranch. Kleine, beschrijvende commits. Grotere wijzigingen via een aparte branch en
  een pull request. Nooit force-pushen naar `main`.
- **Productie:** elke push naar `main` gaat live via GitHub Pages. Werk op een branch; merge naar `main` alleen na
  akkoord van de eigenaar.
- **Techniek:** Next.js 16 + TypeScript, statische export, geen animatiebibliotheek (canvas/SVG/CSS). Zie
  `docs/architectuur.md`. Voeg geen dependencies toe zonder reden in `HANDOFF.md`.
- **Ontwerp:** volg `docs/creative-direction.md`. Eén grammatica: iets vaags krijgt steeds meer vorm, gemaakt van de
  lijn van de bezoeker. Geen losse effecten daarbuiten. Kleuren hebben een rol (oker = idee, menie = Denckh kijkt,
  inkt = vorm).
- **AI:** geen echte AI, API-sleutels of betaalde diensten zonder besluit van de eigenaar (`docs/ai-onderzoek.md`).
  Nooit een sleutel client-side.
- **Testen:** `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`.
- **Twijfel:** stel een korte, gerichte vraag aan de eigenaar in plaats van een harde aanname te maken.

## Naam en schrijfwijze

- De naam is **Denckh**. In het bestaande beeldmerk staat een punt achter de naam ("Denckh.") in een accentkleur.
- De GitHub-repository heet `MartijndBesten/denckh`.
- In lopende tekst: Denckh (zonder punt). Woordmerk: zie `docs/typografie-proef.md` (werkhypothese `denckh.` met ck-ligatuur).
