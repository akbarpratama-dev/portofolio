import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "m.akbar.pratama.h@gmail.com",
    href: "mailto:m.akbar.pratama.h@gmail.com",
    color: "#EA4335",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/akbarpratama",
    href: "https://www.linkedin.com/in/muhammad-akbar-pratama-hantoro-455344337/",
    color: "#0A66C2",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/akbarpratama-dev",
    href: "https://github.com/akbarpratama-dev",
    color: "#fff",
  },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(descRef.current, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      tl.to(titleRef.current, { y: 0, opacity: 1, duration: 1 })
        .to(descRef.current, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".contact-icon", { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 1, ease: "power2.out" }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative w-full min-h-screen flex items-center justify-center scroll-mt-24 px-8 sm:px-12 lg:px-24 py-20 lg:py-32">
      <div className="max-w-4xl mx-auto">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="text-white">Let's Work </span>
          <span className="text-orange-400">Together</span>
        </h2>

        <p ref={descRef} className="text-sm sm:text-base text-center text-white/70 leading-relaxed max-w-2xl mx-auto mb-12">
          I'm currently open to <span className="text-orange-400 font-medium">internship</span>, <span className="text-orange-400 font-medium">freelance</span>, and{" "}
          <span className="text-orange-400 font-medium">full-time opportunities</span>. If you're looking for a fullstack developer who builds scalable and high-performance web applications, let's connect.
        </p>

        <div ref={iconsRef} className="grid grid-cols-3 gap-8 sm:gap-12 max-w-md mx-auto">
          {CONTACT_INFO.map((contact) => {
            const Icon = contact.icon;

            return (
              <a key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer" className="contact-icon flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-transform duration-300 hover:scale-110" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
