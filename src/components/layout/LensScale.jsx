import React, { useState, useEffect, useRef } from "react";
import "./LensScale.css";

const LENS_STATIONS = [
  { id: "hero", mm: 18, label: "HERO // REEL" },
  { id: "testimonials", mm: 24, label: "PROOF // CLIENTS" },
  { id: "styles", mm: 35, label: "CREATOR STYLES" },
  { id: "suite", mm: 50, label: "NLE EDIT SUITE" },
  { id: "cases", mm: 85, label: "CASE STUDIES" },
  { id: "cta", mm: 105, label: "COMMISSION // CALL" },
  { id: "about", mm: 135, label: "SONY FX3 // ABOUT" },
];

export default function LensScale() {
  const [playheadY, setPlayheadY] = useState(14);
  const [currentMM, setCurrentMM] = useState(18);
  const [activeStationId, setActiveStationId] = useState("hero");

  const stationsWrapRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cachedCenters = [];
    let cachedTotalDist = 0;
    let cachedStartY = 0;
    let rafId = null;

    const isMobile = window.innerWidth <= 768;

    // Cache physical node positions for desktop only
    const measurePositions = () => {
      if (window.innerWidth <= 768) return;
      if (!stationsWrapRef.current) return;
      const buttons = stationsWrapRef.current.querySelectorAll(".vrail-station-node");
      if (!buttons.length) return;

      cachedCenters = Array.from(buttons).map(
        (btn) => btn.offsetTop + btn.offsetHeight / 2
      );
      cachedStartY = cachedCenters[0];
      cachedTotalDist = cachedCenters[cachedCenters.length - 1] - cachedStartY;
    };

    const timer = setTimeout(measurePositions, 150);

    const handleUpdate = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      // 1. MOBILE LOGIC (Direct 0-overhead math; no DOM reads)
      if (window.innerWidth <= 768) {
        const totalSegments = LENS_STATIONS.length - 1;
        const rawIndex = scrollFraction * totalSegments;
        const lowIndex = Math.min(Math.floor(rawIndex), totalSegments - 1);
        const highIndex = Math.min(lowIndex + 1, totalSegments);
        const segmentProgress = rawIndex - lowIndex;

        const startMM = LENS_STATIONS[lowIndex].mm;
        const endMM = LENS_STATIONS[highIndex].mm;
        const calculatedMM = Math.round(startMM + (endMM - startMM) * segmentProgress);
        const activeIdx = segmentProgress >= 0.5 ? highIndex : lowIndex;

        setCurrentMM(calculatedMM);
        setActiveStationId(LENS_STATIONS[activeIdx].id);
        rafId = null;
        return;
      }

      // 2. DESKTOP LOGIC (Physical reticle needle track travel)
      if (!cachedTotalDist) {
        measurePositions();
      }

      const currentY = cachedStartY + cachedTotalDist * scrollFraction;
      setPlayheadY(currentY);

      let calculatedMM = LENS_STATIONS[0].mm;
      let activeIndex = 0;

      if (currentY <= cachedCenters[0]) {
        calculatedMM = LENS_STATIONS[0].mm;
        activeIndex = 0;
      } else if (currentY >= cachedCenters[cachedCenters.length - 1]) {
        calculatedMM = LENS_STATIONS[LENS_STATIONS.length - 1].mm;
        activeIndex = LENS_STATIONS.length - 1;
      } else {
        for (let i = 0; i < cachedCenters.length - 1; i++) {
          const segStartY = cachedCenters[i];
          const segEndY = cachedCenters[i + 1];

          if (currentY >= segStartY && currentY <= segEndY) {
            const segFraction = (currentY - segStartY) / (segEndY - segStartY);
            const segStartMM = LENS_STATIONS[i].mm;
            const segEndMM = LENS_STATIONS[i + 1].mm;

            calculatedMM = Math.round(segStartMM + (segEndMM - segStartMM) * segFraction);
            activeIndex = segFraction >= 0.5 ? i + 1 : i;
            break;
          }
        }
      }

      setCurrentMM(calculatedMM);
      setActiveStationId(LENS_STATIONS[activeIndex].id);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(handleUpdate);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measurePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measurePositions);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="vrail-container" aria-label="Timeline and Lens Scale Navigation">
      {/* Top Telemetry */}
      <div className="vrail-top-telemetry">
        <span className="vrail-bracket">┌</span>
        <span className="vrail-axis-label">FOCAL // CTI</span>
        <span className="vrail-bracket">┐</span>
      </div>

      {/* Main Track Core */}
      <div className="vrail-track-core">
        <div className="vrail-axis-line"></div>
        <div className="vrail-tick-marks"></div>

        {/* Desktop CTI Playhead */}
        <div
          className="vrail-playhead-reticle"
          style={{
            transform: `translate3d(0, ${playheadY}px, 0) translateY(-50%)`,
          }}
        >
          <div className="vrail-tc-pill">
            <span className="vrail-rec-dot"></span>
            <span className="vrail-tc-val">{currentMM}MM</span>
          </div>

          <div className="vrail-playhead-head">
            <div className="vrail-playhead-notch"></div>
          </div>
          <div className="vrail-playhead-hairline"></div>
        </div>

        {/* Focal Buttons */}
        <div className="vrail-stations-wrap" ref={stationsWrapRef}>
          {LENS_STATIONS.map((station) => {
            const isActive = activeStationId === station.id;
            return (
              <button
                key={station.id}
                type="button"
                className={`vrail-station-node ${isActive ? "vrail-active" : ""}`}
                onClick={() => scrollToSection(station.id)}
              >
                <div className="vrail-station-tick"></div>
                <div className="vrail-station-number-box">
                  <span className="vrail-station-num">{station.mm}</span>
                  <span className="vrail-station-unit">MM</span>
                </div>

                <div className="vrail-tooltip">
                  <span className="vrail-tooltip-tag">{station.mm}MM PRIME</span>
                  <span className="vrail-tooltip-desc">{station.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="vrail-bottom-telemetry">
        <span className="vrail-bracket">└</span>
        <span className="vrail-mode-tag">NLE 9:16</span>
        <span className="vrail-bracket">┘</span>
      </div>

      {/* Mobile Live Timecode Indicator */}
      <div className="vrail-mobile-tc-chip">
        <span className="vrail-rec-dot"></span>
        <span>{currentMM}MM</span>
      </div>
    </aside>
  );
}