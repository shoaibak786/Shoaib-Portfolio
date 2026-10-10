import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(
        100,
        Math.floor((elapsed / duration) * 100)
      );

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 300);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-brand">
          SHOAIB <span>. </span>
        </div>

        <p className="preloader-label">
          CRAFTING DIGITAL EXPERIENCES
        </p>

        <div className="preloader-progress">
          <div
            className="preloader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="preloader-bottom">
          <span>PORTFOLIO LOADING</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}