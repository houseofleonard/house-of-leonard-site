"use client";

import { useState } from "react";

const colors = {
  primary: "#060d2a",
  primaryContainer: "#1c2340",
  onPrimary: "#ffffff",
  secondary: "#755b00",
  secondaryContainer: "#fed977",
  onSecondaryContainer: "#785d00",
  surface: "#fff8f2",
  surfaceDim: "#e9d8bb",
  surfaceContainerLow: "#fff2de",
  surfaceContainer: "#fdecce",
  onSurface: "#231a08",
  onSurfaceVariant: "#46464d",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true }),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: colors.surface, color: colors.onSurface, minHeight: "100vh" }}>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="glass-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "1.25rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "2rem", flex: 1 }} className="hidden-mobile">
          <span className="section-label" style={{ color: `${colors.primary}55`, cursor: "default" }}>THE EDIT</span>
          <span className="section-label" style={{ color: `${colors.primary}55`, cursor: "default" }}>JOURNAL</span>
        </div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <span style={{
            fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
            fontWeight: 300,
            color: colors.primary,
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
          }}>
            HOUSE OF LEONARD
          </span>
        </div>

        <div style={{ display: "flex", gap: "2rem", flex: 1, justifyContent: "flex-end", alignItems: "center" }} className="hidden-mobile">
          <span className="section-label" style={{ color: `${colors.primary}55`, cursor: "default" }}>COMMUNITY</span>
          <a
            href="#notify"
            className="btn-primary"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary} 0%, #a07d00 100%)`,
              fontSize: "0.65rem",
              padding: "0.5rem 1.25rem",
            }}
          >
            JOIN THE CIRCLE
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", paddingBottom: "7rem", overflow: "hidden" }}>
        {/* Background — Mediterranean coastal setting */}
        {/* TODO: Replace with AI-generated or commissioned brand photography of silver-fox man in bold coloured jacket */}
        {/* Reference: Stitch mockup shows distinguished silver-haired man, 60s, bold cobalt or rust blazer, Mediterranean terrace */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1800&q=80&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
          aria-hidden="true"
        />

        {/* Navy gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(6,13,42,0.90) 0%, rgba(6,13,42,0.5) 45%, rgba(6,13,42,0.15) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 3rem" }}>
          <div style={{ maxWidth: "720px" }}>
            <p className="section-label" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
              EST. MMXXV · SYDNEY
            </p>
            <h1 style={{
              fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
              fontWeight: 300,
              color: colors.onPrimary,
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              lineHeight: 1,
              marginBottom: "2rem",
              letterSpacing: "-0.01em",
            }}>
              Something<br />
              <em>Exceptional</em><br />
              Is Coming.
            </h1>
            <p style={{
              fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.78)",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.85,
              marginBottom: "3rem",
              maxWidth: "520px",
            }}>
              For the man who knows his own mind — and dresses accordingly.
              House of Leonard is a new kind of menswear: considered, confident,
              and unapologetically bold.
            </p>
            <a href="#notify" className="btn-primary">
              Be the First to Know
            </a>
          </div>
        </div>
      </section>

      {/* ── Brand Intro ────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: colors.surface, padding: "7rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <p className="section-label" style={{ color: colors.secondary, marginBottom: "1.5rem" }}>REFINED ECCENTRICITY</p>
            <h2 style={{
              fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
              fontWeight: 300,
              color: colors.primary,
              fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
              lineHeight: 1.15,
              marginBottom: "2rem",
            }}>
              Style gets bolder<br />
              <em>with age, not quieter.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: colors.onSurfaceVariant, lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "1.05rem" }}>
              House of Leonard is menswear for the man who has figured out who he is.
              Not the man trying to look younger, but the man comfortable in his own
              skin — and choosing to make that skin exceptionally well-dressed.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: colors.onSurfaceVariant, lineHeight: 1.85, fontSize: "1.05rem" }}>
              We are building something that does not exist yet: a brand with genuine
              editorial intelligence, a sense of humour, and the confidence to wear
              terracotta on a Tuesday.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div className="editorial-shadow" style={{
              aspectRatio: "3/4",
              backgroundColor: colors.surfaceContainer,
              borderRadius: "0.25rem",
              overflow: "hidden",
              maxHeight: "580px",
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                backgroundImage: "url('/placeholder-hero.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Pillars ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: colors.surfaceContainerLow, padding: "7rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="section-label" style={{ color: colors.secondary, marginBottom: "1rem" }}>THE PHILOSOPHY</p>
            <h2 style={{
              fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
              fontWeight: 300,
              color: colors.primary,
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            }}>
              Three things we refuse to compromise on.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4rem" }}>
            {[
              {
                number: "01",
                title: "Quality Without Apology",
                body: "We source from the same ateliers the major houses do. The difference is we tell you where everything comes from — and why it matters.",
              },
              {
                number: "02",
                title: "Colour as Conviction",
                body: "The beige option is always there. We just happen to think you are more interesting than that. Our palettes are considered, warm, and deliberately bold.",
              },
              {
                number: "03",
                title: "Cut for Confidence",
                body: "Not the 22-year-old sample size. Clothes designed for a body that has lived — and the man who knows exactly what it deserves.",
              },
            ].map((pillar) => (
              <div key={pillar.number}>
                <p style={{
                  fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
                  fontWeight: 300,
                  color: `${colors.secondary}55`,
                  fontSize: "3rem",
                  lineHeight: 1,
                  marginBottom: "1rem",
                }}>
                  {pillar.number}
                </p>
                <h3 style={{
                  fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
                  fontWeight: 300,
                  color: colors.primary,
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}>
                  {pillar.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: colors.onSurfaceVariant, lineHeight: 1.85, fontSize: "0.9rem" }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email Capture ──────────────────────────────────────────────── */}
      <section id="notify" style={{ backgroundColor: colors.primary, padding: "8rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3rem", textAlign: "center" }}>
          <p className="section-label" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
            THE INNER CIRCLE
          </p>
          <h2 style={{
            fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
            fontWeight: 300,
            color: colors.onPrimary,
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            Be the first to know.
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.05rem",
            lineHeight: 1.85,
            maxWidth: "480px",
            margin: "0 auto 3rem",
          }}>
            Early access, editorial dispatches, and the occasional very good reason
            to buy a new linen shirt. No noise. Just the good stuff.
          </p>

          {submitted ? (
            <div style={{ maxWidth: "480px", margin: "0 auto", padding: "2rem 0" }}>
              <p style={{
                fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
                fontWeight: 300,
                fontStyle: "italic",
                color: colors.onPrimary,
                fontSize: "1.6rem",
              }}>
                You&apos;re on the list. Something exceptional is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem", textAlign: "left" }}>
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  style={{
                    marginTop: "2px",
                    accentColor: colors.secondary,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <label htmlFor="consent" style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                  cursor: "pointer",
                }}>
                  I&apos;d like to receive updates and news from House of Leonard
                </label>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    borderBottom: "2px solid rgba(255,255,255,0.25)",
                    outline: "none",
                    padding: "0.75rem 0",
                    color: colors.onPrimary,
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    borderRadius: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary} 0%, #a07d00 100%)`,
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                    border: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {loading ? "..." : "Join the Circle"}
                </button>
              </div>
            </form>
          )}

          <p style={{
            marginTop: "1.5rem",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-label)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
          }}>
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: colors.surfaceDim, padding: "3rem 0" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
            fontWeight: 300,
            color: `${colors.primary}88`,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            fontSize: "0.9rem",
          }}>
            HOUSE OF LEONARD
          </span>

          <p className="section-label" style={{ color: `${colors.onSurfaceVariant}88` }}>
            © {new Date().getFullYear()} House of Leonard. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {/* TODO: Replace # with real Instagram URL */}
            <a href="#" className="section-label" style={{ color: colors.onSurfaceVariant, textDecoration: "none" }}>
              INSTAGRAM
            </a>
            <a href="mailto:hello@houseofleonard.com" className="section-label" style={{ color: colors.onSurfaceVariant, textDecoration: "none" }}>
              CONTACT
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>

    </main>
  );
}
