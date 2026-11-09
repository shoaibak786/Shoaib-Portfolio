// Headline ke har letter ko neeche se uthata hua reveal karta hai
export default function SplitChars({ text, delay = 0, className = "" }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <span
            className="char-up inline-block"
            style={{ animationDelay: `${delay + i * 0.045}s` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
