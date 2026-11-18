import React, { useState } from 'react';
import styled from 'styled-components';
import AIChatBox from './AIChatBox';

const AIAssistantButton = ({ onClick }) => {
  const [chatOpen, setChatOpen] = useState(false);

  const handleButtonClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    setChatOpen((prev) => !prev);
  };

  return (
    <>
      <StyledWrapper>
        <div className="tooltip-container">
          <div className="tooltip">
            <div className="profile">
              <div className="user">
                <div className="img">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 11.5a8.4 8.4 0 0 1-.9 3.8
                      8.5 8.5 0 0 1-7.6 4.7
                      8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7
                      a8.4 8.4 0 0 1-.9-3.8
                      8.5 8.5 0 0 1 4.7-7.6
                      8.4 8.4 0 0 1 3.8-.9h.5
                      a8.5 8.5 0 0 1 8 8v.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="details">
                  <div className="name-row">
                    <span className="name">AI Assistant</span>
                    <span className="status-badge">
                      <span className="status-dot" />
                      <span>Online</span>
                    </span>
                  </div>
                  <div className="username">@ciel</div>
                </div>
              </div>

              <div className="about">
                Your intelligent AI companion for exploring Riski's portfolio, engineering stack, and projects.
              </div>
            </div>
          </div>

          <button
            className="text"
            onClick={handleButtonClick}
            aria-label="Open AI Assistant @ciel"
            type="button"
          >
            <div className="icon">
              <div className="layer">
                <span />
                <span />
                <span />
                <span />
                <span className="svg">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 11.5a8.4 8.4 0 0 1-.9 3.8
                      8.5 8.5 0 0 1-7.6 4.7
                      8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7
                      a8.4 8.4 0 0 1-.9-3.8
                      8.5 8.5 0 0 1 4.7-7.6
                      8.4 8.4 0 0 1 3.8-.9h.5
                      a8.5 8.5 0 0 1 8 8v.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12h.01M12 12h.01M16 12h.01"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>

              <span className="label">AI Assistant @ciel</span>
            </div>
          </button>
        </div>
      </StyledWrapper>

      {/* Floating ChatGPT-style AI Assistant Chat Box */}
      <AIChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;

  @media (min-width: 640px) {
    bottom: 2rem;
    right: 2rem;
  }

  .tooltip-container {
    --color: #818cf8;
    --border: rgba(129, 140, 248, 0.35);

    position: relative;
    display: inline-flex;
    cursor: pointer;
    font-size: 15px;
  }

  /* Tooltip anchored to the right of the button so it opens inward without clipping */
  .tooltip {
    position: absolute;
    bottom: 100%;
    right: 0;
    left: auto;
    transform: translateY(8px);
    padding-bottom: 14px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 60;
  }

  .profile {
    min-width: 260px;
    max-width: 300px;
    background: rgba(15, 23, 42, 0.94);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 16px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(99, 102, 241, 0.2);
  }

  .tooltip-container:hover .tooltip {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .img {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(56, 189, 248, 0.15) 100%);
    border: 1px solid rgba(129, 140, 248, 0.35);
    color: #a5b4fc;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
  }

  .img svg {
    width: 24px;
    height: 24px;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .name {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 600;
    color: #34d399;
    background: rgba(6, 78, 59, 0.45);
    border: 1px solid rgba(52, 211, 153, 0.35);
    padding: 1px 6px;
    border-radius: 9999px;
  }

  .status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #10b981;
    box-shadow: 0 0 6px #10b981;
  }

  .username {
    color: #a5b4fc;
    font-size: 12px;
    font-weight: 500;
  }

  .about {
    color: rgba(226, 232, 240, 0.7);
    font-size: 12px;
    line-height: 1.45;
    padding-top: 10px;
    margin-top: 8px;
    border-top: 1px solid rgba(148, 163, 184, 0.15);
  }

  .text {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
  }

  .text:focus-visible .layer span {
    outline: 2px solid #818cf8;
    outline-offset: 3px;
  }

  .icon {
    position: relative;
    display: block;
    color: #818cf8;
  }

  .layer {
    position: relative;
    width: 52px;
    height: 52px;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .layer span {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--color);
    border-radius: 16px;
    background: #0f172a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .layer .svg {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f172a;
    color: #a5b4fc;
    z-index: 5;
    border-color: rgba(129, 140, 248, 0.5);
  }

  .layer .svg svg {
    width: 25px;
    height: 25px;
  }

  .icon:hover .layer {
    transform: rotate(-35deg) skew(15deg);
  }

  .icon:hover .layer span:nth-child(1) {
    opacity: 0.2;
  }

  .icon:hover .layer span:nth-child(2) {
    opacity: 0.4;
    transform: translate(4px, -4px);
  }

  .icon:hover .layer span:nth-child(3) {
    opacity: 0.6;
    transform: translate(8px, -8px);
  }

  .icon:hover .layer span:nth-child(4) {
    opacity: 0.8;
    transform: translate(12px, -12px);
  }

  .icon:hover .layer .svg {
    transform: translate(16px, -16px);
    background: #6366f1;
    color: #ffffff;
    border-color: #818cf8;
    box-shadow: 0 0 25px rgba(99, 102, 241, 0.6);
  }

  .icon:hover .layer span {
    border-radius: 12px;
  }

  .label {
    position: absolute;
    right: 0;
    left: auto;
    bottom: -8px;
    white-space: nowrap;
    color: #a5b4fc;
    font-size: 11px;
    font-weight: 700;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateY(4px);
  }

  .icon:hover .label {
    bottom: -24px;
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .tooltip-container:hover .tooltip {
      display: none;
    }
    .label {
      display: none;
    }
  }
`;

export default AIAssistantButton;
