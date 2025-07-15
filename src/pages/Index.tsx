import { useEffect } from 'react';
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";


import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingBookingButton } from "@/components/FloatingBookingButton";
import { SocialMediaBanner } from "@/components/SocialMediaBanner";

const Index = () => {
  // Smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TreatmentsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingBookingButton />

      {/* Floating Social Media Banner */}
      <SocialMediaBanner variant="floating" />
    </div>
  );
};

export default Index;
