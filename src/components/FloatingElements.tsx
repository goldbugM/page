import { Instagram, Facebook, Mail, MessageCircle } from "lucide-react";

export const FloatingElements = () => {
  // Simplified floating elements - only essential contact button
  return (
    <>
      {/* Professional Contact Button */}
      <div className="fixed bottom-8 right-4 md:right-8 z-50">
        <a
          href="https://hafidasbeautyroom.bookinbeautiful.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 font-medium"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Termin buchen</span>
        </a>
      </div>
    </>
  );
};
