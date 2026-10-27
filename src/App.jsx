import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import 'lenis/dist/lenis.css';
import './styles/iphone-mockup.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('opening'); // 'opening' | 'home'
  const [isFlying, setIsFlying] = useState(false);
  const [homeContainerEl, setHomeContainerEl] = useState(null);
  const [lenisInstance, setLenisInstance] = useState(null);
  const scrollContainerRef = useRef(null);
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  const setContainerRef = useCallback((el) => {
    scrollContainerRef.current = el;
    setHomeContainerEl((prev) => (prev !== el ? el : prev));
  }, []);

  const handleStartBoarding = () => {
    // Reveal Home Page immediately and launch concurrent flight overlay over it
    setCurrentPage('home');
    setIsFlying(true);
  };

  // Lenis Smooth Scroll Initialization (Active on both Desktop and Mobile devices)
  useEffect(() => {
    if (!homeContainerEl || !mainRef.current) return;

    const lenis = new Lenis({
      wrapper: homeContainerEl,
      content: mainRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      syncTouch: true, // Smooth touch inertia on mobile devices
      syncTouchLerp: 0.08,
      infinite: false,
      autoRaf: true
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Keep Lenis dimensions in sync if dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(mainRef.current);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => lenis.resize());
    }

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [homeContainerEl]);

  // On desktop screens, allow rolling the mouse wheel outside the phone frame to scroll smoothly
  useEffect(() => {
    if (!lenisInstance || !homeContainerEl) return;

    const handleWindowWheel = (e) => {
      if (!homeContainerEl.contains(e.target)) {
        e.preventDefault();
        lenisInstance.scrollTo(lenisInstance.targetScroll + e.deltaY * 1.2, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          programmatic: false
        });
      }
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, [lenisInstance, homeContainerEl]);

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
                transition={{ duration: 0.1, ease: 'easeOut' }}
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
                ref={setContainerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
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
                  {/* Continuous Scroll-Driven Airplane Wave Flight Path */}
                  <ScrollFlightPath
                    scrollContainerRef={scrollContainerRef}
                    mainRef={mainRef}
                    lenisRef={lenisRef}
                    lenis={lenisInstance}
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
