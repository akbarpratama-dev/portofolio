import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomCursor from "./components/ui/CustomCursor";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ui/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      smooth: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on mount to sync with native scroll
    ScrollTrigger.refresh();

    // Parallax Blobs
    const blobs = document.querySelectorAll(".parallax-blob");
    blobs.forEach((blob) => {
      const speed = blob.getAttribute("data-speed");
      gsap.to(blob, {
        y: (i, target) => ScrollTrigger.maxScroll(window) * speed * 0.5, // Reduced intensity slightly but made it positive to move WITH scroll, creating depth
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
        },
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <CustomCursor />

      <Header />
      <Hero />
      <About />

      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
