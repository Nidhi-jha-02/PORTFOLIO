import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NetflixPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleGroupRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .set(nameRef.current, { opacity: 0, y: 8 })
      .set(subtitleGroupRef.current, { opacity: 0, y: 6 });

    // Smooth, gentle fade-in for name
    tl.to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out'
    })
    // Subtitle and asymmetric line appear smoothly shortly afterward
    .to(subtitleGroupRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.25')
    // Brief, elegant pause for readability
    .to({}, { duration: 0.65 })
    // Smooth exit to reveal the website
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#f8fafc] flex flex-col items-center justify-center select-none overflow-hidden px-6"
    >
      <div className="flex flex-col items-center text-center max-w-xl mx-auto">
        {/* Name: Main focus, bold condensed font, dark navy, refined letter spacing */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-slate-900 leading-none tracking-[0.14em] sm:tracking-[0.18em]"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          NIDHI JHA
        </h1>

        {/* Subtitle & Distinctive Asymmetric Red Line */}
        <div ref={subtitleGroupRef} className="flex flex-col items-center mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.24em] sm:tracking-[0.28em] text-red-600 uppercase font-bold">
            COMPUTER ORGANIZATION &amp; ARCHITECTURE
          </p>

          {/* ONE unique visual element: thin elegant red line with subtle asymmetric offset detail */}
          <div className="flex items-center justify-center gap-2 mt-3.5 sm:mt-4">
            <span className="h-[1.5px] w-16 sm:w-24 bg-red-600 rounded-full"></span>
            <span className="h-[1.5px] w-2.5 bg-red-600/60 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixPreloader;