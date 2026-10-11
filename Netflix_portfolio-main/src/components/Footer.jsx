const Footer = () => {
  return (
    <footer className="bg-white text-slate-900 py-16 px-6 md:px-12 border-t border-slate-200 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-slate-200">
          <div className="space-y-2">
            <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2">
              NIDHI JHA<span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block"></span>
            </div>
            <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
              // COMPUTER ORGANIZATION & ARCHITECTURE PORTFOLIO &bull; 25CST-201
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-slate-600 font-semibold">
            <a href="#home" className="hover:text-red-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-600 transition-colors">About</a>
            <a href="#cv" className="hover:text-red-600 transition-colors">My CV</a>
            <a href="#converter" className="hover:text-red-600 transition-colors">COA Tool</a>
            <a href="#projects" className="hover:text-red-600 transition-colors">Projects</a>
            <a href="#gallery" className="hover:text-red-600 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-red-600 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-slate-600">
          <div className="flex items-center gap-6 font-semibold">
            <a 
              href="https://github.com/Nidhi-jha-02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors uppercase tracking-wider"
            >
              GitHub //
            </a>
            <a 
              href="https://www.linkedin.com/in/nidhi-jha-683b7a37a/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors uppercase tracking-wider"
            >
              LinkedIn //
            </a>
            <a 
              href="#cv" 
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-cv-modal'));
              }}
              className="hover:text-red-600 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Curriculum Vitae //
            </a>
          </div>

          <div className="text-slate-500 tracking-widest uppercase">
            UID: 25BAI10032 &bull; B.E. in CSE (AI) &bull; Chandigarh University
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Nidhi Jha. All Rights Reserved.</p>
          <p className="text-red-600 font-semibold">COMPUTER ORGANIZATION & ARCHITECTURE &bull; 25CST-201</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;