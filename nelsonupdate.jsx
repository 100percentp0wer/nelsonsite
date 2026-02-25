import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "shift", label: "The Shift" },
  { id: "identity", label: "Brand Identity" },
  { id: "impact", label: "Impact Chain" },
  { id: "positioning", label: "Positioning" },
  { id: "gtm", label: "Go-To-Market" },
  { id: "status", label: "Where We Are" },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{
      display: "inline-block",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "#4ADE80",
      marginBottom: 20,
      padding: "4px 0",
      borderBottom: "1px solid rgba(74, 222, 128, 0.25)",
    }}>
      {text}
    </div>
  );
}

function Card({ children, accent = false, style = {} }) {
  return (
    <div style={{
      background: accent ? "rgba(74, 222, 128, 0.04)" : "rgba(255,255,255,0.025)",
      border: `1px solid ${accent ? "rgba(74, 222, 128, 0.15)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 12,
      padding: "28px 32px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function CompareRow({ before, after }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginBottom: 12,
    }}>
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 8,
        padding: "14px 18px",
        fontSize: 14,
        color: "rgba(250,250,249,0.45)",
        lineHeight: 1.55,
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", display: "block", marginBottom: 6 }}>Before</span>
        {before}
      </div>
      <div style={{
        background: "rgba(74, 222, 128, 0.03)",
        border: "1px solid rgba(74, 222, 128, 0.12)",
        borderRadius: 8,
        padding: "14px 18px",
        fontSize: 14,
        color: "rgba(250,250,249,0.85)",
        lineHeight: 1.55,
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4ADE80", display: "block", marginBottom: 6 }}>Now</span>
        {after}
      </div>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontSize: 36,
        fontWeight: 300,
        color: "#4ADE80",
        lineHeight: 1,
        marginBottom: 8,
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>
        {number}
      </div>
      <div style={{
        fontSize: 12,
        color: "rgba(250,250,249,0.45)",
        letterSpacing: "0.04em",
        lineHeight: 1.4,
      }}>
        {label}
      </div>
    </div>
  );
}

export default function NelsonUpdate() {
  const [activeSection, setActiveSection] = useState("shift");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{
      background: "#0C0A09",
      color: "#FAFAF9",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: "100vh",
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      {/* Subtle top gradient */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 300,
        background: "radial-gradient(ellipse at 50% -20%, rgba(74, 222, 128, 0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Side nav */}
      <nav style={{
        position: "fixed",
        left: 32,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontSize: 11,
              fontWeight: activeSection === s.id ? 500 : 400,
              color: activeSection === s.id ? "#4ADE80" : "rgba(250,250,249,0.2)",
              textDecoration: "none",
              padding: "4px 0",
              transition: "color 0.3s",
              letterSpacing: "0.03em",
            }}
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* Main content */}
      <main style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "0 24px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Header */}
        <header style={{
          paddingTop: 100,
          paddingBottom: 80,
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          marginBottom: 80,
        }}>
          <FadeIn>
            <div style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(250,250,249,0.3)",
              marginBottom: 32,
            }}>
              100percent · Rebrand Update
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#FAFAF9",
              marginBottom: 24,
              maxWidth: 600,
            }}>
              Where we are.<br />
              <span style={{ color: "#4ADE80", fontStyle: "italic" }}>Where we're going.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{
              fontSize: 16,
              color: "rgba(250,250,249,0.5)",
              lineHeight: 1.7,
              maxWidth: 520,
            }}>
              A complete overview of the 100percent rebrand — the strategic shift, the new identity, the impact chain, and the go-to-market direction. Prepared for our conversation on the 27th.
            </p>
          </FadeIn>
        </header>

        {/* ─── SECTION 1: THE SHIFT ─── */}
        <section id="shift" style={{ marginBottom: 100 }}>
          <FadeIn>
            <SectionLabel text="01 — The Shift" />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: 24,
            }}>
              We stopped being a charging company.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 28 }}>
              When you last saw our website, it said <span style={{ color: "rgba(250,250,249,0.3)", fontStyle: "italic" }}>"Keep Guests Charged & Spending Longer."</span> That's what every power bank company says. It sells dwell time and revenue share. It speaks to a venue's spreadsheet, not their gut. It put us in the same box as ChargedUp, Joos, and everyone else.
            </p>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 36 }}>
              We've moved away from this completely. The rebrand is built around one insight: a phone dying in public isn't a tech problem — it's a human one. We don't sell power banks. We protect moments. And we've rebuilt everything — the brand, the messaging, the positioning, the impact story — around that belief.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CompareRow
              before="Keep Guests Charged & Spending Longer"
              after="Don't let your battery decide when your night ends."
            />
            <CompareRow
              before="Power bank rental company with revenue share"
              after="The company that makes sure no moment gets lost to a dead battery"
            />
            <CompareRow
              before="Product-first pitch: here's our kiosk, here's your revenue"
              after="Belief-first pitch: here's the moment being lost, here's what we prevent"
            />
            <CompareRow
              before="No impact story"
              after="Every charge backs a woman entrepreneur rebuilding after war"
            />
          </FadeIn>
        </section>

        {/* ─── SECTION 2: BRAND IDENTITY ─── */}
        <section id="identity" style={{ marginBottom: 100 }}>
          <FadeIn>
            <SectionLabel text="02 — Brand Identity" />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: 24,
            }}>
              What 100percent <span style={{ fontStyle: "italic" }}>feels</span> like now.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4ADE80", marginBottom: 16 }}>Commander's Intent</div>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 26,
                fontWeight: 400,
                fontStyle: "italic",
                color: "#FAFAF9",
                lineHeight: 1.35,
              }}>
                "We never let a moment go dark."
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(250,250,249,0.4)", marginBottom: 12 }}>Tagline</div>
                <div style={{ fontSize: 18, fontWeight: 400, color: "#FAFAF9" }}>Every Moment. Powered.</div>
              </Card>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(250,250,249,0.4)", marginBottom: 12 }}>Impact Line</div>
                <div style={{ fontSize: 18, fontWeight: 400, color: "#FAFAF9" }}>Every charge powers more than a phone.</div>
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 20 }}>
              The personality is the friend who makes sure everyone's having the best night of their lives AND makes sure everyone gets home safe. Reliable but not boring. Energetic but not loud. Warm but with depth.
            </p>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 28 }}>
              Underneath the energy, there's a story. A founder who's already on the ground in war-affected communities, already backing women entrepreneurs, already building something that lasts longer than any single charge. The customer senses it without being lectured.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Card accent style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4ADE80", marginBottom: 16 }}>The Messaging Hierarchy</div>
              <p style={{ fontSize: 14, color: "rgba(250,250,249,0.55)", lineHeight: 1.65, marginBottom: 16 }}>
                Following Steve Jobs: sell the improvement first, then the mechanism, then the mission. The impact chain comes last — not because it's least important, but because it lands hardest when everything before it has already connected.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { level: "Level 1", title: "The Headline", desc: "Don't let your battery decide when your night ends.", color: "#FAFAF9" },
                  { level: "Level 2", title: "The Mechanism", desc: "Tap. Grab. Charge on the go. Return to any kiosk. From £3.", color: "rgba(250,250,249,0.75)" },
                  { level: "Level 3", title: "The Differentiator", desc: "2× faster. Costs less. Your brand on our screen, not ours.", color: "rgba(250,250,249,0.6)" },
                  { level: "Level 4", title: "The Mission", desc: "Every charge funds microloans for women entrepreneurs rebuilding after war. The loans recycle. The impact is perpetual.", color: "#4ADE80" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(250,250,249,0.25)", minWidth: 52, flexShrink: 0 }}>{item.level}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: item.color, minWidth: 120, flexShrink: 0 }}>{item.title}</span>
                    <span style={{ fontSize: 13, color: "rgba(250,250,249,0.5)", lineHeight: 1.5 }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* ─── SECTION 3: IMPACT CHAIN ─── */}
        <section id="impact" style={{ marginBottom: 100 }}>
          <FadeIn>
            <SectionLabel text="03 — The Impact Chain" />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: 24,
            }}>
              Not charity. Infrastructure.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 28 }}>
              The original impact chain was solar lights for children studying after dark. Simple, emotional — but it was closer to delivering an object than backing a person. We've shifted to something fundamentally stronger: funding women entrepreneurs in war-affected communities through a digital microfinance scheme.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card accent style={{ marginBottom: 24 }}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontStyle: "italic",
                color: "#FAFAF9",
                lineHeight: 1.4,
                marginBottom: 20,
              }}>
                "Every charge helps a woman in a war-affected community build a business."
              </div>
              <p style={{ fontSize: 14, color: "rgba(250,250,249,0.55)", lineHeight: 1.65 }}>
                "Build a business" signals empowerment, not charity. "War-affected" carries the gravity without needing explanation. The audience understands: this isn't a handout. This is someone being backed.
              </p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>The Compounding Model</h3>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 20 }}>
              This is the structural advantage that separates 100percent from every other purpose-driven brand. The loans get repaid. The capital recycles with interest. New women access it. A charge on a kiosk in 2026 is still funding women in 2030, 2035, and beyond — without another penny going in.
            </p>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 28 }}>
              Even if 100percent disappeared tomorrow, the capital already in the system keeps cycling. The women keep building. That's not charity. That's infrastructure. And it's the thing that makes sophisticated decision-makers lean in — because they recognise it's structurally different from CSR.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card style={{ marginBottom: 24, background: "rgba(74, 222, 128, 0.02)", border: "1px solid rgba(74, 222, 128, 0.08)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4ADE80", marginBottom: 20 }}>The Parallel</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <p style={{ fontSize: 14, color: "rgba(250,250,249,0.5)", lineHeight: 1.65, marginBottom: 12 }}>
                    In a London bar, your phone dies. Your night stalls. You tap our kiosk. Your moment continues.
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 14, color: "rgba(250,250,249,0.5)", lineHeight: 1.65, marginBottom: 12 }}>
                    In the Eastern Province of Sri Lanka, a woman who lost everything to war is building a business from nothing. Every charge on our kiosks is part of what's backing her.
                  </p>
                </div>
              </div>
              <div style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid rgba(74, 222, 128, 0.1)",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 18,
                fontStyle: "italic",
                color: "#4ADE80",
                textAlign: "center",
                lineHeight: 1.45,
              }}>
                You keep your night going. She keeps her future going.<br />Same charge. And that charge keeps working long after both of you have moved on.
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>What's Already Real</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
              <Card>
                <Stat number="120+" label="Women in the microfinance scheme" />
              </Card>
              <Card>
                <Stat number="£125" label="Starts a business on fair terms" />
              </Card>
              <Card>
                <Stat number="Q1 2026" label="Scheme goes live" />
              </Card>
            </div>
            <p style={{ fontSize: 14, color: "rgba(250,250,249,0.45)", lineHeight: 1.65 }}>
              Partnership with Vanni Hope, through the Aram Initiative. Digital microfinance for women-owned businesses in Sri Lanka's Eastern Province — agriculture, value-add, food production. The infrastructure to deliver on this impact chain is not hypothetical. It's in motion.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card style={{ marginTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,249,0.4)", marginBottom: 16 }}>The Journey</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { chapter: "Chapter 1", title: "Back 100 Women", desc: "Fund, support, and document 100 women entrepreneurs. The audience follows the counter from 0 to 100. They meet individual women along the way." },
                  { chapter: "Chapter 2", title: "Go Deeper", desc: "Help those businesses grow. Connect them to new markets. The first loans get repaid — the compounding begins visibly. The audience watches women they know by name go from starting to thriving." },
                  { chapter: "Chapter 3", title: "The Ripple", desc: "A woman's business employs another woman. Her children go to school. Her community has a new income source. The repaid capital funds the next woman. Individual success becomes community transformation." },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: 16,
                    padding: "12px 0",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "#4ADE80", minWidth: 68, flexShrink: 0, paddingTop: 3 }}>{item.chapter}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: "#FAFAF9", marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(250,250,249,0.45)", lineHeight: 1.55 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* ─── SECTION 4: POSITIONING ─── */}
        <section id="positioning" style={{ marginBottom: 100 }}>
          <FadeIn>
            <SectionLabel text="04 — Competitive Positioning" />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: 24,
            }}>
              They sell the box. We sell what the box protects.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 28 }}>
              Our competitors — ChargedUp, Joos, Naki, ZAPT — all position as power bank rental companies selling dwell time and revenue share. We position on meaning, not mechanics. They optimised their product for their business model (slower charging = longer rentals = more revenue). We optimised for the human experience. That's why our product is genuinely better AND cheaper.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              {[
                { title: "2× Faster", desc: "We'd rather you were back in your moment than watching a battery bar.", philosophy: "Speed as philosophy" },
                { title: "Costs Less", desc: "Access to power shouldn't feel like a cost. It should feel like nothing.", philosophy: "Price as principle" },
                { title: "Your Brand, Not Ours", desc: "Our kiosks carry your venue's brand. Your space should look like yours.", philosophy: "Design as respect" },
                { title: "Perpetual Impact", desc: "Every charge seeds a loan that recycles forever. No competitor has anything close.", philosophy: "Impact as moat" },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.05}>
                  <Card>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4ADE80", marginBottom: 8 }}>{item.philosophy}</div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: "#FAFAF9", marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(250,250,249,0.45)", lineHeight: 1.55 }}>{item.desc}</div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Card accent>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4ADE80", marginBottom: 16 }}>The Venue Pitch — In Order</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { step: "01", text: "Open with the moment being lost. Not the product." },
                  { step: "02", text: "Let them feel it — the nights ending early, the Ubers that never get called, the groups that split." },
                  { step: "03", text: "Introduce 100percent as the answer. Free for the venue. Revenue share. Better product." },
                  { step: "04", text: "Product advantages confirm the feeling — faster, cheaper, their brand on our screen." },
                  { step: "05", text: "Close with the trial. Two weeks. No cost. No commitment." },
                  { step: "06", text: "The impact chain is the final reveal — the thing that makes them proud, not just profitable." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(74, 222, 128, 0.5)", minWidth: 24 }}>{item.step}</span>
                    <span style={{ fontSize: 14, color: "rgba(250,250,249,0.6)", lineHeight: 1.55 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* ─── SECTION 5: GTM ─── */}
        <section id="gtm" style={{ marginBottom: 100 }}>
          <FadeIn>
            <SectionLabel text="05 — Go-To-Market" />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: 24,
            }}>
              Nightlife first. Density before breadth.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(250,250,249,0.65)", lineHeight: 1.75, marginBottom: 28 }}>
              Per your advice — we're focused on one venue type. Nightlife is where the "lost moment" hits hardest emotionally, where competitors are most active (meaning big groups have been pitched and we can dislodge or differentiate), and where the social proof and content engine work best.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,249,0.4)", marginBottom: 16 }}>Target Decision-Maker</div>
              <p style={{ fontSize: 15, color: "rgba(250,250,249,0.7)", lineHeight: 1.65 }}>
                Head of operations or head of partnerships at a venue group running 20+ sites who has already been pitched by ChargedUp or Joos and thinks they're all the same. We're not selling to independents. We're going straight to the groups — because the concept is validated globally and we need to prove that we are the one they should pick.
              </p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,249,0.4)", marginBottom: 16 }}>The Two Weapons</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#FAFAF9", marginBottom: 6 }}>Aggressive economics</div>
                  <p style={{ fontSize: 13, color: "rgba(250,250,249,0.45)", lineHeight: 1.55 }}>
                    Competitive revenue share that eliminates the switching cost. We lead with this to get in the door. The first big group deal is a loss leader for everything after it.
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#FAFAF9", marginBottom: 6 }}>Brand & impact differentiation</div>
                  <p style={{ fontSize: 13, color: "rgba(250,250,249,0.45)", lineHeight: 1.55 }}>
                    This is what makes them want to switch fully — and what makes them stay. Venue branding, quarterly impact reports, a partnership that deepens over time. No competitor offers anything close.
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,249,0.4)", marginBottom: 16 }}>Expansion Sequence</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                { label: "Nightlife", active: true },
                { label: "Events & Festivals" },
                { label: "Tourism & Leisure" },
                { label: "Healthcare" },
                { label: "Transport & Shopping" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                  background: item.active ? "rgba(74, 222, 128, 0.12)" : "rgba(255,255,255,0.04)",
                  color: item.active ? "#4ADE80" : "rgba(250,250,249,0.35)",
                  border: `1px solid ${item.active ? "rgba(74, 222, 128, 0.25)" : "rgba(255,255,255,0.06)"}`,
                }}>
                  {i > 0 && <span style={{ marginRight: 6, opacity: 0.4 }}>{i + 1}.</span>}
                  {item.label}
                  {item.active && <span style={{ marginLeft: 8, fontSize: 10, opacity: 0.6 }}>NOW</span>}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ─── SECTION 6: STATUS ─── */}
        <section id="status" style={{ marginBottom: 100 }}>
          <FadeIn>
            <SectionLabel text="06 — Where We Are Now" />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: 24,
            }}>
              What's done. What's next.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4ADE80", marginBottom: 20 }}>Completed</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Complete brand identity rebuilt — brand system, voice, messaging hierarchy, competitive positioning",
                  "Impact chain developed — shifted from solar lights to women's empowerment through microfinance",
                  "Compounding model defined — loans recycle, impact is perpetual, structurally different from CSR",
                  "Founder video scripts written — 25+ scripts across 5 series: product, moments, impact, founder journey, bigger picture",
                  "Content calendar structured — 3 posts/week, golden ratio of 1 impact video per 3–4 product/belief videos",
                  "Website direction set — one-page site built, redesign brief created for full Lovable rebuild",
                  "Sales philosophy defined — belief-first pitch, trial close, objection reframing, historical parallels",
                  "GTM focused on nightlife, targeting venue groups not independents",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#4ADE80", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: "rgba(250,250,249,0.6)", lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card style={{ marginBottom: 24, background: "rgba(251, 191, 36, 0.03)", border: "1px solid rgba(251, 191, 36, 0.1)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FBBF24", marginBottom: 20 }}>Before Going Public with Impact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Charge-to-impact number confirmed — how many charges = one woman backed. Real maths. Verified.",
                  "Microfinance scheme live and functioning (end of Q1 2026 target with Vanni Hope)",
                  "Consent protocols in place — every woman featured has given informed consent",
                  "3–5 women's stories filmed and ready to tell on launch day",
                  "Visual standard set — determination, agency, warmth. Entrepreneurs, not beneficiaries.",
                  "Compounding model verified with real repayment data",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#FBBF24", fontSize: 14, marginTop: 2, flexShrink: 0 }}>○</span>
                    <span style={{ fontSize: 14, color: "rgba(250,250,249,0.55)", lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,249,0.4)", marginBottom: 20 }}>What I'd Like Your Thoughts On</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { q: "Does this positioning feel genuinely different?", detail: "When you look at this brand versus what you've seen from competitors in this space — does it stand apart?" },
                  { q: "Does the impact chain land as real differentiation for big groups?", detail: "Or is it a nice-to-have that doesn't move the needle in a venue group decision-maker's mind?" },
                  { q: "The compounding model — is this the thing that makes sophisticated people lean in?", detail: "The perpetual impact, the recycling capital — does this register as structurally different, or does it need to be simpler?" },
                  { q: "How do we get in front of the big groups?", detail: "With this brand, this product, this impact story — what's the fastest path to the decision-makers that matter?" },
                  { q: "What am I not seeing?", detail: "You've built and scaled in hospitality before. What's the blind spot?" },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "14px 0",
                    borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#FAFAF9", marginBottom: 4 }}>{item.q}</div>
                    <div style={{ fontSize: 13, color: "rgba(250,250,249,0.4)", lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* ─── CLOSING ─── */}
        <section style={{ marginBottom: 80, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <FadeIn>
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(250,250,249,0.7)",
                lineHeight: 1.5,
                maxWidth: 480,
                margin: "0 auto 24px",
              }}>
                The mission was here first.<br />
                The business was built around it.<br />
                That order of operations can't be faked.
              </div>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#4ADE80",
              }}>
                100percent — Every Moment. Powered.
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <footer style={{
          textAlign: "center",
          padding: "32px 0 48px",
          borderTop: "1px solid rgba(255,255,255,0.03)",
        }}>
          <div style={{ color: "rgba(250,250,249,0.15)", fontSize: 11 }}>
            100percent · Prepared for Nelson Sivalingam · February 2026
          </div>
        </footer>
      </main>
    </div>
  );
}
