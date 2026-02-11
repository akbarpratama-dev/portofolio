import { useRef, useState } from "react";

const TiltedCard = ({
  imageSrc,
  altText,
  captionText,
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 19,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent,
  className = "",
  cardClassName = "",
}) => {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) scale(1)");

  const handleMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * rotateAmplitude;
    const rotateX = -((y - centerY) / centerY) * rotateAmplitude;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`);
  };

  const handleLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div ref={containerRef} className={`relative perspective-[900px] ${className}`} style={{ width: containerWidth, height: containerHeight }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className={`relative h-full w-full rounded-2xl transition-transform duration-500 ease-out will-change-transform ${cardClassName}`} style={{ transform, transformStyle: "preserve-3d" }}>
        <img src={imageSrc} alt={altText} className="rounded-xl object-cover" style={{ width: imageWidth, height: imageHeight }} />

        {(displayOverlayContent || showTooltip) && overlayContent ? <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 text-white">{overlayContent}</div> : null}

        {captionText ? <p className="mt-3 text-center text-sm text-white/70">{captionText}</p> : null}

        {showMobileWarning ? <p className="mt-2 text-center text-xs text-white/50">Hover effect works on desktop.</p> : null}
      </div>
    </div>
  );
};

export default TiltedCard;
