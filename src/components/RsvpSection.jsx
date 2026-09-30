import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Send, Music, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function RsvpSection() {
  const [formData, setFormData] = useState(() => {
    try {
      const savedRsvp = localStorage.getItem('lauren_marco_rsvp');
      if (savedRsvp) {
        return JSON.parse(savedRsvp);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      name: '',
      email: '',
      attendance: 'attending',
      guests: '1',
      dietary: '',
      songRequest: ''
    };
  });

  const [isSubmitted, setIsSubmitted] = useState(() => {
    return Boolean(localStorage.getItem('lauren_marco_rsvp'));
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    soundManager.playChimeSound();

    setTimeout(() => {
      localStorage.setItem('lauren_marco_rsvp', JSON.stringify(formData));
      setIsSubmitted(true);
      setLoading(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#C6A767', '#0B1B2B', '#E03E3E', '#FAF8F5']
      });
    }, 600);
  };

  const handleReset = () => {
    localStorage.removeItem('lauren_marco_rsvp');
    setIsSubmitted(false);
  };

  return (
    <section className="relative px-5 py-12 bg-[#0B1B2B] text-[#FAF8F5] overflow-hidden gpu-accelerated">
      {/* Background Starry Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none paper-texture-dark" />

      <div className="relative z-10 max-w-sm mx-auto">
        {/* RSVP Passport Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-ticket text-[#C6A767] uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3 text-[#C6A767]" />
            <span>CONFIRM YOUR BOARDING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial tracking-[0.2em] font-medium uppercase text-[#FAF8F5]">
            R.S.V.P.
          </h2>
          <p className="text-[11px] font-body text-[#D1D9E0]/80 font-light mt-1">
            Kindly respond by <strong>May 1st, 2025</strong>
          </p>
        </motion.div>

        {/* RSVP Card Form (Layered z-20 with smooth entrance) */}
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
          className="relative z-20 bg-[#FAF8F5] text-[#111111] rounded-3xl p-6 shadow-2xl border border-[#D5C7B3] paper-texture"
        >
          {/* Top Notch Stamp Cutout */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0B1B2B] w-6 h-6 rounded-full" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4 pt-2"
              >
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <label className="block text-[9px] font-ticket font-bold uppercase tracking-wider text-[#665B4C] mb-1">
                    Guest Name(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Alexandra & David"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8CABE] rounded-xl text-xs font-body text-[#1A1A1A] focus:outline-none focus:border-[#0B1B2B] focus:ring-1 focus:ring-[#0B1B2B]"
                  />
                </motion.div>

                {/* Email Address */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label className="block text-[9px] font-ticket font-bold uppercase tracking-wider text-[#665B4C] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8CABE] rounded-xl text-xs font-body text-[#1A1A1A] focus:outline-none focus:border-[#0B1B2B] focus:ring-1 focus:ring-[#0B1B2B]"
                  />
                </motion.div>

                {/* Attendance Radio */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <label className="block text-[9px] font-ticket font-bold uppercase tracking-wider text-[#665B4C] mb-1.5">
                    Will you join us in Lake Como? *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                      className={`py-2 px-3 rounded-xl border text-xs font-ticket font-semibold transition-all cursor-pointer text-center ${
                        formData.attendance === 'attending'
                          ? 'bg-[#0B1B2B] text-white border-[#0B1B2B]'
                          : 'bg-white text-[#554A3B] border-[#D8CABE] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      ✈ Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'declining' })}
                      className={`py-2 px-3 rounded-xl border text-xs font-ticket font-semibold transition-all cursor-pointer text-center ${
                        formData.attendance === 'declining'
                          ? 'bg-[#0B1B2B] text-white border-[#0B1B2B]'
                          : 'bg-white text-[#554A3B] border-[#D8CABE] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      Regretfully Declines
                    </button>
                  </div>
                </motion.div>

                {/* Number of Guests */}
                {formData.attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-[9px] font-ticket font-bold uppercase tracking-wider text-[#665B4C] mb-1">
                      Number of Guests Attending
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8CABE] rounded-xl text-xs font-body text-[#1A1A1A] focus:outline-none focus:border-[#0B1B2B]"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </motion.div>
                )}

                {/* Dietary Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label className="block text-[9px] font-ticket font-bold uppercase tracking-wider text-[#665B4C] mb-1 flex items-center space-x-1">
                    <Utensils className="w-3 h-3 text-[#8C7A65]" />
                    <span>Dietary Preferences / Allergies</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    placeholder="Vegetarian, Gluten-Free, None..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8CABE] rounded-xl text-xs font-body text-[#1A1A1A] focus:outline-none focus:border-[#0B1B2B]"
                  />
                </motion.div>

                {/* Song Request */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <label className="block text-[9px] font-ticket font-bold uppercase tracking-wider text-[#665B4C] mb-1 flex items-center space-x-1">
                    <Music className="w-3 h-3 text-[#8C7A65]" />
                    <span>Dancefloor Song Request</span>
                  </label>
                  <input
                    type="text"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    placeholder="Song title & artist..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8CABE] rounded-xl text-xs font-body text-[#1A1A1A] focus:outline-none focus:border-[#0B1B2B]"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#0B1B2B] hover:bg-[#16283D] text-[#FAF8F5] rounded-xl font-ticket font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>ISSUING BOARDING PASS...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#C6A767]" />
                        <span>SUBMIT BOARDING RSVP</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#0B1B2B] text-[#FAF8F5] mx-auto flex items-center justify-center border-4 border-[#C6A767] shadow-xl">
                  <CheckCircle2 className="w-8 h-8 text-[#C6A767]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-ticket uppercase tracking-widest text-[#8C7A65] block">
                    BOARDING CONFIRMED
                  </span>
                  <h3 className="text-xl font-editorial font-bold text-[#0B1B2B]">
                    Grazie Mille, {formData.name || 'Guest'}!
                  </h3>
                  <p className="text-xs font-body text-[#554A3B] max-w-xs mx-auto">
                    {formData.attendance === 'attending'
                      ? 'Your boarding reservation for Lake Como is registered. We cannot wait to celebrate with you!'
                      : 'Thank you for letting us know. You will be dearly missed in Lake Como!'}
                  </p>
                </div>

                {/* Stamped Ticket Badge */}
                <div className="bg-[#EDE5D8] border border-dashed border-[#B8A892] rounded-2xl p-4 text-left font-ticket text-[11px] text-[#0B1B2B] space-y-1">
                  <div className="flex justify-between border-b border-[#D5C7B3] pb-1">
                    <span className="text-[#786C5D]">PASSENGER:</span>
                    <span className="font-bold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D5C7B3] pb-1">
                    <span className="text-[#786C5D]">STATUS:</span>
                    <span className="font-bold text-[#0B1B2B]">
                      {formData.attendance === 'attending' ? 'CONFIRMED (SEAT READY)' : 'DECLINED WITH LOVE'}
                    </span>
                  </div>
                  {formData.attendance === 'attending' && (
                    <div className="flex justify-between">
                      <span className="text-[#786C5D]">PARTY SIZE:</span>
                      <span className="font-bold">{formData.guests} Guest(s)</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleReset}
                  className="text-[10px] font-ticket text-[#786C5D] hover:text-[#0B1B2B] underline cursor-pointer pt-2"
                >
                  Edit RSVP Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Signature */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center space-y-2 text-[#D1D9E0]/70"
        >
          <div className="font-script text-3xl text-[#C6A767]">
            Lauren & Marco
          </div>
          <div className="text-[9px] font-ticket tracking-widest uppercase">
            JUNE 21, 2025 • LAKE COMO, ITALY
          </div>
          <p className="text-[9px] font-body text-[#8C9AA8] pt-1">
            #LaurenAndMarco2025 • Boarding For Love
          </p>
        </motion.div>
      </div>
    </section>
  );
}
