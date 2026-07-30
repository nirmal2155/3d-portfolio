import React from 'react';
import { Radio, CloudRain, Plus, Minus, Compass, Box, AlertTriangle } from 'lucide-react';

export function NetworkVitalsWidget() {
  return (
    <div className="core-panel p-4 rounded-xl font-mono-tech text-xs space-y-3 w-72">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-[#00F2FE]" /> NETWORK_VITALS
        </span>
        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          SYNC_OK
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-400">NODE_LOAD</span>
          <span className="text-emerald-400 font-bold">74%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900 rounded overflow-hidden">
          <div className="h-full bg-emerald-400 w-[74%]"></div>
        </div>
      </div>

      <div className="flex justify-between text-[11px] pt-1">
        <span className="text-slate-400">LATENCY</span>
        <span className="text-cyan-400 font-bold">12ms</span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
        <div className="bg-slate-950 p-2 rounded border border-white/5">
          <span className="text-[9px] text-slate-400 block">DOWNLINK</span>
          <strong className="text-cyan-300 font-bold text-xs">4.2 GB/s</strong>
        </div>
        <div className="bg-slate-950 p-2 rounded border border-white/5">
          <span className="text-[9px] text-slate-400 block">UPLINK</span>
          <strong className="text-emerald-300 font-bold text-xs">1.8 GB/s</strong>
        </div>
      </div>
    </div>
  );
}

export function WeatherImpactWidget({ selectedJunction }) {
  let coordsStr = '12.9177° N, 77.6238° E';
  if (selectedJunction && selectedJunction.coordinates) {
    if (typeof selectedJunction.coordinates === 'string') {
      coordsStr = selectedJunction.coordinates;
    } else if (typeof selectedJunction.coordinates === 'object') {
      coordsStr = `${selectedJunction.coordinates.lat}° N, ${selectedJunction.coordinates.lng}° E`;
    }
  }

  return (
    <div className="space-y-2">
      <div className="core-panel p-4 rounded-xl font-mono-tech text-xs space-y-3 w-72">
        <div className="flex items-center gap-3">
          <CloudRain className="w-8 h-8 text-cyan-400" />
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase">WEATHER IMPACT</div>
            <div className="text-2xl font-black text-white">24°C</div>
            <div className="text-[10px] text-amber-400 font-bold">VISIBILITY: MODERATE (800M)</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-[10px] text-center">
          <div>
            <span className="text-slate-400 block">WIND</span>
            <strong className="text-slate-200">14km/h</strong>
          </div>
          <div>
            <span className="text-slate-400 block">HUMID</span>
            <strong className="text-slate-200">88%</strong>
          </div>
          <div>
            <span className="text-slate-400 block">PRECIP</span>
            <strong className="text-cyan-400">68%</strong>
          </div>
        </div>
      </div>

      {/* Map Zoom & GPS Bar */}
      <div className="flex items-center gap-2">
        <div className="core-panel p-1.5 rounded-lg flex items-center gap-1">
          <button className="p-1 hover:bg-slate-800 text-slate-300 rounded"><Plus className="w-3.5 h-3.5" /></button>
          <button className="p-1 hover:bg-slate-800 text-slate-300 rounded"><Minus className="w-3.5 h-3.5" /></button>
          <button className="p-1 hover:bg-slate-800 text-slate-300 rounded"><Compass className="w-3.5 h-3.5" /></button>
          <button className="p-1 hover:bg-slate-800 text-[#00F2FE] rounded"><Box className="w-3.5 h-3.5" /></button>
        </div>

        <div className="core-panel px-3 py-1.5 rounded-lg font-mono-tech text-[10px] text-[#00F2FE] font-bold">
          COORDS: {coordsStr}
        </div>
      </div>
    </div>
  );
}

export function CriticalAlertsWidget({ isEmergencyActive }) {
  return (
    <div className="core-panel p-4 rounded-xl font-mono-tech text-xs space-y-3 w-80">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> CRITICAL_ALERTS (03)
        </span>
      </div>

      <div className="space-y-2">
        
        {/* Card 1: Collision Detection */}
        <div className="p-2.5 rounded bg-slate-950 border-l-4 border-rose-500 space-y-1">
          <div className="flex justify-between font-bold text-rose-400 text-[11px]">
            <span>COLLISION_DETECTION</span>
            <span className="text-[9px] bg-rose-500/20 px-1 rounded">HIGH</span>
          </div>
          <div className="text-[10px] text-slate-400">
            VEHICLE_COLLISION_S02 | LANE_ID: 104-B | TIME: 14:22:08
          </div>
        </div>

        {/* Card 2: Signal Failure */}
        <div className="p-2.5 rounded bg-slate-950 border-l-4 border-amber-500 space-y-1">
          <div className="flex justify-between font-bold text-amber-400 text-[11px]">
            <span>SIGNAL_FAILURE_D08</span>
            <span className="text-[9px] bg-amber-500/20 px-1 rounded font-normal">RESET_REQ</span>
          </div>
          <div className="text-[10px] text-slate-400">
            STATUS: NON_RESPONSIVE | TIME: 14:21:44
          </div>
        </div>

        {/* Card 3: Emergency Corridor */}
        <div className={`p-2.5 rounded bg-slate-950 border-l-4 border-cyan-400 space-y-1 ${isEmergencyActive ? 'animate-pulse' : ''}`}>
          <div className="flex justify-between font-bold text-cyan-400 text-[11px]">
            <span>EMERGENCY_CORRIDOR_READY</span>
            <span className="text-[9px] bg-cyan-500/20 px-1 rounded">ACTIVE</span>
          </div>
          <div className="text-[10px] text-slate-400">
            SECTOR: SILK_BOARD_HUB | SIREN: SYNCHRONIZED
          </div>
        </div>

      </div>
    </div>
  );
}
