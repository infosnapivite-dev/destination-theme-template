import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Plane, Car, Hotel, ExternalLink, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function TravelGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        {/* Backdrop Click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-[#F6F3EC] rounded-3xl shadow-2xl border border-[#D8CCB8] p-6 z-10 paper-texture subtle-scrollbar text-[#111111]"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundManager.playStampSound();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#E5D7C2]/70 hover:bg-[#D4C3AB] text-[#0B1B2B] transition-colors cursor-pointer"
            aria-label="Close Travel Guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <span className="text-[10px] font-ticket uppercase tracking-[0.25em] text-[#8C7A65] block mb-1">
              TRAVEL & LOGISTICS GUIDE
            </span>
            <h3 className="text-2xl font-editorial font-bold text-[#0B1B2B] tracking-wide">
              Getting to Taj Exotica, Goa
            </h3>
            <p className="text-xs font-body text-[#55493A] mt-1">
              Calwaddo, Benaulim, South Goa 403716, India
            </p>
          </div>

          {/* Transport Steps */}
          <div className="space-y-4 text-xs font-body">
            {/* Step 1: Airport */}
            <div className="bg-white/80 border border-[#E0D4C2] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-2.5 text-[#0B1B2B] font-ticket font-bold text-sm mb-1.5">
                <Plane className="w-4 h-4 text-[#C6A767]" />
                <span>1. Recommended Airports</span>
              </div>
              <p className="text-[#4A3E31] leading-relaxed">
                <strong>Dabolim Airport (GOI)</strong> is the closest airport (~45 mins drive to South Goa). Alternatively, <strong>Manohar International Airport, Mopa (GOX)</strong> is approx. 1 hr 30 mins away.
              </p>
            </div>

            {/* Step 2: Airport Shuttles */}
            <div className="bg-white/80 border border-[#E0D4C2] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-2.5 text-[#0B1B2B] font-ticket font-bold text-sm mb-1.5">
                <Car className="w-4 h-4 text-[#0B1B2B]" />
                <span>2. Wedding Shuttles & Pickups</span>
              </div>
              <p className="text-[#4A3E31] leading-relaxed">
                Dedicated luxury chauffeur-driven wedding shuttles will be stationed at both Goa airports to bring you comfortably to the resort.
              </p>
              <div className="mt-2 text-[10px] font-ticket bg-[#FAF8F5] p-2 rounded-lg border border-[#EADFD5] text-[#0B1B2B]">
                ✦ Please share your flight details with our hospitality team by June 1st.
              </div>
            </div>

            {/* Recommended Accommodations */}
            <div className="bg-white/80 border border-[#E0D4C2] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-2.5 text-[#0B1B2B] font-ticket font-bold text-sm mb-1.5">
                <Hotel className="w-4 h-4 text-[#9C27B0]" />
                <span>Resort Stay & Amenities</span>
              </div>
              <p className="text-[#4A3E31] leading-relaxed mb-2">
                Luxury garden villas and sea-view rooms are reserved for all our guests at Taj Exotica.
              </p>
              <ul className="text-[#4A3E31] list-disc list-inside space-y-1">
                <li>Direct access to Benaulim Beach</li>
                <li>Jiva Spa & Ayurvedic wellness</li>
                <li>Private golf course & pool</li>
              </ul>
            </div>
          </div>

          {/* Open Google Maps Button */}
          <div className="mt-6 pt-3 border-t border-[#DECFC0]">
            <a
              href="https://maps.google.com/?q=Taj+Exotica+Resort+and+Spa+Goa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 bg-[#0B1B2B] hover:bg-[#16283D] text-[#F5EFEB] rounded-2xl font-ticket font-semibold text-xs tracking-wider transition-all shadow-lg"
            >
              <MapPin className="w-4 h-4 text-[#C6A767]" />
              <span>Open In Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
