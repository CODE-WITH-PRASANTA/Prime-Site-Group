import React, { useState, useRef, useEffect } from "react";
import "./AboutVideo.css";

const AboutVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const hideControlsTimeout = useRef(null);

  // Format time (MM:SS)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mute / Unmute Toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Fullscreen Handlers (using Container to keep custom controls visible)
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const container = playerContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  // Listen to Fullscreen Change Events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Time Updates & Metadata
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Auto-hide controls when mouse is inactive during playback
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);

    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2500);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="AboutVideo" aria-label="Corporate Video Presentation">
      <div className="AboutVideo__container">
        
        {/* Left Side: Modern Interactive Custom Player */}
        <div className="AboutVideo__mediaColumn">
          <div
            ref={playerContainerRef}
            className={`AboutVideo__player ${
              isFullscreen ? "AboutVideo__player--fullscreen" : ""
            } ${!controlsVisible && isPlaying ? "AboutVideo__player--hideControls" : ""}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setControlsVisible(false)}
            onClick={togglePlay}
          >
            {/* Top Bar with Branding */}
            <div className="AboutVideo__topBar">
              <div className="AboutVideo__brandBadge">
                <span className="AboutVideo__brandIcon">T</span>
                <div className="AboutVideo__brandInfo">
                  <span className="AboutVideo__brandTitle">Prime Corporate Video</span>
                  <span className="AboutVideo__brandSub">Global Operations Overview</span>
                </div>
              </div>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              className="AboutVideo__video"
              poster="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=85"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Big Center Play / Pause Indicator */}
            {(!isPlaying || controlsVisible) && (
              <button
                type="button"
                className={`AboutVideo__centerButton ${
                  isPlaying ? "AboutVideo__centerButton--pause" : ""
                }`}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            )}

            {/* Bottom Controls Bar */}
            <div
              className="AboutVideo__bottomControls"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrub / Progress Bar */}
              <div className="AboutVideo__progressTrack">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="AboutVideo__progressBar"
                  aria-label="Seek track"
                  style={{
                    background: `linear-gradient(to right, #d7192d ${progressPercent}%, rgba(255, 255, 255, 0.25) ${progressPercent}%)`,
                  }}
                />
              </div>

              {/* Action Buttons Row */}
              <div className="AboutVideo__controlActions">
                <div className="AboutVideo__leftActions">
                  <button
                    type="button"
                    className="AboutVideo__btnIcon"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    className="AboutVideo__btnIcon"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>

                  <span className="AboutVideo__timeIndicator">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="AboutVideo__rightActions">
                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    className="AboutVideo__btnIcon AboutVideo__btnIcon--fullscreen"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Headline and Information */}
        <div className="AboutVideo__contentColumn">
          <div className="AboutVideo__eyebrowWrap">
            <span className="AboutVideo__eyebrowLine" />
            <span className="AboutVideo__eyebrow">VIDEO</span>
          </div>

          <h2 className="AboutVideo__heading">
            Transguard Group{" "}
            <span className="AboutVideo__headingAccent">Corporate Video</span>
          </h2>

          <p className="AboutVideo__description">
            Discover how precision, diverse human talent, and innovative infrastructure
            converge to deliver industry-leading support services across aviation,
            hospitality, cash management, and critical infrastructure.
          </p>

          <div className="AboutVideo__featureList">
            <div className="AboutVideo__featureItem">
              <span className="AboutVideo__featureDot" />
              <span>Full HD 1080p Operational Footage</span>
            </div>
            <div className="AboutVideo__featureItem">
              <span className="AboutVideo__featureDot" />
              <span>Behind-the-Scenes Workforce Logistics</span>
            </div>
            <div className="AboutVideo__featureItem">
              <span className="AboutVideo__featureDot" />
              <span>Executive Vision & Strategic Roadmap</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutVideo;