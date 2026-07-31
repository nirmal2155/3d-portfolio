import React, { useState, useEffect } from 'react';
import { Volume2, Radio, Activity, AlertTriangle, Play, Shield, RefreshCw, Zap } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function AcousticSirenModule({ selectedJunction }) {
  const [decibels, setDecibels] = useState(84);
  const [sirenDetected, setSirenDetected] = useState(false);
  const [vectorAngle, setVectorAngle] = useState(42); // degrees

  const handleSimulateSiren = () => {
    soundFx.playClick();
    soundFx.playSiren();
    setSirenDetected(true);
    setDecibels(118);
    setTimeout(() => {
      setSirenDetected(false);
      setDecibels(84);
    }, 6000);
  };

  return (
    <div className="w-full h-full core-panel p-6 rounded-2xl bg-slate-950/90 border border-rose-500/40 flex flex-col justify-between space-y-6 font-mono-tech select-none overflow-y-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400">
            <Volume2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                AI ACOUSTIC SIREN & DECIBEL HEATMAP RADAR
              </h2>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] border border-rose-500/40 font-bold">
                FFT AUDIO DSP
              </span>
            </div>
            <p className="text-xs text-slate-400">
              High-Frequency Acoustic Microphones • Ambulance Doppler Triangulation • Instant Corridor Trigger
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateSiren}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs uppercase flex items-center gap-2 hover:opacity-90 transition cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.4)]"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>SIMULATE AMBULANCE SIREN 🚑</span>
        </button>
      </div>

      {/* Acoustic Frequency & Decibel Monitor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">ACOUSTIC NOISE LEVEL</span>
          <p className="text-2xl font-extrabold text-white">{decibels} dB</p>
          <span className="text-[10px] text-emerald-400 font-bold">AMBIENT TRAFFIC NOISE</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">SIREN RECOGNITION CONFIDENCE</span>
          <p className="text-2xl font-extrabold text-[#00F2FE]">{sirenDetected ? '99.8%' : '0.0%'}</p>
          <span className="text-[10px] text-slate-300">YOLO-AUDIO CLASSIFIER</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">TRAJECTORY ANGLE VECTOR</span>
          <p className="text-2xl font-extrabold text-amber-400">{vectorAngle}° NORTH-EAST</p>
          <span className="text-[10px] text-emerald-400 font-bold">DOPPLER SHIFT SYNCED</span>
        </div>
      </div>

      {/* Siren Alert Status Banner */}
      {sirenDetected && (
        <div className="bg-rose-950/90 border-2 border-rose-500 p-4 rounded-xl text-rose-200 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <div>
              <p className="font-extrabold text-sm text-white uppercase">AMBULANCE SIREN DETECTED AT 118 dB!</p>
              <p className="text-xs text-rose-300">Signal Priority Controller Lock Activated • Opposing Traffic Set to RED</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-rose-500 text-slate-950 font-extrabold text-xs rounded-lg uppercase">
            CORRIDOR OPEN 🚨
          </span>
        </div>
      )}

    </div>
  );
}
