import React from 'react';
import { HelpCircle, X, ShieldCheck, Cpu, MessageSquare, BookOpen } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-mono-tech text-xs select-none">
      <div className="w-full max-w-xl core-panel p-6 rounded-2xl space-y-5 relative z-10 border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider">SYSTEM_OPERATIONAL_MANUAL</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 font-sans text-xs max-h-[400px] overflow-y-auto pr-1">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
            <h3 className="font-bold text-[#00F2FE] flex items-center gap-2 font-mono-tech">
              <Cpu className="w-4 h-4" /> 1. How Adaptive Signal Control Works
            </h3>
            <p className="text-slate-300 leading-relaxed">
              TrafficMitra AI calculates queue density dynamically from existing CCTV feeds. It assigns green light duration between 15s (minimum safety buffer) and 120s (maximum queue clearance) based on vehicle mix. High-occupancy buses and emergency ambulances are given instant priority multipliers.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
            <h3 className="font-bold text-rose-400 flex items-center gap-2 font-mono-tech">
              <ShieldCheck className="w-4 h-4" /> 2. Emergency Corridor Override Protocol
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When an ambulance siren is detected by the audio sensor or manually triggered by a police officer, TrafficMitra AI immediately turns all opposing signals RED and holds the ambulance trajectory GREEN until cleared.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
            <h3 className="font-bold text-emerald-400 flex items-center gap-2 font-mono-tech">
              <MessageSquare className="w-4 h-4" /> 3. Citizen WhatsApp & Offline SMS Mode
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Citizens can query traffic status by sending "TRAFFIC SILKBOARD" to 56161 or via WhatsApp Bot. Reroute recommendations guide vehicles away from monsoon waterlogging and festival processions.
            </p>
          </div>

        </div>

        <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400 font-mono-tech">
          <span>DOC REVISION: v2.4 ENTERPRISE</span>
          <button onClick={onClose} className="btn-tactile-primary text-slate-950 font-bold px-4 py-1.5 rounded-lg cursor-pointer">
            CLOSE MANUAL
          </button>
        </div>

      </div>
    </div>
  );
}
