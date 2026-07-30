import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { generateAIDecisionLog, calculateAdaptiveGreenTime } from '../utils/signalLogic';
import { Cpu, Clock, CheckCircle2, AlertOctagon, Sliders, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

export default function AdaptiveSignalModule({ selectedJunction, lang, isEmergencyActive }) {
  const t = TRANSLATIONS[lang];

  const [activeArmIndex, setActiveArmIndex] = useState(0);
  const [timerSec, setTimerSec] = useState(selectedJunction.arms[0].maxGreenSec || 42);
  const [manualOverrideArm, setManualOverrideArm] = useState(null);
  const [decisionLog, setDecisionLog] = useState([]);

  // Signal Countdown loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSec(prev => {
        if (prev <= 1) {
          const nextIndex = (activeArmIndex + 1) % selectedJunction.arms.length;
          setActiveArmIndex(nextIndex);
          
          const nextArm = selectedJunction.arms[nextIndex];
          const newSec = calculateAdaptiveGreenTime(nextArm.densityScore, 300);

          const newLog = generateAIDecisionLog(nextArm, selectedJunction.arms);
          setDecisionLog(prevLog => [newLog, ...prevLog.slice(0, 4)]);

          return newSec;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeArmIndex, selectedJunction]);

  const activeArm = selectedJunction.arms[activeArmIndex];

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">{t.signalTiming}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Replaces static 90s timers with dynamic green duration based on real-time vehicle density & priority mix.
          </p>
        </div>

        {manualOverrideArm !== null && (
          <div className="bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 font-mono-tech animate-pulse glow-border-amber">
            <Sliders className="w-4 h-4" />
            <span>POLICE MANUAL OVERRIDE ACTIVE</span>
          </div>
        )}
      </div>

      {/* Main Grid: 4-Arm Junction & AI Transparency */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 4-Arm Visual Junction Controller */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-slate-200">Active Intersection Signals</h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 font-mono-tech">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              AI CONTROLLER CONNECTED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedJunction.arms.map((arm, index) => {
              const isGreen = (manualOverrideArm === null && activeArmIndex === index) || (manualOverrideArm === index);
              const isRed = !isGreen;

              return (
                <div
                  key={arm.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isGreen
                      ? 'bg-emerald-950/30 border-emerald-500/60 glow-border-emerald'
                      : 'bg-slate-950/60 border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-100">{arm.name}</span>
                    
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-white/10">
                      <span className={`w-3.5 h-3.5 rounded-full ${isRed ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse' : 'bg-rose-950'}`} />
                      <span className={`w-3.5 h-3.5 rounded-full ${isGreen ? 'bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse' : 'bg-emerald-950'}`} />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className={`text-4xl font-black font-mono-tech ${isGreen ? 'text-emerald-400 text-glow-emerald' : 'text-slate-500'}`}>
                        {isGreen ? `${timerSec}s` : 'RED'}
                      </span>
                      {isGreen && <span className="text-xs text-emerald-500 ml-1.5 font-semibold">{t.secRemaining}</span>}
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 font-mono-tech">Queue Density</span>
                      <div className="text-lg font-bold text-cyan-300 font-mono-tech">{arm.densityScore}%</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono-tech text-[11px]">
                    <span className="text-slate-400">
                      {arm.vehicles.bus} buses • {arm.vehicles.auto} autos • {arm.vehicles.bike} bikes
                    </span>
                    
                    <button
                      onClick={() => {
                        if (manualOverrideArm === index) {
                          setManualOverrideArm(null);
                        } else {
                          setManualOverrideArm(index);
                          setTimerSec(60);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold border cursor-pointer transition ${
                        manualOverrideArm === index
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10'
                      }`}
                    >
                      {manualOverrideArm === index ? 'Release' : 'Force Green 🟢'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Benchmark Grid */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono-tech">{t.traditionalVsAI}</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono-tech">
              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-[11px] text-slate-400">Fixed 90s Signal</span>
                <div className="text-xl font-black text-rose-400 text-glow-rose mt-1">{selectedJunction.avgWaitTimeSec}s avg</div>
              </div>

              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-[11px] text-slate-400">TrafficMitra AI</span>
                <div className="text-xl font-black text-emerald-400 text-glow-emerald mt-1">{selectedJunction.aiWaitTimeSec}s avg</div>
              </div>

              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400">{t.timeSaved}</span>
                <div className="text-xl font-black text-cyan-400 text-glow-cyan mt-1">{selectedJunction.timeSavedPercent}% Faster</div>
              </div>
            </div>
          </div>

        </div>

        {/* AI Transparency & Decision Log Panel */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-200">{t.aiExplainer}</h3>
            </div>
            <span className="text-[10px] bg-slate-900 text-slate-300 px-3 py-1 rounded-full border border-white/10 font-mono-tech">
              Responsible AI
            </span>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-500/40 p-4 rounded-xl space-y-2 glow-border-emerald">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Current Action: {activeArm.name} GREEN</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Assigned {timerSec}s green duration. Decision prioritized high-occupancy buses ({activeArm.vehicles.bus}) and high two-wheeler queue density ({activeArm.vehicles.bike} bikes).
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono-tech">Decision Telemetry Stream</span>
            
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar text-xs font-mono-tech">
              {decisionLog.length === 0 ? (
                <div className="p-4 bg-slate-950/50 rounded-xl text-slate-500 text-center italic">
                  AI Decision log will populate automatically as signals cycle...
                </div>
              ) : (
                decisionLog.map((log, i) => (
                  <div key={i} className="p-3.5 bg-slate-950/80 rounded-xl border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-emerald-400 font-bold">{log.timestamp}</span>
                      <span className="text-cyan-300 font-medium">{log.efficiencyGain}</span>
                    </div>
                    <p className="font-bold text-slate-200">{log.decision}</p>
                    <p className="text-[11px] text-slate-400 leading-snug">{log.reason}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
