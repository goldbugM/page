import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, Euro } from "lucide-react";
import { GlareHover } from "./GlareHover";
import "./BounceCards.css";

interface BounceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
  category: string;
  featured?: boolean;
}

interface BounceCardsProps {
  cards: BounceCard[];
  className?: string;
}

export const BounceCards: React.FC<BounceCardsProps> = ({
  cards,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`bounce-cards-container ${className}`}>
      <div className="bounce-cards-wrapper">
        <div className="bounce-cards-stack">
          {cards.map((card, index) => {
            const position = (index - currentIndex + cards.length) % cards.length;
            const isActive = position === 0;
            const isNext = position === 1;
            const isPrev = position === cards.length - 1;
            
            return (
              <div
                key={card.id}
                className={`bounce-card ${isActive ? 'active' : ''} ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''}`}
                style={{
                  zIndex: cards.length - position,
                  transform: `
                    translateX(${position * 20}px) 
                    translateY(${position * 10}px) 
                    scale(${1 - position * 0.05})
                  `,
                  opacity: position < 3 ? 1 - position * 0.2 : 0
                }}
                onClick={() => !isActive && goToCard(index)}
              >
                <div className="bounce-card-content">
                  {card.featured && (
                    <div className="bounce-card-badge">
                      <Star className="h-3 w-3" />
                      <span>Beliebt</span>
                    </div>
                  )}
                  
                  <div className="bounce-card-image">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="bounce-card-img"
                    />
                    <div className="bounce-card-overlay">
                      <span className="bounce-card-category">{card.category}</span>
                    </div>
                  </div>
                  
                  <div className="bounce-card-info">
                    <h3 className="bounce-card-title">{card.title}</h3>
                    <p className="bounce-card-description">{card.description}</p>
                    
                    <div className="bounce-card-details">
                      <div className="bounce-card-detail">
                        <Clock className="h-4 w-4 text-pink-500" />
                        <span>{card.duration}</span>
                      </div>
                      <div className="bounce-card-detail">
                        <Euro className="h-4 w-4 text-pink-500" />
                        <span>{card.price}</span>
                      </div>
                      <div className="bounce-card-detail">
                        <div className="bounce-card-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < card.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="bounce-card-actions">
                        <GlareHover
                          className="bounce-card-button primary"
                          glareColor="rgba(255, 255, 255, 0.7)"
                          glareDuration="0.5s"
                        >
                          <button className="bounce-card-btn">
                            Jetzt buchen
                          </button>
                        </GlareHover>
                        <GlareHover
                          className="bounce-card-button secondary"
                          glareColor="rgba(255, 182, 193, 0.3)"
                          glareDuration="0.5s"
                        >
                          <button className="bounce-card-btn">
                            Mehr erfahren
                          </button>
                        </GlareHover>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Navigation */}
        <div className="bounce-cards-navigation">
          <button
            onClick={prevCard}
            className="bounce-nav-btn prev"
            aria-label="Vorherige Karte"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="bounce-cards-indicators">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`bounce-indicator ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Gehe zu Karte ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextCard}
            className="bounce-nav-btn next"
            aria-label="Nächste Karte"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
