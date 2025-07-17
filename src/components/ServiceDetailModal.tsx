import { Button } from "@/components/ui/button";
import { X, Clock, Euro, CheckCircle, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "./BookingModal";

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  duration: string;
  price: string;
  benefits: string[];
  process: Array<{
    step: number;
    title: string;
    description: string;
    image: string;
  }>;
  beforeAfter?: {
    before: string;
    after: string;
  };
  images: string[];
  suitableFor: string[];
  notSuitableFor?: string[];
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailModal = ({ service, isOpen, onClose }: ServiceDetailModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md rounded-apple max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-md border-b border-white/30 p-6 flex justify-between items-center rounded-t-apple">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">
              {service.title}
            </h2>
            <p className="text-white/90 mt-2">{service.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-apple-sm transition-colors text-white/80 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="relative mb-6">
                <img
                  src={service.images[activeImageIndex]}
                  alt={service.title}
                  className="w-full h-80 object-cover rounded-apple shadow-lg"
                />
                {service.images.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {service.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-apple-xs transition-colors ${
                          index === activeImageIndex ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                {service.longDescription}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 rounded-apple p-4 border border-white/30">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-white mr-2" />
                    <span className="font-semibold text-white">Dauer</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{service.duration}</p>
                </div>
                
                <div className="bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 rounded-apple p-4 border border-white/30">
                  <div className="flex items-center mb-2">
                    <Euro className="h-5 w-5 text-white mr-2" />
                    <span className="font-semibold text-white">Preis</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{service.price}</p>
                </div>
              </div>

              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-white/30 text-white hover:bg-white/40 hover:shadow-lg transition-all duration-300 border border-white/50"
              >
                Jetzt buchen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold mb-6 text-white">Vorteile & Wirkung</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start p-4 bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 rounded-apple border border-white/30 hover:shadow-md transition-shadow">
                  <CheckCircle className="h-5 w-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment Process */}
          {service.process && service.process.length > 0 && (
            <div className="mb-12">
              <h3 className="font-display text-2xl font-bold mb-6 text-white">Behandlungsablauf</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveProcessStep(index)}
                      className={`p-4 rounded-apple cursor-pointer transition-all duration-300 ${
                        activeProcessStep === index
                          ? 'bg-gradient-to-r from-primary/95 via-accent/90 to-secondary/85 border-2 border-white/50'
                          : 'bg-white/20 hover:bg-white/30 border border-white/30'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-apple-xs flex items-center justify-center text-white font-bold mr-3 ${
                          activeProcessStep === index ? 'bg-white/30' : 'bg-white/20'
                        }`}>
                          {step.step}
                        </div>
                        <h4 className="font-bold text-lg text-white">{step.title}</h4>
                      </div>
                      <p className="text-white/90 ml-11">{step.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  <img
                    src={service.process[activeProcessStep]?.image}
                    alt={service.process[activeProcessStep]?.title}
                    className="w-full h-80 object-cover rounded-apple shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Suitable For */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-4 text-primary">Geeignet für:</h3>
              <div className="space-y-2">
                {service.suitableFor.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Star className="h-4 w-4 text-accent mr-2" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {service.notSuitableFor && service.notSuitableFor.length > 0 && (
              <div>
                <h3 className="font-display text-xl font-bold mb-4 text-red-600">Nicht geeignet bei:</h3>
                <div className="space-y-2">
                  {service.notSuitableFor.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};
