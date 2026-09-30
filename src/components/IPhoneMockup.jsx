import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Signal } from 'lucide-react';
import Lenis from 'lenis';

export default function IPhoneMockup({ children }) {
  const [currentTime, setCurrentTime] = useState('9:41');
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);

  // Live status bar clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Lenis smooth scroll inside the iPhone container
  useEffect(() => {
    const scrollTarget = scrollContainerRef.current;
    if (!scrollTarget) return;

    const isMobile = window.innerWidth <= 768;

    const lenis = new Lenis({
      wrapper: isMobile ? window : scrollTarget,
      content: isMobile ? document.documentElement : scrollTarget.firstElementChild,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050B14] text-[#FAF8F5] flex flex-col items-center justify-center relative overflow-x-hidden selection:bg-[#E5D7C2] selection:text-[#0B1B2B]">
      
      {/* Ambient background glow & atmospheric lighting for desktop showcase */}
      <div className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#0F2238]/40 via-[#162A45]/20 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#C6A767]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Centered Container */}
      <div className="w-full flex items-center justify-center md:py-6">
        
        {/* iPhone 15 Pro Wrapper Container: Exact 393px by 852px */}
        <div className="relative w-full md:w-[393px] md:h-[852px] bg-[#0B1B2B] md:rounded-[55px] overflow-hidden flex flex-col shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_90px_rgba(11,27,43,0.8)]">
          {/* Status Bar Overlay (aligned with Dynamic Island) */}
          <div className="sticky top-0 z-40 w-full bg-[#0B1B2B]/95 backdrop-blur-md px-8 pt-3.5 pb-2.5 flex items-center justify-between text-[#FAF8F5] text-xs font-ticket select-none pointer-events-none border-b border-white/5 md:border-transparent">
            {/* Status Bar Clock */}
            <span className="font-semibold tracking-tight text-[13px] pl-1">{currentTime}</span>

            {/* Right status icons: Signal, Wifi, Battery */}
            <div className="flex items-center space-x-1.5 text-white/90 pr-1">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center space-x-0.5">
                <div className="w-5 h-2.5 border border-white/80 rounded-[3px] p-0.5 flex items-center">
                  <div className="h-full w-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Inner Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 w-full overflow-y-auto no-scrollbar gpu-accelerated relative bg-[#0B1B2B] md:rounded-b-[48px]"
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
          >
            <div className="min-h-full pb-8">
              {children}
            </div>
          </div>

          {/* iPhone Home Indicator Bar */}
          <div className="hidden md:flex absolute bottom-2.5 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
            <div className="w-36 h-1 bg-white/40 rounded-full shadow-sm" />
          </div>
        </div>

      </div>
    </div>
  );
}
