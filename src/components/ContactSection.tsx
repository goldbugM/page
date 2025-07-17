import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  X,
  MapPin,
  Navigation,
  Car,
  Bus,
  Train
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BookingModal } from "./BookingModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeContent from "./FadeContent";
import BlurText from "../react-bits/BlurText";
import ShinyText from "../react-bits/ShinyText";
import { gsap } from "gsap";

// Magical Bento Effects for Contact Cards
const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 200;
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

const MagicalContactCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  enableEffects?: boolean;
}> = ({ children, className = "", enableEffects = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

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
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

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
      card.style.setProperty('--glow-intensity', '0.3');
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
        const distance = 30 + Math.random() * 20;
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;

        gsap.to(particle, {
          x: targetX - x,
          y: targetY - y,
          opacity: 0,
          scale: 0,
          duration: 0.6,
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

      // Cleanup timeouts
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [enableEffects]);

  return (
    <div
      ref={cardRef}
      className={`magical-contact-card ${className}`}
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

// Lazy Google Map Component
const LazyGoogleMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !mapLoaded) {
          setMapLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, [mapLoaded]);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div ref={mapRef} className="relative w-full h-full rounded-b-apple overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100">
      {!mapLoaded ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
          <div className="bg-white/80 backdrop-blur-sm rounded-apple p-6 shadow-lg border border-rose-200/50">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Karte wird geladen...</h4>
              <p className="text-white/90 text-sm mb-1">Luthmerstraße 22</p>
              <p className="text-white/90 text-sm">65934 Frankfurt am Main</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.123456789!2d8.663!3d50.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA2JzM2LjAiTiA4wrAzOSc0Ni44IkU!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hafidas Beautyroom Location - Luthmerstraße 22, Frankfurt am Main"
            className="rounded-b-apple"
            onLoad={handleMapLoad}
          ></iframe>
        </>
      )}
    </div>
  );
};

// Route Planning Modal Component
const RoutePlannerModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const address = "Luthmerstraße 22, 65934 Frankfurt am Main";

  if (!isOpen) return null;

  const routeOptions = [
    {
      name: "Google Maps",
      icon: Car,
      url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Apple Maps",
      icon: Navigation,
      url: `http://maps.apple.com/?daddr=${encodeURIComponent(address)}`,
      color: "from-gray-600 to-gray-700"
    },
    {
      name: "Waze",
      icon: Car,
      url: `https://waze.com/ul?q=${encodeURIComponent(address)}`,
      color: "from-blue-400 to-cyan-500"
    },
    {
      name: "Öffentliche Verkehrsmittel",
      icon: Bus,
      url: `https://www.rmv.de/c/de/auskunft/verbindungsauskunft/verbindungsauskunft?to=${encodeURIComponent(address)}`,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <MagicalContactCard className="bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl max-w-md w-full border border-white/30 shadow-2xl overflow-hidden">
        <div className="relative p-8">
          <div className="mb-8">
            <div className="flex items-center mb-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-gray-200/30">
              <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl mr-4 shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-lg tracking-wide">HAFIDAS BEAUTYROOM</p>
                <p className="text-base text-white/90 font-medium">{address}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-base text-white/90 mb-6 font-medium">Wählen Sie Ihren bevorzugten Kartendienst:</p>

            {routeOptions.map((option, index) => (
              <button
                key={option.name}
                onClick={() => {
                  window.open(option.url, '_blank');
                  onClose();
                }}
                className={`w-full flex items-center p-4 bg-gradient-to-r ${option.color} rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/20`}
              >
                <option.icon className="h-5 w-5 mr-3" />
                <span>{option.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            ✕
          </button>
        </div>
      </MagicalContactCard>
    </div>
  );
};





interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRoutePlannerOpen, setIsRoutePlannerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xdkdnyer', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        alert('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      alert('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20">
      <style>
        {`
          .magical-contact-card {
            position: relative;
            overflow: hidden;
          }

          .magical-contact-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(
              circle at var(--glow-x, 50%) var(--glow-y, 50%),
              rgba(var(--glow-color), calc(var(--glow-intensity, 0) * 0.1)) 0%,
              transparent 50%
            );
            pointer-events: none;
            z-index: 1;
            border-radius: inherit;
          }

          .magical-contact-card > * {
            position: relative;
            z-index: 2;
          }

          .magical-contact-card:hover {
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
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <ShinyText
              className="beauty-title"
              speed={6}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Kontakt
              </span>
            </ShinyText>
          </h2>
          <BlurText
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            animateBy="words"
            delay={100}
            threshold={0.2}
          >
            Haben Sie Fragen zu unseren Behandlungen oder möchten Sie einen Termin vereinbaren?
            Wir freuen uns auf Ihre Nachricht und beraten Sie gerne persönlich.
          </BlurText>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form */}
          <FadeContent blur={true} duration={800} delay={100} className="lg:col-span-2">
            <MagicalContactCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-2xl" />
              <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mb-6 shadow-lg shadow-accent/50 animate-pulse" />

              <h3 className="font-bold text-white mb-4 text-xl tracking-wide">NACHRICHT SENDEN</h3>

            {showSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Vielen Dank!</h4>
                <p className="text-white/90 mb-6">
                  Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.
                </p>
                <Button
                  onClick={() => setShowSuccess(false)}
                  className="bg-gradient-to-r from-primary to-accent text-white"
                >
                  Neue Nachricht
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name" className="text-base font-medium text-white">
                      Vollständiger Name *
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-email" className="text-base font-medium text-white">
                      E-Mail-Adresse *
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-phone" className="text-base font-medium text-white">
                    Telefonnummer
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-subject" className="text-base font-medium text-white">
                    Betreff *
                  </Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="mt-2"
                    placeholder="z.B. Frage zu Behandlungen, Terminanfrage..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message" className="text-base font-medium text-white">
                    Ihre Nachricht *
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-2"
                    rows={5}
                    placeholder="Teilen Sie uns mit, wie wir Ihnen helfen können..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="h-5 w-5 mr-2 animate-pulse" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Nachricht senden
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Hover Effect Line */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </MagicalContactCard>
        </FadeContent>

          {/* Comprehensive Contact & Location Card */}
          <FadeContent blur={true} duration={800} delay={400} className="space-y-6">
            {/* Quick Contact Info */}
            <MagicalContactCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-2xl" />
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mb-4 shadow-lg shadow-primary/50 animate-pulse" />

              <h3 className="font-bold text-white mb-4 text-lg tracking-wide">KONTAKT & ANFAHRT</h3>

              <div className="space-y-4">
                {/* Contact Methods */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                    <div className="text-white/90 text-sm">Terminvereinbarung</div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                    <div className="text-white/90 text-sm">h.aitaanan@gmail.com</div>
                  </div>
                </div>

                {/* Address & Hours Combined */}
                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-medium text-sm">Luthmerstraße 22</div>
                      <div className="text-white/80 text-sm">65934 Frankfurt am Main</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-4 w-4 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-white/90 text-xs space-y-0.5">
                      <div>Mo: 11:00-15:00 | Di-Fr: 13:00-18:00</div>
                      <div>Mi: 10:00-18:00 | Sa: 10:00-14:00</div>
                      <div className="text-accent font-medium">Termine nach Vereinbarung</div>
                    </div>
                  </div>
                </div>

                {/* Route Planning Button */}
                <Button
                  onClick={() => setIsRoutePlannerOpen(true)}
                  className="w-full bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 hover:shadow-lg text-sm border border-white/20"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Route planen
                </Button>
              </div>
            </MagicalContactCard>

            {/* Aligned Map */}
            <MagicalContactCard className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl overflow-hidden">
              <div className="h-72 relative">
                <LazyGoogleMap />
              </div>
            </MagicalContactCard>
          </FadeContent>
        </div>


      </div>

      {/* Route Planner Modal */}
      <RoutePlannerModal
        isOpen={isRoutePlannerOpen}
        onClose={() => setIsRoutePlannerOpen(false)}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};