# Production cutover runbook

Current state: the Vercel production deployment serves the old February
prototype from `main` (which renders a blank page — it never loads the app).
The finished site lives on this branch (`launch/v1`, built on `master`).

## Step 1 — Point production at this branch

Pick ONE of:

**Option A (no git surgery, 1 minute):** Vercel → Project → Settings →
Git → Production Branch → set to `launch/v1`. Vercel redeploys production
from this branch immediately.

**Option B (clean history going forward):** make `launch/v1` the new `main`:

```bash
git push origin launch/v1
git push origin launch/v1:main --force-with-lease
```

`main` and `master` share no git history (two separate "Initial commit"
lineages), so a regular merge/PR is not possible — the force-push replaces
the stale prototype wholesale. Afterwards, delete the leftover `master`
branch on GitHub to end the two-histories confusion:

```bash
git push origin --delete master
```

## Step 2 — Environment variables

In Vercel → Settings → Environment Variables, add the values from
`.env.example`. Minimum for launch: `RESEND_API_KEY` + `LEAD_TO_EMAIL`
(so form leads reach the inbox). `GEMINI_API_KEY` whenever ready — until
then the widget shows a labeled sample.

## Step 3 — Verify production

- Page renders (not blank), title reads "Outgrow | Advertising · PR · …"
- Submit the contact form → arrives at LEAD_TO_EMAIL / webhook
- AI widget returns a strategy (labeled "AI Analysis" once a key is set)
- View source: no `cdn.tailwindcss.com`, no API keys in any JS asset

## Recommended next

- Custom domain (e.g. `outgrowagency.com`) in Vercel → Domains
- Repo hygiene: make this repo private; it is public today
- Analytics: enable Vercel Analytics (one click) or add a GA4/Plausible tag

## Added since this runbook was written (same branch)

- `/api/lead` now accepts a `source` tag (`website`, `strategy-widget`,
  `zihay-newsletter`) and an optional `context` line — email subjects are
  tagged accordingly. It also allows cross-origin posts from the ZIHAY
  domains, which is how the storefront's newsletter feeds the same inbox.
- Every generated strategy report carries its own lead-capture form and a
  print stylesheet ("Save as PDF" → branded letterhead document).
- The Works page links the live ZIHAY build as a case study.
- `public/og.png` is the WhatsApp/social share card; a Vercel Analytics
  tag is in place and activates with one click in the dashboard
  (Project → Analytics → Enable).

## Brand color system + design debt (AA-audited 2026-07-04)

Tokens (`index.css`): `--color-brand #059669` · `--color-brand-ink #047857` (NEW — text-on-light green) · `--color-dark #0a0a0a` · `--color-tint #d1fae5` (unused; chips use green-100/200) · `--color-gray #6b7280` · `--color-border #e5e7eb`. Inter throughout.

Measured contrast:
- #059669 as text on white **3.77:1** (AA-large only) · on #0a0a0a **5.25:1 PASS** · white on #059669 fills **3.77:1**
- #047857 on white **5.48:1 PASS** · on #0a0a0a **3.98:1 FAIL** — so a blanket swap is wrong in BOTH directions; classify per ground
- gray-400 on white **2.54:1 FAIL** / on #0a0a0a **7.80:1 PASS** · gray-500 on white **4.83:1 PASS** · gray-600 on white **7.56:1 PASS**

Debt item #1 (est. 2h, post-launch, needs visual regression): tokenize ~120 inline `#059669` sites in App.tsx → `var(--color-brand)` for fills/borders/text-on-dark/display-size, `var(--color-brand-ink)` for text on light grounds (~40 eyebrow labels). Same pass: audit 39 `text-gray-400` sites → gray-600 where ground is light. After tokenization the brand recolors in one CSS line — sellable as "rebrand in one token."

Rule until then: new code consumes the CSS variables, never raw hexes.

Update 2026-07-04 (post-meeting): token unification DONE — all 122 brand-color sites now consume `var(--color-brand)` (identical pixels; 1 opacity-modifier site keeps hex by design). The whole brand recolors from one CSS line. Remaining debt from the AA audit is now ONLY the text-on-light ink split (~40 labels → `var(--color-brand-ink)`), still est. 1h with visual check.

Update 2026-07-04 (late): **AA text-contrast debt CLOSED.** Browser-measured pass over every route (computed color × effective background × WCAG size rules): 37 light-ground green labels → `var(--color-brand-ink)`, 11 hover greens on light → ink (large-text hovers kept brand), 31 gray-400-on-light → gray-500, and 17 dark-section fixes the original audit missed (gray-500/600/700 on #0a0a0a → gray-400: footer columns+headings+copyright, marquee ticker, AnimStat labels, step-2 panel, case-hero chips, home-strip feature chips inline hex). Kept by design: brand green on dark (5.25:1), large-text greens (hero cycler, works headings), decorative borders. Final verifier: 0 failing text pairings across #/ about services works works/zihay contact. Verifier snippet lives in the repo history (this commit's message references it).

## CUTOVER, CORRECTED (2026-07-05): production domain is outgrow.qa
Discovery: **https://outgrow.qa is Yousef's live Vercel project building `master`** (verified: Vercel headers, master's title, different bundle than our preview). So OutGrow's launch is not a DNS task:
**Merge the PR → his Vercel builds → live on outgrow.qa automatically.**
Merge-day list: run `scripts/cutover.sh` on the branch first (swaps preview URLs in metas), add the three env keys to HIS Vercel project, set outgrowagency.com as a redirect to outgrow.qa. Lead-API CORS is already forward-ready for zihay.store/zihaywear.com.
Also added this session: /insights section (3 evidence-based editorial DRAFTS with Arabic summaries — flagged in-page pending Yousef's voice pass), scripts/verify.sh (deploy smoke), scripts/aa-scan.js (the contrast auditor), docs/emails/ (nurture sequences EN/AR, dormant until Resend).
