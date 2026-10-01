import React, { useState, useEffect, useRef } from "react";
import "./AboutMe.css";

const telemetryStats = [
  { label: "VIEWS PRODUCED", val: "45M+", sub: "ORGANIC BENCHMARK" },
  { label: "AVG HOOK RETENTION", val: "68%", sub: "FIRST 3-SEC RATE" },
  { label: "FLAGSHIP EDITS", val: "180+", sub: "DELIVERED MASTERS" },
  { label: "TURNAROUND", val: "48h", sub: "RUSH TO FINAL 9:16" },
];

export default function AboutMe() {
  const [frames, setFrames] = useState(14);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  // 1. Silent playback trigger using IntersectionObserver (non-blocking)
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;
    video.volume = 1.0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // 2. Audio toggle: unmuting restarts playback from beginning (00:00)
  useEffect(() => {
    const video = videoRef.current;
    const btn = buttonRef.current;
    if (!video || !btn) return;

    const triggerAudioToggle = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (video.muted || video.volume === 0) {
        video.currentTime = 0;
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
        setIsPlaying(true);

        video.play().catch((err) => {
          console.error("Audio playback error:", err);
        });
      } else {
        video.muted = true;
        setIsMuted(true);
      }
    };

    btn.addEventListener("click", triggerAudioToggle);
    video.addEventListener("click", triggerAudioToggle);

    return () => {
      btn.removeEventListener("click", triggerAudioToggle);
      video.removeEventListener("click", triggerAudioToggle);
    };
  }, []);

  // 3. SMPTE Timecode Counter (24fps)
  useEffect(() => {
    const timer = setInterval(() => {
      setFrames((prev) => (prev >= 23 ? 0 : prev + 1));
    }, 1000 / 24);
    return () => clearInterval(timer);
  }, []);

  const tcDisplay = `01:48:32:${frames.toString().padStart(2, "0")}`;

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="fx3-about-section" id="about" ref={sectionRef}>
      <div className="fx3-ambient-glow" aria-hidden="true" />

      <div className="fx3-about-container">
        {/* Section Header */}
        <div className="fx3-section-meta">
          <div className="meta-left">
            <span className={`rec-tally-dot ${isPlaying ? "active" : "paused"}`} />
            <span className="meta-cam">SONY FX3 // OPERATOR PROFILE [135MM]</span>
          </div>
          <span className="meta-mode">DIRECTOR MONITOR // LIVE FEED</span>
        </div>

        {/* Viewfinder + Telemetry Grid */}
        <div className="fx3-hud-terminal">
          <div className="fx3-viewfinder-col">
            <div className="fx3-viewfinder-frame">
              
              {/* Top Viewfinder Bar */}
              <div className="hud-top-strip">
                <button
                  type="button"
                  className="tally-box"
                  onClick={togglePlayback}
                  title={isPlaying ? "Pause Feed" : "Resume Feed"}
                >
                  <span className={`tally-light ${isPlaying ? "rec" : "standby"}`}>●</span>
                  <span className="tally-text">{isPlaying ? "REC" : "STBY"}</span>
                </button>
                <div className="hud-tc">{tcDisplay}</div>
                <div className="hud-media">
                  <span className="slot-badge">A: 142m</span>
                  <span className="slot-badge">B: 98m</span>
                </div>
              </div>

              {/* Video Note Element */}
              <video
                ref={videoRef}
                className="hud-editor-video"
                src="/pawan-note.mp4"
                loop
                muted
                playsInline
                preload="metadata"
              />

              {/* Plain White Viewfinder Framing Brackets (No Glow) */}
              <div className="guide-viewfinder-brackets">
                <span className="vf-corner top-left" />
                <span className="vf-corner top-right" />
                <span className="vf-corner bottom-left" />
                <span className="vf-corner bottom-right" />
              </div>

              {/* Unmute Button */}
              <button
                ref={buttonRef}
                type="button"
                className={`hud-mic-btn ${isMuted ? "muted" : "live"}`}
              >
                <span className="mic-icon">{isMuted ? "🔇" : "🔊"}</span>
                <span>{isMuted ? "UNMUTE AUDIO" : "AUDIO LIVE"}</span>
              </button>

              {/* Camera Exposure Params */}
              <div className="hud-bottom-camera-strip">
                <div className="cam-param">
                  <span className="param-k">SHUTTER</span>
                  <span className="param-v">1/50</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">IRIS</span>
                  <span className="param-v">F1.4</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">ISO</span>
                  <span className="param-v">800</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">WB</span>
                  <span className="param-v">5600K</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">LUT</span>
                  <span className="param-v active-lut">S-CINETONE</span>
                </div>
              </div>

              {/* VU Meters */}
              <div className="hud-vu-meter">
                <span className="vu-label">CH1</span>
                <div className="vu-track">
                  <div className={`vu-fill ch1 ${isMuted ? "muted-bars" : "active-bars"}`} />
                </div>
                <span className="vu-label">CH2</span>
                <div className="vu-track">
                  <div className={`vu-fill ch2 ${isMuted ? "muted-bars" : "active-bars"}`} />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column Stats */}
          <div className="fx3-telemetry-col">
            <div className="hud-panel-header">
              <span className="sys-status">OPERATOR ID: PAVAN_EDITS</span>
              <span className="sys-spec">XAVC S-I 4K // 10-BIT 4:2:2</span>
            </div>

            <div className="hud-body-text">
              <h2 className="operator-headline">
                I DON'T JUST CUT FRAMES. <br />
                <span>I ENGINEER RETENTION.</span>
              </h2>
              <p className="operator-lead">
                I'm Pavan, a video editor specializing in high-retention YouTube shorts, Instagram Reels, short-form content, and visual storytelling. I combine creative editing, motion graphics, and sound design to turn raw footage into polished videos that capture attention and keep audiences engaged.
              </p>
            </div>

            <div className="hud-stats-grid">
              {telemetryStats.map((item, idx) => (
                <div className="telemetry-card" key={idx}>
                  <div className="telemetry-corner" />
                  <span className="stat-value">{item.val}</span>
                  <span className="stat-label">{item.label}</span>
                  <span className="stat-sub">{item.sub}</span>
                </div>
              ))}
            </div>

            <div className="hud-pipeline-box">
              <span className="pipeline-title">PRODUCTION PIPELINE SETUP</span>
              <div className="pipeline-tags">
                <span>PREMIERE PRO CC</span>
                <span>AFTER EFFECTS RIGS</span>
                <span>DAVINCI COLOR MASTER</span>
                <span>SOUND STAGED FOLEY</span>
                <span>SUB-PIXEL RETENTION ZOOMS</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}