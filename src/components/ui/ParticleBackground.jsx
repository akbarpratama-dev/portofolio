import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 45; // Reduced for a cleaner, less crowded look
    const colors = ["rgba(255,255,255,0.9)", "rgba(233,155,99,0.8)", "rgba(255,255,255,0.5)"];

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseY = this.y;
        this.radius = Math.random() * 2.5 + 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.parallaxSpeed = Math.random() * 0.2 + 0.1; // Speed factor for scroll
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update(scrollY) {
        // Basic animation drift
        this.x += this.vx;
        this.baseY += this.vy;

        // Apply scroll-based Y offset
        this.y = this.baseY - scrollY * this.parallaxSpeed;

        // Wrapping logic (using screen space)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;

        // Handle vertical wrap smoothly
        if (this.y < -50) {
          this.baseY += canvas.height + 100;
        } else if (this.y > canvas.height + 50) {
          this.baseY -= canvas.height + 100;
        }

        this.draw();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = window.scrollY;

      particles.forEach((p) => p.update(scrollY));

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent" style={{ mixBlendMode: "screen" }} />;
}
