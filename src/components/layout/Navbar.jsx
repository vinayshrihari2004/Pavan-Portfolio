import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [timecode, setTimecode] = useState("01:00:14:04");
  const [isScrolled, setIsScrolled] = useState(false);

  // Live running SMPTE timecode (24 FPS calculation)
  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTime;
      const totalFrames = Math.floor((elapsedMs / 1000) * 24);

      const frames = String(totalFrames % 24).padStart(2, "0");
      const totalSeconds = Math.floor(totalFrames / 24);
      const seconds = String((14 + totalSeconds) % 60).padStart(2, "0");
      const minutes = String((0 + Math.floor((14 + totalSeconds) / 60)) % 60).padStart(2, "0");
      const hours = "01";

      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    }, 1000 / 24);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fx3-navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="fx3-nav-container">
        {/* LEFT: BRAND IDENTIFIER WITH LOGO IMAGE */}
        <div className="fx3-nav-brand" onClick={() => scrollToSection("hero")}>
          <div className="fx3-brand-avatar">
            <img
              src="/logo.webp"
              alt="Pawan Edits Logo"
              className="fx3-brand-logo-img"
              width="34"
              height="34"
              loading="eager"
            />
          </div>
          <div className="fx3-brand-meta">
            <span className="fx3-brand-title">Pavan Edits</span>
            <span className="fx3-brand-subtitle">FILM &nbsp;|&nbsp; EDIT &nbsp;|&nbsp; CREATE</span>
          </div>
        </div>

        {/* CENTER: SONY FX3 CAMERA OSD TELEMETRY (Hidden on mobile) */}
        <div className="fx3-nav-telemetry" aria-hidden="true">
          <div className="telemetry-chip rec-chip">
            <span className="rec-blip">●</span>
            <span className="telemetry-lbl">REC</span>
          </div>

          <div className="telemetry-chip tc-chip">
            <span className="tc-clock-icon">◷</span>
            <span className="telemetry-val">{timecode}</span>
          </div>

          <div className="telemetry-chip codec-chip">
            <span className="telemetry-val">4K DCI</span>
            <span className="telemetry-div">|</span>
            <span className="telemetry-val">XAVC</span>
            <span className="telemetry-div">|</span>
            <span className="telemetry-val">10-BIT</span>
          </div>

          <div className="telemetry-chip slots-chip">
            <span className="slot-dot"></span>
            <span className="telemetry-val">2 SLOTS AVAILABLE</span>
          </div>
        </div>

        {/* RIGHT: NAVIGATION LINKS & COMMISSION TRIGGER */}
        <nav className="fx3-nav-actions" aria-label="Main Navigation">
          <button
            type="button"
            className="fx3-nav-link"
            onClick={() => scrollToSection("cases")}
          >
            CASES
          </button>
          <button
            type="button"
            className="fx3-nav-link"
            onClick={() => scrollToSection("suite")}
          >
            SUITE
          </button>
          <button
            type="button"
            className="fx3-nav-link"
            onClick={() => scrollToSection("about")}
          >
            FX3 MONITOR
          </button>

          <button
            type="button"
            className="fx3-nav-initiate-btn"
            onClick={() => scrollToSection("cta")}
          >
            <span className="initiate-bracket">[</span>
            <span className="initiate-text">INITIATE PROJECT</span>
            <span className="initiate-bracket">]</span>
          </button>
        </nav>
      </div>
    </header>
  );
}