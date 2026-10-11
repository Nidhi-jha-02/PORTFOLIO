import { useState, useEffect } from 'react';

const ResumeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-cv-modal', handleOpen);
    return () => window.removeEventListener('open-cv-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleDownload = () => {
    const content = `=====================================================
CURRICULUM VITAE - NIDHI JHA
Computer Organization & Architecture Portfolio
=====================================================
NAME: Nidhi Jha
UID / ROLL NUMBER: 25BAI10032
DEGREE: Bachelor of Engineering in Computer Science & Engineering (AI)
INSTITUTION: Chandigarh University, Mohali, Punjab
EMAIL: 25BAI10032@cuchd.in | PHONE: +91 9065633632
LINKEDIN: https://www.linkedin.com/in/nidhi-jha-683b7a37a/
GITHUB: https://github.com/Nidhi-jha-02

-----------------------------------------------------
CAREER OBJECTIVE
-----------------------------------------------------
Motivated and detail-oriented Computer Science Engineering student specializing
in Artificial Intelligence at Chandigarh University. Passionate about computer
systems architecture, low-level system design, algorithm development, and intelligent
automation. Eager to leverage foundational knowledge in COA, programming, and cloud
technologies to solve complex engineering challenges.

-----------------------------------------------------
ACADEMIC QUALIFICATIONS & EDUCATION
-----------------------------------------------------
1. Bachelor of Engineering - CSE (Artificial Intelligence) [2025 - 2029]
   Chandigarh University, Mohali, Punjab
   UID: 25BAI10032
   Key Coursework: Computer Organization & Architecture (25CST-201), 
   OOP in Java, Data Structures & Algorithms, Operating Systems, 
   Artificial Intelligence, Machine Learning, Cloud Computing, Cybersecurity

2. Senior Secondary (Class 12th)
   R.K. College, Madhubani, Bihar
   Board: Bihar School Examination Board (BSEB)

3. Secondary Matriculation (Class 10th)
   Regional Secondary School, Madhubani, Bihar
   Board: Central Board of Secondary Education (CBSE)

-----------------------------------------------------
COA LABORATORY & ARCHITECTURE FOCUS
-----------------------------------------------------
- Instruction Set Architecture (ISA): MIPS & x86 Formats, Addressing Modes, RTL
- Computer Arithmetic: Booth's Algorithm, Floating Point IEEE-754, ALU Design
- Memory Hierarchy: Cache Organization (Direct, Associative, Set-Associative), LRU
- CPU Pipelining: 5-Stage Pipeline (IF, ID, EX, MEM, WB), Hazard Detection & Mitigation
- Control Unit: Microprogrammed vs Hardwired Control Units, Bus Interfacing

-----------------------------------------------------
ACADEMIC & TECHNICAL PROJECTS
-----------------------------------------------------
1. COA Instruction Set Simulator
   Tech: C++, Data Structures, Memory Mapping
   Repository: https://github.com/Nidhi-jha-02
   - Simulates 8-bit/16-bit instruction fetch-decode-execute cycles.
   - Implements register bank displays, ALU flag status, and step execution.

2. AI Data Analyst System
   Tech: Python, Pandas, NumPy, NLP, Automated EDA
   Repository: https://github.com/Nidhi-jha-02
   - Generates automated exploratory data analysis, statistical summaries,
     and natural language narrative reports from structured datasets.

3. Online Shopping System
   Tech: C++, SQL, DBMS Principles
   Repository: https://github.com/Nidhi-jha-02
   - Relational database management system with cart logic, user authentication,
     and inventory transaction tracking.

4. OTP-Based Door Lock System
   Tech: Arduino, C++, GSM Module, Hardware Interfacing
   Repository: https://github.com/Nidhi-jha-02
   - Embedded security system using dynamic OTP generation via GSM communication
     to unlock electronic solenoids with fail-safe logging.

-----------------------------------------------------
CERTIFICATIONS & HONORS
-----------------------------------------------------
- Microsoft Certified: Azure Fundamentals (AZ-900)
- Microsoft Certified: Azure AI Fundamentals (AI-900)
- Infosys Springboard: Data Analytics Certification
- Participant: HERizon 1.0 Hackathon (Chandigarh University)
- Ideathon: Integrated Green Mobility Ideathon 2026 (Smart Green Corridor System)
- Hackathon: Build With Bharat 2.0 National Hackathon (NIT Delhi & GitHub)

-----------------------------------------------------
TECHNICAL SKILLS & TOOLKIT
-----------------------------------------------------
- Programming Languages: C, C++, Java, Python, SQL, HTML, CSS
- Tools & IDEs: VS Code, Git, GitHub, Arduino IDE
- Cloud & Automation: Microsoft Azure, Workflow Automation
- Core Concepts: Computer Architecture, OOP, DBMS, Data Structures, AI Basics

-----------------------------------------------------
INTERESTS & HOBBIES
-----------------------------------------------------
- Singing, Travelling, Painting
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nidhi_Jha_Resume_25BAI10032.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-700 font-bold">
              CURRICULUM VITAE // NIDHI JHA (25BAI10032)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download TXT
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-slate-800 font-sans">
          
          {/* Header Section */}
          <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-widest">
                COMPUTER SCIENCE &amp; ENGINEERING (AI)
              </span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                NIDHI JHA
              </h1>
              <p className="text-sm text-slate-600 font-medium mt-1">
                UID: <span className="font-mono text-slate-900 font-bold">25BAI10032</span> &bull; Chandigarh University
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Phone: <span className="text-slate-800 font-semibold">+91 9065633632</span>
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500 space-y-1 md:text-right">
              <p><a href="mailto:25BAI10032@cuchd.in" className="text-red-600 hover:underline">25BAI10032@cuchd.in</a></p>
              <p><a href="https://www.linkedin.com/in/nidhi-jha-683b7a37a/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">LinkedIn Profile</a></p>
              <p><a href="https://github.com/Nidhi-jha-02" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 underline">GitHub: @Nidhi-jha-02</a></p>
              <p className="pt-1">COA Code: <strong className="text-red-600">25CST-201</strong></p>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 border-b border-red-200 pb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Academic Education
            </h2>
            <div className="space-y-2.5">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Bachelor of Engineering in CSE (Artificial Intelligence)</span>
                  <span className="text-xs font-mono text-slate-500">2025 - 2029</span>
                </div>
                <p className="text-xs text-slate-600">Chandigarh University, Mohali, Punjab &bull; UID: 25BAI10032</p>
                <p className="text-xs text-slate-700 pt-1">
                  <strong>Coursework:</strong> Computer Organization and Architecture (25CST-201), OOP in Java, DSA, Operating Systems, AI, Machine Learning, Cloud Computing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Senior Secondary (12th)</span>
                    <span className="font-mono text-slate-500">BSEB</span>
                  </div>
                  <p className="text-slate-600">R.K. College, Madhubani, Bihar</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Secondary Matriculation (10th)</span>
                    <span className="font-mono text-slate-500">CBSE</span>
                  </div>
                  <p className="text-slate-600">Regional Secondary School, Madhubani</p>
                </div>
              </div>
            </div>
          </div>

          {/* COA Coursework & Core Domains */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 border-b border-red-200 pb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              COA Syllabus &amp; Architecture Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Instruction Set Architecture (ISA)</span>
                <p className="text-slate-600">Instruction formats, Addressing modes, Register transfer language (RTL), Micro-operations &amp; sequencing.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">ALU &amp; Computer Arithmetic</span>
                <p className="text-slate-600">Booth's multiplication, Restoring &amp; Non-restoring division, IEEE-754 floating point, 2's complement logic.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Memory Hierarchy &amp; Cache Mapping</span>
                <p className="text-slate-600">Direct, Fully Associative, K-Way Set-Associative mapping, Cache write policies, LRU/FIFO replacement.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Pipelining &amp; Control Unit Design</span>
                <p className="text-slate-600">5-Stage instruction pipeline (IF, ID, EX, MEM, WB), Structural/Data/Branch hazard handling, Microprogrammed control.</p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 border-b border-red-200 pb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Featured Projects &amp; Implementations
            </h2>
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>COA Instruction Set Simulator</span>
                  <a href="https://github.com/Nidhi-jha-02" target="_blank" rel="noopener noreferrer" className="font-mono text-red-600 hover:underline">github.com/Nidhi-jha-02</a>
                </div>
                <p className="text-slate-600">
                  Developed an interactive instruction cycle simulator with register displays, flag registers, ALU arithmetic logic, and memory tracing in C++.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>AI Data Analyst System</span>
                  <a href="https://github.com/Nidhi-jha-02" target="_blank" rel="noopener noreferrer" className="font-mono text-red-600 hover:underline">github.com/Nidhi-jha-02</a>
                </div>
                <p className="text-slate-600">
                  Automated EDA pipeline in Python leveraging Pandas and NLP heuristics to generate statistical narratives and visual data representations.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>Online Shopping System</span>
                  <a href="https://github.com/Nidhi-jha-02" target="_blank" rel="noopener noreferrer" className="font-mono text-red-600 hover:underline">github.com/Nidhi-jha-02</a>
                </div>
                <p className="text-slate-600">
                  Console &amp; database-backed commerce software using C++ and SQL relational tables to handle cart management, transactions, and product inventories.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>OTP-Based Door Lock System</span>
                  <a href="https://github.com/Nidhi-jha-02" target="_blank" rel="noopener noreferrer" className="font-mono text-red-600 hover:underline">github.com/Nidhi-jha-02</a>
                </div>
                <p className="text-slate-600">
                  Embedded hardware security prototype built on Arduino and GSM module featuring dynamic one-time password generation and solenoid activation.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 border-b border-red-200 pb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Certifications &amp; Extracurricular Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Microsoft Certified: Azure Fundamentals (AZ-900)</span>
                <span className="text-slate-500 text-[11px]">Cloud computing concepts, security, governance &amp; Azure architectural components.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Microsoft Certified: Azure AI Fundamentals (AI-900)</span>
                <span className="text-slate-500 text-[11px]">Machine Learning workloads, Computer Vision, Natural Language Processing on Azure.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Infosys Springboard: Data Analytics</span>
                <span className="text-slate-500 text-[11px]">Data manipulation, statistical analysis, and business intelligence dashboards.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Build With Bharat 2.0 &amp; HERizon Hackathon</span>
                <span className="text-slate-500 text-[11px]">NIT Delhi Build With Bharat 2.0 (Team Cipher Core) &bull; CU HERizon Hackathon &bull; Mobility Ideathon.</span>
              </div>
            </div>
          </div>

          {/* Technical Toolkit */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 border-b border-red-200 pb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Technical Toolkit &amp; Software
            </h2>
            <div className="flex flex-wrap gap-2">
              {['C / C++', 'Java', 'Python', 'SQL', 'HTML / CSS', 'Microsoft Azure', 'VS Code', 'Git & GitHub', 'Arduino IDE', 'Workflow Automation'].map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-md font-mono text-xs border border-slate-200 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2 text-xs">
            <h2 className="font-mono font-bold uppercase tracking-widest text-red-600 border-b border-red-200 pb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Personal Interests &amp; Hobbies
            </h2>
            <p className="text-slate-600">
              Singing &bull; Travelling &bull; Painting &bull; Exploring Computer Hardware &amp; Embedded Innovations
            </p>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            NIDHI JHA &bull; UID: 25BAI10032 &bull; COA PORTFOLIO 2026
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
