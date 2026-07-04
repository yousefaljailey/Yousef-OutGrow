import { UserInput, GrowthStrategy } from "../types";

/**
 * Slim offline fallback, used ONLY when /api/strategy is unreachable
 * (e.g. plain static hosting). The full sample engine — with vertical
 * and challenge intelligence — lives server-side in api/strategy.ts;
 * this mirror keeps the widget alive with the same report shape.
 */
export function buildDemoStrategy(input: UserInput): GrowthStrategy {
  const name = input.businessName.trim() || "Your business";
  const industry = input.industry.trim() || "your industry";
  const challenge = input.mainChallenge.trim();

  return {
    demo: true,
    headline: `A 90-day growth runway for ${name}`,
    positioning: `${name} stands for one specific promise, repeated identically across every touchpoint until the market can finish the sentence.`,
    targetSegment: `One tightly defined first segment in ${industry} — won completely before widening.`,
    summary:
      `${name} operates in ${industry}.` +
      (challenge
        ? ` The stated challenge — “${challenge}” — sets the priority stage below.`
        : " With no single blocker named, the plan installs the full growth loop.") +
      " Qatar is one of the world's most social markets (≈96% of the population active; WhatsApp is the default business channel), so the plan is sequenced for GCC behaviour and judged against published 2026 benchmarks.",
    funnel: [
      {
        stage: "Reach",
        focus:
          "Priority — concentrate on the two channels where the audience already is; depth beats presence-everywhere.",
        tactics: [
          "Fixed weekly publishing cadence built from one monthly content session",
          "Bilingual AR/EN creative planned around Ramadan, the Eids, and National Day",
        ],
        kpi: "Reach within target segment & branded-search growth",
        benchmark:
          "Meta feed CTR ≈1.4–2.2%; Google Search CTR ≈3.2–3.8% (2026)",
      },
      {
        stage: "Act",
        focus: "One frictionless path from attention to enquiry.",
        tactics: [
          "Every click lands on one conversion-focused page with a WhatsApp button",
          "First-party list building (WhatsApp/email) with a genuine incentive",
        ],
        kpi: "Enquiries / opt-ins per week",
        benchmark: "Landing conversion ≈2–4% of visitors; reply in <5 minutes",
      },
      {
        stage: "Convert",
        focus: "Close the warm pool with retargeting and follow-up discipline.",
        tactics: [
          "Retarget engaged visitors within 7 days",
          "5-minute response SLA during business hours",
        ],
        kpi: "Conversion rate & cost per acquisition",
        benchmark:
          "Search CVR ≈3.8–4.4%; median Meta ROAS ≈1.9× (scale winners past 3×)",
      },
      {
        stage: "Engage",
        focus: "Turn first purchases into a compounding base.",
        tactics: [
          "Weekly WhatsApp/email rhythm to the opt-in list",
          "Systematic reviews & referrals at the happiest customer moment",
        ],
        kpi: "Repeat rate & review velocity",
        benchmark:
          "Email open ≈20–35%; GCC WhatsApp read rates reported >85%; LTV:CAC ≥3:1",
      },
    ],
    budgetSplit: {
      brand: 60,
      activation: 40,
      note: "Anchored to IPA effectiveness evidence (Binet & Field ≈60/40 for consumer brands); adjust by lifecycle, not by mood.",
    },
    roadmap: [
      {
        phase: "Days 1–30",
        theme: "Foundations & measurement",
        actions: [
          "Lock positioning and distinctive assets",
          "Instrument pixels, UTMs, WhatsApp lines",
          "Ship the first campaign wave",
        ],
      },
      {
        phase: "Days 31–60",
        theme: "Prove & iterate",
        actions: [
          "Weekly reads against benchmarks; kill losers, feed winners",
          "Second creative wave from what resonated",
          "Stand up the owned-audience cadence",
        ],
      },
      {
        phase: "Days 61–90",
        theme: "Systematize & scale",
        actions: [
          "Codify winners into playbooks",
          "Rebalance toward the 60/40 split",
          "Expand to the next channel or segment",
        ],
      },
    ],
    northStar:
      "Repeat customers per month — the number that proves the flywheel.",
    quickWins: [
      "Complete the Google Business Profile and add WhatsApp click-to-chat everywhere",
      "Install pixels + UTM discipline so every dirham is attributable",
      "Launch one broadcast to existing customers this week",
    ],
    frameworks: [
      "STP positioning",
      "RACE journey",
      "IPA 60/40 (Binet & Field)",
    ],
  };
}
