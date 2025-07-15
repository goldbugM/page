import React, { useRef, useEffect } from "react";
import "./GlareHover.css";

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  border?: string;
  glareColor?: string;
  glareDuration?: string;
  glareSize?: string;
  playOnce?: boolean;
}

export const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  className = "",
  width = "auto",
  height = "auto",
  background = "linear-gradient(145deg, rgba(255, 182, 193, 0.9), rgba(255, 105, 135, 0.9))",
  borderRadius = "0.75rem",
  border = "1px solid rgba(255, 182, 193, 0.3)",
  glareColor = "rgba(255, 255, 255, 0.6)",
  glareDuration = "0.6s",
  glareSize = "150% 150%",
  playOnce = false
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set CSS custom properties
    element.style.setProperty('--gh-width', width);
    element.style.setProperty('--gh-height', height);
    element.style.setProperty('--gh-bg', background);
    element.style.setProperty('--gh-br', borderRadius);
    element.style.setProperty('--gh-border', border);
    element.style.setProperty('--gh-rgba', glareColor);
    element.style.setProperty('--gh-duration', glareDuration);
    element.style.setProperty('--gh-size', glareSize);
    element.style.setProperty('--gh-angle', '135deg');
  }, [width, height, background, borderRadius, border, glareColor, glareDuration, glareSize]);

  return (
    <div
      ref={elementRef}
      className={`glare-hover ${playOnce ? 'glare-hover--play-once' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
