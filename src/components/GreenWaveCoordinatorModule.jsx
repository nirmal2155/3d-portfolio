import React, { useState, useEffect } from 'react';
import { Waves, Zap, ShieldCheck, Activity, ArrowRight, RefreshCw, CheckCircle2, Cpu } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function GreenWaveCoordinatorModule({ selectedJunction }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [greenWaveOffset, setGreenWaveOffset] = useState(14);
  const [timeSavedTotal, setTimeSavedTotal] = useState(3420); // seconds
  const [activeCorridor, setActiveCorridor] = useState('Corridor A (Silk Board -> Koramangala 100ft)');

  const corridors = [
    { name: 'Corridor A: Silk Board ➔ Koramangala 100ft Rd', distance: '3.4 km', junctions: 4, speed: '42 km/h', sync: '98.6%' },
    { name: 'Corridor B: Dadar T.T. ➔ Bandra Kurla Complex (BKC)', distance: '5.1 km', junctions: 6, speed: '38 km/h', sync: '96.2%' },
    { name: 'Corridor C: SG Highway ➔ ISCON Circle (Ahmedabad)', distance: '4.8 km', junctions: 5, speed: '45 km/h', sync: '99.1%' },
    { name: 'Corridor D: Swargate ➔ Hinjewadi Phase 1 (Pune)', distance: '7.2 km', junctions: 8, speed: '36 km/h', sync: '94.8%' }
  ];

  const handleRecalibrate = () => {
    soundFx.playClick();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setGreenWaveOffset(Math.floor(Math.random() * 8) + 10);
      setTimeSavedTotal(prev => prev + 45);
      soundFx.playSuccess();
    }, 1200);
  };

  return (
    <div className="w-full h-full core-panel p-6 rounded-2xl bg-slate-950/90 border border-[#00F2FE]/40 flex flex-col justify-between space-y-6 font-mono-tech select-none overflow-y-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#00F2FE]/20 border border-[#00F2FE]/50 flex items-center justify-center text-[#00F2FE]">
            <Waves className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                GOOGLE GREEN-LIGHT COMPETITOR: CASCADED GREEN WAVE COORDINATOR
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#00F2FE]/20 text-[#00F2FE] text-[10px] border border-[#00F2FE]/40 font-bold">
                C-V2X SYNCED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Inter-Junction Cascade Signal Offsets • Zero-Stop Platoon Traversal • Real-Time Wavefront Physics
            </p>
          </div>
        </div>

        <button
          onClick={handleRecalibrate}
          disabled={isSyncing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F2FE] to-emerald-400 text-slate-950 font-bold text-xs uppercase flex items-center gap-2 hover:opacity-90 transition cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.4)] disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'CALIBRATING WAVE...' : 'RE-SYNC WAVEFRONT'}</span>
        </button>
      </div>

      {/* Live Corridor Selector & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">SYNCHRONIZED OFFSET</span>
          <p className="text-2xl font-extrabold text-[#00F2FE]">{greenWaveOffset} SECONDS</p>
          <span className="text-[10px] text-emerald-400 font-bold">OPTIMAL PLATOON ARRIVAL</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">COMMUTE TIME SAVED</span>
          <p className="text-2xl font-extrabold text-emerald-400">{(timeSavedTotal / 60).toFixed(1)} MINS</p>
          <span className="text-[10px] text-slate-300">TODAY ACROSS METRO</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">WAVEFRONT VELOCITY</span>
          <p className="text-2xl font-extrabold text-amber-400">38 - 42 KM/H</p>
          <span className="text-[10px] text-slate-300">RECOMMENDED CRUISE</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">AI ENGINE ACCURACY</span>
          <p className="text-2xl font-extrabold text-cyan-400">98.9%</p>
          <span className="text-[10px] text-emerald-400 font-bold">NVIDIA JETSON CLUSTER</span>
        </div>
      </div>

      {/* Interactive Cascade Junction Pipeline Diagram */}
      <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>REAL-TIME CASCADE SIGNAL TIMING PIPELINE (4 ADJACENT NODES)</span>
          </span>
          <span className="text-emerald-400 text-[10px]">CORRIDOR ACTIVE • 0 STOPS</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          {[
            { name: 'JUNCTION 01: SILK BOARD', status: 'GREEN', phase: '28s left', offset: '+0s (Leader)' },
            { name: 'JUNCTION 02: HSR 27TH MAIN', status: 'GREEN', phase: '42s left', offset: `+${greenWaveOffset}s` },
            { name: 'JUNCTION 03: AGARA FLYOVER', status: 'SYNCING', phase: '14s green in 6s', offset: `+${greenWaveOffset * 2}s` },
            { name: 'JUNCTION 04: KORAMANGALA 100FT', status: 'ARMED', phase: 'Green Trigger Ready', offset: `+${greenWaveOffset * 3}s` }
          ].map((node, i) => (
            <div key={i} className="bg-slate-950 border border-white/10 p-3 rounded-xl space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/5 pb-1">
                <span>NODE #{i + 1}</span>
                <span className="text-[#00F2FE] font-bold">{node.offset}</span>
              </div>
              <p className="text-xs font-bold text-white truncate">{node.name}</p>
              <div className="py-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                  node.status === 'GREEN'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {node.status} ({node.phase})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metro Corridors Table */}
      <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase">ACTIVE METRO GREEN WAVE CORRIDORS</h4>
        <div className="space-y-2">
          {corridors.map((c, idx) => (
            <div
              key={idx}
              onClick={() => {
                soundFx.playClick();
                setActiveCorridor(c.name);
              }}
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                activeCorridor === c.name
                  ? 'bg-slate-800 border-[#00F2FE] text-white'
                  : 'bg-slate-950 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 ${activeCorridor === c.name ? 'text-[#00F2FE]' : 'text-slate-600'}`} />
                <div>
                  <p className="font-bold text-xs text-white">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.distance} • {c.junctions} Intersections • Target Speed: {c.speed}</p>
                </div>
              </div>
              <div className="text-right font-extrabold text-xs text-emerald-400">
                {c.sync} SYNC
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
