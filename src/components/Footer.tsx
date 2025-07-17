import { Heart, Instagram, Facebook, MessageCircle, MapPin, Mail, Phone, Sparkles } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-sm text-white py-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-4 mb-3">
          {/* Brand Section */}
          <div>
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-3 mb-3 group"
            >
              {/* Logo */}
              <div className="w-10 h-10 transition-all duration-300">
                <img
                  src="/images/hero_section/logo.png"
                  alt="Hafidas Beautyroom Logo"
                  className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
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
                  <span className="font-bold text-white text-xl drop-shadow-lg">
                    H
                  </span>
                </div>
              </div>

              {/* Brand Text */}
              <span className="font-display text-lg font-bold bg-gradient-to-r from-accent to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-accent transition-all duration-300">
                Hafidas Beautyroom
              </span>
            </button>
            <p className="text-white/70 mb-2 leading-relaxed text-xs">
              Professionelle Hautbehandlungen in Frankfurt.
            </p>

            {/* Social Media */}
            <div className="flex space-x-2 mb-2">
              <a
                href="https://www.instagram.com/hafidasbeautyroom"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent/20 p-2 rounded-apple-xs transition-all duration-300 hover:scale-110 group"
              >
                <Instagram className="h-4 w-4 group-hover:text-accent transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/hafidasbeautyroom"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent/20 p-2 rounded-apple-xs transition-all duration-300 hover:scale-110 group"
              >
                <Facebook className="h-4 w-4 group-hover:text-accent transition-colors" />
              </a>
              <a
                href="https://wa.me/496912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent/20 p-2 rounded-apple-xs transition-all duration-300 hover:scale-110 group"
              >
                <MessageCircle className="h-4 w-4 group-hover:text-accent transition-colors" />
              </a>
            </div>

            <div className="flex items-center text-white/50 text-xs">
              <span>Gemacht mit</span>
              <Heart className="h-3 w-3 mx-1 text-accent fill-current animate-pulse" />
              <span>in Frankfurt</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-2 text-accent">Schnellzugriff</h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white/70 hover:text-accent transition-colors text-left"
              >
                Startseite
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white/70 hover:text-accent transition-colors text-left"
              >
                Über uns
              </button>
              <button
                onClick={() => scrollToSection('treatments')}
                className="text-white/70 hover:text-accent transition-colors text-left"
              >
                Behandlungen
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/70 hover:text-accent transition-colors text-left"
              >
                Kontakt
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-2 text-accent">Kontakt</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-start">
                <MapPin className="h-3 w-3 mr-1 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-white/70">
                  <div>Luthmerstraße 22, 65934 Frankfurt</div>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-1 text-accent flex-shrink-0" />
                <div className="text-white/70">h.aitaanan@gmail.com</div>
              </div>
            </div>

            {/* Opening Hours Summary */}
            <div className="mt-2">
              <h5 className="font-semibold text-white mb-1 text-xs">Öffnungszeiten</h5>
              <div className="text-white/60 text-xs">
                <div>Mo-Fr: 10:00-18:00 | Sa: 10:00-14:00</div>
                <div className="text-accent font-medium">Termine nach Vereinbarung</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
            <div className="text-white/50 text-xs flex items-center">
              <Sparkles className="h-3 w-3 mr-1 text-accent" />
              &copy; 2024 Hafidas Beautyroom.
            </div>

            <div className="flex space-x-3 text-xs">
              <a href="#" className="text-white/50 hover:text-accent transition-colors">
                Impressum
              </a>
              <a href="#" className="text-white/50 hover:text-accent transition-colors">
                Datenschutz
              </a>
              <a href="#" className="text-white/50 hover:text-accent transition-colors">
                AGB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};