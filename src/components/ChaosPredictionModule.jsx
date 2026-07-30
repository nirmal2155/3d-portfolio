import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { MOCK_EVENTS, HISTORICAL_HOURLY_DATA } from '../data/mockEvents';
import { Line } from 'react-chartjs-2';
import { TrendingUp, AlertTriangle, Calendar, Activity, Zap } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChaosPredictionModule({ selectedJunction, lang }) {
  const t = TRANSLATIONS[lang];

  const chartData = {
    labels: HISTORICAL_HOURLY_DATA.map(d => d.time),
    datasets: [
      {
        label: 'Traditional Fixed Signal Wait (sec)',
        data: HISTORICAL_HOURLY_DATA.map(d => d.traditionalWaitSec),
        borderColor: '#F43F5E',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: 'TrafficMitra AI Wait Time (sec)',
        data: HISTORICAL_HOURLY_DATA.map(d => d.aiWaitSec),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        borderWidth: 2.5,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#F8FAFC', font: { family: 'JetBrains Mono', size: 11, weight: '600' } }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono' } },
        title: { display: true, text: 'Wait Time (Seconds)', color: '#06B6D4', font: { family: 'JetBrains Mono', weight: 'bold' } }
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* Unified Glass Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">30–60 Min Predictive Chaos Dispatch</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Forecast engine combining monsoon forecasts, festival calendars, and tech park shift schedules.
          </p>
        </div>

        <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold px-3.5 py-1.5 rounded-full font-mono-tech self-start sm:self-auto">
          LSTM FORECAST ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column: Predictive Zone Grid & Chart */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase font-mono-tech tracking-wider border-b border-white/10 pb-3">
              Predictive Zone Bottleneck Matrix (+45 Min Horizon)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-tech text-xs">
              
              <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/50 space-y-2 glow-border-rose">
                <div className="flex justify-between items-center">
                  <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    94% CHAOS
                  </span>
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                </div>
                <h4 className="font-bold text-sm text-slate-100 font-sans">Zone A: Dadar Circle</h4>
                <p className="text-slate-400 font-sans text-[11px] leading-snug">
                  Ganesh Visarjan Procession bottleneck expected in 45 mins.
                </p>
                <div className="text-rose-400 font-bold text-[10px] uppercase pt-2 border-t border-white/5">
                  Action: Divert freight to Eastern Link
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    78% HEAVY
                  </span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <h4 className="font-bold text-sm text-slate-100 font-sans">Zone B: Silk Board</h4>
                <p className="text-slate-400 font-sans text-[11px] leading-snug">
                  Monsoon downpour risk at underpass in 30 mins.
                </p>
                <div className="text-amber-400 font-bold text-[10px] uppercase pt-2 border-t border-white/5">
                  Action: Extend East-West green +25%
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    42% NORMAL
                  </span>
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-sm text-slate-100 font-sans">Zone C: Cyber Towers</h4>
                <p className="text-slate-400 font-sans text-[11px] leading-snug">
                  Tech park shift discharge flowing smoothly.
                </p>
                <div className="text-emerald-400 font-bold text-[10px] uppercase pt-2 border-t border-white/5">
                  Action: Nominal AI allocation
                </div>
              </div>

            </div>
          </div>

          {/* Time Series Chart Box */}
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase font-mono-tech tracking-wider border-b border-white/10 pb-3">
              24-Hour Congestion & Wait-Time Forecast Model (LSTM)
            </h4>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Right Column: Predicted Event Wire Feed */}
        <div className="lg:col-span-4 space-y-4 font-mono-tech text-xs">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-white/10 pb-3 font-mono-tech flex items-center justify-between">
              <span>Festival & Chaos Dispatches</span>
              <Calendar className="w-4 h-4 text-cyan-400" />
            </h3>

            <div className="space-y-3">
              {MOCK_EVENTS.map(event => (
                <div key={event.id} className="bg-slate-950/80 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-2 items-center">
                    <span className="font-bold text-slate-100 text-xs font-sans">{event.title}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      event.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {event.severity}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400">
                    <span>LOCATION: {event.location}</span>
                  </div>

                  <div className="border-t border-white/5 pt-2 text-[11px] text-slate-200">
                    <strong className="text-cyan-400">ACTION:</strong> {event.recommendedAction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
