import React from "react";
import { Instagram, Facebook, Heart, Star, MessageCircle } from "lucide-react";
import { GlareHover } from "./GlareHover";
import "./SocialMediaBanner.css";

interface SocialMediaBannerProps {
  className?: string;
  variant?: "header" | "footer" | "floating";
}

export const SocialMediaBanner: React.FC<SocialMediaBannerProps> = ({
  className = "",
  variant = "header"
}) => {
  const handleInstagramClick = () => {
    window.open("https://instagram.com/hafidasbeautyroom", "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://facebook.com/hafidasbeautyroom", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/4917612345678", "_blank");
  };

  if (variant === "floating") {
    return (
      <div className={`social-floating-banner ${className}`}>
        <div className="social-floating-content">
          <div className="social-floating-buttons">
            <GlareHover
              className="social-button instagram"
              glareColor="rgba(255, 255, 255, 0.6)"
              glareDuration="0.5s"
            >
              <button
                onClick={handleInstagramClick}
                className="social-btn-content"
              >
                <Instagram className="h-6 w-6" />
              </button>
            </GlareHover>
            <GlareHover
              className="social-button facebook"
              glareColor="rgba(255, 255, 255, 0.6)"
              glareDuration="0.5s"
            >
              <button
                onClick={handleFacebookClick}
                className="social-btn-content"
              >
                <Facebook className="h-6 w-6" />
              </button>
            </GlareHover>
            <GlareHover
              className="social-button whatsapp"
              glareColor="rgba(255, 255, 255, 0.6)"
              glareDuration="0.5s"
            >
              <button
                onClick={handleWhatsAppClick}
                className="social-btn-content"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
            </GlareHover>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "header") {
    return (
      <div className={`social-header-banner ${className}`}>
        <div className="social-header-content">
          <div className="social-header-text">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white/90">
              Folgen Sie uns für Beauty-Tipps & Angebote
            </span>
          </div>
          <div className="social-header-buttons">
            <button
              onClick={handleInstagramClick}
              className="social-header-btn instagram"
            >
              <Instagram className="h-4 w-4" />
              <span>@hafidasbeautyroom</span>
            </button>
            <button
              onClick={handleFacebookClick}
              className="social-header-btn facebook"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Footer variant
  return (
    <div className={`social-footer-banner ${className}`}>
      <div className="social-footer-content">
        <h3 className="social-footer-title">Bleiben Sie verbunden</h3>
        <p className="social-footer-description">
          Folgen Sie uns für die neuesten Beauty-Trends, Tipps und exklusive Angebote
        </p>
        <div className="social-footer-buttons">
          <GlareHover
            className="social-footer-button instagram"
            glareColor="rgba(255, 255, 255, 0.7)"
            glareDuration="0.6s"
          >
            <button
              onClick={handleInstagramClick}
              className="social-footer-btn-content"
            >
              <Instagram className="h-5 w-5" />
              <div className="social-footer-btn-text">
                <span className="font-medium">Instagram</span>
                <span className="text-sm opacity-90">@hafidasbeautyroom</span>
              </div>
            </button>
          </GlareHover>
          <GlareHover
            className="social-footer-button facebook"
            glareColor="rgba(255, 255, 255, 0.7)"
            glareDuration="0.6s"
          >
            <button
              onClick={handleFacebookClick}
              className="social-footer-btn-content"
            >
              <Facebook className="h-5 w-5" />
              <div className="social-footer-btn-text">
                <span className="font-medium">Facebook</span>
                <span className="text-sm opacity-90">Hafidas Beauty Room</span>
              </div>
            </button>
          </GlareHover>
        </div>
      </div>
    </div>
  );
};
