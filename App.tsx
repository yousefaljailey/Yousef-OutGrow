import React, { useState, useEffect } from 'react';
import { SERVICES, PACKAGES } from './constants.tsx';
import { UserInput, GrowthStrategy as StrategyType } from './types.ts';
import { generateGrowthStrategy } from './services/geminiService.ts';

type View = 'home' | 'about' | 'privacy' | 'terms' | 'service-marketing' | 'service-events';

const Header = ({ setView, currentView }: { setView: (v: View) => void, currentView: View }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
      <button onClick={() => setView('home')} className="flex items-center space-x-2 outline-none group">
        <div className="w-6 h-6 bg-black flex items-center justify-center transition-transform group-hover:rotate-90">
          <span className="text-white font-black text-xs">O</span>
        </div>
        <span className="text-lg font-extrabold tracking-tighter uppercase">outgrow</span>
      </button>
      <nav className="hidden lg:flex space-x-10 text-[13px] font-bold uppercase tracking-widest text-gray-400">
        <button
          onClick={() => setView('about')}
          className={`${currentView === 'about' ? 'text-black' : 'hover:text-black'} transition-colors uppercase`}
        >
          Who we are
        </button>

        {/* Services dropdown */}
        <div className="relative group">
          <button className={`${currentView === 'service-marketing' || currentView === 'service-events' ? 'text-black' : 'hover:text-black'} transition-colors uppercase flex items-center gap-1`}>
            Services
            <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute top-full left-0 mt-3 w-80 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <button
              onClick={() => setView('service-marketing')}
              className="w-full text-left px-6 py-5 border-b border-gray-50 hover:bg-black hover:text-white transition-all group/item"
            >
              <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover/item:text-gray-300 mb-1">01</span>
              <span className="block text-sm font-bold normal-case tracking-normal">Advertising, PR & Brand Management</span>
              <span className="block text-xs text-gray-400 group-hover/item:text-gray-300 mt-1 normal-case tracking-normal font-normal">Marketing consultancy, ad design & placement</span>
            </button>
            <button
              onClick={() => setView('service-events')}
              className="w-full text-left px-6 py-5 hover:bg-black hover:text-white transition-all group/item"
            >
              <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover/item:text-gray-300 mb-1">02</span>
              <span className="block text-sm font-bold normal-case tracking-normal">Event Management Services</span>
              <span className="block text-xs text-gray-400 group-hover/item:text-gray-300 mt-1 normal-case tracking-normal font-normal">Trade shows, conferences & corporate events</span>
            </button>
          </div>
        </div>

        {currentView !== 'home' && (
          <button onClick={() => setView('home')} className="hover:text-black transition-colors uppercase">Home</button>
        )}
      </nav>
      <a href="#contact" className="hidden md:block text-[13px] font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all">
        Contact
      </a>
    </div>
  </header>
);

const HomePage = ({ setView }: { setView: (v: View) => void }) => (
  <>
    <section className="min-h-screen flex items-center pt-20 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="reveal">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 mb-8">
            The Creative Transformation Company
          </span>
          <h1 className="text-huge font-extrabold text-black mb-12">
            We build for the <br />
            <span className="text-gray-300">future of business.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <p className="max-w-xl text-xl md:text-2xl text-gray-500 font-light leading-snug">
              Outgrow is a marketing, advertising, and event management company. We build brands and create experiences that leave a lasting mark.
            </p>
            <div className="flex gap-6 pb-2">
              <button
                onClick={() => setView('about')}
                className="bg-black text-white px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="capabilities" className="py-32 md:py-48 px-6 md:px-12 bg-black text-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-24 reveal">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-6">What we do</h2>
          <h3 className="text-5xl md:text-6xl font-extrabold tracking-tighter">Capabilities</h3>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:gap-0">
          {SERVICES.map((service, i) => (
            <div key={service.id} className="capability-group border-t border-gray-800 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between group transition-all reveal">
              <div className="flex items-center space-x-8 mb-6 lg:mb-0">
                <span className="text-xs font-black text-gray-600">0{i + 1}</span>
                <h4 className="text-3xl md:text-4xl font-bold group-hover:text-emerald-400 transition-colors">{service.title}</h4>
              </div>
              <div className="lg:max-w-md">
                <p className="text-gray-400 text-base leading-relaxed mb-6">{service.description}</p>
                <ul className="flex flex-wrap gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-gray-700 text-gray-500 group-hover:border-emerald-900 group-hover:text-emerald-400 transition-all">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-800"></div>
        </div>
      </div>
    </section>

    <section id="packages" className="py-32 md:py-48 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-24 reveal">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 mb-6">Growth Plans</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">Structured for success.</h3>
        </div>
        <div className="flex flex-col items-center space-y-16">
          {PACKAGES.map((pkg, i) => (
            <div key={i} className="w-full max-w-5xl group reveal">
              <div className="flex flex-col md:flex-row md:items-stretch border border-gray-100 group-hover:border-black transition-all duration-500">
                <div className="p-10 md:p-16 flex-1 bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">{pkg.name}</h3>
                    {pkg.isPopular && <span className="text-[10px] font-bold bg-black text-white px-3 py-1 uppercase tracking-widest">Recommended</span>}
                  </div>
                  <p className="text-xl text-gray-500 font-light leading-relaxed mb-8">{pkg.description}</p>
                  <div className="text-4xl font-extrabold">{pkg.price}</div>
                </div>
                <div className="p-10 md:p-16 flex-1 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 group-hover:bg-white transition-all">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Engagement Details</h4>
                  <ul className="space-y-5 mb-12">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm font-medium text-gray-700">
                        <div className="w-1.5 h-1.5 bg-emerald-500 mr-4"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="inline-block w-full text-center py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all">
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <AIInsights />
  </>
);

const AboutPage = () => (
  <section className="pt-40 pb-32 px-6 md:px-12 bg-white">
    <div className="max-w-[1440px] mx-auto">
      <div className="reveal">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 mb-12">Who we are</h2>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black mb-16">
          About Us
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32 reveal">
        <div className="lg:col-span-5">
          <p className="text-3xl md:text-4xl font-light leading-tight text-gray-400 mb-8 hover:text-emerald-600 transition-colors cursor-default">
            At Outgrow Business, we help brands move from <span className="text-black font-medium">potential to performance.</span>
          </p>
        </div>
        <div className="lg:col-span-7 space-y-8 text-xl text-gray-600 font-light leading-relaxed">
          <p className="hover:text-emerald-600 transition-colors cursor-default">
            We are a marketing, advertising, and event management company built to help brands make an impact — through compelling advertising across all media and expertly managed events that create real connections. Our approach combines strategic thinking, creative execution, and meticulous logistics.
          </p>
          <p className="hover:text-emerald-600 transition-colors cursor-default">
            We believe great brands are built through consistent, well-placed messaging — and great relationships are forged at well-run events. That's why we work closely with our clients as partners, not just service providers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32 reveal">
        <div className="border-t border-gray-100 pt-12">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-8">What We Do</h3>
          <p className="text-gray-500 mb-8 font-light">Outgrow Business specializes in advertising, brand management, and event management services.</p>
          <div className="space-y-8">
            {[
              { title: "Marketing & brand management consultancy", desc: "Strategic brand guidance tailored to your market position and goals." },
              { title: "Advertising design, creation & placement", desc: "From concept to placement — creative that performs across every format." },
              { title: "Print, broadcast & digital media advertising", desc: "Reaching your audience wherever they are — press, TV, radio, and online." },
              { title: "PR & advertising material distribution", desc: "Getting your message out through the right channels at the right time." },
              { title: "Event organization, promotion & management", desc: "End-to-end event delivery from brief to on-site execution." },
              { title: "Trade shows, conferences & corporate meetings", desc: "Professional events that make the right impression on your audience." },
              { title: "Venue selection, permitting & event logistics", desc: "Every detail handled — location, permits, timelines, and coordination." },
            ].map((item, i) => (
              <div key={i} className="group cursor-default">
                <h4 className="text-xl font-bold tracking-tighter mb-1 group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400 font-medium italic">
            Every solution we provide is customized to fit the client's goals, market, and stage of growth.
          </p>
        </div>
        <div className="border-t border-gray-100 pt-12">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-8">Our Approach</h3>
          <p className="text-gray-500 mb-8 font-light">No generic templates. No guesswork. Just clear direction and real growth.</p>
          <ul className="space-y-4">
            {[
              "Understanding your business first",
              "Creating strategies that are practical and scalable",
              "Executing with clarity and accountability",
              "Tracking results and continuously improving"
            ].map((item, i) => (
              <li key={i} className="text-xl font-medium text-gray-800 flex items-start group cursor-default hover:text-emerald-600 transition-colors">
                <span className="w-1.5 h-1.5 bg-emerald-500 mt-3 mr-4 flex-shrink-0 group-hover:bg-emerald-600"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-black text-white p-12 md:p-24 mb-32 reveal">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-12">Why Outgrow Business?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-8">
            <div className="group">
              <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">Strategic thinking backed by execution</h4>
              <p className="text-gray-400 text-sm">We don't just plan; we deliver the results we promise.</p>
            </div>
            <div className="group">
              <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">Clear communication and transparency</h4>
              <p className="text-gray-400 text-sm">Honesty is the bedrock of our partnerships.</p>
            </div>
            <div className="group">
              <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">Results-driven mindset</h4>
              <p className="text-gray-400 text-sm">Metrics that matter to your bottom line.</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="group">
              <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">Modern tools and creative solutions</h4>
              <p className="text-gray-400 text-sm">Leveraging the latest in tech and creativity.</p>
            </div>
            <div className="group">
              <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">Long-term growth focus</h4>
              <p className="text-gray-400 text-sm">Building sustainable value, not short-term hype.</p>
            </div>
            <p className="text-emerald-400 font-bold tracking-tighter text-2xl pt-4">
              We don't just help businesses look good — we help them outgrow their limits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-32 reveal">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Our Vision</h3>
        <blockquote className="text-4xl md:text-5xl font-light italic leading-tight text-black mb-12 hover:text-emerald-600 transition-colors cursor-default">
          "To become a trusted growth partner for businesses looking to scale sustainably, build strong brands, and create long-lasting impact in their markets."
        </blockquote>
      </div>

      <div className="border-t-2 border-black pt-24 text-center reveal">
        <h3 className="text-huge font-black tracking-tighter mb-12">Let's Grow Together</h3>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-light hover:text-emerald-600 transition-colors cursor-default">
          Whether you're launching, rebranding, or scaling, Outgrow Business is here to help you take the next step with confidence.
        </p>
        <a href="#contact" className="inline-block bg-black text-white px-12 py-6 text-sm font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
          Start Transformation
        </a>
      </div>
    </div>
  </section>
);

const AIInsights = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Initializing transformation core...");
  const [input, setInput] = useState<UserInput>({ businessName: '', industry: '', mainChallenge: '' });
  const [strategy, setStrategy] = useState<StrategyType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [keySelectionRequired, setKeySelectionRequired] = useState(false);

  const loadingMessages = [
    "Analyzing market dynamics...",
    "Benchmarking industry leaders...",
    "Synthesizing unique value propositions...",
    "Optimizing growth trajectory...",
    "Calibrating strategic recommendations..."
  ];

  useEffect(() => {
    let msgIndex = 0;
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        setStatusMessage(loadingMessages[msgIndex]);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleKeySelection = async () => {
    try {
      // @ts-ignore
      if (window.aistudio && window.aistudio.openSelectKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        setKeySelectionRequired(false);
        setError(null);
      }
    } catch (e) {
      console.error("Failed to open key selection", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.businessName || !input.industry) return;

    // @ts-ignore
    if (typeof window.aistudio !== 'undefined') {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setKeySelectionRequired(true);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateGrowthStrategy(input);
      setStrategy(result);
    } catch (err: any) {
      if (err.message === "API_KEY_NOT_FOUND") {
        setKeySelectionRequired(true);
      } else {
        setError("Our strategy engine encountered a momentary pause. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-strategy" className="py-32 md:py-48 px-6 md:px-12 bg-emerald-600 text-white overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200 mb-6">AI Insights</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-8">
              Immediate <br /> growth roadmap.
            </h3>
            <p className="text-xl text-emerald-100 font-light leading-relaxed max-w-md">
              Harness Outgrow Intelligence powered by Gemini 3 Pro for an AI-powered preview of your business transformation path.
            </p>
          </div>

          <div className="reveal">
            {keySelectionRequired ? (
              <div className="bg-white p-10 md:p-12 text-gray-900 shadow-2xl">
                <h4 className="text-xl font-black uppercase tracking-widest text-emerald-600 mb-6">Enterprise Setup Required</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Vertex-grade insights require a project-associated API key. Please select your paid billing key to unlock the strategic engine.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleKeySelection}
                    className="w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all"
                  >
                    Manage API Key
                  </button>
                  <a
                    href="https://ai.google.dev/gemini-api/docs/billing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[10px] text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
                  >
                    Learn about billing
                  </a>
                </div>
              </div>
            ) : !strategy ? (
              <form onSubmit={handleSubmit} className="bg-white p-10 md:p-12 shadow-2xl space-y-6 relative overflow-hidden">
                {loading && (
                  <div className="absolute inset-0 bg-white/98 z-30 flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300">
                    <div className="w-16 h-1 bg-gray-100 mb-8 overflow-hidden relative">
                      <div className="absolute inset-0 bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]"></div>
                    </div>
                    <p className="text-gray-900 font-bold uppercase tracking-[0.2em] text-[11px] mb-2">{statusMessage}</p>
                    <p className="text-gray-400 text-[9px] uppercase tracking-widest">Powered by Gemini 3 Pro</p>
                  </div>
                )}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Business Name"
                    className="w-full border-b border-gray-200 py-4 text-gray-900 focus:outline-none focus:border-emerald-500"
                    value={input.businessName}
                    onChange={e => setInput({ ...input, businessName: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Industry"
                    className="w-full border-b border-gray-200 py-4 text-gray-900 focus:outline-none focus:border-emerald-500"
                    value={input.industry}
                    onChange={e => setInput({ ...input, industry: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Describe your core challenge"
                    rows={3}
                    className="w-full border-b border-gray-200 py-4 text-gray-900 focus:outline-none focus:border-emerald-500"
                    value={input.mainChallenge}
                    onChange={e => setInput({ ...input, mainChallenge: e.target.value })}
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all"
                >
                  Generate Insights
                </button>
                {error && <p className="text-red-500 text-[10px] font-bold text-center">{error}</p>}
              </form>
            ) : (
              <div className="bg-white p-10 md:p-12 text-gray-900 space-y-8 animate-in slide-in-from-bottom-4 duration-500 shadow-2xl">
                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-black uppercase tracking-tighter">{strategy.headline}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-black uppercase border border-gray-200 px-2 py-1 text-gray-400">Vertex Tier</span>
                  </div>
                </div>
                <p className="text-gray-500 font-light leading-relaxed">{strategy.summary}</p>
                <div className="space-y-4">
                  {strategy.recommendations.map((rec, i) => (
                    <div key={i} className="border-l-4 border-emerald-500 pl-6 py-2 hover:bg-gray-50 transition-colors">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{rec.category}</span>
                      <h5 className="font-bold text-sm mt-1">{rec.title}</h5>
                      <p className="text-xs text-gray-600 mt-1">{rec.action}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStrategy(null)} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black">
                  New Analysis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { left: -100%; width: 30%; }
          50% { width: 30%; }
          100% { left: 100%; width: 30%; }
        }
      `}</style>
    </section>
  );
};

const ServiceMarketingPage = ({ setView }: { setView: (v: View) => void }) => (
  <div>
    {/* Hero */}
    <section className="pt-40 pb-32 px-6 md:px-12 bg-black text-white">
      <div className="max-w-[1440px] mx-auto">
        <button onClick={() => setView('home')} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-emerald-400 transition-colors mb-16 flex items-center gap-3">
          <span>←</span> Back to Home
        </button>
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-8">Our Services — 01</span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10">
          Advertising, PR &<br /><span className="text-gray-500">Brand Management</span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-400 font-light leading-relaxed">
          We build brands that get noticed and create advertising that performs — across every platform, in every format, for every audience.
        </p>
      </div>
    </section>

    {/* What's included */}
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-16">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {[
            {
              num: "01",
              title: "Marketing & Brand Consultancy",
              desc: "We work closely with you to define your brand's positioning, voice, and long-term marketing strategy. Every recommendation is grounded in your market, your audience, and your goals."
            },
            {
              num: "02",
              title: "Advertising Design & Creation",
              desc: "From concept to final artwork, we design advertising that commands attention — whether it's a full-page press ad, a digital banner, a TV spot, or an outdoor campaign."
            },
            {
              num: "03",
              title: "Media Placement",
              desc: "We place your advertising where it matters most — newspapers, magazines, television, radio, and across the internet — ensuring maximum reach and relevance."
            },
            {
              num: "04",
              title: "Digital & Online Advertising",
              desc: "Website ads, social media campaigns, display networks, and email marketing — we manage your digital presence with precision targeting and clear performance metrics."
            },
            {
              num: "05",
              title: "PR & Communications",
              desc: "We craft and distribute press releases, manage media relationships, and position your brand in front of the right journalists, editors, and industry voices."
            },
            {
              num: "06",
              title: "Ad Material Distribution",
              desc: "Physical and digital delivery of advertising materials, promotional samples, and branded content — to the right people, at the right time, in the right markets."
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 md:p-12 group hover:bg-black transition-colors duration-300">
              <span className="block text-xs font-black text-gray-300 group-hover:text-gray-600 mb-6">{item.num}</span>
              <h3 className="text-xl font-black tracking-tighter mb-4 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed font-light transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How we work */}
    <section className="py-32 px-6 md:px-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-16">How We Work</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          {[
            { step: "01", title: "Discovery & Brief", desc: "We start by understanding your business, audience, competitors, and objectives in depth." },
            { step: "02", title: "Strategy & Concept", desc: "We develop the campaign strategy and creative direction, presented in a formal review." },
            { step: "03", title: "Production & Placement", desc: "We produce all materials and execute placement across agreed channels and platforms." },
            { step: "04", title: "Review & Optimize", desc: "We track performance, report on results, and continuously refine for better outcomes." },
          ].map((item, i) => (
            <div key={i} className="border-t-2 border-black pt-10 pr-8 pb-10 group hover:border-emerald-600 transition-colors">
              <span className="block text-4xl font-black text-gray-100 group-hover:text-emerald-100 mb-6 transition-colors">{item.step}</span>
              <h3 className="text-lg font-black tracking-tighter mb-3 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 px-6 md:px-12 bg-emerald-600 text-white">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-200 mb-6">Ready to start?</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Let's build your<br />brand together.</h3>
        </div>
        <a href="#contact" className="flex-shrink-0 bg-white text-black px-12 py-6 text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Get in Touch
        </a>
      </div>
    </section>
  </div>
);

const ServiceEventsPage = ({ setView }: { setView: (v: View) => void }) => (
  <div>
    {/* Hero */}
    <section className="pt-40 pb-32 px-6 md:px-12 bg-black text-white">
      <div className="max-w-[1440px] mx-auto">
        <button onClick={() => setView('home')} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-emerald-400 transition-colors mb-16 flex items-center gap-3">
          <span>←</span> Back to Home
        </button>
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-8">Our Services — 02</span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10">
          Event Management<br /><span className="text-gray-500">Services</span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-400 font-light leading-relaxed">
          From planning to execution, we organize events that make an impact — trade shows, conferences, corporate meetings, and everything in between.
        </p>
      </div>
    </section>

    {/* What's included */}
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-16">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {[
            {
              num: "01",
              title: "Event Organization & Management",
              desc: "Full-service planning and management of business events — from initial concept and brief through to on-site coordination and post-event wrap-up."
            },
            {
              num: "02",
              title: "Trade Shows & Exhibitions",
              desc: "We manage your presence at trade shows and exhibitions, including stand design coordination, logistics, staffing, and promotional material distribution."
            },
            {
              num: "03",
              title: "Conferences & Corporate Meetings",
              desc: "Professional organization of conferences, seminars, roundtables, and corporate meetings — ensuring every detail is handled with precision."
            },
            {
              num: "04",
              title: "Event Promotion",
              desc: "We promote your event through targeted advertising and communications strategies to maximize attendance and awareness among the right audiences."
            },
            {
              num: "05",
              title: "Venue Selection & Permitting",
              desc: "We identify and secure the right venues, negotiate terms, and manage all permit applications and regulatory approvals required for your event."
            },
            {
              num: "06",
              title: "Budgeting & Timeline Management",
              desc: "Detailed budget planning, cost control, and timeline development — keeping your event on track and on budget from first brief to final delivery."
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 md:p-12 group hover:bg-black transition-colors duration-300">
              <span className="block text-xs font-black text-gray-300 group-hover:text-gray-600 mb-6">{item.num}</span>
              <h3 className="text-xl font-black tracking-tighter mb-4 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed font-light transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How we work */}
    <section className="py-32 px-6 md:px-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-16">How We Work</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          {[
            { step: "01", title: "Brief & Scoping", desc: "We define event objectives, audience, format, scale, and budget in a structured kick-off session." },
            { step: "02", title: "Planning & Coordination", desc: "We build the full project plan — venue, vendors, permits, timelines, and promotional strategy." },
            { step: "03", title: "Execution & On-Site Management", desc: "Our team oversees every element on the day, managing staff, suppliers, and the event flow." },
            { step: "04", title: "Post-Event Reporting", desc: "We provide a full debrief — attendance data, feedback, outcomes, and recommendations for the future." },
          ].map((item, i) => (
            <div key={i} className="border-t-2 border-black pt-10 pr-8 pb-10 group hover:border-emerald-600 transition-colors">
              <span className="block text-4xl font-black text-gray-100 group-hover:text-emerald-100 mb-6 transition-colors">{item.step}</span>
              <h3 className="text-lg font-black tracking-tighter mb-3 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 px-6 md:px-12 bg-emerald-600 text-white">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-200 mb-6">Ready to start?</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Let's create an<br />event that delivers.</h3>
        </div>
        <a href="#contact" className="flex-shrink-0 bg-white text-black px-12 py-6 text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Get in Touch
        </a>
      </div>
    </section>
  </div>
);

const PrivacyPage = ({ setView }: { setView: (v: View) => void }) => (
  <section className="pt-40 pb-32 px-6 md:px-12 bg-white">
    <div className="max-w-[900px] mx-auto">
      <button onClick={() => setView('home')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-16 flex items-center gap-3">
        <span>←</span> Back to Home
      </button>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-6">Privacy Policy</h1>
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-20">Outgrow Agency</p>

      {[
        {
          title: "Overview",
          content: "At Outgrow, we value the trust our clients and partners place in us. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our services, including our website, digital platforms, marketing campaigns, and offline engagements.\n\nWe encourage you to read this policy carefully to understand how your data is handled. If you have any questions, please contact us directly."
        },
        {
          title: "Information We Collect",
          content: "We collect personal and non-personal information to deliver better, more tailored marketing, branding, and consultancy services. This information helps us understand your needs, improve our offerings, and enhance your experience.\n\nWe collect information in two main ways:"
        },
        {
          title: "Information You Give to Us",
          content: "The information you provide depends on your interaction with our services. This may include:\n• Full name\n• Company name\n• Job title\n• Email address\n• Phone number\n• Location\n• Project details and requirements\n\nYou may provide this information through:\n• Website contact forms\n• Service inquiries and proposals\n• Email communication\n• Event registrations\n• Client onboarding processes\n• Customer support requests\n\nBy submitting your information, you agree that it is accurate and up to date."
        },
        {
          title: "Information We Collect Automatically",
          content: "We automatically collect certain data when you interact with our website or digital platforms, including:\n• IP address\n• Device and browser type\n• Pages visited and time spent\n• Referral sources\n• Click behavior\n\nThis helps us optimize user experience and improve our services."
        },
        {
          title: "Cookies & Similar Technologies",
          content: "Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve functionality.\n\nTypes of Cookies We Use:\n• Essential cookies – Required for website functionality\n• Performance & analytics cookies – Help us understand user behavior\n• Third-party cookies – Used by integrated tools and platforms\n\nCookies may collect:\n• Session identifiers\n• User preferences\n• Website interaction data\n\nWe use cookies to enhance website performance, personalize user experience, analyze visitor behavior, and improve marketing effectiveness. We do not sell or misuse cookie data.\n\nWe use session cookies (expire after browsing session ends) and persistent cookies (remain until deleted or expired). Cookies are safe and cannot execute programs or transmit viruses.\n\nYou can manage or delete cookies through your browser settings. Disabling cookies may affect certain website functionalities."
        },
        {
          title: "Controls You Have Over Your Information",
          content: "You have the right to:\n• Access your personal data\n• Update or correct your information\n• Request deletion of your data\n• Withdraw consent for communications\n\nTo make a request, contact us at: info@outgrowagency.com"
        },
        {
          title: "How We Use the Collected Information",
          content: "We use collected data to:\n• Deliver marketing and consultancy services\n• Develop and manage campaigns\n• Improve website performance and UX\n• Communicate with clients and prospects\n• Personalize content and recommendations\n• Maintain records for service improvement\n\nWe only use your data for legitimate business purposes and with your consent where required."
        },
        {
          title: "Information Security",
          content: "We take appropriate technical and organizational measures to protect your data, including:\n• Restricted access to authorized personnel only\n• Secure data storage systems\n• Internal data protection protocols"
        },
        {
          title: "Online Analytics",
          content: "We may use third-party tools such as Google Analytics and HubSpot. These tools help us analyze website traffic and behavior, campaign performance, and engagement metrics (open rates, click-through rates, etc.)."
        },
        {
          title: "When This Policy Applies",
          content: "This policy applies to all interactions with Outgrow, including:\n• Website visits\n• Client engagements\n• Marketing campaigns\n• Events and activations\n• Communications (email, phone, forms)"
        },
        {
          title: "How Long We Keep Your Information",
          content: "We retain your information only as long as necessary to provide services, maintain business relationships, and comply with legal obligations. You may request deletion of your data at any time."
        },
        {
          title: "Changes to This Policy",
          content: "Outgrow reserves the right to update this Privacy Policy at any time. Updates will be posted on this page, and significant changes may be communicated via email or other appropriate channels.\n\nContinued use of our services indicates acceptance of any updates."
        }
      ].map((section, i) => (
        <div key={i} className="border-t border-gray-100 py-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">{section.title}</h2>
          <div className="text-gray-600 text-base leading-relaxed font-light space-y-3">
            {section.content.split('\n').map((line, j) => (
              <p key={j} className={line.startsWith('•') ? 'pl-4' : ''}>{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const TermsPage = ({ setView }: { setView: (v: View) => void }) => (
  <section className="pt-40 pb-32 px-6 md:px-12 bg-white">
    <div className="max-w-[900px] mx-auto">
      <button onClick={() => setView('home')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-16 flex items-center gap-3">
        <span>←</span> Back to Home
      </button>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-6">Terms &amp; Conditions</h1>
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-20">Outgrow Agency</p>

      {[
        {
          number: "1",
          title: "Scope of Services",
          content: "Outgrow provides services strictly within the following areas:\n\n1.1 Advertising, Public Relations, Marketing & Brand Management\n• Marketing and brand consultancy\n• Development and execution of advertising campaigns\n• Design and placement of advertisements across print, digital, broadcast, and online platforms\n• Distribution of advertising materials and promotional content\n\n1.2 Event Management Services\n• Planning, organizing, and managing events including exhibitions, conferences, trade shows, and corporate events\n• Event promotion and coordination\n• Budget planning, scheduling, and timeline development\n• Venue selection, booking, and permit coordination\n• Vendor and contractor coordination where applicable"
        },
        {
          number: "2",
          title: "Payment Terms",
          content: "• A 50% non-refundable down payment is required before the commencement of any project\n• Work will only begin upon confirmation of the initial payment\n• The remaining 50% must be paid upon project completion and prior to final delivery\n• Any additional services outside the agreed scope will be quoted and billed separately"
        },
        {
          number: "3",
          title: "Project Timelines",
          content: "• Standard design projects are completed within two (2) weeks from project start date\n• Timelines may vary depending on project complexity and client responsiveness\n• Event timelines will be defined separately per project agreement\n• Delays in client feedback or content submission may affect delivery timelines"
        },
        {
          number: "4",
          title: "Revisions & Modifications",
          content: "• Design projects include up to two (2) revision rounds\n• Additional revisions beyond this scope may incur extra charges\n• If initial concepts do not meet expectations, Outgrow will:\n  – Apply requested modifications\n  – Provide one (1) additional concept within one (1) week"
        },
        {
          number: "5",
          title: "Creative Process",
          content: "• Work is developed based on the client's provided brief and direction\n• Initial concepts will be presented in a formal presentation format\n• Drafts, sketches, or work-in-progress materials will only be shared upon request"
        },
        {
          number: "6",
          title: "Cancellation & Refund Policy",
          content: "• The down payment is non-refundable once work has commenced\n• If the client chooses not to proceed after concepts are delivered (despite meeting the brief), no refunds will be issued\n• Projects paused for more than 30 days without client response may be considered canceled"
        },
        {
          number: "7",
          title: "Final Deliverables",
          content: "• Final files and assets will only be delivered after full payment is received\n• Deliverables may include source files, design exports, or campaign assets depending on the agreement"
        },
        {
          number: "8",
          title: "Intellectual Property & Usage Rights",
          content: "• Upon full payment, the client receives rights to the final approved deliverables\n• Outgrow retains the right to showcase completed work in portfolio, website, social media, and marketing materials"
        },
        {
          number: "9",
          title: "Website & Digital Projects (If Applicable)",
          content: "• Website projects are delivered within four (4) weeks from receipt of all required content\n• Clients are responsible for providing all content unless otherwise agreed\n• Additional features, languages, or functionalities will incur extra costs"
        },
        {
          number: "10",
          title: "Client Responsibilities",
          content: "Clients are expected to:\n• Provide clear and accurate project briefs\n• Submit required content on time\n• Provide timely feedback and approvals\n• Ensure all provided materials (text, images, logos) are legally owned or licensed"
        },
        {
          number: "11",
          title: "Data & Storage (If Applicable)",
          content: "• Any hosting, storage, or digital asset management will be defined per project\n• Additional storage requirements beyond agreed limits may incur extra fees"
        },
        {
          number: "12",
          title: "Limitation of Liability",
          content: "Outgrow is not liable for:\n• Indirect or consequential damages\n• Delays caused by third parties or external platforms\n• Performance of third-party vendors or event partners"
        },
        {
          number: "13",
          title: "Changes to Terms",
          content: "Outgrow reserves the right to modify these Terms & Conditions at any time. Continued engagement with our services constitutes acceptance of any updates."
        },
        {
          number: "14",
          title: "Governing Law & Jurisdiction",
          content: "These Terms & Conditions shall be governed by and construed in accordance with the laws of the State of Qatar.\n\nAny dispute, claim, or controversy arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts of Qatar.\n\nWhere applicable, and if the contract is executed under the Qatar Financial Centre, disputes may be resolved under QFC laws and adjudicated by the QFC Civil and Commercial Court."
        },
        {
          number: "15",
          title: "Regulatory Compliance",
          content: "Outgrow operates in compliance with all applicable laws and regulations within Qatar, including but not limited to:\n• Commercial laws governing service providers\n• Advertising and media regulations\n• Event licensing and permit requirements\n• Data protection laws, including the Qatar Personal Data Privacy Protection Law\n\nClients agree to comply with all applicable laws in connection with the use of Outgrow's services."
        },
        {
          number: "16",
          title: "Data Protection & Privacy",
          content: "Outgrow processes personal data in accordance with the Qatar Personal Data Privacy Protection Law (Law No. 13 of 2016).\n• Personal data will only be collected and processed for legitimate business purposes\n• Clients have the right to access, correct, or request deletion of their personal data\n• Data will not be shared with third parties without consent unless required by law"
        },
        {
          number: "17",
          title: "Intellectual Property Rights (Qatar Compliance)",
          content: "All intellectual property rights are handled in accordance with applicable Qatari laws.\n• Ownership of final deliverables transfers to the client only after full payment\n• Outgrow retains ownership of preliminary concepts, drafts, and unused materials\n• Clients must not use any materials prior to final payment and approval"
        },
        {
          number: "18",
          title: "Advertising & Content Compliance",
          content: "All advertising, marketing, and PR content developed by Outgrow must comply with Qatar's cultural, legal, and media standards.\n\nClients agree that:\n• Content provided must not violate local laws, public morals, or religious sensitivities\n• Outgrow reserves the right to refuse any content deemed non-compliant"
        },
        {
          number: "19",
          title: "Event Management Compliance",
          content: "For event-related services:\n• Clients are responsible for obtaining necessary approvals unless otherwise agreed\n• Outgrow may assist in securing permits, subject to government authority approval\n• All events must comply with regulations from relevant authorities such as the Ministry of Commerce and Industry Qatar, Ministry of Interior Qatar, and local municipalities\n\nOutgrow is not liable for delays or cancellations caused by permit issues or regulatory restrictions."
        },
        {
          number: "20",
          title: "Anti-Bribery & Ethical Conduct",
          content: "Both parties agree to comply with all applicable anti-bribery and anti-corruption laws in Qatar.\n• No party shall offer, request, or accept any unlawful payments or incentives\n• Any breach of this clause may result in immediate termination of the agreement"
        },
        {
          number: "21",
          title: "Force Majeure",
          content: "Outgrow shall not be held liable for failure or delay in performance due to events beyond its reasonable control, including but not limited to:\n• Government restrictions\n• Public health emergencies\n• Natural disasters\n• Acts of God"
        },
        {
          number: "22",
          title: "Dispute Resolution",
          content: "In the event of a dispute:\n• Both parties agree to first attempt resolution through mutual discussion\n• If unresolved, the dispute may be escalated to mediation\n• If still unresolved, it shall be referred to the competent courts of Qatar or QFC courts (if applicable)"
        },
        {
          number: "23",
          title: "Contract Language",
          content: "These Terms & Conditions may be provided in both English and Arabic. In the event of any conflict, the Arabic version shall prevail in accordance with Qatari legal practice."
        },
        {
          number: "24",
          title: "Severability",
          content: "If any provision of these Terms is found to be invalid or unenforceable under Qatari law, the remaining provisions shall remain in full force and effect."
        },
        {
          number: "25",
          title: "Entire Agreement",
          content: "These Terms & Conditions constitute the entire agreement between Outgrow and the client and supersede all prior agreements, understandings, or communications."
        }
      ].map((section, i) => (
        <div key={i} className="border-t border-gray-100 py-12">
          <div className="flex items-start gap-6">
            <span className="text-xs font-black text-gray-300 mt-1 w-8 flex-shrink-0">{section.number}.</span>
            <div className="flex-1">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">{section.title}</h2>
              <div className="text-gray-600 text-base leading-relaxed font-light space-y-3">
                {section.content.split('\n').map((line, j) => (
                  <p key={j} className={line.startsWith('•') || line.startsWith('  –') ? 'pl-4' : ''}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Contact = () => {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', comments: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 mb-8">Contact us</h2>
          <h3 className="text-huge font-extrabold tracking-tighter mb-12">
            Ready to <br /> outgrow?
          </h3>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Join the brands that are building for the future. We coordinate your transformation so you can lead your industry.
          </p>
        </div>

        {/* Info cards */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl mx-auto mb-24 reveal">
          <a href="mailto:info@outgrowagency.com" className="flex-1 border border-black py-10 px-8 hover:bg-black hover:text-white transition-all group">
            <span className="block text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Email us</span>
            <span className="text-xl font-bold">info@outgrowagency.com</span>
          </a>
          <a href="tel:+97455954896" className="flex-1 border border-black py-10 px-8 hover:bg-black hover:text-white transition-all group">
            <span className="block text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Call us</span>
            <span className="text-xl font-bold">+974 5595 4896</span>
          </a>
          <a href="https://maps.google.com/?q=Doha,Qatar" target="_blank" rel="noopener noreferrer" className="flex-1 border border-black py-10 px-8 hover:bg-black hover:text-white transition-all group">
            <span className="block text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Location</span>
            <span className="text-xl font-bold">Doha, Qatar</span>
          </a>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto reveal">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-12">Send us a message</h4>
          {submitted ? (
            <div className="border border-emerald-600 p-16 text-center">
              <div className="w-10 h-10 bg-emerald-600 flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-black text-lg">✓</span>
              </div>
              <h5 className="text-2xl font-black tracking-tighter mb-4">Message received.</h5>
              <p className="text-gray-500 font-light">We'll be in touch shortly at <span className="font-bold text-black">{form.email}</span>.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', comments: '' }); }} className="mt-10 text-[10px] font-black uppercase tracking-widest border-b-2 border-black hover:text-emerald-600 hover:border-emerald-600 transition-all">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="border border-gray-200 p-8 focus-within:border-black transition-colors">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full text-lg font-medium text-black placeholder-gray-300 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="border border-gray-200 border-l-0 p-8 focus-within:border-black transition-colors">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full text-lg font-medium text-black placeholder-gray-300 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="border border-gray-200 border-t-0 p-8 focus-within:border-black transition-colors">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+974 XXXX XXXX"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full text-lg font-medium text-black placeholder-gray-300 focus:outline-none bg-transparent"
                />
              </div>
              <div className="border border-gray-200 border-t-0 p-8 focus-within:border-black transition-colors">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Comments</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project or enquiry..."
                  value={form.comments}
                  onChange={e => setForm({ ...form, comments: e.target.value })}
                  className="w-full text-lg font-medium text-black placeholder-gray-300 focus:outline-none bg-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-7 bg-black text-white text-[11px] font-black uppercase tracking-[0.25em] hover:bg-emerald-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
);

const Footer = ({ setView }: { setView: (v: View) => void }) => (
  <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12">
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-2">
          <button onClick={() => setView('home')} className="flex items-center space-x-2 mb-10 outline-none">
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <span className="text-black font-black text-xs">O</span>
            </div>
            <span className="text-lg font-extrabold tracking-tighter uppercase">outgrow</span>
          </button>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            A marketing, advertising, and event management company dedicated to building powerful brands and delivering exceptional events.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-8">Navigation</h4>
          <ul className="space-y-4 text-sm font-bold tracking-wide">
            <li><button onClick={() => setView('about')} className="hover:text-emerald-400">About</button></li>
            <li><button onClick={() => { setView('home'); setTimeout(() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-emerald-400">Services</button></li>
            <li><a href="#works" className="hover:text-emerald-400">Works</a></li>
            <li><a href="#contact" className="hover:text-emerald-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-emerald-400">Careers</a></li>
            <li><button onClick={() => setView('privacy')} className="hover:text-emerald-400">Privacy Policy</button></li>
            <li><button onClick={() => setView('terms')} className="hover:text-emerald-400">Terms and Conditions</button></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-600 gap-4">
        <p>© {new Date().getFullYear()} Outgrow. Advertising, Marketing & Event Management.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
    const triggerObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    const timer = setTimeout(triggerObserver, 150);
    return () => clearTimeout(timer);
  }, [view]);

  return (
    <div className="min-h-screen">
      <Header setView={setView} currentView={view} />
      <main>
        {view === 'home' ? <HomePage setView={setView} />
          : view === 'about' ? <AboutPage />
          : view === 'service-marketing' ? <ServiceMarketingPage setView={setView} />
          : view === 'service-events' ? <ServiceEventsPage setView={setView} />
          : view === 'privacy' ? <PrivacyPage setView={setView} />
          : <TermsPage setView={setView} />}
        {view !== 'privacy' && view !== 'terms' && view !== 'service-marketing' && view !== 'service-events' && <Contact />}
      </main>
      <Footer setView={setView} />
    </div>
  );
}
