import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Assets - LaporWarga
import laporwargaMain from "@/assets/laporwarga/main.png";
import laporwarga1 from "@/assets/laporwarga/laporwarga.png";
import laporwarga2 from "@/assets/laporwarga/Laporwarga3.png";

// Assets - Lektura
import lekturaMain from "@/assets/lektura/main.png";
import lekturaChat from "@/assets/lektura/chat.png";
import lekturaData from "@/assets/lektura/data.png";

// Assets - Timerly
import timerlyMain from "@/assets/TIMERly/MAIN.png";
import timerlyConfig from "@/assets/TIMERly/config.png";
import timerlyTimer from "@/assets/TIMERly/timer.png";
import timerlyResult from "@/assets/TIMERly/result.png";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "laporwarga",
    title: "LaporWarga",
    subtitle: "Citizen Reporting System",
    description: "A robust PHP-based platform for community engagement, allowing citizens to report issues with real-time status tracking and administrative oversight via a secure dashboard.",
    images: [laporwargaMain, laporwarga1, laporwarga2],
    tech: ["PHP", "MySQL", "Docker", "Apache", "Cloudflare"],
    github: "https://github.com/akbarpratama-dev/LaporWarga.git",
    live: "https://laporwarga.my.id/public/",
    color: "from-orange-500/20 to-transparent",
  },
  {
    id: "lektura",
    title: "Lektura",
    subtitle: "RAG Academic Chatbot",
    description: "An intelligent chatbot interface utilizing Retrieval-Augmented Generation to provide contextual answers from academic documents, integrated with n8n and Supabase.",
    images: [lekturaMain, lekturaChat, lekturaData],
    tech: ["React", "n8n", "RAG", "Supabase", "Fetch API"],
    github: "https://github.com/akbarpratama-dev/Lectura-ChatBot-AI.git",
    live: "https://lectura-chat-bot-ai.vercel.app/",
    color: "from-blue-500/20 to-transparent",
  },
  {
    id: "timerly",
    title: "Timerly",
    subtitle: "Focus Management App",
    description: "A minimal, Neo-Brutalist inspired timer application designed for focused study sessions and performance tracking using local storage.",
    images: [timerlyMain, timerlyConfig, timerlyTimer, timerlyResult],
    tech: ["React", "Tailwind CSS", "Framer Motion", "LocalStorage"],
    github: "https://github.com/akbarpratama-dev/",
    live: "#",
    color: "from-purple-500/20 to-transparent",
  },
];

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <div className="project-card flex-shrink-0 w-screen h-screen flex items-end justify-center px-6 md:px-12 lg:px-24 pb-8 md:pb-12 max-w-7xl mx-auto">
      <div className="glass-card w-full h-[65vh] md:h-[75vh] max-w-4xl flex flex-col overflow-hidden group">
        {/* Background Glow - localized to the card, keeping it subtle */}
        <div className={`absolute -inset-1 blur-3xl bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />

        {/* Top: Image Container */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative w-full h-[60%] overflow-hidden border-b border-white/10 shrink-0 bg-black/50">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </AnimatePresence>

          {/* Lighter Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 pointer-events-none" />

          {/* Image Navigation Indicators (Optional, nice for UX) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-white w-4" : "bg-white/30 hover:bg-white/50"}`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom: Content (Takes remaining space) */}
        <div className="relative z-10 w-full flex-1 p-4 md:p-6 flex flex-col justify-between gap-1.5 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-1 md:gap-1.5">
            <div>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-orange-400 font-medium tracking-widest text-[9px] md:text-[10px] uppercase">
                {project.subtitle}
              </motion.span>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-xl md:text-3xl font-bold text-white mt-0 md:mt-0.5 leading-tight">
                {project.title}
              </motion.h3>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-gray-400 text-[10px] md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
              {project.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-1 pt-0.5">
              {project.tech.map((t, i) => (
                <span key={i} className="px-2 py-0.5 text-[9px] md:text-[11px] font-medium rounded-full bg-white/5 border border-white/10 text-white/70">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex items-center gap-3 mt-auto">
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="group/btn relative px-4 py-2 bg-orange-500 text-white rounded-full font-semibold overflow-hidden transition-all hover:pr-8 text-xs md:text-sm">
              <span className="relative z-10 flex items-center gap-1.5">
                Live Preview <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </span>
              <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all w-3.5 h-3.5 md:w-4 md:h-4" />
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    let ctx = gsap.context(() => {
      // Calculate scroll distance using xPercent for better responsiveness
      // We want to move (N-1) sections to the left.
      // Total width is N * 100%. One section is 100% / N of the total width.
      // We need to move N-1 sections, so (N-1) * (100 / N)% of the total width.
      // Simplified: 100 * (N-1) / N
      const xPercent = (-100 * (PROJECTS.length - 1)) / PROJECTS.length;

      gsap.to(container, {
        xPercent: xPercent,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1, // Smooth scrubbing
          // Remove snap to prevent user feeling "stuck"
          end: () => `+=${container.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-[#050505] scroll-mt-20">
      <div ref={containerRef} className="flex h-screen items-center" style={{ width: `${PROJECTS.length * 100}%` }}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Projects;
