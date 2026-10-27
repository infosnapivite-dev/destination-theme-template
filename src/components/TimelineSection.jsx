import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Sparkles, ChevronRight, Info } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function TimelineSection() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 'mehendi',
      time: '11:00 AM',
      title: 'Mehendi & Welcome Brunch',
      venue: 'Poolside Lawns, Taj Exotica',
      shortVenue: 'Poolside Lawns',
      attire: 'Floral & Pastel Festive / Cheerful Chic',
      description: 'Kick off the celebrations with vibrant henna artistry, refreshing tropical cocktails, live acoustic Sufi melodies, and a sun-kissed Goan brunch by the pool.',
      highlight: 'Live Henna Artists & Coconut Cocktail Bar'
    },
    {
      id: 'haldi',
      time: '04:30 PM',
      title: 'Haldi & Phoolon Ki Holi',
      venue: 'Beachside Palm Grove',
      shortVenue: 'Beachside Palm Grove',
      attire: 'Bright Yellows & Marigolds',
      description: 'An auspicious and joyful ceremony applying turmeric paste with blessings, followed by an exhilarating Phoolon Ki Holi with organic fragrant flower petals.',
      highlight: 'Phoolon Ki Holi & Punjabi Dhol Beats'
    },
    {
      id: 'sangeet',
      time: '07:30 PM',
      title: 'Sangeet & Cocktail Night',
      venue: 'Grand Sala Ballroom & Sunset Deck',
      shortVenue: 'Grand Sala Ballroom',
      attire: 'Glamorous Indo-Western Lehengas & Tuxedos',
      description: 'An electrifying evening filled with high-energy family dance performances, craft mixology, gourmet dining, and non-stop DJ beats under the Goan stars.',
      highlight: 'Live Band, Signature Cocktails & DJ Party'
    },
    {
      id: 'baraat',
      time: '04:00 PM',
      title: 'Baraat & Varmala',
      venue: 'Resort Promenade & Main Courtyard',
      shortVenue: 'Resort Promenade',
      attire: 'Royal Ethnic & Traditional Splendor',
      description: 'A grand royal groom procession with brass band beats, dancing, and royal fanfare, followed by the enchanting exchange of floral garlands (Varmala).',
      highlight: 'Royal Brass Band, Rose Petal Showers & Safa Tying'
    },
    {
      id: 'pheras',
      time: '05:30 PM',
      title: 'Pheras (Sunset Ceremony)',
      venue: 'Oceanfront Beach Mandap',
      shortVenue: 'Oceanfront Mandap',
      attire: 'Traditional Indian / Royal Ivory & Pastel Gold',
      description: 'The sacred wedding vows and seven circumambulations around the holy fire as the sun sets over the Arabian Sea waves.',
      highlight: 'Sunset Mandap, Sacred Vows & Vedic Chants'
    },
    {
      id: 'reception',
      time: '08:30 PM',
      title: 'Grand Reception & Dinner',
      venue: 'Royal Banquet Lawns',
      shortVenue: 'Royal Banquet Lawns',
      attire: 'Royal Formal & Black Tie Glamour',
      description: 'An opulent celebratory banquet dinner, heartfelt champagne toasts, wedding cake cutting, and dancing late into the magical night.',
      highlight: 'Multi-Cuisine Royal Feast & Fireworks'
    }
  ];

  const handleEventClick = (item) => {
    soundManager.playStampSound();
    setSelectedEvent(item);
  };

  const handleCloseModal = () => {
    soundManager.playStampSound();
    setSelectedEvent(null);
  };

  return (
    <section className="relative px-6 py-20 text-[#FAF8F5] overflow-hidden gpu-accelerated">
      {/* Background Starry texture (Layer 0: Behind flight path) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none paper-texture-dark -z-10" />

      {/* Main Content (Layer 20: In front of flight path at z-10) */}
      <div className="relative max-w-[340px] mx-auto" style={{ position: 'relative', zIndex: 20 }}>
        
        {/* Header */}
        <div className="relative mb-12 text-center space-y-2" style={{ position: 'relative', zIndex: 20 }}>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[22px] sm:text-[24px] font-editorial tracking-[0.24em] font-medium uppercase text-[#FAF8F5]"
          >
            EVENTS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[10px] font-body text-[#C6A767]/90 tracking-wider italic"
          >
            Tap any event to view ceremony details &amp; dress code
          </motion.p>
        </div>

        {/* Timeline Events List */}
        <div className="relative" style={{ position: 'relative', zIndex: 20 }}>
          <div className="space-y-0">
            {events.map((item, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === events.length - 1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleEventClick(item)}
                  className="group relative flex items-center cursor-pointer py-1.5"
                  title={`Click for ${item.title} details`}
                >
                  {/* Dedicated Timeline Track Column (Width: 32px / w-8, centered line & node) */}
                  <div className="relative flex items-center justify-center w-8 flex-shrink-0 self-stretch">
                    {/* Upward Connecting Line: Connects top of this row to center of node */}
                    {!isFirst && (
                      <div className="absolute top-0 bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] flex justify-center pointer-events-none">
                        {/* Luminous Ambient Glow Rail */}
                        <div className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-[#C6A767]/35 to-[#C6A767]/25" />
                        {/* Crisp Dashed Flight Path */}
                        <div className="absolute inset-y-0 w-0 border-l-[1.5px] border-dashed border-[#FAF8F5]/60 group-hover:border-[#C6A767] transition-colors" />
                      </div>
                    )}

                    {/* Downward Connecting Line: Connects center of node to bottom of this row */}
                    {!isLast && (
                      <div className="absolute top-1/2 bottom-0 left-1/2 -translate-x-1/2 w-[2px] flex justify-center pointer-events-none">
                        {/* Luminous Ambient Glow Rail */}
                        <div className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-[#C6A767]/25 to-[#C6A767]/35" />
                        {/* Crisp Dashed Flight Path */}
                        <div className="absolute inset-y-0 w-0 border-l-[1.5px] border-dashed border-[#FAF8F5]/60 group-hover:border-[#C6A767] transition-colors" />
                      </div>
                    )}

                    {/* Circular Milestone Waypoint Node (Centered at 16px horizontally & vertically) */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.08, ease: 'backOut' }}
                      className="relative z-20 w-[18px] h-[18px] rounded-full bg-[#0B1B2B] border-[1.5px] border-[#C6A767] group-hover:border-[#FAF8F5] group-hover:ring-4 group-hover:ring-[#C6A767]/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-[0_0_12px_rgba(11,27,43,0.95)]"
                    >
                      {/* Inner Glowing Gold Core */}
                      <div className="w-2 h-2 rounded-full bg-[#C6A767] shadow-[0_0_6px_rgba(198,167,103,0.9)] group-hover:scale-125 group-hover:bg-[#FAF8F5] group-hover:shadow-[0_0_10px_rgba(250,248,245,0.95)] transition-all duration-300" />
                    </motion.div>
                  </div>

                  {/* Event Details Content Card */}
                  <div className="flex-1 min-w-0 pl-2">
                    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-transparent transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/10 group-hover:translate-x-1">
                      {/* Event Title */}
                      <span className="text-[12.5px] font-body font-normal text-[#FAF8F5] group-hover:text-[#C6A767] transition-colors tracking-wide leading-snug pr-2">
                        {item.title}
                      </span>

                      {/* Time Badge & Chevron */}
                      <div className="flex items-center space-x-1 flex-shrink-0 whitespace-nowrap pl-1">
                        <span className="text-[11px] font-ticket font-bold text-[#FAF8F5]/90 bg-white/[0.04] border border-white/10 group-hover:border-[#C6A767]/50 group-hover:text-[#FAF8F5] px-2 py-0.5 rounded transition-all tracking-wider">
                          {item.time}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#C6A767] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Event Details Modal Card */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            {/* Backdrop Click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto bg-[#F6F3EC] text-[#111111] rounded-3xl p-6 shadow-2xl border border-[#DDD3C2] z-10 paper-texture subtle-scrollbar space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#E5D7C2]/70 hover:bg-[#D4C3AB] text-[#0B1B2B] transition-colors cursor-pointer"
                aria-label="Close Event Details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Event Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0B1B2B] text-[#C6A767] text-[8.5px] font-ticket font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-[#C6A767]" />
                <span>CEREMONY DETAILS</span>
              </div>

              {/* Event Title & Time */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#0B1B2B] uppercase tracking-wide leading-tight">
                  {selectedEvent.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs font-ticket font-semibold text-[#665B4C] pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#0B1B2B]" />
                  <span>{selectedEvent.time} • 21.06.2025</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-[#C5B8A3]" />

              {/* Details Breakdown */}
              <div className="space-y-3.5 text-xs font-body text-[#3A3026]">
                {/* Location */}
                <div className="bg-white/80 border border-[#E0D4C2] rounded-xl p-3 shadow-xs space-y-1">
                  <div className="flex items-center space-x-2 text-[#0B1B2B] font-ticket font-bold text-[11px] uppercase">
                    <MapPin className="w-3.5 h-3.5 text-[#C6A767]" />
                    <span>Venue Location</span>
                  </div>
                  <p className="text-[#4A3E31] leading-relaxed pl-5 font-medium">
                    {selectedEvent.venue}
                  </p>
                </div>

                {/* Attire Tip */}
                <div className="bg-white/80 border border-[#E0D4C2] rounded-xl p-3 shadow-xs space-y-1">
                  <div className="flex items-center space-x-2 text-[#0B1B2B] font-ticket font-bold text-[11px] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Dress Code &amp; Palette</span>
                  </div>
                  <p className="text-[#4A3E31] leading-relaxed pl-5 font-medium">
                    {selectedEvent.attire}
                  </p>
                </div>

                {/* Ceremony Description */}
                <div className="bg-white/80 border border-[#E0D4C2] rounded-xl p-3 shadow-xs space-y-1">
                  <div className="flex items-center space-x-2 text-[#0B1B2B] font-ticket font-bold text-[11px] uppercase">
                    <Info className="w-3.5 h-3.5 text-[#0B1B2B]" />
                    <span>About the Ceremony</span>
                  </div>
                  <p className="text-[#4A3E31] leading-relaxed pl-5 font-light">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>

              {/* Footer Close Action */}
              <div className="pt-2">
                <button
                  onClick={handleCloseModal}
                  className="w-full py-2.5 bg-[#0B1B2B] hover:bg-[#16283D] text-[#FAF8F5] rounded-xl text-xs font-ticket font-bold tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer text-center"
                >
                  GOT IT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
