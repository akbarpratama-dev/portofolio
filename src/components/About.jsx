import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";
import TiltedCard from "@/components/ui/TiltedCard";
import profileImg from "@/assets/oijio.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const btnRef = useRef(null);
  const photoRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, textRef.current, btnRef.current], { opacity: 0 });
      if (photoRef.current) gsap.set(photoRef.current, { opacity: 0 });
      if (statsRef.current) gsap.set(statsRef.current.children, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });

      if (photoRef.current) {
        tl.fromTo(photoRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.3");
      }

      tl.to(textRef.current, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .to(statsRef.current.children, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .to(btnRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={sectionRef} id="about" className="relative w-full min-h-screen flex items-center scroll-mt-24 px-6 sm:px-10 lg:px-40 py-20 lg:py-32">
      {/* 2-Column Layout */}
      <div className="w-full max-w-auto lg:ml-auto flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
        {/* Left Column — Profile Photo (Glass Card) */}
        {isDesktop && (
          <div ref={photoRef} className="flex-shrink-0">
            <TiltedCard
              imageSrc={profileImg}
              altText="Akbar Pratama"
              captionText=""
              containerHeight="clamp(270px, 36vw, 330px)"
              containerWidth="clamp(220px, 30vw, 270px)"
              imageHeight="clamp(270px, 36vw, 300px)"
              imageWidth="clamp(220px, 30vw, 270px)"
              rotateAmplitude={26}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
              className=""
              cardClassName="border border-white/10 bg-white/5 backdrop-blur-xl p-3 shadow-[0_0_50px_-12px_rgba(233,155,99,0.2)]"
            />
          </div>
        )}

        {/* Right Column — Text */}
        <div className="flex-1 text-center lg:text-left max-w-full ">
          {/* Section Title */}
          <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold text-center lg:text-left mb-6 translate-y-[50px]">
            <span className="text-white">About Me</span>
          </h2>

          <div ref={textRef} className="-translate-x-[60px]">
            <p className="text-sm sm:text-base md:text-[1rem] text-white/80 leading-relaxed">
              Hi, I'm <span className="text-orange-400 font-semibold">Muhammad Akbar Pratama Hantoro</span>, an Informatics undergraduate with a strong interest in web development and modern technologies. I focus on building scalable web
              applications using <span className="text-white font-medium">React</span> for the frontend and <span className="text-white font-medium">Laravel</span> for backend APIs, combining performance, structure, and user experience in
              every project.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 mt-8 [&>*]:translate-y-[40px]">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-orange-400">5+</span>
              <span className="text-sm sm:text-base text-white/70 leading-tight text-left">
                Completed
                <br />
                Projects
              </span>
            </div>

            <div className="hidden sm:block h-10 w-px bg-white/15"></div>

            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-orange-400">1+</span>
              <span className="text-sm sm:text-base text-white/70 leading-tight text-left">
                Years of
                <br />
                Experience
              </span>
            </div>
          </div>

          {/* Download CV Button */}
          <div ref={btnRef} className="flex justify-center lg:justify-start mt-7 translate-y-[30px]">
            <a
              href="/cv.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 backdrop-blur-md px-4 py-2 text-orange-400 font-medium transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-400/60 hover:shadow-[0_0_20px_-5px_rgba(233,155,99,0.3)]"
            >
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
