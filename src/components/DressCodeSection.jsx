import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

import w1 from '../assets/w1.png';
import w2 from '../assets/w2.png';
import w3 from '../assets/w3.png';
import w4 from '../assets/w4.png';

export default function DressCodeSection() {
  const [currentIndex, setCurrentIndex] = useState(0); // 0: [w1, w2], 1: [w3, w4]

  const palette = [
    { name: 'MARIGOLD', color: '#F59E0B', border: '#D97706' },
    { name: 'RANI PINK', color: '#E11D48', border: '#BE185D' },
    { name: 'SAGE GREEN', color: '#84A98C', border: '#52796F' },
    { name: 'IVORY GOLD', color: '#FAF5E4', border: '#D4AF37' },
    { name: 'ROYAL NAVY', color: '#0B1B2B', border: '#1E293B' }
  ];

  const slides = [
    [
      { src: w1, alt: 'Wardrobe Inspiration 1' },
      { src: w2, alt: 'Wardrobe Inspiration 2' }
    ],
    [
      { src: w3, alt: 'Wardrobe Inspiration 3' },
      { src: w4, alt: 'Wardrobe Inspiration 4' }
    ]
  ];

  const handlePrev = () => {
    if (currentIndex > 0) {
      soundManager.playStampSound();
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      soundManager.playStampSound();
      setCurrentIndex(1);
    }
  };

  return (
    <section className="relative px-5 py-14 bg-[#F6F3EC] text-[#111111] overflow-hidden gpu-accelerated paper-texture">
      <div className="relative z-10 max-w-[350px] mx-auto text-center space-y-7">
        
        {/* Header: WARDROBE */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <h2 className="text-[22px] sm:text-[24px] font-editorial tracking-[0.22em] font-semibold text-[#0B1B2B] uppercase">
            WARDROBE
          </h2>
          <p className="text-[11px] font-body text-[#5A5043] leading-[1.6] max-w-[290px] mx-auto font-light">
            We would love to see our family and friends in vibrant Indian festive attire and royal elegance.<br />
            Our color palette for the celebrations:
          </p>
        </motion.div>

        {/* 5-Color Palette Swatches */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-5 gap-2 px-1"
        >
          {palette.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + idx * 0.08, ease: 'backOut' }}
              className="flex flex-col items-center space-y-2"
            >
              <div
                className="w-10 h-10 rounded-full shadow-xs"
                style={{
                  backgroundColor: item.color,
                  border: `1.5px solid ${item.border}`
                }}
              />
              <span className="text-[8px] font-ticket font-bold tracking-wider text-[#4A4033] uppercase">
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Horizontal Attire Carousel (2 PNGs at a time, slide to reveal other 2) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative pt-2"
        >
          {/* Draggable & Touch-Swipeable Container */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -35 && currentIndex === 0) {
                handleNext();
              } else if (offset.x > 35 && currentIndex === 1) {
                handlePrev();
              }
            }}
            className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: currentIndex === 1 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentIndex === 1 ? -50 : 50 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-3 items-end justify-center min-h-[290px] sm:min-h-[320px] px-1"
              >
                {slides[currentIndex].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center justify-end h-full group"
                  >
                    <div className="relative w-full h-[270px] sm:h-[300px] flex items-end justify-center">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(11,27,43,0.18)] transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Carousel Navigation & Indicators */}
          <div className="flex items-center justify-between px-2 pt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border border-[#D5C7B3] transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-25 cursor-not-allowed text-[#A09383]'
                  : 'bg-[#EBE2D4] hover:bg-[#DDD2C0] text-[#0B1B2B] shadow-sm'
              }`}
              aria-label="Previous attire"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  soundManager.playStampSound();
                  setCurrentIndex(0);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === 0
                    ? 'w-6 bg-[#0B1B2B]'
                    : 'w-2 bg-[#0B1B2B]/25 hover:bg-[#0B1B2B]/50'
                }`}
                aria-label="Slide 1"
              />
              <button
                onClick={() => {
                  soundManager.playStampSound();
                  setCurrentIndex(1);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === 1
                    ? 'w-6 bg-[#0B1B2B]'
                    : 'w-2 bg-[#0B1B2B]/25 hover:bg-[#0B1B2B]/50'
                }`}
                aria-label="Slide 2"
              />
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === 1}
              className={`p-2 rounded-full border border-[#D5C7B3] transition-all cursor-pointer ${
                currentIndex === 1
                  ? 'opacity-25 cursor-not-allowed text-[#A09383]'
                  : 'bg-[#EBE2D4] hover:bg-[#DDD2C0] text-[#0B1B2B] shadow-sm'
              }`}
              aria-label="Next attire"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Footer Signature */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-6 pb-2 border-t border-[#DCD3C3] space-y-1"
        >
          <div className="font-script text-2xl text-[#6B5E4E]">
            Aarav &amp; Meera
          </div>
          <div className="text-[8px] font-ticket tracking-widest text-[#786C5D] uppercase">
            21.06.2025 • GOA, INDIA
          </div>
        </motion.div>

      </div>
    </section>
  );
}
