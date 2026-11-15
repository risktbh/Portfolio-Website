import React, { useEffect } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  FaTimes,
  FaUserGraduate,
  FaLaptopCode,
  FaBrain,
  FaCalendarAlt,
  FaUniversity,
  FaCheckCircle,
  FaAward,
  FaCode,
  FaCogs,
  FaExternalLinkAlt,
} from "react-icons/fa";
import wisudaImage from "../assets/wisuda.jpg";

export default function AboutModal({ isOpen, onClose, type }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] text-slate-100 p-6 sm:p-8 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close modal dialog"
            >
              <FaTimes className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Modal Content Switcher */}
            {type === "education" && <EducationContent />}
            {type === "experience" && <ExperienceContent />}
            {type === "specialties" && <SpecialtiesContent />}
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// 1. Education Content (Formal English)
function EducationContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 pr-10">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <FaUserGraduate className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Education & Academic Background
          </h3>
        </div>
      </div>

      {/* Top Grid: Photo (Left) + Degree & Thesis (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
        {/* Left: Graduation Portrait */}
        <div className="md:col-span-5 flex flex-col h-full">
          <div className="relative group w-full h-full min-h-[300px] md:min-h-0 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-xl bg-slate-950 flex flex-col">
            <img
              src={wisudaImage}
              alt="Graduation portrait of Riski Mardianto"
              className="w-full h-full min-h-[280px] object-cover object-top transition duration-300 group-hover:scale-105"
              width={350}
              height={450}
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            </div>
          </div>
        </div>

        {/* Right: Degree & Thesis */}
        <div className="md:col-span-7 flex flex-col gap-4 h-full justify-between">
          {/* Degree & Institution */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <FaUniversity className="w-4 h-4" aria-hidden="true" />
                <span>Undergraduate Degree</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Bachelor's Degree in Computer Engineering
              </h4>
              <div className="text-sm text-slate-300 mt-0.5">
                University of Amikom Yogyakarta
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 mt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">
                <FaCalendarAlt className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                Class of 2026
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-950/50 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30 font-semibold">
                <FaAward className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                GPA: 3.74 / 4.00
              </span>
            </div>
          </div>

          {/* Undergraduate Thesis / Capstone Project */}
          <a
            href="https://eprints.amikom.ac.id/id/eprint/31847/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900/80 transition-all duration-200 flex flex-col gap-2.5 flex-1 justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="View Undergraduate Thesis on Amikom ePrints"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase font-semibold text-indigo-400 tracking-wider">
                Undergraduate Thesis
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-indigo-300 font-medium transition">
                <span>View</span>
                <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-100 group-hover:text-white leading-snug transition">
              Implementation of Blockchain as a Shipping Status Audit Trail on the BelanjaTech E-Commerce Website
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Developed a Next.js and PostgreSQL e-commerce platform integrating post-quantum ML-DSA signatures and a blockchain audit trail to ensure tamper-proof logistics tracking, non-repudiation, and protection against API cyberattacks.
            </p>
          </a>
        </div>
      </div>

      {/* Bottom Section: Core Academic Disciplines (Spanning full width under photo and thesis) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-3.5 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider flex items-center gap-2">
            <FaBrain className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            <span>Core Academic</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Security & Cryptography
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
              Systems & Development
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {/* Security & Cryptography Cluster */}
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-200 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-colors">
            Cyber Security
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-200 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-colors">
            Network Security
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-200 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-colors">
            Digital Forensics
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-200 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-colors">
            Malware Analysis
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-200 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-colors">
            Advanced Cryptography
          </span>

          {/* Systems & Computing Cluster */}
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-indigo-950/30 border border-indigo-500/25 text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-950/50 transition-colors">
            Algorithms
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-indigo-950/30 border border-indigo-500/25 text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-950/50 transition-colors">
            Cloud Computing
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-indigo-950/30 border border-indigo-500/25 text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-950/50 transition-colors">
            System Administration
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-indigo-950/30 border border-indigo-500/25 text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-950/50 transition-colors">
            Web Programming
          </span>
          <span className="text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-indigo-950/30 border border-indigo-500/25 text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-950/50 transition-colors">
            Database Management
          </span>
        </div>
      </div>
    </div>
  );
}

// 2. Experience Content (Formal English)
function ExperienceContent() {
  const experiences = [
    {
      role: "Learning Management System Intern",
      company: "PT. Krakatau Posco",
      period: "2026 - Present",
      type: "Internship",
      achievements: [
        "Implemented and maintained the Krakatau Posco Learning Management System (LMS) to streamline corporate training and integrate scalable e-learning modules.",
        "Monitored system performance, resolved technical complexities, and optimized the user interface for seamless employee onboarding and continuous education.",
        "Developed comprehensive analytics and reporting dashboards to track training completion rates, evaluate user engagement, and measure program effectiveness.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "PT Muti Jaya Sejahtera",
      period: "2025",
      type: "Contract",
      achievements: [
        "Developed and maintained responsive web and mobile applications for internal Human Resources and employee finance management.",
        "Designed and managed complex data structures and application data flows to support reliable storage, retrieval, and system integrity.",
        "Worked independently in a remote environment utilizing Git-based version control to consistently deliver assigned technical milestones.",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 pr-10">
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <FaLaptopCode className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Professional Experience & Career Timeline
          </h3>
          <p className="text-slate-400 text-sm">
            Chronological employment history, key responsibilities, and delivered technical impact
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col gap-6 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-slate-800">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative flex items-start gap-4 pl-8 group">
            {/* Timeline bullet */}
            <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors" />

            {/* Card Content */}
            <div className="w-full p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-indigo-500/40 transition flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="text-base sm:text-lg font-bold text-white">
                  {exp.role}
                </div>
                <div className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 rounded-full w-fit">
                  {exp.period}
                </div>
              </div>

              <div className="text-sm text-slate-300 font-medium">
                {exp.company} <span className="text-slate-500">({exp.type})</span>
              </div>

              <ul className="mt-2 flex flex-col gap-2">
                {exp.achievements.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <FaCheckCircle className="w-3.5 h-3.5 text-indigo-400 mt-1 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Specialties Content (Formal English)
function SpecialtiesContent() {
  const skillCategories = [
    {
      title: "AI & Agentic Engineering",
      icon: <FaBrain className="w-5 h-5 text-purple-400" aria-hidden="true" />,
      dotColor: "bg-purple-400",
      items: [
        "Agentic Workflows & Tool Orchestration",
        "LangChain Framework & Embeddings",
        "Retrieval-Augmented Generation (RAG) with pgvector",
        "Data Classification & Summarization (IBM Granite)",
        "Autonomous AI Agents Processing",
      ],
    },
    {
      title: "Modern Full-Stack Architecture",
      icon: <FaCode className="w-5 h-5 text-sky-400" aria-hidden="true" />,
      dotColor: "bg-sky-400",
      items: [
        "Frontend: Next.js, React, Tailwind CSS, Blade",
        "Backend Services: TypeScript, Python, PHP, Laravel",
        "Database Architecture: PostgreSQL, MySQL, Prisma ORM",
        "RESTful API Design & Data Pipelines",
      ],
    },
    {
      title: "Automation & Infrastructure",
      icon: <FaCogs className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
      dotColor: "bg-emerald-400",
      items: [
        "n8n Workflow Automation",
        "CI/CD Pipelines with Git, GitHub, and Vercel",
        "Linux Administration & Docker Containerization",
        "Cisco Enterprise Networking & Security (CCNA, CCEP)",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 pr-10">
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <FaBrain className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Specialties & Technical Competencies
          </h3>
        </div>
      </div>

      {/* Core Competencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 transition flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                {cat.icon}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {cat.title}
              </h4>
            </div>

            <ul className="flex flex-col gap-2.5 mt-1">
              {cat.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${cat.dotColor} mt-2 shrink-0`}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
