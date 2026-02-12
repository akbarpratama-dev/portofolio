import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { ExternalLink, Github, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import laporwargaImg1 from "@/assets/laporwarga/laporwarga.png";
import laporwargaImg2 from "@/assets/laporwarga/main.png";
import laporwargaImg3 from "@/assets/laporwarga/Laporwarga3.png";
import lekturaImg1 from "@/assets/lektura/main.png";
import lekturaImg2 from "@/assets/lektura/chat.png";
import lekturaImg3 from "@/assets/lektura/data.png";

gsap.registerPlugin(ScrollTrigger);

const LAPORWARGA_IMAGES = [laporwargaImg2, laporwargaImg3, laporwargaImg1];
const LEKTURA_IMAGES = [lekturaImg1, lekturaImg2, lekturaImg3];

const LAPORWARGA_TECH = ["PHP", "MySQL", "Docker", "Apache", "Cloudflare", "JavaScript"];
const LEKTURA_TECH = ["HTML", "CSS", "JavaScript", "Fetch API", "n8n", "RAG", "Supabase"];

const ImageLightbox = ({ src, alt, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute -top-3 -right-3 z-10 bg-white text-black rounded-full p-1.5 hover:bg-gray-200 transition-colors shadow-lg"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </motion.button>
      <motion.img
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
      />
    </div>
  </motion.div>
);

const ProjectContent = ({ images, title, description, techStack, githubUrl, liveDemoUrl }) => {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <>
      <AnimatePresence>{lightboxImg && <ImageLightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={() => setLightboxImg(null)} />}</AnimatePresence>

      <div className="flex flex-col gap-6">
        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxImg({ src: img, alt: `${title} screenshot ${i + 1}` })}
              className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <img src={img} alt={`${title} screenshot ${i + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium">Click to view</span>
              </div>
            </button>
          ))}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{description}</p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 text-white/80">
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
            <Github className="w-4 h-4" />
            GitHub
          </a>
          {liveDemoUrl && (
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-400 text-sm font-medium hover:bg-orange-500/30 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </>
  );
};

const PROJECT_TABS = [
  {
    id: "laporwarga",
    label: "LaporWarga",
    content: (
      <ProjectContent
        images={LAPORWARGA_IMAGES}
        title="LaporWarga — Citizen Reporting System"
        description="LaporWarga is a PHP-based web application designed to collect and manage citizen reports efficiently. Users can submit reports along with image uploads, while administrators manage status updates through a dedicated dashboard. The system is containerized using Docker and configured for secure public access via Cloudflare Tunnel."
        techStack={LAPORWARGA_TECH}
        githubUrl="https://github.com/akbarpratama-dev/LaporWarga.git"
        liveDemoUrl="https://laporwarga.my.id/public/"
      />
    ),
  },
  {
    id: "lektura",
    label: "Lektura",
    content: (
      <ProjectContent
        images={LEKTURA_IMAGES}
        title="Lektura — RAG Academic Chatbot"
        description="Frontend interface for a Retrieval-Augmented Generation chatbot that processes academic documents via n8n webhook integration and contextual AI responses."
        techStack={LEKTURA_TECH}
        githubUrl="https://github.com/akbarpratama-dev/Lectura-ChatBot-AI.git"
        liveDemoUrl="https://lectura-chat-bot-ai.vercel.app/"
      />
    ),
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(tabsRef.current, { y: 60, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // animate title, then add a short delay before animating tabs
      tl.to(titleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }).to(tabsRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "+=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative w-full min-h-screen flex flex-col justify-center scroll-mt-24 px-6 sm:px-10 lg:px-20 py-20 lg:py-32">
      <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="text-white">Projects</span>
      </h2>

      <div ref={tabsRef} className="max-w-3xl mx-auto">
        <AnimatedTabs tabs={PROJECT_TABS} defaultTab="laporwarga" />
      </div>
    </section>
  );
};

export default Projects;
