import React, { useState, useEffect } from 'react';
import { Activity, Heart, Eye, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function BioDriverStressModule({ selectedJunction }) {
  const [driverHeartRate, setDriverHeartRate] = useState(74);
  const [fatigueIndex, setFatigueIndex] = useState('Low (12%)');

  return (
    <div className="w-full h-full core-panel p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/50 flex flex-col justify-between space-y-6 font-mono-tech select-none overflow-y-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                60GHZ MMWAVE NEURAL DRIVER FATIGUE & STRESS RADAR
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/40 font-bold">
                CONTACTLESS BIO-V2X
              </span>
            </div>
            <p className="text-xs text-slate-400">
              60GHz Millimeter-Wave Heartbeat & Micro-Sleep Sensing • Driver Cognitive Load Warning • Zero Privacy Intrusion
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-[11px] text-emerald-400 flex items-center gap-2 font-bold">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>DRIVER HEART RATE: {driverHeartRate} BPM</span>
        </div>
      </div>

      {/* Driver Bio Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">DRIVER FATIGUE INDEX</span>
          <p className="text-2xl font-extrabold text-emerald-400">{fatigueIndex}</p>
          <span className="text-[10px] text-emerald-400 font-bold">MICRO-SLEEP BLINK NORMAL</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">COGNITIVE STRESS SCORE</span>
          <p className="text-2xl font-extrabold text-[#00F2FE]">24 / 100</p>
          <span className="text-[10px] text-slate-300">CALM FLUID DRIVE</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">EARLY WARNING ALERT</span>
          <p className="text-2xl font-extrabold text-slate-400">CLEAR</p>
          <span className="text-[10px] text-emerald-400 font-bold">ZERO COLLISION RISK</span>
        </div>
      </div>

    </div>
  );
}
