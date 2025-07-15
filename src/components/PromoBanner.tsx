import { useState } from "react";
import { X, Instagram } from "lucide-react";

interface PromoBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PromoBanner = ({ isVisible, onClose }: PromoBannerProps) => {
  if (!isVisible) return null;

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hafidasbeautyroom', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary animate-gradient-x"></div>
      
      {/* Content */}
      <div className="relative z-10 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Professional Label */}
          <div className="flex items-center space-x-1">
            <span className="text-apple-caption text-white font-medium">
              Sonderangebote
            </span>
          </div>
          
          {/* Main Message */}
          <button
            onClick={handleInstagramClick}
            className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors group"
          >
            <span className="text-apple-caption font-medium">
              Folge uns auf Instagram für exklusive Angebote & Beauty-Tipps
            </span>
            <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-1 rounded-apple-sm hover:bg-white/10"
          aria-label="Banner schließen"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
