import React from "react";
import { motion as Motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

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

            <a
              href={getInTouchHref}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition duration-200 cursor-pointer"
            >
              <FaPaperPlane className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        {/* 4 Cards Grid with Simple Icons (Aligned full width with sections above) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* 1. Email */}
          <a
            href={`mailto:${emailAddress}`}
            className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/70 transition duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center group-hover:border-indigo-500/50 transition">
                <img
                  src="https://cdn.simpleicons.org/gmail/EA4335"
                  alt="Gmail"
                  className="w-5 h-5 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Email</div>
                <div className="text-white font-medium text-base group-hover:text-indigo-300 transition break-all">
                  {emailAddress}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-2">Click to open email client</div>
          </a>

          {/* 2. Location */}
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

          {/* 3. Work Preference */}
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

          {/* 4. Employment Type */}
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
