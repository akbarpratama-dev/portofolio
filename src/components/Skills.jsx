import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "boxicons/css/boxicons.min.css";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "HTML", icon: "bxl-html5", color: "#E34F26" },
  { name: "CSS", icon: "bxl-css3", color: "#1572B6" },
  { name: "JavaScript", icon: "bxl-javascript", color: "#F7DF1E" },
  { name: "PHP", icon: "bxl-php", color: "#777BB4" },
  { name: "Python", icon: "bxl-python", color: "#3776AB" },
  { name: "Java", icon: "bxl-java", color: "#ED8B00" },
  { name: "React", icon: "bxl-react", color: "#61DAFB" },
  { name: "Node.js", icon: "bxl-nodejs", color: "#43853D" },
  {
    name: "Laravel",
    icon: null,
    color: "#FF2D20",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 sm:w-12 sm:h-12">
        <path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027c-.008.002-.016.008-.024.01a.348.348 0 0 1-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 0 1 .023-.058c.004-.013.015-.022.023-.033.01-.014.02-.03.033-.04.01-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L4.845.092a.375.375 0 0 1 .375 0L9.535 2.65h.002c.015.01.027.023.041.034.012.01.027.018.037.028.013.01.023.026.033.04.009.01.019.02.024.033a.24.24 0 0 1 .022.058c.005.012.012.02.015.032a.36.36 0 0 1 .014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 0 1 .024-.059c.007-.012.015-.021.023-.032.01-.015.02-.032.034-.041.01-.01.024-.018.036-.027a.384.384 0 0 1 .042-.034h.001l4.316-2.56a.375.375 0 0 1 .374 0l4.316 2.56c.015.01.027.022.042.033.012.01.026.018.036.028.013.012.024.027.034.041.009.012.018.02.024.033.01.019.016.038.023.058.004.012.011.022.014.033zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283l3.76-2.164zm-4.317 7.412v-4.287l-2.147 1.225-6.23 3.557v4.325l8.377-4.82zM1.093 3.624v14.588l8.377 4.82v-4.325l-4.378-2.47-.002-.001h-.001c-.015-.01-.027-.024-.041-.035-.013-.01-.027-.018-.036-.028l-.001-.002c-.013-.012-.022-.026-.032-.04-.01-.012-.021-.023-.028-.035l-.001-.003a.37.37 0 0 1-.02-.054c-.006-.015-.014-.027-.018-.043l-.001-.002a.293.293 0 0 1-.01-.065c-.003-.014-.007-.027-.007-.041V6.179L1.093 3.624zm3.94-2.786L1.498 2.974l3.534 2.135 3.535-2.135L5.033.838zm1.92 13.197l2.18-1.255V3.624l-1.578.907-2.182 1.256v9.377l1.58-.908zM18.26 3.4l-3.535 2.136 3.535 2.135 3.534-2.135L18.26 3.4zm-.376 4.94l-2.182-1.256-1.578-.908v4.283l2.182 1.256 1.578.907V8.34zm-8.564 9.088 5.578-3.186 2.793-1.594-3.53-2.132-4.32 2.488-4.05 2.332 3.53 2.092z" />
      </svg>
    ),
  },
  { name: "Bootstrap", icon: "bxl-bootstrap", color: "#7952B3" },
  { name: "Tailwind", icon: "bxl-tailwind-css", color: "#06B6D4" },
  { name: "Docker", icon: "bxl-docker", color: "#2496ED" },
  {
    name: "MySQL",
    icon: null,
    color: "#4479A1",
    svg: (
      <svg viewBox="-18.458 -22.75 191.151 191.151" className="w-9 h-9 sm:w-12 sm:h-12">
        <path d="M-18.458 6.58h191.151v132.49H-18.458V6.58z" fill="none" />
        <path
          d="M40.054 113.583h-5.175c-.183-8.735-.687-16.947-1.511-24.642h-.046l-7.879 24.642h-3.94l-7.832-24.642h-.045c-.581 7.388-.947 15.602-1.099 24.642H7.81c.304-10.993 1.068-21.299 2.289-30.919h6.414l7.465 22.719h.046l7.511-22.719h6.137c1.344 11.268 2.138 21.575 2.382 30.919M62.497 90.771c-2.107 11.434-4.887 19.742-8.337 24.928-2.688 3.992-5.633 5.99-8.84 5.99-.855 0-1.91-.258-3.16-.77v-2.757c.611.088 1.328.138 2.152.138 1.498 0 2.702-.412 3.62-1.238 1.098-1.006 1.647-2.137 1.647-3.388 0-.858-.428-2.612-1.282-5.268L42.618 90.77h5.084l4.076 13.19c.916 2.995 1.298 5.086 1.145 6.277 2.229-5.953 3.786-12.444 4.673-19.468h4.901v.002z"
          fill="#5d87a1"
        />
        <path
          d="M131.382 113.583h-14.7V82.664h4.945v27.113h9.755v3.806zM112.834 114.33l-5.684-2.805c.504-.414.986-.862 1.42-1.381 2.416-2.838 3.621-7.035 3.621-12.594 0-10.229-4.014-15.346-12.045-15.346-3.938 0-7.01 1.298-9.207 3.895-2.414 2.84-3.619 7.022-3.619 12.551 0 5.435 1.068 9.422 3.205 11.951 1.955 2.291 4.902 3.438 8.843 3.438 1.47 0 2.819-.18 4.048-.543l7.4 4.308 2.018-3.474zm-18.413-6.934c-1.252-2.014-1.878-5.248-1.878-9.707 0-7.785 2.365-11.682 7.1-11.682 2.475 0 4.289.932 5.449 2.792 1.25 2.017 1.879 5.222 1.879 9.619 0 7.849-2.367 11.774-7.099 11.774-2.476.001-4.29-.928-5.451-2.796M85.165 105.013c0 2.622-.962 4.773-2.884 6.458-1.924 1.678-4.504 2.519-7.737 2.519-3.024 0-5.956-.966-8.794-2.888l1.329-2.655c2.442 1.223 4.653 1.831 6.638 1.831 1.863 0 3.319-.413 4.375-1.232 1.055-.822 1.684-1.975 1.684-3.433 0-1.837-1.281-3.407-3.631-4.722-2.167-1.19-6.501-3.678-6.501-3.678-2.349-1.712-3.525-3.55-3.525-6.578 0-2.506.877-4.529 2.632-6.068 1.757-1.545 4.024-2.315 6.803-2.315 2.87 0 5.479.769 7.829 2.291l-1.192 2.656c-2.01-.854-3.994-1.281-5.951-1.281-1.585 0-2.809.381-3.66 1.146-.858.762-1.387 1.737-1.387 2.933 0 1.828 1.308 3.418 3.722 4.759 2.196 1.192 6.638 3.723 6.638 3.723 2.409 1.709 3.612 3.53 3.612 6.534"
          fill="#f8981d"
        />
        <path
          d="M137.59 72.308c-2.99-.076-5.305.225-7.248 1.047-.561.224-1.453.224-1.531.933.303.3.338.784.601 1.198.448.747 1.229 1.752 1.942 2.276.783.6 1.569 1.194 2.393 1.717 1.453.899 3.1 1.422 4.516 2.318.825.521 1.645 1.195 2.471 1.756.406.299.666.784 1.193.971v-.114c-.264-.336-.339-.822-.598-1.196l-1.122-1.082c-1.084-1.456-2.431-2.727-3.884-3.771-1.196-.824-3.812-1.944-4.297-3.322l-.076-.076c.822-.077 1.797-.375 2.578-.604 1.271-.335 2.43-.259 3.734-.594.6-.15 1.195-.338 1.797-.523v-.337c-.676-.673-1.158-1.567-1.869-2.203-1.902-1.643-3.998-3.25-6.164-4.595-1.16-.749-2.652-1.231-3.887-1.868-.445-.225-1.195-.336-1.457-.71-.67-.822-1.047-1.904-1.533-2.877-1.08-2.053-2.129-4.331-3.061-6.502-.674-1.456-1.084-2.91-1.906-4.257-3.85-6.35-8.031-10.196-14.457-13.971-1.381-.786-3.024-1.121-4.779-1.533l-2.803-.148c-.598-.262-1.197-.973-1.719-1.309-2.132-1.344-7.621-4.257-9.189-.411-1.01 2.431 1.494 4.821 2.354 6.054.635.856 1.458 1.83 1.902 2.802.263.635.337 1.309.6 1.98.598 1.644 1.157 3.473 1.943 5.007.41.782.857 1.604 1.381 2.312.3.414.822.597.936 1.272-.521.744-.562 1.867-.861 2.801-1.344 4.221-.819 9.45 1.086 12.552.596.934 2.018 2.99 3.92 2.202 1.684-.672 1.311-2.801 1.795-4.668.111-.451.038-.747.262-1.043v.073c.521 1.045 1.047 2.052 1.53 3.1 1.159 1.829 3.177 3.735 4.858 5.002.895.676 1.604 1.832 2.725 2.245V74.1h-.074c-.227-.335-.559-.485-.857-.745-.674-.673-1.42-1.495-1.943-2.241-1.566-2.093-2.952-4.41-4.182-6.801-.602-1.16-1.121-2.428-1.606-3.586-.226-.447-.226-1.121-.601-1.346-.562.821-1.381 1.532-1.791 2.538-.711 1.609-.785 3.588-1.049 5.646l-.147.072c-1.19-.299-1.604-1.53-2.056-2.575-1.119-2.654-1.307-6.914-.336-9.976.26-.783 1.385-3.249.936-3.995-.225-.715-.973-1.122-1.383-1.685-.482-.708-1.01-1.604-1.346-2.39-.896-2.091-1.347-4.408-2.312-6.498-.451-.974-1.234-1.982-1.868-2.879-.712-1.008-1.495-1.718-2.058-2.913-.186-.411-.447-1.083-.148-1.53.073-.3.225-.412.523-.487.484-.409 1.867.111 2.352.336 1.385.56 2.543 1.083 3.699 1.867.523.375 1.084 1.085 1.755 1.272h.786c1.193.26 2.538.072 3.661.41 1.979.636 3.772 1.569 5.38 2.576 4.893 3.103 8.928 7.512 11.652 12.778.447.858.637 1.644 1.045 2.539.787 1.832 1.76 3.7 2.541 5.493.785 1.755 1.533 3.547 2.654 5.005.559.784 2.805 1.195 3.812 1.606.745.335 1.905.633 2.577 1.044 1.271.783 2.537 1.682 3.732 2.543.595.448 2.465 1.382 2.576 2.13M99.484 39.844a5.82 5.82 0 0 0-1.529.188v.075h.072c.301.597.824 1.011 1.197 1.532.301.599.562 1.193.857 1.791l.072-.074c.527-.373.789-.971.789-1.868-.227-.264-.262-.522-.451-.784-.22-.374-.705-.56-1.007-.86"
          fill="#5d87a1"
        />
        <path d="M141.148 113.578h.774v-3.788h-1.161l-.947 2.585-1.029-2.585h-1.118v3.788h.731v-2.882h.041l1.078 2.882h.557l1.074-2.882v2.882zm-6.235 0h.819v-3.146h1.072v-.643h-3.008v.643h1.115l.002 3.146z" fill="#f8981d" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    icon: null,
    color: "#3ECF8E",
    svg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 sm:w-12 sm:h-12" fill="currentColor">
        <path d="M12 2C8 6 4 7 4 12c0 5 4 8 8 10s8-3 8-8c0-5-4-6-8-12z" />
      </svg>
    ),
  },
  {
    name: "n8n",
    icon: null,
    color: "#FF6A00",
    svg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 sm:w-12 sm:h-12" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="8.5" cy="9" r="1.2" fill="#fff" />
        <circle cx="15.5" cy="9" r="1.2" fill="#fff" />
        <circle cx="12" cy="15" r="1.2" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: null,
    color: "#F24E1E",
    svg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 sm:w-12 sm:h-12" fill="none">
        <rect x="6" y="3" width="6" height="6" rx="3" fill="#FF7262" />
        <circle cx="9" cy="9" r="3" fill="#A259FF" />
        <rect x="6" y="12" width="6" height="6" rx="3" fill="#1ABCFE" />
        <rect x="12" y="12" width="6" height="6" rx="3" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    name: "Photoshop",
    icon: null,
    color: "#31A8FF",
    svg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 sm:w-12 sm:h-12" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#31A8FF" />
        <text x="12" y="16" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial,Helvetica,sans-serif">
          Ps
        </text>
      </svg>
    ),
  },
  {
    name: "Illustrator",
    icon: null,
    color: "#FF9A00",
    svg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 sm:w-12 sm:h-12" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#FF9A00" />
        <text x="12" y="16" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial,Helvetica,sans-serif">
          Ai
        </text>
      </svg>
    ),
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const githubRef = useRef(null);
  const [contributionWeeks, setContributionWeeks] = useState([]);
  const [contributionError, setContributionError] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(gridRef.current.children, { y: 40, opacity: 0, scale: 0.85 });
      gsap.set(githubRef.current, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      tl.to(titleRef.current, { y: 0, opacity: 1, duration: 1 }).to(gridRef.current.children, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 1 }, "-=0.5").to(githubRef.current, { y: 0, opacity: 1, duration: 1 }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContributions = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (!token) {
          setContributionError("GitHub token belum diset");
          return;
        }

        const query = `
          {
            user(login: "akbarpratama-dev") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Gagal fetch kontribusi");
        }

        const json = await res.json();
        const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];

        setContributionWeeks(weeks);
      } catch (error) {
        if (error.name !== "AbortError") {
          setContributionError("Gagal memuat kontribusi");
        }
      }
    };

    fetchContributions();

    return () => controller.abort();
  }, []);

  const getContributionColor = (count) => {
    if (count === 0) return "bg-white/5";
    if (count < 5) return "bg-orange-400/30";
    if (count < 10) return "bg-orange-400/55";
    if (count < 20) return "bg-orange-400/75";
    return "bg-orange-400";
  };

  return (
    <section ref={sectionRef} id="skills" className="relative w-full min-h-screen scroll-mt-24 px-8 sm:px-12 lg:px-24 py-20 lg:py-32">
      <div className="w-full max-w-5xl mx-auto">
        <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold text-center mb-14">
          <span className="text-white">My </span>
          <span className="text-orange-400">Skills</span>
        </h2>

        <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_25px_-5px_var(--glow)] hover:-translate-y-1"
              style={{ "--glow": `${skill.color}40` }}
            >
              <div className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>
                {skill.svg ? skill.svg : <i className={`bx ${skill.icon}`}></i>}
              </div>
              <span className="text-sm sm:text-base text-white/70 font-medium text-center group-hover:text-white/90 transition-colors duration-300">{skill.name}</span>
            </div>
          ))}
        </div>

        <div ref={githubRef} className="mt-10 sm:mt-12 max-w-4xl mx-auto rounded-2xl border border-orange-500/20 bg-white/5 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(249,115,22,0.35)] p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">GitHub Contributions</h3>
              <p className="text-base sm:text-lg text-white/60">Last 12 months activity</p>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-1 text-[10px] sm:text-xs text-white/60">
              <span>Less</span>
              <span className="h-2.5 w-2.5 rounded bg-white/5" />
              <span className="h-2.5 w-2.5 rounded bg-orange-400/30" />
              <span className="h-2.5 w-2.5 rounded bg-orange-400/55" />
              <span className="h-2.5 w-2.5 rounded bg-orange-400/75" />
              <span className="h-2.5 w-2.5 rounded bg-orange-400" />
              <span>More</span>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            {contributionError ? (
              <div className="text-xs sm:text-sm text-white/60">{contributionError}</div>
            ) : (
              <div className="grid grid-flow-col auto-cols-max gap-1">
                {contributionWeeks.map((week, weekIndex) => (
                  <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
                    {week.contributionDays.map((day) => (
                      <div key={day.date} title={`${day.date} • ${day.contributionCount} contributions`} className={`h-3 w-3 rounded-sm ${getContributionColor(day.contributionCount)}`} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GitHub Streak Stats */}
          <div className="mt-6 flex justify-center">
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=akbarpratama-dev&theme=dark&hide_border=true&background=ffffff00&ring=f97316&fire=f97316&currStreakLabel=ffffff&sideLabels=ffffff&currStreakNum=ffffff&sideNums=ffffff&dates=ffffff80"
              alt="GitHub Streak Stats"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
