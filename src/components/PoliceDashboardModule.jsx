import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { ShieldAlert, Radio, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

export default function PoliceDashboardModule({
  junctions,
  selectedJunction,
  setSelectedJunction,
  lang,
  isEmergencyActive,
  setIsEmergencyActive
}) {
  const t = TRANSLATIONS[lang];

  const triggerAudioSiren = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log('Audio Context unavailable', e);
    }
  };

  const handleToggleEmergency = () => {
    const newState = !isEmergencyActive;
    setIsEmergencyActive(newState);
    if (newState) {
      triggerAudioSiren();
    }
  };

  return (
    <div className="space-y-6">

      {/* Official Notice Banner */}
      <div className="glass-panel p-4 rounded-2xl border-l-4 border-amber-500 flex items-center justify-between text-xs text-slate-200 font-mono-tech">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span>OFFICIAL CONTROL ROOM NOTICE: POLICE OFFICER RETAINS FINAL OVERRIDE AUTHORITY AT ALL TIMES (AI IS ADVISORY)</span>
        </div>
        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-3 py-1 rounded-full flex-shrink-0">
          24/7 COMMAND
        </span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            Traffic Police Command & Emergency Control Center
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            City-wide municipal junction network monitoring & emergency corridor override controls.
          </p>
        </div>

        <button
          onClick={handleToggleEmergency}
          className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase font-mono-tech cursor-pointer flex items-center gap-2 transition ${
            isEmergencyActive
              ? 'btn-tactile-danger text-white animate-pulse glow-border-rose'
              : 'bg-slate-900 border border-rose-500/50 text-rose-400 hover:bg-rose-600 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{isEmergencyActive ? 'EMERGENCY GREEN CORRIDOR ACTIVE 🚑' : 'TRIGGER EMERGENCY GREEN CORRIDOR 🚑'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Junction Network Dispatch Grid */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase font-mono-tech tracking-wider">
            Municipal Junction Network Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-tech text-xs">
            {junctions.map(junc => {
              const isSelected = selectedJunction.id === junc.id;
              const isCritical = junc.congestionIndex > 85;

              return (
                <div
                  key={junc.id}
                  onClick={() => setSelectedJunction(junc)}
                  className={`glass-panel p-5 rounded-2xl cursor-pointer glass-panel-hover border transition-all ${
                    isSelected ? 'border-cyan-500/60 bg-slate-900/90 glow-border-cyan' : 'border-white/5 bg-slate-950/60'
                  }`}
                >
                  <div className="flex justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="font-bold text-slate-100 text-sm font-sans">{junc.name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isCritical ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {junc.status}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">Congestion Index:</span>
                    <strong className={`font-bold text-sm ${isCritical ? 'text-rose-400 text-glow-rose' : 'text-cyan-400 text-glow-cyan'}`}>
                      {junc.congestionIndex}%
                    </strong>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-white/5 flex justify-between">
                    <span>Edge: <strong>{junc.edgeDevice}</strong></span>
                    <span className="text-emerald-400 font-bold">{junc.timeSavedPercent}% Time Saved</span>
                  </div>
                </div>
              );
            })}
          </div>

          {isEmergencyActive && (
            <div className="glass-panel p-5 rounded-2xl border border-rose-500/60 bg-rose-950/30 text-rose-200 font-mono-tech text-xs space-y-2 glow-border-rose animate-pulse">
              <span className="font-bold text-sm block text-rose-400">EMERGENCY CORRIDOR DISPATCH IN PROGRESS</span>
              <p>Ambulance detected on Silk Board trajectory. All signals held GREEN with 15s safety buffer.</p>
            </div>
          )}

        </div>

        {/* AI Co-Pilot Recommendation Cards */}
        <div className="lg:col-span-4 space-y-4 font-mono-tech text-xs">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            AI Advisory Telemetry
          </h3>

          <div className="space-y-3">
            <div className="glass-panel p-4 rounded-2xl space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-cyan-400">ADVISORY #101</span>
                <span className="text-emerald-400 font-bold">96% CONF</span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                Extend North Arm green duration by +15s at Silk Board before evening shift peak.
              </p>
              <button className="w-full btn-tactile-primary text-slate-950 py-2 rounded-xl font-bold uppercase cursor-pointer text-xs">
                Apply Advisory ✓
              </button>
            </div>

            <div className="glass-panel p-4 rounded-2xl space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-amber-400">ADVISORY #102</span>
                <span className="text-rose-400 font-bold">PRE-EMPTIVE</span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                Dadar West Arm queue buildup detected. Pre-divert heavy freight via Harbour link.
              </p>
              <button className="w-full btn-tactile-danger text-white py-2 rounded-xl font-bold uppercase cursor-pointer text-xs">
                Notify Constables 📢
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
