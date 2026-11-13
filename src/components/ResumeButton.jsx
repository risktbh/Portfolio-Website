import React from 'react';
import styled from 'styled-components';

const ResumeButton = ({
  href = "https://drive.google.com/uc?export=download&id=1rczEFeuyN_a_3YW6qSv4gpVPrOtyifkk",
  text = "RESUME",
  className = "",
  onClick,
}) => {
  return (
    <StyledWrapper className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        onClick={onClick}
        aria-label="Download Resume"
      >
        <span className="btn-text">{text}</span>
        <div className="container-stars">
          <div className="stars" />
        </div>
        <div className="glow">
          <div className="circle" />
          <div className="circle" />
        </div>
      </a>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 9.5rem;
    height: 2.5rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    border-radius: 9999px;
    background-size: 300% 300%;
    backdrop-filter: blur(1rem);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    animation: gradient_301 5s ease infinite;
    border: double 3px transparent;
    background-image: linear-gradient(#0b0f19, #0b0f19),
      linear-gradient(
        137.48deg,
        #38bdf8 10%,
        #fe53bb 45%,
        #8f51ea 67%,
        #6366f1 87%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 0 4px 15px -2px rgba(99, 102, 241, 0.25);
  }

  .btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.6);
  }

  .container-stars {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s ease;
    backdrop-filter: blur(1rem);
    border-radius: 9999px;
    pointer-events: none;
  }

  .btn-text {
    position: relative;
    z-index: 3;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: #ffffff;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.6), 0 0 12px rgba(129, 140, 248, 0.5);
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .glow {
    position: absolute;
    display: flex;
    width: 10rem;
    inset: 0;
    margin: auto;
    pointer-events: none;
    z-index: 0;
  }

  .circle {
    width: 100%;
    height: 26px;
    filter: blur(1.5rem);
    animation: pulse_3011 4s infinite;
  }

  .circle:nth-of-type(1) {
    background: rgba(99, 102, 241, 0.7);
  }

  .circle:nth-of-type(2) {
    background: rgba(56, 189, 248, 0.65);
  }

  .btn:hover .container-stars {
    background-color: #0b0f19;
  }

  .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 22px -2px rgba(99, 102, 241, 0.45);
  }

  .btn:active {
    border: double 3px #818cf8;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
    transform: scale(0.98);
  }

  .btn:active .circle {
    background: #6366f1;
  }

  .stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }

  .stars::after {
    content: "";
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  .stars::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.6;
  }

  @keyframes animStar {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-135rem);
    }
  }

  @keyframes animStarRotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0);
    }
  }

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes pulse_3011 {
    0% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .btn,
    .stars::after,
    .stars::before,
    .circle {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export default ResumeButton;
