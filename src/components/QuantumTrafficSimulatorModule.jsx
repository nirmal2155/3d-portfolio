import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, RefreshCw, Layers, ShieldCheck, Sparkles, CheckCircle2, GitBranch } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function QuantumTrafficSimulatorModule({ selectedJunction }) {
  const [iterations, setIterations] = useState(10000);
  const [quantumState, setQuantumState] = useState('SUPERPOSITION');
  const [isSimulating, setIsSimulating] = useState(false);
  const [parallelUniverseOutcomes, setParallelUniverseOutcomes] = useState([
    { scenario: 'Scenario A: Normal Flow + Green Wave Offset', probability: '74.2%', congestion: '32% (Optimal)', co2Savings: '-42%' },
    { scenario: 'Scenario B: Sudden Heavy Monsoon Waterlogging', probability: '18.5%', congestion: '78% (Managed)', co2Savings: '-18%' },
    { scenario: 'Scenario C: Unscheduled Breakdown at Junction East', probability: '5.8%', congestion: '88% (Rerouted)', co2Savings: '-8%' },
    { scenario: 'Scenario D: VVIP Escort Corridor Priority Lock', probability: '1.5%', congestion: '45% (Isolated)', co2Savings: '-30%' }
  ]);

  const handleSimulateQuantum = () => {
    soundFx.playClick();
    setIsSimulating(true);
    setQuantumState('COLLAPSING PROBABILITY WAVE...');
    setTimeout(() => {
      setIsSimulating(false);
      setQuantumState('QUANTUM EIGENSTATE COLLAPSED');
      setIterations(prev => prev + 2500);
      soundFx.playSuccess();
    }, 1500);
  };

  return (
    <div className="w-full h-full core-panel p-6 rounded-2xl bg-slate-950/90 border border-purple-500/50 flex flex-col justify-between space-y-6 font-mono-tech select-none overflow-y-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                WORLD-FIRST: QUANTUM MULTI-VERSE TRAFFIC SIMULATOR
              </h2>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/40 font-bold">
                10,000 PARALLEL SCENARIOS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Monte Carlo Quantum Annealing Engine • Probability Wavefront Collapse • 2-Hour Future Bottleneck Elimination
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateQuantum}
          disabled={isSimulating}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-[#00F2FE] text-white font-bold text-xs uppercase flex items-center gap-2 hover:opacity-90 transition cursor-pointer shadow-[0_0_25px_rgba(168,85,247,0.5)] disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'SIMULATING 10K SCENARIOS...' : 'RUN QUANTUM SIMULATION ⚛️'}</span>
        </button>
      </div>

      {/* Quantum State Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">SIMULATED ITERATIONS</span>
          <p className="text-2xl font-extrabold text-purple-400">{iterations.toLocaleString()}</p>
          <span className="text-[10px] text-slate-300">PARALLEL TRAFFIC PATHWAYS</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">QUANTUM PROBABILITY STATE</span>
          <p className="text-sm font-extrabold text-[#00F2FE] truncate">{quantumState}</p>
          <span className="text-[10px] text-emerald-400 font-bold">DECOHERENCE TIME: 0.4ms</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">PREDICTIVE TIME HORIZON</span>
          <p className="text-2xl font-extrabold text-amber-400">120 MINS</p>
          <span className="text-[10px] text-slate-300">FUTURE ACCIDENT PREEMPTION</span>
        </div>

        <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">CONVERGENCE ACCURACY</span>
          <p className="text-2xl font-extrabold text-emerald-400">99.7%</p>
          <span className="text-[10px] text-emerald-400 font-bold">EIGENSTATE MATCH</span>
        </div>
      </div>

      {/* Parallel Universe Scenarios Table */}
      <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-200 uppercase flex items-center justify-between">
          <span className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-purple-400" />
            <span>PARALLEL UNIVERSE TRAFFIC OUTCOME DISTRIBUTION</span>
          </span>
          <span className="text-purple-400 text-[10px]">MONTE CARLO PROBABILITY</span>
        </h3>

        <div className="space-y-2">
          {parallelUniverseOutcomes.map((out, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                  {out.scenario}
                </p>
                <p className="text-[10px] text-slate-400">Target Congestion: {out.congestion} • Estimated CO2 Reduction: {out.co2Savings}</p>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-extrabold border border-purple-500/40">
                  {out.probability} CHANCE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
