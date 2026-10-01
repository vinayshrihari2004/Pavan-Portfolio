import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Testimonials.css";
import testimonials from "./testimonialsData";

const SLIDE_DURATION = 1000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontalSwipe = useRef(null);

  const total = Array.isArray(testimonials) ? testimonials.length : 0;
  if (total === 0) return null;

  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  const currentItem = testimonials[active] || {};
  const prevItem = testimonials[prev] || {};
  const nextItem = testimonials[next] || {};

  const handleNext = useCallback(() => {
    setActive((curr) => (curr + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActive((curr) => (curr - 1 + total) % total);
  }, [total]);

  // Pause interval only when section leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || isDragging || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isInView, isPaused, isDragging, handleNext, total]);

  // Directional touch handlers: preserves native mobile page scrolling
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX.current;
    const deltaY = currentY - startY.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isHorizontalSwipe.current = true;
        setIsDragging(true);
      } else if (Math.abs(deltaY) > 10) {
        isHorizontalSwipe.current = false;
      }
    }

    if (isHorizontalSwipe.current) {
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > 35) handlePrev();
    else if (dragOffset < -35) handleNext();

    setDragOffset(0);
    isHorizontalSwipe.current = null;
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 40) handlePrev();
    else if (dragOffset < -40) handleNext();
    setDragOffset(0);
  };

  return (
    <section
      ref={containerRef}
      className="testimonials-section"
      id="testimonials"
    >
      <div className="t-section-header">
        <span className="t-pre-tag">// VERIFIED EDITORIAL FEEDBACK</span>
        <h2 className="t-title">
          Client <span>Testimonials</span>
        </h2>
        <div className="t-status-row">
          <span className="t-live-pulse"></span>
          <p className="t-sub-hint">
            {isPaused ? "CARD HOVERED // STREAM PAUSED" : "1S HIGH-SPEED STREAMING"}
          </p>
        </div>
      </div>

      <div
        className="t-carousel-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="t-stage-glow"></div>

        {/* LEFT GHOST CARD */}
        <div
          className="t-card t-card-left"
          onClick={handlePrev}
          role="button"
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="t-hud-top-bar">
            <span className="t-rec-text">{prevItem.deliverable || "REVIEW"}</span>
          </div>
          <p className="t-quote-snippet">
            "{String(prevItem.quote || "").slice(0, 110)}..."
          </p>
          <div className="t-author-block">
            <h4 className="t-client-name">{prevItem.name || "Client"}</h4>
            <span className="t-client-role">{prevItem.role || "Creator"}</span>
          </div>
        </div>

        {/* ACTIVE MAIN CARD */}
        <div
          key={active}
          className={`t-card t-card-active ${isDragging ? "dragging" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            transform: isDragging
              ? `translateX(calc(-50% + ${dragOffset}px)) scale(1)`
              : undefined,
          }}
        >
          <div className="t-card-progress-track">
            <div
              className={`t-card-progress-fill ${isPaused ? "paused" : ""}`}
              style={{ animationDuration: `${SLIDE_DURATION}ms` }}
            ></div>
          </div>

          <div className="t-hud-top-bar">
            <div className="t-rec-indicator">
              <span className="t-rec-dot"></span>
              <span className="t-rec-text">
                CUT {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <span className="t-hud-aspect">{currentItem.deliverable || "DELIVERED"}</span>
          </div>

          <blockquote className="t-quote-text">
            "{currentItem.quote || ""}"
          </blockquote>

          <div className="t-author-footer">
            <div className="t-author-info">
              <h3 className="t-client-name">{currentItem.name || "Client"}</h3>
              <p className="t-client-role">{currentItem.role || "Creator"}</p>
            </div>
            <div className="t-metric-tag">
              <span>{currentItem.metric || "Verified"}</span>
            </div>
          </div>
        </div>

        {/* RIGHT GHOST CARD */}
        <div
          className="t-card t-card-right"
          onClick={handleNext}
          role="button"
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="t-hud-top-bar">
            <span className="t-rec-text">{nextItem.deliverable || "REVIEW"}</span>
          </div>
          <p className="t-quote-snippet">
            "{String(nextItem.quote || "").slice(0, 110)}..."
          </p>
          <div className="t-author-block">
            <h4 className="t-client-name">{nextItem.name || "Client"}</h4>
            <span className="t-client-role">{nextItem.role || "Creator"}</span>
          </div>
        </div>

        <button type="button" className="t-nav-arrow t-arrow-prev" onClick={handlePrev} aria-label="Previous">
          ←
        </button>
        <button type="button" className="t-nav-arrow t-arrow-next" onClick={handleNext} aria-label="Next">
          →
        </button>
      </div>

      <div className="t-pagination-dots">
        {testimonials.map((_, idx) => (
          <button
            type="button"
            key={idx}
            className={`t-dot ${idx === active ? "active-dot" : ""}`}
            onClick={() => setActive(idx)}
            aria-label={`View review ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}