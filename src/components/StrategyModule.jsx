import React, { useState } from 'react';
import { Target, Zap, Shield, Cpu, Sliders, CheckCircle2 } from 'lucide-react';

export default function StrategyModule({ selectedJunction }) {
  const [priorityBus, setPriorityBus] = useState(2.5);
  const [priorityAmbulance, setPriorityAmbulance] = useState(5.0);
  const [pedestrianSafetyBuffer, setPedestrianSafetyBuffer] = useState(15);
  const [aiConfidence, setAiConfidence] = useState(94);

  return (
    <div className="space-y-6 font-mono-tech text-xs select-none">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100 uppercase">AI Signal Strategy Optimization Engine</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dynamic priority weights and green time allocation algorithms for {selectedJunction.name}.
          </p>
        </div>

        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold px-3.5 py-1.5 rounded-full">
          STRATEGY: DYNAMIC_CHAOS_MINIMIZER
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Priority Weight Controls */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00F2FE]" /> Priority Weight Multipliers
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">PUBLIC BUS WEIGHT</span>
                <span className="text-[#00F2FE]">{priorityBus}x Priority</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.1"
                value={priorityBus}
                onChange={(e) => setPriorityBus(Number(e.target.value))}
                className="w-full accent-[#00F2FE] cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">High occupancy bus lanes receive extended green light duration.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">AMBULANCE CORRIDOR WEIGHT</span>
                <span className="text-rose-400">{priorityAmbulance}x Override</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="10.0"
                step="0.5"
                value={priorityAmbulance}
                onChange={(e) => setPriorityAmbulance(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Instant signal override multiplier upon siren detection.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">PEDESTRIAN CROSSING SAFETY BUFFER</span>
                <span className="text-emerald-400">{pedestrianSafetyBuffer} seconds</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={pedestrianSafetyBuffer}
                onChange={(e) => setPedestrianSafetyBuffer(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Minimum mandatory pedestrian walk signal window.</p>
            </div>
          </div>
        </div>

        {/* Strategy Optimization Telemetry */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" /> Active Optimization Model
          </h3>

          <div className="space-y-3 font-sans">
            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 font-mono-tech block">MODEL ALGORITHM</span>
                <strong className="text-sm text-slate-100 font-bold">Deep Q-Learning RL v2.4</strong>
              </div>
              <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30">CONVERGED</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 font-mono-tech block">CONFIDENCE SCORE</span>
                <strong className="text-sm text-[#00F2FE] font-bold font-mono-tech">{aiConfidence}%</strong>
              </div>
              <span className="text-[#00F2FE] bg-[#00F2FE]/10 px-3 py-1 rounded-full text-[10px] font-bold border border-[#00F2FE]/30">HIGH CONFIDENCE</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-xs text-slate-400 font-mono-tech uppercase block">EXPECTED WAIT TIME REDUCTION</span>
              <strong className="text-xl text-emerald-400 font-bold font-mono-tech">-55% AVERAGE WAIT TIME</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
