import React, { useRef, useEffect } from "react";
import "./SpotlightCard.css";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  hoverOpacity?: number;
  animationDuration?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 182, 193, 0.15)", // Soft pink for beauty spa
  spotlightSize = 300,
  hoverOpacity = 0.8,
  animationDuration = "0.5s"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
      card.style.setProperty('--spotlight-color', spotlightColor);
      card.style.setProperty('--spotlight-size', `${spotlightSize}px`);
      card.style.setProperty('--hover-opacity', hoverOpacity.toString());
      card.style.setProperty('--animation-duration', animationDuration);
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [spotlightColor, spotlightSize, hoverOpacity, animationDuration]);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
};
