import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[9999]" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` }}>
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-300 to-orange-500 blur-3xl opacity-85" />
    </div>
  );
}
