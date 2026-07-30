import React from 'react';
import { MapPin, Navigation, Radio, Activity, CheckCircle2, Zap } from 'lucide-react';

export default function CityGridModule({ junctions, selectedJunction, setSelectedJunction }) {
  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#00F2FE]" />
            <h2 className="text-lg font-bold text-slate-100">GIS Metro Grid Network Topology</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry map showing all active municipal junction nodes, edge devices, and signal states.
          </p>
        </div>

        <span className="bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40 text-[10px] font-bold px-3.5 py-1.5 rounded-full font-mono-tech">
          4 MUNICIPAL NODES ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono-tech text-xs">

        {/* Interactive GIS Node Grid */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Active Municipal Grid Nodes</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {junctions.map(j => {
              const isSelected = selectedJunction.id === j.id;
              const isCritical = j.congestionIndex > 85;

              return (
                <div
                  key={j.id}
                  onClick={() => setSelectedJunction(j)}
                  className={`glass-panel p-5 rounded-2xl cursor-pointer glass-panel-hover border transition-all ${
                    isSelected ? 'border-[#00F2FE] bg-slate-900/90 glow-border-cyan' : 'border-white/5 bg-slate-950/60'
                  }`}
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                    <span className="font-bold text-slate-100 text-sm font-sans">{j.name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCritical ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {j.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">City / State:</span>
                      <span className="text-slate-200 font-bold">{j.city}, {j.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Congestion Index:</span>
                      <strong className={`font-bold ${isCritical ? 'text-rose-400' : 'text-[#00F2FE]'}`}>{j.congestionIndex}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Wait Reduction:</span>
                      <strong className="text-emerald-400 font-bold">{j.timeSavedPercent}% Faster</strong>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex justify-between text-[10px] text-slate-400">
                    <span>Edge: <strong>{j.edgeDevice}</strong></span>
                    <span className="text-[#00F2FE] font-bold">SELECT NODE →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Telemetry Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-white/10 pb-3">
              Selected Node Details
            </h3>

            <div className="space-y-3 font-sans">
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-mono-tech uppercase block">Junction Name</span>
                <strong className="text-base text-slate-100 font-bold">{selectedJunction.name}</strong>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-mono-tech uppercase block">CCTV Camera ID</span>
                <strong className="text-sm text-[#00F2FE] font-mono-tech">{selectedJunction.cctvId}</strong>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-mono-tech uppercase block">GPS Coordinates</span>
                <strong className="text-sm text-emerald-400 font-mono-tech">
                  {selectedJunction.coordinates?.lat || 12.9177}° N, {selectedJunction.coordinates?.lng || 77.6238}° E
                </strong>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
