import React, { useState } from "react";
import styles from "./ExpandingPanels.module.css";

const EMPTY = [];

export default function ExpandingPanels({
  items = EMPTY,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveChange,
  onSelect,
  height = 440,
  gap = 12,
  borderRadius = 18,
  expandRatio = 4.5,
  className = "",
  style,
  label = "Featured projects showcase",
}) {
  const [internal, setInternal] = useState(defaultActiveIndex);
  const entries = Array.isArray(items) ? items : EMPTY;
  const active = Math.max(
    0,
    Math.min(entries.length - 1, activeIndex ?? internal)
  );

  const activate = (index) => {
    if (activeIndex === undefined) setInternal(index);
    if (index !== active) onActiveChange?.(index);
  };

  if (!entries.length) return null;

  return (
    <div
      className={`${styles.root} ${className}`}
      role="group"
      aria-label={label}
      style={{
        height,
        gap,
        "--panel-radius": `${borderRadius}px`,
        "--panel-ratio": Math.max(1, expandRatio),
        ...style,
      }}
    >
      {entries.map((item, index) => {
        const isActive = index === active;
        const panelNumber = String(index + 1).padStart(2, "0");

        return (
          <button
            key={item.id ?? index}
            type="button"
            className={styles.panel}
            data-active={isActive}
            aria-expanded={isActive}
            aria-label={`${item.title}${item.subtitle ? `: ${item.subtitle}` : ""}`}
            onPointerEnter={(e) => {
              if (e.pointerType !== "touch") activate(index);
            }}
            onFocus={() => activate(index)}
            onClick={() => {
              activate(index);
              onSelect?.(item, index);
            }}
            onKeyDown={(event) => {
              const delta =
                event.key === "ArrowRight" || event.key === "ArrowDown"
                  ? 1
                  : event.key === "ArrowLeft" || event.key === "ArrowUp"
                  ? -1
                  : 0;

              if (!delta && event.key !== "Home" && event.key !== "End") return;

              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                  ? entries.length - 1
                  : (index + delta + entries.length) % entries.length;

              const parent = event.currentTarget.parentElement;
              if (parent && parent.children[next]) {
                parent.children[next].focus();
              }
            }}
            style={{
              background: item.background || "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
              borderColor: isActive ? (item.accentColor ? `${item.accentColor}70` : undefined) : undefined,
            }}
          >
            {/* Subtle shade gradient */}
            <span className={styles.shade} aria-hidden="true" />

            {/* Subtle background watermark icon */}
            {item.icon && (
              <span className={styles.watermark} aria-hidden="true">
                {item.icon}
              </span>
            )}

            {/* Collapsed view (Desktop vertical strip & Mobile accordion header) */}
            <div className={styles.collapsedView} aria-hidden={isActive}>
              <span className={styles.collapsedNumber}>{panelNumber}</span>
              <span className={styles.collapsedTitle}>{item.title}</span>
              <span className={styles.collapsedHint}>+</span>
            </div>

            {/* Expanded view */}
            <div className={styles.expandedContent} aria-hidden={!isActive}>
              {/* Top: Uniform compact text area (Title, Stack, Description) */}
              <div className={styles.headerArea}>
                {/* Baris 1: Nomor, Judul, Subtitle */}
                <div className={styles.titleRow}>
                  <div className={styles.titleArea}>
                    <div className={styles.numberBadge}>
                      <span
                        className={styles.statusDot}
                        style={{
                          background: item.accentColor || "#6366f1",
                          boxShadow: `0 0 8px ${item.accentColor || "#6366f1"}`,
                        }}
                      />
                      <span>{panelNumber}</span>
                    </div>
                    <h3 className={styles.title}>{item.title}</h3>
                    {item.subtitle && (
                      <>
                        <span className={styles.titleSep} aria-hidden="true">·</span>
                        <span
                          className={styles.subtitle}
                          style={{ color: item.accentColor || "#818cf8" }}
                        >
                          {item.subtitle}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Baris 2: Tech Stack Badges (seragam di semua kartu) */}
                {item.techStack && item.techStack.length > 0 && (
                  <div className={styles.techStackRow} aria-label="Tech stack">
                    {item.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Baris 3: Deskripsi (seragam 1-2 baris di semua kartu) */}
                {item.description && (
                  <p className={styles.description}>{item.description}</p>
                )}
              </div>

              {/* Bottom: Widescreen Panorama Screenshot Preview */}
              <div className={styles.screenshotContainer}>
                {item.image ? (
                  <div className={styles.screenshotFrame}>
                    <img
                      src={item.image}
                      alt={`${item.title} widescreen preview`}
                      className={styles.screenshotImg}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    className={`${styles.screenshotFrame} ${styles.screenshotPlaceholder}`}
                    style={{
                      borderColor: item.accentColor ? `${item.accentColor}35` : undefined,
                    }}
                  >
                    <div
                      className={styles.placeholderGlow}
                      style={{
                        background: `radial-gradient(ellipse at 50% 50%, ${item.accentColor || "#6366f1"}15 0%, transparent 70%)`,
                      }}
                      aria-hidden="true"
                    />
                    {item.icon && (
                      <div
                        className={styles.placeholderIcon}
                        style={{ color: item.accentColor || "#818cf8" }}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                    )}
                    <div className={styles.placeholderInfo}>
                      <span className={styles.placeholderTitle}>{item.title} Preview</span>
                      <span className={styles.placeholderSubtitle}>Screenshot panorama coming soon</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
