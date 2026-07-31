import React, { useState, useEffect } from 'react';
import { Globe, Radio, Shield, AlertTriangle, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function SatelliteSarModule({ selectedJunction }) {
  const [sarBand, setSarBand] = useState('C-Band 5.4 GHz');
  const [resolution, setResolution] = useState('1m x 1m High-Res');
  const [cloudPenetration, setCloudPenetration] = useState('100% (Radar)');

  return (
    <div className="w-full h-full core-panel p-6 rounded-2xl bg-slate-950/90 border border-blue-500/50 flex flex-col justify-between space-y-6 font-mono-tech select-none overflow-y-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                ISRO / SATELLITE SYNTHETIC APERTURE RADAR (SAR) FLOOD MONITOR
              </h2>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] border border-blue-500/40 font-bold">
                EOS-04 TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-400">
              All-Weather Night / Cloud Penetrating Radar • Urban Waterlogging Submergence Detection • ISRO Satellite Feed
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-[11px] text-blue-400 flex items-center gap-2 font-bold">
          <Radio className="w-3.5 h-3.5 text-blue-400 animate-spin" />
          <span>ORBIT: 543 KM | PASS FREQUENCY: 12 MINS</span>
        </div>
      </div>

      {/* Satellite Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">RADAR FREQUENCY BAND</span>
          <p className="text-2xl font-extrabold text-blue-400">{sarBand}</p>
          <span className="text-[10px] text-slate-300">PENETRATES HEAVY MONSOON CLOUDS</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">SPATIAL RESOLUTION</span>
          <p className="text-2xl font-extrabold text-[#00F2FE]">{resolution}</p>
          <span className="text-[10px] text-emerald-400 font-bold">PRECISION ROAD-CELL SCAN</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">CLOUD PENETRATION</span>
          <p className="text-2xl font-extrabold text-emerald-400">{cloudPenetration}</p>
          <span className="text-[10px] text-slate-300">NIGHT & DAY ALL-WEATHER</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">WATERLOG RISK INDEX</span>
          <p className="text-2xl font-extrabold text-amber-400">12% (LOW)</p>
          <span className="text-[10px] text-emerald-400 font-bold">DRAINAGE CLEAR</span>
        </div>
      </div>

      {/* Radar Map Canvas Simulation */}
      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl text-center space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
        <p className="font-extrabold text-sm text-white uppercase">SATELLITE SAR SYNTHETIC APERTURE RADAR FEED ACTIVE</p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Scanning {selectedJunction?.name || 'Silk Board Junction'} road infrastructure. Zero optical visibility required during storm floods.
        </p>
      </div>

    </div>
  );
}
