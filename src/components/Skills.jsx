import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const achievementCategories = [
  { 
    title: 'Microsoft Certified: Azure Fundamentals', 
    desc: 'Microsoft Certified: Azure Fundamentals (AZ-900) validating foundational knowledge of cloud services, security, privacy, and architectural concepts.', 
    tag: 'MICROSOFT CERTIFIED',
    skills: ['AZ-900', 'Microsoft Azure', 'Cloud Architecture', 'Security & SLA'] 
  },
  { 
    title: 'Microsoft Azure AI Fundamentals', 
    desc: 'Microsoft Certified: Azure AI Fundamentals (AI-900) demonstrating proficiency with machine learning workloads, computer vision, and NLP services.', 
    tag: 'AI CERTIFICATION',
    skills: ['AI-900', 'Azure AI', 'Machine Learning', 'Computer Vision'] 
  },
  { 
    title: 'Infosys Springboard Data Analytics', 
    desc: 'Certified in Data Analytics by Infosys Springboard, covering exploratory data analysis, business intelligence, data cleaning, and statistical metrics.', 
    tag: 'DATA ANALYTICS',
    skills: ['Infosys Springboard', 'Data Analytics', 'EDA & Stats', 'Visualization'] 
  },
  { 
    title: 'HERizon 1.0 Hackathon', 
    desc: 'Participated in the competitive HERizon 1.0 Hackathon hosted at Chandigarh University, collaborating in team-based rapid software innovation.', 
    tag: 'HACKATHON // CU',
    skills: ['HERizon 1.0', 'Chandigarh Univ', 'Rapid Prototyping', 'Teamwork'] 
  },
  { 
    title: 'Integrated Green Mobility Ideathon 2026', 
    desc: 'Formulated and pitched an AI-driven Smart Green Corridor System for dynamic traffic signal routing and urban carbon footprint reduction.', 
    tag: 'IDEATHON 2026',
    skills: ['Ideathon 2026', 'Green Corridor', 'Smart Mobility', 'AI Routing'] 
  },
  { 
    title: 'COA Academic & Lab Competence', 
    desc: 'Hands-on proficiency in Computer Organization and Architecture (25CST-201) including instruction simulation, ALU arithmetic, and memory hierarchy.', 
    tag: 'ACADEMIC CORE',
    skills: ['25CST-201', 'ISA Simulator', 'Booth Algorithm', 'Cache Mapping'] 
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const radius = 1800; 
            const angleSpread = 18; 
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); 
            const z = -Math.abs(offset) * 50; 
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; 
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, 
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (achievementCategories.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
           if (card) {
             gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
             gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
           }
        });
        
        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="achievements"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#f8fafc] text-slate-900 overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none border-t border-slate-200"
    >
      {/* Dynamic Netflix Background Vignettes */}
      {achievementCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-white via-slate-50 to-red-50/20"
        />
      ))}

      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {achievementCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter"
            style={{ 
               WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.18)' : 'rgba(15,23,42,0.06)'}`,
               opacity: 0 
            }}
          >
            HONORS
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {achievementCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-white/95 backdrop-blur-2xl border border-slate-200/90 flex flex-col justify-between overflow-hidden group shadow-[0_25px_50px_rgba(0,0,0,0.06)] hover:border-red-600/80 transition-colors duration-500"
          >
            {/* Inner Red Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-700 bg-red-100 px-3 py-1 rounded-full border border-red-200">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-slate-400">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 font-normal leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg group-hover:border-red-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;