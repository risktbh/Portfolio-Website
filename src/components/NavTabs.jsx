import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const NavTabs = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("home");
  const isClickingRef = useRef(false);
  const clickTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Do not override active tab while smooth scroll animation from a user click is in progress
      if (isClickingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If at the top of the page, activate "home"
      if (scrollY < 250) {
        setActiveTab("home");
        return;
      }

      // 2. If scrolled near the bottom of the page, activate "contact"
      if (windowHeight + scrollY >= documentHeight - 80) {
        setActiveTab("contact");
        return;
      }

      // 3. Inspect sections in reverse order (bottom to top)
      const sections = [
        { id: "contact", el: document.getElementById("contact") },
        { id: "certifications", el: document.getElementById("certifications") },
        { id: "projects", el: document.getElementById("projects") },
        { id: "about", el: document.getElementById("about") },
        { id: "home", el: document.getElementById("home") },
      ];

      const triggerThreshold = 180;

      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          // Active when the top enters near the header area and bottom is still visible
          if (rect.top <= triggerThreshold && rect.bottom > 100) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  const handleSelect = (id) => {
    setActiveTab(id);
    isClickingRef.current = true;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    // Lock scroll spy while smooth scroll animates to destination
    clickTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 850);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Accurate offset accounting for sticky header height (70px) + comfort margin
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <StyledWrapper className={className}>
      <div className="cir-tabs" role="tablist" aria-label="Navigation">
        {/* Home */}
        <input
          className="cir-tabs__r"
          type="radio"
          name="cir-nav"
          id="cir-r-home"
          checked={activeTab === "home"}
          onChange={() => handleSelect("home")}
        />
        <label
          className="cir-tabs__t"
          htmlFor="cir-r-home"
          role="tab"
          aria-selected={activeTab === "home"}
          onClick={(e) => {
            e.preventDefault();
            handleSelect("home");
          }}
        >
          Home
        </label>

        {/* About Me */}
        <input
          className="cir-tabs__r"
          type="radio"
          name="cir-nav"
          id="cir-r-about"
          checked={activeTab === "about"}
          onChange={() => handleSelect("about")}
        />
        <label
          className="cir-tabs__t"
          htmlFor="cir-r-about"
          role="tab"
          aria-selected={activeTab === "about"}
          onClick={(e) => {
            e.preventDefault();
            handleSelect("about");
          }}
        >
          About Me
        </label>

        {/* Projects */}
        <input
          className="cir-tabs__r"
          type="radio"
          name="cir-nav"
          id="cir-r-projects"
          checked={activeTab === "projects"}
          onChange={() => handleSelect("projects")}
        />
        <label
          className="cir-tabs__t"
          htmlFor="cir-r-projects"
          role="tab"
          aria-selected={activeTab === "projects"}
          onClick={(e) => {
            e.preventDefault();
            handleSelect("projects");
          }}
        >
          Projects
        </label>

        {/* Certifications */}
        <input
          className="cir-tabs__r"
          type="radio"
          name="cir-nav"
          id="cir-r-certifications"
          checked={activeTab === "certifications"}
          onChange={() => handleSelect("certifications")}
        />
        <label
          className="cir-tabs__t"
          htmlFor="cir-r-certifications"
          role="tab"
          aria-selected={activeTab === "certifications"}
          onClick={(e) => {
            e.preventDefault();
            handleSelect("certifications");
          }}
        >
          Certifications
        </label>

        {/* Contact */}
        <input
          className="cir-tabs__r"
          type="radio"
          name="cir-nav"
          id="cir-r-contact"
          checked={activeTab === "contact"}
          onChange={() => handleSelect("contact")}
        />
        <label
          className="cir-tabs__t"
          htmlFor="cir-r-contact"
          role="tab"
          aria-selected={activeTab === "contact"}
          onClick={(e) => {
            e.preventDefault();
            handleSelect("contact");
          }}
        >
          Contact
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cir-tabs {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 999px;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.2),
      0 12px 28px -10px rgba(0, 0, 0, 0.4);
    font-family: inherit;
  }

  .cir-tabs__r {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .cir-tabs__t {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    color: #94a3b8;
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    transition:
      background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
      color 220ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .cir-tabs__t:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }

  .cir-tabs__r:checked + .cir-tabs__t {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: #ffffff;
    box-shadow:
      0 2px 8px rgba(99, 102, 241, 0.35),
      0 8px 18px -6px rgba(99, 102, 241, 0.45);
  }

  .cir-tabs__r:focus-visible + .cir-tabs__t {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4);
  }

  @media (prefers-reduced-motion: reduce) {
    .cir-tabs__t {
      transition: none;
    }
  }
`;

export default NavTabs;
