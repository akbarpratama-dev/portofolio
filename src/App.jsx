import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomCursor from "./components/ui/CustomCursor";
import About from "./components/About";
import ParticleBackground from "./components/ui/ParticleBackground";

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <CustomCursor />
      <div className="glow-sway h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_30px_#e99b63] -rotate-[60deg] -z-10"></div>
      <Header />
      <Hero />
      <About />
    </main>
  );
}
