import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { COMPETITIVE_BENCHMARKS } from '../utils/failSafeLogic';
import { ShieldCheck, AlertOctagon, CheckCircle2, Lock, Zap } from 'lucide-react';

export default function TrustFailSafeModule({ lang, cameraFailed, setCameraFailed }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-6">

      {/* Header Bar */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">Trust, Reliability & Fail-Safe Architecture</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Graceful degradation engine, zero-face-recognition privacy, and ATCS competitive benchmarks.
          </p>
        </div>

        <button
          onClick={() => setCameraFailed(!cameraFailed)}
          className={`px-5 py-2.5 rounded-xl font-mono-tech text-xs font-bold uppercase cursor-pointer transition ${
            cameraFailed
              ? 'btn-tactile-danger text-white glow-border-rose'
              : 'bg-slate-900 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950'
          }`}
        >
          {cameraFailed ? 'RESTORE CAMERA FEED 🟢' : 'SIMULATE CAMERA FAILURE ⚠️'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono-tech text-xs">

        {/* Graceful Degradation Engine Panel */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h3 className="font-bold text-base text-slate-100 font-sans">Graceful Degradation Engine</h3>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
              cameraFailed ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 glow-border-rose' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-border-emerald'
            }`}>
              {cameraFailed ? 'FAIL_SAFE_FIXED MODE' : 'DYNAMIC_AI MODE'}
            </span>
          </div>

          <div className={`p-5 rounded-2xl border ${
            cameraFailed ? 'bg-rose-950/30 border-rose-500/50 text-rose-200' : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
          }`}>
            <span className="font-bold block text-sm mb-1 font-sans">
              {cameraFailed ? '⚠️ CAMERA FEED INTERRUPTED — FAIL-SAFE ENGAGED' : '🟢 CAMERA STREAM OPERATIONAL'}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {cameraFailed
                ? 'System automatically degraded to pre-configured 45s fixed timer mode. Traffic signals continue operating normally without freezing.'
                : 'Edge model processing at 30 FPS with 94%+ detection confidence. Dynamic green allocation active.'}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-1 font-sans">
            <span className="font-bold uppercase text-cyan-400 text-xs font-mono-tech block">PRIVACY-BY-DESIGN COMMITMENT:</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              TrafficMitra AI performs vehicle-type classification ONLY. No facial recognition, no license plate logging, edge-local processing.
            </p>
          </div>
        </div>

        {/* Competitive Benchmark Matrix Panel */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-base text-slate-100 font-sans border-b border-white/10 pb-3">
            ATCS Competitive Benchmarking Matrix
          </h3>

          <div className="space-y-3 font-sans">
            {COMPETITIVE_BENCHMARKS.map((bench, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/70 rounded-xl border border-white/5 space-y-1">
                <div className="flex justify-between font-bold text-slate-200 text-xs">
                  <span>{bench.feature}</span>
                  <span className="text-emerald-400 font-mono-tech">🏆 {bench.winner}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono-tech pt-1">
                  <div>TRADITIONAL: {bench.traditionalATCS}</div>
                  <div className="text-cyan-300 font-bold">TRAFFICMITRA: {bench.trafficMitraAI}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
