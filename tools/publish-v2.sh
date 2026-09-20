#!/bin/sh
# ---------------------------------------------------------------------------
# E.Universe site — promote /v2/ to the site root (the "one step" to publish).
#
#   sh tools/publish-v2.sh          # promote: v2/*.html -> /, drop noindex,
#                                   #          leave redirects at /v2/*
#   sh tools/publish-v2.sh --undo   # restore the previous root index.html
#                                   #          and the /v2/ pages from git
#
# It only edits files in the working tree and stages them. Nothing is
# committed or pushed — review with `git status` / `git diff --staged`,
# then commit and push from GitHub Desktop.
# CNAME is never touched.
# ---------------------------------------------------------------------------
set -eu
cd "$(dirname "$0")/.."
PAGES="index.html story.html what-we-do.html noor.html company.html contact.html"

if [ "${1:-}" = "--undo" ]; then
  git checkout HEAD -- index.html v2/
  for p in $PAGES; do [ "$p" = index.html ] || rm -f "$p"; done
  rm -f sitemap.xml robots.txt
  git add -A
  echo "Undone: root pages removed, previous index.html and v2/ restored (staged)."
  exit 0
fi

[ -f v2/index.html ] || { echo "v2/index.html not found"; exit 1; }
[ -f CNAME ] || { echo "CNAME missing — refusing to continue"; exit 1; }

# (the provisional v1 index.html stays in git history: commit 2d0f910)

for p in $PAGES; do
  # 1. copy to root and remove the staging noindex tag
  sed '/<meta name="robots" content="noindex">/d' "v2/$p" > "$p"
  # 2. leave a redirect at the old /v2/ address so shared links keep working
  cat > "v2/$p" <<HTML
<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<title>E.Universe</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://euniverse.co.jp/$( [ "$p" = index.html ] && echo "" || echo "$p" )">
<meta http-equiv="refresh" content="0; url=/$( [ "$p" = index.html ] && echo "" || echo "$p" )">
</head><body><p>This page has moved to <a href="/$( [ "$p" = index.html ] && echo "" || echo "$p" )">euniverse.co.jp</a>.</p></body></html>
HTML
done

# 3. sitemap + robots for Search Console
TODAY=$(date +%Y-%m-%d)
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for p in $PAGES; do
    loc="https://euniverse.co.jp/$( [ "$p" = index.html ] && echo "" || echo "$p" )"
    echo "  <url><loc>$loc</loc><lastmod>$TODAY</lastmod></url>"
  done
  echo '</urlset>'
} > sitemap.xml
printf 'User-agent: *\nAllow: /\nDisallow: /v2/\n\nSitemap: https://euniverse.co.jp/sitemap.xml\n' > robots.txt

git add -A
echo "Promoted. Review, then commit & push:"
git status --short | sed 's/^/  /'
