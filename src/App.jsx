import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration (higher = slower/heavier)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Lower = heavier scroll
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <CustomCursor />

      {/* Random glow effects */}

      <div className="glow-sway h-0 w-[30rem] fixed top-[75%] left-[-8%] shadow-[0_0_700px_25px_#e99b63] -rotate-[60deg] -z-10 pointer-events-none"></div>

      <div className="glow-sway h-0 w-[40rem] fixed top-[2%] right-[-11%] shadow-[0_0_900px_30px_#e99b63] -rotate-[90deg] -z-10 pointer-events-none"></div>

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
