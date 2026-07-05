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

interface Lead {
  name: string;
  email: string;
  phone: string;
  comments: string;
  source: string;
  context: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* One lead pipeline for the whole agency: the Outgrow site posts here,
   and client sites (e.g. the ZIHAY storefront) may post here cross-origin.
   Keep the allowlist tight — origins are checked exactly. */
const ALLOWED_ORIGINS = new Set([
  "https://zihay-preview.vercel.app",
  "https://zihay.vercel.app",
  "https://zihay.store",
  "https://www.zihay.store",
  "https://zihaywear.com",
  "https://www.zihaywear.com",
  "http://localhost:3000",
  "http://localhost:4173",
]);

function applyCors(req: ApiRequest, res: ApiResponse): void {
  const origin = String(req.headers.origin ?? "");
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
  }
}

function sanitizeLead(body: unknown): { lead: Lead | null; spam: boolean } {
  if (typeof body !== "object" || body === null)
    return { lead: null, spam: false };
  const b = body as Record<string, unknown>;
  // Honeypot: real users never fill this hidden field.
  if (typeof b.company === "string" && b.company.trim() !== "")
    return { lead: null, spam: true };
  const name = typeof b.name === "string" ? b.name.trim().slice(0, 120) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, 160) : "";
  const phone = typeof b.phone === "string" ? b.phone.trim().slice(0, 40) : "";
  const comments =
    typeof b.comments === "string" ? b.comments.trim().slice(0, 1000) : "";
  const source =
    typeof b.source === "string" && /^[a-z0-9-]{1,40}$/.test(b.source)
      ? b.source
      : "website";
  const context =
    typeof b.context === "string" ? b.context.trim().slice(0, 300) : "";
  if (!name || !EMAIL_RE.test(email)) return { lead: null, spam: false };
  return {
    lead: { name, email, phone, comments, source, context },
    spam: false,
  };
}

const SOURCE_LABELS: Record<string, string> = {
  website: "Outgrow website — contact form",
  "strategy-widget": "Outgrow website — AI strategy report",
  "zihay-newsletter": "ZIHAY storefront — newsletter signup",
};

function subjectFor(lead: Lead): string {
  const label = SOURCE_LABELS[lead.source] || `lead (${lead.source})`;
  return `New lead: ${lead.name} · ${label}`;
}

async function deliverToWebhook(lead: Lead, url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        receivedAt: new Date().toISOString(),
        ...lead,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("lead webhook delivery failed:", err);
    return false;
  }
}

async function deliverByEmail(
  lead: Lead,
  apiKey: string,
  to: string,
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from:
          process.env.LEAD_FROM_EMAIL ||
          "Outgrow Website <onboarding@resend.dev>",
        to: [to],
        reply_to: lead.email,
        subject: subjectFor(lead),
        text:
          `New enquiry via ${SOURCE_LABELS[lead.source] || lead.source}\n\n` +
          `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || "—"}\n` +
          (lead.context ? `\nContext: ${lead.context}\n` : "") +
          `\nMessage:\n${lead.comments || "—"}\n`,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("lead email delivery failed:", err);
    return false;
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  applyCors(req, res);
  if (req.method === "OPTIONS") {
    res.status(204).json(null);
    return;
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { lead, spam } = sanitizeLead(req.body);
  if (spam) {
    // Pretend success so bots learn nothing.
    res.status(200).json({ ok: true, delivered: [] });
    return;
  }
  if (!lead) {
    res.status(400).json({ error: "A name and a valid email are required." });
    return;
  }

  const delivered: string[] = [];
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  if (webhookUrl && (await deliverToWebhook(lead, webhookUrl)))
    delivered.push("webhook");
  if (
    resendKey &&
    (await deliverByEmail(
      lead,
      resendKey,
      process.env.LEAD_TO_EMAIL || "info@outgrowagency.com",
    ))
  ) {
    delivered.push("email");
  }
  console.log(
    `lead [${lead.source}] from ${lead.email}${lead.context ? ` (${lead.context})` : ""}; delivered via: ${delivered.join(", ") || "none configured"}`,
  );
  res.status(200).json({ ok: true, delivered });
}
