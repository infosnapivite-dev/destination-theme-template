import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import airplaneImg from '../assets/airplane.png';

/**
 * AirplaneFlightOverlay
 * - Cinematic 45° diagonal commercial passenger airliner takeoff.
 * - Hardware-accelerated HTML + SVG elements that run reliably on ALL mobile browsers (iOS Safari, Android).
 * - Trajectory dynamically calculated to span corner-to-corner across any mobile or desktop screen.
 * - Dynamic 3D perspective scaling from scale 0.75 to 1.85 as it rises towards the viewer.
 * - Twin glowing golden vapor contrails streaming behind the wings.
 * - Safety timer to prevent premature animation cancellation on mobile devices.
 */
export default function AirplaneFlightOverlay({ onComplete }) {
  const containerRef = useRef(null);

  // Measure container dimensions for responsive corner-to-corner trajectory
  const [screenSize, setScreenSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 390,
    height: typeof window !== 'undefined' ? window.innerHeight : 844
  }));

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setScreenSize({ width: rect.width, height: rect.height });
      }
    }
  }, []);

  // Guaranteed completion fallback timer (prevents premature termination on mobile / reduced-motion)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1950);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const { width: w, height: h } = screenSize;

  // 45° diagonal trajectory from bottom-left to top-right:
  // Center plane path: start at (-80, h * 0.90) -> end at (w + 100, endY)
  // To keep pure 45° angle: Delta Y = -Delta X
  const startX = -80;
  const startY = Math.max(h * 0.88, 650);
  const endX = w + 110;
  const deltaX = endX - startX;
  const endY = startY - deltaX; // Exact 45° slope

  // Perpendicular offset for twin wing engine contrails (offset = ~14px along 45° normal)
  const normOffset = 13;
  const offX = normOffset * 0.7071; // ~9.2px
  const offY = normOffset * 0.7071;

  // Left wing contrail coordinates
  const leftStartX = startX - offX;
  const leftStartY = startY - offY;
  const leftEndX = endX - offX;
  const leftEndY = endY - offY;

  // Right wing contrail coordinates
  const rightStartX = startX + offX;
  const rightStartY = startY + offY;
  const rightEndX = endX + offX;
  const rightEndY = endY + offY;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* 1. Atmospheric Golden Takeoff Flare in Screen Center */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 2.4, 3.2], opacity: [0, 0.42, 0] }}
        transition={{ duration: 1.6, ease: 'easeOut', times: [0, 0.4, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198,167,103,0.38) 0%, rgba(198,167,103,0.12) 45%, transparent 70%)',
          filter: 'blur(36px)'
        }}
      />

      {/* 2. SVG Overlay for Twin Luminous Engine Contrails */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Luminous Gold-to-White Jet Vapor Contrail Gradient */}
          <linearGradient id="takeoffContrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A767" stopOpacity="0" />
            <stop offset="25%" stopColor="#C6A767" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#FAF8F5" stopOpacity="0.85" />
            <stop offset="92%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Ethereal Glow Filter for Contrails */}
          <filter id="contrailGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Wing Engine Contrail */}
        <motion.path
          d={`M ${leftStartX} ${leftStartY} L ${leftEndX} ${leftEndY}`}
          fill="none"
          stroke="url(#takeoffContrailGrad)"
          strokeWidth="2.2"
          strokeDasharray="6 3.5"
          filter="url(#contrailGlowEffect)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0, 0.85, 0.95, 0]
          }}
          transition={{
            duration: 1.85,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.12, 0.85, 1]
          }}
        />

        {/* Right Wing Engine Contrail */}
        <motion.path
          d={`M ${rightStartX} ${rightStartY} L ${rightEndX} ${rightEndY}`}
          fill="none"
          stroke="url(#takeoffContrailGrad)"
          strokeWidth="2.2"
          strokeDasharray="6 3.5"
          filter="url(#contrailGlowEffect)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0, 0.85, 0.95, 0]
          }}
          transition={{
            duration: 1.85,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.12, 0.85, 1]
          }}
        />
      </svg>

      {/* 3. HTML Passenger Airliner with 3D Takeoff Motion (100% Reliable on iOS Safari & Android) */}
      <motion.div
        initial={{
          x: startX,
          y: startY,
          scale: 0.75,
          opacity: 0
        }}
        animate={{
          x: [startX, endX],
          y: [startY, endY],
          scale: [0.75, 1.95],
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: 1.85,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.08, 0.5, 0.88, 1]
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 76,
          height: 76,
          marginLeft: -38,
          marginTop: -38,
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
          pointerEvents: 'none'
        }}
      >
        {/* Left Wing Thruster Glow */}
        <div
          style={{
            position: 'absolute',
            left: 23,
            top: 23,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFFFFF 20%, #C6A767 75%, transparent 100%)',
            filter: 'blur(2px)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />

        {/* Right Wing Thruster Glow */}
        <div
          style={{
            position: 'absolute',
            left: 53,
            top: 53,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFFFFF 20%, #C6A767 75%, transparent 100%)',
            filter: 'blur(2px)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />

        {/* Commercial Passenger Airliner Graphic */}
        <img
          src={airplaneImg}
          alt="Airplane"
          className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)] drop-shadow-[0_0_18px_rgba(255,255,255,0.7)]"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </motion.div>
    </motion.div>
  );
}
