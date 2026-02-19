import "boxicons/css/boxicons.min.css";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: "translateX(0px)" });
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  // Control indicator pill position
  useEffect(() => {
    const updateIndicator = () => {
      const index = LINKS.findIndex((link) => link.id === activeLink);
      if (index === -1) return;

      const item = itemRefs.current[index];
      const list = listRef.current;

      if (item && list) {
        setIndicatorStyle({
          width: item.offsetWidth,
          transform: `translateX(${item.offsetLeft}px)`,
        });
      }
    };

    // Use a small delay to ensure DOM is ready on initial load/mount
    const timeout = setTimeout(updateIndicator, 100);
    window.addEventListener("resize", updateIndicator);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeLink]);

  useEffect(() => {
    AOS.init({ duration: 1500, easing: "linear", offset: 120, once: true });
  }, []);

  // Sync active link with scroll position
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 150; // Offset for detection

      let current = "home";

      // We check sections in reverse to find the one furthest down that's past the threshold
      for (let i = LINKS.length - 1; i >= 0; i--) {
        const section = document.getElementById(LINKS[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section's top is near the top of the viewport
          if (rect.top <= threshold) {
            current = LINKS[i].id;
            break;
          }
        }
      }

      if (current !== activeLink) {
        setActiveLink(current);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to set initial active state
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [activeLink]);

  const getLinkClasses = (linkId) => {
    const isActive = activeLink === linkId;
    return `text-sm md:text-base tracking-wider px-4 md:px-5 lg:px-6 py-2 rounded-full relative z-10 transition-colors duration-300 ${isActive ? "text-black font-semibold" : "text-white hover:text-gray-300"}`;
  };

  return (
    <header data-aos="fade-down" data-aos-delay="300" className="fixed top-[22px] left-0 right-0 z-[100] flex items-center px-4 w-full justify-between md:justify-center">
      <nav className="hidden md:block">
        <div className="rounded-full py-1 border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
          <ul ref={listRef} className="relative flex gap-1 m-0 p-1 list-none">
            {/* The Indicator Pill */}
            <div className="absolute left-0 top-0 h-full rounded-full bg-white transition-all duration-300 ease-out" style={indicatorStyle} />

            {LINKS.map((link, index) => (
              <li key={link.id} ref={(el) => (itemRefs.current[index] = el)} className="relative">
                <a href={`#${link.id}`} onClick={() => setActiveLink(link.id)} className={getLinkClasses(link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-3xl text-white p-2 z-[110] relative" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
        <i className={isMenuOpen ? "bx bx-x" : "bx bx-menu"}></i>
      </button>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 bg-black/90 backdrop-blur-xl transition-all duration-300 z-[105] flex items-center justify-center ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <ul className="flex flex-col gap-8 text-center list-none">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => {
                  setActiveLink(link.id);
                  setIsMenuOpen(false);
                }}
                className={`text-2xl font-bold tracking-widest ${activeLink === link.id ? "text-orange-400" : "text-white"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
