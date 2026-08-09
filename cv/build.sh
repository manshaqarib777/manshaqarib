#!/usr/bin/env bash
#
# Prints cv/resume.html to PDF and drops it where both consumers expect it.
#
# Chrome rather than a PDF library: the previous CV was printed the same way, so
# the output stays a text PDF with embedded, Unicode-mapped fonts rather than an
# image of one. `--no-pdf-header-footer` is the load-bearing flag — Chrome's
# default print header writes the page title and a `file://` URL into the top
# and bottom margins, and an ATS that reads those regions gets a local file path
# in the middle of the CV.
#
# Usage: cv/build.sh   (from the repo root)
set -euo pipefail

cd "$(dirname "$0")/.."

SRC="$PWD/cv/resume.html"
SITE_PDF="public/mansha-qarib-senior-react-developer.pdf"
DOWNLOADS="$HOME/Downloads/Mansha_Qarib_Senior_React_Developer.pdf"

CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser)"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --no-pdf-header-footer \
  --user-data-dir="$TMP/profile" \
  --print-to-pdf="$TMP/resume.pdf" \
  "file://$SRC" 2>/dev/null

cp "$TMP/resume.pdf" "$SITE_PDF"
cp "$TMP/resume.pdf" "$DOWNLOADS"

echo "Wrote:"
echo "  $SITE_PDF"
echo "  $DOWNLOADS"
pdfinfo "$SITE_PDF" | grep -E "^(Pages|File size)"
