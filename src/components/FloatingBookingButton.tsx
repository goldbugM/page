import { useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { BookingModal } from "./BookingModal";

export const FloatingBookingButton = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      {/* Floating Booking Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <Calendar className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Mobile Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
          >
            <Calendar className="h-5 w-5" />
            <span>Termin buchen</span>
          </button>
          <a
            href="tel:+4969123456"
            className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};
