/* Self-contained by design: with "type": "module", Vercel's Node runtime
   resolves relative imports strictly (extension required), so this function
   carries its own copies of the types and the sample engine. A slim
   client-side fallback lives in lib/demoStrategy.ts (used only when this
   endpoint is unreachable).

   The engine below is not filler: sample strategies are composed from the
   frameworks working strategists plan with (STP, RACE, IPA 60/40 evidence,
   the 95-5 rule for B2B) and 2026 published channel benchmarks, localized
   for Qatar & the GCC. The live Gemini path is instructed to plan with the
   same frameworks and benchmarks, so quality holds in both modes. */

interface UserInput {
  businessName: string;
  industry: string;
  mainChallenge: string;
}
interface FunnelStage {
  stage: string;
  focus: string;
  tactics: string[];
  kpi: string;
  benchmark: string;
}
interface RoadmapPhase {
  phase: string;
  theme: string;
  actions: string[];
}
interface GrowthStrategy {
  demo?: boolean;
  headline: string;
  positioning: string;
  targetSegment: string;
  summary: string;
  funnel: FunnelStage[];
  budgetSplit: { brand: number; activation: number; note: string };
  roadmap: RoadmapPhase[];
  northStar: string;
  quickWins: string[];
  frameworks: string[];
}

/* ── 2026 benchmark bank (published aggregates, phrased as ranges) ──
   Sources: WordStream/LocaliQ Google Ads 2026 benchmarks, Meta industry
   benchmark roundups 2026, IPA databank (Binet & Field), LinkedIn B2B
   Institute (95-5), DataReportal Digital 2026: Qatar. Directional, not
   guarantees. */
const BM = {
  reachSocial:
    "Meta feed CTR ≈1.4–2.2% (retail & fashion trend higher, ≈2.5–2.9%); treat CPM spikes as a creative problem first",
  reachSearch:
    "Google Search CTR ≈3.2–3.8% (2026 cross-industry); impression share >70% on brand terms",
  act: "landing-page conversion to enquiry/opt-in ≈2–4% of visitors; reply to enquiries in <5 minutes — speed-to-lead decides who wins the deal",
  convertEcom:
    "Search CVR ≈3.8–4.4%, Meta CVR ≈1.5–2%; median Meta ROAS ≈1.9× — scale creatives that clear 3×",
  convertLead:
    "Search CVR ≈3.8–4.4%; healthcare/legal CPCs run $4–7 so protect Quality Score; qualify every lead within one business day",
  engage:
    "email open ≈20–35%; WhatsApp broadcasts in the GCC report >85% read rates; hold LTV:CAC at ≥3:1",
  qatar:
    "Qatar is one of the world's most social markets — ≈96% of the population is active on social platforms, Instagram alone reaches ≈2M people (~66%), LinkedIn ≈55% of the population, and WhatsApp is the default business channel",
};

/* ── vertical profiles ─────────────────────────────────────────── */
interface Vertical {
  id: string;
  match: RegExp;
  label: string;
  b2b: boolean;
  audience: string;
  positioning: (name: string) => string;
  reach: string[];
  act: string[];
  convert: string[];
  engage: string[];
  northStar: string;
  quickWins: string[];
  convertBM?: string;
}

const VERTICALS: Vertical[] = [
  {
    id: "food",
    match:
      /restaur|cafe|coffee|food|f&b|f & b|catering|bakery|dessert|burger|pizza|shawarma|karak|bites|eatery|kitchen/i,
    label: "F&B",
    b2b: false,
    audience:
      "hungry locals within a 15-minute drive — in Qatar that means Instagram- and TikTok-first diners who decide from short video and Google Maps reviews",
    positioning: (n) =>
      `${n} is the place you bring people to — one signature dish, one unmistakable look, repeated until the whole neighbourhood can picture it.`,
    reach: [
      "Run a Reels/TikTok engine: 3 short videos a week built around your best-selling dish, the making-of, and the room — geo-targeted to your delivery radius",
      "Own your Google Business Profile: weekly photo uploads, menu links, and a review-reply SLA — Maps is the highest-intent shelf in F&B",
      "Use Snapchat geofilters and local micro-influencers (5–50k followers) for launches — Snap over-indexes with young Qatari audiences",
    ],
    act: [
      "Every ad and bio click lands on one page: menu, live hours, WhatsApp order button, and Maps directions — no PDF menus",
      "Capture opt-ins with a first-visit hook (free karak/dessert with first order) into a WhatsApp broadcast list",
    ],
    convert: [
      "Push direct WhatsApp ordering to protect margin from aggregator commissions; keep delivery apps for discovery, not loyalty",
      "Retarget menu viewers with the exact dishes they watched — dynamic creative beats generic brand ads at this stage",
    ],
    engage: [
      "Weekly WhatsApp broadcast: one new item or moment per week to the opt-in list — GCC read rates make this your cheapest revenue channel",
      "Systematically ask for Google reviews at the happiest moment (dessert served, order delivered), and answer every one",
    ],
    northStar:
      "Repeat visits per month — covers and reorders from people who came back, not raw follower count",
    quickWins: [
      "Claim and complete the Google Business Profile today (photos, hours, menu link, WhatsApp)",
      "Put a WhatsApp click-to-chat button on Instagram, the website, and every ad",
    ],
  },
  {
    id: "fashion",
    match:
      /fashion|cloth|apparel|abaya|modest|boutique|jewel|accessor|beauty product|cosmetic|perfume|fragran|e-?com|online store|shop|retail/i,
    label: "Retail & E-commerce",
    b2b: false,
    audience:
      "style-driven women 18–40 in the GCC who discover on Instagram and TikTok, validate through UGC and reviews, and expect to finish the purchase (or ask questions) on WhatsApp",
    positioning: (n) =>
      `${n} owns one shelf in the customer's mind — a signature aesthetic and hero product she can describe in one sentence to a friend.`,
    reach: [
      "Build a UGC engine: seed product with 10–15 micro-creators monthly and recycle the best clips as Spark/Partnership ads — polished studio ads alone underperform in fashion",
      "Run Meta Advantage+ with a full catalog feed so the algorithm matches products to buyers; fashion CTRs (≈2.5–2.9%) reward strong visuals",
      "Anchor a content calendar to GCC retail moments — Ramadan, both Eids, National Day, back-to-school — planned 6 weeks ahead",
    ],
    act: [
      "Drive to shoppable product pages, never the homepage; every creative deep-links to the exact item shown",
      "Grow first-party lists: 10% first-order hook for email/WhatsApp opt-in — cookieless targeting makes owned audiences the moat",
      "Publish style-guide content targeting long-tail search ('modest workwear Qatar') — organic SEO compounds while paid only rents attention",
    ],
    convert: [
      "Install abandoned-cart recovery on WhatsApp and email within 1 hour and at 24 hours — the single highest-ROI automation in e-commerce",
      "Retarget product viewers with dynamic ads + social proof overlays (reviews, 'selling fast') for the last push",
    ],
    engage: [
      "Lifecycle flows: post-purchase thank-you → styling content → replenishment/new-drop alerts; measure repeat-purchase rate monthly",
      "Launch a simple VIP tier (early access to drops) for the top 10% of customers — retention is cheaper than acquisition, always",
    ],
    northStar:
      "Contribution-margin ROAS (MER) — revenue after product and delivery costs per ad dirham, not platform-reported ROAS",
    quickWins: [
      "Turn on WhatsApp Business catalog so the bag can be completed in chat",
      "Verify the Meta pixel + Conversions API fire on every purchase — broken tracking silently doubles CAC",
    ],
    convertBM: BM.convertEcom,
  },
  {
    id: "beauty",
    match:
      /salon|spa|barber|nail|lash|brow|hair|makeup|aesthetic|skincare clinic|beauty (lounge|center|centre|studio)/i,
    label: "Beauty & Wellness",
    b2b: false,
    audience:
      "women 20–45 within a 20-minute drive who choose from before/after proof on Instagram and book where friction is lowest",
    positioning: (n) =>
      `${n} is the specialist, not the generalist — famous for one signature result people screenshot and bring in.`,
    reach: [
      "Post before/after transformations (with consent) as the content spine — 4–5 weekly, boosted to a tight geo radius",
      "Partner with 3–5 local beauty creators for treatment features; in Qatar, Snapchat + Instagram carry beauty discovery",
      "Keep the Google Business Profile immaculate — services, prices from, fresh photos — salons win or lose on Maps",
    ],
    act: [
      "One-tap booking: link-in-bio and every ad goes to WhatsApp booking or a booking page with live slots — never 'DM us'",
      "Collect every client's number and consent into a structured list at first visit",
    ],
    convert: [
      "Fill dead hours with time-boxed WhatsApp offers to the list (same-day slots at soft discount) instead of public discounting",
      "Retarget profile visitors and video viewers with a first-visit signature-treatment offer",
    ],
    engage: [
      "Automate rebooking nudges keyed to treatment cycles (lashes 3 weeks, colour 6 weeks) — retention is the whole economics of a salon",
      "Ask for a Google review + tagged story at checkout; reward with a small perk on the next visit",
    ],
    northStar:
      "Rebooking rate — % of first-time clients who book a second appointment within the treatment cycle",
    quickWins: [
      "Set up WhatsApp quick-replies for prices, hours, and booking so no enquiry waits past 5 minutes",
      "Publish this week's before/after set and pin the best to profile highlights",
    ],
  },
  {
    id: "clinic",
    match:
      /clinic|dental|dentist|medical|health|physio|derma|hospital|pharma|wellness center|polyclinic/i,
    label: "Healthcare",
    b2b: false,
    audience:
      "patients researching a specific symptom or treatment — high-intent Google searchers first, reassured by reviews and doctor-led content before they book",
    positioning: (n) =>
      `${n} is the trusted specialist for its flagship treatments — the clinic whose doctors patients feel they already know before walking in.`,
    reach: [
      "Win high-intent search: Google Ads on treatment + location keywords with tightly matched landing pages per treatment",
      "Publish doctor-led short videos answering the 10 most-asked patient questions — trust content outperforms promotions in healthcare",
      "Build the review engine: systematic post-visit Google review requests; volume and recency move both Maps rank and conversion",
    ],
    act: [
      "Each treatment page: symptoms, procedure, doctor, price range, and a WhatsApp 'ask us' button — patients ask before they book",
      "Offer online booking with visible slots; every extra step loses anxious patients",
    ],
    convert: [
      "Respond to enquiries inside 5 minutes in working hours (speed-to-lead), with a nurse/coordinator script for triage",
      "Remarket education content — not discounts — to site visitors; compliance-safe and more persuasive",
    ],
    engage: [
      "Automate recall reminders (cleanings, check-ups, follow-ups) via WhatsApp — recurring visits are the profit base",
      "Monthly patient-education broadcast; being useful between visits keeps the clinic top-of-mind",
    ],
    northStar:
      "Booked consultations per week (and show-up rate) — not clicks, not calls",
    quickWins: [
      "Add WhatsApp click-to-chat to the Google Business Profile and every ad",
      "Turn on appointment-reminder messages to cut no-shows immediately",
    ],
    convertBM: BM.convertLead,
  },
  {
    id: "fitness",
    match:
      /gym|fitness|crossfit|yoga|pilates|padel|sports|training studio|bootcamp/i,
    label: "Fitness",
    b2b: false,
    audience:
      "people within 15 minutes who need a reason to start now — challenge-driven joiners recruited by proof and friends",
    positioning: (n) =>
      `${n} sells a visible result on a deadline — the 6-week transformation people post about — not access to equipment.`,
    reach: [
      "Run member transformation stories as the creative engine; real people beat stock fitness footage every time",
      "Launch seasonal 6-week challenges as acquisition campaigns (New Year, pre-summer, post-Ramadan)",
      "Geo-target ads to the 15-minute radius; distance is the silent churn driver",
    ],
    act: [
      "Free trial or day-pass funnel with instant WhatsApp confirmation and a booked first session — never 'come by anytime'",
      "Capture goals at signup to personalize follow-up",
    ],
    convert: [
      "Call/WhatsApp every trial within 24 hours with a concrete start plan; conversion is a follow-up discipline, not an ads problem",
      "Bundle a friend: 2-for-1 first month — workout partners double retention",
    ],
    engage: [
      "Track month-2 retention as religion: onboarding check-ins at day 7/21/45",
      "Member referral program with visible rewards; gyms grow on referrals once past ~200 members",
    ],
    northStar:
      "Active members at month 2 — signups that survive onboarding, not leads",
    quickWins: [
      "Put a trial-booking link with live slots in the Instagram bio and every ad",
      "Message every ex-member from the last 6 months with a comeback offer",
    ],
  },
  {
    id: "realestate",
    match:
      /real ?estate|property|properties|broker|developer|villa|apartment|leasing|realty/i,
    label: "Real Estate",
    b2b: false,
    audience:
      "serious buyers and tenants segmented by budget band and area — plus the investor audience on LinkedIn, ~55% of Qatar's population",
    positioning: (n) =>
      `${n} is the market authority for its patch — the agency whose area guides and walkthroughs buyers binge before they ever call.`,
    reach: [
      "Video walkthroughs and area guides as the content spine — 3 per week; listings expire, authority compounds",
      "Search ads on high-intent queries ('2BR apartment {area}') routed to filtered listing pages",
      "LinkedIn presence for the investment segment; Qatar's LinkedIn penetration makes it a serious channel here",
    ],
    act: [
      "Every listing: WhatsApp enquiry button, floor plan, and honest specs — incomplete listings burn trust and ad spend",
      "Capture search criteria (budget, area, beds) in a 30-second form to segment follow-up",
    ],
    convert: [
      "Enforce a 5-minute speed-to-lead SLA in working hours — in brokerage the fastest responder wins the viewing",
      "Run a CRM pipeline with staged follow-up; most deals close on the 5th–12th touch, not the 1st",
    ],
    engage: [
      "Weekly 'new to market' WhatsApp/email alerts by saved criteria — be the first message a buyer sees",
      "Post-deal referral engine: settled clients are the cheapest source of the next three",
    ],
    northStar:
      "Qualified viewings per week — booked, budget-matched viewings, not raw leads",
    quickWins: [
      "Set the WhatsApp speed-to-lead SLA and route enquiries to whoever can answer in 5 minutes",
      "Standardize listing quality: photos, floor plan, price, availability on every unit",
    ],
    convertBM: BM.convertLead,
  },
  {
    id: "b2b",
    match:
      /b2b|consult|agency|corporate|logistics|wholesale|trading|contract|facility|hr |recruit|legal|account|audit|it services|software house|engineering/i,
    label: "B2B Services",
    b2b: true,
    audience:
      "decision-makers at target accounts — remembering that only ~5% are in-market at any moment; the other 95% must already know you when their moment comes",
    positioning: (n) =>
      `${n} is linked to specific buying situations ("we need X, call ${n}") — category entry points, claimed one by one, before the RFP exists.`,
    reach: [
      "Weekly founder/expert-led LinkedIn content aimed at the 95% not yet in-market — useful takes, real numbers, zero brochure-speak",
      "One flagship proof asset per quarter (benchmark report, case study with numbers) promoted to the exact ICP",
      "Search ads only on high-intent service keywords; B2B search is expensive — bid where budgets are already allocated",
    ],
    act: [
      "Gate only the flagship asset — a report or a live expert webinar; let everything else build memory ungated",
      "Site pages per service with named clients, outcomes, and a short qualification form (company, role, need, timeline)",
    ],
    convert: [
      "ABM-lite: a named top-50 account list worked with personalized outreach + retargeting, reviewed monthly",
      "Respond to inbound within one business hour with a human, not an autoresponder; enterprise buyers shortlist responsive vendors",
    ],
    engage: [
      "Quarterly client business reviews that surface expansion scope — existing accounts are the cheapest pipeline",
      "A monthly insights email clients actually forward; referrals follow usefulness",
    ],
    northStar:
      "Qualified pipeline value per quarter (and win rate) — not MQL counts",
    quickWins: [
      "Fix LinkedIn company + founder profiles: clear one-line value proposition and a pinned proof post",
      "Write down the top-50 target account list — strategy starts when the list exists",
    ],
    convertBM: BM.convertLead,
  },
  {
    id: "saas",
    match:
      /saas|software|app|tech|startup|platform|ai |fintech|edtech|healthtech/i,
    label: "Tech & SaaS",
    b2b: true,
    audience:
      "early adopters in one narrow use-case where the product is 10× better — a beachhead, not 'everyone who could use it'",
    positioning: (n) =>
      `${n} owns one job-to-be-done: the specific workflow it kills, named in the customer's words, repeated everywhere.`,
    reach: [
      "Founder-led content documenting the problem space — build-in-public earns distribution no ad budget matches at seed stage",
      "Get listed and reviewed where buyers compare (G2/Capterra/app stores); comparison pages convert bottom-of-funnel",
      "Target the beachhead's watering holes (communities, newsletters, LinkedIn) before broad paid",
    ],
    act: [
      "Frictionless trial/demo: signup to first value in under 10 minutes, instrumented at every step",
      "Measure activation (first value moment), not registrations — AARRR discipline from day one",
    ],
    convert: [
      "Onboarding emails/WhatsApp triggered by usage gaps ('you haven't connected X yet'), not calendar drips",
      "Founder does the first 50 sales calls personally; pricing and objections are product research",
    ],
    engage: [
      "Track cohort retention monthly; expansion and referral loops only compound on a retained base",
      "Build the case-study engine from the first 10 delighted customers",
    ],
    northStar:
      "Activated accounts that return in week 2 — the earliest honest predictor of retention",
    quickWins: [
      "Instrument the funnel (signup → activation → retention) before spending another rial on ads",
      "Rewrite the homepage headline to the beachhead's job-to-be-done in their words",
    ],
  },
  {
    id: "events",
    match:
      /event|wedding|exhibition|conference|festival|entertainment|activation|expo|concert/i,
    label: "Events & Entertainment",
    b2b: false,
    audience:
      "attendees who decide late and share loudly — plus the sponsors and partners who fund the calendar",
    positioning: (n) =>
      `${n} events are the ones people post before they even start — designed for the feed as much as the floor.`,
    reach: [
      "Design shareable moments into the event itself (stage, installations, badges) — attendees become the media plan",
      "Tiered announcement campaign: save-the-date → lineup reveals → last-call urgency, each a separate creative wave",
      "Partner and sponsor cross-promotion mapped before launch — every partner posts on a schedule, doubling organic reach",
    ],
    act: [
      "Registration in under a minute, mobile-first, with WhatsApp confirmation and calendar file",
      "Early-bird tiers with visible deadlines; pricing ladders create three buying moments instead of one",
    ],
    convert: [
      "Retarget page visitors with countdown creatives in the final 10 days — events convert on urgency",
      "Group offers (4+ tickets) to weaponize social pressure",
    ],
    engage: [
      "Post-event content drop within 48 hours (aftermovie, photo galleries) while attendees still want to share",
      "Carry the audience to the next event: attendees become the year-round WhatsApp/email community",
    ],
    northStar:
      "Registrations → attendance rate — sold seats that show up, per event",
    quickWins: [
      "Publish the event page with WhatsApp RSVP today, even before full lineup",
      "Lock the partner cross-posting calendar in writing",
    ],
  },
  {
    id: "education",
    match:
      /school|academy|education|training|course|nursery|kindergarten|institute|tutor|university/i,
    label: "Education & Training",
    b2b: false,
    audience:
      "parents (or professionals) who research for weeks and decide on trust — testimonials, outcomes, and a campus/course experience",
    positioning: (n) =>
      `${n} is judged by its graduates — lead with outcomes (results, placements, transformations), not facilities.`,
    reach: [
      "Outcome stories as the content spine: student results, parent testimonials, day-in-the-life reels",
      "Search ads on program + location keywords timed to intake seasons; education demand is a calendar, plan 8 weeks ahead",
      "Community presence: school fairs, open days, and partnerships that put the brand in parents' physical world",
    ],
    act: [
      "Open-day and campus-tour funnel with instant WhatsApp confirmation — the visit is the real conversion point",
      "Program pages with fees range, curriculum, and FAQs; hiding fees creates unqualified enquiries",
    ],
    convert: [
      "Same-day follow-up on every enquiry during intake windows, with a named admissions contact",
      "Nurture undecided families with proof content between enquiry and deadline",
    ],
    engage: [
      "Alumni and parent referral programs — education is the highest-trust referral category there is",
      "Termly results broadcast to the community; retention in education is re-enrollment",
    ],
    northStar:
      "Enrollments per intake (and re-enrollment rate) — not open-day attendance",
    quickWins: [
      "Put next intake dates + WhatsApp admissions line on every page and profile",
      "Collect and publish 5 fresh parent/student testimonials this week",
    ],
  },
];

const GENERIC_B2C: Vertical = {
  id: "generic-b2c",
  match: /./,
  label: "Consumer",
  b2b: false,
  audience:
    "a tightly defined first segment — one audience whose problem you solve visibly better, won before widening",
  positioning: (n) =>
    `${n} stands for one specific promise, repeated identically across every touchpoint until the market can finish the sentence.`,
  reach: [
    "Concentrate on the two channels where the audience already spends time (in Qatar: Instagram + TikTok for consumers) — depth beats presence-everywhere",
    "Publish on a fixed weekly cadence built from one monthly content session; consistency compounds, bursts don't",
    "Localize creative for the GCC: bilingual AR/EN, and plan around Ramadan, the Eids, and National Day",
  ],
  act: [
    "Route every click to one conversion-focused page with a single call-to-action and a WhatsApp button",
    "Build the first-party list (WhatsApp/email) with a genuine incentive from day one",
  ],
  convert: [
    "Retarget engaged visitors within 7 days — most conversions come from the second and third touch",
    "Answer every enquiry within 5 minutes during business hours; speed-to-lead is the cheapest conversion lever there is",
  ],
  engage: [
    "A weekly WhatsApp/email rhythm to the opt-in list — owned audiences are the hedge against rising ad costs",
    "Systematize reviews and referrals at the happiest customer moment",
  ],
  northStar:
    "Repeat customers per month — the number that proves the flywheel, not follower count",
  quickWins: [
    "Complete the Google Business Profile and add WhatsApp click-to-chat everywhere",
    "Install pixels + UTM discipline so every dirham is attributable",
  ],
};

const GENERIC_B2B: Vertical = {
  ...GENERIC_B2C,
  id: "generic-b2b",
  label: "B2B",
  b2b: true,
  audience:
    "named decision-makers at target accounts — only ~5% in-market today; the strategy must build memory with the other 95%",
  positioning: (n) =>
    `${n} is attached to specific buying situations — when a category need appears, ${n} is already the name in the room.`,
  reach: [
    "Weekly expert-led LinkedIn content (Qatar's LinkedIn reaches ~55% of the population) aimed at future buyers, not just in-market ones",
    "One quarterly proof asset (case study, benchmark) promoted to the exact ICP",
    "Search ads only on high-intent service keywords",
  ],
  northStar: "Qualified pipeline value per quarter — not lead counts",
  quickWins: [
    "Write the top-50 target account list",
    "Pin a proof post (numbers, client, outcome) on LinkedIn company + founder profiles",
  ],
};

/* ── challenge profiles ────────────────────────────────────────── */
interface Challenge {
  id: string;
  match: RegExp;
  priority: "Reach" | "Act" | "Convert" | "Engage";
  headline: (name: string) => string;
  summaryLine: string;
  quickWin?: string;
  budgetShift?: number; // + moves points from brand → activation
  budgetNote?: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: "awareness",
    match:
      /awareness|visibilit|nobody knows|no one knows|unknown|reach|brand recognition|get noticed|exposure/i,
    priority: "Reach",
    headline: (n) => `Make ${n} impossible to miss`,
    summaryLine:
      "The bottleneck is mental availability: not enough of the right people think of the brand at the buying moment. The plan front-loads Reach — distinctive creative, concentrated channels, and a repeated brand promise — because brands are built by being consistently seen.",
    quickWin:
      "Lock the distinctive assets (logo lockup, colours, one tagline) and repeat them identically on every post and ad for 90 days",
  },
  {
    id: "leads",
    match:
      /lead|enquir|inquir|pipeline|prospect|not enough clients|no clients|customers? (are )?(hard|few)|demand/i,
    priority: "Act",
    headline: (n) => `Build ${n} a lead machine that doesn't sleep`,
    summaryLine:
      "The gap is between attention and action: traffic exists but doesn't turn into conversations. The plan hardens the Act stage — one conversion path, instant WhatsApp capture, and a 5-minute response discipline — before spending more on reach.",
    quickWin:
      "Add WhatsApp click-to-chat to every ad, bio, and page — then measure response time, not just lead count",
    budgetShift: 10,
    budgetNote:
      "shifted toward activation for 90 days to fix lead capture; rebalance once cost-per-qualified-lead stabilizes",
  },
  {
    id: "sales",
    match:
      /sales|revenue|conversion|convert|checkout|cart|closing|deals? (fall|stall)|roas|profit/i,
    priority: "Convert",
    headline: (n) => `Turn ${n}'s attention into revenue`,
    summaryLine:
      "Interest is arriving but revenue is leaking at the close. The plan concentrates on the Convert stage — retargeting the warm pool, tightening the offer, and instrumenting every step so the leak is visible in numbers, not vibes.",
    quickWin:
      "Stand up retargeting on the last 30 days of site visitors and video viewers this week — the warmest audience is being wasted",
    budgetShift: 10,
    budgetNote:
      "temporarily activation-heavy to capture demand already in the funnel; restore brand weight once conversion stabilizes",
  },
  {
    id: "retention",
    match:
      /retention|churn|repeat|loyalty|come back|one-?time|return(ing)? customer/i,
    priority: "Engage",
    headline: (n) => `Make ${n}'s customers come back on schedule`,
    summaryLine:
      "Acquisition is outrunning retention — the leaky-bucket problem. The plan leads with the Engage stage: lifecycle messaging, a reason to return on a schedule, and cohort measurement, because a 5% retention lift moves profit more than any ad optimization.",
    quickWin:
      "Launch one WhatsApp win-back broadcast to lapsed customers this week — it will outperform any cold campaign",
  },
  {
    id: "launch",
    match:
      /launch|new brand|starting|just opened|opening|startup|from scratch|no presence/i,
    priority: "Reach",
    headline: (n) => `Launch ${n} loud, then make it stick`,
    summaryLine:
      "A launch needs two clocks: a 90-day activation sprint that proves demand, and a brand layer that compounds after it. The plan sequences foundations → concentrated launch burst → systemized follow-up, so early momentum doesn't evaporate.",
    quickWin:
      "Fix the foundations first: profiles, pixel, WhatsApp line, and one conversion page — before any paid spend",
    budgetShift: 10,
    budgetNote:
      "launch phase runs hotter on activation; shift back toward 60/40 as the brand base forms (IPA evidence: long-term effects need brand weight)",
  },
  {
    id: "competition",
    match:
      /competit|crowded|saturat|differentiat|stand out|price war|copycat|market share/i,
    priority: "Reach",
    headline: (n) => `Give ${n} a position competitors can't copy`,
    summaryLine:
      "In a crowded category the answer is rarely louder ads — it's a sharper position. The plan starts from STP: pick the segment where you're genuinely strongest, claim the buying situations competitors ignore, and make the brand distinctive enough to be recognized without the logo.",
    quickWin:
      "Audit the top 3 competitors' messaging this week; write the one sentence only you can claim, then align every touchpoint to it",
  },
  {
    id: "efficiency",
    match:
      /budget|expensive|cost|cac|efficien|waste|small team|limited resources|roi/i,
    priority: "Convert",
    headline: (n) => `Make every rial ${n} spends provable`,
    summaryLine:
      "The mandate is efficiency: fewer channels, better measurement, and budget concentrated where cost-per-outcome is proven. The plan kills spray-and-pray, instruments the funnel end-to-end, and reallocates monthly by the numbers — a 70/20/10 split between proven, promising, and experimental spend.",
    quickWin:
      "Pause everything unmeasurable this week; keep the two channels with the clearest cost-per-outcome",
  },
];

const DEFAULT_CHALLENGE: Challenge = {
  id: "foundations",
  match: /./,
  priority: "Reach",
  headline: (n) => `A 90-day growth operating system for ${n}`,
  summaryLine:
    "With no single blocker named, the plan installs the full growth loop — positioning, concentrated reach, a working conversion path, and retention rhythms — so every later investment has a system to land in.",
};

/* ── composer ──────────────────────────────────────────────────── */
function pickVertical(industry: string, challengeText: string): Vertical {
  const hay = industry + " " + challengeText;
  const hit = VERTICALS.find((v) => v.match.test(hay));
  if (hit) return hit;
  return /b2b|corporate|companies|business(es)? clients|wholesale|government|enterprise/i.test(
    hay,
  )
    ? GENERIC_B2B
    : GENERIC_B2C;
}

function pickChallenge(text: string): Challenge {
  return CHALLENGES.find((c) => c.match.test(text)) || DEFAULT_CHALLENGE;
}

function buildSampleStrategy(input: UserInput): GrowthStrategy {
  const name = input.businessName.trim() || "Your business";
  const industryRaw = input.industry.trim() || "your industry";
  const v = pickVertical(input.industry, input.mainChallenge);
  const c = pickChallenge(input.mainChallenge || "");

  const brandBase = v.b2b ? 50 : 60;
  const shift = c.budgetShift || 0;
  const brand = Math.max(35, brandBase - shift);
  const activation = 100 - brand;
  const budgetNote = v.b2b
    ? `B2B evidence (the 95-5 rule): most buyers aren't in-market today, so brand memory can't be sacrificed for lead gen — hold brand near half of spend${c.budgetNote ? "; " + c.budgetNote : ""}.`
    : `Anchored to IPA effectiveness evidence (Binet & Field ≈60/40 brand-to-activation for consumer brands)${c.budgetNote ? " — " + c.budgetNote : "; adjust by lifecycle, not by mood"}.`;

  const stages: FunnelStage[] = [
    {
      stage: "Reach",
      focus: `Put ${name} in front of ${v.b2b ? "the right accounts" : "the right audience"} where they already spend time — ${BM.qatar}.`,
      tactics: v.reach.slice(0, 3),
      kpi: v.b2b
        ? "Qualified-audience reach & branded-search growth"
        : "Reach within target segment & branded-search growth",
      benchmark: BM.reachSocial,
    },
    {
      stage: "Act",
      focus: `Turn attention into first actions — visits, enquiries, opt-ins — through one frictionless path.`,
      tactics: v.act.slice(0, 3),
      kpi: "Enquiries / opt-ins per week (and response time)",
      benchmark: BM.act,
    },
    {
      stage: "Convert",
      focus: `Close the loop from interest to ${v.b2b ? "signed engagements" : "paid orders"} with follow-up discipline and retargeting.`,
      tactics: v.convert.slice(0, 3),
      kpi: v.b2b
        ? "Proposals sent → win rate"
        : "Purchase conversion rate & cost per acquisition",
      benchmark: v.convertBM || BM.convertLead,
    },
    {
      stage: "Engage",
      focus: `Make the first ${v.b2b ? "engagement" : "purchase"} the beginning: retention, reviews, and referrals on a schedule.`,
      tactics: v.engage.slice(0, 3),
      kpi: v.b2b
        ? "Account expansion & referral pipeline"
        : "Repeat rate & review velocity",
      benchmark: BM.engage,
    },
  ];
  // Surface the priority stage first, marked.
  const pi = stages.findIndex((s) => s.stage === c.priority);
  if (pi > 0) {
    const [p] = stages.splice(pi, 1);
    p.focus = "Priority — " + p.focus;
    stages.unshift(p);
  } else if (pi === 0) {
    stages[0].focus = "Priority — " + stages[0].focus;
  }

  const roadmap: RoadmapPhase[] = [
    {
      phase: "Days 1–30",
      theme: "Foundations & measurement",
      actions: [
        "Lock positioning, distinctive assets, and the one-line promise (STP before spend)",
        "Instrument everything: pixels/CAPI, UTMs, WhatsApp lines, dashboards",
        `Sprint on the priority stage: ${c.priority} — ship the first campaign wave`,
      ],
    },
    {
      phase: "Days 31–60",
      theme: "Prove & iterate",
      actions: [
        "Read the numbers weekly against benchmarks; kill losers, feed winners",
        "A/B test the second creative wave — hooks, CTAs, subject lines, landing pages — and let the data pick",
        "Stand up the owned-audience rhythm (segmented WhatsApp/email flows)",
      ],
    },
    {
      phase: "Days 61–90",
      theme: "Systematize & scale",
      actions: [
        "Codify what works into playbooks and a rolling 90-day calendar",
        `Rebalance budget toward the ${brand}/${activation} split as foundations settle`,
        "Automate the repeatable — lifecycle flows, chat first-response, reporting — then add the next channel or segment",
      ],
    },
  ];

  const frameworks = [
    "STP positioning",
    "RACE journey",
    v.b2b ? "95-5 rule (B2B Institute)" : "IPA 60/40 (Binet & Field)",
    "2026 channel benchmarks",
  ];

  const quickWins = [...(c.quickWin ? [c.quickWin] : []), ...v.quickWins].slice(
    0,
    3,
  );

  return {
    demo: true,
    headline: c.headline(name),
    positioning: v.positioning(name),
    targetSegment: `${v.label} focus — ${v.audience}.`,
    summary:
      `${name} operates in ${industryRaw}. ${c.summaryLine} ` +
      `Everything below is sequenced for the Qatar & GCC market and judged against published 2026 benchmarks, so progress is measured — not felt.`,
    funnel: stages,
    budgetSplit: { brand, activation, note: budgetNote },
    roadmap,
    northStar: v.northStar,
    quickWins,
    frameworks,
  };
}

/* ── request plumbing ──────────────────────────────────────────── */
interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}
interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const RATE_LIMIT = 6; // requests per window per IP (best-effort, per warm instance)
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function clientIp(req: ApiRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  const raw = Array.isArray(fwd) ? fwd[0] : (fwd ?? "unknown");
  return raw.split(",")[0].trim();
}

function sanitizeInput(body: unknown): UserInput | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const businessName =
    typeof b.businessName === "string"
      ? b.businessName.trim().slice(0, 80)
      : "";
  const industry =
    typeof b.industry === "string" ? b.industry.trim().slice(0, 80) : "";
  const mainChallenge =
    typeof b.mainChallenge === "string"
      ? b.mainChallenge.trim().slice(0, 500)
      : "";
  if (!businessName || !industry) return null;
  return { businessName, industry, mainChallenge };
}

/* ── live Gemini path (same schema, same frameworks) ───────────── */
const S = (type: string, rest: object = {}) => ({ type, ...rest });
const STRATEGY_SCHEMA = {
  type: "OBJECT",
  properties: {
    headline: S("STRING"),
    positioning: S("STRING"),
    targetSegment: S("STRING"),
    summary: S("STRING"),
    funnel: S("ARRAY", {
      items: S("OBJECT", {
        properties: {
          stage: S("STRING"),
          focus: S("STRING"),
          tactics: S("ARRAY", { items: S("STRING") }),
          kpi: S("STRING"),
          benchmark: S("STRING"),
        },
        required: ["stage", "focus", "tactics", "kpi", "benchmark"],
      }),
    }),
    budgetSplit: S("OBJECT", {
      properties: {
        brand: S("NUMBER"),
        activation: S("NUMBER"),
        note: S("STRING"),
      },
      required: ["brand", "activation", "note"],
    }),
    roadmap: S("ARRAY", {
      items: S("OBJECT", {
        properties: {
          phase: S("STRING"),
          theme: S("STRING"),
          actions: S("ARRAY", { items: S("STRING") }),
        },
        required: ["phase", "theme", "actions"],
      }),
    }),
    northStar: S("STRING"),
    quickWins: S("ARRAY", { items: S("STRING") }),
    frameworks: S("ARRAY", { items: S("STRING") }),
  },
  required: [
    "headline",
    "positioning",
    "targetSegment",
    "summary",
    "funnel",
    "budgetSplit",
    "roadmap",
    "northStar",
    "quickWins",
    "frameworks",
  ],
};

async function generateWithGemini(
  input: UserInput,
  apiKey: string,
): Promise<GrowthStrategy> {
  const model = process.env.GEMINI_MODEL || "gemini-3-pro-preview";
  const prompt = `You are the senior growth strategist at Outgrow, a marketing, advertising and event management agency in Doha, Qatar. Produce a strategy preview for a prospective client. It must read like a working strategist's plan — specific, quantified, zero fluff.

CLIENT
- Business: ${input.businessName}
- Industry: ${input.industry}
- Stated challenge: ${input.mainChallenge || "not specified"}

METHOD (mandatory)
1. STP first: name the beachhead segment and a one-line ownable positioning statement.
2. Structure execution as the RACE journey — exactly four funnel stages: Reach, Act, Convert, Engage. Put the stage that best relieves the stated challenge FIRST and prefix its focus with "Priority — ". Each stage: 2–3 concrete channel-specific tactics, one KPI, one benchmark string.
3. Budget: brand vs activation split with a one-line rationale. Consumer default ≈60/40 (IPA evidence, Binet & Field); B2B ≈50/50 citing the 95-5 rule (only ~5% of buyers in-market). Shift up to 10 points toward activation for launch/lead-gen urgency and say why in the note.
4. Roadmap: exactly three phases — "Days 1–30", "Days 31–60", "Days 61–90" — with theme + 3 actions each (foundations & measurement → prove & iterate → systematize & scale).
5. northStar: one business-outcome metric (not vanity), one sentence.
6. quickWins: exactly 3 things doable this week at near-zero cost.
7. frameworks: list the framework names you used.

MARKET CONTEXT (use it)
- ${BM.qatar}.
- Bilingual AR/EN content and WhatsApp-first customer handling are table stakes in Qatar; plan around Ramadan, the Eids, and Qatar National Day.

BENCHMARKS (quote ranges honestly in the benchmark fields)
- ${BM.reachSocial}. ${BM.reachSearch}.
- Act: ${BM.act}.
- Convert (e-com): ${BM.convertEcom}. Convert (lead-gen): ${BM.convertLead}.
- Engage: ${BM.engage}.

STYLE
- Write for a smart owner, not a textbook: short sentences, concrete verbs, numbers where they earn their place.
- Never invent fake client results or fabricated statistics beyond the ranges provided.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: STRATEGY_SCHEMA,
          thinkingConfig: { thinkingBudget: 4096 },
        },
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Gemini request failed (${res.status})`);
  }
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  const parsed = JSON.parse(text) as GrowthStrategy;
  parsed.demo = false;
  return parsed;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (rateLimited(clientIp(req))) {
    res
      .status(429)
      .json({ error: "Too many requests — please try again in a minute." });
    return;
  }
  const input = sanitizeInput(req.body);
  if (!input) {
    res.status(400).json({ error: "businessName and industry are required." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(200).json(buildSampleStrategy(input));
    return;
  }
  try {
    const strategy = await generateWithGemini(input, apiKey);
    res.status(200).json(strategy);
  } catch (err) {
    console.error("strategy generation failed, serving sample fallback:", err);
    res.status(200).json(buildSampleStrategy(input));
  }
}
