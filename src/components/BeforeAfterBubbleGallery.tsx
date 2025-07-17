import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Eye, Sparkles } from "lucide-react";
// Using local images from the images folder
const beforeAfterAcne = "/images/BeforeAfter Treatment Results/Acne Treatment Results.png";
const beforeAfterHydration = "/images/BeforeAfter Treatment Results/Hydration Treatment.png";
const beforeAfterPores = "/images/BeforeAfter Treatment Results/Pore Refinement.png";
const beforeAfterPigmentation = "/images/BeforeAfter Treatment Results/Pigmentation Treatment.png";
const beforeAfterRejuvenation = "/images/BeforeAfter Treatment Results/Skin Rejuvenation.png";
const beforeAfter = "/images/BeforeAfter Treatment Results/General BeforeAfter.png";

export const BeforeAfterBubbleGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const beforeAfterImages = [
    {
      id: 1,
      src: beforeAfterAcne,
      title: "Akne-Behandlung",
      description: "Dramatische Verbesserung bei Akne und Unreinheiten"
    },
    {
      id: 2,
      src: beforeAfterHydration,
      title: "Hydration & Feuchtigkeit",
      description: "Intensive Feuchtigkeitsversorgung für strahlende Haut"
    },
    {
      id: 3,
      src: beforeAfterPores,
      title: "Poren-Verfeinerung",
      description: "Sichtbare Verkleinerung der Poren und glattere Textur"
    },
    {
      id: 4,
      src: beforeAfterPigmentation,
      title: "Pigmentflecken",
      description: "Aufhellung von Altersflecken und ungleichmäßigem Hautton"
    },
    {
      id: 5,
      src: beforeAfterRejuvenation,
      title: "Hautverjüngung",
      description: "Gesamthafte Hauterneuerung für jugendliche Ausstrahlung"
    },
    {
      id: 6,
      src: beforeAfter,
      title: "Aquafacial Ergebnis",
      description: "Komplette Transformation durch Aquafacial-Behandlung"
    }
  ];

  const toggleGallery = () => {
    setIsOpen(!isOpen);
    setSelectedImage(null);
  };

  const selectImage = (index: number) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  return (
    <>
      {/* Compact Bubble Button */}
      <div className="relative">
        <Button
          onClick={toggleGallery}
          className={`
            relative w-20 h-20 rounded-apple-xs bg-gradient-primary shadow-glow
            transform transition-all duration-500 hover:scale-110 group
            ${isOpen ? 'scale-110 shadow-strong' : ''}
          `}
          aria-label="Vorher-Nachher Galerie öffnen"
        >
          <div className="flex flex-col items-center">
            <Sparkles className="h-6 w-6 mb-1 group-hover:animate-pulse" />
            <span className="text-xs font-medium">Galerie</span>
          </div>
          
          {/* Floating mini bubbles around the main bubble */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-apple-xs animate-pulse"></div>
          <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-primary-light rounded-apple-xs animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1 -left-3 w-2 h-2 bg-accent/70 rounded-apple-xs animate-pulse" style={{ animationDelay: '1s' }}></div>
        </Button>
      </div>

      {/* Expanded Gallery */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl mx-4 bg-white rounded-apple shadow-strong overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="relative bg-gradient-primary text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">
                    Vorher & Nachher Galerie
                  </h3>
                  <p className="text-white/90">
                    Sehen Sie die beeindruckenden Ergebnisse unserer Behandlungen
                  </p>
                </div>
                <Button
                  onClick={toggleGallery}
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-20 w-3 h-3 bg-white/30 rounded-apple-xs animate-float"></div>
              <div className="absolute bottom-8 right-32 w-2 h-2 bg-white/20 rounded-apple-xs animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Image Grid */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beforeAfterImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`
                      relative group cursor-pointer rounded-apple overflow-hidden
                      transform transition-all duration-300 treatment-card
                      ${selectedImage === index ? 'scale-105 ring-4 ring-primary/50' : ''}
                    `}
                    onClick={() => selectImage(index)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* View icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-apple-xs p-3 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="h-6 w-6 text-primary" />
                        </div>
                      </div>

                      {/* Before/After labels */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="grid grid-cols-2 gap-2 text-white text-center">
                          <div className="bg-black/70 backdrop-blur-sm rounded-apple-sm p-2">
                            <p className="font-bold text-sm">Vorher</p>
                          </div>
                          <div className="bg-primary/80 backdrop-blur-sm rounded-apple-sm p-2">
                            <p className="font-bold text-sm">Nachher</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image info */}
                    <div className="p-4 bg-gradient-card">
                      <h4 className="font-bold text-primary mb-1">{image.title}</h4>
                      <p className="text-sm text-muted-foreground">{image.description}</p>
                    </div>

                    {/* Selection indicator */}
                    {selectedImage === index && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-apple-xs p-2">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-secondary/30 p-4 text-center">
              <p className="text-muted-foreground mb-2">
                Möchten Sie ähnliche Ergebnisse erzielen?
              </p>
              <Button 
                variant="hero" 
                onClick={() => {
                  toggleGallery();
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Jetzt Termin buchen
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};