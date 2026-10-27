import React, { useEffect, useRef, useState, useCallback } from 'react';
import airplaneImg from '../assets/airplane.png';

/**
 * ScrollFlightPath
 * Continuous scroll-driven wavy flight path animation with zero lag.
 * - Synchronized 1:1 with Lenis smooth scroll and native scroll.
 * - Pre-sampled Lookup Table (LUT) for 120 FPS sub-millisecond transforms.
 * - Zero GSAP tween delay: airplane moves in lockstep with the viewport in real time.
 * - Layout measurements cached on resize to prevent layout thrashing during scroll.
 * - Dynamic SVG mask reveals dotted contrail ONLY behind the plane as it moves.
 */
export default function ScrollFlightPath({ scrollContainerRef, mainRef, lenisRef, lenis }) {
  const pathRef = useRef(null);
  const maskPathRef = useRef(null);
  const planeRef = useRef(null);

  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(1000);
  const [isReady, setIsReady] = useState(false);

  // Cached geometry and lookup table to eliminate SVG DOM queries on scroll
  const totalLengthRef = useRef(1000);
  const maxScrollRef = useRef(3000);
  const lutRef = useRef([]); // [{ x, y, angle }]
  const lastProgressRef = useRef(0);

  // Generate smooth cubic Bézier wave path based on main content dimensions
  const buildWavePath = useCallback(() => {
    if (!mainRef?.current) return;

    const w = mainRef.current.clientWidth || 390;
    const h = mainRef.current.scrollHeight || 4200;

    const padLeft = Math.max(28, w * 0.08);
    const padRight = w - padLeft;

    // Detect Thank You section to dynamically lock vertical coordinates to its exact layout
    const thankYouEl =
      mainRef.current.querySelector('#thank-you-section') ||
      mainRef.current.querySelector('section:last-of-type');

    const thankYouTop = thankYouEl ? thankYouEl.offsetTop : Math.round(h * 0.86);
    const thankYouHeight = thankYouEl ? thankYouEl.offsetHeight : (h - thankYouTop);
    const thankYouBottom = thankYouTop + thankYouHeight;
    const endY = Math.max(thankYouTop + 160, thankYouBottom - 45);

    // Update cached maxScroll
    const container = scrollContainerRef?.current;
    if (container) {
      maxScrollRef.current = Math.max(1, container.scrollHeight - container.clientHeight);
    }

    // Sinuous wave waypoints: starting from top-left corner (P0) down through each section
    const waypoints = [
      { x: padLeft, y: 38 },                                    // P0: Top-left corner start
      { x: padRight, y: h * 0.09 },                             // HomeSection: Swoop down-right over header
      { x: padLeft, y: h * 0.18 },                              // HomeSection: Swoop left below couple photo
      { x: padRight, y: h * 0.28 },                             // SaveTheDate: Swoop right across calendar card
      { x: padLeft, y: h * 0.38 },                              // SaveTheDate: Swoop left into bottom date
      { x: padRight, y: h * 0.49 },                             // VenueSection: Swoop right across Villa Balbianello
      { x: padLeft, y: h * 0.59 },                              // VenueSection: Swoop left below logistics button
      { x: padRight, y: h * 0.69 },                             // TimelineSection: Swoop right across timeline nodes
      { x: padLeft, y: Math.min(thankYouTop - 180, h * 0.78) }, // DressCodeSection: Swoop left into wardrobe
      { x: padRight, y: thankYouTop },                          // Transition smoothly to right side at top of Thank You section
      { x: padRight, y: endY }                                  // ThankYouSection: Pure straight vertical path on right side
    ];

    // Build continuous Bézier curve segments with smooth vertical handles
    let d = `M ${waypoints[0].x.toFixed(1)} ${waypoints[0].y.toFixed(1)}`;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const p0 = waypoints[i];
      const p1 = waypoints[i + 1];

      // If x coordinates match (as in the Thank You section straight vertical path), emit clean LineTo
      if (Math.abs(p0.x - p1.x) < 0.1) {
        d += ` L ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      } else {
        const dy = p1.y - p0.y;

        // Smooth cubic Bézier control points
        const cp1X = p0.x;
        const cp1Y = p0.y + dy * 0.46;
        const cp2X = p1.x;
        const cp2Y = p1.y - dy * 0.46;

        d += ` C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }
    }

    setPathD(d);
  }, [mainRef, scrollContainerRef]);

  // Ultra-fast transform update using pre-sampled LUT (zero SVG DOM queries during scroll)
  const updatePlaneTransform = useCallback((prog) => {
    const lut = lutRef.current;
    if (!lut || lut.length === 0) return;

    const clamped = Math.max(0, Math.min(1, prog));
    const idx = clamped * (lut.length - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(lut.length - 1, i0 + 1);
    const t = idx - i0;

    const s0 = lut[i0];
    const s1 = lut[i1];

    // Interpolate coordinates
    const x = s0.x + (s1.x - s0.x) * t;
    const y = s0.y + (s1.y - s0.y) * t;

    // Shortest angular interpolation
    let diff = (s1.angle - s0.angle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const angle = s0.angle + diff * t;

    // Apply transform directly to GPU-promoted layer
    if (planeRef.current) {
      planeRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${angle.toFixed(2)}deg)`;
    }

    // Reveal active trail mask up to current progress
    if (maskPathRef.current) {
      const len = totalLengthRef.current;
      maskPathRef.current.style.strokeDashoffset = `${len * (1 - clamped)}`;
    }
  }, []);

  // Pre-sample curve into lookup table whenever pathD changes
  useEffect(() => {
    if (pathRef.current && pathD) {
      const pathEl = pathRef.current;
      const len = pathEl.getTotalLength();
      if (!len || isNaN(len)) return;

      totalLengthRef.current = len;
      setTotalLength(len);

      // Pre-sample 800 points along the path for instant O(1) lookups during scroll
      const samples = [];
      const numSamples = 800;
      for (let i = 0; i <= numSamples; i++) {
        const dist = (i / numSamples) * len;
        const pt = pathEl.getPointAtLength(dist);

        const delta = 2.5;
        const pAhead = pathEl.getPointAtLength(Math.min(len, dist + delta));
        const dx = pAhead.x - pt.x;
        const dy = pAhead.y - pt.y;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if (Math.abs(dx) < 0.05 && dy > 0) {
          angle = 90;
        }

        samples.push({ x: pt.x, y: pt.y, angle });
      }

      lutRef.current = samples;

      if (maskPathRef.current) {
        maskPathRef.current.style.strokeDasharray = `${len} ${len}`;
        maskPathRef.current.style.strokeDashoffset = `${len * (1 - lastProgressRef.current)}`;
      }

      setIsReady(true);
      updatePlaneTransform(lastProgressRef.current);
    }
  }, [pathD, updatePlaneTransform]);

  // Measure on layout change & window resize
  useEffect(() => {
    buildWavePath();

    if (!mainRef?.current) return;
    const observer = new ResizeObserver(() => {
      buildWavePath();
    });

    observer.observe(mainRef.current);
    window.addEventListener('resize', buildWavePath);
    window.addEventListener('load', buildWavePath);

    if (document.fonts?.ready) {
      document.fonts.ready.then(buildWavePath);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', buildWavePath);
      window.removeEventListener('load', buildWavePath);
    };
  }, [buildWavePath, mainRef]);

  // Direct, instantaneous scroll tracking with zero GSAP delay
  useEffect(() => {
    const activeLenis = lenis || lenisRef?.current;
    let cleanupLenis = null;

    if (activeLenis) {
      cleanupLenis = activeLenis.on('scroll', (e) => {
        const prog = typeof e?.progress === 'number' ? e.progress : 0;
        lastProgressRef.current = prog;
        updatePlaneTransform(prog);
      });
      // Synchronize immediately to current scroll position
      const initialProg = typeof activeLenis.progress === 'number' ? activeLenis.progress : 0;
      lastProgressRef.current = initialProg;
      updatePlaneTransform(initialProg);
    }

    // Fallback native scroll listener throttled to animation frames
    let rafId = null;
    const onScroll = () => {
      if (cleanupLenis) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        const container = scrollContainerRef?.current;
        if (!container) return;

        const scrollTop = container.scrollTop;
        const maxScroll = maxScrollRef.current || Math.max(1, container.scrollHeight - container.clientHeight);
        const prog = Math.min(1, Math.max(0, scrollTop / maxScroll));

        lastProgressRef.current = prog;
        updatePlaneTransform(prog);
      });
    };

    const containerEl = scrollContainerRef?.current;
    if (containerEl && !cleanupLenis) {
      containerEl.addEventListener('scroll', onScroll, { passive: true });
    }
    if (!cleanupLenis) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      if (typeof cleanupLenis === 'function') {
        cleanupLenis();
      } else if (cleanupLenis && activeLenis?.off) {
        activeLenis.off('scroll', cleanupLenis);
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (containerEl) {
        containerEl.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('scroll', onScroll);
    };
  }, [lenis, lenisRef, scrollContainerRef, updatePlaneTransform]);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{
        zIndex: 10,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      }}
    >
      <svg
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mask to reveal dotted flight path trail dynamically behind plane */}
          {pathD && (
            <mask id="flightTrailMask" maskUnits="userSpaceOnUse">
              <path
                ref={maskPathRef}
                d={pathD}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: `${totalLength} ${totalLength}`,
                  strokeDashoffset: `${totalLength}`
                }}
              />
            </mask>
          )}
        </defs>

        {/* 1. Hidden measurement path for getPointAtLength during initial LUT generation */}
        {pathD && (
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />
        )}

        {/* 2. Active Flight Path Trail (ONLY visible behind the moving airplane) */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#FAF8F5"
            strokeWidth="1.6"
            strokeDasharray="5 5"
            strokeOpacity="0.9"
            strokeLinecap="round"
            mask="url(#flightTrailMask)"
          />
        )}
      </svg>

      {/* 3. Airplane Jet Element (Solid White Commercial Airliner with Smooth Auto-Rotation) */}
      <div
        ref={planeRef}
        className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
        style={{
          transformOrigin: '0 0',
          willChange: 'transform',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.25s ease-out'
        }}
      >
        {/* Centered Plane Container */}
        <div
          className="relative -top-[17px] -left-[17px] w-[34px] h-[34px] flex items-center justify-center pointer-events-none"
        >
          <img
            src={airplaneImg}
            alt="Airplane"
            className="w-[34px] h-[34px] object-contain pointer-events-none select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] drop-shadow-[0_0_4px_rgba(255,255,255,0.35)]"
            style={{
              transform: 'rotate(44.8deg)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      </div>
    </div>
  );
}
