import React, { useState, useRef, useEffect } from 'react';
import './TrueFocus.css';

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  children?: React.ReactNode;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#E91E63",
  glowColor = "rgba(233, 30, 99, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  children,
}) => {
  const displayText = children ? children.toString() : sentence;
  const words = displayText.split(" ");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]> = useRef([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const updateFocusRect = (index: number) => {
    const wordElement = wordRefs.current[index];
    const containerElement = containerRef.current;
    if (wordElement && containerElement) {
      const wordRect = wordElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();
      setFocusRect({
        x: wordRect.left - containerRect.left,
        y: wordRect.top - containerRect.top,
        width: wordRect.width,
        height: wordRect.height,
      });
    }
  };

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % words.length;
          updateFocusRect(nextIndex);
          return nextIndex;
        });
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [words.length, manualMode, animationDuration, pauseBetweenAnimations]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(currentIndex);
      setCurrentIndex(index);
      updateFocusRect(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
      updateFocusRect(lastActiveIndex);
      setLastActiveIndex(null);
    }
  };

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              if (el) {
                wordRefs.current[index] = el;
              }
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${
              isActive && !manualMode ? "active" : ""
            }`}
            style={
              {
                filter: manualMode
                  ? isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`
                  : isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}
      
      {!manualMode && (
        <div
          className="focus-border"
          style={{
            left: `${focusRect.x}px`,
            top: `${focusRect.y}px`,
            width: `${focusRect.width}px`,
            height: `${focusRect.height}px`,
            borderColor: borderColor,
            boxShadow: `0 0 20px ${glowColor}`,
            transition: `all ${animationDuration}s ease`,
          }}
        />
      )}
    </div>
  );
};

export default TrueFocus;
