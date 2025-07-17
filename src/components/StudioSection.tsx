import { useState, useRef, useEffect } from "react";
import FadeContent from "./FadeContent";
import BlurText from "../react-bits/BlurText";
import ShinyText from "../react-bits/ShinyText";
import { BookingModal } from "./BookingModal";
import Magnet from "../react-bits/Magnet";
import GlareHoverEffect from "../react-bits/GlareHover";
import ScrollReveal from "../react-bits/ScrollReveal";
import StarBorder from "../react-bits/StarBorder";
import { gsap } from "gsap";

// Enhanced Magical Bento Effects for Studio Cards (ContactSection-inspired)
const DEFAULT_PARTICLE_COUNT = 8; // Increased from 6 to 8
const DEFAULT_GLOW_COLOR = "219, 39, 119"; // Pink color matching the theme

const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const MagicalStudioCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  enableEffects?: boolean;
}> = ({ children, className = "", enableEffects = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!enableEffects || !cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Enhanced tilt effect (ContactSection-inspired)
      const rotateX = ((y - centerY) / centerY) * -5; // Increased from -3 to -5
      const rotateY = ((x - centerX) / centerX) * 5;  // Increased from 3 to 5

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.2,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Enhanced glow position (ContactSection-inspired)
      card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      card.style.setProperty('--glow-intensity', '0.3'); // Increased from 0.2 to 0.3
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      card.style.setProperty('--glow-intensity', '0');
    };

    const handleClick = (e: MouseEvent) => {
      if (!enableEffects) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create particles on click
      for (let i = 0; i < DEFAULT_PARTICLE_COUNT; i++) {
        const particle = createParticleElement(x, y, DEFAULT_GLOW_COLOR);
        card.appendChild(particle);
        particlesRef.current.push(particle);

        const angle = (i / DEFAULT_PARTICLE_COUNT) * Math.PI * 2;
        const distance = 30 + Math.random() * 20; // Enhanced distance (ContactSection-inspired)
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;

        gsap.to(particle, {
          x: targetX - x,
          y: targetY - y,
          opacity: 0,
          scale: 0,
          duration: 0.6, // Increased from 0.5 to 0.6
          ease: "power2.out",
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
            const index = particlesRef.current.indexOf(particle);
            if (index > -1) {
              particlesRef.current.splice(index, 1);
            }
          },
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClick);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClick);

      // Cleanup particles
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
    };
  }, [enableEffects]);

  return (
    <div
      ref={cardRef}
      className={`magical-studio-card ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-intensity': '0',
        '--glow-color': DEFAULT_GLOW_COLOR,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export const StudioSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section id="studio" className="py-16">
      <style>
        {`
          .magical-studio-card {
            position: relative;
            overflow: hidden;
          }

          .magical-studio-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(
              circle at var(--glow-x, 50%) var(--glow-y, 50%),
              rgba(var(--glow-color), calc(var(--glow-intensity, 0) * 0.08)) 0%,
              transparent 50%
            );
            pointer-events: none;
            z-index: 1;
            border-radius: inherit;
          }

          .magical-studio-card > * {
            position: relative;
            z-index: 2;
          }

          .magical-studio-card:hover {
            box-shadow:
              0 0 20px rgba(var(--glow-color), 0.1),
              0 8px 32px rgba(0, 0, 0, 0.12);
          }

          .particle {
            animation: particle-float 0.6s ease-out forwards;
          }

          @keyframes particle-float {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0);
            }
          }
        `}
      </style>
      <div className="container mx-auto px-4">
        {/* Enhanced Header (ContactSection-inspired) */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <ShinyText
              className="beauty-title"
              speed={6}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Über Hafida
              </span>
            </ShinyText>
          </h2>
          <BlurText
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            animateBy="words"
            delay={100}
            threshold={0.2}
          >
            Ihre persönliche Beauty-Expertin mit Leidenschaft für natürliche Schönheit
          </BlurText>
        </div>

        {/* Enhanced Biography Content (ContactSection-inspired) */}
        <div className="max-w-6xl mx-auto">
          {/* Main Biography Layout */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Side - Enhanced Stacked Cards */}
            <FadeContent blur={true} duration={800} delay={100} className="lg:col-span-2 flex flex-col justify-between h-full">
              {/* Enhanced Expertise Card 1 */}
              <MagicalStudioCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 overflow-hidden text-left flex flex-col justify-center mb-3">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-xl" />
                <h4 className="font-bold text-white mb-2 text-base tracking-wide">AUSBILDUNG & ZERTIFIKATE</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Staatlich geprüfte Kosmetikerin mit kontinuierlicher Weiterbildung
                </p>
                {/* Enhanced Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500" />
              </MagicalStudioCard>

              {/* Enhanced Expertise Card 2 */}
              <MagicalStudioCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20 overflow-hidden text-left flex flex-col justify-center mb-3">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-accent/30 to-transparent rounded-tr-xl" />
                <h4 className="font-bold text-white mb-2 text-base tracking-wide">SPEZIALISIERUNGEN</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Aquafacial, Anti-Aging, Problemhaut & Make-up
                </p>
                {/* Enhanced Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </MagicalStudioCard>

              {/* Enhanced Expertise Card 3 */}
              <MagicalStudioCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/20 overflow-hidden text-left flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-secondary/30 to-transparent rounded-bl-xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-xl" />
                <h4 className="font-bold text-white mb-2 text-base tracking-wide">PHILOSOPHIE</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Natürliche Schönheit durch individuelle Pflege
                </p>
                {/* Enhanced Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
              </MagicalStudioCard>


            </FadeContent>

            {/* Enhanced Biography Content - Right Side */}
            <FadeContent blur={true} duration={800} delay={400} className="lg:col-span-3">
              <MagicalStudioCard className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm overflow-hidden">
                {/* Enhanced Corner Accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-2xl" />
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-gray-800 mb-4 text-xl">Meine Leidenschaft</h4>
                  <p className="text-black leading-relaxed text-lg">
                    Willkommen bei Hafidas Beautyroom! Als leidenschaftliche Kosmetikerin mit über 8 Jahren Erfahrung
                    habe ich meine Berufung in der individuellen Hautpflege gefunden. Jede Haut ist einzigartig -
                    und genau das macht meine Arbeit so besonders.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-4 text-xl">Mein Ansatz</h4>
                  <p className="text-black leading-relaxed text-lg">
                    In meinem Studio in der Luthmerstraße verbinde ich modernste Technologie mit persönlicher Beratung.
                    Von Aquafacial-Treatments bis hin zu typgerechtem Make-up - jede Behandlung wird individuell
                    auf Ihren Hauttyp und Ihre Wünsche abgestimmt.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-4 text-xl">Meine Mission</h4>
                  <p className="text-black leading-relaxed text-lg">
                    Mein Ziel ist es, Ihre natürliche Schönheit zu unterstreichen und Ihnen das Gefühl zu geben,
                    sich in Ihrer Haut rundum wohlzufühlen. Dabei arbeite ich ausschließlich mit hochwertigen,
                    dermatologisch getesteten Produkten.
                  </p>
                </div>
                {/* Enhanced Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
              </MagicalStudioCard>
            </FadeContent>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
