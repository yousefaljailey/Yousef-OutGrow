import React, { useState, useEffect, useRef, useCallback } from "react";
import { SERVICES, PACKAGES } from "./constants.tsx";
import { UserInput, GrowthStrategy as StrategyType } from "./types.ts";
import { generateGrowthStrategy } from "./services/geminiService.ts";

type View =
  | "home"
  | "about"
  | "privacy"
  | "terms"
  | "service-marketing"
  | "service-events"
  | "works";

/* ─────────────────────────────────────────────
   Utility hooks
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = target / (duration / 16);
          let cur = 0;
          const timer = setInterval(() => {
            cur = Math.min(cur + step, target);
            setCount(Math.floor(cur));
            if (cur >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ─────────────────────────────────────────────
   Word Cycler
───────────────────────────────────────────── */
const CYCLE_WORDS = ["Campaigns.", "Events.", "Stories.", "Impact."];

const WordCycler = () => {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % CYCLE_WORDS.length);
      setKey((k) => k + 1);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span key={key} className="word-cycle-anim" style={{ color: "#059669" }}>
      {CYCLE_WORDS[idx]}
    </span>
  );
};

/* ─────────────────────────────────────────────
   Floating Hero Stats (21st.dev-inspired)
───────────────────────────────────────────── */
const FloatingHeroStats = () => {
  const { count: c1, ref: r1 } = useCountUp(48);
  const { count: c2, ref: r2 } = useCountUp(2);
  return (
    <div className="relative h-[420px] w-full select-none" aria-hidden="true">
      <div className="stat-card float-a" style={{ top: "4%", left: "5%" }}>
        <span className="stat-card-dot" />
        <span
          className="text-[9px] font-black uppercase tracking-widest"
          style={{ color: "#059669" }}
        >
          Proposals
        </span>
        <div className="stat-card-num" ref={r1}>
          {c1}h
        </div>
        <div className="stat-card-label">Proposal Turnaround</div>
      </div>
      <div className="stat-card float-b" style={{ top: "30%", right: "2%" }}>
        <span className="stat-card-dot" />
        <span
          className="text-[9px] font-black uppercase tracking-widest"
          style={{ color: "#059669" }}
        >
          Launch
        </span>
        <div className="stat-card-num" ref={r2}>
          {c2}wk
        </div>
        <div className="stat-card-label">Standard Campaign Launch</div>
      </div>
      <div className="stat-card float-c" style={{ bottom: "6%", left: "18%" }}>
        <span className="stat-card-dot" />
        <span
          className="text-[9px] font-black uppercase tracking-widest"
          style={{ color: "#059669" }}
        >
          Coverage
        </span>
        <div className="stat-card-num">GCC</div>
        <div className="stat-card-label">Qatar + Regional Reach</div>
      </div>
      {/* Decorative emerald ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(5,150,105,0.08)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(5,150,105,0.06)" }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   Marquee Ticker
───────────────────────────────────────────── */
const TICKER_ITEMS = [
  "ADVERTISING",
  "PR",
  "BRAND MANAGEMENT",
  "EVENT MANAGEMENT",
  "DOHA · QATAR",
  "OUTGROW AGENCY",
  "TRADE SHOWS",
  "CONFERENCES",
  "DIGITAL MEDIA",
  "BROADCAST",
  "CREATIVE STRATEGY",
];

const MarqueeTicker = () => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-[#0A0A0A] py-4 overflow-hidden border-y border-gray-900 select-none">
      <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.25em] text-gray-600"
          >
            {item}
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#059669" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Animated Stat
───────────────────────────────────────────── */
const AnimStat = ({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) => {
  const { count, ref } = useCountUp(target);
  return (
    <div className="text-center group">
      <div
        className="stat-num font-black text-white mb-2 tabular-nums"
        ref={ref}
      >
        {count}
        {suffix}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 group-hover:text-[#059669] transition-colors duration-300">
        {label}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Stats Strip
───────────────────────────────────────────── */
const StatsStrip = () => (
  <section className="py-20 px-6 md:px-12 bg-[#0A0A0A] reveal">
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-800">
        <AnimStat target={48} suffix="h" label="Proposal Turnaround" />
        <AnimStat target={2} suffix="wk" label="Standard Campaign Launch" />
        <AnimStat target={6} suffix="" label="Specialist Service Lines" />
        <AnimStat target={2} suffix="" label="Revision Rounds Included" />
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Service Calculator
───────────────────────────────────────────── */
const CALC_SERVICES = [
  {
    id: "marketing",
    label: "Advertising & PR",
    sub: "Campaigns, brand consultancy, media placement",
  },
  {
    id: "events",
    label: "Event Management",
    sub: "Trade shows, conferences, corporate events",
  },
  { id: "both", label: "Full-Service", sub: "Advertising + events combined" },
];
const CALC_SCALES = [
  {
    id: "launch",
    label: "Launch",
    sub: "New brand or first campaign",
    weeks: "2–4",
    pkg: "Brand Essentials",
  },
  {
    id: "growth",
    label: "Growth",
    sub: "Active business, ready to scale",
    weeks: "4–8",
    pkg: "Full-Scale Marketing",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    sub: "Large brand or major event",
    weeks: "8–16",
    pkg: "Event + Brand",
  },
];

const ServiceCalculator = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [service, setService] = useState("");
  const [scale, setScale] = useState("");

  const selectedScale = CALC_SCALES.find((s) => s.id === scale);
  const selectedService = CALC_SERVICES.find((s) => s.id === service);

  const reset = () => {
    setStep(1);
    setService("");
    setScale("");
  };

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#D1FAE5]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 reveal">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: "#059669" }}
          >
            Scope Your Project
          </h2>
          <h3 className="text-display font-black tracking-tighter text-[#0A0A0A]">
            Find the right fit.
          </h3>
          <p className="text-gray-600 mt-4 font-light max-w-lg">
            Answer two quick questions — we'll match you with the right service
            scope and timeline.
          </p>
        </div>

        <div className="max-w-3xl reveal-scale">
          {/* Progress */}
          <div className="flex gap-2 mb-12">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex-1 h-0.5 bg-gray-300 overflow-hidden rounded-full"
              >
                <div
                  className="progress-fill rounded-full"
                  style={{ width: step >= n ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-8">
                Step 01 — What service do you need?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CALC_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setService(s.id);
                      setStep(2);
                    }}
                    className="calc-tab btn-lift text-left p-8 border-2 border-[#0A0A0A] bg-white group"
                  >
                    <span className="block text-base font-black tracking-tighter text-[#0A0A0A] group-hover:text-white mb-2">
                      {s.label}
                    </span>
                    <span className="block text-xs text-gray-500 group-hover:text-green-100 font-light leading-relaxed">
                      {s.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-8">
                Step 02 — What's your scale?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {CALC_SCALES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setScale(s.id);
                      setStep(3);
                    }}
                    className="calc-tab btn-lift text-left p-8 border-2 border-[#0A0A0A] bg-white group"
                  >
                    <span className="block text-base font-black tracking-tighter text-[#0A0A0A] group-hover:text-white mb-2">
                      {s.label}
                    </span>
                    <span className="block text-xs text-gray-500 group-hover:text-green-100 font-light leading-relaxed">
                      {s.sub}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#0A0A0A] transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          {step === 3 && selectedScale && selectedService && (
            <div className="bg-[#0A0A0A] p-10 md:p-14 text-white">
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em] mb-8"
                style={{ color: "#059669" }}
              >
                Your Recommendation
              </p>
              <h4 className="text-3xl font-black tracking-tighter mb-2">
                {selectedScale.pkg}
              </h4>
              <p className="text-gray-400 font-light mb-10">
                {selectedService.label} · {selectedScale.label} scope
              </p>
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-800 p-6">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-gray-600 mb-2">
                    Est. Timeline
                  </span>
                  <span className="text-2xl font-black">
                    {selectedScale.weeks} weeks
                  </span>
                </div>
                <div className="border border-gray-800 p-6">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-gray-600 mb-2">
                    Investment
                  </span>
                  <span className="text-2xl font-black">Custom Quote</span>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#contact"
                  className="btn-lift inline-block py-4 px-10 text-[11px] font-black uppercase tracking-[0.2em] text-[#0A0A0A] bg-white hover:bg-[#059669] hover:text-white transition-colors"
                >
                  Get a Quote
                </a>
                <button
                  onClick={reset}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors py-4"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   FAQ Accordion
───────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "What types of businesses do you work with?",
    a: "We work with startups, SMEs, and established brands across a wide range of industries in Qatar and the wider GCC region. Whether you're launching a new brand, running an annual conference, or scaling your advertising campaigns — we have the experience to deliver.",
  },
  {
    q: "How long does an advertising campaign take to launch?",
    a: "Standard campaigns are delivered within 2 weeks from project kick-off and receipt of required content. Timelines may vary based on complexity, media channels, and client approval cycles. We'll provide a clear timeline at project start.",
  },
  {
    q: "Do you manage events outside of Qatar?",
    a: "Our core operations are based in Doha, Qatar, with deep knowledge of the local regulatory environment, venues, and suppliers. For events outside Qatar, we can coordinate on a case-by-case basis — contact us to discuss your specific requirements.",
  },
  {
    q: "What's the difference between your packages?",
    a: "Brand Essentials is suited for businesses establishing their presence. Full-Scale Marketing is our most comprehensive advertising package for growing brands. Event + Brand combines both advertising and event management for businesses running activations or conferences. All packages are custom-scoped to your exact needs.",
  },
  {
    q: "How do I get started with Outgrow?",
    a: "Simply reach out via our contact form or email us at info@outgrowagency.com. We'll schedule a discovery call to understand your objectives, then come back with a scoped proposal within 48 hours.",
  },
];

const FAQItem: React.FC<{
  item: (typeof FAQ_ITEMS)[0];
  isOpen: boolean;
  toggle: () => void;
}> = ({ item, isOpen, toggle }) => (
  <div className="border-t border-gray-200">
    <button
      onClick={toggle}
      className="w-full flex items-start justify-between py-8 text-left group"
    >
      <span className="text-lg font-bold text-[#0A0A0A] pr-8 group-hover:text-[#059669] transition-colors duration-300">
        {item.q}
      </span>
      <span
        className={`accordion-chevron flex-shrink-0 w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-[#059669] group-hover:text-[#059669] transition-colors ${isOpen ? "open" : ""}`}
        style={{
          transition:
            "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, color 0.3s",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1v10M1 6h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
    <div className={`accordion-body ${isOpen ? "open" : ""}`}>
      <p className="text-gray-500 font-light leading-relaxed pb-8 max-w-2xl">
        {item.a}
      </p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 reveal-left">
            <h2
              className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
              style={{ color: "#059669" }}
            >
              FAQ
            </h2>
            <h3 className="text-display font-black tracking-tighter text-[#0A0A0A] mb-8">
              Common questions.
            </h3>
            <p className="text-gray-500 font-light leading-relaxed">
              Everything you need to know before working with us. Can't find
              your answer?{" "}
              <a
                href="#contact"
                className="font-bold text-[#0A0A0A] border-b border-[#0A0A0A] hover:text-[#059669] hover:border-[#059669] transition-colors"
              >
                Contact us directly.
              </a>
            </p>
          </div>
          <div className="lg:col-span-8 reveal-right">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={String(i)}
                item={item}
                isOpen={openIdx === i}
                toggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Header
───────────────────────────────────────────── */
const Header = ({
  setView,
  currentView,
}: {
  setView: (v: View) => void;
  currentView: View;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b duration-500 ${scrolled ? "border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : "border-gray-100"}`}
      style={{ transition: "border-color 500ms ease, box-shadow 500ms ease" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <button
          onClick={() => setView("home")}
          aria-label="Outgrow — go to homepage"
          className="flex items-center space-x-2.5 outline-none group"
        >
          <div
            className="w-7 h-7 flex items-center justify-center group-hover:scale-110"
            style={{
              background: "#059669",
              transition: "transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <span className="text-white font-black text-sm">O</span>
          </div>
          <span className="text-lg font-black tracking-tighter uppercase text-[#0A0A0A]">
            outgrow
          </span>
        </button>

        <nav
          className="hidden lg:flex items-center space-x-10 text-[12px] font-black uppercase tracking-[0.15em] text-gray-400"
          aria-label="Main navigation"
        >
          <button
            onClick={() => setView("about")}
            aria-current={currentView === "about" ? "page" : undefined}
            className={`transition-colors duration-200 ${currentView === "about" ? "text-[#0A0A0A]" : "hover:text-[#0A0A0A]"}`}
          >
            Who we are
          </button>

          <div className="relative group">
            <button
              aria-haspopup="true"
              className={`flex items-center gap-1.5 transition-colors duration-200 ${currentView === "service-marketing" || currentView === "service-events" ? "text-[#0A0A0A]" : "hover:text-[#0A0A0A]"}`}
            >
              Services
              <svg
                className="w-3 h-3 group-hover:rotate-180"
                style={{ transition: "transform 300ms ease" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 translate-y-2"
              style={{
                transition:
                  "opacity 200ms ease, visibility 200ms ease, transform 200ms ease",
              }}
              role="menu"
            >
              <button
                onClick={() => setView("service-marketing")}
                role="menuitem"
                className="w-full text-left px-6 py-5 border-b border-gray-50 group/item"
                style={{
                  transition: "background 300ms ease, color 300ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#0A0A0A";
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.color = "";
                }}
              >
                <span
                  className="block text-[9px] font-black uppercase tracking-widest mb-1.5"
                  style={{ color: "#059669" }}
                >
                  01
                </span>
                <span className="block text-[13px] font-bold normal-case tracking-normal mb-1">
                  Advertising, PR & Brand Management
                </span>
                <span className="block text-[11px] text-gray-400 normal-case tracking-normal font-normal">
                  Marketing consultancy, ad design & placement
                </span>
              </button>
              <button
                onClick={() => setView("service-events")}
                role="menuitem"
                className="w-full text-left px-6 py-5"
                style={{
                  transition: "background 300ms ease, color 300ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#0A0A0A";
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.color = "";
                }}
              >
                <span
                  className="block text-[9px] font-black uppercase tracking-widest mb-1.5"
                  style={{ color: "#059669" }}
                >
                  02
                </span>
                <span className="block text-[13px] font-bold normal-case tracking-normal mb-1">
                  Event Management Services
                </span>
                <span className="block text-[11px] text-gray-400 normal-case tracking-normal font-normal">
                  Trade shows, conferences & corporate events
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={() => setView("works")}
            aria-current={currentView === "works" ? "page" : undefined}
            className={`transition-colors duration-200 ${currentView === "works" ? "text-[#0A0A0A]" : "hover:text-[#0A0A0A]"}`}
          >
            Works
          </button>

          {currentView !== "home" && (
            <button
              onClick={() => setView("home")}
              className="hover:text-[#0A0A0A] transition-colors duration-200"
            >
              Home
            </button>
          )}
        </nav>

        <a
          href="#contact"
          className="btn-lift hidden md:block text-[11px] font-black uppercase tracking-[0.15em] border-b-2 pb-1"
          style={{
            borderColor: "#0A0A0A",
            color: "#0A0A0A",
            transition: "color 250ms ease, border-color 250ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#059669";
            (e.currentTarget as HTMLElement).style.borderColor = "#059669";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
            (e.currentTarget as HTMLElement).style.borderColor = "#0A0A0A";
          }}
        >
          Contact
        </a>
      </div>
    </header>
  );
};

/* ─────────────────────────────────────────────
   Home Page
───────────────────────────────────────────── */
const HomePage = ({ setView }: { setView: (v: View) => void }) => (
  <>
    {/* Hero */}
    <section className="min-h-screen flex items-center pt-20 px-6 md:px-12 hero-grid relative overflow-hidden bg-white">
      <div className="grain-overlay" />
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — text */}
          <div className="lg:col-span-7 reveal">
            <span
              className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
              style={{ color: "#059669" }}
            >
              <span className="w-8 h-px" style={{ background: "#059669" }} />
              Doha, Qatar · Advertising · Events
            </span>
            <h1 className="text-huge font-black text-[#0A0A0A] mb-6 leading-none">
              We build
              <br />
              <WordCycler />
              <br />
              <span style={{ color: "#6B7280" }}>for your market.</span>
            </h1>
            <p
              className="max-w-xl text-xl md:text-2xl font-light leading-snug mt-8"
              style={{ color: "#6B7280" }}
            >
              Outgrow is a marketing, advertising, and event management company
              based in Doha, Qatar. We build brands that get noticed and create
              events that leave a lasting impression.
            </p>
            <div className="flex flex-wrap gap-4 mt-12">
              <a
                href="#contact"
                className="btn-lift bg-[#0A0A0A] text-white px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]"
                style={{
                  transition:
                    "background 250ms ease, transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#059669")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#0A0A0A")
                }
              >
                Get a Proposal
              </a>
              <a
                href="#capabilities"
                className="btn-lift px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0A0A0A]"
                style={{
                  border: "2px solid #0A0A0A",
                  transition:
                    "border-color 250ms ease, color 250ms ease, transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#059669";
                  (e.currentTarget as HTMLElement).style.color = "#059669";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#0A0A0A";
                  (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
                }}
              >
                Our Services
              </a>
            </div>
          </div>
          {/* Right — floating stat cards */}
          <div className="hidden lg:block lg:col-span-5">
            <FloatingHeroStats />
          </div>
        </div>
      </div>
    </section>

    {/* Marquee */}
    <MarqueeTicker />

    {/* Stats */}
    <StatsStrip />

    {/* Capabilities */}
    <section
      id="capabilities"
      className="py-32 md:py-48 px-6 md:px-12 bg-[#0A0A0A] text-white"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-24 reveal">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: "#059669" }}
          >
            What we do
          </h2>
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter">
            Capabilities
          </h3>
        </div>
        <div className="grid grid-cols-1">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`capability-group border-t border-gray-800 py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between group reveal stagger-${i + 1}`}
            >
              <div className="flex items-center space-x-10 mb-6 lg:mb-0">
                <span
                  className="text-[10px] font-black tabular-nums"
                  style={{ color: "#059669" }}
                >
                  0{i + 1}
                </span>
                <h4 className="cap-underline text-3xl md:text-4xl font-black tracking-tighter group-hover:text-[#059669] transition-colors duration-300">
                  {service.title}
                </h4>
              </div>
              <div className="lg:max-w-md">
                <p className="text-gray-400 text-base leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border group-hover:border-[#059669]/40 group-hover:text-[#059669]"
                      style={{
                        borderColor: "#374151",
                        color: "#6B7280",
                        transition: "border-color 300ms ease, color 300ms ease",
                      }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>

    {/* Packages */}
    <section id="packages" className="py-32 md:py-48 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-24 reveal">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: "#059669" }}
          >
            Growth Plans
          </h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0A0A0A]">
            Structured for success.
          </h3>
        </div>
        <div className="flex flex-col items-center space-y-12">
          {PACKAGES.map((pkg, i) => (
            <div
              key={i}
              className={`w-full max-w-5xl group card-3d reveal stagger-${i + 1}`}
            >
              <div
                className="flex flex-col md:flex-row md:items-stretch border-2 border-gray-100 group-hover:border-[#0A0A0A]"
                style={{ transition: "border-color 500ms ease" }}
              >
                <div className="p-10 md:p-16 flex-1 bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-[#0A0A0A]">
                      {pkg.name}
                    </h3>
                    {pkg.isPopular && (
                      <span
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 text-white"
                        style={{ background: "#059669" }}
                      >
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
                    {pkg.description}
                  </p>
                  <div className="text-4xl font-black text-[#0A0A0A]">
                    {pkg.price}
                  </div>
                </div>
                <div
                  className="p-10 md:p-16 flex-1 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 group-hover:bg-white"
                  style={{ transition: "background 500ms ease" }}
                >
                  <h4 className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 mb-8">
                    Engagement Details
                  </h4>
                  <ul className="space-y-4 mb-12">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm font-medium text-gray-700"
                      >
                        <div
                          className="w-1.5 h-1.5 mr-4 flex-shrink-0"
                          style={{ background: "#059669" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="btn-lift inline-block w-full text-center py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:opacity-90"
                    style={{ background: "#0A0A0A" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = "#059669";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = "#0A0A0A";
                    }}
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Service Calculator */}
    <ServiceCalculator />

    {/* Presence Grader */}
    <PresenceGrader />

    {/* AI Insights */}
    <AIInsights />

    {/* FAQ */}
    <FAQSection />

    {/* Google Maps */}
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 reveal">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: "#059669" }}
          >
            Find Us
          </h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Our Office
          </h3>
          <p className="text-gray-500 font-light mt-4">
            Floor 16, Tornado Tower · West Bay, Doha, Qatar
          </p>
        </div>
        <div
          className="map-container reveal-scale overflow-hidden"
          style={{ height: "480px" }}
        >
          <iframe
            title="Outgrow Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2!2d51.532879!3d25.286732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x1f2a3b4c5d6e7f8a!2sTornado+Tower%2C+West+Bay%2C+Doha%2C+Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 mt-px">
          {[
            {
              label: "Address",
              value: "Tornado Tower, Floor 16\nWest Bay, Doha, Qatar",
            },
            { label: "Email", value: "info@outgrowagency.com" },
            { label: "Phone", value: "+974 5595 4896" },
          ].map((item, i) => (
            <div key={i} className="bg-[#0A0A0A] px-8 py-8">
              <span
                className="block text-[9px] font-black uppercase tracking-widest mb-3"
                style={{ color: "#059669" }}
              >
                {item.label}
              </span>
              <span className="block text-white font-bold whitespace-pre-line">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

/* ─────────────────────────────────────────────
   About Page
───────────────────────────────────────────── */
const AboutPage = () => (
  <section className="pt-40 pb-32 px-6 md:px-12 bg-white">
    <div className="max-w-[1440px] mx-auto">
      <div className="reveal">
        <h2
          className="text-xs font-bold uppercase tracking-[0.3em] mb-12"
          style={{ color: "#059669" }}
        >
          Who we are
        </h2>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#0A0A0A] mb-16">
          About Us
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
        <div className="lg:col-span-5 reveal-left">
          <p className="text-3xl md:text-4xl font-light leading-tight text-gray-400 mb-8">
            At Outgrow, we help brands move from{" "}
            <span className="text-[#0A0A0A] font-medium">
              potential to performance.
            </span>
          </p>
        </div>
        <div className="lg:col-span-7 space-y-8 text-xl text-gray-600 font-light leading-relaxed reveal-right">
          <p>
            We are a marketing, advertising, and event management company built
            to help brands make an impact — through compelling advertising
            across all media and expertly managed events that create real
            connections.
          </p>
          <p>
            We believe great brands are built through consistent, well-placed
            messaging — and great relationships are forged at well-run events.
            That's why we work closely with our clients as partners, not just
            service providers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
        <div className="border-t-2 border-[#0A0A0A] pt-12 reveal-left">
          <h3
            className="text-xs font-black uppercase tracking-[0.3em] mb-8"
            style={{ color: "#059669" }}
          >
            What We Do
          </h3>
          <div className="space-y-8">
            {[
              {
                title: "Marketing & brand management consultancy",
                desc: "Strategic brand guidance tailored to your market.",
              },
              {
                title: "Advertising design, creation & placement",
                desc: "Creative that performs across every format and channel.",
              },
              {
                title: "Print, broadcast & digital media advertising",
                desc: "Reaching your audience wherever they are.",
              },
              {
                title: "PR & advertising material distribution",
                desc: "Getting your message out through the right channels.",
              },
              {
                title: "Event organization, promotion & management",
                desc: "End-to-end event delivery from brief to execution.",
              },
              {
                title: "Trade shows, conferences & corporate meetings",
                desc: "Professional events that make the right impression.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group cursor-default border-b border-gray-100 pb-6 last:border-0"
              >
                <h4 className="text-lg font-bold tracking-tighter mb-1 group-hover:text-[#059669] transition-colors duration-300 text-[#0A0A0A]">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-[#0A0A0A] pt-12 reveal-right">
          <h3
            className="text-xs font-black uppercase tracking-[0.3em] mb-8"
            style={{ color: "#059669" }}
          >
            Our Approach
          </h3>
          <p className="text-gray-500 mb-10 font-light">
            No generic templates. No guesswork. Just clear direction and
            measurable results.
          </p>
          <ul className="space-y-6">
            {[
              "Understanding your business first",
              "Creating strategies that are practical and scalable",
              "Executing with clarity and accountability",
              "Tracking results and continuously improving",
            ].map((item, i) => (
              <li
                key={i}
                className={`text-xl font-medium text-[#0A0A0A] flex items-start group cursor-default hover:text-[#059669] transition-colors duration-300 reveal stagger-${i + 1}`}
              >
                <span
                  className="w-1.5 h-1.5 mt-2.5 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"
                  style={{ background: "#059669" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#0A0A0A] text-white p-12 md:p-24 mb-32 reveal-scale">
        <h3
          className="text-xs font-black uppercase tracking-[0.3em] mb-12"
          style={{ color: "#059669" }}
        >
          Why Outgrow?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {[
            {
              title: "Strategic thinking backed by execution",
              desc: "We don't just plan; we deliver the results we promise.",
            },
            {
              title: "Modern tools and creative solutions",
              desc: "Leveraging the latest in tech and creativity.",
            },
            {
              title: "Clear communication and transparency",
              desc: "Honesty is the bedrock of our partnerships.",
            },
            {
              title: "Long-term growth focus",
              desc: "Building sustainable value, not short-term hype.",
            },
            {
              title: "Results-driven mindset",
              desc: "Metrics that matter to your bottom line.",
            },
          ].map((item, i) => (
            <div key={i} className="group">
              <h4 className="text-lg font-bold mb-2 group-hover:text-[#059669] transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm font-light">{item.desc}</p>
            </div>
          ))}
          <p
            className="text-xl font-black tracking-tighter pt-4"
            style={{ color: "#059669" }}
          >
            We don't just help businesses look good — we help them outgrow their
            limits.
          </p>
        </div>
      </div>

      <div className="mb-32 reveal active">
        <h3
          className="text-xs font-black uppercase tracking-[0.3em] mb-4"
          style={{ color: "#059669" }}
        >
          The Outgrow Playbook
        </h3>
        <p className="text-3xl md:text-4xl font-black tracking-tighter text-[#0A0A0A] mb-4">
          Twelve disciplines. Every engagement.
        </p>
        <p className="text-gray-500 font-light max-w-2xl mb-14">
          The same operating system our AI strategy preview runs on — applied by
          humans, measured in numbers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
          {[
            {
              t: "Data before opinions",
              d: "Analytics, platform insights and customer feedback make the decisions; hunches only propose.",
            },
            {
              t: "Segment & personalize",
              d: "Audiences split by behaviour and need — every segment gets its own message, never one blast for all.",
            },
            {
              t: "Content that earns attention",
              d: "Blogs, video and guides that answer real questions — and compound through search over time.",
            },
            {
              t: "Community over broadcast",
              d: "Replies, polls, live moments and user-generated content that make the audience part of the brand.",
            },
            {
              t: "Email & WhatsApp lifecycles",
              d: "Segmented lists and behaviour-triggered flows — welcome, abandoned cart, win-back — measured in revenue.",
            },
            {
              t: "Search, both halves",
              d: "SEO for the demand that already exists, SEM for the demand you want next; keywords chosen from data.",
            },
            {
              t: "Credible influencer partnerships",
              d: "Creators matched to brand values and audience, briefed for authenticity, tracked for actual ROI.",
            },
            {
              t: "AI & automation",
              d: "Chatbots for first response, predictive analytics, automated reporting — humans stay on the judgment calls.",
            },
            {
              t: "Always be testing",
              d: "A/B tests on hooks, CTAs, subject lines and landing pages; the numbers pick the winners.",
            },
            {
              t: "KPIs, not vanity metrics",
              d: "CAC, conversion rate, ROI and retention on one dashboard, reviewed on a fixed rhythm.",
            },
            {
              t: "One brand, every channel",
              d: "A consistent identity across social, web and email — with retargeting to re-engage the almost-converted.",
            },
            {
              t: "Teach to win trust",
              d: "Webinars and workshops that showcase expertise, add real value, and quietly fill the pipeline.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 group">
              <h4 className="text-base font-black tracking-tight text-[#0A0A0A] mb-2 group-hover:text-[#059669] transition-colors duration-300">
                {item.t}
              </h4>
              <p className="text-[13px] text-gray-500 font-light leading-relaxed">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-32 reveal">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">
          Our Vision
        </h3>
        <blockquote className="text-4xl md:text-5xl font-light italic leading-tight text-[#0A0A0A] mb-12">
          "To become a trusted growth partner for businesses looking to build
          strong brands and create long-lasting impact in their markets."
        </blockquote>
      </div>

      <div className="border-t-2 border-[#0A0A0A] pt-24 text-center reveal">
        <h3 className="text-huge font-black tracking-tighter mb-12 text-[#0A0A0A]">
          Let's Grow Together
        </h3>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-light">
          Whether you're launching, rebranding, or planning your next major
          event — Outgrow is here to help you take the next step.
        </p>
        <a
          href="#contact"
          className="btn-lift inline-block text-white px-12 py-6 text-sm font-black uppercase tracking-widest transition-colors duration-300"
          style={{ background: "#0A0A0A" }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "#059669";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "#0A0A0A";
          }}
        >
          Start the Conversation
        </a>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Presence Grader — interactive audit lead magnet
───────────────────────────────────────────── */
const GRADER_DIMS = [
  {
    key: "search",
    label: "Search presence",
    q: "Someone googles your category in Doha. Do you show up?",
    opts: [
      { t: "Yes — complete profile, fresh reviews", s: 100 },
      { t: "We're listed, but it's thin", s: 50 },
      { t: "Not really", s: 0 },
    ],
    fix: "Claim and complete the Google Business Profile — photos, services, hours, weekly posts. Maps is the highest-intent shelf in local business.",
  },
  {
    key: "rhythm",
    label: "Publishing rhythm",
    q: "How often does your brand actually post?",
    opts: [
      { t: "Fixed rhythm, several times a week", s: 100 },
      { t: "Bursts — active weeks, silent months", s: 50 },
      { t: "Rarely", s: 0 },
    ],
    fix: "Consistency beats bursts: one monthly content session feeding a fixed weekly cadence keeps the brand visible without daily effort.",
  },
  {
    key: "contact",
    label: "One-tap contact",
    q: "Can a customer reach you in one tap from any ad or profile?",
    opts: [
      { t: "WhatsApp button everywhere", s: 100 },
      { t: "Phone number / DMs, scattered", s: 50 },
      { t: "Contact forms only — slow replies", s: 0 },
    ],
    fix: "Put WhatsApp click-to-chat on every ad, bio and page — then hold a 5-minute response SLA in working hours. Speed-to-lead decides who wins the deal.",
  },
  {
    key: "capture",
    label: "Lead capture",
    q: "What happens to interested people who don’t buy today?",
    opts: [
      { t: "They join our list; flows follow up", s: 100 },
      { t: "We collect contacts, rarely follow up", s: 50 },
      { t: "Nothing — they scroll away", s: 0 },
    ],
    fix: "Build the first-party list: one conversion page, a genuine incentive, and triggered follow-ups. Owned audiences are the hedge against rising ad costs.",
  },
  {
    key: "measure",
    label: "Measurement",
    q: "Do you know what a customer costs you to acquire?",
    opts: [
      { t: "Pixels + dashboard, reviewed weekly", s: 100 },
      { t: "We check platform stats sometimes", s: 50 },
      { t: "No idea", s: 0 },
    ],
    fix: "Install pixels/CAPI and UTM discipline, then one dashboard with CAC, conversion rate and ROI — reviewed on a fixed rhythm. Data before opinions.",
  },
  {
    key: "proof",
    label: "Reviews & proof",
    q: "How does social proof get created?",
    opts: [
      { t: "We systematically ask at the right moment", s: 100 },
      { t: "Reviews happen organically", s: 50 },
      { t: "Few or none", s: 0 },
    ],
    fix: "Systematize reviews at the happiest customer moment and surface outcomes on your site — proof compounds while ads only rent attention.",
  },
];

const gradeBand = (score: number) =>
  score >= 85
    ? {
        title: "Sharp. Now scale it.",
        line: "The foundations are in place — the next win is concentrating budget on what already works.",
      }
    : score >= 65
      ? {
          title: "Solid — with leaks.",
          line: "The basics are there, but demand is slipping through specific gaps. Fix the three below first.",
        }
      : score >= 40
        ? {
            title: "Visible gaps.",
            line: "Customers are looking for a business like yours and finding competitors. The fixes below are where to start.",
          }
        : {
            title: "Invisible where it counts.",
            line: "Almost every buying moment is passing you by — the good news: the first fixes are cheap and fast.",
          };

const PresenceGrader = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "" });
  const [leadStatus, setLeadStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const answered = Object.keys(answers).length;
  const score = done
    ? Math.round(
        GRADER_DIMS.reduce((n, d) => n + (answers[d.key] ?? 0), 0) /
          GRADER_DIMS.length,
      )
    : 0;
  const band = gradeBand(score);
  const weakest = [...GRADER_DIMS]
    .sort((a, b) => (answers[a.key] ?? 0) - (answers[b.key] ?? 0))
    .slice(0, 3)
    .filter((d) => (answers[d.key] ?? 0) < 100);

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (leadStatus === "sending") return;
    setLeadStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          phone: "",
          comments: "Requested their Presence Check results + recommendations.",
          source: "grader",
          context: `Scored ${score}/100 — weakest: ${weakest.map((w) => w.label).join(", ") || "none"}`,
        }),
      });
      if (!res.ok) throw new Error(`lead endpoint ${res.status}`);
      setLeadStatus("sent");
    } catch (err) {
      console.error("grader lead submit failed:", err);
      setLeadStatus("error");
    }
  };

  const ringLen = 2 * Math.PI * 54;

  return (
    <section
      id="presence-check"
      className="py-32 md:py-48 px-6 md:px-12 bg-white"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 reveal active">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: "#059669" }}
          >
            Free Presence Check
          </h2>
          <h3 className="text-display font-black tracking-tighter text-[#0A0A0A]">
            How visible is your business, really?
          </h3>
          <p className="text-gray-600 mt-4 font-light max-w-lg">
            Six honest questions, thirty seconds, an instant score — and the
            three fixes that would move it most.
          </p>
        </div>

        {!done ? (
          <div className="max-w-3xl">
            <div className="flex gap-2 mb-10">
              {GRADER_DIMS.map((d) => (
                <div
                  key={d.key}
                  className="flex-1 h-0.5 bg-gray-200 overflow-hidden rounded-full"
                >
                  <div
                    className="progress-fill rounded-full"
                    style={{
                      width: answers[d.key] !== undefined ? "100%" : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-10">
              {GRADER_DIMS.map((d, i) => (
                <div key={d.key}>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-3">
                    {String(i + 1).padStart(2, "0")} — {d.label}
                  </p>
                  <p className="text-lg font-bold tracking-tight text-[#0A0A0A] mb-4">
                    {d.q}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {d.opts.map((o) => (
                      <button
                        key={o.t}
                        onClick={() => setAnswers({ ...answers, [d.key]: o.s })}
                        className="text-left p-5 border-2 text-[13px] font-medium leading-snug transition-colors duration-200"
                        style={{
                          borderColor:
                            answers[d.key] === o.s ? "#059669" : "#E5E7EB",
                          background:
                            answers[d.key] === o.s ? "#ECFDF5" : "#fff",
                          color: "#0A0A0A",
                        }}
                      >
                        {o.t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              disabled={answered < GRADER_DIMS.length}
              onClick={() => setDone(true)}
              className="btn-lift mt-12 px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-40"
              style={{ background: "#0A0A0A" }}
            >
              {answered < GRADER_DIMS.length
                ? `Answer ${GRADER_DIMS.length - answered} more`
                : "Get my score"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-4">
              <div className="relative w-44 h-44 mb-8">
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={
                      score >= 65
                        ? "#059669"
                        : score >= 40
                          ? "#B45309"
                          : "#B91C1C"
                    }
                    strokeWidth="10"
                    strokeLinecap="butt"
                    strokeDasharray={ringLen}
                    strokeDashoffset={ringLen * (1 - score / 100)}
                    style={{
                      transition:
                        "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black tabular-nums text-[#0A0A0A]">
                    {score}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    out of 100
                  </span>
                </div>
              </div>
              <h4 className="text-3xl font-black tracking-tighter text-[#0A0A0A] mb-3">
                {band.title}
              </h4>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                {band.line}
              </p>
              <div className="space-y-2.5">
                {GRADER_DIMS.map((d) => (
                  <div key={d.key} className="flex items-center gap-3">
                    <span className="w-32 text-[10px] font-black uppercase tracking-widest text-gray-400 flex-shrink-0">
                      {d.label}
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-100 overflow-hidden">
                      <div
                        style={{
                          width: `${answers[d.key] ?? 0}%`,
                          height: "100%",
                          background:
                            (answers[d.key] ?? 0) >= 100
                              ? "#059669"
                              : (answers[d.key] ?? 0) >= 50
                                ? "#B45309"
                                : "#B91C1C",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setDone(false);
                  setAnswers({});
                  setLeadStatus("idle");
                }}
                className="mt-8 text-[10px] font-black uppercase tracking-widest border-b-2 border-[#0A0A0A] hover:text-[#059669] hover:border-[#059669] transition-colors duration-300"
              >
                Retake
              </button>
            </div>

            <div className="lg:col-span-8">
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em] mb-6"
                style={{ color: "#059669" }}
              >
                Fix these first
              </p>
              <div className="space-y-px bg-gray-100 border border-gray-100 mb-10">
                {(weakest.length ? weakest : GRADER_DIMS.slice(0, 3)).map(
                  (d, i) => (
                    <div
                      key={d.key}
                      className="bg-white p-7 flex items-start gap-5"
                    >
                      <span
                        className="text-[11px] font-black tabular-nums mt-0.5"
                        style={{ color: "#059669" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h5 className="text-base font-black tracking-tight text-[#0A0A0A] mb-1">
                          {d.label}
                        </h5>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">
                          {d.fix}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="bg-[#0A0A0A] p-8 text-white">
                {leadStatus === "sent" ? (
                  <p className="text-sm font-bold text-center py-2">
                    Done — your results and recommendations are on the way to{" "}
                    <span style={{ color: "#34D399" }}>{lead.email}</span>.
                  </p>
                ) : (
                  <form
                    onSubmit={submitLead}
                    className="flex flex-col md:flex-row md:items-end gap-5"
                  >
                    <p className="text-sm font-black tracking-tight md:max-w-[200px] flex-shrink-0">
                      Get your full results + a fix-it plan by email.
                    </p>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={lead.name}
                      onChange={(e) =>
                        setLead({ ...lead, name: e.target.value })
                      }
                      className="flex-1 bg-transparent border-b-2 border-gray-700 focus:border-[#059669] py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors duration-300"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work email"
                      value={lead.email}
                      onChange={(e) =>
                        setLead({ ...lead, email: e.target.value })
                      }
                      className="flex-1 bg-transparent border-b-2 border-gray-700 focus:border-[#059669] py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors duration-300"
                    />
                    <button
                      type="submit"
                      disabled={leadStatus === "sending"}
                      className="btn-lift flex-shrink-0 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-60"
                      style={{ background: "#059669" }}
                    >
                      {leadStatus === "sending"
                        ? "Sending…"
                        : "Send my results"}
                    </button>
                  </form>
                )}
                {leadStatus === "error" && (
                  <p className="text-red-400 text-[11px] font-bold mt-3">
                    Couldn't send right now — try again, or use the contact form
                    below.
                  </p>
                )}
              </div>

              <p className="text-[12px] text-gray-400 font-light mt-6">
                Want the full 90-day plan behind these fixes?{" "}
                <a
                  href="#ai-strategy"
                  className="font-bold text-[#0A0A0A] border-b border-[#0A0A0A] hover:text-[#059669] hover:border-[#059669] transition-colors"
                >
                  Generate your strategy below ↓
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   AI Insights
───────────────────────────────────────────── */
const FRAMEWORK_CHIPS = [
  "STP",
  "RACE",
  "IPA 60/40",
  "95-5 Rule",
  "2026 Benchmarks",
];

const StrategyReport = ({
  strategy,
  onReset,
}: {
  strategy: StrategyType;
  onReset: () => void;
}) => {
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [leadStatus, setLeadStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [hp, setHp] = useState("");

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (leadStatus === "sending") return;
    setLeadStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          comments: "Requested their AI strategy report + a strategy session.",
          company: hp,
          source: "strategy-widget",
          context: strategy.headline,
        }),
      });
      if (!res.ok) throw new Error(`lead endpoint ${res.status}`);
      setLeadStatus("sent");
    } catch (err) {
      console.error("strategy lead submit failed:", err);
      setLeadStatus("error");
    }
  };

  return (
    <div
      id="strategy-report"
      className="bg-white text-gray-900 shadow-2xl p-8 md:p-14 space-y-12"
    >
      {/* Print-only letterhead */}
      <div className="print-letterhead items-center justify-between">
        <span className="flex items-center gap-2">
          <span
            className="w-6 h-6 flex items-center justify-center"
            style={{ background: "#059669" }}
          >
            <span className="text-white font-black text-xs">O</span>
          </span>
          <span className="text-base font-black tracking-tighter uppercase">
            outgrow
          </span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Growth Strategy Preview · info@outgrowagency.com · +974 5595 4896 ·
          Doha, Qatar
        </span>
      </div>
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <span
            className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 text-white"
            style={{ background: strategy.demo ? "#0A0A0A" : "#059669" }}
          >
            {strategy.demo
              ? "Sample Preview — engine output"
              : "Live AI Analysis"}
          </span>
          <div className="flex flex-wrap gap-2">
            {(strategy.frameworks || []).map((f, i) => (
              <span
                key={i}
                className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border border-gray-200 text-gray-400"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <h4 className="text-3xl md:text-4xl font-black tracking-tighter text-[#0A0A0A] mb-6">
          {strategy.headline}
        </h4>
        <p className="text-gray-500 font-light leading-relaxed max-w-3xl">
          {strategy.summary}
        </p>
      </div>

      {/* Positioning + North star / Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-100 border border-gray-100">
        <div className="bg-white p-8 md:p-10">
          <span
            className="block text-[9px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: "#059669" }}
          >
            Positioning (STP)
          </span>
          <p className="text-lg font-bold tracking-tight text-[#0A0A0A] leading-snug mb-5">
            {strategy.positioning}
          </p>
          <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 mb-2">
            Beachhead segment
          </span>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            {strategy.targetSegment}
          </p>
        </div>
        <div className="bg-white p-8 md:p-10 flex flex-col justify-between gap-8">
          <div>
            <span
              className="block text-[9px] font-black uppercase tracking-[0.25em] mb-4"
              style={{ color: "#059669" }}
            >
              North-star metric
            </span>
            <p className="text-lg font-bold tracking-tight text-[#0A0A0A] leading-snug">
              {strategy.northStar}
            </p>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
                Budget split
              </span>
              <span className="text-[10px] font-black tabular-nums text-gray-500">
                {strategy.budgetSplit.brand}% brand ·{" "}
                {strategy.budgetSplit.activation}% activation
              </span>
            </div>
            <div className="flex h-2.5 w-full overflow-hidden">
              <div
                style={{
                  width: `${strategy.budgetSplit.brand}%`,
                  background: "#0A0A0A",
                }}
              />
              <div
                style={{
                  width: `${strategy.budgetSplit.activation}%`,
                  background: "#059669",
                }}
              />
            </div>
            <p className="text-[11px] text-gray-400 font-light leading-relaxed mt-3">
              {strategy.budgetSplit.note}
            </p>
          </div>
        </div>
      </div>

      {/* RACE funnel */}
      <div>
        <span
          className="block text-[9px] font-black uppercase tracking-[0.25em] mb-6"
          style={{ color: "#059669" }}
        >
          The plan — RACE journey
        </span>
        <div className="space-y-px bg-gray-100 border border-gray-100">
          {strategy.funnel.map((s, i) => {
            const priority = s.focus.startsWith("Priority");
            return (
              <div
                key={i}
                className="bg-white p-7 md:p-9 grid grid-cols-1 md:grid-cols-12 gap-6"
                style={
                  priority ? { boxShadow: "inset 4px 0 0 #059669" } : undefined
                }
              >
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-black tracking-tighter text-[#0A0A0A]">
                      {s.stage}
                    </span>
                    {priority && (
                      <span
                        className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 text-white"
                        style={{ background: "#059669" }}
                      >
                        Priority
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {priority
                      ? s.focus.replace(/^Priority\s*—\s*/, "")
                      : s.focus}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <ul className="space-y-3">
                    {s.tactics.map((t, j) => (
                      <li
                        key={j}
                        className="flex items-start text-sm text-gray-700 font-light leading-relaxed"
                      >
                        <span
                          className="w-1.5 h-1.5 mt-2 mr-3 flex-shrink-0"
                          style={{ background: "#059669" }}
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3 md:border-l md:border-gray-100 md:pl-6">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
                    KPI
                  </span>
                  <p className="text-xs font-bold text-[#0A0A0A] mb-4 leading-snug">
                    {s.kpi}
                  </p>
                  <span className="block text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
                    Benchmark
                  </span>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                    {s.benchmark}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <span
          className="block text-[9px] font-black uppercase tracking-[0.25em] mb-6"
          style={{ color: "#059669" }}
        >
          90-day roadmap
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
          {strategy.roadmap.map((r, i) => (
            <div key={i} className="bg-white p-7 md:p-9">
              <span
                className="block text-[10px] font-black tabular-nums mb-1"
                style={{ color: "#059669" }}
              >
                {r.phase}
              </span>
              <h5 className="text-lg font-black tracking-tighter text-[#0A0A0A] mb-5">
                {r.theme}
              </h5>
              <ul className="space-y-3">
                {r.actions.map((a, j) => (
                  <li
                    key={j}
                    className="flex items-start text-[13px] text-gray-600 font-light leading-relaxed"
                  >
                    <span className="text-[10px] font-black mr-3 mt-0.5 tabular-nums text-gray-300">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Quick wins */}
      <div className="border-2 border-[#0A0A0A] p-7 md:p-9">
        <span
          className="block text-[9px] font-black uppercase tracking-[0.25em] mb-6"
          style={{ color: "#059669" }}
        >
          Do this week — zero budget
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategy.quickWins.map((q, i) => (
            <div key={i} className="flex items-start">
              <span
                className="w-5 h-5 border-2 border-[#059669] flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center text-[10px] font-black"
                style={{ color: "#059669" }}
              >
                ✓
              </span>
              <p className="text-sm text-gray-700 font-light leading-relaxed">
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Take it with you — lead capture */}
      <div className="print-hide bg-[#0A0A0A] p-7 md:p-10 text-white">
        {leadStatus === "sent" ? (
          <div className="text-center py-4">
            <div
              className="w-10 h-10 mx-auto mb-5 flex items-center justify-center text-white font-black"
              style={{ background: "#059669" }}
            >
              ✓
            </div>
            <p className="text-xl font-black tracking-tighter mb-2">
              Strategy on its way.
            </p>
            <p className="text-gray-400 text-sm font-light">
              We'll follow up at{" "}
              <span className="text-white font-bold">{lead.email}</span> within
              one business day to book your session.
            </p>
          </div>
        ) : (
          <form onSubmit={submitLead}>
            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              <div className="lg:max-w-xs flex-shrink-0">
                <span
                  className="block text-[9px] font-black uppercase tracking-[0.25em] mb-3"
                  style={{ color: "#34D399" }}
                >
                  Take this with you
                </span>
                <p className="text-lg font-black tracking-tight leading-snug">
                  Get this strategy in your inbox — plus a free 30-minute
                  session to pressure-test it.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    ph: "Your name",
                    key: "name" as const,
                    type: "text",
                    req: true,
                  },
                  {
                    ph: "Work email",
                    key: "email" as const,
                    type: "email",
                    req: true,
                  },
                  {
                    ph: "WhatsApp (optional)",
                    key: "phone" as const,
                    type: "tel",
                    req: false,
                  },
                ].map((f) => (
                  <input
                    key={f.key}
                    type={f.type}
                    required={f.req}
                    placeholder={f.ph}
                    value={lead[f.key]}
                    onChange={(e) =>
                      setLead({ ...lead, [f.key]: e.target.value })
                    }
                    className="w-full bg-transparent border-b-2 border-gray-700 focus:border-[#059669] py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors duration-300"
                  />
                ))}
              </div>
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  Company
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    type="text"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={leadStatus === "sending"}
                className="btn-lift flex-shrink-0 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-60"
                style={{ background: "#059669" }}
              >
                {leadStatus === "sending" ? "Sending…" : "Send it to me"}
              </button>
            </div>
            {leadStatus === "error" && (
              <p className="text-red-400 text-[11px] font-bold mt-4">
                Couldn't send right now —{" "}
                <a
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/97455954896?text=${encodeURIComponent(`Hello Outgrow! I'd like the strategy preview "${strategy.headline}" and a session. — ${lead.name}`)}`}
                >
                  message us on WhatsApp instead
                </a>
                .
              </p>
            )}
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
        <p className="text-[10px] text-gray-400 font-light leading-relaxed max-w-md">
          Benchmarks are published 2026 industry aggregates (Meta &amp; Google
          benchmark studies, IPA effectiveness databank, DataReportal Qatar) —
          directional guidance, not guarantees. The full engagement version is
          built on your actual numbers.
        </p>
        <div className="print-hide flex items-center gap-6 flex-shrink-0">
          <button
            onClick={onReset}
            className="text-[10px] font-black uppercase tracking-widest border-b-2 border-[#0A0A0A] hover:text-[#059669] hover:border-[#059669] transition-colors duration-300"
          >
            New Analysis
          </button>
          <button
            onClick={() => window.print()}
            className="btn-lift inline-block px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0A0A0A]"
            style={{ border: "2px solid #0A0A0A" }}
          >
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const AIInsights = () => {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Segmenting your market (STP)...");
  const [input, setInput] = useState<UserInput>({
    businessName: "",
    industry: "",
    mainChallenge: "",
  });
  const [strategy, setStrategy] = useState<StrategyType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const LOADING_MSGS = [
    "Segmenting your market (STP)...",
    "Sequencing the RACE journey...",
    "Pulling 2026 channel benchmarks...",
    "Applying IPA budget evidence...",
    "Localizing for Qatar & the GCC...",
    "Assembling your 90-day roadmap...",
  ];

  useEffect(() => {
    if (!loading) return;
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % LOADING_MSGS.length;
      setStatusMsg(LOADING_MSGS[i]);
    }, 2600);
    return () => clearInterval(t);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.businessName || !input.industry) return;
    setLoading(true);
    setError(null);
    try {
      setStrategy(await generateGrowthStrategy(input));
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "RATE_LIMITED") {
        setError("Too many requests — give it a minute and try again.");
      } else {
        setError(
          "Our strategy engine encountered a momentary pause. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ai-strategy"
      className="py-32 md:py-48 px-6 md:px-12 text-white overflow-hidden relative"
      style={{ background: "#059669" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.15) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-[1440px] mx-auto relative z-10">
        {strategy ? (
          <div className="reveal active">
            <div className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-green-200 mb-4">
                Outgrow Intelligence
              </h2>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                Your strategy preview.
              </h3>
            </div>
            <StrategyReport
              strategy={strategy}
              onReset={() => setStrategy(null)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-left">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-green-200 mb-6">
                AI Insights
              </h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8">
                Your growth plan, <br /> engineered.
              </h3>
              <p className="text-xl text-green-100 font-light leading-relaxed max-w-md mb-10">
                Outgrow Intelligence drafts a strategy preview the way our
                strategists do — positioning first, then the full customer
                journey, budget split, and a 90-day roadmap.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {FRAMEWORK_CHIPS.map((f, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-green-400/40 text-green-100"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-green-200/80 font-light max-w-md">
                Built on the frameworks working strategists plan with, and
                judged against published 2026 channel benchmarks — localized for
                Qatar &amp; the GCC.
              </p>
            </div>

            <div className="reveal-right">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-10 md:p-12 shadow-2xl space-y-6 relative overflow-hidden"
              >
                {loading && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-12 text-center bg-white/98">
                    <div className="w-16 h-0.5 bg-gray-100 mb-8 overflow-hidden relative">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "#059669",
                          animation: "loadingBar 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                    <p className="text-[#0A0A0A] font-black uppercase tracking-[0.2em] text-[11px] mb-2">
                      {statusMsg}
                    </p>
                    <p className="text-gray-400 text-[9px] uppercase tracking-widest">
                      Outgrow Intelligence
                    </p>
                  </div>
                )}
                <div className="space-y-5">
                  {[
                    {
                      ph: "Business Name",
                      val: input.businessName,
                      key: "businessName" as const,
                      type: "input",
                    },
                    {
                      ph: "Industry (e.g. restaurant, fashion, real estate)",
                      val: input.industry,
                      key: "industry" as const,
                      type: "input",
                    },
                  ].map((f) => (
                    <div key={f.key} className="group">
                      <input
                        type="text"
                        required
                        placeholder={f.ph}
                        className="w-full border-b-2 py-4 text-[#0A0A0A] placeholder-gray-300 focus:outline-none transition-colors duration-300 bg-transparent"
                        style={{ borderColor: "#E5E7EB" }}
                        value={f.val}
                        onChange={(e) =>
                          setInput({ ...input, [f.key]: e.target.value })
                        }
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "#059669";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "#E5E7EB";
                        }}
                      />
                    </div>
                  ))}
                  <textarea
                    placeholder="Your main challenge (e.g. not enough leads, nobody knows us yet)"
                    rows={3}
                    className="w-full border-b-2 py-4 text-[#0A0A0A] placeholder-gray-300 focus:outline-none resize-none bg-transparent transition-colors duration-300"
                    style={{ borderColor: "#E5E7EB" }}
                    value={input.mainChallenge}
                    onChange={(e) =>
                      setInput({ ...input, mainChallenge: e.target.value })
                    }
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "#059669";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "#E5E7EB";
                    }}
                  />
                </div>
                <button
                  disabled={loading}
                  className="btn-lift w-full py-5 text-white text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 disabled:opacity-50"
                  style={{ background: "#0A0A0A" }}
                  onMouseEnter={(e) => {
                    if (!loading)
                      (e.target as HTMLElement).style.background = "#059669";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = "#0A0A0A";
                  }}
                >
                  Generate My Strategy
                </button>
                {error && (
                  <p className="text-red-500 text-[10px] font-bold text-center">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Service Pages
───────────────────────────────────────────── */
const ServiceCard: React.FC<{ num: string; title: string; desc: string }> = ({
  num,
  title,
  desc,
}) => (
  <div className="card-3d bg-white p-10 md:p-12 group border border-gray-100 hover:border-[#0A0A0A] transition-colors duration-300">
    <span
      className="block text-[10px] font-black mb-6 transition-colors duration-300"
      style={{ color: "#059669" }}
    >
      {num}
    </span>
    <h3 className="text-xl font-black tracking-tighter mb-4 text-[#0A0A0A] group-hover:text-[#059669] transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed font-light">{desc}</p>
  </div>
);

const ProcessStep: React.FC<{ step: string; title: string; desc: string }> = ({
  step,
  title,
  desc,
}) => (
  <div className="border-t-2 border-[#0A0A0A] pt-10 pr-8 pb-10 group hover:border-[#059669] transition-colors duration-300">
    <span className="block text-5xl font-black text-gray-100 group-hover:text-[#D1FAE5] mb-6 transition-colors duration-300">
      {step}
    </span>
    <h3 className="text-lg font-black tracking-tighter mb-3 group-hover:text-[#059669] transition-colors duration-300 text-[#0A0A0A]">
      {title}
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed font-light">{desc}</p>
  </div>
);

/* ─────────────────────────────────────────────
   Works Page
───────────────────────────────────────────── */
const WORKS: {
  num: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  year: string;
  href?: string;
}[] = [
  {
    num: "01",
    title: "ZIHAY — Modest Fashion E-Commerce",
    category: "Web Build & Brand Systems",
    desc: "Launch build for a modest womenswear brand: working storefront with cart and WhatsApp ordering, editorial art direction, structured-data SEO, and a single-source content system the client can edit.",
    tags: ["E-Commerce", "WhatsApp Commerce", "Art Direction"],
    year: "2026",
    href: "https://zihay-preview.vercel.app",
  },
  {
    num: "02",
    title: "Regional Brand Launch",
    category: "Advertising & Brand Management",
    desc: "Full-spectrum brand identity, media placement, and advertising campaign across digital and broadcast channels for a Doha-based client.",
    tags: ["Brand Strategy", "Media Placement", "Digital Advertising"],
    year: "2025",
  },
  {
    num: "02",
    title: "Annual Trade Exhibition",
    category: "Event Management",
    desc: "End-to-end organization of a multi-day trade exhibition in Qatar — venue coordination, vendor management, permits, and promotional campaign.",
    tags: ["Trade Show", "Venue & Permits", "Event Promotion"],
    year: "2025",
  },
  {
    num: "03",
    title: "Corporate Conference Series",
    category: "Event Management",
    desc: "Planning and delivery of a quarterly corporate conference series — scheduling, invitations, on-site coordination, and post-event reporting.",
    tags: ["Corporate Events", "Budgeting", "Logistics"],
    year: "2024",
  },
  {
    num: "04",
    title: "Multi-Channel Ad Campaign",
    category: "Advertising & PR",
    desc: "Integrated advertising campaign covering TV, radio, press, and digital platforms — creative direction, ad design, and media distribution.",
    tags: ["TV & Radio", "Press Advertising", "Creative Direction"],
    year: "2024",
  },
];

const WorksPage = ({ setView }: { setView: (v: View) => void }) => (
  <section className="pt-40 pb-32 px-6 md:px-12 bg-white">
    <div className="max-w-[1440px] mx-auto">
      <div className="reveal">
        <h2
          className="text-xs font-black uppercase tracking-[0.3em] mb-12"
          style={{ color: "#059669" }}
        >
          Portfolio
        </h2>
        <h1 className="text-huge font-black tracking-tighter text-[#0A0A0A] mb-6">
          Our Works
        </h1>
        <p className="text-xl text-gray-500 font-light max-w-xl mb-24">
          Representative engagements across advertising, brand management, and
          event management — the kind of work we deliver for brands in Qatar and
          the GCC.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 reveal">
        {WORKS.map((w, i) => (
          <div
            key={i}
            className="works-card bg-white p-10 md:p-14 group"
            style={{ minHeight: "340px" }}
          >
            <div className="flex justify-between items-start mb-8">
              <span
                className="text-[10px] font-black"
                style={{ color: "#059669" }}
              >
                {w.num}
              </span>
              {w.href && (
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 text-white"
                  style={{ background: "#059669" }}
                >
                  Live
                </span>
              )}
            </div>
            <span
              className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 block mb-4 group-hover:text-green-300"
              style={{ transition: "color 300ms ease" }}
            >
              {w.category}
            </span>
            <h3
              className="text-2xl md:text-3xl font-black tracking-tighter text-[#0A0A0A] mb-4 group-hover:text-white"
              style={{ transition: "color 300ms ease" }}
            >
              {w.title}
            </h3>
            <p
              className="text-gray-500 text-sm leading-relaxed font-light mb-8 group-hover:text-gray-300"
              style={{ transition: "color 300ms ease" }}
            >
              {w.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {w.tags.map((tag, j) => (
                <span
                  key={j}
                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-gray-200 text-gray-500 group-hover:border-gray-700 group-hover:text-gray-400"
                  style={{
                    transition: "border-color 300ms ease, color 300ms ease",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {w.href && (
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-[10px] font-black uppercase tracking-widest border-b-2 pb-0.5 text-[#0A0A0A] border-[#0A0A0A] group-hover:text-[#34D399] group-hover:border-[#34D399]"
                style={{
                  transition: "color 300ms ease, border-color 300ms ease",
                }}
              >
                View the live build ↗
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="border-t-2 border-[#0A0A0A] pt-24 text-center mt-24 reveal">
        <h3 className="text-huge font-black tracking-tighter mb-8">
          Ready to work together?
        </h3>
        <p className="text-xl text-gray-500 max-w-xl mx-auto mb-12 font-light">
          Every project starts with a conversation. Tell us what you're
          building.
        </p>
        <a
          href="#contact"
          className="btn-lift inline-block text-white px-12 py-6 text-sm font-black uppercase tracking-widest"
          style={{
            background: "#0A0A0A",
            transition:
              "background 250ms ease, transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0A0A0A")}
        >
          Start a Project
        </a>
      </div>
    </div>
  </section>
);

const ServiceMarketingPage = ({ setView }: { setView: (v: View) => void }) => (
  <div>
    <section className="pt-40 pb-32 px-6 md:px-12 bg-[#0A0A0A] text-white">
      <div className="max-w-[1440px] mx-auto">
        <button
          onClick={() => setView("home")}
          className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-[#059669] transition-colors duration-300 mb-16 flex items-center gap-3"
        >
          <span>←</span> Back to Home
        </button>
        <span
          className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-8"
          style={{ color: "#059669" }}
        >
          Our Services — 01
        </span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10 reveal">
          Advertising, PR &<br />
          <span className="text-gray-600">Brand Management</span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-400 font-light leading-relaxed reveal">
          We build brands that get noticed and create advertising that performs
          — across every platform, in every format, for every audience.
        </p>
      </div>
    </section>

    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-xs font-black uppercase tracking-[0.3em] mb-16 reveal"
          style={{ color: "#059669" }}
        >
          What's Included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "Marketing & Brand Consultancy",
              desc: "We work closely with you to define your brand's positioning, voice, and long-term marketing strategy. Every recommendation is grounded in your market and audience.",
            },
            {
              num: "02",
              title: "Advertising Design & Creation",
              desc: "From concept to final artwork — advertising that commands attention. Press ads, digital banners, TV spots, outdoor campaigns.",
            },
            {
              num: "03",
              title: "Media Placement",
              desc: "We place your advertising where it matters most — newspapers, magazines, television, radio, and across the internet.",
            },
            {
              num: "04",
              title: "Digital & Online Advertising",
              desc: "Website ads, social media campaigns, display networks, and email marketing — managed with precision targeting.",
            },
            {
              num: "05",
              title: "PR & Communications",
              desc: "We craft and distribute press releases, manage media relationships, and position your brand in front of the right voices.",
            },
            {
              num: "06",
              title: "Ad Material Distribution",
              desc: "Physical and digital delivery of advertising materials and branded content — to the right people, at the right time.",
            },
          ].map((item, i) => (
            <div key={i} className={`reveal stagger-${(i % 6) + 1}`}>
              <ServiceCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-32 px-6 md:px-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-xs font-black uppercase tracking-[0.3em] mb-16 reveal"
          style={{ color: "#059669" }}
        >
          How We Work
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 reveal">
          {[
            {
              step: "01",
              title: "Discovery & Brief",
              desc: "We start by understanding your business, audience, competitors, and objectives in depth.",
            },
            {
              step: "02",
              title: "Strategy & Concept",
              desc: "We develop the campaign strategy and creative direction, presented in a formal review.",
            },
            {
              step: "03",
              title: "Production & Placement",
              desc: "We produce all materials and execute placement across agreed channels and platforms.",
            },
            {
              step: "04",
              title: "Review & Optimize",
              desc: "We track performance, report on results, and continuously refine for better outcomes.",
            },
          ].map((item, i) => (
            <ProcessStep
              key={String(i)}
              step={item.step}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>

    <section
      className="py-32 px-6 md:px-12 text-white"
      style={{ background: "#059669" }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12 reveal">
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-green-200 mb-6">
            Ready to start?
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Let's build your
            <br />
            brand together.
          </h3>
        </div>
        <a
          href="#contact"
          className="btn-lift flex-shrink-0 px-12 py-6 text-sm font-black uppercase tracking-widest transition-colors duration-300 bg-white text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
        >
          Get in Touch
        </a>
      </div>
    </section>
  </div>
);

const ServiceEventsPage = ({ setView }: { setView: (v: View) => void }) => (
  <div>
    <section className="pt-40 pb-32 px-6 md:px-12 bg-[#0A0A0A] text-white">
      <div className="max-w-[1440px] mx-auto">
        <button
          onClick={() => setView("home")}
          className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-[#059669] transition-colors duration-300 mb-16 flex items-center gap-3"
        >
          <span>←</span> Back to Home
        </button>
        <span
          className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-8"
          style={{ color: "#059669" }}
        >
          Our Services — 02
        </span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10 reveal">
          Event Management
          <br />
          <span className="text-gray-600">Services</span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-400 font-light leading-relaxed reveal">
          From planning to execution, we organize events that make an impact —
          trade shows, conferences, corporate meetings, and everything in
          between.
        </p>
      </div>
    </section>

    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-xs font-black uppercase tracking-[0.3em] mb-16 reveal"
          style={{ color: "#059669" }}
        >
          What's Included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "Event Organization & Management",
              desc: "Full-service planning and management — from initial concept through to on-site coordination and post-event wrap-up.",
            },
            {
              num: "02",
              title: "Trade Shows & Exhibitions",
              desc: "We manage your presence at trade shows, including stand coordination, logistics, staffing, and promotional distribution.",
            },
            {
              num: "03",
              title: "Conferences & Corporate Meetings",
              desc: "Professional organization of conferences, seminars, roundtables, and corporate meetings — every detail handled.",
            },
            {
              num: "04",
              title: "Event Promotion",
              desc: "We promote your event through targeted advertising to maximize attendance and awareness among the right audiences.",
            },
            {
              num: "05",
              title: "Venue Selection & Permitting",
              desc: "We identify and secure the right venues, negotiate terms, and manage all permit applications and regulatory approvals.",
            },
            {
              num: "06",
              title: "Budgeting & Timeline Management",
              desc: "Detailed budget planning, cost control, and timeline development — keeping your event on track and on budget.",
            },
          ].map((item, i) => (
            <div key={i} className={`reveal stagger-${(i % 6) + 1}`}>
              <ServiceCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-32 px-6 md:px-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-xs font-black uppercase tracking-[0.3em] mb-16 reveal"
          style={{ color: "#059669" }}
        >
          How We Work
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 reveal">
          {[
            {
              step: "01",
              title: "Brief & Scoping",
              desc: "We define event objectives, audience, format, scale, and budget in a structured kick-off session.",
            },
            {
              step: "02",
              title: "Planning & Coordination",
              desc: "We build the full project plan — venue, vendors, permits, timelines, and promotional strategy.",
            },
            {
              step: "03",
              title: "Execution & On-Site Management",
              desc: "Our team oversees every element on the day, managing staff, suppliers, and the event flow.",
            },
            {
              step: "04",
              title: "Post-Event Reporting",
              desc: "We provide a full debrief — attendance data, feedback, outcomes, and recommendations.",
            },
          ].map((item, i) => (
            <ProcessStep
              key={String(i)}
              step={item.step}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>

    <section
      className="py-32 px-6 md:px-12 text-white"
      style={{ background: "#059669" }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12 reveal">
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-green-200 mb-6">
            Ready to start?
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Let's create an
            <br />
            event that delivers.
          </h3>
        </div>
        <a
          href="#contact"
          className="btn-lift flex-shrink-0 px-12 py-6 text-sm font-black uppercase tracking-widest bg-white text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-300"
        >
          Get in Touch
        </a>
      </div>
    </section>
  </div>
);

/* ─────────────────────────────────────────────
   Privacy & Terms (condensed)
───────────────────────────────────────────── */
const PolicyPage = ({
  setView,
  title,
  subtitle,
  sections,
}: {
  setView: (v: View) => void;
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
}) => (
  <section className="pt-40 pb-32 px-6 md:px-12 bg-white">
    <div className="max-w-[900px] mx-auto">
      <button
        onClick={() => setView("home")}
        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#0A0A0A] transition-colors mb-16 flex items-center gap-3"
      >
        <span>←</span> Back to Home
      </button>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0A0A0A] mb-4">
        {title}
      </h1>
      <p
        className="text-xs font-bold uppercase tracking-widest mb-20"
        style={{ color: "#059669" }}
      >
        {subtitle}
      </p>
      {sections.map((s, i) => (
        <div key={i} className="border-t border-gray-100 py-12">
          <h2
            className="text-xs font-black uppercase tracking-[0.3em] mb-6"
            style={{ color: "#059669" }}
          >
            {s.heading}
          </h2>
          <div className="text-gray-600 text-base leading-relaxed font-light space-y-3">
            {s.body.split("\n").map((line, j) => (
              <p
                key={j}
                className={
                  line.startsWith("•") || line.startsWith("  –") ? "pl-4" : ""
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Contact
───────────────────────────────────────────── */
const WHATSAPP_NUMBER = "97455954896";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [honeypot, setHoneypot] = useState("");

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Outgrow! I'm ${form.name || "…"}.` +
      (form.comments ? `\n\n${form.comments}` : "") +
      `\n\nYou can reach me at ${form.email}${form.phone ? ` / ${form.phone}` : ""}.`,
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("sent");
    } catch (err) {
      console.error("lead submit failed:", err);
      setStatus("idle");
      setError(
        "We couldn't send your message right now — tap the WhatsApp button below and it will reach us instantly.",
      );
    }
  };

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-20 reveal">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] mb-8"
            style={{ color: "#059669" }}
          >
            Contact us
          </h2>
          <h3 className="text-huge font-black tracking-tighter mb-10 text-[#0A0A0A]">
            Ready to <br /> outgrow?
          </h3>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            Join the brands building for the future. We coordinate your
            transformation so you can lead your market.
          </p>
        </div>

        {/* Info cards */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl mx-auto mb-20 reveal">
          {[
            {
              label: "Email us",
              value: "info@outgrowagency.com",
              href: "mailto:info@outgrowagency.com",
            },
            {
              label: "Call us",
              value: "+974 5595 4896",
              href: "tel:+97455954896",
            },
            {
              label: "WhatsApp",
              value: "+974 5595 4896",
              href: `https://wa.me/${WHATSAPP_NUMBER}`,
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="btn-lift flex-1 border-2 border-[#0A0A0A] py-10 px-8 group hover:bg-[#0A0A0A] hover:text-white"
              style={{
                transition:
                  "background 300ms ease, color 300ms ease, transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span
                className="block text-[9px] font-black uppercase tracking-widest mb-3 transition-colors duration-300 group-hover:text-gray-400"
                style={{ color: "#6B7280" }}
              >
                {item.label}
              </span>
              <span className="block text-lg font-bold text-[#0A0A0A] group-hover:text-white transition-colors duration-300">
                {item.value}
              </span>
            </a>
          ))}
        </div>

        {/* Google Map */}
        <div
          className="map-container w-full max-w-3xl mx-auto mb-20 reveal-scale"
          style={{ height: 280 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.68640148944!2d51.20820779999999!3d25.2854473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x1cfa88cf812b4032!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1748000000000!5m2!1sen!2s"
            width="100%"
            height="280"
            style={{
              border: 0,
              display: "block",
              filter: "grayscale(30%) contrast(1.05)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Outgrow Agency — Doha, Qatar"
          />
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto reveal">
          <h4
            className="text-xs font-black uppercase tracking-[0.3em] mb-4"
            style={{ color: "#059669" }}
          >
            Send us a message
          </h4>
          <p className="text-sm text-gray-500 font-light mb-12">
            We reply within one business day — or message us on WhatsApp for an
            immediate answer.
          </p>
          {status === "sent" ? (
            <div className="border-2 border-[#059669] p-16 text-center">
              <div
                className="w-12 h-12 flex items-center justify-center mx-auto mb-6 text-white text-xl font-black"
                style={{ background: "#059669" }}
              >
                ✓
              </div>
              <h5 className="text-2xl font-black tracking-tighter mb-4 text-[#0A0A0A]">
                Message received.
              </h5>
              <p className="text-gray-500 font-light">
                We'll be in touch shortly at{" "}
                <span className="font-bold text-[#0A0A0A]">{form.email}</span>.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-block mt-10 px-10 py-5 text-white text-[11px] font-black uppercase tracking-[0.2em]"
                style={{ background: "#059669" }}
              >
                Continue on WhatsApp
              </a>
              <div>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", phone: "", comments: "" });
                    setCharCount(0);
                  }}
                  className="mt-8 text-[10px] font-black uppercase tracking-widest border-b-2 border-[#0A0A0A] hover:text-[#059669] hover:border-[#059669] transition-colors duration-300"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {[
                  {
                    label: "Full Name *",
                    ph: "Your full name",
                    type: "text",
                    key: "name" as const,
                    required: true,
                  },
                  {
                    label: "Email Address *",
                    ph: "your@email.com",
                    type: "email",
                    key: "email" as const,
                    required: true,
                  },
                ].map((f, i) => (
                  <div
                    key={f.key}
                    className={`border-2 border-gray-200 p-8 focus-within:border-[#059669] transition-colors duration-300 ${i === 1 ? "md:border-l-0" : ""}`}
                  >
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required={f.required}
                      placeholder={f.ph}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      className="w-full text-lg font-medium text-[#0A0A0A] placeholder-gray-300 focus:outline-none bg-transparent"
                    />
                  </div>
                ))}
              </div>
              <div className="border-2 border-t-0 border-gray-200 p-8 focus-within:border-[#059669] transition-colors duration-300">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+974 XXXX XXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full text-lg font-medium text-[#0A0A0A] placeholder-gray-300 focus:outline-none bg-transparent"
                />
              </div>
              <div className="border-2 border-t-0 border-gray-200 p-8 focus-within:border-[#059669] transition-colors duration-300">
                <div className="flex justify-between mb-3">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Comments
                  </label>
                  <span className="text-[9px] text-gray-300 font-mono tabular-nums">
                    {charCount}/500
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about your project or enquiry..."
                  value={form.comments}
                  onChange={(e) => {
                    setForm({ ...form, comments: e.target.value });
                    setCharCount(e.target.value.length);
                  }}
                  className="w-full text-lg font-medium text-[#0A0A0A] placeholder-gray-300 focus:outline-none bg-transparent resize-none"
                />
                {charCount > 0 && (
                  <div className="mt-3 h-0.5 bg-gray-100 overflow-hidden rounded-full">
                    <div
                      className="progress-fill rounded-full"
                      style={{ width: `${(charCount / 500) * 100}%` }}
                    />
                  </div>
                )}
              </div>
              {/* Honeypot — invisible to humans, catches spam bots */}
              <div
                className="absolute -left-[9999px] top-auto"
                aria-hidden="true"
              >
                <label>
                  Company
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-lift w-full py-7 text-white text-[11px] font-black uppercase tracking-[0.25em] transition-colors duration-300 disabled:opacity-60"
                style={{ background: "#0A0A0A" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "#059669";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "#0A0A0A";
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
              {error && (
                <div
                  className="border-2 border-t-0 p-6 text-center"
                  style={{ borderColor: "#FECACA", background: "#FEF2F2" }}
                >
                  <p className="text-red-600 text-xs font-bold mb-4">{error}</p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lift inline-block px-8 py-4 text-white text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ background: "#059669" }}
                  >
                    Send via WhatsApp instead
                  </a>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
const Footer = ({ setView }: { setView: (v: View) => void }) => (
  <footer className="bg-[#0A0A0A] text-white pt-32 pb-12 px-6 md:px-12">
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-2">
          <button
            onClick={() => setView("home")}
            className="flex items-center space-x-2.5 mb-10 outline-none group"
          >
            <div
              className="w-7 h-7 flex items-center justify-center group-hover:scale-110"
              style={{
                background: "#059669",
                transition: "transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span className="text-white font-black text-sm">O</span>
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">
              outgrow
            </span>
          </button>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed font-light">
            A marketing, advertising, and event management company dedicated to
            building powerful brands and delivering exceptional events in Qatar
            and beyond.
          </p>
          <div className="flex gap-4 mt-8">
            {[
              { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
              { label: "Email", href: "mailto:info@outgrowagency.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[9px] font-black uppercase tracking-widest border border-gray-800 px-4 py-2.5 text-gray-600 hover:border-[#059669] hover:text-[#059669]"
                style={{
                  transition: "border-color 300ms ease, color 300ms ease",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-700 mb-8">
            Navigation
          </h4>
          <ul className="space-y-4 text-sm font-bold tracking-wide">
            {[
              { label: "About", action: () => setView("about") },
              {
                label: "Services",
                action: () => {
                  setView("home");
                  setTimeout(
                    () =>
                      document
                        .getElementById("capabilities")
                        ?.scrollIntoView({ behavior: "smooth" }),
                    100,
                  );
                },
              },
              { label: "Works", action: () => setView("works") },
              { label: "Privacy Policy", action: () => setView("privacy") },
              { label: "Terms & Conditions", action: () => setView("terms") },
            ].map((item, i) => (
              <li key={i}>
                <button
                  onClick={item.action}
                  className="hover:text-[#059669] transition-colors duration-300 text-gray-400"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-700 mb-8">
            Contact
          </h4>
          <ul className="space-y-4 text-sm font-light text-gray-500">
            <li>
              <a
                href="mailto:info@outgrowagency.com"
                className="hover:text-[#059669] transition-colors duration-300"
              >
                info@outgrowagency.com
              </a>
            </li>
            <li>
              <a
                href="tel:+97455954896"
                className="hover:text-[#059669] transition-colors duration-300"
              >
                +974 5595 4896
              </a>
            </li>
            <li className="text-gray-600">Doha, Qatar</li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-700 gap-4">
        <p>
          © {new Date().getFullYear()} Outgrow. Advertising · PR · Brand
          Management · Event Management
        </p>
        <span style={{ color: "#059669" }}>Doha, Qatar</span>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────
   Privacy & Terms data
───────────────────────────────────────────── */
const PRIVACY_SECTIONS = [
  {
    heading: "Overview",
    body: "At Outgrow, we value the trust our clients and partners place in us. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our services.",
  },
  {
    heading: "Information We Collect",
    body: "We collect personal information you provide (name, company, email, phone, project details) and information collected automatically (IP address, browser type, pages visited).",
  },
  {
    heading: "Cookies & Technologies",
    body: "We use essential, performance, and third-party cookies to enhance website performance, personalize user experience, and analyze visitor behavior. You may manage cookies through your browser settings.",
  },
  {
    heading: "How We Use Your Data",
    body: "We use collected data to:\n• Deliver marketing and consultancy services\n• Develop and manage campaigns\n• Improve website performance\n• Communicate with clients and prospects",
  },
  {
    heading: "Your Rights",
    body: "You have the right to access, update, or delete your personal data. Contact us at info@outgrowagency.com to make a request.",
  },
  {
    heading: "Data Security",
    body: "We take appropriate technical and organizational measures to protect your data, including restricted access to authorized personnel and secure data storage systems.",
  },
  {
    heading: "Changes to This Policy",
    body: "Outgrow reserves the right to update this Privacy Policy at any time. Updates will be posted on this page.",
  },
];

const TERMS_SECTIONS = [
  {
    heading: "1. Scope of Services",
    body: "Outgrow provides services within: (1) Advertising, PR & Brand Management — including marketing consultancy, advertising design, media placement, and PR distribution; (2) Event Management — including trade shows, conferences, venue coordination, and budget management.",
  },
  {
    heading: "2. Payment Terms",
    body: "• 50% non-refundable deposit required before work commences\n• Remaining 50% due upon project completion prior to final delivery\n• Additional services outside agreed scope will be quoted separately",
  },
  {
    heading: "3. Project Timelines",
    body: "• Standard design projects completed within 2 weeks from start date\n• Event timelines defined per project agreement\n• Delays in client feedback may affect delivery timelines",
  },
  {
    heading: "4. Revisions",
    body: "• Design projects include up to 2 revision rounds\n• Additional revisions may incur extra charges\n• One additional concept provided if initial concepts do not meet brief",
  },
  {
    heading: "5. Cancellation Policy",
    body: "• Down payment is non-refundable once work has commenced\n• Projects paused for more than 30 days without client response may be considered canceled",
  },
  {
    heading: "6. Intellectual Property",
    body: "Upon full payment, the client receives rights to final approved deliverables. Outgrow retains the right to showcase completed work in portfolio and marketing materials.",
  },
  {
    heading: "7. Governing Law",
    body: "These Terms shall be governed by the laws of the State of Qatar. Any dispute shall be subject to the exclusive jurisdiction of the competent courts of Qatar.",
  },
  {
    heading: "8. Regulatory Compliance",
    body: "Outgrow operates in compliance with all applicable Qatari laws including commercial, advertising, event licensing, and data protection regulations.",
  },
];

/* ─────────────────────────────────────────────
   App Root
───────────────────────────────────────────── */
const VIEW_ROUTES: Record<View, string> = {
  home: "#/",
  about: "#/about",
  works: "#/works",
  "service-marketing": "#/services/advertising",
  "service-events": "#/services/events",
  privacy: "#/privacy",
  terms: "#/terms",
};

/* Maps a location hash to a view; returns null for in-page anchors like #contact. */
function viewFromHash(hash: string): View | null {
  if (hash === "" || hash === "#" || hash === "#/") return "home";
  const entry = (Object.entries(VIEW_ROUTES) as [View, string][]).find(
    ([, h]) => h === hash,
  );
  return entry ? entry[0] : null;
}

export default function App() {
  const [view, setViewState] = useState<View>(
    () => viewFromHash(window.location.hash) ?? "home",
  );

  const setView = useCallback((v: View) => {
    if (window.location.hash !== VIEW_ROUTES[v]) {
      window.location.hash = VIEW_ROUTES[v];
    } else {
      setViewState(v);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const v = viewFromHash(window.location.hash);
      if (v !== null) setViewState(v);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [view]);

  return (
    <div className="min-h-screen">
      <Header setView={setView} currentView={view} />
      <main>
        {view === "home" ? (
          <HomePage setView={setView} />
        ) : view === "about" ? (
          <AboutPage />
        ) : view === "works" ? (
          <WorksPage setView={setView} />
        ) : view === "service-marketing" ? (
          <ServiceMarketingPage setView={setView} />
        ) : view === "service-events" ? (
          <ServiceEventsPage setView={setView} />
        ) : view === "privacy" ? (
          <PolicyPage
            setView={setView}
            title="Privacy Policy"
            subtitle="Outgrow Agency"
            sections={PRIVACY_SECTIONS}
          />
        ) : (
          <PolicyPage
            setView={setView}
            title="Terms & Conditions"
            subtitle="Outgrow Agency"
            sections={TERMS_SECTIONS}
          />
        )}
        {view !== "privacy" && view !== "terms" && <Contact />}
      </main>
      <Footer setView={setView} />
    </div>
  );
}
