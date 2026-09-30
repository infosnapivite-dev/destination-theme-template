import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CalendarPlus } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function SaveTheDateSection() {
  // Calendar dates for June 2025 (Monday-Sunday format)
  const calendarWeeks = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, null, null, null, null, null, null]
  ];

  const handleHeartClick = () => {
    soundManager.playChimeSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E03E3E', '#C6A767', '#0B1B2B', '#FAF8F5']
    });
  };

  const handleAddToCalendar = () => {
    soundManager.playChimeSound();
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#C6A767', '#0B1B2B', '#E03E3E', '#FAF8F5']
    });

    const eventTitle = encodeURIComponent("Aarav & Meera's Wedding Celebration");
    const eventDetails = encodeURIComponent("Wedding Celebration of Aarav & Meera in Goa, India at Taj Exotica Resort & Spa. Boarding for love!");
    const eventLocation = encodeURIComponent("Taj Exotica Resort & Spa, Benaulim, South Goa 403716, India");
    const dates = "20250621T053000Z/20250622T183000Z";
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${dates}&details=${eventDetails}&location=${eventLocation}`;
    
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative px-5 py-18 bg-[#0B1B2B] text-[#111111] overflow-hidden gpu-accelerated">
      {/* Calendar Card Container (Layered z-20 with smooth appearing entrance) */}
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
        className="relative z-20 max-w-[340px] mx-auto bg-[#F6F3EC] rounded-3xl p-8 sm:p-9 shadow-2xl border border-[#DDD3C2] paper-texture"
      >
        {/* Month Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-editorial font-bold tracking-[0.22em] text-[#0B1B2B] uppercase">
            JUNE 2025
          </h2>
        </motion.div>

        {/* Days of Week Header (M T W T F S S) */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-7 text-center mb-3 font-ticket text-[11.5px] font-semibold text-[#5A5043]"
        >
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </motion.div>

        {/* Calendar Days Grid with Individual Appearing Animation */}
        <div className="space-y-2.5 font-body text-xs text-[#2A231C]">
          {calendarWeeks.map((week, wIdx) => (
            <div
              key={wIdx}
              className="grid grid-cols-7 text-center items-center"
            >
              {week.map((day, dIdx) => {
                if (day === null) {
                  return <div key={dIdx} className="h-8 flex items-center justify-center text-transparent">-</div>;
                }

                const isTargetDay = day === 21;
                const dayDelay = 0.08 + day * 0.016;

                return (
                  <div key={dIdx} className="h-8 flex items-center justify-center">
                    {isTargetDay ? (
                      <motion.button
                        initial={{ opacity: 0, scale: 0, rotate: -20 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: dayDelay, ease: 'backOut' }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleHeartClick}
                        className="relative w-8 h-8 flex items-center justify-center cursor-pointer focus:outline-none"
                        title="Aarav & Meera's Wedding Day! Click for confetti"
                      >
                        {/* Red Heart Shape SVG */}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-8 h-8 fill-[#E03E3E] text-[#E03E3E] drop-shadow-md"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold font-ticket text-[11px] pt-0.5">
                          21
                        </span>
                      </motion.button>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.4, y: 6 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: dayDelay, ease: 'easeOut' }}
                        className="font-medium text-[#2E2822] text-xs inline-block"
                      >
                        {day}
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Dotted Perforation Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-6 border-t border-dashed border-[#C5B8A3]"
        />

        {/* Save The Date Footer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center space-y-3"
        >
          <div className="space-y-1">
            <span className="text-[9.5px] font-body tracking-[0.3em] font-semibold text-[#665B4C] uppercase block">
              SAVE THE DATE
            </span>
            <div className="text-2xl sm:text-3xl font-ticket font-bold tracking-widest text-[#0B1B2B]">
              21.06.2025
            </div>
          </div>

          {/* ADD TO CALENDAR Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-1 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCalendar}
              className="group relative px-6 py-2.5 rounded-full bg-[#0B1B2B] hover:bg-[#16283D] text-[#FAF8F5] text-[10.5px] font-ticket font-bold tracking-[0.22em] uppercase transition-all shadow-md flex items-center space-x-2 cursor-pointer border border-white/10"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#C6A767] group-hover:rotate-12 transition-transform" />
              <span>ADD TO CALENDAR</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
