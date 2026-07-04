import { UserInput, GrowthStrategy } from "../types";
import { buildDemoStrategy } from "../lib/demoStrategy";

/**
 * Requests a growth strategy from the serverless endpoint, which holds the
 * Gemini API key. The key never ships to the browser. If the endpoint is
 * unreachable (e.g. plain static hosting), a labeled sample is shown instead
 * so the widget always works.
 */
export const generateGrowthStrategy = async (
  input: UserInput,
): Promise<GrowthStrategy> => {
  try {
    const res = await fetch("/api/strategy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.status === 429) throw new Error("RATE_LIMITED");
    if (!res.ok) throw new Error(`Strategy endpoint failed (${res.status})`);
    return (await res.json()) as GrowthStrategy;
  } catch (err) {
    if (err instanceof Error && err.message === "RATE_LIMITED") throw err;
    console.error("Strategy endpoint unreachable — serving local sample:", err);
    return buildDemoStrategy(input);
  }
};
