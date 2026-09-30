import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const active = soundManager.toggleMelody();
    setIsPlaying(active);
  };

  useEffect(() => {
    return () => {
      soundManager.stopMelody();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="absolute top-4 right-4 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="w-8 h-8 rounded-full bg-[#0B1B2B]/85 backdrop-blur-md border border-[#C6A767]/40 hover:border-[#C6A767] text-[#FAF8F5] shadow-lg flex items-center justify-center transition-all cursor-pointer group"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#C6A767] transition-colors group-hover:text-white" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#A89F91] transition-colors group-hover:text-white" />
        )}
      </motion.button>
    </motion.div>
  );
}
