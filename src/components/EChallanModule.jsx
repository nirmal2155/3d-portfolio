import React, { useState } from 'react';
import { ShieldAlert, Camera, Send, FileText, CheckCircle2, AlertTriangle, Search, Filter } from 'lucide-react';

export default function EChallanModule({ selectedJunction }) {
  const [violations, setViolations] = useState([
    {
      id: "CH-88401",
      plate: "KA-05-MH-8402",
      type: "RED_LIGHT_JUMP",
      vehicleType: "Car (White SUV)",
      fineAmount: 1000,
      timestamp: "14:22:08 IST",
      location: selectedJunction.name,
      status: "PENDING_DISPATCH",
      rtoOwner: "Ramesh Kumar",
      phone: "+91 98450 *****"
    },
    {
      id: "CH-88402",
      plate: "MH-02-DN-4910",
      type: "HELMETLESS_RIDER",
      vehicleType: "Two-Wheeler",
      fineAmount: 500,
      timestamp: "14:20:15 IST",
      location: selectedJunction.name,
      status: "PENDING_DISPATCH",
      rtoOwner: "Sunil Verma",
      phone: "+91 98201 *****"
    },
    {
      id: "CH-88403",
      plate: "DL-3C-AS-9912",
      type: "WRONG_SIDE_DRIVING",
      vehicleType: "Auto Rickshaw",
      fineAmount: 1500,
      timestamp: "14:18:42 IST",
      location: selectedJunction.name,
      status: "ISSUED",
      rtoOwner: "Amit Sharma",
      phone: "+91 98112 *****"
    }
  ]);

  const [dispatchedIds, setDispatchedIds] = useState(['CH-88403']);
  const [selectedViolation, setSelectedViolation] = useState(violations[0]);

  const handleDispatchChallan = (id) => {
    if (!dispatchedIds.includes(id)) {
      setDispatchedIds([...dispatchedIds, id]);
    }
  };

  const totalFineCollected = violations.reduce((acc, curr) => acc + curr.fineAmount, 485000);

  return (
    <div className="space-y-6 font-mono-tech text-xs select-none">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 uppercase">Automated ANPR & e-Challan Enforcement System</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automatic Number Plate Recognition (ANPR) & instant RTO Parivahan SMS fine dispatch for {selectedJunction.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-bold px-3.5 py-1.5 rounded-full">
            TOTAL REVENUE GENERATED: ₹{totalFineCollected.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Live ANPR Scanner & Violations Feed */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
            <span>Detected Traffic Violations (ANPR Stream)</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">ANPR ACTIVE</span>
          </h3>

          <div className="space-y-3 font-sans">
            {violations.map(v => {
              const isDispatched = dispatchedIds.includes(v.id);
              const isSelected = selectedViolation.id === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedViolation(v)}
                  className={`glass-panel p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected ? 'border-[#00F2FE] bg-slate-900/90' : 'border-white/5 bg-slate-950/60'
                  }`}
                >
                  <div className="flex justify-between items-start font-mono-tech mb-2">
                    <div>
                      <span className="text-base font-extrabold text-white block">{v.plate}</span>
                      <span className="text-[10px] text-slate-400">{v.vehicleType} • {v.timestamp}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-rose-400 block">₹{v.fineAmount}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isDispatched ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {isDispatched ? 'RTO SMS SENT ✓' : 'PENDING DISPATCH'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[11px] font-mono-tech">
                    <span className="text-amber-400 font-bold">VIOLATION: {v.type}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDispatchChallan(v.id);
                      }}
                      disabled={isDispatched}
                      className={`px-3 py-1 rounded font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isDispatched ? 'bg-slate-800 text-slate-400' : 'bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isDispatched ? 'CHALLAN SENT' : 'DISPATCH e-CHALLAN'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Violation Evidence Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#00F2FE]" /> ANPR High-Resolution Snap Evidence
            </h3>

            {/* Simulated License Plate Snapshot Canvas */}
            <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-rose-500/40 p-6 text-center space-y-3">
              <div className="w-full h-32 bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg flex flex-col items-center justify-center border border-white/10 relative">
                <span className="text-2xl font-black tracking-widest text-amber-300 font-mono-tech border-2 border-slate-700 px-4 py-1.5 rounded bg-slate-950 shadow-inner">
                  {selectedViolation.plate}
                </span>
                <span className="text-[9px] text-[#00F2FE] font-mono-tech mt-2">ANPR AI CONFIDENCE: 98.6%</span>

                {/* Bounding Box Outline */}
                <div className="absolute inset-4 border-2 border-dashed border-rose-500/60 pointer-events-none rounded"></div>
              </div>

              <div className="text-left space-y-2 text-xs font-mono-tech pt-2">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">RTO Registered Owner:</span>
                  <span className="text-slate-200 font-bold">{selectedViolation.rtoOwner}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Registered Mobile:</span>
                  <span className="text-cyan-400 font-bold">{selectedViolation.phone}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Location Node:</span>
                  <span className="text-slate-200 font-bold">{selectedViolation.location}</span>
                </div>
              </div>

              <button
                onClick={() => handleDispatchChallan(selectedViolation.id)}
                disabled={dispatchedIds.includes(selectedViolation.id)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer hover:opacity-90 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>SEND OFFICIAL RTO e-CHALLAN NOTICE (SMS)</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
