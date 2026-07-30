import React, { useState } from 'react';
import { Settings, X, Save, Shield, Volume2, Cpu, Eye } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [edgeResolution, setEdgeResolution] = useState('1080p');
  const [latencyThreshold, setLatencyThreshold] = useState(15);
  const [sirenVolume, setSirenVolume] = useState(80);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [autoFallback, setAutoFallback] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-mono-tech text-xs select-none">
      <div className="w-full max-w-lg core-panel p-6 rounded-2xl space-y-5 relative z-10 border border-[#00F2FE]/40 shadow-[0_0_50px_rgba(0,242,254,0.2)]">
        
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#00F2FE]" />
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider">SYSTEM_CONFIG_SETTINGS</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          
          <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-xl border border-white/5">
            <label className="font-bold text-slate-200 flex justify-between">
              <span>EDGE AI CAMERA RESOLUTION</span>
              <span className="text-[#00F2FE]">{edgeResolution} @ 60 FPS</span>
            </label>
            <select
              value={edgeResolution}
              onChange={(e) => setEdgeResolution(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-slate-200 font-mono-tech focus:outline-none"
            >
              <option value="720p">720p HD (Low Latency 8ms)</option>
              <option value="1080p">1080p Full HD (Standard 12ms)</option>
              <option value="4K">4K Ultra HD (High Detail 24ms)</option>
            </select>
          </div>

          <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-xl border border-white/5">
            <label className="font-bold text-slate-200 flex justify-between">
              <span>LATENCY ALERT THRESHOLD</span>
              <span className="text-emerald-400">{latencyThreshold} ms</span>
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={latencyThreshold}
              onChange={(e) => setLatencyThreshold(Number(e.target.value))}
              className="w-full accent-[#00F2FE] cursor-pointer"
            />
          </div>

          <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-xl border border-white/5">
            <label className="font-bold text-slate-200 flex justify-between">
              <span>EMERGENCY CORRIDOR SIREN VOLUME</span>
              <span className="text-rose-400">{sirenVolume}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sirenVolume}
              onChange={(e) => setSirenVolume(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between bg-slate-950/80 p-3.5 rounded-xl border border-white/5">
            <div>
              <span className="font-bold text-slate-200 block">PRIVACY ANONYMIZATION MODE</span>
              <span className="text-[10px] text-slate-400">Zero face & plate storage</span>
            </div>
            <input
              type="checkbox"
              checked={privacyMode}
              onChange={(e) => setPrivacyMode(e.target.checked)}
              className="w-4 h-4 accent-[#00F2FE] cursor-pointer"
            />
          </div>

        </div>

        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
          <span className="text-[10px] text-slate-400">CONFIGURATION REVISION #842</span>
          <button
            onClick={handleSave}
            className="btn-tactile-primary text-slate-950 font-extrabold px-5 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? 'CONFIG SAVED ✓' : 'SAVE CONFIGURATION'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
