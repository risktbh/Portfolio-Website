import React, { useState, useEffect } from 'react';

const TypewriterText = ({
  phrases = [
    "Innovation.",
    "Creativity.",
    "Curiosity.",
    "Technology.",
    "Precision.",
    "Purpose."
  ],
  prefix = "Built with ",
  typingSpeed = 85,
  deletingSpeed = 35,
  pause = 1600,
  loop = true,
  cursorColor = "#cdb5eb",
  style = {
    fontSize: 38,
    letterSpacing: "-.045em",
    fontWeight: 500
  },
  className = "",
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex] || "";
    let timeoutId;

    if (!isDeleting) {
      if (currentText.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    } else {
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        if (loop) {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else if (phraseIndex < phrases.length - 1) {
          setPhraseIndex((prev) => prev + 1);
        }
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause, loop]);

  return (
    <div
      className={`inline-flex items-center flex-wrap leading-tight ${className}`}
      style={style}
    >
      {prefix && <span className="text-white mr-1.5">{prefix}</span>}
      <span className="text-indigo-300 font-semibold">{currentText}</span>
      <span
        className="inline-block ml-1 animate-pulse"
        style={{
          width: "2.5px",
          height: "0.85em",
          backgroundColor: cursorColor,
          display: "inline-block",
          verticalAlign: "baseline",
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default TypewriterText;
