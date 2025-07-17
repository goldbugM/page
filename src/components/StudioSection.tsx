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

// Magical Bento Effects for Studio Cards
const DEFAULT_PARTICLE_COUNT = 6;
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

      // Subtle tilt effect
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.2,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Update glow position
      card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      card.style.setProperty('--glow-intensity', '0.2');
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
        const distance = 20 + Math.random() * 15;
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;

        gsap.to(particle, {
          x: targetX - x,
          y: targetY - y,
          opacity: 0,
          scale: 0,
          duration: 0.5,
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
    <section id="studio" className="py-16 bg-white">
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
              0 0 15px rgba(var(--glow-color), 0.08),
              0 6px 25px rgba(0, 0, 0, 0.1);
          }

          .particle {
            animation: particle-float 0.5s ease-out forwards;
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
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Über Hafida
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ihre persönliche Beauty-Expertin mit Leidenschaft für natürliche Schönheit
          </p>
        </div>

        {/* Biography Content */}
        <div className="max-w-6xl mx-auto">
          {/* Main Biography Layout */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Side - Stacked Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Expertise Card 1 */}
              <MagicalStudioCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl" />
                <div className="w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full mb-4 mx-auto shadow-lg shadow-accent/50 animate-pulse" />
                <h4 className="font-bold text-white mb-3 text-lg tracking-wide">AUSBILDUNG & ZERTIFIKATE</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Staatlich geprüfte Kosmetikerin mit kontinuierlicher Weiterbildung
                </p>
              </MagicalStudioCard>

              {/* Expertise Card 2 */}
              <MagicalStudioCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-2xl" />
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mb-4 mx-auto shadow-lg shadow-primary/50 animate-pulse" />
                <h4 className="font-bold text-white mb-3 text-lg tracking-wide">SPEZIALISIERUNGEN</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Aquafacial, Anti-Aging, Problemhaut & Make-up
                </p>
              </MagicalStudioCard>

              {/* Expertise Card 3 */}
              <MagicalStudioCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20 overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-secondary/30 to-transparent rounded-bl-2xl" />
                <div className="w-2 h-2 bg-gradient-to-r from-secondary to-primary rounded-full mb-4 mx-auto shadow-lg shadow-secondary/50 animate-pulse" />
                <h4 className="font-bold text-white mb-3 text-lg tracking-wide">PHILOSOPHIE</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Natürliche Schönheit durch individuelle Pflege
                </p>
              </MagicalStudioCard>

              {/* Call to Action Button */}
              <Magnet wrapperClassName="w-full block">
                <div className="relative w-full">
                  {/* Shape Blur Effects */}
                  <div className="absolute -inset-4 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                    <div className="absolute top-0 left-1/4 w-8 h-8 bg-pink-400 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s' }} />
                    <div className="absolute bottom-0 right-1/4 w-6 h-6 bg-rose-400 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-0 w-4 h-4 bg-pink-300 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/4 right-0 w-5 h-5 bg-rose-300 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }} />
                  </div>

                  <GlareHoverEffect
                    className="w-full relative z-10"
                    glareColor="rgba(255, 255, 255, 0.4)"
                    duration="2s"
                  >
                    <button
                      className="group relative bg-gradient-to-br from-pink-400 to-rose-400 backdrop-blur-md rounded-2xl p-8 border border-pink-200/40 hover:border-pink-200/70 transition-all duration-700 hover:shadow-2xl hover:shadow-pink-400/30 hover:shadow-rose-400/20 overflow-hidden text-center cursor-pointer w-full hover:scale-[1.02] hover:-translate-y-1 transform-gpu min-h-[130px] flex flex-col justify-center"
                      onClick={() => setIsBookingModalOpen(true)}
                    >
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-300/40 to-transparent rounded-bl-2xl group-hover:from-pink-300/60 transition-all duration-500" />

                    {/* Animated Pulse Dot */}
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full mb-4 mx-auto shadow-lg shadow-pink-300/50 animate-pulse group-hover:shadow-pink-300/70 group-hover:scale-110 transition-all duration-300" />

                    {/* Content */}
                    <h4 className="font-bold text-white mb-3 text-lg tracking-wide group-hover:text-white/95 transition-colors duration-300">TERMIN VEREINBAREN</h4>
                    <p className="text-white/90 text-sm leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                      Jetzt Ihren persönlichen Behandlungstermin buchen
                    </p>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-pink-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  </button>
                </GlareHoverEffect>
                </div>
              </Magnet>
            </div>

            {/* Biography Content - Right Side */}
            <MagicalStudioCard className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
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
              </div>
            </MagicalStudioCard>
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
