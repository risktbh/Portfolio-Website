import React from 'react';
import styled from 'styled-components';

const InfiniteMarquee = ({
  items = [],
  duration = 20,
  gap = 40,
  reverse = false,
  pauseOnHover = true,
  fade = true,
  className = '',
}) => {
  return (
    <MarqueeWrapper
      $duration={duration}
      $reverse={reverse}
      $pauseOnHover={pauseOnHover}
      $fade={fade}
      className={className}
      aria-label="Technologies carousel"
    >
      <div className="marquee-track">
        <div
          className="marquee-group"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {items.map((item, index) => (
            <div key={`item-${index}`} className="marquee-item">
              {item}
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="marquee-group"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="marquee-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </MarqueeWrapper>
  );
};

const MarqueeWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;

  ${({ $fade }) =>
    $fade &&
    `
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  `}

  .marquee-track {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: marquee ${({ $duration }) => $duration}s linear infinite;
    ${({ $reverse }) => $reverse && `animation-direction: reverse;`}
  }

  ${({ $pauseOnHover }) =>
    $pauseOnHover &&
    `
    &:hover .marquee-track {
      animation-play-state: paused;
    }
  `}

  .marquee-group {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .marquee-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  @keyframes marquee {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
      overflow-x: auto;
    }
  }
`;

export default InfiniteMarquee;
