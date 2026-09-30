import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/**
 * ScrollFlightPath
 * Continuous scroll-driven wavy flight path animation (GSAP).
 * - Authentic, sleek passenger airliner SVG silhouette.
 * - Starts from top-left corner of Home page.
 * - Responsive, snappy scroll tracking: plane leads the scroll and stays visible in viewport.
 * - Sinuous wave (right to left, left to right) across all sections.
 * - Dynamic SVG mask reveals dotted contrail ONLY behind the plane as it moves.
 * - Z-Index 15 layering: flies above headers, weaves behind elevated photo/calendar cards.
 */
export default function ScrollFlightPath({ scrollContainerRef, mainRef }) {
  const pathRef = useRef(null);
  const maskPathRef = useRef(null);
  const planeRef = useRef(null);

  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(1000);
  const [isReady, setIsReady] = useState(false);

  // Smooth scroll progress tracker
  const progressState = useRef({ progress: 0 });

  // Generate smooth cubic Bézier wave path based on main content dimensions
  const buildWavePath = useCallback(() => {
    if (!mainRef?.current) return;

    const w = mainRef.current.clientWidth || 390;
    const h = mainRef.current.scrollHeight || 4200;

    const padLeft = Math.max(28, w * 0.08);
    const padRight = w - padLeft;
    const midX = w * 0.5;

    // Sinuous wave waypoints: starting from top-left corner (P0) down through each section
    const waypoints = [
      { x: padLeft, y: 38 },                     // P0: Top-left corner start
      { x: padRight, y: h * 0.09 },              // HomeSection: Swoop down-right over header
      { x: padLeft, y: h * 0.18 },               // HomeSection: Swoop left below couple photo
      { x: padRight, y: h * 0.28 },              // SaveTheDate: Swoop right across calendar card
      { x: padLeft, y: h * 0.38 },               // SaveTheDate: Swoop left into bottom date
      { x: padRight, y: h * 0.49 },              // VenueSection: Swoop right across Villa Balbianello
      { x: padLeft, y: h * 0.59 },               // VenueSection: Swoop left below logistics button
      { x: padRight, y: h * 0.69 },              // TimelineSection: Swoop right across timeline nodes
      { x: padLeft, y: h * 0.79 },               // TimelineSection: Swoop left into Dress Code
      { x: padRight, y: h * 0.88 },              // DressCodeSection: Swoop right across color palette
      { x: padLeft + 12, y: h * 0.94 },          // DressCodeSection: Swoop left under attire photos
      { x: midX, y: h - 50 }                     // RsvpSection: Smooth landing at Lake Como footer
    ];

    // Build continuous Bézier curve segments with smooth vertical handles
    let d = `M ${waypoints[0].x.toFixed(1)} ${waypoints[0].y.toFixed(1)}`;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const p0 = waypoints[i];
      const p1 = waypoints[i + 1];
      const dy = p1.y - p0.y;

      // Smooth cubic Bézier control points
      const cp1X = p0.x;
      const cp1Y = p0.y + dy * 0.46;
      const cp2X = p1.x;
      const cp2Y = p1.y - dy * 0.46;

      d += ` C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }

    setPathD(d);
  }, [mainRef]);

  // Apply smooth coordinates and rotation to the airplane and update mask
  const updatePlaneTransform = useCallback((prog) => {
    if (!pathRef.current) return;

    const pathEl = pathRef.current;
    const len = pathEl.getTotalLength();
    if (!len || isNaN(len)) return;

    const clamped = Math.max(0, Math.min(1, prog));
    const dist = clamped * len;

    // Get exact position on curve
    const pt = pathEl.getPointAtLength(dist);

    // Compute tangent angle with forward and backward delta
    const delta = 3.0;
    const pAhead = pathEl.getPointAtLength(Math.min(len, dist + delta));
    const pBehind = pathEl.getPointAtLength(Math.max(0, dist - delta));

    const dx = pAhead.x - pBehind.x;
    const dy = pAhead.y - pBehind.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Transform airplane element
    if (planeRef.current) {
      planeRef.current.style.transform = `translate3d(${pt.x.toFixed(2)}px, ${pt.y.toFixed(2)}px, 0) rotate(${angle.toFixed(2)}deg)`;
    }

    // Reveal active trail mask up to current distance
    if (maskPathRef.current) {
      maskPathRef.current.style.strokeDashoffset = `${len * (1 - clamped)}`;
    }
  }, []);

  // Update total path length when path changes
  useEffect(() => {
    if (pathRef.current && pathD) {
      const len = pathRef.current.getTotalLength();
      setTotalLength(len);

      if (maskPathRef.current) {
        maskPathRef.current.style.strokeDasharray = `${len} ${len}`;
        maskPathRef.current.style.strokeDashoffset = `${len * (1 - progressState.current.progress)}`;
      }

      setIsReady(true);
      updatePlaneTransform(progressState.current.progress);
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

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', buildWavePath);
    };
  }, [buildWavePath, mainRef]);

  // Scroll listener with snappy, responsive GSAP tracking
  useEffect(() => {
    const calcProgress = () => {
      const container = scrollContainerRef?.current;
      if (!container) return 0;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const rawProg = Math.min(1, Math.max(0, scrollTop / maxScroll));

      return rawProg;
    };

    const onScroll = () => {
      const targetProg = calcProgress();

      // Fast, snappy GSAP momentum so plane doesn't lag behind the viewport
      gsap.to(progressState.current, {
        progress: targetProg,
        duration: 0.16, // Snappy response so plane leads the scroll
        ease: 'power1.out',
        overwrite: 'auto',
        onUpdate: () => {
          updatePlaneTransform(progressState.current.progress);
        }
      });
    };

    const containerEl = scrollContainerRef?.current;
    if (containerEl) {
      containerEl.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial position
    onScroll();

    return () => {
      if (containerEl) {
        containerEl.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollContainerRef, updatePlaneTransform]);

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

          {/* Plane Glow Filter */}
          <filter id="planeGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="rgba(0,0,0,0.6)" />
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255,255,255,0.5)" />
          </filter>
        </defs>

        {/* 1. Hidden measurement path for getPointAtLength */}
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
          transition: 'opacity 0.3s ease-out'
        }}
      >
        {/* Centered Plane Container */}
        <div
          className="relative -top-4 -left-4 w-8 h-8 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
        >
          {/* Authentic Modern Commercial Passenger Airliner SVG (Facing Right 0° by default) */}
          <svg
            viewBox="0 0 40 40"
            className="w-8 h-8 overflow-visible"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.6))'
            }}
          >
            {/* Sleek Passenger Jet with swept main wings, fuselage, and tail stabilizers */}
            <path
              d="M 37 20 C 35 18.8, 28 17.2, 23 17 L 12 5 C 10.8 4.2, 9.5 4.8, 10 6.5 L 14 17.5 L 4 18 L 1.5 14.5 C 1 14, 0.2 14.2, 0.4 15.2 L 2 20 L 0.4 24.8 C 0.2 25.8, 1 26, 1.5 25.5 L 4 22 L 14 22.5 L 10 33.5 C 9.5 35.2, 10.8 35.8, 12 35 L 23 23 C 28 22.8, 35 21.2, 37 20 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
