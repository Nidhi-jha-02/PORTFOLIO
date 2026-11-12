import { useState } from 'react';

const COACaseStudy = () => {
  // Active insight tab for the interactive case study breakdown
  const [activeTab, setActiveTab] = useState('amat');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pdfUrl = '/documents/coa-case-study.pdf';
  const downloadFilename = 'COA_Case_Study_Cache_Memory_Performance_Analysis_Nidhi_Jha_25BAI10032.pdf';

  const metrics = [
    {
      label: 'Cache Hit Ratio',
      value: '85.0%',
      formula: '850 / 1,000 Accesses',
      detail: 'Ultra-fast L1 cache hits',
      highlight: true
    },
    {
      label: 'Cache Miss Ratio',
      value: '15.0%',
      formula: '150 / 1,000 Accesses',
      detail: 'Requires main memory fetch',
      highlight: false
    },
    {
      label: 'Cache Hit Time',
      value: '2.0 ns',
      formula: 't_hit (L1 SRAM)',
      detail: 'Direct processor hit latency',
      highlight: false
    },
    {
      label: 'Miss Penalty',
      value: '50.0 ns',
      formula: 't_miss (Main RAM)',
      detail: 'Bus latency & DRAM access',
      highlight: false
    },
    {
      label: 'AMAT Result',
      value: '9.5 ns',
      formula: 'Hit + (Miss Rate × Penalty)',
      detail: 'Average Memory Access Time',
      highlight: true
    },
    {
      label: 'Effective Speedup',
      value: '5.47x',
      formula: '52 ns vs 9.5 ns',
      detail: '81.7% latency reduction',
      highlight: true
    }
  ];

  const tabs = [
    { id: 'amat', label: 'AMAT Calculation & Formula' },
    { id: 'locality', label: 'Locality of Reference' },
    { id: 'architecture', label: 'CPU–Cache–RAM Diagram' },
    { id: 'observations', label: 'Key Observations' }
  ];

  return (
    <section
      id="case-study"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#f8fafc] text-slate-900 border-t border-slate-200 select-none overflow-hidden"
    >
      {/* Anchor IDs for smooth scroll compatibility */}
      <div id="coa-case-study" className="absolute -top-20"></div>

      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[13vw] sm:text-[16vw] md:text-[18vw] font-black text-slate-900/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          CASE STUDY
        </h1>
      </div>

      {/* Ambient Red Glow Accents */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-3xl">
            {/* Episode Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-600/30 text-xs font-mono uppercase tracking-widest text-slate-900 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-600 font-bold">EPISODE 03</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-700">ACADEMIC RESEARCH &amp; ANALYSIS</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              COA CASE STUDY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                CACHE MEMORY PERFORMANCE ANALYSIS.
              </span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed">
              An empirical architectural investigation into memory hierarchy dynamics under a 1,000-access processor trace. Explores cache effectiveness, mathematical derivation of Hit and Miss Ratios, principles of Temporal and Spatial Locality, and Average Memory Access Time (AMAT) optimization.
            </p>

            {/* University & Student Metadata Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-slate-600">
              <span className="px-2.5 py-1 bg-red-50 text-red-700 font-bold rounded-md border border-red-200">
                Chandigarh University (UIE)
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-1 bg-white text-slate-800 rounded-md border border-slate-200 shadow-sm">
                Subject: COA
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-1 bg-white text-slate-800 rounded-md border border-slate-200 shadow-sm">
                Student: Nidhi Jha (UID: 25BAI10032)
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-1 bg-white text-slate-800 rounded-md border border-slate-200 shadow-sm">
                Section: 25BAI-601
              </span>
            </div>
          </div>

          {/* Primary Action Buttons Header Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 self-start lg:self-end">
            {/* View Case Study Button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_8px_25px_rgba(229,9,20,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View Case Study</span>
            </a>

            {/* Download PDF Button */}
            <a
              href={pdfUrl}
              download={downloadFilename}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-red-600 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Key Quantitative Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                item.highlight
                  ? 'bg-gradient-to-br from-white to-red-50/50 border-red-300 shadow-sm shadow-red-600/5'
                  : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold truncate">
                {item.label}
              </span>
              <div className="my-2">
                <div className={`text-2xl font-black tracking-tight ${item.highlight ? 'text-red-600' : 'text-slate-900'}`}>
                  {item.value}
                </div>
                <div className="text-[11px] font-mono text-slate-600 truncate mt-0.5">
                  {item.formula}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-1.5 truncate">
                {item.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Main Section Content: Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (Col 7): Professional PDF Document Preview */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col">

            {/* Window Chrome / Title Bar */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                {/* Mac-style traffic lights */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                </div>
                <span className="text-xs font-mono font-medium text-slate-300 tracking-wider truncate max-w-[200px] sm:max-w-none">
                  coa-case-study.pdf
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-300 font-medium tracking-widest uppercase">
                  5 Pages · Official PDF
                </span>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  title="Expand to Fullscreen View"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </button>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open PDF in new tab"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Live Interactive PDF Viewer Frame */}
            <div className="relative w-full bg-slate-100 flex flex-col">
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                title="COA Case Study PDF Document Preview"
                className="w-full h-[520px] sm:h-[620px] md:h-[680px] border-0 bg-slate-100"
              />

              {/* Mobile Friendly Notice & Quick Action Strip */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Document verified &bull; Cache Memory Performance Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in new tab</span>
                    <svg className="w-3 h-3 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </a>
                  <span className="text-slate-300">|</span>
                  <a
                    href={pdfUrl}
                    download={downloadFilename}
                    className="text-slate-700 hover:text-red-600 font-bold underline cursor-pointer"
                  >
                    Download (222 KB)
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Col 5): Architectural Insights & Case Study Breakdown */}
          <div className="lg:col-span-5 space-y-6">

            {/* Scenario Synopsis Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold px-2.5 py-1 bg-red-50 rounded-md border border-red-200">
                  PROBLEM STATEMENT &amp; SCENARIO
                </span>
                <span className="text-xs font-mono text-slate-400">UID: 25BAI10032</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                Processor Memory Access Simulation
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                A processor issues <strong className="text-slate-900">1,000 memory access requests</strong>. Of these, <strong className="text-slate-900">850 accesses result in cache hits</strong> and <strong className="text-slate-900">150 accesses result in cache misses</strong>. With a cache hit time of <strong className="text-slate-900">2 ns</strong> and an additional miss penalty of <strong className="text-slate-900">50 ns</strong>, evaluate system effectiveness.
              </p>

              {/* Quick Comparison Row: Hit vs Miss */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    CACHE HIT (85%)
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-tight">
                    Data found in CPU cache. Ultra-fast 2 ns access latency. Maximizes CPU throughput.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 font-mono">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    CACHE MISS (15%)
                  </div>
                  <p className="text-[11px] text-rose-900 leading-tight">
                    Data absent from cache. Triggers RAM fetch with 50 ns additional stall penalty.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Tabbed Deep Dive */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              
              {/* Tabs Navigation */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: AMAT Derivation */}
              {activeTab === 'amat' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs space-y-2">
                    <div className="text-red-400 font-bold uppercase tracking-wider">// AMAT MATHEMATICAL FORMULA</div>
                    <div className="text-sm font-bold text-white">AMAT = Hit Time + (Miss Rate × Miss Penalty)</div>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-slate-700">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span>Total Memory Accesses:</span>
                      <strong className="text-slate-900">1,000 accesses</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span>Hit Ratio (h):</span>
                      <strong className="text-emerald-600">850 / 1000 = 0.85 (85%)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span>Miss Rate (m):</span>
                      <strong className="text-rose-600">150 / 1000 = 0.15 (15%)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span>Hit Ratio + Miss Ratio:</span>
                      <strong className="text-slate-900">85% + 15% = 100% (Unity)</strong>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200 text-red-950">
                      <span className="font-bold">Step 2: AMAT = 2 + (0.15 × 50):</span>
                      <strong className="text-sm text-red-600 font-black">2 + 7.5 = 9.5 ns</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    By keeping 85% of data in L1 cache, the average access latency drops from <span className="font-semibold text-slate-700">52.0 ns</span> (full memory penalty) to just <span className="font-semibold text-red-600">9.5 ns</span>, yielding a dramatic acceleration in processor execution speed.
                  </p>
                </div>
              )}

              {/* Tab 2: Locality of Reference */}
              {activeTab === 'locality' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {/* Temporal Locality */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-red-600 uppercase">
                          1. Temporal Locality
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Time-based</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        If data or an instruction is referenced once, it is highly likely to be accessed again in the near future.
                      </p>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                        <code>for (int i = 0; i &lt; N; i++) &#123; sum += i; &#125; // &apos;sum&apos; &amp; &apos;i&apos; cached</code>
                      </div>
                    </div>

                    {/* Spatial Locality */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-red-600 uppercase">
                          2. Spatial Locality
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Space-based</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        If a specific memory location is referenced, adjacent memory locations are likely to be accessed soon.
                      </p>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                        <code>array[0], array[1], array[2]... // contiguous block fetched</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: CPU–Cache–RAM Diagram */}
              {activeTab === 'architecture' && (
                <div className="space-y-4">
                  {/* Visual Hierarchical Architecture Schematic */}
                  <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 font-mono">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest text-center">
                      CPU – CACHE – RAM DATA PATH
                    </div>

                    {/* Step 1: CPU */}
                    <div className="p-3 bg-red-600/20 border border-red-500 rounded-xl text-center">
                      <div className="text-xs font-bold text-red-400">CPU (Central Processing Unit)</div>
                      <div className="text-[10px] text-slate-300">Generates 1,000 Memory Accesses</div>
                    </div>

                    <div className="flex justify-center text-red-400 font-bold text-xs">
                      ↓ Memory Request
                    </div>

                    {/* Step 2: Cache */}
                    <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-center space-y-1">
                      <div className="text-xs font-bold text-white">Cache Memory (High Speed SRAM)</div>
                      <div className="text-[10px] text-emerald-400">
                        Hit (850 requests) → Return to CPU in 2 ns
                      </div>
                    </div>

                    <div className="flex justify-center text-slate-500 font-bold text-xs">
                      ↓ Cache Miss (150 requests)
                    </div>

                    {/* Step 3: Main Memory */}
                    <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl text-center">
                      <div className="text-xs font-bold text-slate-300">Main Memory (DRAM)</div>
                      <div className="text-[10px] text-rose-400">
                        Miss Penalty: +50 ns additional latency
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Key Observations */}
              {activeTab === 'observations' && (
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      1. High Cache Hit Ratio (85%)
                    </div>
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      Most data requests (850 out of 1,000) are successfully fulfilled within the high-speed CPU cache, minimizing bus traffic.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 font-mono">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      2. Low Cache Miss Ratio (15%)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Only 15% of requests require traversing system buses to access slower main RAM, keeping wait states minimal.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50/70 rounded-2xl border border-red-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-800 font-mono">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      3. Superior System Performance (AMAT = 9.5 ns)
                    </div>
                    <p className="text-xs text-red-950 leading-relaxed">
                      The Average Memory Access Time of 9.5 ns represents an 81.7% latency reduction compared to un-cached memory (52 ns), directly improving instructions per cycle (IPC).
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Buttons Group inside Sidebar */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono uppercase tracking-widest rounded-xl text-center transition-all duration-300 shadow-md shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  View Case Study
                </a>
                <a
                  href={pdfUrl}
                  download={downloadFilename}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold text-xs font-mono uppercase tracking-widest rounded-xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Download PDF
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen PDF Modal Preview */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col p-3 sm:p-6 md:p-8 animate-fadeIn">
          <div className="max-w-6xl w-full mx-auto h-full flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-white ml-1 sm:ml-2 truncate max-w-[200px] sm:max-w-md">
                  COA Case Study &bull; Cache Memory Performance Analysis
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="hidden sm:inline">Open New Tab</span>
                  <span className="sm:hidden">Open</span>
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={pdfUrl}
                  download={downloadFilename}
                  className="hidden sm:inline-flex px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-red-600 text-slate-200 transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Iframe */}
            <iframe
              src={pdfUrl}
              title="COA Case Study Fullscreen Viewer"
              className="w-full h-full border-0 bg-slate-100 flex-1"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default COACaseStudy;
