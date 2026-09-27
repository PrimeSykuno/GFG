import React, { useState, useEffect, useRef } from "react";
import {
  Flame,
  Skull,
  ScrollText,
  MapPin,
  Clock,
  Users,
  Wine,
  Swords,
  Sparkles,
  Menu,
  X,
  Check,
} from "lucide-react";
import "./App.css";

/**
 * THE MEPHISTO GAMBIT — event landing page
 * A Marvel-inspired, Mephisto-themed one-night immersive experience.
 *
 * Design tokens
 * -------------
 * Color:
 *   --void          #0A0503  (background, near-black with a warm cast)
 *   --ember-deep     #5C0F0D  (deep red, panel fills)
 *   --ember          #C81E1E  (primary accent, contracts/CTA)
 *   --brimstone      #C9982E  (gold, ledger/contract details)
 *   --ash            #E8DFD3  (primary text on dark)
 *   --smoke          #6B5850  (secondary text/borders)
 * Type:
 *   Display — 'Cormorant Garamond' (theatrical serif, contract/old-world feel)
 *   UI/Body — 'Space Grotesk' (contemporary geometric sans, modern event branding)
 * Layout: centered hero -> asymmetric ledger section -> card grid of
 *   "circles" -> interactive contract signature -> tiered pricing -> footer.
 * Principle: the fire is the one bold element (hero glow + ember field);
 *   everything else stays disciplined — a dark ledger, gold hairlines, restraint.
 */

const EVENT_DATE = new Date("2026-10-31T20:00:00");

function useCountdown(target) {
  const [left, setLeft] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamped = Math.max(left, 0);
  const days = Math.floor(clamped / 86400000);
  const hours = Math.floor((clamped % 86400000) / 3600000);
  const mins = Math.floor((clamped % 3600000) / 60000);
  const secs = Math.floor((clamped % 60000) / 1000);
  return { days, hours, mins, secs };
}

function Embers({ count = 22 }) {
  const embers = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 3,
    }))
  ).current;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="mb-3 text-[13px] tracking-wide" style={{ color: "#C9982E", fontFamily: "'Space Grotesk', sans-serif" }}>
      {children}
    </p>
  );
}

const CIRCLES = [
  {
    icon: Wine,
    title: "The Ashen Lounge",
    desc: "A dim bar carved from obsidian and gold leaf. Smoke-infused cocktails, poured slow, named after every deal Mephisto has ever won.",
  },
  {
    icon: Swords,
    title: "Trial by Fire",
    desc: "A forty-minute live escape encounter. Outwit the Lord of Lies before the last candle burns down, or leave something behind.",
  },
  {
    icon: ScrollText,
    title: "The Soul Market",
    desc: "A market of independent artists and makers selling wares no ordinary convention would allow. Barter is encouraged.",
  },
  {
    icon: Skull,
    title: "The Grand Wager",
    desc: "The night's centerpiece: a live stage production where the audience decides, vote by vote, what Mephisto is owed.",
  },
];

const TIERS = [
  {
    name: "Wanderer",
    price: "$65",
    tagline: "For those who only meant to look.",
    perks: ["General floor access", "The Soul Market", "One welcome ember cocktail"],
  },
  {
    name: "Bound Soul",
    price: "$145",
    tagline: "You read the fine print and signed anyway.",
    perks: [
      "Everything in Wanderer",
      "Priority entry to Trial by Fire",
      "Reserved Grand Wager seating",
      "Two ember cocktails",
    ],
    featured: true,
  },
  {
    name: "The Patron",
    price: "$320",
    tagline: "The house always remembers a generous patron.",
    perks: [
      "Everything in Bound Soul",
      "Private meet in the Ashen Lounge back room",
      "Signed contract keepsake",
      "Open bar all evening",
    ],
  },
];

export default function MephistoGambitLandingPage() {
  const { days, hours, mins, secs } = useCountdown(EVENT_DATE);
  const [navOpen, setNavOpen] = useState(false);
  const [signature, setSignature] = useState("");
  const [form, setForm] = useState({ name: "", email: "", tier: "Bound Soul" });
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div
      style={{
        background: "#0A0503",
        color: "#E8DFD3",
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-sm" style={{ background: "rgba(10,5,3,0.75)", borderBottom: "1px solid rgba(201,152,46,0.2)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="display text-xl" style={{ color: "#E8DFD3", letterSpacing: "0.04em" }}>
            Mephisto Gambit
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollTo("about")} className="hover:text-[#C9982E] transition-colors">The Bargain</button>
            <button onClick={() => scrollTo("circles")} className="hover:text-[#C9982E] transition-colors">The Circles</button>
            <button onClick={() => scrollTo("contract")} className="hover:text-[#C9982E] transition-colors">Sign In</button>
            <button
              onClick={() => scrollTo("register")}
              className="glow-btn px-4 py-2 rounded-sm text-sm"
              style={{ background: "#C81E1E", color: "#E8DFD3" }}
            >
              Reserve a Seat
            </button>
          </nav>
          <button className="md:hidden" onClick={() => setNavOpen((v) => !v)}>
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-5 text-sm">
            <button onClick={() => scrollTo("about")} className="text-left">The Bargain</button>
            <button onClick={() => scrollTo("circles")} className="text-left">The Circles</button>
            <button onClick={() => scrollTo("contract")} className="text-left">Sign In</button>
            <button onClick={() => scrollTo("register")} className="text-left" style={{ color: "#C9982E" }}>Reserve a Seat</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden" style={{ minHeight: "100vh", paddingTop: "5rem" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(200,30,30,0.22) 0%, transparent 60%)" }} />
        <Embers />
        <p className="hero-sub text-sm mb-6" style={{ color: "#C9982E" }}>
          One night only &middot; The Underworld Theatre, New York
        </p>
        <h1 className="hero-title display font-semibold" style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)", lineHeight: 0.95 }}>
          Every deal<br />has a price.
        </h1>
        <p className="hero-sub mt-6 max-w-xl text-base md:text-lg" style={{ color: "#B9AA9E" }}>
          Mephisto opens his court for a single evening of Marvel's darkest bargains —
          immersive theater, a masked market, and a cocktail that remembers your name.
          Sign if you dare.
        </p>

        <div className="hero-sub mt-10 flex gap-4 md:gap-6 text-center">
          {[["Days", days], ["Hrs", hours], ["Min", mins], ["Sec", secs]].map(([label, val]) => (
            <div key={label} className="contract-card rounded-sm px-4 py-3 min-w-[64px]">
              <div className="display text-2xl md:text-3xl" style={{ color: "#E8DFD3" }}>
                {String(val).padStart(2, "0")}
              </div>
              <div className="text-[11px] mt-1" style={{ color: "#8A776C" }}>{label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollTo("register")}
          className="hero-sub glow-btn mt-10 px-8 py-3 rounded-sm inline-flex items-center gap-2"
          style={{ background: "#C81E1E", color: "#E8DFD3", fontSize: "0.95rem" }}
        >
          <Flame size={16} /> Sign the Contract
        </button>
      </section>

      {/* ABOUT / LEDGER */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-start">
        <div>
          <SectionLabel>The bargain</SectionLabel>
          <h2 className="display text-3xl md:text-4xl mb-5" style={{ lineHeight: 1.15 }}>
            Mephisto doesn't send invitations. He sends terms.
          </h2>
          <p className="mb-4 leading-relaxed" style={{ color: "#B9AA9E" }}>
            For one night, the Underworld Theatre becomes his court — a place where
            actors, artists, and strangers trade favors under gold-veined ceilings and
            candlelight that never quite goes out.
          </p>
          <p className="leading-relaxed" style={{ color: "#B9AA9E" }}>
            You won't just watch the story. You'll be written into it — asked, at some
            point in the evening, to make a small wager of your own. What you get back
            depends on what you're willing to give.
          </p>
        </div>

        <div className="contract-card rounded-sm p-8">
          <h3 className="display text-xl mb-6" style={{ color: "#C9982E" }}>Terms of attendance</h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <Clock size={18} style={{ color: "#C9982E", marginTop: 2 }} />
              <span>October 31, 2026 &middot; Doors at 8:00 PM, curtain at 9:00 PM sharp</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} style={{ color: "#C9982E", marginTop: 2 }} />
              <span>The Underworld Theatre, 214 Brimstone Ave, New York, NY</span>
            </li>
            <li className="flex items-start gap-3">
              <Users size={18} style={{ color: "#C9982E", marginTop: 2 }} />
              <span>Capacity is held to 300 souls. Formal or costumed attire encouraged.</span>
            </li>
            <li className="flex items-start gap-3">
              <ScrollText size={18} style={{ color: "#C9982E", marginTop: 2 }} />
              <span>Ages 21+. No refunds once a contract is signed — Mephisto is firm on this.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CIRCLES / HIGHLIGHTS */}
      <section id="circles" className="max-w-6xl mx-auto px-6 py-24">
        <SectionLabel>What's inside</SectionLabel>
        <h2 className="display text-3xl md:text-4xl mb-12 max-w-2xl">Four rooms. Four kinds of trouble.</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {CIRCLES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="contract-card rounded-sm p-7 transition-colors">
              <Icon size={26} style={{ color: "#C81E1E" }} />
              <h3 className="display text-2xl mt-4 mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B9AA9E" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE SIGNATURE */}
      <section id="contract" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <SectionLabel>Before you go further</SectionLabel>
        <h2 className="display text-3xl md:text-4xl mb-4">Sign your name in his ledger.</h2>
        <p className="mb-8" style={{ color: "#B9AA9E" }}>
          Not binding — just tradition. Every guest signs before they buy a seat.
        </p>
        <input
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Your name"
          className="sig-input w-full max-w-md mx-auto block bg-transparent border-b text-2xl text-center py-3 outline-none"
          style={{ borderColor: "rgba(201,152,46,0.4)", color: "#E8DFD3" }}
        />
        <div className="mt-6 h-14 flex items-center justify-center">
          {signature && (
            <p className="sig-input text-3xl" style={{ color: "#C81E1E", textShadow: "0 0 18px rgba(200,30,30,0.5)" }}>
              {signature}
            </p>
          )}
        </div>
      </section>

      {/* REGISTRATION */}
      <section id="register" className="px-6 py-24" style={{ background: "linear-gradient(180deg, transparent, rgba(92,15,13,0.18))" }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Choose your terms</SectionLabel>
          <h2 className="display text-3xl md:text-4xl mb-12">Every tier gets a seat at the table.</h2>

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="contract-card rounded-sm p-8 flex flex-col"
                style={t.featured ? { borderColor: "#C9982E", background: "linear-gradient(180deg, rgba(201,152,46,0.1), rgba(10,5,3,0.6))" } : {}}
              >
                <h3 className="display text-2xl mb-1">{t.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#8A776C" }}>{t.tagline}</p>
                <p className="display text-4xl mb-6">{t.price}</p>
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check size={16} style={{ color: "#C9982E", marginTop: 3 }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setForm((f) => ({ ...f, tier: t.name }))}
                  className="glow-btn py-2.5 rounded-sm text-sm"
                  style={{
                    background: form.tier === t.name ? "#C81E1E" : "transparent",
                    border: "1px solid #C81E1E",
                    color: "#E8DFD3",
                  }}
                >
                  {form.tier === t.name ? "Selected" : "Choose " + t.name}
                </button>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="max-w-lg mx-auto contract-card rounded-sm p-8">
            {submitted ? (
              <div className="text-center py-6">
                <Sparkles size={28} style={{ color: "#C9982E" }} className="mx-auto mb-4" />
                <h3 className="display text-2xl mb-2">The ledger has your name.</h3>
                <p style={{ color: "#B9AA9E" }}>
                  Confirmation for the <span style={{ color: "#C9982E" }}>{form.tier}</span> tier
                  is on its way to {form.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs mb-2" style={{ color: "#8A776C" }}>Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full bg-transparent border rounded-sm px-4 py-2.5 outline-none text-sm"
                    style={{ borderColor: "rgba(201,152,46,0.3)", color: "#E8DFD3" }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "#8A776C" }}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    className="w-full bg-transparent border rounded-sm px-4 py-2.5 outline-none text-sm"
                    style={{ borderColor: "rgba(201,152,46,0.3)", color: "#E8DFD3" }}
                  />
                </div>
                <p className="text-xs" style={{ color: "#8A776C" }}>
                  Reserving the {form.tier} tier &middot; you can change this above.
                </p>
                <button type="submit" className="glow-btn w-full py-3 rounded-sm text-sm" style={{ background: "#C81E1E", color: "#E8DFD3" }}>
                  Confirm My Wager
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center text-xs" style={{ borderTop: "1px solid rgba(201,152,46,0.15)", color: "#6B5850" }}>
        <p className="display text-lg mb-2" style={{ color: "#8A776C" }}>Mephisto Gambit</p>
        <p>An unofficial fan-made event concept inspired by Marvel Comics. No souls are actually collected.</p>
      </footer>
    </div>
  );
}
