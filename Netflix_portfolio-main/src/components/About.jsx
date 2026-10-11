import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
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

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white text-slate-900 py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 backdrop-blur-2xl border border-red-600/30 text-xs font-mono uppercase tracking-widest text-slate-900 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-600 font-bold">EPISODE 01</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700">ABOUT ME & ACADEMIC CORE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
            ACADEMIC PROFILE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
              ORIGIN, INTERESTS & GOALS.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-slate-50/90 backdrop-blur-xl border border-slate-200/90 rounded-[2.5rem] shadow-lg flex flex-col justify-between relative group hover:border-red-600/60 hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.08), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-slate-200 font-mono text-7xl font-black pointer-events-none">
              01
            </div>
            
            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">Student Profile & Career Objective</h3>
              <p className="text-lg md:text-xl font-medium text-slate-900 leading-relaxed">
                I am <span className="text-slate-900 font-bold underline decoration-red-600 decoration-2 underline-offset-4">Nidhi Jha</span>, pursuing Bachelor of Engineering in <span className="font-semibold text-slate-900">CSE (Artificial Intelligence)</span> (UID: <span className="font-mono text-red-600 font-bold">25BAI10032</span>) at <span className="font-semibold text-slate-900">Chandigarh University, Mohali Punjab</span>.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  Career Objective:
                </div>
                <p className="text-sm text-slate-600 font-normal leading-relaxed pl-3.5 border-l-2 border-red-200">
                  Aspiring Computer Science professional with a strong foundation in programming, Artificial Intelligence, and problem-solving, seeking an opportunity to apply technical skills in a challenging environment. Eager to contribute to real-world projects, learn emerging technologies, and develop innovative solutions while growing professionally.
                </p>

                <div className="text-sm font-semibold text-slate-900 flex items-center gap-2 pt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  Academic Foundation & Qualifications:
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 pl-3.5 border-l-2 border-red-200 font-mono">
                  <p><strong className="text-slate-800">Chandigarh University:</strong> B.E. in CSE (AI) &bull; Mohali, Punjab</p>
                  <p><strong className="text-slate-800">Senior Secondary:</strong> BSEB Board &bull; R.K College, Madhubani Bihar</p>
                  <p><strong className="text-slate-800">Secondary Education:</strong> CBSE Board &bull; Regional Secondary School, Madhubani Bihar</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">Computer Architecture</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">Artificial Intelligence</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">Data Structures & Algorithms</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">Operating Systems</span>
            </div>
          </div>

          {/* Card 2: My CV / Resume (Span 5) */}
          <div
            id="cv"
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-slate-50/90 backdrop-blur-xl border border-slate-200/90 rounded-[2.5rem] shadow-lg flex flex-col justify-between relative group hover:border-red-600/60 hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.08), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-slate-200 font-mono text-7xl font-black pointer-events-none">
              02
            </div>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">Curriculum Vitae</h3>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-mono rounded font-bold">VERIFIED</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-bold text-slate-900">Nidhi Jha &bull; Resume</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chandigarh University student &bull; Microsoft Azure Certified &bull; Hackathon & Ideathon Participant
                </p>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono text-slate-700 shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">UID:</span>
                    <span className="font-bold text-slate-900">25BAI10032</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Degree:</span>
                    <span className="font-bold text-slate-900">B.E. CSE (AI)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">College:</span>
                    <span className="font-bold text-slate-900">Chandigarh Univ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-bold text-red-600">25BAI10032@cuchd.in</span>
                  </div>
                </div>
              </div>

              {/* View and Download Resume Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-cv-modal'))}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  View Resume
                </button>
                
                <a
                  href="/resume.txt"
                  download="Nidhi_Jha_Resume.txt"
                  onClick={(e) => {
                    e.preventDefault();
                    const resumeText = `=====================================================
NIDHI JHA - CURRICULUM VITAE
=====================================================
Phone: 9065633632
Email: 25BAI10032@cuchd.in
LinkedIn: https://www.linkedin.com/in/nidhi-jha-683b7a37a/
GitHub: https://github.com/Nidhi-jha-02

CAREER OBJECTIVE:
Aspiring Computer Science professional with a strong foundation in programming,
Artificial Intelligence, and problem-solving, seeking an opportunity to apply
technical skills in a challenging environment. Eager to contribute to real-world
projects, learn emerging technologies, and develop innovative solutions while growing professionally.

EDUCATION:
- Tertiary Education: Bachelor of Engineering in (CSE) (AI)
  Chandigarh University, Mohali Punjab
  Relevant Coursework: Object-Oriented Programming in Java, Data Structures and Algorithms,
  Operating Systems, Computer Organization and Architecture, Artificial Intelligence,
  Machine Learning, Cloud Computing, Cybersecurity.
- Senior Secondary Education: BSEB Board, R.K College, Madhubani Bihar
- Secondary Education: Matriculation CBSE Board, Regional Secondary School, Madhubani Bihar

PROJECTS:
1. COA Instruction Set Simulator | C++, GitHub
2. AI Data Analyst System | Python, Pandas, NLP
3. Online Shopping System | C++, SQL, DBMS
4. OTP-Based Door Lock System | Arduino, C++, GSM

TECHNICAL SKILLS:
- Languages & Frameworks: C, C++, Java, Python
- Databases: SQL
- Web Technologies: HTML, CSS
- Development Tools: VS Code, Git, GitHub, Microsoft Azure, Workflow Automation
- Interpersonal Skills: Leadership, Quick Learner, Communication, Collaboration, Adaptability, Problem-Solving, Goal-Oriented

ACHIEVEMENTS & CERTIFICATIONS:
- Microsoft Certified: Azure Fundamentals (AZ-900)
- Microsoft Certified: Azure AI Fundamentals (AI-900)
- Infosys Springboard: Data Analytics Certified
- HERizon 1.0 Hackathon Participant (Chandigarh University)
- Integrated Green Mobility Ideathon 2026 Participant (AI-Based Smart Green Corridor System)
- Build With Bharat 2.0 National Hackathon Participant (NIT Delhi & GitHub)

HOBBIES & INTERESTS:
Singing, Travelling, Painting
=====================================================`;

                    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `Nidhi_Jha_Resume.txt`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 px-4 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
            
            <div className="pt-6 font-mono text-xs text-slate-400 relative z-10">
              // CHANDIGARH UNIVERSITY &bull; UID: 25BAI10032
            </div>
          </div>

          {/* Card 3: Technical Ecosystem / Coursework (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-slate-50/90 backdrop-blur-xl border border-slate-200/90 rounded-[2.5rem] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-600/60 hover:shadow-xl transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.08), transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">Coursework & Technical Arsenal</h3>
              <p className="text-base md:text-lg font-bold text-slate-900">Core engineering competencies and programming languages.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5 relative z-10">
              {[
                'C++',
                'Python',
                'Java',
                'SQL',
                'Computer Architecture (COA)',
                'Artificial Intelligence',
                'Machine Learning',
                'Data Structures & Algorithms',
                'Operating Systems',
                'Microsoft Azure (AZ-900 / AI-900)',
                'Git & GitHub'
              ].map((topic, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-medium text-slate-800 shadow-sm hover:border-red-600 hover:text-red-600 hover:scale-105 transition-all"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;