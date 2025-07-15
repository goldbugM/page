import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { serviceDetails } from "../data/serviceDetails";
import { SpotlightCard } from "./SpotlightCard";
import { GlareHover } from "./GlareHover";
import { GradientText } from "./GradientText";
import { MasonryGallery } from "./MasonryGallery";

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
      src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Aquafacial Behandlung - Moderne Hydra-Dermabrasion",
      title: "Aquafacial Behandlung",
      category: "Gesichtsbehandlung",
      description: "Moderne Hydra-Dermabrasion für strahlende Haut",
      height: 260,
      serviceId: "aquafacial"
    },
    {
      id: "microneedling",
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Microneedling Anti-Aging Behandlung",
      title: "Microneedling",
      category: "Anti-Aging",
      description: "Professionelle Hauterneuerung und Faltenreduktion",
      height: 290,
      serviceId: "microneedling"
    },
    {
      id: "gesichtsbehandlung",
      src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Klassische Gesichtsbehandlung",
      title: "Gesichtsbehandlung",
      category: "Hautpflege",
      description: "Individuelle Hautpflege nach Ihren Bedürfnissen",
      height: 240,
      serviceId: "gesichtsbehandlungen"
    },
    {
      id: "makeup",
      src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Professionelles Make-up",
      title: "Make-up",
      category: "Make-up",
      description: "Perfektes Make-up für jeden Anlass",
      height: 280,
      serviceId: "makeup"
    },
    {
      id: "hautberatung",
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Hautanalyse und Beratung",
      title: "Hautberatung",
      category: "Beratung",
      description: "Professionelle Hautanalyse mit Pflegeempfehlungen",
      height: 250,
      serviceId: "hautpflege"
    },
    {
      id: "schminkkurs",
      src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      link: "contact"
    },
    {
      id: "gesichtsbehandlungen",
      title: "Gesichtsbehandlungen",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      link: "contact"
    },
    {
      id: "microneedling",
      title: "Microneedling",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      link: "contact"
    },
    {
      id: "makeup",
      title: "Make-up & Styling",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      link: "contact"
    },
    {
      id: "schminkkurse",
      title: "Schminkkurse",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      link: "contact"
    },
    {
      id: "hautpflege",
      title: "Hautpflege & Beratung",
      image: "https://images.unsplash.com/photo-1594824804732-ca8db7d1457c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      link: "contact"
    }
  ];

  return (
    <section id="treatments" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            <GradientText
              className="beauty-title"
              colors={["#E91E63", "#EC407A", "#F06292", "#F8BBD9", "#F5DEB3", "#DEB887"]}
              animationSpeed={6}
            >
              Kosmetikstudio Hafidas Beautyroom in Frankfurt
            </GradientText>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed mb-8 text-black font-medium">
              Willkommen bei Hafidas Beautyroom - Ihrer persönlichen Beauty-Auszeit! Ich bin leidenschaftliche Kosmetikerin mit Herz und Seele, spezialisiert auf Hautpflege, Make-up und individuelle Beratung.
            </p>

          </div>
        </div>

        {/* Meine Spezialisierungen Gallery */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">
              <GradientText
                className="beauty-title"
                colors={["#E91E63", "#EC407A", "#F06292", "#F8BBD9", "#F5DEB3", "#DEB887"]}
                animationSpeed={8}
              >
                Meine Spezialisierungen
              </GradientText>
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto text-black font-medium">
              Schauen Sie sich meine Behandlungsvielfalt an und finden Sie die perfekte Pflege für Ihre Bedürfnisse.
              Jede Behandlung wird individuell auf Sie abgestimmt.
            </p>
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

          {/* Call to Action */}
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 mb-6">
              Interessiert an einer unserer Behandlungen?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg px-8 py-3 rounded-apple text-apple-headline transition-all duration-300 hover:-translate-y-1"
              >
                Beratungstermin vereinbaren
              </button>
            </div>
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