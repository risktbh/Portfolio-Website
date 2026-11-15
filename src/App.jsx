import React, { useState, useEffect } from "react";
import profileImage from "./assets/profile.jpg";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaAward,
  FaBrain,
  FaLayerGroup,
  FaCogs,
  FaShieldAlt,
  FaGraduationCap,
  FaMobileAlt,
} from "react-icons/fa";
import { AnimatePresence, motion as Motion } from "framer-motion";
import ibmLogo from "./assets/ibm-logo.svg";
import Button from "./components/Button";
import ResumeButton from "./components/ResumeButton";
import Contact from "./components/Contact";
import Pattern from "./components/Pattern";
import Loader from "./components/Loader";
import InfiniteMarquee from "./components/InfiniteMarquee";
import TypewriterText from "./components/TypewriterText";
import BorderBeam from "./components/BorderBeam";
import NavTabs from "./components/NavTabs";
import ScanText from "./components/ScanText";
import BackToTop from "./components/BackToTop";
import AboutCard from "./components/AboutCard";
import AboutModal from "./components/AboutModal";
import ExpandingPanels from "./components/ExpandingPanels";
import dokarImg from "./assets/Dokar/1.jpg";
import elevateHrImg from "./assets/elevatehr.png";
import belanjaTechImg from "./assets/belanjatech.png";

const techStack = [
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Golang", icon: "https://cdn.simpleicons.org/go/00ADD8" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain/white" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "n8n Automation", icon: "https://cdn.simpleicons.org/n8n/FF6D5A" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Prisma ORM", icon: "https://cdn.simpleicons.org/prisma/white" },
  { name: "RAG & pgvector", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "REST APIs", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Git & GitHub", icon: "https://cdn.simpleicons.org/github/white" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white" }
];

const certifications = [
  {
    id: 1,
    title: "Certified Cybersecurity Educator Professional (CCEP)",
    description: "Validates technical expertise across core cybersecurity domains and information security architecture.",
    tags: ["Cybersecurity", "Architecture"],
    link: "#",
    icon: <FaShieldAlt className="w-8 h-8 text-cyan-400" aria-hidden="true" />,
  },
  {
    id: 2,
    title: "Data Classification and Summarization Using IBM Granite",
    description: "Validates skills in applying Generative AI and Natural Language Processing (NLP) for data classification.",
    tags: ["Generative AI", "NLP"],
    link: "#",
    icon: ibmLogo,
  },
  {
    id: 3,
    title: "Cisco Network Security",
    description: "Certification validating proficiency in core network security concepts and practices.",
    tags: ["Network Security", "Cisco"],
    link: "#",
    icon: "https://cdn.simpleicons.org/cisco/1BA0D7",
  },
  {
    id: 4,
    title: "CCNA: Enterprise Networking, Security, and Automation",
    description: "Validates expertise in configuring and troubleshooting enterprise networks and security automation.",
    tags: ["Networking", "Automation"],
    link: "#",
    icon: "https://cdn.simpleicons.org/cisco/1BA0D7",
  },
  {
    id: 5,
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    description: "Covers switching technologies, router operations, and wireless essentials for enterprise networks.",
    tags: ["Routing", "Wireless"],
    link: "#",
    icon: "https://cdn.simpleicons.org/cisco/1BA0D7",
  },
  {
    id: 6,
    title: "CCNA: Introduction to Networks",
    description: "Foundational credential validating knowledge of networking architecture, models, and IP connectivity.",
    tags: ["Networking", "Fundamentals"],
    link: "#",
    icon: "https://cdn.simpleicons.org/cisco/1BA0D7",
  },
];

const projectsData = [
  {
    id: 1,
    title: "BelanjaTech",
    subtitle: "E-commerce platform with Blockchain Security",
    techStack: [
      "Next.js",
      "PostgreSQL",
      "Prisma ORM",
      "Blockchain",
      "ML-DSA",
    ],
    description:
      "Built a full-stack e-commerce platform and engineered its security layer to protect transaction and logistics data using ML-DSA post-quantum signatures and SHA-256 hash chains.",
    background:
      "linear-gradient(145deg, rgba(6, 78, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)",
    accentColor: "#10b981",
    icon: <FaShieldAlt className="w-full h-full text-emerald-400" aria-hidden="true" />,
    image: belanjaTechImg,
  },
  {
    id: 2,
    title: "KP-OWL PT Krakatau Posco",
    subtitle: "Learning Management System",
    techStack: ["PHP", "Laravel", "CI/CD", "IT Support"],
    description:
      "Administered PT Krakatau Posco's OWL LMS, overseeing platform configurations and communication channels to support corporate training sessions and events.",
    background:
      "linear-gradient(145deg, rgba(59, 7, 100, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)",
    accentColor: "#a855f7",
    icon: <FaGraduationCap className="w-full h-full text-purple-400" aria-hidden="true" />,
    image: null,
  },
  {
    id: 3,
    title: "ElevateHR",
    subtitle: "Agentic HR People Assistant",
    techStack: ["Next.js", "LangChain", "pgvector", "n8n"],
    description:
      "Engineered an AI-powered agentic People Assistant to autonomously process natural language inquiries regarding employee data and automate core HR workflows.",
    background:
      "linear-gradient(145deg, rgba(30, 27, 75, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)",
    accentColor: "#6366f1",
    icon: <FaBrain className="w-full h-full text-indigo-400" aria-hidden="true" />,
    image: elevateHrImg,
  },
  {
    id: 4,
    title: "Dokar Platform",
    subtitle: "HR & Employee Finance",
    techStack: ["React", "Next.js", "Node.js", "Java", "REST APIs"],
    description:
      "Architected a comprehensive full-stack web and native mobile application for processing sensitive personnel records and payroll data.",
    background:
      "linear-gradient(145deg, rgba(12, 74, 110, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)",
    accentColor: "#0ea5e9",
    icon: <FaMobileAlt className="w-full h-full text-sky-400" aria-hidden="true" />,
    image: dokarImg,
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutModalType, setAboutModalType] = useState(null);

  useEffect(() => {
    // Show entrance loader for 1.8 seconds on initial visit
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Section-by-section full page wheel navigation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const sectionIds = ["home", "about", "projects", "certifications", "contact"];
    let isNavigating = false;
    let navTimeout = null;

    const handleWheel = (e) => {
      // Do not hijack scrolling when a modal or dialog is open
      if (document.body.style.overflow === "hidden" || e.target.closest('[role="dialog"]')) {
        return;
      }

      // Ignore subtle trackpad movements or horizontal scrolling
      if (Math.abs(e.deltaY) < 30 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      const headerOffset = 80;
      let currentIndex = 0;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset + 80) {
            currentIndex = i;
            break;
          }
        }
      }

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom && e.deltaY > 0) return;
      if (window.scrollY <= 10 && e.deltaY < 0) return;

      const currentEl = document.getElementById(sectionIds[currentIndex]);
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        // If the current section is taller than screen and has unread bottom content, let normal scroll reveal it
        if (e.deltaY > 0 && rect.bottom > window.innerHeight + 80) {
          return;
        }
        // If the current section has unread top content, let normal scroll reveal it
        if (e.deltaY < 0 && rect.top < 0) {
          return;
        }
      }

      if (!isNavigating) {
        if (e.deltaY > 0 && currentIndex < sectionIds.length - 1) {
          e.preventDefault();
          isNavigating = true;
          const nextId = sectionIds[currentIndex + 1];
          const el = document.getElementById(nextId);
          if (el) {
            const targetTop = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: targetTop, behavior: "smooth" });
          }
          clearTimeout(navTimeout);
          navTimeout = setTimeout(() => {
            isNavigating = false;
          }, 850);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          e.preventDefault();
          isNavigating = true;
          const prevId = sectionIds[currentIndex - 1];
          if (prevId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const el = document.getElementById(prevId);
            if (el) {
              const targetTop = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
              window.scrollTo({ top: targetTop, behavior: "smooth" });
            }
          }
          clearTimeout(navTimeout);
          navTimeout = setTimeout(() => {
            isNavigating = false;
          }, 850);
        }
      } else {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (navTimeout) clearTimeout(navTimeout);
    };
  }, []);

  return (
    <>
      {/* Entrance Astronaut Loader */}
      <AnimatePresence>
        {loading && (
          <Motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <Loader />
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen text-slate-100 selection:bg-indigo-500 selection:text-white">
        {/* Background Starry Night */}
        <Pattern />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/80">
          <div className="w-full px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between relative">
            {/* Left: Tulisan Portfolio di pojok kiri */}
            <div className="flex-1 flex items-center justify-start">
              <a
                href="#home"
                className="inline-flex items-center text-2xl sm:text-[26px] font-extrabold transition tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="Portfolio Home"
              >
                <ScanText
                  text={"Portfolio"}
                  color={"#818cf8"}
                  dimColor={"#94a3b8"}
                  duration={4}
                  beamWidth={28}
                  paused={false}
                />
              </a>
            </div>

            {/* Center: Cir-tabs Navigation (Home, About Me, Certifications, Contact) */}
            <div className="hidden md:flex items-center justify-center flex-shrink-0">
              <NavTabs />
            </div>

            {/* Right: Tombol Resume di pojok kanan (desktop) & Hamburger (mobile) */}
            <div className="flex-1 flex items-center justify-end gap-3">
              <div className="hidden md:flex items-center">
                <ResumeButton href="https://drive.google.com/uc?export=download&id=1rczEFeuyN_a_3YW6qSv4gpVPrOtyifkk" />
              </div>

              <button
                className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg">
              <div className="px-6 py-4 flex flex-col gap-3">
                <a
                  href="#home"
                  className="py-1 text-slate-300 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="py-1 text-slate-300 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const el = document.getElementById("about");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.pageYOffset - 85;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                >
                  About Me
                </a>
                <a
                  href="#projects"
                  className="py-1 text-slate-300 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const el = document.getElementById("projects");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.pageYOffset - 85;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                >
                  Projects
                </a>
                <a
                  href="#certifications"
                  className="py-1 text-slate-300 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const el = document.getElementById("certifications");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.pageYOffset - 85;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                >
                  Certifications
                </a>
                <a
                  href="#contact"
                  className="py-1 text-slate-300 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const el = document.getElementById("contact");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.pageYOffset - 85;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                >
                  Contact
                </a>
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-center">
                  <ResumeButton
                    href="https://drive.google.com/uc?export=download&id=1rczEFeuyN_a_3YW6qSv4gpVPrOtyifkk"
                    onClick={() => setMobileOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto w-full px-6 lg:px-10 flex-1 flex flex-col">
          {/* Hero */}
          <section
            id="home"
            className="scroll-mt-20 min-h-[calc(100vh-5rem)] flex items-center grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-8 snap-section"
          >
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.12] text-white tracking-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300">Riski Mardianto</span>,
                <br className="hidden sm:inline" /> a Software Developer
              </h1>
              <p className="mt-6 text-slate-300 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light">
                I build intelligent, end-to-end web applications and automate complex workflows using modern AI technologies.
              </p>

              <div className="mt-8 flex flex-wrap gap-5 items-center">
                <Button text="About Me" href="#about" />
              </div>

              <div className="mt-10 flex flex-row gap-7 items-center text-slate-400">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/riski-m"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  <FaLinkedin className="w-7 h-7" aria-hidden="true" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/risktbh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="hover:text-white transition-colors duration-200"
                >
                  <FaGithub className="w-7 h-7" aria-hidden="true" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/+6281575774233"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp chat"
                  className="hover:text-emerald-400 transition-colors duration-200"
                >
                  <FaWhatsapp className="w-7 h-7" aria-hidden="true" />
                </a>

                {/* Gmail */}
                <a
                  href="mailto:mardiantoriski5@gmail.com"
                  aria-label="Send Email"
                  className="hover:text-rose-400 transition-colors duration-200"
                >
                  <SiGmail className="w-7 h-7" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="order-first lg:order-last lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-500 to-indigo-400 opacity-40 blur-xl pointer-events-none" />
                <img
                  src={profileImage}
                  alt="Profile photo of Riski Mardianto"
                  className="relative w-56 sm:w-72 md:w-80 lg:w-96 aspect-square object-cover rounded-full border-4 border-slate-700/80 shadow-[0_0_50px_rgba(99,102,241,0.25)]"
                />
              </div>
            </div>
          </section>

          {/* About */}
          <section
            id="about"
            className="scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 snap-section"
          >
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl lg:rounded-3xl p-6 sm:p-9 lg:p-12 shadow-2xl w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300">Me</span>
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-5xl font-light">
                I'm a developer focused on crafting intelligent and scalable web systems. My stack centers on{" "}
                <span className="font-semibold text-indigo-400">Next.js</span>,{" "}
                <span className="font-semibold text-cyan-400">LangChain</span>, and PostgreSQL. My work bridges{" "}
                <span className="font-medium text-white">Full-Stack Development, AI Engineering, and Agentic Workflows</span>.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                {/* Experience */}
                <AboutCard
                  icon={<FaLaptopCode className="w-5 h-5" />}
                  iconColor="#6366f1"
                  title="Experience"
                  description="2+ years of professional experience building intelligent and scalable web systems."
                  badgeText="Timeline"
                  onClick={() => setAboutModalType("experience")}
                />

                {/* Specialties */}
                <AboutCard
                  icon={<FaBrain className="w-5 h-5" />}
                  iconColor="#a855f7"
                  title="Specialties"
                  description="AI Engineering · Full-Stack Development · Agentic Workflows"
                  badgeText="Skills"
                  onClick={() => setAboutModalType("specialties")}
                />

                {/* Education */}
                <AboutCard
                  icon={<FaUserGraduate className="w-5 h-5" />}
                  iconColor="#10b981"
                  title="Education"
                  description="Bachelor's Degree in Computer Engineering"
                  badgeText="Degree"
                  onClick={() => setAboutModalType("education")}
                />
              </div>

              {/* Tech Stack */}
              <div className="mt-7 sm:mt-9 pt-5 sm:pt-6 border-t border-slate-800/80">
                <div className="mb-3">
                  <TypewriterText
                    phrases={[
                      "Innovation.",
                      "Creativity.",
                      "Curiosity.",
                      "Technology.",
                      "Precision.",
                      "Purpose."
                    ]}
                    prefix={"Built with "}
                    typingSpeed={85}
                    deletingSpeed={35}
                    pause={1600}
                    loop={true}
                    cursorColor={"#cdb5eb"}
                    style={{
                      fontSize: 24,
                      letterSpacing: "-.03em",
                      fontWeight: 600
                    }}
                  />
                </div>

                <div className="py-1">
                  <InfiniteMarquee
                    items={techStack.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-200"
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-5 h-5 object-contain"
                          loading="lazy"
                        />
                        <span className="font-semibold text-slate-200 text-sm sm:text-base whitespace-nowrap">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                    duration={25}
                    gap={14}
                    reverse={false}
                    pauseOnHover={true}
                    fade={true}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section
            id="projects"
            className="scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 snap-section font-['Plus_Jakarta_Sans',sans-serif]"
          >
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300">Projects</span>
                  </h2>
                  <p className="mt-3 text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-light">
                    A showcase of intelligent AI agents, enterprise-grade architectures, and secure cryptographic platforms engineered for production impact.
                  </p>
                </div>
              </div>

              <ExpandingPanels items={projectsData} height={500} expandRatio={4.8} />
            </div>
          </section>

          {/* Certifications */}
          <section
            id="certifications"
            className="scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-4 sm:py-6 snap-section"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-white">Certifications</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {certifications.map((cert, idx) => (
                <BorderBeam
                  key={cert.id}
                  color="#ddd3ff"
                  secondaryColor="#7864e1"
                  duration={6}
                  borderWidth={1}
                  borderRadius={14}
                  delay={idx * 1}
                  className="h-full flex"
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-between p-4 sm:p-4.5 bg-slate-900/50 backdrop-blur-md rounded-[14px] hover:bg-slate-800/40 transition duration-300 group h-full w-full"
                  >
                    <div className="flex flex-col items-center text-center w-full">
                      {/* Logo / Icon */}
                      <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-950/80 border border-slate-800 group-hover:border-indigo-500/50 transition">
                        {typeof cert.icon === "string" ? (
                          <img
                            src={cert.icon}
                            alt={cert.title}
                            className="w-8 h-6 object-contain mx-auto"
                            loading="lazy"
                          />
                        ) : cert.icon ? (
                          cert.icon
                        ) : (
                          <FaAward className="w-6 h-6 text-indigo-400" aria-hidden="true" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mt-2.5 text-sm sm:text-base font-semibold text-white text-center group-hover:text-indigo-400 transition leading-snug line-clamp-2">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-400 mt-1.5 text-center leading-relaxed line-clamp-2">
                        {cert.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                      {cert.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2.5 py-0.5 text-[11px] rounded-full bg-slate-950/80 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </BorderBeam>
              ))}
            </div>
          </section>

          {/* Contact */}
          <Contact />
        </main>

        {/* Floating Back to Top Button */}
        <BackToTop />

        {/* About Details Pop-up Modal */}
        <AboutModal
          isOpen={Boolean(aboutModalType)}
          onClose={() => setAboutModalType(null)}
          type={aboutModalType}
        />
      </div>
    </div>
  </>
  );
}
