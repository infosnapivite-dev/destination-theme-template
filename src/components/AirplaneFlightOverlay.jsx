import React from 'react';
import { motion } from 'framer-motion';

/**
 * AirplaneFlightOverlay
 * - Solid white airplane SVG (fill="white") rotated 45deg to face top-right
 * - Viewport diagonal trajectory: x: ['-10vw', '110vw'], y: ['110vh', '-20vh']
 * - Dynamic scaling: scale: [0.5, 3.5]
 * - Exact duration: 1.3s with easeInOut
 * - Staggered dissipating smoke trail (scale: [0.5, 4], opacity: [0.6, 0], filter: 'blur(10px)')
 * - Fully GPU accelerated with translate3d(0,0,0) and z-index: 50
 */
export default function AirplaneFlightOverlay({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {/* Ambient Departure Atmospheric Glow Flash */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 2.8, opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="absolute w-72 h-72 rounded-full bg-radial from-[#C6A767]/30 via-[#C6A767]/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* Diagonal Airplane Flight Moving Across Entire Screen */}
      <motion.div
        initial={{
          x: '-10vw',
          y: '110vh',
          scale: 0.5,
          opacity: 0
        }}
        animate={{
          x: ['-10vw', '110vw'],
          y: ['110vh', '-20vh'],
          scale: [0.5, 3.5],
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: 1.3, // Exactly 1.3 seconds
          ease: 'easeInOut',
          times: [0, 0.1, 0.5, 0.9, 1]
        }}
        onAnimationComplete={onComplete}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity'
        }}
        className="gpu-accelerated flex items-center justify-center pointer-events-none"
      >
        <div className="relative flex items-center justify-center">
          
          {/* Staggered Dissipating Smoke Puffs Trail behind the plane */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{
                scale: [0.5, 4],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.12,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                bottom: `${-16 - i * 14}px`,
                left: `${-16 - i * 14}px`,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                filter: 'blur(10px)',
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform, opacity'
              }}
            />
          ))}

          {/* Engine Contrail Core Glow */}
          <motion.div
            animate={{
              opacity: [0.5, 0.95, 0.4],
              scale: [0.9, 1.35, 0.9]
            }}
            transition={{ duration: 0.25, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 45%, transparent 70%)',
              filter: 'blur(6px)',
              transform: 'translate3d(0, 0, 0)'
            }}
          />

          {/* Solid White Commercial Passenger Jet (fill="white") rotated 45deg to face top-right trajectory */}
          <div
            style={{
              transform: 'rotate(45deg)',
              filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 32px rgba(198, 167, 103, 0.5))'
            }}
            className="relative text-white"
          >
            <svg
              width="72"
              height="72"
              viewBox="0 0 100 100"
              fill="white"
              className="overflow-visible"
            >
              {/* Commercial 4-engine passenger airliner */}
              <path d="M 50 5 C 48 5, 46 8, 46 14 L 46 38 L 8 52 C 6 53, 5 55, 6 57 C 7 59, 9 59, 12 58 L 46 48 L 46 72 L 35 79 C 33 80, 32 82, 33 84 C 34 86, 36 86, 38 85 L 46 82 L 46 90 C 46 93, 48 95, 50 95 C 52 95, 54 93, 54 90 L 54 82 L 62 85 C 64 86, 66 86, 67 84 C 68 82, 67 80, 65 79 L 54 72 L 54 48 L 88 58 C 91 59, 93 59, 94 57 C 95 55, 94 53, 92 52 L 54 38 L 54 14 C 54 8, 52 5, 50 5 Z M 24 53 L 24 45 C 24 44, 25 43, 26 43 C 27 43, 28 44, 28 45 L 28 52 Z M 35 49 L 35 42 C 35 41, 36 40, 37 40 C 38 40, 39 41, 39 42 L 39 48 Z M 72 49 L 72 42 C 72 41, 73 40, 74 40 C 75 40, 76 41, 76 42 L 76 48 Z M 61 53 L 61 45 C 61 44, 62 43, 63 43 C 64 43, 65 44, 65 45 L 65 52 Z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
