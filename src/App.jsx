import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import IPhoneFrame from './components/Chassis/IPhoneFrame';
import OpeningTicketPage from './components/OpeningTicketPage';
import AirplaneFlightOverlay from './components/AirplaneFlightOverlay';
import ScrollFlightPath from './components/ScrollFlightPath';
import HomeSection from './components/HomeSection';
import SaveTheDateSection from './components/SaveTheDateSection';
import VenueSection from './components/VenueSection';
import TimelineSection from './components/TimelineSection';
import DressCodeSection from './components/DressCodeSection';
import ThankYouSection from './components/ThankYouSection';
import MusicPlayer from './components/MusicPlayer';
import './styles/iphone-mockup.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('opening'); // 'opening' | 'home'
  const [isFlying, setIsFlying] = useState(false);
  const scrollContainerRef = useRef(null);
  const mainRef = useRef(null);

  const handleStartBoarding = () => {
    // Reveal Home Page immediately and launch concurrent 1.3s flight overlay over it
    setCurrentPage('home');
    setIsFlying(true);
  };

  // Lenis Smooth Scroll Initialization for zero-flicker premium scrolling
  useEffect(() => {
    if (currentPage !== 'home' || !scrollContainerRef.current) return;

    const wrapperEl = scrollContainerRef.current;
    const contentEl = mainRef.current;

    const lenis = new Lenis({
      wrapper: wrapperEl,
      content: contentEl,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [currentPage]);

  return (
    <div className="desktop-viewport-container">
      <IPhoneFrame>
        <div className="w-full h-full relative overflow-hidden bg-[#0B1B2B]">
          
          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            {currentPage === 'opening' ? (
              <motion.div
                key="opening-page"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity'
                }}
                className="w-full h-full inner-app-scroll gpu-accelerated"
              >
                <OpeningTicketPage onOpen={handleStartBoarding} />
              </motion.div>
            ) : (
              <motion.div
                key="home-page"
                ref={scrollContainerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity'
                }}
                className="w-full h-full inner-app-scroll relative gpu-accelerated"
              >
                {/* Floating Speaker Mute Button (Only visible on Home page, top right) */}
                <MusicPlayer />

                <main ref={mainRef} className="w-full bg-[#0B1B2B] text-[#FAF8F5] relative">
                  {/* Continuous Scroll-Driven Airplane Wave Flight Path (GSAP) */}
                  <ScrollFlightPath
                    scrollContainerRef={scrollContainerRef}
                    mainRef={mainRef}
                  />

                  {/* Section 1: Dear Friends and Family */}
                  <HomeSection />

                  {/* Section 2: Save The Date Calendar */}
                  <SaveTheDateSection />

                  {/* Section 3: Venue Villa Balbianello & Logistics */}
                  <VenueSection />

                  {/* Section 4: Timeline Itinerary */}
                  <TimelineSection />

                  {/* Section 5: Dress Code */}
                  <DressCodeSection />

                  {/* Section 6: Thank You Section */}
                  <ThankYouSection />
                </main>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Concurrent Airplane Flight Overlay (Flies OVER Home Section at z-index: 50) */}
          <AnimatePresence>
            {isFlying && (
              <AirplaneFlightOverlay onComplete={() => setIsFlying(false)} />
            )}
          </AnimatePresence>

        </div>
      </IPhoneFrame>
    </div>
  );
}
