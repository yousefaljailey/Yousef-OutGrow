#!/bin/sh
# Pre-deploy verifier: link/asset/API sweep against a deployed base URL.
# Usage: scripts/verify.sh https://outgrow-preview-pi.vercel.app   (or https://outgrow.qa after cutover)
set -e
BASE="${1:?usage: verify.sh <base-url>}"
fail=0
check() {
  code=$(curl -s -o /dev/null -w "%{http_code}" -m 20 "$BASE$1")
  [ "$code" = "$2" ] || { echo "FAIL $1 -> $code (want $2)"; fail=1; }
}
check "/" 200
check "/og.png" 200
check "/robots.txt" 200
check "/case/zihay-en.png" 200
check "/case/zihay-ar.png" 200
check "/no-such-page-verify" 404
api=$(curl -s -m 30 -X POST "$BASE/api/strategy" -H "Content-Type: application/json" -d '{"businessName":"Verify Co","industry":"Retail & E-commerce","budget":"5,000-15,000 QAR","goal":"More online sales"}')
echo "$api" | grep -q '"funnel"' || { echo "FAIL /api/strategy shape"; fail=1; }
cors=$(curl -s -o /dev/null -w "%{http_code}" -m 15 -X OPTIONS "$BASE/api/lead" -H "Origin: https://zihay-preview.vercel.app" -H "Access-Control-Request-Method: POST")
[ "$cors" = "204" ] || { echo "FAIL /api/lead preflight -> $cors"; fail=1; }
[ $fail = 0 ] && echo "VERIFY OK: $BASE" || exit 1
