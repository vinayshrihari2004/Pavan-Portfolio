import React, { useState, useEffect } from "react";
import "./BookingSection.css";

export default function BookingSection() {
  const [timecode, setTimecode] = useState("01:24:59:18");

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const totalFrames = Math.floor((elapsed / 1000) * 24);
      const frames = String(totalFrames % 24).padStart(2, "0");
      const seconds = String((59 + Math.floor(totalFrames / 24)) % 60).padStart(2, "0");
      const minutes = String((24 + Math.floor(totalFrames / (24 * 60))) % 60).padStart(2, "0");
      setTimecode(`01:${minutes}:${seconds}:${frames}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
    let scriptTag = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.src = scriptSrc;
      scriptTag.async = true;
      document.head.appendChild(scriptTag);
    }
  }, []);

  return (
    <section className="fx3-booking-section" id="cta">
      <div className="fx3-booking-glow" aria-hidden="true"></div>

      <div className="fx3-booking-container">
        {/* Narrative Callout Block */}
        <div className="booking-narrative-header">
          <div className="booking-status-pill">
            <span className="pulsing-indicator"></span>
            <span>CURRENTLY ACCEPTING CREATORS</span>
          </div>

          <h2 className="booking-main-title">
            What are you <span>waiting for?</span>
          </h2>

          <div className="booking-copy-stack">
            <p className="booking-lead-line">
              You've seen the work. You know what's possible.
            </p>
            <p className="booking-action-prompt">
              The only question is: are you ready to take action? <span className="cta-down-arrow"></span>
            </p>
          </div>
        </div>

        {/* Hardware Terminal Box with Calendly Widget */}
        <div className="fx3-booking-terminal">
          {/* Top Chassis Bar */}
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>

            <div className="terminal-osd-readout">
              <span className="osd-chip rec">● REC</span>
              <span className="osd-chip tc">{timecode}</span>
              <span className="osd-chip codec">CALENDLY_DISPATCH.PRPROJ</span>
            </div>

            <div className="terminal-status-tag">
              <span className="live-status-dot"></span>
              <span>SLOTS OPEN</span>
            </div>
          </div>

          {/* Calendly Inline Widget */}
          <div className="terminal-embed-col">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/pavaneditsvideo?background_color=020024&text_color=ffffff&primary_color=00d4ff"
              style={{ minWidth: "320px", height: "700px", width: "100%" }}
            ></div>
          </div>

          {/* Minimal Status Strip */}
          <div className="terminal-footer-strip">
            <span>TIMEZONE: AUTO-DETECTED</span>
            <span>•</span>
            <span>DIRECT LINK ENCRYPTION // 256-BIT</span>
          </div>
        </div>
      </div>
    </section>
  );
}