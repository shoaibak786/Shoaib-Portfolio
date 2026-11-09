import { useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#01";

// Hover karne par text "hack" style mein scramble ho kar wapas theek hota hai
export default function ScrambleText({ text, className = "" }) {
  const [out, setOut] = useState(text);
  const timer = useRef(null);

  const run = () => {
    clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame++;
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " ? " " : i < frame / 2 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (frame / 2 >= text.length) { clearInterval(timer.current); setOut(text); }
    }, 30);
  };

  return (
    <span className={className} onMouseEnter={run}>
      {out}
    </span>
  );
}
