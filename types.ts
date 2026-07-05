export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

/* ── Growth strategy (v2) ──────────────────────────────────────
   The strategy report is structured around the frameworks working
   marketers actually plan with:
   - STP  → positioning + targetSegment
   - RACE → funnel stages (Reach / Act / Convert / Engage)
   - IPA evidence (Binet & Field 60/40) → budgetSplit
   - 90-day execution → roadmap
   Produced identically by the live Gemini path and the built-in
   sample engine in api/strategy.ts. */

export interface FunnelStage {
  stage: string; // Reach | Act | Convert | Engage
  focus: string; // what this stage must achieve for this business
  tactics: string[]; // concrete, channel-specific moves
  kpi: string; // the metric that proves the stage works
  benchmark: string; // published range to judge it against
}

export interface RoadmapPhase {
  phase: string; // "Days 1–30" | "Days 31–60" | "Days 61–90"
  theme: string;
  actions: string[];
}

export interface GrowthStrategy {
  /** True when this is a generated sample (no live AI key configured). */
  demo?: boolean;
  headline: string;
  positioning: string; // one-line ownable positioning statement
  targetSegment: string; // the beachhead audience and why
  summary: string;
  funnel: FunnelStage[];
  budgetSplit: { brand: number; activation: number; note: string };
  roadmap: RoadmapPhase[];
  northStar: string;
  quickWins: string[];
  frameworks: string[]; // theory anchors shown as chips in the UI
}

export interface UserInput {
  businessName: string;
  industry: string;
  mainChallenge: string;
}
