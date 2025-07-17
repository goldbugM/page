import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { serviceDetails } from "../data/serviceDetails";
import { SpotlightCard } from "./SpotlightCard";
import { GlareHover } from "./GlareHover";
import { GradientText } from "./GradientText";
import { MasonryGallery } from "./MasonryGallery";
import BlurText from "../react-bits/BlurText";
import ShinyText from "../react-bits/ShinyText";
import GlareHoverEffect from "../react-bits/GlareHover";
import Magnet from "../react-bits/Magnet";
import RotatingText from "../react-bits/RotatingText";
import CountUp from "../react-bits/CountUp";

export const TreatmentsSection = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openServiceModal = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  // Gallery items for Meine Spezialisierungen
  const galleryItems = [
    {
      id: "aquafacial",
      src: "/images/Galllery_Treatment section images/Aquafacial Gallery.png",
      alt: "Aquafacial Behandlung - Moderne Hydra-Dermabrasion",
      title: "Aquafacial Behandlung",
      category: "Gesichtsbehandlung",
      description: "Moderne Hydra-Dermabrasion für strahlende Haut",
      height: 260,
      serviceId: "aquafacial"
    },
    {
      id: "microneedling",
      src: "/images/Galllery_Treatment section images/Microneedling Gallery.png",
      alt: "Microneedling Anti-Aging Behandlung",
      title: "Microneedling",
      category: "Anti-Aging",
      description: "Professionelle Hauterneuerung und Faltenreduktion",
      height: 290,
      serviceId: "microneedling"
    },
    {
      id: "gesichtsbehandlung",
      src: "/images/Galllery_Treatment section images/Facial Treatment Gallery.webp",
      alt: "Klassische Gesichtsbehandlung",
      title: "Gesichtsbehandlung",
      category: "Hautpflege",
      description: "Individuelle Hautpflege nach Ihren Bedürfnissen",
      height: 240,
      serviceId: "gesichtsbehandlungen"
    },
    {
      id: "makeup",
      src: "/images/Galllery_Treatment section images/Makeup Gallery.png",
      alt: "Professionelles Make-up",
      title: "Make-up",
      category: "Make-up",
      description: "Perfektes Make-up für jeden Anlass",
      height: 280,
      serviceId: "makeup"
    },
    {
      id: "hautberatung",
      src: "/images/Galllery_Treatment section images/Skin Consultation Gallery.png",
      alt: "Hautanalyse und Beratung",
      title: "Hautberatung",
      category: "Beratung",
      description: "Professionelle Hautanalyse mit Pflegeempfehlungen",
      height: 250,
      serviceId: "hautpflege"
    },
    {
      id: "schminkkurs",
      src: "/images/Galllery_Treatment section images/Makeup Course Gallery.png",
      alt: "Schminkkurs - Lernen Sie professionelle Techniken",
      title: "Schminkkurs",
      category: "Kurse",
      description: "Lernen Sie professionelle Schminktechniken",
      height: 270,
      serviceId: "schminkkurse"
    }
  ];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      id: "aquafacial",
      title: "Aquafacial Behandlung",
      image: "/images/hero_section/aquafacial tretment.png",
      link: "contact"
    },
    {
      id: "gesichtsbehandlungen",
      title: "Gesichtsbehandlungen",
      image: "/images/hero_section/Facial Treatments.png",
      link: "contact"
    },
    {
      id: "microneedling",
      title: "Microneedling",
      image: "/images/hero_section/Microneedeling.png",
      link: "contact"
    },
    {
      id: "makeup",
      title: "Make-up & Styling",
      image: "/images/hero_section/Professional Makeup.png",
      link: "contact"
    },
    {
      id: "schminkkurse",
      title: "Schminkkurse",
      image: "/images/hero_section/Makeup Courses.png",
      link: "contact"
    },
    {
      id: "hautpflege",
      title: "Hautpflege & Beratung",
      image: "/images/hero_section/Skin Consultation.png",
      link: "contact"
    }
  ];

  return (
    <section id="treatments" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            <ShinyText
              className="beauty-title"
              speed={8}
            >
              <GradientText
                className="beauty-title"
                colors={["#E91E63", "#F06292", "#FFB6C1", "#F8BBD9", "#F5DEB3", "#DEB887"]}
                animationSpeed={6}
              >
                Kosmetikstudio Hafidas Beautyroom in Frankfurt
              </GradientText>
            </ShinyText>
          </h2>
          <div className="max-w-4xl mx-auto">
            <BlurText
              className="text-lg leading-relaxed mb-8 text-black font-medium"
              animateBy="words"
              delay={100}
              threshold={0.2}
            >
              Willkommen bei Hafidas Beautyroom - Ihrer persönlichen Beauty-Auszeit! Ich bin leidenschaftliche Kosmetikerin mit Herz und Seele, spezialisiert auf Hautpflege, Make-up und individuelle Beratung.
            </BlurText>

          </div>
        </div>

        {/* Meine Spezialisierungen Gallery */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">
              <ShinyText
                className="beauty-subtitle"
                speed={6}
              >
                <GradientText
                  className="beauty-title"
                  colors={["#E91E63", "#F06292", "#FFB6C1", "#F8BBD9", "#F5DEB3", "#DEB887"]}
                  animationSpeed={8}
                >
                  Meine Spezialisierungen
                </GradientText>
              </ShinyText>
            </h3>
            <BlurText
              className="text-lg leading-relaxed max-w-3xl mx-auto text-black font-medium"
              animateBy="words"
              delay={80}
              threshold={0.3}
            >
              Schauen Sie sich meine Behandlungsvielfalt an und finden Sie die perfekte Pflege für Ihre Bedürfnisse.
              Jede Behandlung wird individuell auf Sie abgestimmt.
            </BlurText>
          </div>

          {/* Masonry Gallery */}
          <div className="max-w-6xl mx-auto">
            <MasonryGallery
              items={galleryItems}
              columns={[1, 2, 3, 4]}
              gap={10}
              className="beauty-gallery"
              onServiceClick={openServiceModal}
            />
          </div>

          {/* Enhanced Commercial CTA Section */}
          <div className="text-center mt-16 mb-8">
            {/* Dynamic Rotating Text */}
            <div className="mb-6">
              <RotatingText
                texts={[
                  "Interessiert an einer unserer Behandlungen?",
                  "Bereit für Ihre Beauty-Transformation?",
                  "Möchten Sie sich verwöhnen lassen?",
                  "Zeit für professionelle Hautpflege?"
                ]}
                className="beauty-cta text-lg text-gray-600"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              />
            </div>

            {/* Statistics Row */}
            <div className="flex justify-center items-center gap-8 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <CountUp to={500} duration={2} className="font-semibold text-primary" />
                <span>+ zufriedene Kunden</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <CountUp to={8} duration={1.5} className="font-semibold text-accent" />
                <span>Jahre Erfahrung</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <CountUp to={15} duration={1.8} className="font-semibold text-secondary" />
                <span>+ Behandlungen</span>
              </div>
            </div>

            {/* Enhanced Button with Magnet and Glare Effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-transparent text-white font-semibold px-8 py-3 text-base tracking-wide transition-all duration-300 relative z-10"
                  >
                    Beratungstermin vereinbaren
                  </button>
                </GlareHoverEffect>
              </Magnet>
            </div>

            {/* Subtle Call-to-Action Text */}
            <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto">
              Kostenlose Beratung • Individuelle Behandlungspläne • Professionelle Hautanalyse
            </p>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService ? serviceDetails[selectedService as keyof typeof serviceDetails] : null}
        isOpen={isModalOpen}
        onClose={closeServiceModal}
      />
    </section>
  );
};