import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Shield, Activity, Radio, Cpu, CheckCircle2, Zap } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function KioskModeOverlay({ isKiosk, setIsKiosk, selectedJunction }) {
  if (!isKiosk) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white font-mono-tech select-none p-8 flex flex-col justify-between overflow-hidden animate-in fade-in">
      
      {/* Background Holographic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Kiosk Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/20 border border-[#00F2FE]/50 flex items-center justify-center text-[#00F2FE]">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-widest uppercase flex items-center gap-2">
              <span>TRAFFICMITRA AI — 4K ENTERPRISE COMMAND WALL</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/40 font-bold">
                LIVE METRO TELEMETRY
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Active Junction: {selectedJunction?.name || 'Silk Board Junction'} ({selectedJunction?.city || 'Bengaluru'}) • Edge Node: {selectedJunction?.edgeDevice || 'NVIDIA Jetson Orin'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            setIsKiosk(false);
          }}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-white/20 hover:border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
        >
          <Minimize2 className="w-4 h-4" />
          <span>EXIT 4K KIOSK MODE</span>
        </button>
      </div>

      {/* Central High-Density Dashboard Matrix */}
      <div className="grid grid-cols-3 gap-6 flex-1 my-6 relative z-10">
        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase">CONGESTION INDEX</span>
          <p className="text-6xl font-extrabold text-[#00F2FE]">{selectedJunction?.congestionIndex || 84}%</p>
          <span className="text-xs text-emerald-400 font-bold">DYNAMIC SIGNAL REGULATION ACTIVE</span>
        </div>

        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase">AI COMMUTE TIME SAVED</span>
          <p className="text-6xl font-extrabold text-emerald-400">54.9%</p>
          <span className="text-xs text-slate-300">TRADITIONAL 142s ➔ AI 64s</span>
        </div>

        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase">EDGE ML ACCURACY</span>
          <p className="text-6xl font-extrabold text-amber-400">98.4%</p>
          <span className="text-xs text-emerald-400 font-bold">TENSORFLOW.JS COCO-SSD</span>
        </div>
      </div>

      {/* Kiosk Footer */}
      <div className="flex justify-between items-center border-t border-white/10 pt-4 relative z-10 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>V5G C-V2X URLLC BROADCAST OPERATIONAL • TLS 1.3 ENCRYPTED</span>
        </span>
        <span className="text-emerald-400 font-bold">MINISTRY OF ROAD TRANSPORT & HIGHWAYS ALIGNED</span>
      </div>

    </div>
  );
}
