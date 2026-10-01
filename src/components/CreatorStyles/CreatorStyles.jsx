import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./CreatorStyles.css";

const VIDEO_ITEMS = [
  { id: 1, title: "Reel 01", videoSrc: "/videos/Mrbeast.mp4" },
  { id: 2, title: "Reel 02", videoSrc: "/videos/Casey.mp4" },
  { id: 3, title: "Reel 03", videoSrc: "/videos/Gadzi.mp4" },
  { id: 4, title: "Reel 04", videoSrc: "/videos/Hormozi.mp4" },
  { id: 5, title: "Reel 05", videoSrc: "/videos/Mkbhd.mp4" },
  { id: 6, title: "Reel 06", videoSrc: "/videos/Aiabdal.mp4" },
];

export default function CreatorStyles() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalVideoRef = useRef(null);
  const cardVideoRefs = useRef([]);

  // IntersectionObserver: Only attach video src and play when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
            }
            video.muted = true;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    cardVideoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  // Handle modal keyboard events and playback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = 0;
        modalVideoRef.current.play().catch(() => {});
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const openModal = (item) => {
    setActiveVideo(item);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveVideo(null);
  };

  return (
    <section className="cs-section" id="styles">
      <div className="cs-container">
        <div className="cs-header">
          <span className="cs-eyebrow">// EDITORIAL REPERTOIRE</span>
          <h2 className="cs-title">My Styles</h2>
        </div>

        <div className="cs-grid-3col">
          {VIDEO_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="cs-plain-card"
              onClick={() => openModal(item)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.title}`}
            >
              <div className="cs-card-media">
                <video
                  ref={(el) => (cardVideoRefs.current[index] = el)}
                  data-src={item.videoSrc}
                  className="cs-card-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                />

                <div className="cs-play-indicator" aria-hidden="true">
                  <div className="cs-play-disc">
                    <svg viewBox="0 0 24 24" className="cs-play-svg">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo &&
        createPortal(
          <div
            className="cs-modal-backdrop"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="cs-modal-chassis"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="cs-modal-close-btn"
                onClick={closeModal}
                aria-label="Close video"
              >
                ✕
              </button>

              <div className="cs-modal-viewport">
                <video
                  ref={modalVideoRef}
                  src={activeVideo.videoSrc}
                  className="cs-modal-video"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}