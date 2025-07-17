import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", wordAnimationEnd],
    container: scrollContainerRef,
  });

  const { scrollYProgress: rotationProgress } = useScroll({
    target: containerRef,
    offset: ["start end", rotationEnd],
    container: scrollContainerRef,
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [baseOpacity, 1]);
  const rotateX = useTransform(rotationProgress, [0, 1], [baseRotation, 0]);

  const blur = enableBlur
    ? useTransform(scrollYProgress, [0, 1], [blurStrength, 0])
    : 0;

  return (
    <motion.h1
      ref={containerRef}
      className={`scroll-reveal-container ${containerClassName}`}
      style={{
        opacity,
        rotateX,
        filter: enableBlur ? `blur(${blur}px)` : undefined,
      }}
    >
      <span className={`scroll-reveal-text ${textClassName}`}>
        {splitText}
      </span>
    </motion.h1>
  );
};

export default ScrollReveal;
