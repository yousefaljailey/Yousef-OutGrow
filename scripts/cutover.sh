#!/bin/sh
# MERGE-DAY script: swap preview URLs for production (https://outgrow.qa).
# Run on the branch, review the diff, commit. outgrow.qa auto-deploys on merge to master.
set -e
cd "$(dirname "$0")/.."
sed -i '' 's|https://outgrow-preview-pi.vercel.app|https://outgrow.qa|g' index.html
echo "index.html og/meta URLs -> https://outgrow.qa. Also do (owner side):"
echo "  1. Vercel project env: RESEND_API_KEY, LEAD_TO_EMAIL, GEMINI_API_KEY (+ optional LEAD_WEBHOOK_URL)"
echo "  2. Zihay repo: scripts/cutover.sh (points its lead endpoint here)"
echo "  3. outgrowagency.com -> 308 redirect to outgrow.qa (Vercel domain settings)"
