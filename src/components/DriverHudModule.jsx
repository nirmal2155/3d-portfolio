import React, { useState, useEffect } from 'react';
import { Navigation, Gauge, Zap, AlertTriangle, ShieldCheck, Compass } from 'lucide-react';

export default function DriverHudModule({ selectedJunction }) {
  const [speed, setSpeed] = useState(38);
  const [countdown, setCountdown] = useState(14);
  const [signalState, setSignalState] = useState('RED_CHANGING_GREEN');
  const [distanceMeters, setDistanceMeters] = useState(280);

  // Live countdown timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setSignalState(old => old === 'GREEN' ? 'RED' : 'GREEN');
          return 35;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 font-mono-tech select-none">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#00F2FE] animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 uppercase">Driver AR Head-Up Display (HUD) Companion</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Connected vehicle AR HUD showing optimal green-wave cruise speed & signal timers for {selectedJunction.name}.
          </p>
        </div>

        <span className="bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40 text-[10px] font-bold px-3.5 py-1.5 rounded-full">
          V2X AR HUD CONNECTED
        </span>
      </div>

      {/* Main AR HUD Windshield Screen Box */}
      <div className="relative bg-[#040810] border-2 border-[#00F2FE]/40 rounded-3xl p-8 overflow-hidden shadow-[0_0_60px_rgba(0,242,254,0.2)]">
        
        {/* AR Grid & Target Reticle Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.06)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Speedometer & Cruise Advice */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">CURRENT VEHICLE SPEED</span>
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-6xl font-black text-white">{speed}</span>
                <span className="text-lg font-bold text-cyan-400">KM/H</span>
              </div>
            </div>

            {/* Optimal Speed Advice Box */}
            <div className="bg-emerald-500/15 border border-emerald-500/40 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> GREEN-WAVE CRUISE SPEED ADVICE
              </span>
              <p className="text-sm font-bold text-slate-100">
                CRUISE AT <span className="text-emerald-400">38 KM/H</span> TO CATCH GREEN LIGHT WITHOUT STOPPING
              </p>
            </div>
          </div>

          {/* Center Signal Countdown Gauge */}
          <div className="lg:col-span-4 text-center space-y-3">
            <div className="w-44 h-44 rounded-full border-4 border-[#00F2FE] mx-auto flex flex-col items-center justify-center bg-slate-950/80 shadow-[0_0_30px_rgba(0,242,254,0.3)]">
              <span className="text-5xl font-black text-white">{countdown}</span>
              <span className="text-[10px] font-bold text-cyan-300 uppercase mt-1">SECONDS</span>
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900 border border-white/10 text-emerald-400">
              NEXT SIGNAL: GREEN WAVE 🟢
            </div>
          </div>

          {/* Right Distance & Telemetry */}
          <div className="lg:col-span-3 space-y-4 font-mono-tech text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">DISTANCE TO JUNCTION</span>
              <strong className="text-xl text-[#00F2FE] font-bold">{distanceMeters} METERS</strong>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">ECO FUEL RATING</span>
              <strong className="text-xl text-emerald-400 font-bold">98% OPTIMAL</strong>
            </div>
          </div>

        </div>

        {/* HUD Windshield Bottom Status Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
          <span>V2X BEACON ID: SILKBOARD_HUB_01</span>
          <span className="text-cyan-400 font-bold">LATENCY: 4ms SYNCHRONIZED</span>
        </div>

      </div>

    </div>
  );
}
