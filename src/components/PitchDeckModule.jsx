import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { PITCH_SLIDES, JUDGE_QUESTIONS } from '../data/pitchData';
import confetti from 'canvas-confetti';
import { Trophy, ChevronLeft, ChevronRight, Calculator, HelpCircle, Sparkles } from 'lucide-react';

export default function PitchDeckModule({ lang }) {
  const t = TRANSLATIONS[lang];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numJunctions, setNumJunctions] = useState(50);
  const [openFaq, setOpenFaq] = useState(null);

  const triggerPitchVictory = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const traditionalCostPerJunction = 5000000;
  const trafficMitraCostPerJunction = 150000;

  const totalTraditionalCost = numJunctions * traditionalCostPerJunction;
  const totalTrafficMitraCost = numJunctions * trafficMitraCostPerJunction;
  const savingsRupees = totalTraditionalCost - totalTrafficMitraCost;
  const savingsCr = (savingsRupees / 10000000).toFixed(2);

  const slide = PITCH_SLIDES[currentSlide];

  return (
    <div className="space-y-6">

      {/* Header Bar */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100">Hackathon Pitch Deck & Financial Feasibility Audit</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            5-minute slide deck, ₹4.2 Crore budget savings calculator, and judge defense cheat sheet.
          </p>
        </div>

        <button
          onClick={triggerPitchVictory}
          className="btn-tactile-primary text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer font-mono-tech"
        >
          <Sparkles className="w-4 h-4" />
          <span>SIMULATE WINNING PITCH 🏆</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono-tech text-xs">

        {/* Pitch Slide Presentation Frame */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="font-bold text-cyan-400">SLIDE {currentSlide + 1} OF {PITCH_SLIDES.length}</span>
            <div className="flex gap-2">
              <button
                disabled={currentSlide === 0}
                onClick={() => setCurrentSlide(prev => prev - 1)}
                className="bg-slate-900 border border-white/10 text-slate-200 px-3 py-1.5 rounded-xl disabled:opacity-30 cursor-pointer flex items-center gap-1 hover:bg-slate-800"
              >
                <ChevronLeft className="w-4 h-4" /> PREV
              </button>
              <button
                disabled={currentSlide === PITCH_SLIDES.length - 1}
                onClick={() => setCurrentSlide(prev => prev + 1)}
                className="bg-slate-900 border border-white/10 text-slate-200 px-3 py-1.5 rounded-xl disabled:opacity-30 cursor-pointer flex items-center gap-1 hover:bg-slate-800"
              >
                NEXT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4 font-sans">
            <h3 className="text-2xl font-black text-slate-100 tracking-tight">{slide.title}</h3>
            <p className="text-sm font-semibold text-cyan-300 bg-cyan-500/10 border-l-4 border-cyan-500 p-3 rounded-r-xl">
              "{slide.tagline}"
            </p>

            <ul className="space-y-3 text-sm text-slate-200 leading-relaxed pt-2">
              {slide.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/40 space-y-1 font-sans glow-border-cyan">
            <span className="text-cyan-400 text-xs font-bold font-mono-tech uppercase block">Key Differentiator:</span>
            <p className="font-bold text-slate-100 text-sm">{slide.highlight}</p>
          </div>
        </div>

        {/* Financial Audit & FAQ Column */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Financial Audit Calculator Card */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-sm font-sans">Financial Feasibility Audit</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Municipal Junctions:</span>
                <strong className="font-bold text-cyan-400">{numJunctions} Junctions</strong>
              </div>

              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={numJunctions}
                onChange={(e) => setNumJunctions(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Traditional Loops:</span>
                  <span className="text-rose-400 font-bold">₹{(totalTraditionalCost / 100000).toFixed(1)} L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TrafficMitra AI (Edge):</span>
                  <span className="text-emerald-400 font-bold">₹{(totalTrafficMitraCost / 100000).toFixed(1)} L</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-slate-100">
                  <span>City Budget Saved:</span>
                  <span className="text-emerald-400 text-glow-emerald">₹{savingsCr} Cr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Judge Defense Q&A Card */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-sm font-sans">Judge Defense Cheat Sheet</h3>
            </div>

            <div className="space-y-2 font-sans">
              {JUDGE_QUESTIONS.map((faq, i) => (
                <div key={i} className="bg-slate-950/80 rounded-xl border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-3 text-left font-bold text-xs text-slate-200 flex justify-between items-center hover:bg-slate-900"
                  >
                    <span>{faq.question}</span>
                    <span className="text-cyan-400">{openFaq === i ? '−' : '+'}</span>
                  </button>

                  {openFaq === i && (
                    <div className="p-3 pt-0 border-t border-white/5 text-[11px] text-slate-300 leading-relaxed bg-slate-950">
                      <strong className="text-emerald-400 block font-mono-tech text-[10px] uppercase mb-1">
                        DEFENSE ANSWER:
                      </strong>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
