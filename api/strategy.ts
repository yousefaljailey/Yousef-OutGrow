import { buildDemoStrategy } from "../lib/demoStrategy";
import type { GrowthStrategy, UserInput } from "../types";

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
