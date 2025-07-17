import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import FadeContent from "./FadeContent";
import BlurText from "../react-bits/BlurText";
import ShinyText from "../react-bits/ShinyText";
import GlareHoverEffect from "../react-bits/GlareHover";
import Magnet from "../react-bits/Magnet";

export const AboutSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);



  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text Content - Left Side */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
              <ShinyText
                className="beauty-title"
                speed={7}
              >
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Über Hafidas Beautyroom
                </span>
              </ShinyText>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Willkommen bei Hafidas Beautyroom - Ihrer persönlichen Beauty-Auszeit im Herzen von Frankfurt!
                Als leidenschaftliche Kosmetikerin mit über 8 Jahren Erfahrung bin ich spezialisiert auf
                individuelle Hautpflege, professionelles Make-up und persönliche Beratung, die Ihre natürliche
                Schönheit unterstreicht.
              </p>
              <p>
                Mein Studio in der Luthmerstraße bietet Ihnen eine ruhige, professionelle Atmosphäre für
                Ihre Behandlungen. Von revitalisierenden Aquafacial-Treatments über klassische Gesichtsbehandlungen
                bis hin zu typgerechtem Make-up für besondere Anlässe - jede Behandlung wird individuell auf
                Ihren Hauttyp und Ihre Bedürfnisse abgestimmt.
              </p>
              <p>
                Ich arbeite ausschließlich mit hochwertigen, dermatologisch getesteten Produkten und modernster
                Technologie. Dabei lege ich besonderen Wert auf eine ausführliche Hautanalyse und persönliche
                Beratung, damit Sie auch zu Hause die optimale Pflege für Ihre Haut fortsetzen können.
              </p>
              <p>
                Ob entspannende Wellness-Behandlung, intensives Anti-Aging-Programm oder Ihr persönlicher
                Schminkkurs - ich freue mich darauf, Sie in meinem Studio begrüßen zu dürfen und gemeinsam
                mit Ihnen Ihre individuellen Beauty-Ziele zu erreichen.
              </p>
            </div>
            <div className="mt-8">
              <Magnet
                padding={80}
                magnetStrength={3}
                activeTransition="transform 0.2s ease-out"
                inactiveTransition="transform 0.4s ease-in-out"
              >
                <GlareHoverEffect
                  background="linear-gradient(135deg, #E91E63, #EC407A)"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  borderRadius="12px"
                  glareColor="#ffffff"
                  glareOpacity={0.7}
                  glareAngle={-45}
                  glareSize={200}
                  transitionDuration={600}
                  className="beauty-button"
                >
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-transparent text-white font-semibold px-8 py-3 text-base tracking-wide transition-all duration-300 relative z-10"
                  >
                    Termin vereinbaren
                  </button>
                </GlareHoverEffect>
              </Magnet>
            </div>
          </div>

          {/* Futuristic Studio Features - Right Side */}
          <div className="relative">
            {/* Futuristic Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative grid grid-cols-1 gap-4">
              <FadeContent blur={true} duration={800} delay={200} className="h-full">
                <div className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
                  {/* Futuristic Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-2xl" />

                  {/* Glowing Dot */}
                  <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mb-4 shadow-lg shadow-accent/50 animate-pulse" />

                  <h4 className="font-bold text-white mb-3 text-lg tracking-wide">
                    MODERNE AUSSTATTUNG
                  </h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Neueste Technologie für Aquafacial, Microneedling und professionelle Hautanalyse
                    in hygienisch einwandfreier Umgebung.
                  </p>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500" />
                </div>
              </FadeContent>

              <FadeContent blur={true} duration={800} delay={400} className="h-full">
                <div className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-2xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-accent/30 to-transparent rounded-tr-2xl" />

                  <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mb-4 shadow-lg shadow-primary/50 animate-pulse" style={{ animationDelay: '0.5s' }} />

                  <h4 className="font-bold text-white mb-3 text-lg tracking-wide">
                    INDIVIDUELLE BERATUNG
                  </h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Ausführliche Hautanalyse und persönliche Pflegeberatung für optimale
                    Ergebnisse und langfristige Hautgesundheit.
                  </p>

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
                </div>
              </FadeContent>

              <FadeContent blur={true} duration={800} delay={600} className="h-full">
                <div className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-secondary/30 to-transparent rounded-tr-2xl" />

                  <div className="w-3 h-3 bg-gradient-to-r from-secondary to-accent rounded-full mb-4 shadow-lg shadow-secondary/50 animate-pulse" style={{ animationDelay: '1s' }} />

                  <h4 className="font-bold text-white mb-3 text-lg tracking-wide">
                    ZENTRALE LAGE
                  </h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Verkehrsgünstig gelegen in Frankfurt mit guter Anbindung an öffentliche
                    Verkehrsmittel und Parkmöglichkeiten.
                  </p>

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-500" />
                </div>
              </FadeContent>

              <FadeContent blur={true} duration={800} delay={800} className="h-full">
                <div className="group relative bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-secondary/30 to-transparent rounded-bl-2xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-2xl" />

                  <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 shadow-lg shadow-primary/50 animate-pulse" style={{ animationDelay: '1.5s' }} />

                  <h4 className="font-bold text-white mb-3 text-lg tracking-wide">
                    FLEXIBLE TERMINE
                  </h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Termine auch außerhalb der regulären Öffnungszeiten nach Vereinbarung
                    für Ihre optimale Terminplanung.
                  </p>

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
                </div>
              </FadeContent>
            </div>
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