import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import Spline from "@splinetool/react-spline";

import { WordPullUp } from "@/components/ui/word-pull-up";

const TITLES = ["Fullstack Web Developer", "UI / UX Designer"];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2800);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex lg:mt-20 flex-col lg:flex-row items-start justify-between min-h-[calc(90vh-6rem)] lg:ml-20 lg:mr-20 gap-10">
      <div className="text-left mx-10 px-4 lg:px-0 max-w-3xl flex flex-col gap-4 lg:gap-3">
        <WordPullUp key={TITLES[titleIndex]} words={TITLES[titleIndex]} className="text-xl lg:text-xl text-white font-[600] text-left lg:text-left leading-normal " />
        <h1 className="text-4xl lg:text-5xl text-orange-400 font-[500] leading-tight">
          Hello I'm
          <br />
          <span className="text-white font-[600] mb-8">Akbar Pratama</span>
        </h1>
        <p className="text-base lg:text-[1rem] text-white leading-relaxed max-w-[25rem]">
          I turn complex ideas into seamless, high-impact web experiences by building modern, scalable, and high-performance web applications using React and Laravel.
        </p>
        <div className="flex items-center gap-3">
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
      <div className="hidden lg:block relative w-[740px] h-[580px] ml-auto -mt-10">
        <Spline className="pointer-events-none absolute inset-0 h-full w-full" scene="https://prod.spline.design/HgNeFSbDiHofYvJt/scene.splinecode" />
      </div>
    </main>
  );
};

export default Hero;
