import React, { useState, useEffect } from 'react';
import { Wifi, Radio, Cpu, ShieldCheck, Zap, Activity, CheckCircle2, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function CV2XBroadcastModule({ selectedJunction }) {
  const [packetsSent, setPacketsSent] = useState(14820);
  const [activeVehiclesCount, setActiveVehiclesCount] = useState(342);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketsSent(prev => prev + 8);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full core-panel p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/40 flex flex-col justify-between space-y-6 font-mono-tech select-none overflow-y-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Wifi className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                5G C-V2X VEHICLE TELEMETRY BROADCAST TOWER
              </h2>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] border border-cyan-500/40 font-bold">
                SAE J2735 DIRECT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cellular Vehicle-to-Everything • Low-Latency Packet Transmission • Direct Dashboard Speed Advisory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-[11px] text-[#00F2FE] flex items-center gap-2 font-bold">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>PACKETS BROADCAST: {packetsSent.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* C-V2X Vitals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">LATENCY BANDWIDTH</span>
          <p className="text-2xl font-extrabold text-emerald-400">2.4 MS</p>
          <span className="text-[10px] text-slate-300">ULTRA-RELIABLE LOW LATENCY (URLLC)</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">CONNECTED VEHICLES</span>
          <p className="text-2xl font-extrabold text-[#00F2FE]">{activeVehiclesCount}</p>
          <span className="text-[10px] text-emerald-400 font-bold">ACTIVE IN 500M RADIUS</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">PROTOCOL FREQUENCY</span>
          <p className="text-2xl font-extrabold text-amber-400">5.9 GHZ ITS</p>
          <span className="text-[10px] text-slate-300">DSRC / 5G PC5 DIRECT</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">CRUISE RECOMMENDATION</span>
          <p className="text-2xl font-extrabold text-cyan-400">38 KM/H</p>
          <span className="text-[10px] text-emerald-400 font-bold">GREEN-WAVE LOCK</span>
        </div>
      </div>

      {/* Telemetry Stream Output Panel */}
      <div className="bg-slate-900/80 border border-white/10 p-4 rounded-xl space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          LIVE 5G C-V2X BROADCAST PACKET LOGS
        </span>
        <div className="bg-slate-950 p-3 rounded-lg border border-white/5 font-mono-tech text-[10px] text-emerald-400 space-y-1">
          <p>[SAE_J2735] MAP_DATA_MSG: IntersectionID #8401 | Phase: GREEN_PHASE_02 | TimeToChange: 24.2s</p>
          <p>[SAE_J2735] SPAT_MSG: CruiseSpeedAdvise: 38.0 km/h | PlatoonTarget: CLEAR_GREEN</p>
          <p>[SAE_J2735] BSM_ALERT: AmbulanceApproaching (Distance: 180m, Priority: URGENT_01)</p>
        </div>
      </div>

    </div>
  );
}
