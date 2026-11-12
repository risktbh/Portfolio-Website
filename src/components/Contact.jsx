import React from "react";
import { motion as Motion } from "framer-motion";
import styled from "styled-components";

export default function Contact() {
  const emailAddress = "mardiantoriski5@gmail.com";

  const getInTouchHref = `mailto:${emailAddress}?subject=Portfolio%20Inquiry&body=Hi%20Riski,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding...`;

  const GetInTouchButton = ({ href }) => {
    return (
      <StyledWrapper>
        <a
          href={href}
          className="unique-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="svg-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              aria-hidden="true"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          </div>
          <span>Engage</span>
        </a>
      </StyledWrapper>
    );
  };

  const StyledWrapper = styled.div`
    .unique-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      position: relative;
      width: 150px;
      height: 48px;
      padding: 10px 24px;
      font-size: 15px;
      text-decoration: none;
      color: #fff;
      background-color: #6366f1;
      border: none;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      transition: 0.3s all ease-in-out;
    }

    .unique-button:hover {
      transition: 0.3s all ease-in-out;
      box-shadow: 5px 10px 30px #6366f1;
    }

    .unique-button span {
      display: block;
      transition: all 0.3s ease-in-out;
    }

    .unique-button:hover span {
      transform: translateX(7em);
    }

    .unique-button:hover .svg-wrap {
      animation: fly-1 0.6s ease-in-out infinite alternate;
      z-index: 1;
    }

    .unique-button svg {
      display: block;
      transform-origin: center center;
      transition: transform 0.3s ease-in-out;
    }

    .unique-button:hover svg {
      transform: translateX(2.5em) rotate(45deg) scale(1.2);
    }

    .unique-button:active {
      transform: scale(0.95);
    }

    @keyframes fly-1 {
      from {
        transform: translateY(0.1em);
      }

      to {
        transform: translateY(-0.1em);
      }
    }

    .unique-button::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 80%;
      border-bottom-left-radius: 60px;
      border-top-right-radius: 60px;
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background-color: #1e1b4b;
      transition: all 0.2s ease-in-out;
    }

    .unique-button:hover::before {
      width: 100%;
    }

    .unique-button::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 0;
      border-bottom-left-radius: 20px;
      border-top-right-radius: 20px;
      border-top-left-radius: 60px;
      border-bottom-right-radius: 60px;
      background-color: #1e1b4b;
      transition: all 0.3s ease-in-out;
    }

    .unique-button:hover::after {
      height: 100%;
    }
  `;

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

            <GetInTouchButton href={getInTouchHref} />
          </div>
        </div>

        {/* 3 Cards Grid with Simple Icons (Aligned full width with sections above) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* 1. Location */}
          <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center">
                <img
                  src="https://cdn.simpleicons.org/googlemaps/4285F4"
                  alt="Google Maps"
                  className="w-5 h-5 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Location</div>
                <div className="text-white font-medium text-base">Yogyakarta, Indonesia</div>
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-2">Open to relocation</div>
          </div>

          {/* 2. Work Preference */}
          <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center">
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
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Remote", "Hybrid", "On-site"].map((pref) => (
                <span
                  key={pref}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                >
                  {pref}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Employment Type */}
          <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center">
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
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Full-time", "Freelance", "Contract"].map((type) => (
                <span
                  key={type}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-4 pb-2 text-center text-slate-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} Riski Mardianto. Built with React and Tailwind CSS.
      </footer>
    </Motion.section>
  );
}
