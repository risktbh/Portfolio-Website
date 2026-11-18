import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrolled > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHome = (e) => {
    if (e) {
      e.preventDefault();
      // If right click, also stop propagation
      if (e.type === 'contextmenu') {
        e.stopPropagation();
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledWrapper $visible={visible}>
      <button
        className="button"
        onClick={scrollToHome}
        onContextMenu={scrollToHome}
        aria-label="Back to Top"
        title="Back to Top (Click or Right-Click)"
      >
        <svg className="svgIcon" viewBox="0 0 384 512" aria-hidden="true">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 5.75rem;
  right: 1.5rem;
  z-index: 50;
  opacity: ${props => (props.$visible ? 1 : 0)};
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};
  transform: ${props => (props.$visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)')};
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 640px) {
    bottom: 6.25rem;
    right: 2rem;
  }

  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: 1px solid rgba(180, 160, 255, 0.3);
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253), 0 8px 24px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
    overflow: hidden;
    position: relative;
    user-select: none;
  }

  .svgIcon {
    width: 14px;
    height: 14px;
    transition: transform 0.25s ease;
  }

  .svgIcon path {
    fill: white;
  }

  .button:hover {
    background-color: rgb(28, 28, 35);
    border-color: rgba(180, 160, 255, 0.55);
    box-shadow: 0px 0px 0px 5px rgba(180, 160, 255, 0.45), 0 10px 28px rgba(0, 0, 0, 0.65);
    transform: translateY(-3px);
  }

  .button:hover .svgIcon {
    transform: translateY(-2px);
  }

  .button:active {
    transform: translateY(0);
    box-shadow: 0px 0px 0px 3px rgba(180, 160, 255, 0.35), 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  .button:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 3px;
  }
`;

export default BackToTop;
