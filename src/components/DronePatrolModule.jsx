import React, { useState, useEffect } from 'react';
import { Camera, Radio, Shield, Eye, AlertCircle, RefreshCw, Zap, Video, Lock } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function DronePatrolModule({ selectedJunction }) {
  const [activeCam, setActiveCam] = useState(0);
  const [droneAltitude, setDroneAltitude] = useState(120); // meters
  const [droneBattery, setDroneBattery] = useState(88); // %
  const [isPatrolling, setIsPatrolling] = useState(true);

  const cams = [
    { title: 'CAM-01: NORTHBOUND FLYOVER SCAN', type: 'Optical HD 4K', status: 'ACTIVE', density: 'High (84%)' },
    { title: 'CAM-02: DRONE AIRBORNE THERMAL PATROL', type: 'FLIR Thermal Nightvision', status: 'PATROLLING', density: 'Moderate (62%)' },
    { title: 'CAM-03: ANPR CHECKPOINT ENTRANCE', type: 'IR High Speed Plate Reader', status: 'ACTIVE', density: 'Heavy (88%)' },
    { title: 'CAM-04: PEDESTRIAN CROSSWALK ML FEED', type: 'COCO-SSD Object Detector', status: 'ACTIVE', density: 'Normal (41%)' }
  ];

  return (
    <div className="w-full h-full core-panel p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/40 flex flex-col justify-between space-y-6 font-mono-tech select-none overflow-y-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <Video className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                AUTONOMOUS AI DRONE PATROL & 4-WAY CCTV MATRIX
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/40 font-bold">
                THERMAL LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Airborne Surveillance • FLIR Night Vision • Automated Incident Detection • High-Altitude Grid Scan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>ALTITUDE: {droneAltitude}m | BATTERY: {droneBattery}%</span>
          </div>
        </div>
      </div>

      {/* 4-Way CCTV & Drone Video Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {cams.map((cam, idx) => (
          <div
            key={idx}
            onClick={() => {
              soundFx.playClick();
              setActiveCam(idx);
            }}
            className={`relative rounded-xl border overflow-hidden transition cursor-pointer flex flex-col justify-between p-4 min-h-[190px] ${
              activeCam === idx
                ? 'bg-slate-900 border-[#00F2FE] shadow-[0_0_25px_rgba(0,242,254,0.3)]'
                : 'bg-slate-950 border-white/10 hover:border-white/30'
            }`}
          >
            {/* Ambient Animated Scanner Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00F2FE]/5 via-transparent to-transparent pointer-events-none animate-pulse" />

            <div className="flex justify-between items-start z-10">
              <span className="font-bold text-xs text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#00F2FE]" />
                {cam.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                {cam.status}
              </span>
            </div>

            <div className="my-auto text-center z-10 space-y-1">
              <Eye className="w-8 h-8 text-slate-600 mx-auto animate-bounce" />
              <p className="text-[10px] text-slate-400 font-bold uppercase">{cam.type}</p>
              <p className="text-xs font-extrabold text-[#00F2FE]">TRAFFIC DENSITY: {cam.density}</p>
            </div>

            <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-white/5 pt-2 z-10">
              <span>LATENCY: 14ms</span>
              <span>ENCRYPTION: AES-256</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
