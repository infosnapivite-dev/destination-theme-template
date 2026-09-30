import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function ThankYouSection() {
  return (
    <section
      className="relative px-6 pt-16 pb-24 text-[#FAF8F5] overflow-hidden gpu-accelerated text-center"
      style={{ position: 'relative', zIndex: 10 }}
    >
      {/* Background Starry Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none paper-texture-dark"
        style={{ zIndex: 1 }}
      />

      {/* Main Foreground Content (z-index 20: Layered cleanly on top of flight path at z-index 5) */}
      <div
        className="relative max-w-[340px] mx-auto space-y-7"
        style={{ position: 'relative', zIndex: 20 }}
      >
        {/* Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
          style={{ position: 'relative', zIndex: 20 }}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-ticket text-[#C6A767] uppercase tracking-widest backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-[#C6A767]" />
            <span>WITH ENDLESS GRATITUDE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-editorial tracking-[0.2em] font-medium uppercase text-[#FAF8F5] leading-tight pt-1 drop-shadow-sm">
            THANK YOU
          </h2>

          <p className="font-script text-3xl sm:text-4xl text-[#C6A767]">
            Dhanyawaad &amp; Endless Love
          </p>
        </motion.div>

        {/* Heartfelt Message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            zIndex: 20,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity'
          }}
          className="space-y-2"
        >
          <p className="text-[12px] font-body text-[#D1D9E0]/95 leading-[1.8] font-light max-w-[290px] mx-auto drop-shadow-sm">
            Thank you for celebrating our wedding with us in Goa.<br />
            Your love, laughter, and warm blessings mean the world to us.
          </p>
        </motion.div>

        {/* Decorative Golden Vintage Seal Stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex justify-center my-3"
          style={{ position: 'relative', zIndex: 20 }}
        >
          <div className="w-16 h-16 rounded-full border border-dashed border-[#C6A767]/70 flex flex-col items-center justify-center p-1 bg-[#0B1B2B]/60 backdrop-blur-xs shadow-md">
            <span className="text-[5.5px] font-ticket font-bold uppercase tracking-wider text-[#C6A767]">
              GOA, INDIA
            </span>
            <Heart className="w-3.5 h-3.5 fill-[#C6A767] text-[#C6A767] my-0.5" />
            <span className="text-[5.5px] font-ticket font-bold uppercase tracking-wider text-[#C6A767]">
              21.06.2025
            </span>
          </div>
        </motion.div>

        {/* Final Signatures */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pt-2 space-y-2 text-[#D1D9E0]/80"
          style={{ position: 'relative', zIndex: 20 }}
        >
          <div className="font-script text-4xl text-[#C6A767] drop-shadow-sm">
            Aarav &amp; Meera
          </div>
          <div className="text-[9px] font-ticket tracking-widest uppercase text-[#FAF8F5]/90">
            JUNE 21, 2025 • GOA, INDIA
          </div>
          <p className="text-[9px] font-body text-[#8C9AA8] pt-1">
            #AaravAndMeera2025 • Safe Travels &amp; Endless Blessings
          </p>
        </motion.div>

        {/* Minimal Company Instagram Redirect Link (Bottom Right Corner) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="pt-10 pb-1 flex items-center justify-end"
          style={{ position: 'relative', zIndex: 20 }}
        >
          <a
            href="https://www.instagram.com/snapivite/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-[#FAF8F5]/45 hover:text-[#C6A767] transition-all duration-300 group cursor-pointer pr-1"
            title="Follow Snapivite on Instagram"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 text-[#C6A767]/70 group-hover:text-[#C6A767] transition-colors"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="text-[9.5px] font-ticket tracking-[0.22em] lowercase font-normal">
              snapivite
            </span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

