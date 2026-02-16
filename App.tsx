
import React, { useState, useEffect } from 'react';
import { SERVICES, PACKAGES } from './constants.tsx';
import { UserInput, GrowthStrategy as StrategyType } from './types.ts';
import { generateGrowthStrategy } from './services/geminiService.ts';

type View = 'home' | 'about';

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
        {currentView === 'home' && (
          <>
            <a href="#capabilities" className="hover:text-black transition-colors">Capabilities</a>
            <a href="#packages" className="hover:text-black transition-colors">Pricing</a>
            <a href="#ai-strategy" className="hover:text-black transition-colors">AI Insights</a>
          </>
        )}
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
              Outgrow is a multidisciplinary growth agency. We use strategy and technology to help ambitious brands scale beyond their limits.
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
          <p className="text-3xl md:text-4xl font-light leading-tight text-gray-400 mb-8">
            At Outgrow Business, we help brands move from <span className="text-black font-medium">potential to performance.</span>
          </p>
        </div>
        <div className="lg:col-span-7 space-y-8 text-xl text-gray-600 font-light leading-relaxed">
          <p>
            We are a growth-focused business solutions company built to support startups, SMEs, and ambitious brands that want more than just visibility — they want measurable results. Our approach combines strategy, creativity, and execution to help businesses grow smarter, faster, and stronger.
          </p>
          <p>
            We believe growth doesn’t happen by chance. It happens through clear strategy, strong branding, and consistent execution. That’s why we work closely with our clients as partners, not just service providers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32 reveal">
        <div className="border-t border-gray-100 pt-12">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-8">What We Do</h3>
          <p className="text-gray-500 mb-8 font-light">Outgrow Business specializes in custom-tailored solutions for every stage of growth.</p>
          <ul className="space-y-6 text-2xl font-bold tracking-tighter text-black">
            <li>Business growth strategy</li>
            <li>Marketing & brand development</li>
            <li>Social media & digital presence</li>
            <li>Content creation & campaign execution</li>
            <li>Business development support</li>
          </ul>
          <p className="mt-8 text-sm text-gray-400 font-medium italic">
            Every solution we provide is customized to fit the client’s goals, market, and stage of growth.
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
              <li key={i} className="text-xl font-medium text-gray-800 flex items-start">
                <span className="w-1.5 h-1.5 bg-emerald-500 mt-3 mr-4 flex-shrink-0"></span>
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
              We don’t just help businesses look good — we help them outgrow their limits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-32 reveal">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Our Vision</h3>
        <blockquote className="text-4xl md:text-5xl font-light italic leading-tight text-black mb-12">
          "To become a trusted growth partner for businesses looking to scale sustainably, build strong brands, and create long-lasting impact in their markets."
        </blockquote>
      </div>

      <div className="border-t-2 border-black pt-24 text-center reveal">
        <h3 className="text-huge font-black tracking-tighter mb-12">Let’s Grow Together</h3>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-light">
          Whether you’re launching, rebranding, or scaling, Outgrow Business is here to help you take the next step with confidence.
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

const Contact = () => (
  <section id="contact" className="py-32 md:py-48 px-6 md:px-12 bg-white">
    <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center reveal">
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 mb-8">Contact us</h2>
      <h3 className="text-huge font-extrabold tracking-tighter mb-12">
        Ready to <br /> outgrow?
      </h3>
      <p className="text-xl text-gray-500 max-w-2xl mb-16 leading-relaxed">
        Join the brands that are building for the future. We coordinate your transformation so you can lead your industry.
      </p>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl">
        <a href="mailto:hello@outgrow.agency" className="flex-1 border border-black py-10 px-8 hover:bg-black hover:text-white transition-all group">
          <span className="block text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Email us</span>
          <span className="text-xl font-bold">hello@outgrow.agency</span>
        </a>
        <div className="flex-1 border border-gray-100 py-10 px-8">
          <span className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-400">Location</span>
          <span className="text-xl font-bold">Dubai Silicon Oasis, UAE</span>
        </div>
      </div>
    </div>
  </section>
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
            A multidisciplinary growth agency dedicated to transforming visions into market leaders through strategic precision and creative excellence.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-8">Navigation</h4>
          <ul className="space-y-4 text-sm font-bold tracking-wide">
            <li><button onClick={() => setView('about')} className="hover:text-emerald-400">Who we are</button></li>
            <li><button onClick={() => setView('home')} className="hover:text-emerald-400">Capabilities</button></li>
            <li><button onClick={() => setView('home')} className="hover:text-emerald-400">Pricing</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-8">Connect</h4>
          <ul className="space-y-4 text-sm font-bold tracking-wide">
            <li><a href="#" className="hover:text-emerald-400">LinkedIn</a></li>
            <li><a href="#" className="hover:text-emerald-400">Instagram</a></li>
            <li><a href="#contact" className="hover:text-emerald-400">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-600 gap-4">
        <p>© {new Date().getFullYear()} Outgrow. The growth transformation company.</p>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
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
        {view === 'home' ? <HomePage setView={setView} /> : <AboutPage />}
        <Contact />
      </main>
      <Footer setView={setView} />
    </div>
  );
}
