import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { 
  Eye, 
  Cpu, 
  TrendingUp, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  FileText,
  MapPin,
  Clock,
  Sparkles,
  Globe
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  selectedJunction, 
  setSelectedJunction, 
  junctions,
  isEmergencyActive,
  cameraFailed
}) {
  const t = TRANSLATIONS[lang];
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'cv', label: 'CV Live Vision', icon: Eye },
    { id: 'adaptive', label: 'Adaptive Signal', icon: Cpu },
    { id: 'chaos', label: 'Chaos Prediction', icon: TrendingUp },
    { id: 'citizen', label: 'Citizen Co-Pilot', icon: MessageSquare },
    { id: 'police', label: 'Police Command', icon: ShieldAlert },
    { id: 'trust', label: 'Trust & Fail-Safe', icon: CheckCircle2 },
    { id: 'pitch', label: 'Pitch Deck & ROI', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-[#070B12]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-4 border-b border-white/5">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center">
              <div className="w-full h-full bg-[#070B12] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white font-sans">
                  TrafficMitra <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">AI</span>
                </h1>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-tech">
                  v2.4 ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Self-Learning Chaos-Aware Traffic Orchestration Platform for India
              </p>
            </div>
          </div>

          {/* Telemetry Status Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            
            {/* Junction Selector Dropdown */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={selectedJunction.id}
                onChange={(e) => {
                  const j = junctions.find(item => item.id === e.target.value);
                  if (j) setSelectedJunction(j);
                }}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {junctions.map(j => (
                  <option key={j.id} value={j.id} className="bg-slate-900 text-white">
                    {j.name} ({j.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Real-time Clock */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl font-mono-tech text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{timeStr || '19:30:00 IST'}</span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-200 px-3 py-1.5 rounded-xl font-bold cursor-pointer transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Status Pill */}
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl font-bold font-mono-tech text-[11px] glow-border-emerald">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE TELEMETRY</span>
            </div>

          </div>

        </div>

        {/* Module Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/40 text-slate-400 hover:text-white hover:bg-slate-800/60 border border-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
