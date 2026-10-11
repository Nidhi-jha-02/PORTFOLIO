import { useState, useEffect, useMemo } from 'react';
import { compileAllFormats } from '../utils/coaSimulator';

const COALearningTool = () => {
  // Global Active Tool View: 'radix' | 'instruction' | 'dual'
  const [activeTab, setActiveTab] = useState('radix');

  // ========================================================
  // TOOL 1: NUMBER SYSTEM CONVERTER STATE & LOGIC
  // ========================================================
  const [selectedBase, setSelectedBase] = useState('dec'); // 'dec' | 'bin' | 'oct' | 'hex'
  const [inputValue, setInputValue] = useState('42');
  const [copiedField, setCopiedField] = useState(null);

  // Parse decimal value safely
  const currentDecimal = useMemo(() => {
    if (!inputValue || inputValue.trim() === '') return 0;
    try {
      let parsed = 0;
      if (selectedBase === 'dec') parsed = parseInt(inputValue, 10);
      else if (selectedBase === 'bin') parsed = parseInt(inputValue, 2);
      else if (selectedBase === 'oct') parsed = parseInt(inputValue, 8);
      else if (selectedBase === 'hex') parsed = parseInt(inputValue, 16);
      return isNaN(parsed) || parsed < 0 ? 0 : Math.min(parsed, 65535);
    } catch {
      return 0;
    }
  }, [inputValue, selectedBase]);

  // Synchronized values across all 4 bases
  const conversions = useMemo(() => {
    const num = currentDecimal;
    const decStr = num.toString(10);
    const binStr = num.toString(2);
    const octStr = num.toString(8);
    const hexStr = num.toString(16).toUpperCase();
    const bin16 = binStr.padStart(16, '0');
    const twosComp = ((~num + 1) & 0xFFFF).toString(2).padStart(16, '0');

    return {
      dec: decStr,
      bin: binStr,
      oct: octStr,
      hex: hexStr,
      bin16,
      twosComp,
      ascii: num >= 32 && num <= 126 ? String.fromCharCode(num) : 'Control'
    };
  }, [currentDecimal]);

  // Handle Input Changes with input base restrictions
  const handleInputChange = (rawVal) => {
    let cleanVal = rawVal;
    if (selectedBase === 'dec') cleanVal = rawVal.replace(/[^0-9]/g, '');
    else if (selectedBase === 'bin') cleanVal = rawVal.replace(/[^01]/g, '');
    else if (selectedBase === 'oct') cleanVal = rawVal.replace(/[^0-7]/g, '');
    else if (selectedBase === 'hex') cleanVal = rawVal.replace(/[^0-9a-fA-F]/g, '').toUpperCase();

    // Prevent overflow beyond 16 bits (65,535)
    let parsed = 0;
    if (selectedBase === 'dec') parsed = parseInt(cleanVal, 10);
    else if (selectedBase === 'bin') parsed = parseInt(cleanVal, 2);
    else if (selectedBase === 'oct') parsed = parseInt(cleanVal, 8);
    else if (selectedBase === 'hex') parsed = parseInt(cleanVal, 16);

    if (!isNaN(parsed) && parsed > 65535) {
      return; // cap at 16-bit word
    }

    setInputValue(cleanVal);
  };

  // Switch Active Input Radix
  const handleBaseSwitch = (newBase) => {
    setSelectedBase(newBase);
    if (newBase === 'dec') setInputValue(conversions.dec);
    else if (newBase === 'bin') setInputValue(conversions.bin);
    else if (newBase === 'oct') setInputValue(conversions.oct);
    else if (newBase === 'hex') setInputValue(conversions.hex);
  };

  // Toggle individual bit inside 16-bit array
  const handleToggleBit = (bitIndex) => {
    const mask = 1 << bitIndex;
    const nextVal = currentDecimal ^ mask;
    const clamped = nextVal & 0xFFFF;
    
    if (selectedBase === 'dec') setInputValue(clamped.toString(10));
    else if (selectedBase === 'bin') setInputValue(clamped.toString(2));
    else if (selectedBase === 'oct') setInputValue(clamped.toString(8));
    else if (selectedBase === 'hex') setInputValue(clamped.toString(16).toUpperCase());
  };

  // Bit operations
  const handleBitShiftLeft = () => {
    const next = (currentDecimal << 1) & 0xFFFF;
    applyNewNumber(next);
  };

  const handleBitShiftRight = () => {
    const next = (currentDecimal >> 1) & 0xFFFF;
    applyNewNumber(next);
  };

  const handleBitInvert = () => {
    const next = (~currentDecimal) & 0xFFFF;
    applyNewNumber(next);
  };

  const applyNewNumber = (num) => {
    if (selectedBase === 'dec') setInputValue(num.toString(10));
    else if (selectedBase === 'bin') setInputValue(num.toString(2));
    else if (selectedBase === 'oct') setInputValue(num.toString(8));
    else if (selectedBase === 'hex') setInputValue(num.toString(16).toUpperCase());
  };

  const copyToClipboard = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  // ========================================================
  // TOOL 2: INSTRUCTION FORMAT SIMULATOR STATE & LOGIC
  // ========================================================
  const [expression, setExpression] = useState('(A + B) * (C - D)');
  const [activeFormat, setActiveFormat] = useState('0-address'); // '0-address' | '1-address' | '2-address' | '3-address'
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Compile all 4 instruction formats dynamically
  const compiledProgram = useMemo(() => {
    return compileAllFormats(expression, 'X');
  }, [expression]);

  const activeSteps = useMemo(() => {
    if (activeFormat === '0-address') return compiledProgram.zeroAddress;
    if (activeFormat === '1-address') return compiledProgram.oneAddress;
    if (activeFormat === '2-address') return compiledProgram.twoAddress;
    return compiledProgram.threeAddress;
  }, [activeFormat, compiledProgram]);

  const handleFormatChange = (fmt) => {
    setActiveFormat(fmt);
    setCurrentStep(1);
    setIsPlaying(false);
  };

  const handleExpressionChange = (val) => {
    setExpression(val);
    setCurrentStep(1);
    setIsPlaying(false);
  };

  // Auto-play step simulation
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= activeSteps.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSteps.length]);

  const activeStepObj = activeSteps[currentStep - 1] || activeSteps[0] || {
    step: 1,
    mnemonic: 'NOP',
    operand: '',
    action: 'Idle',
    explanation: 'Ready'
  };

  return (
    <section 
      id="converter" 
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#f8fafc] text-slate-900 border-t border-slate-200 select-none overflow-hidden"
    >
      {/* Background Cyber-Glows */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-600/30 text-xs font-mono uppercase tracking-widest text-slate-900 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-600 font-bold">EPISODE 02</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-700">COA ARCHITECTURE LABORATORY</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              FUTURISTIC COA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                EXPERIMENT LAB.
              </span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed">
              An interactive computer architecture workbench: live bidirectional number system radix transformations and multi-address instruction format execution simulator.
            </p>
          </div>

          {/* Futuristic Lab Mode HUD Selector */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md flex items-center gap-1.5 self-start md:self-end">
            <button
              onClick={() => setActiveTab('radix')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'radix'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h12"></path>
              </svg>
              <span>01 // Radix Converter</span>
            </button>

            <button
              onClick={() => setActiveTab('instruction')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'instruction'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span>02 // Instruction Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('dual')}
              className={`px-3 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hidden lg:flex items-center gap-1.5 ${
                activeTab === 'dual'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Show Both Laboratory Tools Stacked"
            >
              <span>Dual Lab</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODULE 1: NUMBER SYSTEM CONVERTER (RADIX TRANSLATOR MATRIX)               */}
        {/* ========================================================================= */}
        {(activeTab === 'radix' || activeTab === 'dual') && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Lab Module Header Pill */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-mono text-xs font-bold">
                  TOOL 01
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Quantum Number System Converter
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Dynamic Base 2 &bull; 8 &bull; 10 &bull; 16 Bidirectional Translator
              </span>
            </div>

            {/* Radix Control Deck */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] space-y-6">
              
              {/* Input Radix Selector Tabs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wider">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    Select Input Number System:
                  </span>
                  <span>Range: 0 &ndash; 65,535 (16-bit word)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'dec', label: 'Decimal (DEC)', base: 'Base 10', digits: 'Digits 0–9', color: 'red' },
                    { id: 'bin', label: 'Binary (BIN)', base: 'Base 2', digits: 'Bits 0, 1', color: 'blue' },
                    { id: 'oct', label: 'Octal (OCT)', base: 'Base 8', digits: 'Octets 0–7', color: 'amber' },
                    { id: 'hex', label: 'Hexadecimal (HEX)', base: 'Base 16', digits: '0–9, A–F', color: 'purple' }
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleBaseSwitch(b.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedBase === b.id
                          ? 'bg-red-50/70 border-red-600 shadow-sm ring-1 ring-red-600/20'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold ${
                          selectedBase === b.id ? 'text-red-600' : 'text-slate-800'
                        }`}>
                          {b.label}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                          {b.base}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono mt-1">
                        {b.digits}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Futuristic Cyber Input Box */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 font-mono text-xs text-red-400 font-bold tracking-widest pointer-events-none uppercase">
                  RADIX INPUT // {selectedBase.toUpperCase()}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-red-600 font-mono text-xs font-bold text-white shadow-md">
                      {selectedBase === 'dec' ? 'DEC:' : selectedBase === 'bin' ? 'BIN 0b' : selectedBase === 'oct' ? 'OCT 0o' : 'HEX 0x'}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={`Enter ${selectedBase.toUpperCase()} number...`}
                    className="flex-1 bg-transparent text-2xl md:text-3xl font-mono font-bold text-white focus:outline-none tracking-wider placeholder-slate-600"
                  />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInputValue('')}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => applyNewNumber(Math.floor(Math.random() * 256))}
                      className="px-3 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600 text-xs font-mono text-red-200 hover:text-white border border-red-500/40 transition-colors cursor-pointer"
                    >
                      ⚡ Random
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Presets Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                <span className="text-xs font-mono text-slate-500 font-semibold mr-1">Quick Presets:</span>
                {[
                  { label: '0', val: 0 },
                  { label: '15 (0x0F)', val: 15 },
                  { label: '42 (Default)', val: 42 },
                  { label: '127 (7-bit)', val: 127 },
                  { label: '255 (Byte 0xFF)', val: 255 },
                  { label: '1024 (1 KB)', val: 1024 },
                  { label: '65535 (Word)', val: 65535 }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyNewNumber(p.val)}
                    className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                      currentDecimal === p.val 
                        ? 'bg-red-600 text-white border-red-600 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Live 4-Way Output Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                
                {/* 1. DECIMAL CARD */}
                <div 
                  onClick={() => handleBaseSwitch('dec')}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    selectedBase === 'dec'
                      ? 'bg-red-50/60 border-red-500 shadow-md ring-2 ring-red-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      DECIMAL [10]
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(conversions.dec, 'dec');
                      }}
                      className="text-xs font-mono text-slate-400 hover:text-red-600 transition-colors"
                      title="Copy Decimal"
                    >
                      {copiedField === 'dec' ? <span className="text-emerald-600 font-bold">✓ Copied</span> : 'Copy'}
                    </button>
                  </div>
                  
                  <div className="my-4">
                    <div className="text-3xl font-black font-mono text-slate-900 tracking-tight break-all">
                      {conversions.dec || '0'}
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">
                      Formula: ({conversions.dec || '0'})₁₀
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>Radix Weight: 10⁰, 10¹...</span>
                    <span>Scientific: {(currentDecimal).toExponential(2)}</span>
                  </div>
                </div>

                {/* 2. BINARY CARD */}
                <div 
                  onClick={() => handleBaseSwitch('bin')}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    selectedBase === 'bin'
                      ? 'bg-blue-50/60 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      BINARY [2]
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(conversions.bin, 'bin');
                      }}
                      className="text-xs font-mono text-slate-400 hover:text-blue-600 transition-colors"
                      title="Copy Binary"
                    >
                      {copiedField === 'bin' ? <span className="text-emerald-600 font-bold">✓ Copied</span> : 'Copy'}
                    </button>
                  </div>

                  <div className="my-4">
                    <div className="text-2xl md:text-3xl font-black font-mono text-slate-900 tracking-wider break-all text-blue-900">
                      {conversions.bin || '0'}
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">
                      Formula: ({conversions.bin || '0'})₂
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>Length: {conversions.bin.length} bits</span>
                    <span>2's Comp: {conversions.twosComp.slice(-8)}</span>
                  </div>
                </div>

                {/* 3. OCTAL CARD */}
                <div 
                  onClick={() => handleBaseSwitch('oct')}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    selectedBase === 'oct'
                      ? 'bg-amber-50/60 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      OCTAL [8]
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(conversions.oct, 'oct');
                      }}
                      className="text-xs font-mono text-slate-400 hover:text-amber-600 transition-colors"
                      title="Copy Octal"
                    >
                      {copiedField === 'oct' ? <span className="text-emerald-600 font-bold">✓ Copied</span> : 'Copy'}
                    </button>
                  </div>

                  <div className="my-4">
                    <div className="text-3xl font-black font-mono text-slate-900 tracking-tight break-all text-amber-900">
                      {conversions.oct || '0'}
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">
                      Formula: ({conversions.oct || '0'})₈
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>Triads: 3 bits/digit</span>
                    <span>Radix: 2³ = 8</span>
                  </div>
                </div>

                {/* 4. HEXADECIMAL CARD */}
                <div 
                  onClick={() => handleBaseSwitch('hex')}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    selectedBase === 'hex'
                      ? 'bg-purple-50/60 border-purple-500 shadow-md ring-2 ring-purple-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      HEXADECIMAL [16]
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(conversions.hex, 'hex');
                      }}
                      className="text-xs font-mono text-slate-400 hover:text-purple-600 transition-colors"
                      title="Copy Hex"
                    >
                      {copiedField === 'hex' ? <span className="text-emerald-600 font-bold">✓ Copied</span> : 'Copy'}
                    </button>
                  </div>

                  <div className="my-4">
                    <div className="text-3xl font-black font-mono text-slate-900 tracking-tight break-all text-purple-900 flex items-baseline gap-1">
                      <span className="text-sm text-purple-400 font-bold">0x</span>
                      <span>{conversions.hex || '0'}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">
                      Formula: ({conversions.hex || '0'})₁₆
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>Nibbles: 4 bits/hex</span>
                    <span>ASCII: '{conversions.ascii}'</span>
                  </div>
                </div>

              </div>

              {/* Interactive 16-Bit Register Bit-Flipper */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      16-Bit Hardware Register Bit-Flipper
                    </span>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Click any bit below to toggle high (1) or low (0) and observe instantaneous radix recalculation across all 4 bases.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBitShiftLeft}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      title="Shift Left (<< 1)"
                    >
                      &laquo; SHL
                    </button>
                    <button
                      onClick={handleBitShiftRight}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      title="Shift Right (>> 1)"
                    >
                      SHR &raquo;
                    </button>
                    <button
                      onClick={handleBitInvert}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      title="Invert NOT (~)"
                    >
                      ~ NOT
                    </button>
                  </div>
                </div>

                {/* 16-Bit Grid with 4-Bit Nibble Grouping */}
                <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 text-center pt-2">
                  {[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((bitIdx) => {
                    const bit = conversions.bin16[15 - bitIdx];
                    const isHigh = bit === '1';
                    return (
                      <div key={bitIdx} className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block font-semibold">b{bitIdx}</span>
                        <button
                          onClick={() => handleToggleBit(bitIdx)}
                          className={`w-full h-11 rounded-xl font-mono font-bold text-sm transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs ${
                            isHigh
                              ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-400/50 scale-105'
                              : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                          }`}
                          title={`Toggle bit ${bitIdx} (weight: 2^${bitIdx} = ${Math.pow(2, bitIdx)})`}
                        >
                          {bit}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Nibble Division Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-[11px] font-mono text-slate-600">
                  <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between">
                    <span className="text-slate-400">Nibble 3:</span>
                    <strong className="text-slate-900">{conversions.bin16.slice(0, 4)} ({parseInt(conversions.bin16.slice(0, 4), 2).toString(16).toUpperCase()})</strong>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between">
                    <span className="text-slate-400">Nibble 2:</span>
                    <strong className="text-slate-900">{conversions.bin16.slice(4, 8)} ({parseInt(conversions.bin16.slice(4, 8), 2).toString(16).toUpperCase()})</strong>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between">
                    <span className="text-slate-400">Nibble 1:</span>
                    <strong className="text-slate-900">{conversions.bin16.slice(8, 12)} ({parseInt(conversions.bin16.slice(8, 12), 2).toString(16).toUpperCase()})</strong>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between">
                    <span className="text-slate-400">Nibble 0:</span>
                    <strong className="text-slate-900">{conversions.bin16.slice(12, 16)} ({parseInt(conversions.bin16.slice(12, 16), 2).toString(16).toUpperCase()})</strong>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: INSTRUCTION FORMAT SIMULATOR (MULTI-ADDRESS CPU ENGINE)         */}
        {/* ========================================================================= */}
        {(activeTab === 'instruction' || activeTab === 'dual') && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Lab Module Header Pill */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-mono text-xs font-bold">
                  TOOL 02
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Instruction Format Simulator (0, 1, 2, 3-Address)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Interactive Multi-Address Micro-architecture Compiler
              </span>
            </div>

            {/* Instruction Lab Main Container */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] space-y-8">
              
              {/* Expression Synthesizer Input Deck */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wider">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    Enter or Select Arithmetic Expression:
                  </span>
                  <span>Evaluates to Target Variable X</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-slate-400 font-bold text-sm">
                      X =
                    </span>
                    <input
                      type="text"
                      value={expression}
                      onChange={(e) => handleExpressionChange(e.target.value)}
                      placeholder="e.g. (A + B) * (C - D)"
                      className="w-full font-mono text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-2xl pl-14 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all tracking-wider"
                    />
                  </div>
                </div>

                {/* Preset Expression Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-mono text-slate-500 font-semibold mr-1">COA Textbook Presets:</span>
                  {[
                    '(A + B) * (C - D)',
                    '(A * B) + (C / D)',
                    '(A + B) / (C + D)',
                    'A + (B * C) - D',
                    '(A * B) - (C * D)'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExpressionChange(preset)}
                      className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        expression === preset
                          ? 'bg-red-600 text-white border-red-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4-Way Architecture Format Selector Buttons */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">
                  Select CPU Architecture Format:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      id: '0-address',
                      title: '0-Address (Stack CPU)',
                      tag: 'ZERO-OPERAND // TOS',
                      desc: 'Arithmetic ops have zero address fields. Operates on Top of Stack (TOS) via PUSH/POP.',
                      stepsCount: compiledProgram.zeroAddress.length
                    },
                    {
                      id: '1-address',
                      title: '1-Address (Accumulator)',
                      tag: 'SINGLE-OPERAND // AC',
                      desc: 'Implicit Accumulator (AC) register holds first operand and stores computation result.',
                      stepsCount: compiledProgram.oneAddress.length
                    },
                    {
                      id: '2-address',
                      title: '2-Address (General Reg)',
                      tag: 'DUAL-OPERAND // REGISTERS',
                      desc: 'Specifies 2 operands: destination overwrites source operand (R1 ← R1 + B).',
                      stepsCount: compiledProgram.twoAddress.length
                    },
                    {
                      id: '3-address',
                      title: '3-Address (RISC Triad)',
                      tag: 'TRIAD-OPERAND // 3-REGISTERS',
                      desc: 'Specifies Destination and two Sources (R1 ← A + B). Preserves source registers.',
                      stepsCount: compiledProgram.threeAddress.length
                    }
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => handleFormatChange(fmt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        activeFormat === fmt.id
                          ? 'bg-red-50/70 border-red-600 shadow-md ring-1 ring-red-600/30'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-mono font-bold uppercase ${
                            activeFormat === fmt.id ? 'text-red-600' : 'text-slate-500'
                          }`}>
                            {fmt.tag}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-bold">
                            {fmt.stepsCount} Inst
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {fmt.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1 font-normal">
                          {fmt.desc}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                        <span className={activeFormat === fmt.id ? 'text-red-600 font-bold' : 'text-slate-400'}>
                          {activeFormat === fmt.id ? '● Active Format' : 'Select Mode'}
                        </span>
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 text-slate-400" viewBox="0 0 24 24">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Interactive Micro-Architecture Player */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
                
                {/* Player Top Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                          LIVE EXECUTION STEPPER
                        </span>
                        <span className="text-white/40 text-xs font-mono">&bull;</span>
                        <span className="text-xs font-mono text-white/70">
                          Step {currentStep} of {activeSteps.length}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {activeStepObj.mnemonic} {activeStepObj.operand}
                      </h4>
                    </div>
                  </div>

                  {/* Playback Button Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep(1);
                      }}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Reset to Step 1"
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polygon points="11 19 2 12 11 5 11 19"></polygon>
                        <polygon points="22 19 13 12 22 5 22 19"></polygon>
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep((p) => Math.max(1, p - 1));
                      }}
                      disabled={currentStep <= 1}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:pointer-events-none text-white transition-colors cursor-pointer"
                      title="Previous Step"
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                          <span>Auto Play</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep((p) => Math.min(activeSteps.length, p + 1));
                      }}
                      disabled={currentStep >= activeSteps.length}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:pointer-events-none text-white transition-colors cursor-pointer"
                      title="Next Step"
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-600 h-full transition-all duration-300"
                    style={{ width: `${(currentStep / activeSteps.length) * 100}%` }}
                  />
                </div>

                {/* Dynamic Hardware State Telemetry HUD */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Hardware Diagram Visualizer */}
                  <div className="md:col-span-6 bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-white/50">
                      <span>HARDWARE COA STATE</span>
                      <span className="text-red-400 font-bold">{activeFormat.toUpperCase()}</span>
                    </div>

                    {/* Mode Specific Visualizer */}
                    {activeFormat === '0-address' && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono text-slate-400">Stack Memory Column (TOS at Top):</span>
                        <div className="flex flex-col-reverse gap-1.5 min-h-[140px] justify-start bg-slate-900/80 p-3 rounded-xl border border-white/10">
                          {activeStepObj.stackSnap && activeStepObj.stackSnap.length > 0 ? (
                            activeStepObj.stackSnap.map((item, idx) => (
                              <div
                                key={idx}
                                className={`px-3 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-between ${
                                  idx === activeStepObj.stackSnap.length - 1
                                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400'
                                    : 'bg-white/10 text-white/80'
                                }`}
                              >
                                <span>{item}</span>
                                {idx === activeStepObj.stackSnap.length - 1 && (
                                  <span className="text-[10px] bg-white text-red-600 px-1.5 py-0.5 rounded font-black">
                                    TOS
                                  </span>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="m-auto text-xs font-mono text-white/40 italic">
                              Stack Empty (Result Popped into X)
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeFormat === '1-address' && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono text-slate-400">Accumulator (AC) Register:</span>
                        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-red-400 font-bold">AC REGISTER:</span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-300 border border-red-500/30">
                              Implicit Oper
                            </span>
                          </div>
                          <div className="text-xl font-mono font-black text-white p-2.5 rounded-lg bg-black/40 border border-white/5 break-all">
                            {activeStepObj.acSnap || 'Uninitialized'}
                          </div>
                          <div className="text-[11px] font-mono text-white/50 pt-1">
                            Action: {activeStepObj.action}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeFormat === '2-address' && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono text-slate-400">General Processor Register Bank:</span>
                        <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-3 rounded-xl border border-white/10">
                          {['R1', 'R2', 'R3', 'X'].map((reg) => {
                            const isTouched = activeStepObj.operand && activeStepObj.operand.includes(reg);
                            return (
                              <div
                                key={reg}
                                className={`p-3 rounded-lg border font-mono text-xs transition-all ${
                                  isTouched
                                    ? 'bg-red-600/30 border-red-500 text-white ring-1 ring-red-500/40'
                                    : 'bg-black/40 border-white/5 text-white/60'
                                }`}
                              >
                                <div className="text-[10px] text-red-400 font-bold">{reg} REG:</div>
                                <div className="font-bold text-sm text-white truncate mt-0.5">
                                  {isTouched ? activeStepObj.action : 'Buffered'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeFormat === '3-address' && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono text-slate-400">3-Bus ALU Pipeline Configuration:</span>
                        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-blue-400">Source 1 Bus</span>
                            <span className="text-red-400 font-bold">ALU CORE</span>
                            <span className="text-amber-400">Source 2 Bus</span>
                          </div>
                          <div className="p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-xs text-white text-center font-bold">
                            {activeStepObj.action}
                          </div>
                          <div className="text-[11px] font-mono text-emerald-400 text-center">
                            Destination Preserves Both Source Operands Intact
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right: Step Description & Micro-op RTL */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-red-400 uppercase font-bold tracking-wider">
                        MICRO-OPERATION RTL:
                      </span>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-base font-bold text-white">
                        {activeStepObj.action}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono text-white/50 uppercase font-bold tracking-wider">
                        EXPLANATION FOR STUDENTS:
                      </span>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal p-3 rounded-xl bg-white/5 border border-white/10">
                        {activeStepObj.explanation}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-red-600/10 border border-red-500/20 text-xs font-mono text-red-200 flex items-center gap-2">
                      <span>💡 Hardware Note:</span>
                      <span>{activeStepObj.activeHw || 'Instruction decoded by Control Unit'}</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Complete Generated Assembly Code Listing Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    Complete Micro-Instruction Table ({activeFormat}):
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    Total Instructions: {activeSteps.length}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Mnemonic</th>
                        <th className="py-3 px-4">Operands</th>
                        <th className="py-3 px-4">Register Transfer Language (RTL)</th>
                        <th className="py-3 px-4">Educational Explanation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {activeSteps.map((step) => {
                        const isCurrent = step.step === currentStep;
                        return (
                          <tr
                            key={step.step}
                            onClick={() => {
                              setIsPlaying(false);
                              setCurrentStep(step.step);
                            }}
                            className={`transition-colors cursor-pointer ${
                              isCurrent
                                ? 'bg-red-50/80 font-semibold text-slate-900'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
                                isCurrent
                                  ? 'bg-red-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {step.step}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-bold text-[11px]">
                                {step.mnemonic}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-red-600">
                              {step.operand || '—'}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">
                              {step.action}
                            </td>
                            <td className="py-3 px-4 text-slate-600 leading-relaxed font-sans text-xs">
                              {step.explanation}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* COA Architecture Trade-Off Comparison Matrix */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
                    Architectural Benchmark Comparison for: "{expression}"
                  </h4>
                  <span className="text-xs font-mono text-slate-500">COA Subject Code: 25CST-201</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block">0-Address (Stack):</span>
                    <strong className="text-slate-900 text-sm block">{compiledProgram.zeroAddress.length} Instructions</strong>
                    <span className="text-slate-500 text-[11px]">Compact opcodes, high stack memory traffic</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block">1-Address (AC):</span>
                    <strong className="text-slate-900 text-sm block">{compiledProgram.oneAddress.length} Instructions</strong>
                    <span className="text-slate-500 text-[11px]">Single operand, intermediate store spills</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block">2-Address (Regs):</span>
                    <strong className="text-slate-900 text-sm block">{compiledProgram.twoAddress.length} Instructions</strong>
                    <span className="text-slate-500 text-[11px]">Overwrites source operand register</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block">3-Address (RISC):</span>
                    <strong className="text-slate-900 text-sm block">{compiledProgram.threeAddress.length} Instructions</strong>
                    <span className="text-emerald-600 font-bold text-[11px]">Lowest instruction count, wide instruction words</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default COALearningTool;
