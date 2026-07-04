import { UserInput, GrowthStrategy } from "../types";

/**
 * Deterministic sample strategy used when no GEMINI_API_KEY is configured
 * (server) or the strategy endpoint is unreachable (client fallback).
 * Marked with demo: true so the UI can label it as a sample preview.
 */
export function buildDemoStrategy(input: UserInput): GrowthStrategy {
  const name = input.businessName.trim() || "Your business";
  const industry = input.industry.trim() || "your industry";
  const challenge = input.mainChallenge.trim();

  const challengeLine = challenge
    ? `The immediate priority is the challenge you named — “${challenge}” — and every recommendation below is sequenced to relieve it first.`
    : `With no single blocker named, the plan below focuses on the highest-leverage growth foundations first.`;

  return {
    demo: true,
    headline: `A 90-day growth runway for ${name}`,
    summary:
      `${name} is operating in ${industry}, where attention is won by brands that show up consistently and measure everything. ` +
      `${challengeLine} This preview shows the shape of a full Outgrow engagement: positioning first, then presence, then pipeline.`,
    recommendations: [
      {
        category: "Brand & Positioning",
        title: "Sharpen the one-line promise",
        action: `Define the single claim ${name} can own in ${industry}, then align every touchpoint — profile bios, pitch decks, signage, ad copy — to repeat it verbatim for 90 days.`,
      },
      {
        category: "Social & Digital Presence",
        title: "Publish on a fixed cadence",
        action:
          "Commit to a realistic weekly rhythm (e.g. 3 posts + 1 story-driven piece) built from one monthly content session, so the brand stays visible without daily effort.",
      },
      {
        category: "Campaign Execution",
        title: "Run one measurable flagship campaign",
        action: `Concentrate budget into a single campaign with one goal and one audience, instrumented end-to-end — a clean baseline that tells ${name} exactly what a lead costs.`,
      },
      {
        category: "Business Development",
        title: "Systemise the follow-up",
        action:
          "Route every enquiry into one tracked pipeline with a 48-hour response rule; in most GCC service niches the fastest responder wins the deal.",
      },
    ],
  };
}
