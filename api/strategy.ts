/* Self-contained by design: with "type": "module", Vercel's Node runtime
   resolves relative imports strictly (extension required), so this function
   carries its own copies of the types and the demo fallback. The client-side
   twin of the fallback lives in lib/demoStrategy.ts. */

interface UserInput {
  businessName: string;
  industry: string;
  mainChallenge: string;
}
interface GrowthStrategy {
  demo?: boolean;
  headline: string;
  summary: string;
  recommendations: { title: string; action: string; category: string }[];
}

function buildDemoStrategy(input: UserInput): GrowthStrategy {
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

const STRATEGY_SCHEMA = {
  type: "OBJECT",
  properties: {
    headline: { type: "STRING" },
    summary: { type: "STRING" },
    recommendations: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          action: { type: "STRING" },
          category: { type: "STRING" },
        },
        required: ["title", "action", "category"],
      },
    },
  },
  required: ["headline", "summary", "recommendations"],
};

async function generateWithGemini(
  input: UserInput,
  apiKey: string,
): Promise<GrowthStrategy> {
  const model = process.env.GEMINI_MODEL || "gemini-3-pro-preview";
  const prompt =
    `Act as a senior growth consultant at Outgrow, a marketing, advertising and event management agency in Doha, Qatar. ` +
    `Based on the following business details, provide a high-level growth strategy.\n` +
    `Business Name: ${input.businessName}\n` +
    `Industry: ${input.industry}\n` +
    `Main Challenge: ${input.mainChallenge || "not specified"}\n\n` +
    `The response must be specific to Outgrow's core expertise: business growth strategy, marketing & brand development, ` +
    `social media & digital presence, content creation & campaign execution, and business development support. ` +
    `Keep the headline under 10 words and provide 3 to 5 recommendations.`;

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
          thinkingConfig: { thinkingBudget: 2048 },
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
  return JSON.parse(text) as GrowthStrategy;
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
    res.status(200).json(buildDemoStrategy(input));
    return;
  }
  try {
    const strategy = await generateWithGemini(input, apiKey);
    res.status(200).json(strategy);
  } catch (err) {
    console.error("strategy generation failed, serving demo fallback:", err);
    res.status(200).json(buildDemoStrategy(input));
  }
}
