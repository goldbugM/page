import React from "react";
import { BounceCards } from "./BounceCards";
import { GradientText } from "./GradientText";

export const FeaturedServicesSection = () => {
  const featuredServices = [
    {
      id: "aquafacial",
      title: "Aquafacial Behandlung",
      description: "Moderne Hydra-Dermabrasion für strahlende und gesunde Haut. Diese innovative Behandlung reinigt, peelt und hydratisiert Ihre Haut in einem einzigen Schritt.",
      image: "/images/Galllery_Treatment section images/Aquafacial Gallery.png",
      price: "89 €",
      duration: "60 Min.",
      rating: 5,
      category: "Gesichtsbehandlung",
      featured: true
    },
    {
      id: "microneedling",
      title: "Microneedling Anti-Aging",
      description: "Professionelle Microneedling-Behandlung zur Hauterneuerung und Faltenreduktion. Inklusive hochwertiger Wirkstoff-Ampulle und beruhigender Maske.",
      image: "/images/Galllery_Treatment section images/Microneedling Gallery.png",
      price: "99 €",
      duration: "60 Min.",
      rating: 5,
      category: "Anti-Aging",
      featured: true
    },
    {
      id: "braut-makeup",
      title: "Braut Make-up",
      description: "Perfektes Make-up für Ihren besonderen Tag. Individuell abgestimmt auf Ihren Typ und Ihre Wünsche für einen unvergesslichen Auftritt.",
      image: "/images/Galllery_Treatment section images/Makeup Gallery.png",
      price: "89 €",
      duration: "90 Min.",
      rating: 5,
      category: "Make-up",
      featured: true
    },
    {
      id: "gesichtsbehandlung",
      title: "Klassische Gesichtsbehandlung",
      description: "Individuelle Hautpflege nach Ihren Bedürfnissen. Tiefenreinigung, Peeling und intensive Pflege für alle Hauttypen.",
      image: "/images/Galllery_Treatment section images/Facial Treatment Gallery.webp",
      price: "65 €",
      duration: "60 Min.",
      rating: 4,
      category: "Hautpflege"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <GradientText 
                  className="beauty-title"
                  colors={["#FF69B4", "#FFB6C1", "#FF1493", "#FFB6C1", "#FF69B4"]}
                  animationSpeed={7}
                >
                  Unsere Top Services
                </GradientText>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Entdecken Sie unsere beliebtesten Beauty-Behandlungen. 
                Von innovativen Gesichtsbehandlungen bis hin zu perfektem Make-up - 
                wir bieten Ihnen erstklassige Pflege für Ihre natürliche Schönheit.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Professionelle Beratung</h3>
                  <p className="text-gray-600 text-sm">
                    Individuelle Hautanalyse und persönliche Behandlungsempfehlungen
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Hochwertige Produkte</h3>
                  <p className="text-gray-600 text-sm">
                    Verwendung von Premium-Kosmetikprodukten und modernster Technik
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Entspannte Atmosphäre</h3>
                  <p className="text-gray-600 text-sm">
                    Wohlfühl-Ambiente für Ihre persönliche Auszeit vom Alltag
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
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

          {/* Right: BounceCards */}
          <div className="flex justify-center">
            <BounceCards 
              cards={featuredServices}
              className="featured-services-cards"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
