import React from "react";
import CTAButtons from "./CTAButtons";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Background Ambient Aura */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="hero-grid-container">
        {/* LEFT COLUMN: HERO HEADLINE, CTAs & METRICS */}
        <div className="hero-content-col">
          <div className="hero-telemetry-badge">
            <span className="telemetry-dot" />
            <span className="telemetry-label">
              SONY FX3 // VERTICAL CINEMA &amp; MOTION
            </span>
          </div>

          <h1 className="hero-main-title">
            <span className="hero-title-top">Crafting Videos That</span>
            <span className="hero-gradient-text">Capture Attention</span>
            <span className="hero-title-bottom">&amp; Drive Results</span>
          </h1>

          <p className="hero-lead-text">
            High-retention Shorts, Reels, and kinetic motion systems engineered
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
            <div className="metric-sep">/</div>
            <div className="metric-chip">
              <span className="metric-val">78%</span>
              <span className="metric-lbl">AVG RETENTION</span>
            </div>
            <div className="metric-sep">/</div>
            <div className="metric-chip">
              <span className="metric-val">48H</span>
              <span className="metric-lbl">TURNAROUND</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SEAMLESS NO-BOX CREATOR STAGE */}
        <div className="hero-visual-col">
          <div className="fx3-cinema-stage">
            {/* 1. Seamless Circular Glows (Zero hard lines) */}
            <div className="fx3-soft-radial-sky" aria-hidden="true" />
            <div className="fx3-creator-cyan-halo" aria-hidden="true" />

            {/* 2. Pure Image Mount (Graded entirely through CSS filter & gradient mask) */}
            <div className="fx3-portrait-mount">
              <img
                src="/pawan.webp"
                alt="Pawan Kumar // Cinema Editor & Motion Designer"
                className="fx3-portrait-core"
                width="560"
                height="680"
                fetchPriority="high"
                decoding="async"
                loading="eager"
              />
            </div>

            {/* 3. TIGHT SONY FX3 ORBIT HUD CARDS */}
            <div className="fx3-orbit-hud">
              {/* Left Flank */}
              <div className="fx3-hud-card hud-pos-viral">
                <div className="hud-card-lead">
                  <span className="hud-status-led" />
                  <span className="hud-chip-tag">FX3 // ANM</span>
                </div>
                <div className="hud-card-body">
                  <div className="hud-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
                    </svg>
                  </div>
                  <div className="hud-text-stack">
                    <span className="hud-title">VIRAL ANIMATIONS</span>
                    <span className="hud-sub">HIGH RETENTION</span>
                  </div>
                </div>
              </div>

              <div className="fx3-hud-card hud-pos-shorts">
                <div className="hud-card-lead">
                  <span className="hud-status-led" />
                  <span className="hud-chip-tag">REC // 9:16</span>
                </div>
                <div className="hud-card-body">
                  <div className="hud-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" fill="#00D4FF" stroke="none" />
                    </svg>
                  </div>
                  <div className="hud-text-stack">
                    <span className="hud-title">YOUTUBE SHORTS</span>
                    <span className="hud-sub">WATCH-TIME BOOST</span>
                  </div>
                </div>
              </div>

              <div className="fx3-hud-card hud-pos-talking">
                <div className="hud-card-lead">
                  <span className="hud-status-led" />
                  <span className="hud-chip-tag">OPTIC // 50MM</span>
                </div>
                <div className="hud-card-body">
                  <div className="hud-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                  <div className="hud-text-stack">
                    <span className="hud-title">TALKING HEAD</span>
                    <span className="hud-sub">CINEMATIC PACING</span>
                  </div>
                </div>
              </div>

              {/* Right Flank */}
              <div className="fx3-hud-card hud-pos-podcast">
                <div className="hud-card-lead">
                  <span className="hud-status-led" />
                  <span className="hud-chip-tag">AUDIO // CH1</span>
                </div>
                <div className="hud-card-body">
                  <div className="hud-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </div>
                  <div className="hud-text-stack">
                    <span className="hud-title">PODCAST CLIPS</span>
                    <span className="hud-sub">OMNI-CHANNEL REACH</span>
                  </div>
                </div>
              </div>

              <div className="fx3-hud-card hud-pos-sound">
                <div className="hud-card-lead">
                  <span className="hud-status-led" />
                  <span className="hud-chip-tag">MASTER // 48K</span>
                </div>
                <div className="hud-card-body">
                  <div className="hud-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 10v4" /><path d="M6 6v12" /><path d="M10 3v18" /><path d="M14 8v8" /><path d="M18 5v14" /><path d="M22 10v4" />
                    </svg>
                  </div>
                  <div className="hud-text-stack">
                    <span className="hud-title">SOUND DESIGN</span>
                    <span className="hud-sub">ATMOSPHERE &amp; SFX</span>
                  </div>
                </div>
              </div>

              <div className="fx3-hud-card hud-pos-kinetic">
                <div className="hud-card-lead">
                  <span className="hud-status-led" />
                  <span className="hud-chip-tag">AFTER EFFECTS</span>
                </div>
                <div className="hud-card-body">
                  <div className="hud-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
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
      </div>
    </section>
  );
}