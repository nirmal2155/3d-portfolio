import React from 'react';
import { TrendingUp, Fuel, Leaf, Clock, Award, ShieldCheck } from 'lucide-react';

export default function AnalyticsModule({ selectedJunction }) {
  return (
    <div className="space-y-6 font-mono-tech text-xs select-none">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100 uppercase">Enterprise Performance & Environmental Impact Audit</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated carbon reduction, fuel savings, and throughput telemetry for {selectedJunction.name}.
          </p>
        </div>

        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold px-3.5 py-1.5 rounded-full">
          ESG COMPLIANT REPORT
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-emerald-500/30">
          <div className="flex justify-between items-center text-slate-400 text-[10px]">
            <span>CO2 EMISSIONS REDUCED</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <strong className="text-2xl text-emerald-400 font-extrabold block">1,840 MT</strong>
          <span className="text-[10px] text-emerald-300">Equivalent to planting 82,000 trees</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-[#00F2FE]/30">
          <div className="flex justify-between items-center text-slate-400 text-[10px]">
            <span>FUEL WASTAGE SAVED</span>
            <Fuel className="w-4 h-4 text-[#00F2FE]" />
          </div>
          <strong className="text-2xl text-[#00F2FE] font-extrabold block">742,000 Liters</strong>
          <span className="text-[10px] text-cyan-300">Saved in idle waiting time per year</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-amber-500/30">
          <div className="flex justify-between items-center text-slate-400 text-[10px]">
            <span>COMMUTE TIME RECLAIMED</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <strong className="text-2xl text-amber-400 font-extrabold block">14.2 Lakh Hrs</strong>
          <span className="text-[10px] text-amber-300">Returned to citizens annually</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-purple-500/30">
          <div className="flex justify-between items-center text-slate-400 text-[10px]">
            <span>ECONOMIC SAVINGS</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <strong className="text-2xl text-purple-300 font-extrabold block">₹18.4 Crore</strong>
          <span className="text-[10px] text-purple-200">Direct city productivity boost</span>
        </div>
      </div>

      {/* Hourly Flow Chart Representation */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase border-b border-white/10 pb-3">
          24-Hour Junction Throughput & Congestion Audit (Vehicles / Hour)
        </h3>

        <div className="space-y-3 font-sans">
          {[
            { hour: '08:00 AM (Morning Peak)', traditional: '4,200 veh', ai: '6,800 veh', gain: '+61%' },
            { hour: '01:00 PM (Mid-Day)', traditional: '2,400 veh', ai: '3,900 veh', gain: '+62%' },
            { hour: '06:00 PM (Evening Peak)', traditional: '5,100 veh', ai: '7,900 veh', gain: '+54%' },
            { hour: '11:00 PM (Night Off-Peak)', traditional: '1,100 veh', ai: '1,800 veh', gain: '+63%' }
          ].map((row, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-200 font-mono-tech w-48">{row.hour}</span>
              <div className="flex items-center gap-6 font-mono-tech">
                <span className="text-slate-400">Fixed Signal: <strong className="text-rose-400">{row.traditional}</strong></span>
                <span className="text-[#00F2FE]">TrafficMitra AI: <strong className="text-emerald-400">{row.ai}</strong></span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-3 py-1 rounded-full font-mono-tech">
                {row.gain} THROUGHPUT
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
