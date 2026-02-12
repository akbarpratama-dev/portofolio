import { useEffect } from "react";
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
  useEffect(() => {
    // Refresh ScrollTrigger on mount to sync with native scroll
    ScrollTrigger.refresh();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <CustomCursor />

      {/* Random glow effects - Safari compatible */}
      <div
        className="fixed top-[75%] left-[-8%] w-[20rem] h-[20rem] rounded-full -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(233,155,99,0.4), rgba(233,155,99,0.15) 35%, transparent 65%)",
          filter: "blur(60px)",
          transform: "rotate(-60deg)",
        }}
      />

      <div
        className="fixed top-[75%] right-[-8%] w-[20rem] h-[20rem] rounded-full -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(233,155,99,0.4), rgba(233,155,99,0.15) 35%, transparent 65%)",
          filter: "blur(60px)",
          transform: "rotate(-60deg)",
        }}
      />

      <div
        className="fixed top-[2%] right-[-11%] w-[24rem] h-[24rem] rounded-full -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(233,155,99,0.45), rgba(233,155,99,0.18) 35%, transparent 70%)",
          filter: "blur(70px)",
          transform: "rotate(-90deg)",
        }}
      />

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
