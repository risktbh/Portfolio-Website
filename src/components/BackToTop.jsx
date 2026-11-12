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
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  opacity: ${props => (props.$visible ? 1 : 0)};
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};
  transform: ${props => (props.$visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)')};
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 640px) {
    bottom: 2rem;
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
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
    user-select: none;
  }

  .svgIcon {
    width: 12px;
    transition-duration: 0.3s;
  }

  .svgIcon path {
    fill: white;
  }

  .button:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(181, 160, 255);
    align-items: center;
    box-shadow: 0px 0px 0px 4px rgba(181, 160, 255, 0.45), 0 10px 30px rgba(181, 160, 255, 0.3);
  }

  .button:hover .svgIcon {
    transition-duration: 0.3s;
    transform: translateY(-200%);
  }

  .button::before {
    position: absolute;
    bottom: -20px;
    content: "Back to Top";
    color: #090a0f;
    font-weight: 700;
    letter-spacing: -0.01em;
    font-size: 0px;
    white-space: nowrap;
  }

  .button:hover::before {
    font-size: 13px;
    opacity: 1;
    bottom: unset;
    transition-duration: 0.3s;
  }

  .button:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 3px;
  }
`;

export default BackToTop;
