import React from 'react';
import { motion } from 'framer-motion';

export default function HomeSection() {
  return (
    <section className="relative pt-20 sm:pt-24 pb-14 sm:pb-16 bg-[#0B1B2B] text-[#FAF8F5] overflow-hidden gpu-accelerated">
      {/* Background Starry texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none paper-texture-dark" />

      <div className="relative z-10 w-full text-center space-y-8 sm:space-y-10">
        
        {/* Top Header: 2-Row Welcome Line & Couple Name (Placed lower with generous spacing) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity'
          }}
          className="px-6 space-y-3.5"
        >
          {/* 2-Row Welcome Line */}
          <div className="space-y-1.5">
            <h2 className="text-[11px] sm:text-[12px] font-ticket font-semibold tracking-[0.38em] text-[#C6A767] uppercase leading-relaxed">
              WELCOME TO THE
            </h2>
            <h2 className="text-[11px] sm:text-[12px] font-ticket font-semibold tracking-[0.38em] text-[#FAF8F5]/90 uppercase leading-relaxed">
              WEDDING CELEBRATION OF
            </h2>
          </div>

          {/* Couple Name */}
          <div className="pt-2">
            <h1 className="text-3xl sm:text-4xl font-editorial tracking-[0.24em] font-medium uppercase text-[#FAF8F5] drop-shadow-sm">
              AARAV &amp; MEERA
            </h1>
            <div className="text-[9.5px] font-ticket tracking-[0.32em] uppercase text-[#C6A767]/90 mt-2 flex items-center justify-center space-x-2">
              <span>GOA, INDIA</span>
              <span className="text-[#FAF8F5]/40">•</span>
              <span>21.06.2025</span>
            </div>
          </div>
        </motion.div>

        {/* Full-Width Couple Image touching left & right border, blended top & bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity'
          }}
          className="relative w-full overflow-hidden"
        >
          {/* Image Container with vertical blend masks */}
          <div
            className="relative w-full h-[360px] sm:h-[400px] bg-[#0B1B2B]"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.85) 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.85) 85%, transparent 100%)'
            }}
          >
            <img
              src="/images/couple.jpg"
              alt="Aarav & Meera"
              className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95"
            />

            {/* Top Blend Overlay */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B1B2B] via-[#0B1B2B]/70 to-transparent pointer-events-none" />

            {/* Bottom Blend Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1B2B] via-[#0B1B2B]/70 to-transparent pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
