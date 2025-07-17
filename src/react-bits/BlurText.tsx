import { motion, Transition } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  children?: React.ReactNode;
};

const defaultAnimationFrom = {
  filter: 'blur(10px)',
  opacity: 0,
  y: 20,
};

const defaultAnimationTo = [
  {
    filter: 'blur(5px)',
    opacity: 0.5,
    y: 10,
  },
  {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
  },
];

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  children,
}) => {
  const displayText = children ? children.toString() : text;
  const elements = animateBy === 'words' ? displayText.split(' ') : displayText.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const animationVariants = useMemo(() => {
    const from = animationFrom || defaultAnimationFrom;
    const to = animationTo || defaultAnimationTo;
    
    return {
      initial: from,
      animate: to[to.length - 1],
    };
  }, [animationFrom, animationTo]);

  const transition: Transition = {
    duration: stepDuration,
    ease: 'easeOut',
  };

  return (
    <p ref={ref} className={className}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={animationVariants.initial}
          animate={inView ? animationVariants.animate : animationVariants.initial}
          transition={{
            ...transition,
            delay: inView ? (index * delay) / 1000 : 0,
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
          style={{ display: 'inline-block' }}
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
