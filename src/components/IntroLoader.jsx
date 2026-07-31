import React, { useEffect, useState } from 'react';
import { Shield, Radio, Activity, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const bootLogs = [
    "INITIALIZING TRAFFICMITRA AI ENGINE v2.4...",
    "CONNECTING NVIDIA JETSON ORIN EDGE NODES...",
    "LOADING TENSORFLOW.JS COMPUTER VISION PIPELINE...",
    "SYNCHRONIZING AMBULANCE GREEN CORRIDOR SENSORS...",
    "CALIBRATING 20+ INDIAN CITY TRAFFIC TELEMETRY...",
    "SYSTEM SECURITY CHECK: LEVEL 5 COMMAND PASSED."
  ];

  useEffect(() => {
    soundFx.playClick();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundFx.playSuccess();
            setIsFadingOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 400);
          return 100;
        }

        const next = prev + 2;
        const stepIdx = Math.min(Math.floor((next / 100) * bootLogs.length), bootLogs.length - 1);
        setCurrentStep(stepIdx);

        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center font-mono-tech select-none overflow-hidden transition-opacity duration-700 ${
      isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Background Holographic Cyber Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#00F2FE_1px,transparent_1px),linear-gradient(to_bottom,#00F2FE_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none animate-pulse" />

      {/* Laser Radar Scanning Bar */}
      <div className="radar-scan-line" />

      {/* Central Holographic Logo Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* Animated Glowing Shield Logo Emblem */}
        <div className="relative mb-8 group">
          {/* Pulsing Outer Neon Rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#00F2FE] via-emerald-400 to-amber-400 opacity-60 blur-xl animate-pulse" />
          <div className="absolute -inset-8 rounded-full border border-[#00F2FE]/40 animate-[spin_8s_linear_infinite]" />
          <div className="absolute -inset-12 rounded-full border border-dashed border-emerald-400/30 animate-[spin_12s_linear_infinite_reverse]" />

          {/* Core Shield Badge */}
          <div className="relative w-24 h-24 rounded-2xl bg-slate-900/90 border-2 border-[#00F2FE] flex items-center justify-center shadow-[0_0_50px_rgba(0,242,254,0.6)] backdrop-blur-md">
            <Shield className="w-12 h-12 text-[#00F2FE] animate-bounce" />
            
            {/* Animated Traffic Signal Lights */}
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_15px_rgba(0,242,254,0.8)]">
          <span>TRAFFICMITRA</span>
          <span className="text-[#00F2FE]">AI</span>
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 mb-6 flex items-center justify-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>INTELLIGENT TRAFFIC CONTROL ENGINE</span>
        </p>

        {/* System Boot Status Terminal Output */}
        <div className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-4 text-left shadow-2xl mb-6 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-[#00F2FE]" /> JETSON ORIN SYSTEM INITIALIZER
            </span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>

          <p className="text-xs font-mono-tech text-[#00F2FE] min-h-[36px] leading-relaxed flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-spin flex-shrink-0" />
            <span>{bootLogs[currentStep]}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs text-slate-300 font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> SYSTEM READY
            </span>
            <span className="text-[#00F2FE] font-extrabold">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-slate-900 rounded-full border border-white/10 overflow-hidden p-0.5 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
            <div
              className="h-full bg-gradient-to-r from-[#00F2FE] via-emerald-400 to-amber-400 rounded-full transition-all duration-150 shadow-[0_0_15px_rgba(0,242,254,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer Tag */}
        <div className="mt-8 text-[10px] text-slate-500 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>MINISTRY OF ROAD TRANSPORT & HIGHWAYS APPROVED ARCHITECTURE</span>
        </div>

      </div>
    </div>
  );
}
