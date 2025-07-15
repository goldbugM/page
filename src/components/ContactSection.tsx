import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  X,
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

// Enhanced Google Maps component with automatic loading
const LazyGoogleMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-load map after a short delay
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full rounded-b-apple overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100">
      {!mapLoaded ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
          <div className="bg-white/80 backdrop-blur-sm rounded-apple p-6 shadow-lg border border-rose-200/50">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Karte wird geladen...</h4>
              <p className="text-gray-600 text-sm mb-1">Luthmerstraße 22</p>
              <p className="text-gray-600 text-sm">65934 Frankfurt am Main</p>
              <div className="mt-4 flex space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-apple p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-gray-700 text-sm">Karte lädt...</span>
                </div>
              </div>
            </div>
          )}
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

  const openRoute = (service: string) => {
    let url = "";
    switch (service) {
      case 'google':
        url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
        break;
      case 'apple':
        url = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
        break;
      case 'waze':
        url = `https://waze.com/ul?q=${encodeURIComponent(address)}`;
        break;
      default:
        url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    }

    const popup = window.open(
      url,
      'routePlanner',
      'width=900,height=700,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );
    if (popup) {
      popup.focus();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-white/95 via-slate-50/90 to-gray-50/80 backdrop-blur-xl rounded-3xl max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Futuristic Header */}
        <div className="relative bg-gradient-to-br from-slate-900/90 via-primary/10 to-accent/10 backdrop-blur-md border-b border-primary/20 p-6 flex items-center justify-between">
          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-3xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-3xl" />

          {/* Glowing Dot */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/50 animate-pulse" />

          <h3 className="relative z-10 font-bold text-gray-900 text-2xl tracking-wide">ROUTE PLANEN</h3>
          <button
            onClick={onClose}
            className="relative z-10 text-gray-700 hover:text-gray-900 transition-all duration-300 p-2 hover:bg-gray-200/50 rounded-xl hover:scale-105"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Hover Effect Line */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-500 group-hover:w-full" />
        </div>

        <div className="relative p-8">
          <div className="mb-8">
            <div className="flex items-center mb-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-gray-200/30">
              <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl mr-4 shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg tracking-wide">HAFIDAS BEAUTYROOM</p>
                <p className="text-base text-gray-700 font-medium">{address}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-base text-gray-700 mb-6 font-medium">Wählen Sie Ihren bevorzugten Kartendienst:</p>

            <button
              onClick={() => openRoute('google')}
              className="group relative w-full flex items-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-2xl" />

              <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                <Navigation className="h-6 w-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-lg">Google Maps</p>
                <p className="text-sm text-blue-100">Detaillierte Navigation</p>
              </div>
            </button>

            <button
              onClick={() => openRoute('apple')}
              className="group relative w-full flex items-center p-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-2xl" />

              <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                <Car className="h-6 w-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-lg">Apple Maps</p>
                <p className="text-sm text-gray-300">Für iOS Geräte</p>
              </div>
            </button>

            <button
              onClick={() => openRoute('waze')}
              className="group relative w-full flex items-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-2xl" />

              <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                <Bus className="h-6 w-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-lg">Waze</p>
                <p className="text-sm text-purple-100">Community-basierte Navigation</p>
              </div>
            </button>
          </div>
        </div>
      </div>
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
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kontakt & Anfahrt
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Haben Sie Fragen zu unseren Behandlungen oder möchten Sie einen Termin vereinbaren?
            Wir freuen uns auf Ihre Nachricht und beraten Sie gerne persönlich.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Contact Form - Futuristic Design */}
          <FadeContent blur={true} duration={800} delay={100} className="h-full">
            <div className="group relative bg-gradient-to-br from-white/95 via-slate-50/80 to-gray-50/60 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 overflow-hidden">
              {/* Futuristic Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-2xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-2xl" />

              {/* Glowing Dot */}
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mb-6 shadow-lg shadow-primary/30 animate-pulse" />

              <h3 className="font-bold text-gray-900 mb-6 text-xl tracking-wide">
                NACHRICHT SENDEN
              </h3>

            {showSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Vielen Dank!</h4>
                <p className="text-gray-600 mb-6">
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
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contact-name" className="text-base font-medium text-gray-700">
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
                    <Label htmlFor="contact-email" className="text-base font-medium text-gray-700">
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
                  <Label htmlFor="contact-phone" className="text-base font-medium text-gray-700">
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
                  <Label htmlFor="contact-subject" className="text-base font-medium text-gray-700">
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
                  <Label htmlFor="contact-message" className="text-base font-medium text-gray-700">
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
          </div>
        </FadeContent>

          {/* Futuristic Contact Information - Right Side */}
          <div className="relative">
            {/* Futuristic Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative space-y-6">
            {/* Studio Information Card */}
            <FadeContent blur={true} duration={800} delay={200} className="h-full">
              <div className="group relative bg-gradient-to-br from-white/95 via-rose-50/80 to-purple-50/60 backdrop-blur-md rounded-2xl p-8 border border-primary/20 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
                {/* Futuristic Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-2xl" />

                {/* Glowing Dot */}
                <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mb-6 shadow-lg shadow-accent/50 animate-pulse" />

                <h3 className="font-bold text-gray-900 mb-4 text-xl tracking-wide">
                  STUDIO INFORMATION
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">Hafidas Beautyroom</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Ihr Experte für professionelle Hautbehandlungen in Frankfurt.
                      Erleben Sie moderne Aquafacial-Treatments und individuelle Hautpflege
                      in entspannter Atmosphäre.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Adresse</h5>
                      <div className="text-gray-700 text-sm">
                        <div>Luthmerstraße 22</div>
                        <div>65934 Frankfurt am Main</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500" />
              </div>
            </FadeContent>

            {/* Contact Details Card */}
            <FadeContent blur={true} duration={800} delay={400} className="h-full">
              <div className="group relative bg-gradient-to-br from-white/95 via-blue-50/80 to-indigo-50/60 backdrop-blur-md rounded-2xl p-8 border border-accent/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/30 to-transparent rounded-tr-2xl" />

                <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mb-6 shadow-lg shadow-primary/50 animate-pulse" style={{ animationDelay: '0.5s' }} />

                <h3 className="font-bold text-gray-900 mb-4 text-xl tracking-wide">
                  KONTAKT DETAILS
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Telefon</h5>
                      <div className="text-gray-700 text-sm">Terminvereinbarung</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">E-Mail</h5>
                      <div className="text-gray-700 text-sm">h.aitaanan@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Öffnungszeiten</h5>
                      <div className="text-gray-700 text-sm space-y-1">
                        <div>Mo: 11:00 - 15:00 | Di-Fr: 13:00 - 18:00</div>
                        <div>Mi: 10:00 - 18:00 | Sa: 10:00 - 14:00</div>
                        <div>So: Geschlossen</div>
                        <div className="text-accent font-medium mt-2">Termine nach Vereinbarung</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
            </FadeContent>
            </div>
          </div>
        </div>

        {/* Map Section - Futuristic Design */}
        <FadeContent blur={true} duration={800} delay={600} className="h-full">
          <div className="group relative bg-gradient-to-br from-white/95 via-slate-50/80 to-gray-50/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
            {/* Futuristic Corner Accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-3xl" />

            {/* Glowing Dot */}
            <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/50 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative p-8 border-b border-gray-200/50">
              <h3 className="font-bold text-gray-900 mb-4 text-2xl tracking-wide">SO FINDEN SIE UNS</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Unser Studio befindet sich in zentraler Lage in Frankfurt am Main,
                gut erreichbar mit öffentlichen Verkehrsmitteln und dem Auto.
              </p>
            </div>

            <div className="h-96 relative">
            <LazyGoogleMap />

            {/* Futuristic Map Overlay with Address */}
            <div className="absolute top-6 left-6 bg-gradient-to-br from-white/95 via-slate-50/90 to-gray-50/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-sm border border-white/30 hover:border-primary/40 transition-all duration-500 group">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-2xl" />

              {/* Glowing Dot */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/50 animate-pulse" />

              <div className="relative flex items-start">
                <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl mr-4 shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2 text-lg tracking-wide">HAFIDAS BEAUTYROOM</h4>
                  <p className="text-base text-gray-700 leading-relaxed font-medium mb-4">
                    Luthmerstraße 22<br />
                    65934 Frankfurt am Main
                  </p>
                  <button
                    onClick={() => setIsRoutePlannerOpen(true)}
                    className="bg-gradient-to-r from-primary to-accent text-white text-base font-bold transition-all duration-300 inline-flex items-center px-4 py-3 rounded-xl hover:shadow-xl hover:scale-105"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    ROUTE PLANEN
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                    <a
                      href="https://www.openstreetmap.org/?mlat=50.11&mlon=8.663#map=16/50.11/8.663"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-accent text-xs transition-colors inline-flex items-center"
                    >
                      OpenStreetMap
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Futuristic Transportation Info */}
            <div className="absolute bottom-6 right-6 bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30 hover:border-accent/40 transition-all duration-500 group">
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl" />

              {/* Glowing Dot */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/50 animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative flex items-center text-sm text-gray-700">
                <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-2 rounded-xl mr-3">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Gut erreichbar</p>
                  <p className="text-gray-600">🚇 U-Bahn • 🚌 Bus • 🚗 Parkplätze</p>
                </div>
              </div>
            </div>

            {/* Hover Effect Line */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
          </div>
        </FadeContent>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Route Planner Modal */}
      <RoutePlannerModal
        isOpen={isRoutePlannerOpen}
        onClose={() => setIsRoutePlannerOpen(false)}
      />
    </section>
  );
};