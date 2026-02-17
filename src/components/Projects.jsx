import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Assets
import laporwargaImg from "@/assets/laporwarga/main.png";
import lekturaImg from "@/assets/lektura/main.png";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "laporwarga",
    title: "LaporWarga",
    subtitle: "Citizen Reporting System",
    description: "A robust PHP-based platform for community engagement, allowing citizens to report issues with real-time status tracking and administrative oversight via a secure dashboard.",
    image: laporwargaImg,
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
    image: lekturaImg,
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
    image: lekturaImg, // Placeholder for now or use another if available
    tech: ["React", "Tailwind CSS", "Framer Motion", "LocalStorage"],
    github: "https://github.com/akbarpratama-dev/",
    live: "#",
    color: "from-purple-500/20 to-transparent",
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card flex-shrink-0 w-screen h-screen flex items-end justify-center px-6 md:px-12 lg:px-24 pb-12 md:pb-16">
      <div className="glass-card w-full h-[65vh] md:h-[75vh] flex flex-col overflow-hidden group">
        {/* Background Glow - localized to the card, keeping it subtle */}
        <div className={`absolute -inset-1 blur-3xl bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />

        {/* Top: Image Container */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative w-full h-[50%] overflow-hidden border-b border-white/10 shrink-0 bg-black/50">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          {/* Lighter Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60" />
        </motion.div>

        {/* Bottom: Content */}
        <div className="relative z-10 w-full h-[50%] p-5 md:p-8 flex flex-col justify-between gap-3 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-2 md:gap-3">
            <div>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-orange-400 font-medium tracking-widest text-xs uppercase">
                {project.subtitle}
              </motion.span>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-5xl font-bold text-white mt-1 md:mt-2 leading-tight">
                {project.title}
              </motion.h3>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-gray-400 text-sm md:text-lg leading-relaxed line-clamp-2 md:line-clamp-3">
              {project.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-2 pt-1 md:pt-2">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-white/5 border border-white/10 text-white/70">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex items-center gap-4 mt-auto">
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="group/btn relative px-6 py-3 bg-orange-500 text-white rounded-full font-semibold overflow-hidden transition-all hover:pr-10 text-sm md:text-base">
              <span className="relative z-10 flex items-center gap-2">
                Live Preview <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all" />
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors">
              <Github className="w-5 h-5 md:w-6 md:h-6" />
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

    let ctx = gsap.context(() => {
      const projects = gsap.utils.toArray(".project-card");

      gsap.to(projects, {
        xPercent: -100 * (projects.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: 1 / (projects.length - 1),
          // base vertical scroll distance on the width of the container
          end: () => `+=${container.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate the main title
      gsap.from(".projects-title", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-[#050505]">
      {/* Section Title - Fixed or moves out */}
      <div className="absolute top-14 left-0 w-full z-10 px-8 md:px-12 lg:px-24 text-center">
        <h2 className="projects-title text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="text-white">Featured </span>
          <span className="text-orange-400">Projects</span>
        </h2>
      </div>

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
