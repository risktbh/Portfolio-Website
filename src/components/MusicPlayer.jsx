import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import musicAudio from "../assets/music.mp3";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(true);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback error:", err);
      });
    }
  };

  // Skip backward 10s
  const handleRewind = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  // Skip forward 10s
  const handleForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  // Toggle Loop
  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

  // Time update listener
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Loaded metadata (duration)
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Audio ended handler
  const handleEnded = () => {
    if (!isLooping) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Click on progress bar to seek
  const handleSeek = (e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Time Formatter mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = duration > 0 ? duration - currentTime : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLooping;
    }
  }, [isLooping]);

  return (
    <StyledWrapper $isPlaying={isPlaying} $isLooping={isLooping}>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={musicAudio}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="main-music-card">
        {/* Track Header */}
        <div className="track-info">
          <div className="album-art" aria-hidden="true">
            <div className="vinyl-grooves">
              <div className="vinyl-center" />
            </div>
          </div>

          <div className="track-details">
            <div className="track-header-row">
              <div className="track-title" title="Glow">Timeless</div>
              <span className="live-pill">
                <span className="pulse-dot" />
                Audio
              </span>
            </div>
            <div className="artist-name">The Weeknd - Playboi Carti</div>
          </div>

          {/* Animated Volume Bars */}
          <div className="volume-bars" aria-hidden="true">
            <div className="bar" style={{ "--delay": "0s" }} />
            <div className="bar" style={{ "--delay": "0.15s" }} />
            <div className="bar" style={{ "--delay": "0.3s" }} />
            <div className="bar" style={{ "--delay": "0.45s" }} />
            <div className="bar" style={{ "--delay": "0.6s" }} />
            <div className="bar" style={{ "--delay": "0.2s" }} />
            <div className="bar" style={{ "--delay": "0.5s" }} />
            <div className="bar" style={{ "--delay": "0.35s" }} />
          </div>
        </div>

        {/* Playback Controls & Timeline */}
        <div className="playback-controls">
          <div className="time-info">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="remaining-time">-{formatTime(remainingTime)}</span>
          </div>

          <div
            className="progress-bar"
            ref={progressBarRef}
            onClick={handleSeek}
            role="progressbar"
            aria-valuenow={Math.round(currentTime)}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-label="Audio timeline progress"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") handleRewind();
              if (e.key === "ArrowRight") handleForward();
            }}
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="progress-handle"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          <div className="button-row">
            <div className="main-control-btns">
              {/* Rewind Button */}
              <button
                type="button"
                className="control-button back"
                onClick={handleRewind}
                aria-label="Rewind 10 seconds"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5" />
                </svg>
              </button>

              {/* Play / Pause Toggle Button */}
              <div className="play-pause-btns">
                <button
                  type="button"
                  className="control-button play-pause-button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause audio track" : "Play audio track"}
                >
                  {!isPlaying ? (
                    <svg
                      className="icon-play"
                      xmlns="http://www.w3.org/2000/svg"
                      width={28}
                      height={28}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M11.596 8.697l-6.363 3.692c-.54.314-1.233-.065-1.233-.696V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                  ) : (
                    <svg
                      className="icon-pause"
                      xmlns="http://www.w3.org/2000/svg"
                      width={28}
                      height={28}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Fast Forward Button */}
              <button
                type="button"
                className="control-button next"
                onClick={handleForward}
                aria-label="Skip forward 10 seconds"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5" />
                </svg>
              </button>
            </div>

            {/* Loop / Radar Button */}
            <button
              type="button"
              className={`control-button radar ${isLooping ? "loop-active" : ""}`}
              onClick={toggleLoop}
              aria-label={isLooping ? "Repeat track enabled" : "Repeat track disabled"}
              title={isLooping ? "Looping Enabled" : "Looping Disabled"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M6.634 1.135A7 7 0 0 1 15 8a.5.5 0 0 1-1 0 6 6 0 1 0-6.5 5.98v-1.005A5 5 0 1 1 13 8a.5.5 0 0 1-1 0 4 4 0 1 0-4.5 3.969v-1.011A2.999 2.999 0 1 1 11 8a.5.5 0 0 1-1 0 2 2 0 1 0-2.5 1.936v-1.07a1 1 0 1 1 1 0V15.5a.5.5 0 0 1-1 0v-.518a7 7 0 0 1-.866-13.847" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .main-music-card {
    max-width: 440px;
    width: 100%;
    padding: 22px;
    border-radius: 28px;
    background: rgba(3, 7, 18, 0.85);
    border: 1px solid rgba(99, 102, 241, 0.25);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7),
                0 0 30px -10px rgba(99, 102, 241, 0.15);
    backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #ffffff;
    transition: all 0.3s ease;
  }

  .main-music-card:hover {
    border-color: rgba(99, 102, 241, 0.45);
    box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.8),
                0 0 35px -5px rgba(99, 102, 241, 0.25);
  }

  .track-info {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .album-art {
    width: 66px;
    height: 66px;
    border-radius: 18px;
    background: linear-gradient(135deg, #4f46e5, #9333ea, #06b6d4);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
    animation: ${({ $isPlaying }) => ($isPlaying ? "albumSpin 10s linear infinite" : "none")};
  }

  .album-art:hover {
    transform: scale(1.04);
  }

  @keyframes albumSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .vinyl-grooves {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vinyl-center {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #030712;
    border: 3px solid rgba(255, 255, 255, 0.8);
  }

  .track-details {
    flex-grow: 1;
    overflow: hidden;
  }

  .track-header-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .track-title {
    font-size: 1.25rem;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  .live-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 2px 7px;
    border-radius: 9999px;
    background: rgba(99, 102, 241, 0.2);
    border: 1px solid rgba(99, 102, 241, 0.4);
    color: #a5b4fc;
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $isPlaying }) => ($isPlaying ? "#10b981" : "#94a3b8")};
    box-shadow: ${({ $isPlaying }) => ($isPlaying ? "0 0 8px #10b981" : "none")};
    transition: all 0.3s ease;
  }

  .artist-name {
    font-size: 0.85rem;
    color: #94a3b8;
    margin-top: 3px;
    font-weight: 500;
  }

  .volume-bars {
    display: flex;
    align-items: flex-end;
    gap: 2.5px;
    width: 40px;
    height: 32px;
    padding-bottom: 2px;
  }

  .volume-bars .bar {
    width: 3.5px;
    background: linear-gradient(180deg, #38bdf8, #6366f1);
    border-radius: 3px;
    animation: bounce 0.8s infinite ease-in-out;
    animation-delay: var(--delay);
    animation-play-state: ${({ $isPlaying }) => ($isPlaying ? "running" : "paused")};
  }

  @keyframes bounce {
    0%,
    100% {
      height: 6px;
    }
    50% {
      height: 26px;
    }
  }

  .playback-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .time-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #94a3b8;
    font-variant-numeric: tabular-nums;
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 9999px;
    position: relative;
    cursor: pointer;
    overflow: visible;
    transition: height 0.15s ease;
  }

  .progress-bar:hover {
    height: 8px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #38bdf8);
    border-radius: 9999px;
    position: relative;
    pointer-events: none;
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
  }

  .progress-handle {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.8), 0 2px 4px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    transition: transform 0.1s ease;
  }

  .progress-bar:hover .progress-handle {
    transform: translate(-50%, -50%) scale(1.15);
  }

  .button-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
  }

  .main-control-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex: 1;
    margin-left: 28px;
  }

  .control-button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #cbd5e1;
    transition: all 0.2s ease;
  }

  .control-button:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    transform: scale(1.08);
  }

  .control-button:active {
    transform: scale(0.95);
  }

  .control-button.play-pause-button {
    width: 54px;
    height: 54px;
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
  }

  .control-button.play-pause-button:hover {
    background: linear-gradient(135deg, #4338ca, #4f46e5);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6);
    transform: scale(1.06);
  }

  .control-button.radar {
    width: 40px;
    height: 40px;
    color: #64748b;
  }

  .control-button.radar.loop-active {
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.12);
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.25);
  }
`;
