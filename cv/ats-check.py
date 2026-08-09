#!/usr/bin/env python3
"""
Checks the built CV against the things that actually break applicant tracking
systems, rather than against a style guide.

Run from the repo root after `cv/build.sh`:

    python3 cv/ats-check.py

Every check here corresponds to a real parser failure mode. The important one is
the first: if `pdftotext` returns the document in reading order, so will Sovren,
Textkernel, Affinda and the parsers Workday, Greenhouse and Lever sit on top of.
A CV that fails that check is usually two-column, or an image of a document.
"""

import re
import subprocess
import sys

PDF = "public/mansha-qarib-senior-react-developer.pdf"

raw = subprocess.run(["pdftotext", PDF, "-"], capture_output=True, text=True).stdout
info = subprocess.run(["pdfinfo", PDF], capture_output=True, text=True).stdout
fonts = subprocess.run(["pdffonts", PDF], capture_output=True, text=True).stdout
imgs = subprocess.run(["pdfimages", "-list", PDF], capture_output=True, text=True).stdout

checks: list[tuple[bool, str, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    checks.append((bool(ok), name, detail))


# The document is text, not a picture of text.
check("Extractable text layer", len(raw.split()) > 400, f"{len(raw.split())} words")

# Photos and logos are skipped at best and derail the parse at worst.
image_rows = [line for line in imgs.splitlines() if re.match(r"\s*\d", line)]
check("No embedded images", not image_rows, f"{len(image_rows)} found")

# Embedded (`emb`) so glyphs are present, Unicode-mapped (`uni`) so they map back
# to characters. A subset font without a ToUnicode map extracts as mojibake.
font_rows = [line for line in fonts.splitlines()[2:] if line.strip()]
# Columns are name, type (one or two words), encoding, emb, sub, uni, object, ID
# — so index from the right, where the layout is fixed.
font_ok = bool(font_rows) and all(
    parts[-5] == "yes" and parts[-3] == "yes"
    for parts in (line.split() for line in font_rows)
)
check("Fonts embedded and Unicode-mapped", font_ok,
      ", ".join(line.split()[0].split("+")[-1] for line in font_rows))

# The strings parsers segment the document on.
required = [
    "PROFESSIONAL SUMMARY",
    "TECHNICAL SKILLS",
    "PROFESSIONAL EXPERIENCE",
    "EDUCATION",
    "CERTIFICATIONS",
]
missing = [h for h in required if h not in raw.upper()]
check("Standard section headings", not missing, f"missing {missing}" if missing else "5/5")

email = re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", raw)
phone = re.search(r"\+\d[\d\s]{7,}", raw)
check("Email parseable", bool(email), email.group(0) if email else "")
check("Phone parseable", bool(phone), phone.group(0).strip() if phone else "")
check("LinkedIn present", "linkedin.com/in/" in raw)
check("Location present", "Riyadh" in raw)

dates = re.findall(r"(?:\w{3} )?\d{4} - (?:Present|(?:\w{3} )?\d{4})", raw)
check("Date ranges parseable", len(dates) >= 5, f"{len(dates)}: {dates}")

# The two-column failure mode: if positioning reordered the text stream, these
# would not come out newest-first.
order = [raw.index(x) for x in ["Independent", "Carbonic IT Solutions", "VisionX", "Dixeam Inc"]]
check("Roles in reverse-chronological order", order == sorted(order))

# Ligatures, en dashes and symbols that some extractors turn into replacement
# characters mid-word. The bullet glyph is fine; it sits between tokens.
bad = sorted({c for c in raw if ord(c) > 0x2000 and c != "•"})
check("No extraction-hostile characters", not bad,
      " ".join(f"U+{ord(c):04X}" for c in bad) if bad else "ASCII + bullets")

# The CV and the portfolio name the same platforms.
platforms = [
    "Lappeland", "LiftFoils", "Bang & Olufsen", "NerdWallet", "Deliveroo", "Neonbit",
    "Salearis", "JACOBS", "Global Shopaholic", "Halcyon", "Ayshei", "Morta",
    "SnapDebt", "Moonrock",
]
gone = [p for p in platforms if p not in raw]
check("All 14 portfolio platforms present", not gone, f"missing {gone}" if gone else "14/14")

# Facts the portfolio corrected must not survive here.
stale = [t for t in ["outdoor-gear", "security dashboard", "mansha.qarib777", "Emakity"] if t in raw]
check("No superseded content", not stale, f"still present: {stale}" if stale else "")

pages = int(re.search(r"Pages:\s+(\d+)", info).group(1))
check("Two pages", pages == 2, f"{pages}")

width = max(len(name) for _, name, _ in checks)
for ok, name, detail in checks:
    print(f"{'PASS' if ok else 'FAIL'}  {name.ljust(width)}  {detail}")

passed = sum(1 for ok, _, _ in checks if ok)
print(f"\n{passed}/{len(checks)} checks passed")
sys.exit(0 if passed == len(checks) else 1)
