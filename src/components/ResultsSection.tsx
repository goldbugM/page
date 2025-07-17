import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Award, Heart, Sparkles, CheckCircle, Camera } from 'lucide-react';
import { BeforeAfterBubbleGallery } from './BeforeAfterBubbleGallery';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const ResultsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [counters, setCounters] = useState({ clients: 0, satisfaction: 0, experience: 0, treatments: 0 });
  
  // Animate counters when visible
  useEffect(() => {
    if (isVisible) {
      const animateCounter = (target: number, key: keyof typeof counters, duration: number = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };
      
      setTimeout(() => animateCounter(500, 'clients'), 200);
      setTimeout(() => animateCounter(8, 'experience'), 400);
      setTimeout(() => animateCounter(1200, 'treatments'), 600);
    }
  }, [isVisible]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const stats = [
    { label: "Zufriedene Kunden", value: counters.clients, suffix: "+", icon: Users, color: "text-primary" },
    { label: "Jahre Erfahrung", value: counters.experience, suffix: "+", icon: Award, color: "text-accent" },
    { label: "Behandlungen", value: counters.treatments, suffix: "+", icon: Sparkles, color: "text-secondary" },
    { label: "Professionell", value: 100, suffix: "%", icon: Heart, color: "text-primary" }
  ];



  const benefits = [
    {
      title: "Individuelle Beratung",
      description: "Jede Behandlung wird auf Ihren Hauttyp und Ihre Bedürfnisse abgestimmt",
      icon: CheckCircle
    },
    {
      title: "Professionelle Ausstattung",
      description: "Modernste Technologie und hochwertige Produkte für optimale Ergebnisse",
      icon: CheckCircle
    },
    {
      title: "Entspannte Atmosphäre",
      description: "Genießen Sie Ihre Behandlung in ruhiger und professioneller Umgebung",
      icon: CheckCircle
    }
  ];

  return (
    <section id="results" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6">
            <TrendingUp className="h-6 w-6 text-primary mr-2" />
            <span className="text-primary font-semibold">Bewiesene Ergebnisse</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Unsere Ergebnisse
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Professionelle <span className="text-primary font-semibold">Hautbehandlungen</span> mit sichtbaren Ergebnissen und <span className="text-accent font-semibold">individueller Betreuung</span> in entspannter Atmosphäre.
          </p>
        </div>
        
        {/* Enhanced Statistics */}
        <div className={`grid md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="fade-in-up animate">
            <h3 className="font-display text-3xl font-bold mb-6 text-primary">
              Warum Hafidas Beautyroom?
            </h3>
            <p className="mb-8 text-muted-foreground leading-relaxed text-lg">
              Professionelle Hautpflege mit individueller Beratung und modernster Technologie.
              Jede Behandlung wird sorgfältig auf Ihre Hautbedürfnisse abgestimmt.
            </p>
            <div className="mb-8 space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 mt-1">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg mb-2">{benefit.title}</p>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Jetzt Termin vereinbaren
            </Button>
          </div>
          
          {/* Enhanced Before & After Gallery */}
          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full mb-6">
                <Camera className="h-6 w-6 text-secondary mr-2" />
                <span className="text-secondary font-semibold">Vorher & Nachher</span>
              </div>
              <h3 className="font-display text-4xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Sichtbare Transformation
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Erleben Sie die beeindruckenden Ergebnisse unserer Behandlungen.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative">
                <div className="flex justify-center">
                  <BeforeAfterBubbleGallery />
                </div>
              </div>
            </div>
          </div>
        </div>
        

        

      </div>
    </section>
  );
};