import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CustomCursor, SmoothScroll } from "./components/Effects";
import Preloader from "./components/Preloader";
import Aurora from "./components/Aurora";
import WhatsAppChat from "./components/WhatsAppChat";
import { Header, Footer } from "./components/Layout";

import HomePage from "./pages/Homepage";
import AboutPage from "./pages/About";
import ExpertisePage from "./pages/Expertise";
import ProjectsPage from "./pages/Projects";
import ExperiencePage from "./pages/Experiance";
import EducationPage from "./pages/Education";
import ContactPage from "./pages/Contact";

gsap.registerPlugin(ScrollTrigger);

function PortfolioApp() {
  const [isLoading, setIsLoading] = useState(true);
  const rootRef = useRef(null);
  const location = useLocation();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading || !rootRef.current) return undefined;

    const root = rootRef.current;
    const cleanups = [];
    let refreshFrame;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-intro",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1, clearProps: "transform" }
      );

      gsap.fromTo(
        ".hero-visual",
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.25 }
      );

      gsap.fromTo(
        ".portrait-frame",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.35, ease: "power3.out" }
      );

      gsap.utils.toArray(".section-reveal", root).forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray(".project-card", root).forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (index % 4) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "bottom 8%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.utils.toArray(".skill-card", root).forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: (index % 3) * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );

        const onEnter = () => {
          gsap.to(card, { y: -5, duration: 0.25, ease: "power2.out", overwrite: "auto" });
        };
        const onLeave = () => {
          gsap.to(card, { y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          gsap.killTweensOf(card);
        });
      });

      gsap.to(".orbit-one", { rotate: 360, duration: 28, ease: "none", repeat: -1 });
      gsap.to(".orbit-two", { rotate: -360, duration: 36, ease: "none", repeat: -1 });
      gsap.to(".floating-star", { y: -12, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".floating-card", { y: -8, duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.35 });
    }, root);

    refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [isLoading, location.pathname]);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <Aurora />

      <div
        id="top"
        ref={rootRef}
        className={`min-h-screen overflow-x-clip bg-transparent text-white selection:bg-[#c5ff4a] selection:text-black ${isLoading ? "" : "is-ready"
          }`}
      >
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioApp />
      <WhatsAppChat />
      <SmoothScroll />
      <CustomCursor />
    </BrowserRouter>
  );
}
