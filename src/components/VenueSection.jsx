import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function VenueSection() {
  const handleDirections = () => {
    soundManager.playStampSound();
    const mapUrl = 'https://maps.google.com/?q=Taj+Exotica+Resort+and+Spa+Goa';
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative px-4 py-14 bg-[#0B1B2B] text-[#111111] overflow-hidden gpu-accelerated">
      {/* Background dark texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none paper-texture-dark" />

      {/* Postage Stamp Border Card (Layered z-20 with smooth entrance) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 26 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity'
        }}
        className="relative z-20 max-w-[340px] mx-auto bg-[#F6F3EC] rounded-xl shadow-2xl border border-[#DCD3C3] overflow-hidden"
      >
        {/* Top Scalloped Stamp Perforation Border */}
        <div className="relative pt-8 pb-4 px-6">
          {/* Top Right Vintage Postal Rubber Stamp & Cancellation Postmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, rotate: -18 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className="absolute top-3 right-2.5 z-10 pointer-events-none select-none"
          >
            <svg
              width="88"
              height="58"
              viewBox="0 0 88 58"
              className="overflow-visible"
            >
              <defs>
                {/* Upper arc for TAJ EXOTICA • GOA */}
                <path id="venueSealTopArc" d="M 6 29 A 23 23 0 1 1 52 29" fill="none" />
                {/* Lower arc for 21 JUN 2025 • INDIA */}
                <path id="venueSealBottomArc" d="M 52 29 A 23 23 0 0 1 6 29" fill="none" />
              </defs>

              {/* Circular Rubber Stamp */}
              <g transform="rotate(-5 29 29)">
                {/* Outer Ring */}
                <circle cx="29" cy="29" r="26" stroke="#0B1B2B" strokeWidth="1.2" fill="none" strokeOpacity="0.85" />
                {/* Inner Dashed Ring */}
                <circle cx="29" cy="29" r="22.5" stroke="#0B1B2B" strokeWidth="0.75" strokeDasharray="3 2" fill="none" strokeOpacity="0.7" />

                {/* Top Curved Text */}
                <text
                  fontFamily="'Space Mono', monospace"
                  fontSize="4.2"
                  fontWeight="700"
                  fill="#0B1B2B"
                  letterSpacing="0.8px"
                  opacity="0.9"
                >
                  <textPath href="#venueSealTopArc" startOffset="50%" textAnchor="middle">
                    TAJ EXOTICA • GOA
                  </textPath>
                </text>

                {/* Center Airplane Jet Icon */}
                <g transform="translate(29, 29) scale(0.58) translate(-12, -12)">
                  <path
                    d="M12 2C11.5 2 11.1 2.3 11 2.8L9.5 9.5L2.8 11.5C2.3 11.6 2 12.1 2 12.6C2 13.1 2.4 13.5 2.9 13.5L9.5 13.2L10.5 19.5L8.5 20.8C8.2 21 8 21.4 8 21.8C8 22.3 8.4 22.7 8.9 22.7L12 22L15.1 22.7C15.6 22.7 16 22.3 16 21.8C16 21.4 15.8 21 15.5 20.8L13.5 19.5L14.5 13.2L21.1 13.5C21.6 13.5 22 13.1 22 12.6C22 12.1 21.7 11.6 21.2 11.5L14.5 9.5L13 2.8C12.9 2.3 12.5 2 12 2Z"
                    fill="#0B1B2B"
                    opacity="0.85"
                  />
                </g>

                {/* Bottom Curved Text */}
                <text
                  fontFamily="'Space Mono', monospace"
                  fontSize="4"
                  fontWeight="700"
                  fill="#0B1B2B"
                  letterSpacing="0.8px"
                  opacity="0.9"
                >
                  <textPath href="#venueSealBottomArc" startOffset="50%" textAnchor="middle">
                    21 JUN 2025 • INDIA
                  </textPath>
                </text>
              </g>

              {/* Wavy Cancellation Postmark Lines extending to the right */}
              <g transform="translate(58, 16)" stroke="#0B1B2B" strokeWidth="0.9" fill="none" opacity="0.75">
                <path d="M 0 3 C 8 -1, 16 7, 26 3" />
                <path d="M 0 9 C 8 5, 16 13, 26 9" />
                <path d="M 0 15 C 8 11, 16 19, 26 15" />
                <path d="M 0 21 C 8 17, 16 25, 26 21" />
              </g>
            </svg>
          </motion.div>

          {/* Section Header: VENUE + Airplane Silhouette */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-2"
          >
            <h2 className="text-2xl font-editorial tracking-[0.22em] font-semibold text-[#0B1B2B] uppercase">
              VENUE
            </h2>
            <div className="flex justify-center text-[#0B1B2B] mt-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9.5 9.5L2.8 11.5L9.5 13.2L10.5 19.5L12 22L13.5 19.5L14.5 13.2L21.2 11.5L14.5 9.5Z" />
              </svg>
            </div>
          </motion.div>

          {/* Venue Name & Address */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-center space-y-1 my-3"
          >
            <h3 className="text-xs sm:text-sm font-cinzel font-bold text-[#0B1B2B] tracking-wider uppercase">
              TAJ EXOTICA RESORT & SPA
            </h3>
            <p className="text-[9px] font-ticket tracking-wider text-[#665B4C] uppercase">
              BENAULIM, SOUTH GOA 403716, INDIA
            </p>
          </motion.div>

          {/* "DIRECTION" Button (Direct Link to Google Maps) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="my-3.5 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleDirections}
              className="group px-6 py-2.5 bg-[#0B1B2B] hover:bg-[#16283D] text-[#FAF8F5] rounded-full text-[10.5px] font-ticket font-bold tracking-[0.22em] uppercase transition-all shadow-md flex items-center space-x-2 cursor-pointer border border-white/10"
              title="Open venue location in Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C6A767] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>DIRECTION</span>
            </motion.button>
          </motion.div>

          {/* Architectural Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="relative rounded-lg overflow-hidden border border-[#C5B8A3] shadow-md aspect-[4/3] bg-[#222] my-3"
          >
            <img
              src="/images/venue.jpg"
              alt="Taj Exotica Resort & Spa Goa"
              className="w-full h-full object-cover object-center filter grayscale contrast-115 brightness-95"
            />
          </motion.div>
        </div>

        {/* Bottom Scallop Perforation Cutouts */}
        <div className="h-4 bg-[#F6F3EC] border-t border-dashed border-[#DCD3C3]" />
      </motion.div>
    </section>
  );
}
