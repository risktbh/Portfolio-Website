import React from 'react';
import styled from 'styled-components';

const BorderBeam = ({
  children = "Border Beam",
  color = "#ddd3ff",
  secondaryColor = "#7864e1",
  duration = 6,
  borderWidth = 1,
  borderRadius = 16,
  size = 180,
  delay = 0,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <BeamWrapper
      className={`relative ${className}`}
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $color={color}
      $secondaryColor={secondaryColor}
      $duration={duration}
      $size={size}
      $delay={delay}
      style={{
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
      {...props}
    >
      <div className="border-beam-track" aria-hidden="true">
        <div className="border-beam-light" />
      </div>
      <div className="border-beam-content">
        {children}
      </div>
    </BeamWrapper>
  );
};

const BeamWrapper = styled.div`
  position: relative;
  border-radius: ${props => props.$borderRadius}px;
  background: rgba(15, 23, 42, 0.6);
  border: ${props => props.$borderWidth}px solid rgba(148, 163, 184, 0.15);
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(120, 100, 225, 0.4);
    box-shadow: 0 0 25px -5px rgba(120, 100, 225, 0.25);
  }

  .border-beam-track {
    pointer-events: none;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: ${props => props.$borderWidth}px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    z-index: 2;
  }

  .border-beam-light {
    position: absolute;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    offset-path: rect(0 100% 100% 0 round ${props => props.$borderRadius}px);
    offset-anchor: 50% 50%;
    animation: border-beam-loop ${props => props.$duration}s linear infinite;
    animation-delay: -${props => props.$delay}s;
    background: radial-gradient(
      circle,
      ${props => props.$color} 0%,
      ${props => props.$secondaryColor} 45%,
      rgba(120, 100, 225, 0.2) 70%,
      transparent 85%
    );
    filter: drop-shadow(0 0 8px ${props => props.$color});
  }

  .border-beam-content {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    border-radius: inherit;
  }

  @keyframes border-beam-loop {
    0% {
      offset-distance: 0%;
    }
    100% {
      offset-distance: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .border-beam-light {
      animation: none;
      display: none;
    }
  }
`;

export default BorderBeam;
