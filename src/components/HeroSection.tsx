import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { serviceDetails } from "../data/serviceDetails";
import { GradientText } from "./GradientText";
import { useIsMobile } from "../hooks/use-mobile";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  // Function to add hyphenation for mobile
  const formatTitleForMobile = (title: string) => {
    if (!isMobile) return title;

    // Add soft hyphens for German word breaks
    return title
      .replace(/Gesichtsbehandlungen/g, 'Gesichts&shy;behandlungen')
      .replace(/Gesichtsbehandlung/g, 'Gesichts&shy;behandlung');
  };

  const openServiceModal = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const services = [
    {
      id: "aquafacial",
      title: "Aquafacial Behandlung",
      subtitle: "HAFIDAS BEAUTYROOM",
      description: "Moderne Aquafacial-Treatments für strahlende Haut",
      image: "/images/hero_section/aquafacial%20tretment.png",
      link: "treatments"
    },
    {
      id: "microneedling",
      title: "Microneedling",
      subtitle: "HAFIDAS BEAUTYROOM",
      description: "Professionelle Hauterneuerung und Faltenreduktion",
      image: "/images/hero_section/Microneedeling.png",
      link: "treatments"
    },
    {
      id: "gesichtsbehandlungen",
      title: "Gesichtsbehandlungen",
      subtitle: "HAFIDAS BEAUTYROOM",
      description: "Professionelle Gesichtsbehandlungen für jeden Hauttyp",
      image: "/images/hero_section/Facial%20Treatments.png",
      link: "treatments"
    },
    {
      id: "makeup",
      title: "Make-up & Styling",
      subtitle: "HAFIDAS BEAUTYROOM",
      description: "Typgerechtes Make-up und persönliche Beratung",
      image: "/images/hero_section/Professional%20Makeup.png",
      link: "treatments"
    },
    {
      id: "hautberatung",
      title: "Hautberatung",
      subtitle: "HAFIDAS BEAUTYROOM",
      description: "Professionelle Hautanalyse mit Pflegeempfehlungen",
      image: "/images/hero_section/Skin%20Consultation.png",
      link: "treatments"
    },
    {
      id: "schminkkurse",
      title: "Schminkkurse",
      subtitle: "HAFIDAS BEAUTYROOM",
      description: "Lernen Sie professionelle Schminktechniken",
      image: "/images/hero_section/Makeup%20Courses.png",
      link: "treatments"
    }
  ];

  useEffect(() => {
    // Preload all images
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
      console.log(`Preloading: ${service.title} - ${service.image}`);
    });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [services.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Aurora-inspired background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/30 to-rose-50/20">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pink-100/10 to-transparent animate-pulse"></div>
      </div>

      {/* Service Carousel */}
      <div className="relative h-full z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={service.image}
              alt={service.title}
              className={`absolute inset-0 w-full h-full object-cover ${
                service.id === 'microneedling' ? 'object-top' :
                service.id === 'schminkkurse' ? 'object-top' :
                'object-center'
              }`}
              loading="eager"
              onLoad={() => {
                console.log(`✅ Loaded: ${service.title}`);
                setImagesLoaded(prev => new Set([...prev, service.id]));
              }}
              onError={(e) => {
                console.error(`❌ Failed to load: ${service.title}`, e);
                console.log(`Image path: ${service.image}`);
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-sm font-medium tracking-wider mb-4 opacity-90">
                  {service.subtitle}
                </h2>
                <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <GradientText
                    className="beauty-title"
                    colors={["#FFFFFF", "#FFB6C1", "#FFFFFF", "#FF69B4", "#FFFFFF"]}
                    animationSpeed={10}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatTitleForMobile(service.title)
                      }}
                    />
                  </GradientText>
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  {service.description}
                </p>
                <Button
                  onClick={() => openServiceModal(service.id)}
                  className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg px-8 py-3 text-lg font-medium transition-all duration-300"
                >
                  Mehr erfahren
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
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

