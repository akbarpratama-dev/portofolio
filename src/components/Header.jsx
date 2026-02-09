import "boxicons/css/boxicons.min.css";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const updateIndicator = () => {
      const index = LINKS.findIndex((link) => link.id === activeLink);
      const item = itemRefs.current[index];
      const list = listRef.current;
      if (!item || !list) {
        return;
      }
      setIndicatorStyle({
        width: item.offsetWidth,
        transform: `translateX(${item.offsetLeft}px)`,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeLink]);

  const getLinkClasses = (link) => {
    const isActive = activeLink === link;
    return `text-base tracking-wider transition-colors duration-300 px-6 py-2 rounded-full relative z-10 ${isActive ? "text-black" : "text-white hover:text-gray-300"}`;
  };
  return (
    <header className="relative z-20 flex items-center py-6 px-4 lg:px-4 w-full justify-between md:justify-center">
      <nav className="hidden md:block">
        <div className="rounded-full py-1 border border-white/30 bg-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.2px]">
          <ul ref={listRef} className="relative flex gap-3 lg:gap-2 m-0 p-1 list-none">
            <span className="pointer-events-none absolute left-0 top-0 h-full rounded-2xl bg-white transition-[transform,width] duration-300 ease-out" style={indicatorStyle} />
            {LINKS.map((link, index) => (
              <li key={link.id} ref={(el) => (itemRefs.current[index] = el)} className="text-center">
                <a href={`#${link.id}`} onClick={() => setActiveLink(link.id)} className={`${getLinkClasses(link.id)} font-medium cursor-pointer`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <button className="md:hidden text-3xl p-2 z-50 ml-auto" aria-label="Toggle menu" aria-expanded={isMenuOpen} aria-controls="mobile-nav" onClick={() => setIsMenuOpen((open) => !open)}>
        <i className={isMenuOpen ? "bx bx-x" : "bx bx-menu"}></i>
      </button>
      <div
        id="mobile-nav"
        className={`md:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl border border-white/30 bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.2px] transition-all duration-300 ${
          isMenuOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <ul className="flex flex-col gap-2 p-4 list-none">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => {
                  setActiveLink(link.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full px-4 py-2 rounded-2xl text-base tracking-wider transition-colors duration-300 ${activeLink === link.id ? "bg-white text-black" : "text-white hover:text-gray-300"}`}
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
