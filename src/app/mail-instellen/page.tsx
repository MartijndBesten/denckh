// Interne hulppagina voor de eigenaar: mailaccounts op de iPhone zetten met een configuratieprofiel.
// Niet gelinkt, niet in de sitemap, noindex. De profielen staan in public/mail-instellen/ en bevatten geen wachtwoord.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Mail instellen op iPhone" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/mail-instellen/" },
};

const accounts = [
  { name: "Denckh.", address: "info@denckh.nl", file: "denckh-info.mobileconfig" },
  { name: "Kerckh.", address: "kerckh@denckh.nl", file: "denckh-kerckh.mobileconfig" },
  { name: "lichtsturing.info", address: "info@lichtsturing.info", file: "lichtsturing-info.mobileconfig" },
];

export default function MailInstellenPage() {
  return (
    <main id="inhoud" className="section-shell mail-setup">
      <h1>Mail instellen op iPhone</h1>
      <ul className="mail-setup__list">
        {accounts.map((a) => (
          <li key={a.file} className="mail-setup__account">
            <h2>{a.name}</h2>
            <p>{a.address}</p>
            <a className="button" href={`/mail-instellen/${a.file}`}>Installeer op iPhone</a>
          </li>
        ))}
      </ul>
      <ol className="mail-setup__steps">
        <li>Tik op &lsquo;Installeer op iPhone&rsquo;</li>
        <li>Sta het downloaden van het configuratieprofiel toe</li>
        <li>Open Instellingen op de iPhone</li>
        <li>Kies &lsquo;Profiel gedownload&rsquo;</li>
        <li>Installeer het profiel</li>
        <li>Voer het mailboxwachtwoord in wanneer iOS daarom vraagt</li>
      </ol>
      <p className="mail-setup__note">
        Open deze pagina in Safari. iOS meldt &lsquo;Niet geverifieerd&rsquo; omdat het profiel niet ondertekend is; dat is normaal.
        Komt het bestand alleen bij je downloads terecht? Open het dan via Bestanden &rarr; Downloads.
      </p>
    </main>
  );
}
