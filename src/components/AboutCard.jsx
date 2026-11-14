import React from 'react';
import styled from 'styled-components';

const AboutCard = ({ icon, iconColor, title, description, onClick, badgeText = "Details" }) => {
  return (
    <StyledWrapper onClick={onClick}>
      <div
        className="card"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (onClick) onClick();
          }
        }}
      >
        <div className="content">
          <div className="top-row">
            {icon && (
              <div className="icon" style={{ color: iconColor }} aria-hidden="true">
                {icon}
              </div>
            )}
            <span className="badge">{badgeText}</span>
          </div>
          <p className="heading">{title}</p>
          <p className="para">{description}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  width: 100%;

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 20px 24px;
    border-radius: 16px;
    overflow: hidden;
    line-height: 1.5;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(3, 7, 18, 0.45);
    color: #ffffff;
    margin: 0 auto;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    color: #ffffff;
    z-index: 1;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .badge {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.03em;
    padding: 2px 8px;
    border-radius: 9999px;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    color: #a5b4fc;
    transition: all 0.3s ease;
  }

  .card:hover .badge {
    background: rgba(99, 102, 241, 0.35);
    border-color: rgba(99, 102, 241, 0.6);
    color: #ffffff;
  }

  .content .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: all 0.3s ease;
  }

  .content .heading {
    font-weight: 700;
    font-size: 20px;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin: 0;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .content .para {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(226, 232, 240, 0.9);
    opacity: 0.85;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .card::before {
    content: "";
    position: absolute;
    right: -4rem;
    top: -4rem;
    width: 8rem;
    height: 8rem;
    background: #0a3cff;
    z-index: 0;
    opacity: 0;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .card::after {
    content: "";
    position: absolute;
    left: -4rem;
    bottom: -4rem;
    width: 8rem;
    height: 8rem;
    background: #0a3cff;
    z-index: 0;
    opacity: 0;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .card:hover::before {
    scale: 3.5;
    opacity: 1;
  }

  .card:hover::after {
    scale: 3.5;
    opacity: 1;
  }

  .card:hover .content .icon {
    background: rgba(10, 60, 255, 0.12);
    border-color: rgba(10, 60, 255, 0.35);
    color: #0a3cff;
  }

  .card:hover .content .heading {
    color: #ffffff;
  }

  .card:hover .content .para {
    color: #ffffff;
  }

  .card:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    border-color: #0a3cff;
    scale: 1.02;
  }

  @media (max-width: 640px) {
    .card {
      padding: 16px 20px;
    }

    .content .heading {
      font-size: 18px;
    }
  }
`;

export default AboutCard;
