import React, { useState, useEffect } from "react";
import "./Footer.css";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRewind = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="nle-footer">
      {/* Top Border Hairline with Center Timecode Notch */}
      <div className="footer-top-rule">
        <div className="rule-hairline"></div>
        <div className="rule-tc-marker">
          <span className="rec-dot"></span>
          <span className="tc-readout">EOF // {currentTime || "00:00:00"}</span>
        </div>
        <div className="rule-hairline"></div>
      </div>

      <div className="footer-container">
        {/* Row 1: Brand & Direct Action */}
        <div className="footer-lead-row">
          <div className="footer-brand-block">
            <div className="brand-logo">
              <div className="brand-logo-badge">
                <img
                  src="/logo.webp"
                  alt="Pawan Edits Logo"
                  className="footer-brand-logo-img"
                  width="28"
                  height="28"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="logo-name">PAWAN EDITS</span>
            </div>
            <p className="brand-tagline">
              Engineering high-retention vertical cinema, kinetic motion typography,
              and pacing for high-scale creators.
            </p>
          </div>

          {/* Quick Rewind / Back-to-Top Playhead Button */}
          <button 
            type="button" 
            onClick={handleRewind} 
            className="footer-rewind-btn"
            title="Rewind Timeline to Head"
          >
            <div className="rewind-icon">
              <span>◀◀</span>
            </div>
            <div className="rewind-text">
              <span className="rewind-primary">REWIND TIMELINE</span>
              <span className="rewind-tc">RETURN TO 00:00:00:00</span>
            </div>
          </button>
        </div>

        {/* Row 2: Camera & Master Export Specs (FX3 Colophon) */}
        <div className="footer-telemetry-grid">
          <div className="spec-card">
            <span className="spec-key">MASTER CONTAINER</span>
            <span className="spec-val">9:16 VERTICAL DCI</span>
            <span className="spec-sub">2160 × 3840 UHD 60FPS</span>
          </div>

          <div className="spec-card">
            <span className="spec-key">COLOR MANAGEMENT</span>
            <span className="spec-val">S-LOG3 ➔ REC.709</span>
            <span className="spec-sub">10-BIT 4:2:2 PRORES HQ</span>
          </div>

          <div className="spec-card">
            <span className="spec-key">AUDIO STAGING</span>
            <span className="spec-val">-14.0 LUFS INTEGRATED</span>
            <span className="spec-sub">DUAL CHANNEL FOLEY 48KHZ</span>
          </div>

          <div className="spec-card">
            <span className="spec-key">CLIENT ROSTER</span>
            <span className="spec-val">GLOBAL CREATORS</span>
            <span className="spec-sub">GLOBAL PROJECTS</span>
          </div>
        </div>

        {/* Row 3: Vector Icon Social & Action Channels */}
        <div className="footer-nav-row">
          <div className="footer-social-icons">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/pavanedits.video/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn"
              title="Instagram Profile"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a 
              href="https://x.com/pavaneditsvideo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn"
              title="X Profile"
              aria-label="X"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com/@pavaneditsvideo?si=UQAE0B9kdywskES8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn"
              title="YouTube Channel"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Email Contact */}
            <a 
              href="mailto:pavaneditsvideo@gmail.com" 
              className="social-icon-btn"
              title="Send Inquiry Email"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>

            {/* Calendly Booking Highlight Pill */}
            <a 
              href="https://calendly.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-cal-pill"
              title="Book a Discovery Call"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
              </svg>
              <span>SCHEDULE CALL</span>
            </a>
          </div>
        </div>

        {/* Row 4: Developer Credit (Vinay Shrihari -> mailto) & Copyright */}
        <div className="footer-colophon-bottom">
          <div className="dev-credit-badge">
            <span className="dev-tag">ENGINEERED & BUILT BY</span>
            <a 
              href="mailto:vinaykumarmk89vinu@gmail.com?subject=Website%20Inquiry%20from%20Pawan%20Edits%20Portfolio" 
              className="dev-link"
              title="Email Vinay Shrihari"
            >
              <span className="dev-status-dot"></span>
              <span className="dev-name">VINAY SHRIHARI</span>
              <span className="dev-mail-icon">✉</span>
            </a>
          </div>

          <div className="footer-copyright-block">
            <span className="copyright-code">BUILD 2026.04 // SONY FX3 HUD ENGINE</span>
            <span className="copyright-legal">© {new Date().getFullYear()} PAWAN EDITS. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}