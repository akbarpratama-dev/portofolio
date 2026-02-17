import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin } from "lucide-react";
import Spline from "@splinetool/react-spline";

import { WordPullUp } from "@/components/ui/word-pull-up";

gsap.registerPlugin(ScrollTrigger);

const TITLES = ["Fullstack Web Developer", "UI / UX Designer"];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return false;
  });

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const splineRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2800);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (event) => {
      setIsLargeScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial Load Animation
      tl.from(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      if (splineRef.current) {
        tl.from(
          splineRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=0.5",
        );
      }

      // Parallax via ScrollTrigger
      gsap.to(contentRef.current, {
        yPercent: 120, // Move down faster than scroll - INCREASED for visibility
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (splineRef.current) {
        gsap.to(splineRef.current, {
          yPercent: 40, // Move down slower than scroll - INCREASED for visibility
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isLargeScreen]);

  return (
    <main ref={heroRef} id="home" className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen w-full px-8 sm:px-12 lg:px-24 pt-20 lg:pt-0 overflow-hidden">
      {/* Background Blobs - Confined to Hero Section */}
      <div
        className="absolute top-[10%] left-[-5%] w-[25rem] h-[25rem] rounded-full -z-10 pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(233,155,99,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full -z-10 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(233,155,99,0.25) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div ref={contentRef} className="text-left mx-0 max-w-3xl flex flex-col gap-4 lg:gap-6 z-10">
        <WordPullUp key={TITLES[titleIndex]} words={TITLES[titleIndex]} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-[600] text-left leading-normal" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-400 font-[500] leading-tight">
          Hello, I'm
          <br />
          <span className="text-white font-[600] mb-8">Akbar Pratama</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white/80 leading-relaxed max-w-[30rem] mx-0">
          I turn complex ideas into seamless, high-impact web experiences by building modern, scalable, and high-performance web applications using React and Laravel.
        </p>
        <div className="flex items-center gap-5 mt-4 justify-start">
          <a
            href="https://github.com/akbarpratama-dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white transition hover:bg-white/20"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-akbar-pratama-hantoro-455344337/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white transition hover:bg-white/20"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </div>
      </div>

      {isLargeScreen && (
        <div ref={splineRef} className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[80%] z-0 pointer-events-auto">
          {/* Consider replacing Spline with a lightweight placeholder if performance is an issue, but keeping as requested */}
          <Spline className="w-full h-full" scene="https://prod.spline.design/HgNeFSbDiHofYvJt/scene.splinecode" />
        </div>
      )}
    </main>
  );
};

export default Hero;
