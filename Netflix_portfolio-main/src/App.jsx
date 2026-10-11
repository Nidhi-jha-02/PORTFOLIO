import { useState } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import Hero from './components/Hero';
import About from './components/About';
import COALearningTool from './components/COALearningTool';
import CertificatesGallery from './components/CertificatesGallery';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900 relative selection:bg-red-600 selection:text-white">
      {/* Cinematic Preloader */}
      {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

      {/* Portfolio Sections */}
      <Hero />
      <About />
      <COALearningTool />
      <Projects />
      <CertificatesGallery />
      <Contact />
      <Footer />

      {/* Interactive Academic CV Modal */}
      <ResumeModal />
    </main>
  );
}

export default App;