import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Github, Linkedin } from "lucide-react";
import Spline from "@splinetool/react-spline";

import { WordPullUp } from "@/components/ui/word-pull-up";

const TITLES = ["Fullstack Web Developer", "UI / UX Designer"];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2800);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-in-sine", offset: 120, once: true });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (event) => {
      setIsLargeScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <main id="home" className="flex scroll-mt-24 lg:mt-[7rem] flex-col lg:flex-row items-start justify-between h-[400px] lg:h-[500px] lg:ml-20 lg:mr-20 gap-4 lg:gap-10">
      <div data-aos="fade-right" data-aos-offset="0" data-aos-easing="ease-in-sine" className="text-center lg:text-left mx-auto lg:mx-0 lg:ml-[7rem] px-4 lg:px-0 max-w-3xl flex flex-col gap-4 lg:gap-3">
        <WordPullUp key={TITLES[titleIndex]} words={TITLES[titleIndex]} className="text-base sm:text-lg md:text-xl lg:text-xl text-white font-[600] text-center lg:text-left leading-normal mt-20" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-orange-400 font-[500] leading-tight">
          Hello, I'm
          <br />
          <span className="text-white font-[600] mb-8">Akbar Pratama</span>
        </h1>
        <p className="text-sm sm:text-base md:text-[0.95rem] lg:text-[1rem] text-white leading-relaxed max-w-[25rem] mx-auto lg:mx-0">
          I turn complex ideas into seamless, high-impact web experiences by building modern, scalable, and high-performance web applications using React and Laravel.
        </p>
        <div className="flex items-center gap-5 mt-2 justify-center lg:justify-start">
          <a
            href="https://github.com/akbarpratama-dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-akbar-pratama-hantoro-455344337/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </div>
      </div>
      {isLargeScreen && (
        <div data-aos="zoom-in" data-aos-delay="700" className="relative w-[440px] h-[500px] mr-0 -mt-15">
          <Spline className="pointer-events-none absolute inset-0 h-full w-full" scene="https://prod.spline.design/HgNeFSbDiHofYvJt/scene.splinecode" />
        </div>
      )}
    </main>
  );
};

export default Hero;
