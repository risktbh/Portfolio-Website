"use client";
import React from "react";
import styles from "./ScanText.module.css";

export default function ScanText({
  text = "",
  color = "#818cf8",
  dimColor = "#64748b",
  duration = 4,
  beamWidth = 28,
  paused = false,
  className = "",
  style,
}) {
  return (
    <span
      className={`${styles.root} ${className}`}
      data-paused={paused}
      style={{
        "--color": color,
        "--dim": dimColor,
        "--duration": `${Math.max(0.5, duration)}s`,
        "--beam": `${Math.max(5, Math.min(70, beamWidth))}%`,
        ...style,
      }}
    >
      <span>{text}</span>
      <span className={styles.light} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
