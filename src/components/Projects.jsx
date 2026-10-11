import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data for Nidhi Jha's Portfolio
const projectsData = [
  {
    id: 'coa-simulator',
    title: "COA Instruction Set Simulator",
    category: "Computer Architecture",
    domain: "COA & Systems",
    description: "Interactive simulation executing 8-bit/16-bit instruction cycles, register status bank, and ALU flag updates with instruction register tracing in C++.",
    architectureDetails: "Implements Fetch-Decode-Execute cycle, program counter incrementation, opcode decoding, ALU status flags (Zero, Carry, Sign, Overflow), and memory address register mapping.",
    tags: ["C++", "COA Simulator", "ALU Flags", "Architecture"],
    match: "99%",
    episode: "S01 E01",
    github: "https://github.com/Nidhi-jha-02",
    featured: true
  },
  {
    id: 'ai-data-analyst',
    title: "AI Data Analyst System",
    category: "Artificial Intelligence",
    domain: "AI & Data",
    description: "Automated exploratory data analysis platform synthesizing statistical summaries, feature correlation distributions, and natural language narrative reports.",
    architectureDetails: "End-to-end automated EDA pipeline leveraging Pandas heuristics, distribution metrics, automated outlier detection, and natural language insight synthesis.",
    tags: ["Python", "Pandas", "NLP", "Data Analytics"],
    match: "98%",
    episode: "S01 E02",
    github: "https://github.com/Nidhi-jha-02",
    featured: false
  },
  {
    id: 'online-shopping',
    title: "Online Shopping System",
    category: "Database & Software",
    domain: "Software & Embedded",
    description: "Console and relational database system handling user authentication, inventory tracking, dynamic shopping cart logic, and transaction ledger processing.",
    architectureDetails: "Designed with normalized SQL relational schemas, ACID transaction guarantees, object-oriented cart models, and secure user credential hashing in C++.",
    tags: ["C++", "SQL", "DBMS", "OOP"],
    match: "97%",
    episode: "S01 E03",
    github: "https://github.com/Nidhi-jha-02",
    featured: false
  },
  {
    id: 'otp-door-lock',
    title: "OTP Door Lock System",
    category: "Embedded Security",
    domain: "Software & Embedded",
    description: "Hardware security prototype built on Arduino and GSM network providing dynamic one-time password generation and verification for electronic solenoid control.",
    architectureDetails: "Microcontroller hardware interfacing with GSM SIM800L module, dynamic time-based OTP algorithm, UART serial communication, and relay driver circuit protection.",
    tags: ["Arduino", "C++", "GSM", "Embedded IoT"],
    match: "99%",
    episode: "S01 E04",
    github: "https://github.com/Nidhi-jha-02",
    featured: false
  },
  {
    id: 'cache-visualizer',
    title: "Cache Memory Visualizer",
    category: "Memory Subsystems",
    domain: "COA & Systems",
    description: "Interactive simulation comparing Direct-Mapped, 2-Way Set-Associative, and Fully Associative caches with LRU/FIFO replacement and hit/miss analytics.",
    architectureDetails: "Memory address decomposition into Tag, Set Index, and Block Offset fields; models cache line tag arrays, valid bits, dirty bits, and comparative hit/miss latency penalties.",
    tags: ["C++", "Cache Memory", "LRU Policy", "COA"],
    match: "96%",
    episode: "S01 E05",
    github: "https://github.com/Nidhi-jha-02",
    featured: false
  },
  {
    id: 'booth-multiplier',
    title: "Booth's Multiplier Tool",
    category: "Computer Arithmetic",
    domain: "COA & Systems",
    description: "Step-by-step graphical tracing of multiplicand, multiplier, arithmetic right shifts (ARS), and partial product accumulation for signed 2's complement binary.",
    architectureDetails: "Hardware multiplier simulation tracking Accumulator (A), Multiplier (Q), Q-1 bit, and Count register; visualizes 00, 01, 10, 11 bit-pair decisions.",
    tags: ["Digital Logic", "Booth's Alg", "2's Complement", "ALU"],
    match: "99%",
    episode: "S01 E06",
    github: "https://github.com/Nidhi-jha-02",
    featured: false
  },
  {
    id: 'mips-hazard-detector',
    title: "MIPS 5-Stage Hazard Detector",
    category: "Pipelined Processors",
    domain: "COA & Systems",
    description: "Static analyzer identifying Read-After-Write (RAW) data dependencies, branch penalties, and operand forwarding paths across IF, ID, EX, MEM, WB stages.",
    architectureDetails: "Dependency graph generator tracking register read/write stages, pipeline stall bubble insertion, forwarding unit mux signals, and branch delay slot scheduling.",
    tags: ["Assembly", "MIPS", "Hazards", "Forwarding"],
    match: "100%",
    episode: "S01 E07",
    github: "https://github.com/Nidhi-jha-02",
    featured: false
  },
  {
    id: 'green-mobility',
    title: "Smart Green Corridor",
    category: "Green Mobility Ideathon 2026",
    domain: "AI & Data",
    description: "AI-based urban green mobility model proposing dynamic traffic signal prioritization for emergency vehicles and eco-transport transit corridors.",
    architectureDetails: "Pitched at Chandigarh University Integrated Green Mobility Ideathon 2026; simulates real-time congestion sensor inputs and adaptive carbon-minimizing signal phases.",
    tags: ["AI Mobility", "Ideathon 2026", "Optimization", "Green Tech"],
    match: "98%",
    episode: "S01 E08",
    github: "https://github.com/Nidhi-jha-02",
    featured: false
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const cardsGridRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'COA & Systems', 'AI & Data', 'Software & Embedded'];

  const filteredProjects = selectedFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.domain === selectedFilter);

  // GSAP Smooth Entrance Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.project-card-item', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selectedFilter]);

  // Lock body scroll when project modal is open
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalProject]);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="bg-[#f8fafc] min-h-screen relative font-sans text-slate-900 w-full py-24 md:py-32 px-6 md:px-12 select-none border-t border-slate-200 overflow-hidden"
    >
      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-slate-900/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Crimson Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-600/30 text-xs font-mono uppercase tracking-widest text-slate-900 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-600 font-bold">EPISODE 04</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-700">ENGINEERING &amp; SOFTWARE SHOWCASE</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              FEATURED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                PROJECTS &amp; REPOSITORIES.
              </span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed">
              Curated hardware architecture simulators, artificial intelligence pipelines, and systems engineering applications with open-source repositories on GitHub.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-1.5 self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Flagship Project Banner */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.1)] transition-all duration-500 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                  FLAGSHIP ORIGINAL
                </span>
                <span className="text-xs font-mono text-slate-500">
                  COA Core &bull; 99% Architectural Match
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">
                COA Instruction Set Simulator
              </h3>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Interactive machine-cycle simulator built in C++ that executes 8-bit and 16-bit instructions, models register banks, updates ALU status flags, and traces memory addressing in real-time.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['C++', 'ISA Simulator', 'Register Bank', 'ALU Flags', 'Fetch-Decode-Execute'].map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-medium border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <a
                href="https://github.com/Nidhi-jha-02"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub Repository</span>
              </a>

              <button
                onClick={() => setActiveModalProject(projectsData[0])}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-widest text-center border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inspect Architecture &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Blockbuster Project Cards Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-item rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.12)] hover:border-red-600/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Red Top Gradient Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-200">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-600 font-bold">{project.match}</span>
                    <span className="text-[10px] font-mono border border-slate-200 px-1.5 py-0.5 text-slate-500 rounded bg-slate-50 font-bold">
                      {project.domain === 'COA & Systems' ? 'COA' : 'AI/SYS'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-red-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Tags & Action Links */}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 group-hover:border-red-600/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs font-mono">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>View GitHub &rarr;</span>
                  </a>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Inspect details"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-red-100 text-red-700 font-mono text-[10px] font-bold uppercase">
                    {activeModalProject.episode}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeModalProject.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activeModalProject.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              <div>
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase mb-1">
                  Project Overview:
                </h4>
                <p>{activeModalProject.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase mb-1">
                  Architecture &amp; Technical Implementation:
                </h4>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-700 leading-relaxed">
                  {activeModalProject.architectureDetails}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase mb-2">
                  Technologies &amp; Libraries:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-mono text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-500">
                Author: Nidhi Jha (UID: 25BAI10032)
              </span>

              <a
                href={activeModalProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View on GitHub &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;