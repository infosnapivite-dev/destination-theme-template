import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audio';

export default function TicketHeader() {
  const [isStamped, setIsStamped] = useState(false);

  const handleStamp = () => {
    soundManager.playStampSound();
    setIsStamped(true);
  };

  return (
    <div className="relative p-5 pb-6 bg-[#0B1B2B] text-[#111111] overflow-hidden">
      {/* Background paper texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none paper-texture-dark" />

      {/* The Boarding Pass Ticket Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#F6F3EC] shadow-2xl border border-[#DCD3C3] overflow-hidden gpu-accelerated"
      >
        {/* Top Scalloped Notched Edge Header */}
        <div className="relative pt-6 pb-2 px-6">
          {/* Header Airplane & Text */}
          <div className="flex flex-col items-center justify-center space-y-1.5">
            <span className="text-[10px] tracking-[0.35em] font-body font-semibold text-[#554A3D] uppercase">
              WEDDING TICKET
            </span>

            {/* Custom Modern Airplane SVG Silhouette */}
            <div className="text-[#0B1B2B] my-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 2 11.1 2.3 11 2.8L9.5 9.5L2.8 11.5C2.3 11.6 2 12.1 2 12.6C2 13.1 2.4 13.5 2.9 13.5L9.5 13.2L10.5 19.5L8.5 20.8C8.2 21 8 21.4 8 21.8C8 22.3 8.4 22.7 8.9 22.7L12 22L15.1 22.7C15.6 22.7 16 22.3 16 21.8C16 21.4 15.8 21 15.5 20.8L13.5 19.5L14.5 13.2L21.1 13.5C21.6 13.5 22 13.1 22 12.6C22 12.1 21.7 11.6 21.2 11.5L14.5 9.5L13 2.8C12.9 2.3 12.5 2 12 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vertical Left "DEPARTURE" strip */}
        <div className="absolute left-2.5 top-28 bottom-28 flex items-center justify-center pointer-events-none opacity-40">
          <span className="transform -rotate-90 origin-center text-[8.5px] font-ticket font-bold tracking-[0.35em] text-[#0B1B2B] whitespace-nowrap">
            &#9660; DEPARTURE
          </span>
        </div>

        {/* Ticket Content */}
        <div className="px-7 py-2">
          {/* Authentic Vintage Globe Engraving SVG */}
          <div className="flex justify-center my-2">
            <div className="relative w-28 h-28 rounded-full border border-[#0B1B2B]/25 flex items-center justify-center p-1 bg-[#EFE9DE]/40 shadow-inner">
              <svg viewBox="0 0 120 120" className="w-full h-full text-[#0B1B2B]" fill="none">
                {/* Outer frame ring */}
                <circle cx="60" cy="60" r="54" stroke="#0B1B2B" strokeWidth="0.5" strokeDasharray="2 2" />

                {/* Parallels (Latitude) */}
                <ellipse cx="60" cy="60" rx="54" ry="18" stroke="#0B1B2B" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3 2" />
                <ellipse cx="60" cy="60" rx="54" ry="38" stroke="#0B1B2B" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="6" y1="60" x2="114" y2="60" stroke="#0B1B2B" strokeWidth="0.9" strokeOpacity="0.6" />

                {/* Meridians (Longitude) */}
                <ellipse cx="60" cy="60" rx="18" ry="54" stroke="#0B1B2B" strokeWidth="0.8" strokeOpacity="0.5" />
                <ellipse cx="60" cy="60" rx="38" ry="54" stroke="#0B1B2B" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3 2" />
                <line x1="60" y1="6" x2="60" y2="114" stroke="#0B1B2B" strokeWidth="0.9" strokeOpacity="0.6" />

                {/* Engraved Map Continents */}
                <path
                  d="M52 28 C 58 32, 65 30, 72 38 C 76 44, 70 52, 62 50 C 58 48, 54 42, 50 38 C 48 34, 48 30, 52 28 Z"
                  fill="#0B1B2B"
                  fillOpacity="0.22"
                  stroke="#0B1B2B"
                  strokeWidth="0.8"
                />
                <path
                  d="M62 52 C 72 56, 75 70, 68 84 C 62 92, 54 94, 52 82 C 50 72, 54 62, 62 52 Z"
                  fill="#0B1B2B"
                  fillOpacity="0.22"
                  stroke="#0B1B2B"
                  strokeWidth="0.8"
                />
                <path
                  d="M32 36 C 40 40, 42 50, 36 60 C 30 68, 24 64, 22 52 C 20 42, 24 36, 32 36 Z"
                  fill="#0B1B2B"
                  fillOpacity="0.22"
                  stroke="#0B1B2B"
                  strokeWidth="0.8"
                />
                <path
                  d="M36 64 C 44 68, 46 80, 40 92 C 34 98, 30 92, 28 80 C 26 72, 30 66, 36 64 Z"
                  fill="#0B1B2B"
                  fillOpacity="0.22"
                  stroke="#0B1B2B"
                  strokeWidth="0.8"
                />

                {/* Destination Red Pin (Goa, India) */}
                <circle cx="61" cy="38" r="2.8" fill="#E03E3E" />
                <circle cx="61" cy="38" r="5" stroke="#E03E3E" strokeWidth="0.8" strokeDasharray="2 1" />
              </svg>
            </div>
          </div>

          {/* Names Header */}
          <div className="text-center my-3">
            <h1 className="text-3xl font-editorial tracking-[0.22em] font-semibold text-[#0B1B2B] uppercase">
              AARAV
            </h1>
            <div className="relative my-[-6px]">
              <span className="font-script text-3xl text-[#6B5E4E] italic block transform -rotate-3">
                and
              </span>
            </div>
            <h1 className="text-3xl font-editorial tracking-[0.22em] font-semibold text-[#0B1B2B] uppercase">
              MEERA
            </h1>
          </div>

          {/* Flight Details Table Box */}
          <div className="my-4 border border-[#C5B7A1] rounded-lg overflow-hidden bg-[#FAF7F2] text-[11px]">
            {/* Row 1 */}
            <div className="grid grid-cols-2 border-b border-[#DDD2BF] divide-x divide-[#DDD2BF]">
              <div className="p-2.5">
                <div className="text-[7.5px] font-semibold tracking-wider uppercase text-[#786C5D] font-ticket">
                  FLIGHT & DATE
                </div>
                <div className="font-bold text-[#0B1B2B] tracking-wider text-xs font-ticket mt-0.5">
                  21.06.2025
                </div>
              </div>
              <div className="p-2.5">
                <div className="text-[7.5px] font-semibold tracking-wider uppercase text-[#786C5D] font-ticket">
                  CLASS
                </div>
                <div className="font-bold text-[#0B1B2B] tracking-wider text-xs font-ticket mt-0.5">
                  FIRST CLASS
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 divide-x divide-[#DDD2BF]">
              <div className="p-2.5">
                <div className="text-[7.5px] font-semibold tracking-wider uppercase text-[#786C5D] font-ticket">
                  DESTINATION
                </div>
                <div className="font-semibold text-[#0B1B2B] text-[10.5px] leading-tight font-body mt-0.5">
                  GOA, INDIA
                </div>
              </div>
              <div className="p-2.5">
                <div className="text-[7.5px] font-semibold tracking-wider uppercase text-[#786C5D] font-ticket">
                  WEDDING LOCATION
                </div>
                <div className="font-semibold text-[#0B1B2B] text-[10.5px] leading-tight font-body mt-0.5">
                  TAJ EXOTICA, GOA
                </div>
              </div>
            </div>
          </div>

          {/* Postal Rubber Stamps & Wavy Lines */}
          <div className="pt-1 pb-3 flex items-center justify-between">
            {/* Interactive Stamp Container */}
            <div
              onClick={handleStamp}
              className="cursor-pointer group select-none relative"
              title="Click to stamp ticket!"
            >
              <svg
                width="132"
                height="62"
                viewBox="0 0 132 62"
                className="overflow-visible"
              >
                <defs>
                  {/* Upper arc for AARAV & MEERA */}
                  <path id="sealTopArcHeader" d="M 9 31 A 21 21 0 1 1 51 31" fill="none" />
                  {/* Lower arc for GOA • 21 JUN 2025 */}
                  <path id="sealBottomArcHeader" d="M 51 31 A 21 21 0 0 1 9 31" fill="none" />
                </defs>

                {/* Circular Postal Stamp */}
                <g transform="rotate(-6 30 31)">
                  {/* Outer Circle Ring */}
                  <circle cx="30" cy="31" r="28" stroke="#0B1B2B" strokeWidth="1.2" fill="none" strokeOpacity="0.85" />
                  
                  {/* Inner Dashed Ring */}
                  <circle cx="30" cy="31" r="24.5" stroke="#0B1B2B" strokeWidth="0.8" strokeDasharray="3 2" fill="none" strokeOpacity="0.75" />

                  {/* Top Curved Text: AARAV & MEERA */}
                  <text
                    fontFamily="'Space Mono', monospace"
                    fontSize="4.8"
                    fontWeight="700"
                    fill="#0B1B2B"
                    letterSpacing="0.8px"
                    opacity="0.9"
                  >
                    <textPath href="#sealTopArcHeader" startOffset="50%" textAnchor="middle">
                      AARAV &amp; MEERA
                    </textPath>
                  </text>

                  {/* Center Passenger Jet Silhouette */}
                  <g transform="translate(30, 31) scale(0.65) translate(-12, -12)">
                    <path
                      d="M12 2C11.5 2 11.1 2.3 11 2.8L9.5 9.5L2.8 11.5C2.3 11.6 2 12.1 2 12.6C2 13.1 2.4 13.5 2.9 13.5L9.5 13.2L10.5 19.5L8.5 20.8C8.2 21 8 21.4 8 21.8C8 22.3 8.4 22.7 8.9 22.7L12 22L15.1 22.7C15.6 22.7 16 22.3 16 21.8C16 21.4 15.8 21 15.5 20.8L13.5 19.5L14.5 13.2L21.1 13.5C21.6 13.5 22 13.1 22 12.6C22 12.1 21.7 11.6 21.2 11.5L14.5 9.5L13 2.8C12.9 2.3 12.5 2 12 2Z"
                      fill="#0B1B2B"
                    />
                  </g>

                  {/* Bottom Curved Text: GOA • 21 JUN 2025 */}
                  <text
                    fontFamily="'Space Mono', monospace"
                    fontSize="4.6"
                    fontWeight="700"
                    fill="#0B1B2B"
                    letterSpacing="0.8px"
                    opacity="0.9"
                  >
                    <textPath href="#sealBottomArcHeader" startOffset="50%" textAnchor="middle">
                      GOA • 21 JUN 2025
                    </textPath>
                  </text>
                </g>

                {/* Red PASSED Stamp Overlay */}
                {isStamped && (
                  <g transform="translate(30, 31) rotate(-14)">
                    <rect
                      x="-22"
                      y="-8"
                      width="44"
                      height="16"
                      rx="3"
                      fill="#E03E3E"
                      fillOpacity="0.12"
                      stroke="#E03E3E"
                      strokeWidth="1.4"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill="#E03E3E"
                      fontFamily="'Space Mono', monospace"
                      fontSize="7"
                      fontWeight="700"
                      letterSpacing="1.5px"
                    >
                      PASSED
                    </text>
                  </g>
                )}

                {/* 4 Smooth Sinusoidal Wavy Cancellation Postmark Lines */}
                <g transform="translate(63, 17)" stroke="#0B1B2B" strokeWidth="1.1" fill="none" opacity="0.8">
                  <path d="M 0 4 C 10 -1, 20 9, 30 4 S 50 -1, 62 4" />
                  <path d="M 0 10 C 10 5, 20 15, 30 10 S 50 5, 62 10" />
                  <path d="M 0 16 C 10 11, 20 21, 30 16 S 50 11, 62 16" />
                  <path d="M 0 22 C 10 17, 20 27, 30 22 S 50 17, 62 22" />
                </g>
              </svg>
            </div>

            {/* "Two Are One" Motif Stamp */}
            <div className="text-right pr-1">
              <span className="font-script text-2xl text-[#0B1B2B]/85 block leading-tight">
                Two Are
              </span>
              <span className="font-script text-2xl text-[#0B1B2B]/85 block leading-tight -mt-1">
                One
              </span>
            </div>
          </div>
        </div>

        {/* Dotted Perforation Line with Side Notches */}
        <div className="relative flex items-center justify-center my-1">
          <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#0B1B2B]" />
          <div className="w-full border-b border-dashed border-[#C5B8A3] mx-5" />
          <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#0B1B2B]" />
        </div>

        {/* Footer Tagline */}
        <div className="py-3 px-6 text-center">
          <span className="text-[9px] font-ticket font-bold tracking-[0.3em] text-[#0B1B2B] uppercase">
            BOARDING FOR LOVE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
