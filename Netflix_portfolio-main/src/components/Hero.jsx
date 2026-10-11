import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'COMPUTER ORGANIZATION & ARCHITECTURE',
    'INSTRUCTION SET ARCHITECTURE // RISC & CISC',
    'MEMORY HIERARCHY & CACHE COHERENCE',
    'PIPELINED MICROARCHITECTURE & HAZARDS',
    'DIGITAL LOGIC & ARITHMETIC CIRCUITS'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = glareRef.current ? gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" }) : null;
    const glareY = glareRef.current ? gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" }) : null;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 14;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 14;

      xTilt(rotateY);
      yTilt(rotateX);

      if (glareX && glareY) {
        glareX((x - cardRect.left) - cardRect.width / 2);
        glareY((y - cardRect.top) - cardRect.height / 2);
      }
    };

    const handleMouseEnter = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden flex flex-col justify-between select-none pt-20"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-white to-slate-50 z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[12vw] font-black text-red-600 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.12) 0%, rgba(229,9,20,0.03) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-16 pb-12 my-auto">
        
        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-2xl border border-red-600/30 text-xs font-mono uppercase tracking-widest text-slate-900 shadow-md">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-600 font-bold tracking-wider">COA ACADEMIC PORTFOLIO</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">CHANDIGARH UNIVERSITY &bull; UID: 25BAI10032</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-600 tracking-wider">
            <span className="px-3 py-1 border border-slate-200 rounded-full bg-white/80 shadow-sm">DEPT: CSE (AI)</span>
            <span className="px-3 py-1 border border-slate-200 rounded-full bg-white/80 shadow-sm">DEGREE: B.E.</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
          
          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_4px_15px_rgba(229,9,20,0.35)]">
                UID: 25BAI10032
              </span>
              <span className="text-slate-600 text-xs font-mono tracking-widest uppercase">
                B.E. in CSE (AI) &bull; Chandigarh University
              </span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95] drop-shadow-sm">
              NIDHI JHA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                COA PORTFOLIO
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-xs font-mono text-red-600 font-semibold">
              <span className="px-2.5 py-1 bg-red-50 border border-red-200 rounded-md text-red-700">Azure AI Certified</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700">C++</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700">Python</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700">Java</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700">SQL</span>
            </div>

            <h2 className="hero-anim-item text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              Computer Science & Engineering (AI) Student
            </h2>

            <div className="hero-anim-item space-y-3 text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-md">
              <p>
                Passionate about building practical solutions through programming and artificial intelligence.
              </p>
              <p>
                Interested in understanding how software and computer systems work together to power modern technology.
              </p>
            </div>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-red-700 transition-all duration-300 shadow-[0_8px_25px_rgba(229,9,20,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Explore Projects
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-cv-modal'))}
                className="px-6 py-3 bg-white text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-slate-50 hover:border-red-600 transition-all duration-300 shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                View CV
              </button>
              <a
                href="#converter"
                className="px-6 py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                COA Tool
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/30 via-rose-500/20 to-orange-400/10 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-white/95 backdrop-blur-2xl rounded-2xl border border-red-600/30 shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-md">
                  COA STUDENT
                </div>

                <div className="absolute bottom-6 left-6 z-30 px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white font-mono text-[10px] font-medium tracking-wider rounded shadow-md border border-white/20">
                  UID: 25BAI10032
                </div>

                <img
                  src={pictureImg}
                  alt="Nidhi Jha Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-xl max-w-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-50 text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold border border-red-200/60">
                ACADEMIC PROFILE
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Computer Organization & Architecture
              </h3>
              <div className="text-xs text-slate-600 space-y-1 font-mono">
                <p><span className="text-slate-400">Name:</span> <strong className="text-slate-800">Nidhi Jha</strong></p>
                <p><span className="text-slate-400">UID:</span> <strong className="text-slate-800">25BAI10032</strong></p>
                <p><span className="text-slate-400">Dept:</span> <strong className="text-slate-800">B.E. CSE (AI)</strong></p>
                <p><span className="text-slate-400">Cert:</span> <strong className="text-red-600">Azure AI-900 & AZ-900</strong></p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-xs text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Institution:</span> Chandigarh University, Mohali Punjab
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-slate-500 tracking-widest uppercase border-t border-slate-200 pt-4 mt-6">
          <span>CHANDIGARH UNIVERSITY &bull; CSE (ARTIFICIAL INTELLIGENCE)</span>
          <span>[ PORTFOLIO RELEASE 2026 ]</span>
        </div>
      </div>


      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-6 md:px-12 py-4 flex items-center justify-between pointer-events-auto shadow-sm">
        <a href="#home" className="text-xl md:text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2">
          NIDHI JHA<span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block"></span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-widest text-slate-700">
          <a href="#home" className="hover:text-red-600 transition-colors font-semibold">Home</a>
          <a href="#about" className="hover:text-red-600 transition-colors font-semibold">About Me</a>
          <a href="#cv" className="hover:text-red-600 transition-colors font-semibold">My CV</a>
          <a href="#converter" className="hover:text-red-600 transition-colors font-semibold">COA Tool</a>
          <a href="#projects" className="hover:text-red-600 transition-colors font-semibold">Projects</a>
          <a href="#gallery" className="hover:text-red-600 transition-colors font-semibold">Gallery</a>
          <a href="#contact" className="hover:text-red-600 transition-colors font-semibold">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-cv-modal'))}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(229,9,20,0.35)] hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Resume</span>
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </button>
        </div>
      </header>
    </section>
  );
};

export default Hero;