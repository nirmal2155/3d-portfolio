import React from 'react';
import { Bell, X, AlertTriangle, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

export default function NotificationsModal({ isOpen, onClose, isEmergencyActive, setIsEmergencyActive }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-mono-tech text-xs select-none">
      <div className="w-full max-w-lg core-panel p-6 rounded-2xl space-y-5 relative z-10 border border-rose-500/40 shadow-[0_0_50px_rgba(244,63,94,0.2)]">
        
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider">CRITICAL_NOTIFICATIONS (03)</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          
          <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-rose-500 space-y-2">
            <div className="flex justify-between font-bold text-rose-400">
              <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> COLLISION_DETECTION_S02</span>
              <span className="bg-rose-500/20 px-2 py-0.5 rounded text-[10px]">HIGH IMPACT</span>
            </div>
            <p className="text-slate-300 text-[11px] font-sans">
              Vehicle collision detected on Silk Board North Approach Lane 104-B. Emergency response dispatch notified.
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px]">
              <span className="text-slate-400">TIME: 14:22:08 IST</span>
              <button className="bg-rose-500 text-white font-bold px-3 py-1 rounded cursor-pointer hover:bg-rose-600">
                Dispatch Ambulance 🚑
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-amber-500 space-y-2">
            <div className="flex justify-between font-bold text-amber-400">
              <span className="flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> SIGNAL_FAILURE_D08</span>
              <span className="bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">RESET REQ</span>
            </div>
            <p className="text-slate-300 text-[11px] font-sans">
              CCTV Camera #89 feed non-responsive at Dadar T.T. Circle. Fail-Safe 45s fixed timer mode engaged automatically.
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px]">
              <span className="text-slate-400">TIME: 14:21:44 IST</span>
              <button className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded cursor-pointer hover:bg-amber-400">
                Reboot Camera 🔄
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-[#00F2FE] space-y-2">
            <div className="flex justify-between font-bold text-[#00F2FE]">
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> EMERGENCY_CORRIDOR_STATUS</span>
              <span className="bg-[#00F2FE]/20 px-2 py-0.5 rounded text-[10px]">{isEmergencyActive ? 'ACTIVE' : 'READY'}</span>
            </div>
            <p className="text-slate-300 text-[11px] font-sans">
              Green corridor clearance ready for Silk Board → Electronic City trajectory.
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px]">
              <span className="text-slate-400">STATUS: SYNCHRONIZED</span>
              <button
                onClick={() => setIsEmergencyActive(!isEmergencyActive)}
                className={`font-bold px-3 py-1 rounded cursor-pointer ${
                  isEmergencyActive ? 'bg-rose-500 text-white animate-pulse' : 'bg-[#00F2FE] text-slate-950'
                }`}
              >
                {isEmergencyActive ? 'Clear Corridor' : 'Trigger Corridor 🚑'}
              </button>
            </div>
          </div>

        </div>

        <div className="pt-2 border-t border-white/10 text-center">
          <button onClick={onClose} className="text-[11px] text-[#00F2FE] font-bold hover:underline cursor-pointer">
            MARK ALL NOTIFICATIONS AS READ ✓
          </button>
        </div>

      </div>
    </div>
  );
}
