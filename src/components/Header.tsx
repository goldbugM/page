import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { PromoBanner } from "./PromoBanner";

import StarBorder from "../react-bits/StarBorder";
import Magnet from "../react-bits/Magnet";


export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPromoBannerVisible, setIsPromoBannerVisible] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Promo Banner */}
      <PromoBanner
        isVisible={isPromoBannerVisible}
        onClose={() => setIsPromoBannerVisible(false)}
      />



      <header className={`fixed w-full z-40 transition-all duration-500 ${
        isPromoBannerVisible ? 'top-10' : 'top-0'
      } ${
        isScrolled
          ? 'bg-rose-500/25 backdrop-blur-md shadow-sm'
          : 'bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}>
          {/* Logo and Brand */}
          <Magnet
            padding={60}
            magnetStrength={4}
            activeTransition="transform 0.2s ease-out"
            inactiveTransition="transform 0.3s ease-in-out"
          >
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
            >
            {/* Logo */}
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-14 h-14' : 'w-16 h-16'
            }`}>
              <div className="w-full h-full transition-all duration-300">
                {/* Logo Image */}
                <img
                  src="/images/hero_section/logo.png"
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
                  <span className={`font-bold transition-colors duration-300 drop-shadow-lg ${
                    isScrolled ? 'text-white text-2xl' : 'text-white text-3xl'
                  }`}>
                    H
                  </span>
                </div>
              </div>
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className={`transition-all duration-300 ${
                isScrolled
                  ? 'text-apple-headline text-xl text-white drop-shadow-lg'
                  : 'text-apple-title text-2xl bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent'
              }`}>
                Hafidas Beautyroom
              </span>
              <span className={`text-apple-caption transition-all duration-300 ${
                isScrolled
                  ? 'text-white text-xs drop-shadow-md'
                  : 'text-white/70 text-sm'
              }`}>
                Beauty & Wellness
              </span>
            </div>
            </button>
          </Magnet>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Behandlungen', id: 'treatments' },
                { label: 'Studio', id: 'studio' },
                { label: 'Kontakt', id: 'contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative group transition-all duration-300 text-apple-body ${
                      isScrolled
                        ? 'text-white hover:text-white/80 drop-shadow-md'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-white' : 'bg-white'
                    }`}></span>
                  </button>
                </li>
              ))}

              {/* CTA Button in Navigation */}
              <li className="ml-4">
                <StarBorder
                  as="div"
                  color="rgba(255, 255, 255, 0.8)"
                  speed="4s"
                  thickness={2}
                  className="beauty-button"
                >
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className={`px-6 py-2 rounded-apple text-apple-caption transition-all duration-300 hover:scale-105 ${
                      isScrolled
                        ? 'bg-white/30 text-white hover:bg-white/40 backdrop-blur-sm border border-white/50 drop-shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                    }`}
                  >
                    Termin buchen
                  </button>
                </StarBorder>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden focus:outline-none transition-colors ${
              isScrolled ? 'text-white hover:text-white/80 drop-shadow-lg' : 'text-white hover:text-accent'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-t border-primary/10'
            : 'bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 backdrop-blur-sm border-t border-white/20'
        }`}>
          <div className="container mx-auto px-4">
            <ul className="py-6 space-y-4">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Behandlungen', id: 'treatments' },
                { label: 'Studio', id: 'studio' },
                { label: 'Kontakt', id: 'contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left transition-colors text-apple-body py-3 px-4 rounded-apple ${
                      isScrolled
                        ? 'text-primary hover:text-accent hover:bg-primary/5'
                        : 'text-white hover:text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              {/* Mobile CTA */}
              <li className={`pt-4 border-t ${
                isScrolled ? 'border-primary/20' : 'border-white/20'
              }`}>
                <button
                  onClick={() => {
                    setIsBookingModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 text-white px-6 py-3 rounded-apple text-apple-caption hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/30"
                >
                  Termin buchen
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </header>


    </>
  );
};