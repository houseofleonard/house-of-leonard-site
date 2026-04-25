"use client";

import React, { useState } from "react";
import Link from "next/link";

const colors = {
  primary: "#060d2a",
  primaryContainer: "#1c2340",
  onPrimary: "#ffffff",
  secondary: "#755b00",
  surface: "#ffffff",
  onSurface: "#231a08",
  onSurfaceVariant: "#46464d",
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 0",
    fontSize: "1rem",
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    color: colors.onSurface,
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${colors.primary}30`,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <main style={{ backgroundColor: colors.surface, color: colors.onSurface, minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "1.25rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}>
        <div style={{ flex: 1 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
            fontWeight: 300,
            color: colors.primary,
            textTransform: "uppercase" as const,
            letterSpacing: "0.28em",
            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
          }}>
            HOUSE OF LEONARD
          </span>
        </Link>
        <div style={{ flex: 1 }} />
      </nav>

      {/* Content */}
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "10rem 2rem 6rem" }}>

        <p style={{
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: `${colors.onSurfaceVariant}88`,
          marginBottom: "1.5rem",
        }}>
          Get in touch
        </p>

        <h1 style={{
          fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
          fontWeight: 300,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          color: colors.primary,
          lineHeight: 1.15,
          marginBottom: "3rem",
        }}>
          Say hello.
        </h1>

        {submitted ? (
          <div>
            <p style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: "1.1rem", lineHeight: 1.7, color: colors.onSurface, marginBottom: "2rem" }}>
              Message received. Leonard will be in touch.
            </p>
            <Link href="/" style={{
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: colors.primary,
              textDecoration: "none",
              borderBottom: `1px solid ${colors.primary}40`,
              paddingBottom: "2px",
            }}>
              Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            <div>
              <label style={{ display: "block", fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: `${colors.onSurfaceVariant}88`, marginBottom: "0.5rem" }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Your name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: `${colors.onSurfaceVariant}88`, marginBottom: "0.5rem" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: `${colors.onSurfaceVariant}88`, marginBottom: "0.5rem" }}>
                Message
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                placeholder="What's on your mind?"
                rows={5}
                style={{ ...inputStyle, resize: "none" as const, paddingTop: "0.5rem" }}
              />
            </div>

            {error && (
              <p style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: "0.85rem", color: "#c0392b" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !name || !email || !message}
              style={{
                alignSelf: "flex-start",
                padding: "0.875rem 2.5rem",
                background: `linear-gradient(135deg, ${colors.secondary} 0%, #a07d00 100%)`,
                color: colors.onPrimary,
                border: "none",
                cursor: loading ? "wait" : "pointer",
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase" as const,
                opacity: (!name || !email || !message) ? 0.5 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Sending…" : "Send"}
            </button>

          </form>
        )}
      </div>
    </main>
  );
}
