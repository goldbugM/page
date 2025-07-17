import React, { useState } from "react";
import { MasonryGallery } from "./MasonryGallery";
import { GradientText } from "./GradientText";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { serviceDetails } from "../data/serviceDetails";

export const GallerySection = () => {
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

  // Meine Spezialisierungen - basierend auf den tatsächlichen Services
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

  return (
    <section id="gallery" className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <GradientText
              className="beauty-title"
              colors={["#E91E63", "#F06292", "#FFB6C1", "#F8BBD9", "#F5DEB3", "#DEB887"]}
              animationSpeed={8}
            >
              Meine Spezialisierungen
            </GradientText>
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-black font-medium">
            Entdecken Sie meine Spezialisierungen im Bereich professioneller Kosmetikbehandlungen.
            Von innovativen Gesichtsbehandlungen bis hin zu perfektem Make-up -
            ich biete Ihnen erstklassige Pflege für Ihre natürliche Schönheit.
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
              className="bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 text-white hover:shadow-lg px-8 py-3 rounded-apple text-apple-headline transition-all duration-300 hover:-translate-y-1 border border-white/30"
            >
              Beratungstermin vereinbaren
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('treatments');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-white/50 text-white hover:bg-white/20 hover:text-white px-8 py-3 rounded-apple text-apple-headline transition-all duration-300 hover:-translate-y-1 bg-white/10"
            >
              Alle Services ansehen
            </button>
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
