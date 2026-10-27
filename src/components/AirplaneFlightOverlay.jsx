import React from 'react';
import { motion } from 'framer-motion';
import airplaneImg from '../assets/airplane.png';

/**
 * AirplaneFlightOverlay
 * - Solid white commercial passenger airliner (fill="white") rotated 30deg to face top-right flight vector
 * - Container-relative diagonal trajectory: left: ['-15%', '115%'], top: ['108%', '-15%']
 * - Dynamic scaling: scale: [0.7, 1.4, 2.2, 2.8] for dramatic takeoff perspective
 * - Exact duration: 1.3s with easeInOut
 * - Staggered dissipating smoke trail and continuous glowing contrail
 * - Fully GPU accelerated with translate3d and z-index: 50
 */
export default function AirplaneFlightOverlay({ onComplete }) {
  // 45° diagonal flight trajectory coordinates in unified SVG coordinate space:
  // Center plane path: (-85, 740) -> (475, 180) (Delta X = +560, Delta Y = -560, Angle = -45°)
  // Left wing engine contrail:  (-95.8, 729.2) -> (450.2, 155.2)
  // Right wing engine contrail: (-74.2, 750.8) -> (499.8, 204.8)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {/* Ambient Departure Atmospheric Golden Flare in Center */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 2.6, opacity: [0, 0.45, 0] }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-radial from-[#C6A767]/35 via-[#C6A767]/10 to-transparent blur-3xl pointer-events-none"
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 390 810"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Luminous Golden-to-White Jet Vapor Contrail Gradient */}
          <linearGradient id="takeoffContrail" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A767" stopOpacity="0" />
            <stop offset="25%" stopColor="#C6A767" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#FAF8F5" stopOpacity="0.88" />
            <stop offset="92%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Engine Thruster Glow Gradient */}
          <radialGradient id="engineGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="45%" stopColor="#C6A767" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C6A767" stopOpacity="0" />
          </radialGradient>

          {/* Ethereal Glow Filter for Contrails */}
          <filter id="contrailGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Engine Thruster Blur */}
          <filter id="engineBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* 1. Left Wing Engine Contrail Line */}
        <motion.line
          x1="-95.8"
          y1="729.2"
          x2="450.2"
          y2="155.2"
          stroke="url(#takeoffContrail)"
          strokeWidth="2.0"
          strokeDasharray="6 3.5"
          filter="url(#contrailGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0, 0.85, 0.95, 0]
          }}
          transition={{
            duration: 1.3,
            ease: 'easeInOut',
            times: [0, 0.12, 0.85, 1]
          }}
        />

        {/* 2. Right Wing Engine Contrail Line */}
        <motion.line
          x1="-74.2"
          y1="750.8"
          x2="499.8"
          y2="204.8"
          stroke="url(#takeoffContrail)"
          strokeWidth="2.0"
          strokeDasharray="6 3.5"
          filter="url(#contrailGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0, 0.85, 0.95, 0]
          }}
          transition={{
            duration: 1.3,
            ease: 'easeInOut',
            times: [0, 0.12, 0.85, 1]
          }}
        />

        {/* 3. Airplane Group: Perfectly Synchronized along 45° Flight Path */}
        <motion.g
          initial={{ x: -85, y: 740, scale: 0.85, opacity: 0 }}
          animate={{
            x: [-85, 475],
            y: [740, 180],
            scale: [0.85, 1.95],
            opacity: [0, 1, 1, 1, 0]
          }}
          transition={{
            duration: 1.3,
            ease: 'easeInOut',
            times: [0, 0.08, 0.5, 0.88, 1]
          }}
          onAnimationComplete={onComplete}
          style={{ transformOrigin: '0px 0px' }}
        >
          {/* Left Wing Thruster Glow */}
          <circle
            cx="-12.7"
            cy="-12.7"
            r="9"
            fill="url(#engineGlowGrad)"
            filter="url(#engineBlur)"
          />
          <circle
            cx="-12.7"
            cy="-12.7"
            r="3.5"
            fill="#FFFFFF"
          />

          {/* Right Wing Thruster Glow */}
          <circle
            cx="12.7"
            cy="12.7"
            r="9"
            fill="url(#engineGlowGrad)"
            filter="url(#engineBlur)"
          />
          <circle
            cx="12.7"
            cy="12.7"
            r="3.5"
            fill="#FFFFFF"
          />

          {/* Passenger Airliner Image: Oriented at exact natural 45° diagonal */}
          <image
            href={airplaneImg}
            xlinkHref={airplaneImg}
            x="-36"
            y="-36"
            width="72"
            height="72"
            preserveAspectRatio="xMidYMid meet"
            style={{
              filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(255,255,255,0.75))'
            }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

