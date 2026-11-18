import React from "react";
import { motion as Motion } from "framer-motion";
import styled from "styled-components";
import MusicPlayer from "./MusicPlayer";

const StyledWrapper = styled.div`
  display: inline-flex;

  button,
  a {
    font-family: inherit;
    font-size: 14.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    line-height: 1;
    background: royalblue;
    color: white;
    height: 40px;
    padding: 0 18px 0 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(65, 105, 225, 0.35);
  }

  button:hover,
  a:hover {
    background: #3b60d1;
    box-shadow: 0 6px 18px rgba(65, 105, 225, 0.45);
  }

  button:focus-visible,
  a:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }

  button .svg-wrapper-1,
  a .svg-wrapper-1,
  button .svg-wrapper,
  a .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button span,
  a span {
    display: block;
    margin-left: 0.35em;
    transition: all 0.3s ease-in-out;
  }

  button svg,
  a svg {
    display: block;
    width: 18px;
    height: 18px;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper,
  a:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg,
  a:hover svg {
    transform: translateX(1.1em) rotate(45deg) scale(1.15);
  }

  button:hover span,
  a:hover span {
    transform: translateX(4.5em);
    opacity: 0;
  }

  button:active,
  a:active {
    transform: scale(0.96);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    button:hover .svg-wrapper,
    a:hover .svg-wrapper {
      animation: none;
    }
    button,
    a,
    button span,
    a span,
    button svg,
    a svg {
      transition: none;
    }
  }
`;

const ContactButton = ({ href, text = "Send", onClick }) => {
  const content = (
    <>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={18}
            height={18}
            aria-hidden="true"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            />
          </svg>
        </div>
      </div>
      <span>{text}</span>
    </>
  );

  return (
    <StyledWrapper>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${text} via Email`}
          onClick={onClick}
        >
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick} aria-label={`${text} via Email`}>
          {content}
        </button>
      )}
    </StyledWrapper>
  );
};

export default function Contact() {
  const emailAddress = "mardiantoriski5@gmail.com";

  const getInTouchHref = `mailto:${emailAddress}?subject=Portfolio%20Inquiry&body=Hi%20Riski,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding...`;

  return (
    <Motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-between py-6 sm:py-8 w-full snap-section"
    >
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl w-full my-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Contact</h2>
            <p className="mt-2 text-slate-300 text-base max-w-xl">
              Ready to collaborate or discuss opportunities? Connect directly through the channels below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Open to Opportunities</span>
            </div>

            <ContactButton href={getInTouchHref} text="Send" />
          </div>
        </div>

        {/* Contact Body: Vertical Cards (Left) + Music Player (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mt-8">
          {/* Left Column: 3 Contact Cards Stacked Vertically */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {/* 1. Location */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <img
                    src="https://cdn.simpleicons.org/googlemaps/4285F4"
                    alt="Google Maps"
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Location</div>
                  <div className="text-white font-medium text-base">Indonesia</div>
                </div>
              </div>
            </div>

            {/* 2. Work Preference */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <img
                    src="https://cdn.simpleicons.org/googlemeet/00897B"
                    alt="Google Meet"
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Work Preference</div>
                  <div className="text-white font-medium text-base">Remote, Hybrid, On-site</div>
                </div>
              </div>
            </div>

            {/* 3. Employment Type */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <img
                    src="https://cdn.simpleicons.org/upwork/14A800"
                    alt="Upwork"
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Employment Type</div>
                  <div className="text-white font-medium text-base">Full-time, Freelance, Contract</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Music Player */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <MusicPlayer />
          </div>
        </div>
      </div>

      <footer className="pt-4 pb-2 text-center text-slate-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} Riski Mardianto. Built with React and Tailwind CSS.
      </footer>
    </Motion.section>
  );
}
