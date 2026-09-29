import React from "react";
import CTAButtons from "./CTAButtons";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid-container">
        {/* LEFT COLUMN: HERO HEADLINE, CTAs & METRICS */}
        <div className="hero-content-col">
          <div className="hero-telemetry-badge">
            <span className="telemetry-dot" />
            <span className="telemetry-label">
              SONY FX3 // VERTICAL SHORTS &amp; REELS
            </span>
          </div>

          <h1 className="hero-main-title">
            <span className="hero-title-top">Crafting Videos</span>
            <span className="hero-title-top">That</span>
            <span className="hero-gradient-text">Capture Attention</span>
            <span className="hero-title-bottom">&amp; Drive Results</span>
          </h1>

          <p className="hero-lead-text">
            High-retention Shorts, Reels, and  motion graphics engineered
            for high-scale creators to maximize watch time and conversions.
          </p>

          <div className="hero-action-dock">
            <CTAButtons />
          </div>

          <div className="hero-metrics-ribbon">
            <div className="metric-chip">
              <span className="metric-val">45M+</span>
              <span className="metric-lbl">VIEWS PRODUCED</span>
            </div>
            <span className="metric-sep">/</span>
            <div className="metric-chip">
              <span className="metric-val">68%</span>
              <span className="metric-lbl">AVG RETENTION</span>
            </div>
            <span className="metric-sep">/</span>
            <div className="metric-chip">
              <span className="metric-val">36H</span>
              <span className="metric-lbl">TURNAROUND</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SONY FX3 CINEMATIC CREATOR STAGE */}
        <div className="hero-visual-col">
          <div className="fx3-cinema-stage">
            {/* Soft cyan rim glow behind head only */}
            <div className="fx3-creator-cyan-halo" aria-hidden="true" />

            {/* Portrait Mount */}
            <div className="fx3-portrait-mount">
              <img
                src="/pawan.webp"
                alt="Pawan Kumar // Cinema Editor & Motion Designer"
                className="fx3-portrait-core"
                width="640"
                height="679"
                fetchPriority="high"
                decoding="async"
                loading="eager"
              />
            </div>

            {/* Clean Orbit HUD Badges */}
            <div className="fx3-orbit-hud">
              {/* Left Flank */}
              <div className="fx3-hud-card card-viral">
                <div className="hud-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div className="hud-text-stack">
                  <span className="hud-title">VIRAL ANIMATIONS</span>
                  <span className="hud-sub">HIGHER RETENTION</span>
                </div>
              </div>

              <div className="fx3-hud-card card-shorts">
                <div className="hud-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="#00D4FF" stroke="none" />
                  </svg>
                </div>
                <div className="hud-text-stack">
                  <span className="hud-title">YOUTUBE SHORTS</span>
                  <span className="hud-sub">WATCH TIME GROWTH</span>
                </div>
              </div>

              <div className="fx3-hud-card card-talking">
                <div className="hud-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div className="hud-text-stack">
                  <span className="hud-title">TALKING HEAD VIDEOS</span>
                  <span className="hud-sub">CLEAN &amp; ENGAGING</span>
                </div>
              </div>

              {/* Right Flank */}
              <div className="fx3-hud-card card-podcast">
                <div className="hud-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
                <div className="hud-text-stack">
                  <span className="hud-title">PODCAST CLIPS</span>
                  <span className="hud-sub">MORE REACH</span>
                </div>
              </div>

              <div className="fx3-hud-card card-sound">
                <div className="hud-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="10" x2="2" y2="14" />
                    <line x1="6" y1="6" x2="6" y2="18" />
                    <line x1="10" y1="3" x2="10" y2="21" />
                    <line x1="14" y1="8" x2="14" y2="16" />
                    <line x1="18" y1="5" x2="18" y2="19" />
                    <line x1="22" y1="10" x2="22" y2="14" />
                  </svg>
                </div>
                <div className="hud-text-stack">
                  <span className="hud-title">SOUND DESIGN</span>
                  <span className="hud-sub">SFX &amp; FOLEY</span>
                </div>
              </div>

              <div className="fx3-hud-card card-kinetic">
                <div className="hud-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <div className="hud-text-stack">
                  <span className="hud-title">KINETIC MOTION</span>
                  <span className="hud-sub">PREMIUM EDITS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}