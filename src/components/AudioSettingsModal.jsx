import React, { useState } from 'react';
import { Volume2, VolumeX, Sliders, Play, Check, X, Radio, Shield } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function AudioSettingsModal({ isOpen, onClose }) {
  const [masterVolume, setMasterVolume] = useState(80);
  const [sirenVolume, setSirenVolume] = useState(90);
  const [voiceRate, setVoiceRate] = useState(1.0);
  const [soundMuted, setSoundMuted] = useState(false);

  if (!isOpen) return null;

  const handleTestChime = () => {
    soundFx.playClick();
  };

  const handleTestSiren = () => {
    soundFx.playSiren();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono-tech select-none">
      <div className="w-full max-w-md core-panel bg-slate-950 rounded-2xl border border-[#00F2FE]/50 shadow-[0_0_50px_rgba(0,242,254,0.3)] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-[#00F2FE] animate-pulse" />
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">
              COMMAND AUDIO & ACOUSTIC SYNTHESIS
            </h2>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Master Mute Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-white/10">
            <span className="font-bold text-white flex items-center gap-2">
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>MASTER AUDIO MUTE</span>
            </span>
            <button
              onClick={() => setSoundMuted(!soundMuted)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                soundMuted ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {soundMuted ? 'MUTED 🔇' : 'ACTIVE 🔊'}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-slate-300 font-bold text-[11px]">
              <span>UI ACTION SOUND EFFECTS</span>
              <span className="text-[#00F2FE]">{masterVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={masterVolume}
              onChange={(e) => setMasterVolume(e.target.value)}
              className="w-full accent-[#00F2FE] cursor-pointer"
            />
          </div>

          {/* Siren Volume Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-slate-300 font-bold text-[11px]">
              <span>EMERGENCY SIREN ALERT</span>
              <span className="text-rose-400">{sirenVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sirenVolume}
              onChange={(e) => setSirenVolume(e.target.value)}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleTestChime}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:border-[#00F2FE] transition font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>TEST UI CHIME</span>
            </button>

            <button
              onClick={handleTestSiren}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 transition font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-rose-400" />
              <span>TEST SIREN 🚨</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#00F2FE] text-slate-950 font-bold text-xs uppercase cursor-pointer"
          >
            SAVE PREFERENCES
          </button>
        </div>

      </div>
    </div>
  );
}
