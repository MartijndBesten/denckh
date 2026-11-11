# Zet de vaste teksten in het Deegh-eindbeeld om in contouren (B-092), zodat ze er hetzelfde uitzien maar geen
# paginatekst van denckh.nl zijn. Zelfde letter als op de site: public/fonts/manrope-denckh.woff2 (variabel), met
# kerning en ss01 zoals in globals.css. Schrijft src/components/grammar/deeghShotGlyphs.ts.
#
# Eenmalig, alleen bij een andere tekst of letter opnieuw draaien (geen runtime-afhankelijkheid):
#   python3 -m venv .venv-tekst && .venv-tekst/bin/pip install fonttools brotli uharfbuzz
#   .venv-tekst/bin/python scripts/tekst-als-pad.py
import io
import json
from pathlib import Path

import uharfbuzz as hb
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "public/fonts/manrope-denckh.woff2"
OUT = ROOT / "src/components/grammar/deeghShotGlyphs.ts"

# naam (sleutel in de code) → gewicht; de naam is ook de tekst
TEKSTEN = {
    "deegh": 700, "Webshop": 400, "Zo werkt Deegh": 400, "Verkooppunten": 400, "Zakelijk": 400, "Ons deeg": 700,
    "Deegh Gezin": 700, "Deegh Voorraad": 700, "Deegh Pizza-avond": 700,
    "6 pizzabollen": 400, "12 pizzabollen": 400, "24 pizzabollen": 400,
}

tt = TTFont(FONT)
tt.flavor = None
buf = io.BytesIO()
tt.save(buf)
face = hb.Face(buf.getvalue())


def n(v):
    return str(round(v))


glyphs, teksten = {}, {}
for tekst, wght in TEKSTEN.items():
    font = hb.Font(face)
    font.set_variations({"wght": wght})
    b = hb.Buffer()
    b.add_str(tekst)
    b.guess_segment_properties()
    hb.shape(font, b, {"kern": True, "ss01": True})
    x, seq = 0, []
    for info, pos in zip(b.glyph_infos, b.glyph_positions):
        key = f"{wght}-{info.codepoint}"
        if key not in glyphs:
            cmds = []
            d = hb.DrawFuncs()
            # y omlaag (SVG), oorsprong op de basislijn
            d.set_move_to_func(lambda X, Y, c: c.append(f"M{n(X)} {n(-Y)}"))
            d.set_line_to_func(lambda X, Y, c: c.append(f"L{n(X)} {n(-Y)}"))
            d.set_quadratic_to_func(lambda a, q, X, Y, c: c.append(f"Q{n(a)} {n(-q)} {n(X)} {n(-Y)}"))
            d.set_cubic_to_func(lambda a, q, r, s, X, Y, c: c.append(f"C{n(a)} {n(-q)} {n(r)} {n(-s)} {n(X)} {n(-Y)}"))
            d.set_close_path_func(lambda c: c.append("Z"))
            font.draw_glyph(info.codepoint, d, cmds)
            glyphs[key] = "".join(cmds)
        if glyphs[key]:  # spatie: geen contour
            seq.append([key, x + pos.x_offset])
        x += pos.x_advance
    teksten[tekst] = seq

OUT.write_text(
    "// Gegenereerd door scripts/tekst-als-pad.py (B-092); niet met de hand aanpassen.\n"
    "// Contouren van Manrope Denckh in font-eenheden (y omlaag, oorsprong op de basislijn).\n"
    f"export const UPM = {face.upem};\n"
    f"export const GLYPHS: Record<string, string> = {json.dumps(glyphs, separators=(',', ':'))};\n"
    f"export const TEKSTEN: Record<string, [string, number][]> = {json.dumps(teksten, ensure_ascii=False, separators=(',', ':'))};\n",
    encoding="utf-8",
)
print(f"{OUT.relative_to(ROOT)}: {len(glyphs)} glyphs, {len(teksten)} teksten")
