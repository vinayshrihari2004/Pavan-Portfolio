import React, { useState, useRef, useEffect } from "react";
import "./EditSuite.css";

const projects = [
  {
    id: 1,
    creator: "Ishan Sharma",
    title: "AI Education",
    video: "/videos/First.mp4",
    views: "5M+ Views",
    retention: "85% Retention",
    platform: "Instagram Reels",
    timecode: "00:01:24:12",
    tools: ["After Effects", "Premiere Pro"],
  },
  {
    id: 2,
    creator: "Saptarshi Prakash",
    title: "Brand Collaboration",
    video: "/videos/Second.mp4",
    views: "600k+ Views",
    retention: "78% Retention",
    platform: "Instagram Reels",
    timecode: "00:00:38:05",
    tools: ["Premiere Pro"],
  },
  {
    id: 3,
    creator: "Nandini Aggarwal",
    title: "Business Analytics",
    video: "/videos/Third.mp4",
    views: "200K Views",
    retention: "64% Retention",
    platform: "YouTube Shorts",
    timecode: "00:00:52:18",
    tools: ["Premiere Pro"],
  },
  {
    id: 4,
    creator: "Ishan Sharma",
    title: "Podcast Highlight",
    video: "/videos/Forth.mp4",
    views: "1M+ Views",
    retention: "80% Retention",
    platform: "YouTube Shorts",
    timecode: "00:01:10:09",
    tools: ["Premiere Pro"],
  },
];

const TOOL_BADGES = {
  "After Effects": { abbr: "Ae", tone: "ae" },
  "Premiere Pro": { abbr: "Pr", tone: "pr" },
  Photoshop: { abbr: "Ps", tone: "ps" },
  CapCut: { abbr: "Cc", tone: "cc" },
  "DaVinci Resolve": { abbr: "Dv", tone: "dv" },
};

const badgeFor = (tool) =>
  TOOL_BADGES[tool] ?? { abbr: tool.slice(0, 2), tone: "default" };

/* Lightweight SVG Icons */
const Svg = ({ children, className, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

const EyeIcon = () => (
  <Svg className="es-stat-icon" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </Svg>
);

const BarsIcon = () => (
  <Svg className="es-stat-icon" fill="currentColor">
    <rect x="3.5" y="12" width="4.5" height="8" rx="1" />
    <rect x="9.75" y="4" width="4.5" height="16" rx="1" />
    <rect x="16" y="9" width="4.5" height="11" rx="1" />
  </Svg>
);

const SendIcon = () => (
  <Svg className="es-stat-icon" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </Svg>
);

const PlayIcon = () => (
  <Svg className="es-play-icon" width="28" height="28" fill="currentColor">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
  </Svg>
);

const PauseIcon = () => (
  <Svg className="es-play-icon" width="26" height="26" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </Svg>
);

export default function EditSuite() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [currentTimecode, setCurrentTimecode] = useState("00:00:00:00");
  const mainVideoRef = useRef(null);
  const sectionRef = useRef(null);

  const activeIndex = projects.findIndex((p) => p.id === activeProject.id);
  const activeNumber = String(activeIndex + 1).padStart(2, "0");

  // Keep main stage video synced with the active project
  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.src = activeProject.video;
      mainVideoRef.current.currentTime = 0;
      setProgress(0);
      mainVideoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeProject]);

  // Viewport autoplay observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mainVideoRef.current) {
            mainVideoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          } else if (mainVideoRef.current) {
            mainVideoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update SMPTE Timecode & Playhead progress percentage
  const handleTimeUpdate = () => {
    const vid = mainVideoRef.current;
    if (!vid || !vid.duration) return;

    const current = vid.currentTime;
    const dur = vid.duration;
    setProgress((current / dur) * 100);

    // Calculate live SMPTE frames (at 24 FPS)
    const totalFrames = Math.floor(current * 24);
    const frames = String(totalFrames % 24).padStart(2, "0");
    const totalSecs = Math.floor(current);
    const secs = String(totalSecs % 60).padStart(2, "0");
    const mins = String(Math.floor(totalSecs / 60)).padStart(2, "0");
    setCurrentTimecode(`00:${mins}:${secs}:${frames}`);
  };

  // Auto-advance timeline to the next project on video finish
  const handleVideoEnded = () => {
    const nextIndex = (activeIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex]);
  };

  const handleProjectSelect = (project) => {
    setActiveProject(project);
  };

  const togglePlayback = () => {
    if (!mainVideoRef.current) return;
    if (mainVideoRef.current.paused) {
      mainVideoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleThumbnailLoaded = (e) => {
    const vid = e.target;
    if (vid && vid.currentTime === 0) {
      vid.currentTime = 0.1;
    }
  };

  return (
    <section className="edit-suite" id="suite" ref={sectionRef}>
      <div className="es-header">
        <span className="es-header-tag">SELECTED WORKS</span>
        <h2 className="es-title">My Works</h2>
        <p className="es-description">
          A collection of high-performing reels, shorts and cinematic edits
          crafted for creators and brands.
        </p>
      </div>

      <div className="es-window">
        {/* Topbar */}
        <div className="es-topbar">
          <div className="es-dots">
            <span className="dot-red"></span>
            <span className="dot-yellow"></span>
            <span className="dot-green"></span>
          </div>
          <div className="es-filename">PAVAN_EDITS.PRPROJ</div>
        </div>

        {/* Workspace */}
        <div className="es-workspace">
          <div className="es-ghost" aria-hidden="true">
            {activeNumber}
          </div>

          {/* Active Reel Preview */}
          <div className="es-reel" onClick={togglePlayback}>
            <video
              ref={mainVideoRef}
              key={activeProject.id}
              src={activeProject.video}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onLoadedMetadata={handleThumbnailLoaded}
              className="es-reel-video"
              muted
              playsInline
              preload="metadata"
            />

            {/* In-Reel Mini Progress Bar */}
            <div className="es-reel-scrub">
              <div 
                className="es-reel-scrub-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              type="button"
              className={`es-play ${isPlaying ? "is-playing" : "is-paused"}`}
              onClick={(e) => {
                e.stopPropagation();
                togglePlayback();
              }}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <span className="es-timecode">{currentTimecode}</span>
          </div>

          {/* Project Details */}
          <div className="es-info">
            <span className="es-label">
              ACTIVE PROJECT // {activeProject.creator}
            </span>
            <h3 className="es-project-title">{activeProject.title}</h3>

            <div className="es-stats">
              <div className="es-stat">
                <EyeIcon />
                <span>{activeProject.views}</span>
              </div>
              <div className="es-stat">
                <BarsIcon />
                <span>{activeProject.retention}</span>
              </div>
              <div className="es-stat">
                <SendIcon />
                <span>{activeProject.platform}</span>
              </div>
            </div>

            <div className="es-tools">
              {activeProject.tools.map((tool) => {
                const { abbr, tone } = badgeFor(tool);
                return (
                  <span className="es-pill" key={tool}>
                    <i className={`es-badge es-badge--${tone}`}>{abbr}</i>
                    <span>{tool}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Running Timeline Track */}
        <div className="es-map-scroll-wrap">
          <div className="es-map">
            {projects.map((project, index) => {
              const isActive = activeProject.id === project.id;
              const isPast = index < activeIndex;

              return (
                <button
                  type="button"
                  key={project.id}
                  className={`es-node ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
                  onClick={() => handleProjectSelect(project)}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Live Progress Bar Segment connecting to the next node */}
                  {index < projects.length - 1 && (
                    <div className="es-track-segment">
                      <div
                        className="es-track-fill"
                        style={{
                          width: isActive
                            ? `${progress}%`
                            : isPast
                            ? "100%"
                            : "0%",
                        }}
                      />
                    </div>
                  )}

                  <span className="es-thumb">
                    <video
                      src={project.video}
                      onLoadedMetadata={handleThumbnailLoaded}
                      onMouseEnter={(e) => e.target.play().catch(() => {})}
                      onMouseLeave={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0.1;
                      }}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="es-node-mini-video"
                    />
                  </span>

                  <span className="es-node-text">
                    <span className="es-node-num">
                      {String(index + 1).padStart(2, "0")} • {project.creator}
                    </span>
                    <span className="es-node-title">{project.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}