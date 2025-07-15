import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Clock, Euro, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import FadeContent from "./FadeContent";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Service {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
  description?: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  services: string[];
  date: string;
  time: string;
  message: string;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    services: [],
    date: "",
    time: "",
    message: ""
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedServices([]);
      setShowBookingForm(false);
      setShowSuccess(false);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        services: [],
        date: "",
        time: "",
        message: ""
      });
    }
  }, [isOpen]);

  // Update services in form when selected
  useEffect(() => {
    const serviceStrings = selectedServices.map(service => 
      `${service.name} (${service.duration} - ${service.price})`
    );
    setFormData(prev => ({
      ...prev,
      services: serviceStrings
    }));
  }, [selectedServices]);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (service: Service) => {
    const isAlreadySelected = selectedServices.some(s => s.id === service.id);
    if (isAlreadySelected) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleProceedToBooking = () => {
    if (selectedServices.length > 0) {
      setShowBookingForm(true);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formDataObj = new FormData(form);
    
    // Add selected services to form data
    formDataObj.append('services', formData.services.join('\n'));

    try {
      const response = await fetch('https://formspree.io/f/xdkdnyer', {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowBookingForm(false);
      } else {
        alert('Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      alert('Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  const categories = [
    "Alle",
    "Gesicht", 
    "Make-up",
    "Hautpflege",
    "Anti-Aging"
  ];

  const services: Service[] = [
    {
      id: "aquafacial-60",
      name: "Aquafacial Behandlung",
      category: "Gesicht",
      duration: "60 Min.",
      price: "89 €",
      description: "Moderne Hydra-Dermabrasion für strahlende Haut"
    },
    {
      id: "aquafacial-75",
      name: "Aquafacial Behandlung",
      category: "Gesicht", 
      duration: "75 Min.",
      price: "109 €",
      description: "Erweiterte Aquafacial-Behandlung mit zusätzlicher Pflege"
    },
    {
      id: "gesichtsbehandlung-60",
      name: "Klassische Gesichtsbehandlung",
      category: "Gesicht",
      duration: "60 Min.",
      price: "65 €",
      description: "Individuelle Hautpflege nach Ihren Bedürfnissen"
    },
    {
      id: "gesichtsbehandlung-90",
      name: "Intensive Gesichtsbehandlung",
      category: "Gesicht",
      duration: "90 Min.",
      price: "85 €",
      description: "Ausführliche Behandlung mit Tiefenreinigung und Pflege"
    },
    {
      id: "microneedling-gesicht",
      name: "Microneedling Gesicht komplett",
      category: "Anti-Aging",
      duration: "60 Min.",
      price: "99 €",
      description: "inkl. Wirkstoff-Ampulle & Maske"
    },
    {
      id: "microneedling-hals",
      name: "Microneedling Gesicht + Hals",
      category: "Anti-Aging",
      duration: "75 Min.",
      price: "129 €",
      description: "inkl. Wirkstoff-Ampulle & Maske"
    },
    {
      id: "microneedling-dekollete",
      name: "Microneedling Gesicht + Hals + Dekolleté",
      category: "Anti-Aging",
      duration: "90 Min.",
      price: "149 €",
      description: "inkl. Wirkstoff-Ampulle & Maske"
    },
    {
      id: "makeup-45",
      name: "Tages Make-up",
      category: "Make-up",
      duration: "45 Min.",
      price: "45 €",
      description: "Typgerechtes Make-up für den Alltag"
    },
    {
      id: "makeup-60",
      name: "Abend Make-up",
      category: "Make-up",
      duration: "60 Min.",
      price: "65 €",
      description: "Elegantes Make-up für besondere Anlässe"
    },
    {
      id: "makeup-90",
      name: "Braut Make-up",
      category: "Make-up",
      duration: "90 Min.",
      price: "89 €",
      description: "Perfektes Make-up für Ihren besonderen Tag"
    },
    {
      id: "schminkkurs-90",
      name: "Persönlicher Schminkkurs",
      category: "Make-up",
      duration: "90 Min.",
      price: "89 €",
      description: "Lernen Sie professionelle Schminktechniken"
    },
    {
      id: "schminkkurs-120",
      name: "Intensiver Schminkkurs",
      category: "Make-up",
      duration: "120 Min.",
      price: "119 €",
      description: "Ausführlicher Kurs mit praktischen Übungen"
    },
    {
      id: "hautberatung",
      name: "Hautanalyse & Beratung",
      category: "Hautpflege",
      duration: "45 Min.",
      price: "35 €",
      description: "Professionelle Hautanalyse mit Pflegeempfehlungen"
    },
    {
      id: "hautberatung-60",
      name: "Hautberatung mit Pflege",
      category: "Hautpflege",
      duration: "60 Min.",
      price: "55 €",
      description: "Hautanalyse mit anschließender Basispflege"
    }
  ];

  const filteredServices = selectedCategory === "Alle" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const groupedServices = filteredServices.reduce((acc, service) => {
    const key = service.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-2 md:p-4">
      <div className="relative bg-gradient-to-br from-white/95 via-slate-50/90 to-gray-50/80 backdrop-blur-xl rounded-2xl md:rounded-3xl max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl w-full max-h-[98vh] md:max-h-[95vh] overflow-hidden animate-scale-in border border-white/20 shadow-2xl">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Futuristic Header */}
        <div className="relative bg-gradient-to-br from-slate-900/90 via-primary/10 to-accent/10 backdrop-blur-md border-b border-primary/20 p-3 md:p-6 flex justify-between items-center">
          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl md:rounded-bl-3xl" />
          <div className="absolute bottom-0 left-0 w-10 h-10 md:w-20 md:h-20 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-2xl md:rounded-tr-3xl" />

          {/* Glowing Dot */}
          <div className="absolute top-2 left-2 md:top-4 md:left-4 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/50 animate-pulse" />

          <div className="relative z-10 flex-1 min-w-0 flex items-center space-x-3">
            {/* Logo */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <img
                src="/output.png"
                alt="Hafidas Beautyroom Logo"
                className="w-full h-full object-contain drop-shadow-lg"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback text logo */}
              <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                <span className="font-bold text-gray-900 text-xl md:text-2xl drop-shadow-lg">
                  H
                </span>
              </div>
            </div>

            {/* Brand Text and Location */}
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 text-lg md:text-2xl tracking-wide mb-1 md:mb-2 truncate">HAFIDAS BEAUTYROOM</h2>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-accent flex-shrink-0" />
                <span className="text-sm md:text-base truncate">Luthmerstraße 22, Frankfurt am Main</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 p-2 md:p-3 hover:bg-gray-200/50 rounded-xl md:rounded-2xl transition-all duration-300 text-gray-700 hover:text-gray-900 hover:scale-105 flex-shrink-0 ml-2"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Hover Effect Line */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-500 group-hover:w-full" />
        </div>

        <div className="relative">
          {!showBookingForm && !showSuccess ? (
            <div className="flex flex-col md:flex-row h-auto md:h-[70vh] max-h-[calc(100vh-200px)]">
              {/* Service Selection */}
              <div className="flex-1 overflow-y-auto border-b md:border-b-0 md:border-r border-primary/20 bg-gradient-to-br from-white/50 to-slate-50/30 backdrop-blur-sm">
                {/* Service Categories */}
                <div className="p-3 md:p-6 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-3 md:mb-4 tracking-wide">SERVICES AUSWÄHLEN</h3>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105'
                            : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-md hover:scale-102'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services List */}
                <div className="p-3 md:p-6">
                  {Object.entries(groupedServices).map(([serviceName, serviceVariants]) => (
                    <div key={serviceName} className="mb-4 md:mb-6 last:mb-0">
                      <div className="border border-gray-200/50 rounded-xl md:rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 md:p-4 border-b border-gray-200/30">
                          <h4 className="text-sm md:text-base font-bold text-gray-900 tracking-wide">{serviceName}</h4>
                          <div className="text-xs md:text-sm text-accent mt-1 font-medium">
                            ab {Math.min(...serviceVariants.map(v => parseInt(v.price)))} €
                          </div>
                        </div>

                        <div className="divide-y divide-gray-200/30">
                          {serviceVariants.map((service) => {
                            const isSelected = selectedServices.some(s => s.id === service.id);
                            return (
                              <div key={service.id} className={`p-3 md:p-4 flex justify-between items-center hover:bg-primary/5 transition-all duration-300 ${isSelected ? 'bg-primary/10 border-l-2 md:border-l-4 border-accent' : ''}`}>
                                <div className="text-xs md:text-sm text-gray-700 font-medium flex-1 min-w-0 mr-2">{service.duration}</div>
                                <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                                  <div className="text-sm md:text-base font-bold text-accent">{service.price}</div>
                                  <Button
                                    onClick={() => handleServiceSelect(service)}
                                    size="sm"
                                    className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg md:rounded-xl transition-all duration-300 ${
                                      isSelected
                                        ? 'bg-red-500 text-white hover:bg-red-600 hover:scale-105'
                                        : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105'
                                    }`}
                                  >
                                    {isSelected ? '−' : '+'}
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Services & Booking */}
              <div className="w-full md:w-96 bg-gradient-to-br from-white/80 to-slate-50/60 backdrop-blur-sm p-3 md:p-6 border-l-0 md:border-l border-gray-200/50 max-h-80 md:max-h-none">
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 tracking-wide">WARENKORB ({selectedServices.length})</h4>

                {selectedServices.length === 0 ? (
                  <div className="text-center text-gray-500 text-sm md:text-base py-6 md:py-12 bg-white/50 rounded-xl md:rounded-2xl border border-gray-200/30">
                    Wählen Sie Services aus
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 max-h-32 md:max-h-48 overflow-y-auto">
                      {selectedServices.map((service) => (
                        <div key={service.id} className="flex justify-between items-center bg-white/80 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm border border-gray-200/30 shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 truncate text-sm md:text-base">{service.name}</div>
                            <div className="text-gray-600 text-xs md:text-sm">{service.duration}</div>
                          </div>
                          <div className="flex items-center space-x-2 md:space-x-3 ml-2 md:ml-3">
                            <span className="font-bold text-accent text-sm md:text-base">{service.price}</span>
                            <button
                              onClick={() => handleRemoveService(service.id)}
                              className="text-red-500 hover:text-red-700 p-1 md:p-2 hover:bg-red-50 rounded-lg md:rounded-xl transition-all duration-300"
                            >
                              <X className="h-3 w-3 md:h-4 md:w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200/50 pt-3 md:pt-4 mb-4 md:mb-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                      <div className="flex justify-between items-center text-base md:text-lg font-bold">
                        <span className="text-gray-900">Gesamt:</span>
                        <span className="text-accent text-lg md:text-xl">{selectedServices.reduce((sum, service) => sum + parseInt(service.price), 0)} €</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleProceedToBooking}
                      className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl py-3 md:py-4 text-sm md:text-base font-bold rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      ZUR BUCHUNG
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : showSuccess ? (
            /* Success Message */
            <div className="p-8 text-center h-[70vh] flex flex-col justify-center bg-gradient-to-br from-white/50 to-green-50/30 backdrop-blur-sm">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">VIELEN DANK!</h3>
              <p className="text-base text-gray-700 mb-8">
                Ihre Terminanfrage wurde erfolgreich gesendet.
              </p>

              {selectedServices.length > 0 && (
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-8 text-left border border-primary/20 max-w-lg mx-auto backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 tracking-wide">IHRE BUCHUNG:</h4>
                  <div className="space-y-3 text-base">
                    {selectedServices.map((service, index) => (
                      <div key={service.id} className="flex justify-between items-center">
                        <span className="font-medium">{index + 1}. {service.name} ({service.duration})</span>
                        <span className="text-accent font-bold">{service.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-primary/20 pt-3 mt-4 flex justify-between font-bold text-lg">
                      <span>Gesamt:</span>
                      <span className="text-accent">{selectedServices.reduce((sum, service) => sum + parseInt(service.price), 0)} €</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 rounded-2xl p-6 mb-8 max-w-lg mx-auto backdrop-blur-sm">
                <p className="text-gray-700 text-base">
                  <strong className="text-gray-900">Nächste Schritte:</strong><br />
                  Wir melden uns innerhalb von 24h per E-Mail oder Telefon zur Terminbestätigung.
                </p>
              </div>

              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl px-8 py-4 rounded-2xl text-base font-bold mx-auto transition-all duration-300 hover:scale-105"
              >
                SCHLIESSEN
              </Button>
            </div>
          ) : (
            /* Booking Form */
            <div className="flex flex-col md:flex-row h-auto md:h-[70vh] max-h-[calc(100vh-200px)]">
              {/* Service Summary */}
              <div className="w-full md:w-80 bg-gradient-to-br from-white/80 to-slate-50/60 backdrop-blur-sm p-3 md:p-6 border-b md:border-b-0 md:border-r border-gray-200/50">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-700 hover:text-accent mb-3 md:mb-4 text-sm md:text-base flex items-center font-medium transition-all duration-300 hover:scale-105"
                >
                  ← Zurück
                </button>

                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 tracking-wide">IHRE BUCHUNG</h3>
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 max-h-32 md:max-h-56 overflow-y-auto">
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between items-center text-sm bg-white/80 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-200/30 shadow-sm">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate text-sm md:text-base">{service.name}</div>
                        <div className="text-gray-600 text-xs md:text-sm">{service.duration}</div>
                      </div>
                      <span className="text-accent font-bold ml-2 md:ml-3 text-sm md:text-base">{service.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200/50 pt-3 md:pt-4 flex justify-between items-center text-base md:text-lg font-bold bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                  <span className="text-gray-900">Gesamt:</span>
                  <span className="text-accent text-lg md:text-xl">{selectedServices.reduce((sum, service) => sum + parseInt(service.price), 0)} €</span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="flex-1 p-3 md:p-6 overflow-y-auto bg-gradient-to-br from-white/50 to-slate-50/30 backdrop-blur-sm">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6 tracking-wide">KONTAKTDATEN & TERMIN</h3>

                <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="name" className="text-xs md:text-sm font-medium text-gray-700">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1 md:mt-2 h-10 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl border-gray-200"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs md:text-sm font-medium text-gray-700">E-Mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1 md:mt-2 h-10 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-xs md:text-sm font-medium text-gray-700">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1 md:mt-2 h-10 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl border-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-xs md:text-sm font-medium text-gray-700">Datum *</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="mt-1 md:mt-2 h-10 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl border-gray-200"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-xs md:text-sm font-medium text-gray-700">Uhrzeit *</Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger className="mt-1 md:mt-2 h-10 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl border-gray-200">
                        <SelectValue placeholder="Uhrzeit wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="time" value={formData.time} />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs md:text-sm font-medium text-gray-700">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="mt-1 md:mt-2 text-sm md:text-base rounded-lg md:rounded-xl border-gray-200"
                      rows={2}
                      placeholder="Besondere Wünsche..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl py-3 md:py-4 text-sm md:text-base font-bold rounded-xl md:rounded-2xl disabled:opacity-50 transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? 'WIRD GESENDET...' : 'TERMINANFRAGE SENDEN'}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Futuristic Footer */}
        <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 border-t border-gray-200/50 p-3 md:p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-sm md:text-base text-gray-700">
            <div className="flex items-center">
              <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-accent" />
              <span className="font-medium">Terminvereinbarung</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-accent" />
              <span className="font-medium text-center">h.aitaanan@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
