import React from 'react';
import styled, { keyframes } from 'styled-components';

const scanSweep = keyframes`
  0% {
    background-position: 180% 0;
  }
  100% {
    background-position: -80% 0;
  }
`;

const beamTravel = keyframes`
  0% {
    transform: translate3d(-20px, 0, 0);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translate3d(140px, 0, 0);
    opacity: 0;
  }
`;

const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  vertical-align: middle;
  line-height: 1.2;
  user-select: none;

  .scan-text-content {
    font-weight: 700;
    letter-spacing: -0.025em;
    background: linear-gradient(
      90deg,
      ${props => props.$dimColor} 0%,
      ${props => props.$dimColor} calc(50% - ${props => props.$beamWidth}px),
      ${props => props.$color} 50%,
      ${props => props.$dimColor} calc(50% + ${props => props.$beamWidth}px),
      ${props => props.$dimColor} 100%
    );
    background-size: 260% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: ${scanSweep} ${props => props.$duration}s ease-in-out infinite;
    animation-play-state: ${props => props.$paused ? 'paused' : 'running'};
    filter: drop-shadow(0 0 8px ${props => props.$color}66);
    white-space: nowrap;
    transition: filter 0.3s ease;
  }

  &:hover .scan-text-content {
    filter: drop-shadow(0 0 12px ${props => props.$color}aa);
  }

  .scan-beam-line {
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0;
    width: 2px;
    will-change: transform, opacity;
    background: ${props => props.$color};
    box-shadow:
      0 0 8px 1px ${props => props.$color},
      0 0 16px 2px ${props => props.$color}aa;
    pointer-events: none;
    animation: ${beamTravel} ${props => props.$duration}s ease-in-out infinite;
    animation-play-state: ${props => props.$paused ? 'paused' : 'running'};
    border-radius: 999px;
  }
`;

export default function ScanText({
  text = "Portfolio",
  color = "#f1d5ac",
  dimColor = "#857467",
  duration = 4,
  beamWidth = 50,
  paused = false,
  className = "",
  style = {},
  ...props
}) {
  return (
    <Wrapper
      className={className}
      $color={color}
      $dimColor={dimColor}
      $duration={duration}
      $beamWidth={beamWidth}
      $paused={paused}
      style={style}
      {...props}
    >
      <span className="scan-text-content">{text}</span>
      <span className="scan-beam-line" aria-hidden="true" />
    </Wrapper>
  );
}
