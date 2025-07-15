import React, { useRef, useEffect } from "react";
import "./AuroraBackground.css";

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  colors?: string[];
  intensity?: number;
  speed?: number;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className = "",
  children,
  colors = [
    "rgba(255, 182, 193, 0.3)", // Light pink
    "rgba(255, 105, 135, 0.2)", // Medium pink  
    "rgba(255, 20, 147, 0.1)",  // Deep pink
    "rgba(255, 182, 193, 0.2)"  // Light pink again
  ],
  intensity = 0.5,
  speed = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const waves: Array<{
      amplitude: number;
      frequency: number;
      phase: number;
      color: string;
      opacity: number;
    }> = [];

    // Initialize waves
    for (let i = 0; i < colors.length; i++) {
      waves.push({
        amplitude: (Math.random() * 100 + 50) * intensity,
        frequency: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: colors[i],
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawWave = (wave: typeof waves[0], yOffset: number) => {
      const { amplitude, frequency, phase, color, opacity } = wave;
      
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / window.devicePixelRatio);

      for (let x = 0; x <= canvas.width / window.devicePixelRatio; x += 2) {
        const y = yOffset + 
          Math.sin(x * frequency + phase + time * speed) * amplitude +
          Math.sin(x * frequency * 2 + phase + time * speed * 1.5) * amplitude * 0.5;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      ctx.lineTo(0, canvas.height / window.devicePixelRatio);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / window.devicePixelRatio);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = opacity;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      waves.forEach((wave, index) => {
        const yOffset = (canvas.height / window.devicePixelRatio) * 0.3 + index * 20;
        drawWave(wave, yOffset);
      });

      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [colors, intensity, speed]);

  return (
    <div className={`aurora-background ${className}`}>
      <canvas
        ref={canvasRef}
        className="aurora-canvas"
      />
      <div className="aurora-content">
        {children}
      </div>
    </div>
  );
};
