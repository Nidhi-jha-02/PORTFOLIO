import { useState, useEffect, useCallback } from 'react';
import { certificatesData, assignmentData } from '../data/certificatesData';

const CertificatesGallery = () => {
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const certificates = certificatesData;
  const currentCert = certificates[selectedCertIndex] || certificates[0];

  const categories = ['All', 'Cloud & AI', 'Hackathons & Ideathons'];

  const filteredCertificates = activeCategory === 'All'
    ? certificates
    : activeCategory === 'Cloud & AI'
      ? certificates.filter(c => c.category === 'Cloud & AI')
      : certificates.filter(c => c.category !== 'Cloud & AI');

  // Lightbox Navigation
  const handleNextCert = useCallback(() => {
    setSelectedCertIndex((prev) => (prev + 1) % certificates.length);
  }, [certificates.length]);

  const handlePrevCert = useCallback(() => {
    setSelectedCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  }, [certificates.length]);

  const handleOpenLightbox = (index) => {
    setSelectedCertIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Keyboard navigation for Lightbox and Modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') handleCloseLightbox();
        if (e.key === 'ArrowRight') handleNextCert();
        if (e.key === 'ArrowLeft') handlePrevCert();
      } else if (isGalleryOpen) {
        if (e.key === 'Escape') setIsGalleryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isGalleryOpen, handleNextCert, handlePrevCert]);

  // Lock body scroll when modals open
  useEffect(() => {
    if (isGalleryOpen || isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen, isLightboxOpen]);

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen bg-[#f8fafc] text-slate-900 py-24 md:py-32 px-6 md:px-12 select-none overflow-hidden border-t border-slate-200"
    >
      {/* Scroll Anchors for Seamless Compatibility */}
      <div id="certificates" className="absolute -top-20"></div>
      <div id="achievements" className="absolute -top-20"></div>
      <div id="assignments" className="absolute -top-20"></div>

      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 backdrop-blur-2xl border border-red-600/30 text-xs font-mono uppercase tracking-widest text-slate-900 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-600 font-bold">EPISODE 05</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700">CERTIFICATES &amp; ACADEMIC GALLERY</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
            CERTIFICATES &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
              GALLERY.
            </span>
          </h2>

          <p className="text-slate-600 max-w-2xl text-sm md:text-base font-normal leading-relaxed">
            A verified digital collection of professional certifications, hackathon achievements, and the official Computer Organization &amp; Architecture academic assignment.
          </p>
        </div>

        {/* Combined Layout: Main Gallery (Col-8) + Side Assignment Panel (Col-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* MAIN AREA: CERTIFICATE GALLERY PORTFOLIO DOSSIER (COL 8) */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            
            {/* Dossier Card Container */}
            <div className="relative bg-white rounded-[2.5rem] border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.1)] transition-all duration-500 overflow-hidden flex flex-col">
              
              {/* Dossier Header Bar / Portfolio Folder Spine */}
              <div className="px-6 md:px-8 py-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-xs">
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold tracking-widest uppercase text-red-600">
                        CREDENTIAL ARCHIVE
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="text-[11px] font-mono text-slate-500 uppercase">
                        DOSSIER 25BAI10032
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                      Certificate &amp; Achievement Gallery
                    </h3>
                  </div>
                </div>

                {/* Explore Gallery Button */}
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-600 text-slate-800 hover:text-white border border-slate-200 hover:border-red-600 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <span>Explore Gallery ({certificates.length})</span>
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Showcase Body: Featured Certificate Viewport */}
              <div className="p-6 md:p-8 bg-slate-50/50">
                <div className="relative bg-white rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm group">
                  
                  {/* Subtle top metadata */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px] uppercase">
                        {currentCert.badge}
                      </span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">{currentCert.issuer}</span>
                    </div>
                    <span className="text-slate-400 hidden sm:inline">
                      Issued: {currentCert.issueDate}
                    </span>
                  </div>

                  {/* High Quality Interactive Image Frame */}
                  <div
                    onClick={() => handleOpenLightbox(selectedCertIndex)}
                    className="relative my-4 aspect-[16/11] sm:aspect-[16/10] bg-slate-900/5 rounded-xl border border-slate-200/90 overflow-hidden flex items-center justify-center cursor-pointer group/preview shadow-inner"
                    title="Click to view full certificate in lightbox"
                  >
                    <img
                      src={currentCert.image}
                      alt={currentCert.title}
                      className="w-full h-full object-contain p-2 sm:p-4 group-hover/preview:scale-[1.02] transition-transform duration-500"
                    />

                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <div className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                        <svg className="w-4 h-4 fill-none stroke-current stroke-2 text-red-600" viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        <span>Click to Enlarge</span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Summary Info */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                        {currentCert.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono">
                        Credential: <span className="text-slate-800 font-semibold">{currentCert.credentialId}</span> &bull; {currentCert.highlight}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenLightbox(selectedCertIndex)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-600 hover:text-red-700 uppercase tracking-wider cursor-pointer self-start sm:self-center"
                    >
                      <span>Full Preview</span>
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Document Previews Deck (Folder Tabs Row) */}
              <div className="p-6 md:p-8 bg-white border-t border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wider">
                  <span className="font-semibold text-slate-700">Dossier Index &bull; Select Document:</span>
                  <span>[{selectedCertIndex + 1} of {certificates.length}]</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {certificates.map((cert, idx) => {
                    const isSelected = idx === selectedCertIndex;
                    return (
                      <button
                        key={cert.id}
                        onClick={() => setSelectedCertIndex(idx)}
                        className={`group/tab relative p-2.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-red-50/70 border-red-600 shadow-sm ring-1 ring-red-600/20'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Thumbnail image */}
                        <div className="w-full aspect-[4/3] bg-white rounded-lg border border-slate-200/80 overflow-hidden mb-2 flex items-center justify-center p-1">
                          <img
                            src={cert.image}
                            alt={cert.shortTitle}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <span className={`block text-[10px] font-mono font-bold uppercase truncate ${
                            isSelected ? 'text-red-600' : 'text-slate-500 group-hover/tab:text-slate-800'
                          }`}>
                            {cert.badge}
                          </span>
                          <span className="block text-[11px] font-semibold text-slate-800 leading-tight line-clamp-1">
                            {cert.shortTitle}
                          </span>
                        </div>

                        {/* Active dot indicator */}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* SIDE AREA: COMPACT COA ASSIGNMENT PANEL (COL 4)          */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            
            {/* Assignment Panel Box */}
            <div className="relative bg-white rounded-[2.5rem] border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.1)] transition-all duration-500 overflow-hidden flex flex-col justify-between">
              
              {/* Assignment Top Header */}
              <div className="px-6 md:px-8 py-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-xs">
                    {/* Minimal PDF Icon */}
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-red-600 block">
                      ACADEMIC ARCHIVE
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                      COA Assignment
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-red-100 text-red-700 font-mono text-[10px] font-bold rounded-lg uppercase">
                  VERIFIED
                </span>
              </div>

              {/* Assignment Panel Body */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Visual Document Showcase Mockup */}
                <div className="relative p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-inner">
                  
                  {/* Badge & Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-red-600 font-semibold bg-white px-2.5 py-1 rounded-md border border-red-100 shadow-2xs">
                      {assignmentData.label}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      CODE: {assignmentData.subjectCode}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {assignmentData.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {assignmentData.description}
                    </p>
                  </div>

                  {/* Topic Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      ASSIGNMENT QUESTIONS &amp; MODULES:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-mono">
                      {assignmentData.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0"></span>
                          <span className="font-medium text-slate-800">{t.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Student & Course verification stamp */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 space-y-1 shadow-2xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Student:</span>
                      <span className="font-semibold text-slate-900">{assignmentData.student}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Course:</span>
                      <span className="font-semibold text-slate-900">{assignmentData.degree}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Submitted To:</span>
                      <span className="font-semibold text-red-600">{assignmentData.submittedTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Institution:</span>
                      <span className="font-semibold text-slate-900">{assignmentData.institution}</span>
                    </div>
                  </div>

                </div>

                {/* PDF Action Buttons (View PDF + Download PDF) */}
                <div className="space-y-3">
                  
                  {/* View PDF Button (Opens in new tab) */}
                  <a
                    href={assignmentData.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>View PDF (New Tab)</span>
                  </a>

                  {/* Download PDF Button */}
                  <a
                    href={assignmentData.pdfPath}
                    download={assignmentData.downloadFilename}
                    className="w-full px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-xs hover:border-slate-400 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2 text-slate-600 group-hover:text-red-600 group-hover:translate-y-0.5 transition-all" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download PDF</span>
                  </a>
                </div>

              </div>

              {/* Panel Footer */}
              <div className="px-6 md:px-8 py-4 bg-slate-50 border-t border-slate-200 text-center">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  // OFFICIAL ACADEMIC EVALUATION &bull; 2026
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: FULL CERTIFICATE GALLERY DRAWER / GRID OVERLAY   */}
      {/* ======================================================== */}
      {isGalleryOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 md:px-8 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900">
                    Official Certificate Collection
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    All {certificates.length} Verified Credentials &bull; Click any document for high-resolution view
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                aria-label="Close Gallery"
              >
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Filter Category Tabs */}
            <div className="px-6 md:px-8 py-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scrollable Grid of Certificates */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredCertificates.map((cert) => {
                  const originalIndex = certificates.findIndex(c => c.id === cert.id);
                  return (
                    <div
                      key={cert.id}
                      onClick={() => handleOpenLightbox(originalIndex)}
                      className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-red-600/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Certificate Thumbnail with full proportions */}
                      <div className="relative aspect-[4/3] bg-slate-50 rounded-xl border border-slate-100 overflow-hidden mb-3 flex items-center justify-center p-2 group-hover:bg-slate-100/50 transition-colors">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-lg bg-white/95 text-slate-900 text-xs font-mono font-bold shadow-md">
                            View Fullscreen
                          </span>
                        </div>
                      </div>

                      {/* Certificate Details */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded">
                            {cert.badge}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {cert.issueDate}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                          {cert.title}
                        </h4>

                        <p className="text-xs text-slate-500 font-mono truncate">
                          {cert.issuer}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="px-6 md:px-8 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-bold">Esc</kbd> to return</span>
              <span>Showing {filteredCertificates.length} of {certificates.length} credentials</span>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: LIGHTBOX FULL RESOLUTION VIEWER                 */}
      {/* ======================================================== */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[11000] flex flex-col justify-between bg-slate-950/92 backdrop-blur-xl p-4 sm:p-6 text-white animate-in fade-in duration-200 select-none"
          onClick={handleCloseLightbox}
        >
          {/* Lightbox Top Header */}
          <div 
            className="flex items-center justify-between relative z-20 pb-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-mono font-bold uppercase tracking-wider">
                {currentCert.badge}
              </span>
              <span className="text-white/60 font-mono text-xs hidden sm:inline">
                [ {selectedCertIndex + 1} / {certificates.length} ] &bull; {currentCert.issuer}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={currentCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                title="Open original image file"
              >
                <span>Raw File</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>

              <button
                onClick={handleCloseLightbox}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Lightbox Main Stage (Certificate with Next/Prev) */}
          <div 
            className="flex-1 flex items-center justify-between gap-4 my-auto relative z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrevCert}
              className="p-3 md:p-4 rounded-2xl bg-white/10 hover:bg-red-600 text-white transition-all duration-300 cursor-pointer backdrop-blur-md shadow-xl hover:scale-105 active:scale-95"
              aria-label="Previous Certificate"
            >
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Full-view Certificate Image (Preserving exact aspect ratio and readability) */}
            <div className="flex-1 max-h-[75vh] flex items-center justify-center p-2">
              <img
                src={currentCert.image}
                alt={currentCert.title}
                className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/20 bg-white"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextCert}
              className="p-3 md:p-4 rounded-2xl bg-white/10 hover:bg-red-600 text-white transition-all duration-300 cursor-pointer backdrop-blur-md shadow-xl hover:scale-105 active:scale-95"
              aria-label="Next Certificate"
            >
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Lightbox Bottom Footer & Details */}
          <div 
            className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h4 className="text-base font-bold text-white">
                {currentCert.title}
              </h4>
              <p className="text-white/60">
                {currentCert.issuer} &bull; Issued {currentCert.issueDate} &bull; ID: {currentCert.credentialId}
              </p>
            </div>

            <div className="flex items-center gap-4 text-white/50">
              <span className="hidden md:inline">Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white">→</kbd> to navigate</span>
              <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white">Esc</kbd> to exit</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default CertificatesGallery;
