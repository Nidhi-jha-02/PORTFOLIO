import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const assignmentsData = [
  {
    number: "01",
    title: "Computer Arithmetic & ALU Architecture",
    text: "Design and algorithmic verification of binary addition, 2's complement subtraction, Booth's multiplication algorithm for signed integers, and restoring division flowcharts. Simulated overflow detection and 4-bit carry lookahead logic.",
    tag: "ASSIGNMENT 01 // ARITHMETIC LOGIC UNIT",
    topics: ["Booth's Algorithm", "2's Complement", "ALU Flags", "Carry Lookahead"],
    status: "Completed & Verified",
    gradient: "from-white via-slate-50 to-slate-100"
  },
  {
    number: "02",
    title: "ISA & Addressing Modes Analysis",
    text: "Deconstruction of Instruction Set Architectures (RISC vs CISC). Mapped high-level constructs to R-Type, I-Type, and J-Type machine code formats, evaluating effective address computations across Immediate, Direct, Indirect, and Indexed modes.",
    tag: "ASSIGNMENT 02 // INSTRUCTION SET ARCHITECTURE",
    topics: ["MIPS Instruction Formats", "Addressing Modes", "Opcode Decoding", "Register Allocation"],
    status: "Completed & Verified",
    gradient: "from-white via-slate-50 to-slate-100"
  },
  {
    number: "03",
    title: "Cache Memory Hierarchy & Mapping",
    text: "Comparative benchmark of Direct-Mapped, 2-Way Set-Associative, and Fully Associative cache architectures. Evaluated miss penalties, write-through vs write-back policies, and implemented Least Recently Used (LRU) block replacement simulations.",
    tag: "ASSIGNMENT 03 // MEMORY SUBSYSTEM",
    topics: ["Cache Hit Ratio", "Set-Associative Mapping", "LRU / FIFO Policies", "Memory Hierarchy"],
    status: "Completed & Verified",
    gradient: "from-white via-slate-50 to-slate-100"
  },
  {
    number: "04",
    title: "5-Stage Pipelining & Hazard Mitigation",
    text: "Instruction lifecycle tracing across IF, ID, EX, MEM, and WB stages. Modeled structural, data (RAW, WAR, WAW), and branch control hazards. Implemented operand forwarding paths, branch delay slots, and compared Hardwired vs Microprogrammed control units.",
    tag: "ASSIGNMENT 04 // PIPELINE & CONTROL UNIT",
    topics: ["5-Stage Pipeline", "Data Forwarding", "Branch Prediction", "Control Unit Design"],
    status: "Completed & Verified",
    gradient: "from-white via-slate-50 to-slate-100"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Keep the top-most card fully focused

      gsap.to(card, {
        scale: 0.94 - index * 0.02,
        y: -15 - index * 8,
        filter: "blur(2px)",
        opacity: 0.6,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + index * 20}px`,
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Magnetic mouse highlight per card
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="assignments"
      ref={containerRef}
      className="relative w-full bg-white text-slate-900 py-24 px-6 md:px-12 select-none overflow-hidden border-t border-slate-200"
    >
      {/* Ambient Red Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-red-600/30 text-[11px] font-mono uppercase tracking-widest text-slate-900 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-600 font-bold">EPISODE 03</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-700">COURSEWORK & LAB ARCHIVES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              COA ASSIGNMENTS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                LAB REPORTS & PROBLEM SETS.
              </span>
            </h2>
          </div>
          <p className="text-slate-600 text-xs md:text-sm font-normal leading-relaxed max-w-xs">
            Curated and faculty-evaluated laboratory assignments covering arithmetic logic units, instruction set architecture, cache memories, and pipelining.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-8 pb-20">
          {assignmentsData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-6 md:p-8 rounded-3xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col justify-between min-h-[250px] md:min-h-[270px] transform-gpu transition-all overflow-hidden group hover:border-red-600/60 hover:shadow-xl`}
              style={{
                zIndex: index + 1,
                top: `${95 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.08), transparent 70%)'
                }}
              ></div>

              {/* Crimson Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-700 px-2.5 py-0.5 rounded-full bg-red-100 border border-red-200">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                    ✓ {item.status}
                  </span>
                </div>
                <span className="text-2xl md:text-3xl font-mono font-black text-slate-300">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5 space-y-2">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.topics.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md shadow-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-xs md:text-sm text-slate-600 font-normal leading-relaxed">
                    {item.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => alert(`Assignment ${item.number}: "${item.title}"\nStatus: Verified\nCourse Code: 25CST-201 (COA)\nStudent: Nidhi Jha (25BAI10032)\nTopics: ${item.topics.join(', ')}`)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span>View Assignment Details</span>
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => alert(`Downloading Lab Report PDF for Assignment ${item.number}...`)}
                      className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span>Submission PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtle Red Corner Dot */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_10px_#E50914] z-10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;