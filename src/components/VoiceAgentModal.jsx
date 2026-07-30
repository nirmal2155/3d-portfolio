import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, ShieldAlert, CheckCircle2, MessageSquare, Bot } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function VoiceAgentModal({ isOpen, onClose, selectedJunction, isEmergencyActive, setIsEmergencyActive }) {
  if (!isOpen) return null;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition API if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = 'en-IN';

        rec.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        rec.onerror = (err) => {
          console.warn('Speech recognition error:', err);
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  // Process Domain Scoped Query & Generate Response
  const processQuery = (queryText) => {
    const q = queryText.toLowerCase().trim();
    if (!q) return;

    soundFx.playClick();
    let responseText = '';

    // Domain Keywords Matching
    const isTrafficRelated = 
      q.includes('traffic') || q.includes('density') || q.includes('silk board') ||
      q.includes('dadar') || q.includes('signal') || q.includes('ambulance') ||
      q.includes('corridor') || q.includes('fail-safe') || q.includes('camera') ||
      q.includes('vehicle') || q.includes('car') || q.includes('bus') ||
      q.includes('anpr') || q.includes('challan') || q.includes('hud') ||
      q.includes('wait time') || q.includes('junction') || q.includes('model') ||
      q.includes('system') || q.includes('police') || q.includes('engineer') ||
      q.includes('green light') || q.includes('red light') || q.includes('speed');

    if (!isTrafficRelated) {
      responseText = "Sorry, I am TrafficMitra AI Authorized Voice Assistant. I am trained exclusively for traffic management, signal telemetry, and system operations. I cannot answer out-of-domain questions.";
    } else {
      // Specific Traffic Domain Answers
      if (q.includes('density') || q.includes('silk board') || q.includes('status')) {
        responseText = `${selectedJunction.name} current congestion index is ${selectedJunction.congestionIndex} percent with ${selectedJunction.status} status. Active vehicle density score is 88.`;
      } else if (q.includes('ambulance') || q.includes('emergency')) {
        if (!isEmergencyActive) {
          setIsEmergencyActive(true);
          soundFx.playSiren();
          responseText = "Emergency Ambulance Corridor Activated! Turning all opposing signals RED on Silk Board trajectory and holding green wave clearance.";
        } else {
          responseText = "Emergency Ambulance Corridor is already active with siren synchronization enabled across all 4 municipal nodes.";
        }
      } else if (q.includes('fail-safe') || q.includes('fail safe') || q.includes('camera failed')) {
        responseText = "The Fail-Safe Engine automatically engages a 45-second fixed safety timer if any CCTV camera or edge device loses connection, guaranteeing zero traffic gridlock.";
      } else if (q.includes('anpr') || q.includes('challan') || q.includes('plate')) {
        responseText = "The Plate-Flag Advisory module detects potential traffic violations and flags them on the officer dashboard for human review only. Zero persistent plate images are stored.";
      } else if (q.includes('hud') || q.includes('driver') || q.includes('speed')) {
        responseText = "The Driver AR HUD recommends an optimal green-wave cruise speed of 38 km/h to allow connected vehicles to reach signals without stopping.";
      } else if (q.includes('vehicle') || q.includes('cars') || q.includes('bus') || q.includes('count')) {
        responseText = `Current node detection stream contains 18 cars, 42 two-wheelers, 14 auto-rickshaws, 4 buses, and 12 pedestrians with 98.4 percent confidence.`;
      } else {
        responseText = `TrafficMitra AI Core v2.4 operational status optimal. ${selectedJunction.name} is functioning with AI adaptive timing reducing wait times by 55 percent.`;
      }
    }

    setVoiceResponse(responseText);
    speakResponse(responseText);
  };

  // Speak out response using SpeechSynthesis API
  const speakResponse = (text) => {
    if (speechMuted || typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    setTranscript('');
    setVoiceResponse('');
    soundFx.playClick();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    } else {
      // Fallback prompt for browsers without Web Speech Recognition API
      const sample = prompt("Enter your voice query for TrafficMitra AI:", "What is the density at Silk Board?");
      if (sample) {
        setTranscript(sample);
        processQuery(sample);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (transcript) {
      processQuery(transcript);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-mono-tech select-none">
      
      {/* Modal Container */}
      <div className="w-full max-w-lg core-panel p-6 rounded-2xl space-y-5 relative z-10 border border-[#00F2FE]/50 shadow-[0_0_60px_rgba(0,242,254,0.25)]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F2FE] to-emerald-400 p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.4)]">
            <div className="w-full h-full bg-[#060B13] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00F2FE] animate-pulse" />
            </div>
          </div>

          <div>
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
              TRAFFICMITRA AI VOICE COPILOT
            </h2>
            <p className="text-[10px] text-emerald-400 font-bold">
              DOMAIN SCOPED ACCESS: AUTHORIZED COMMAND PERSONNEL
            </p>
          </div>
        </div>

        {/* Central Pulsing Visualizer & Mic Button */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 text-center space-y-4 relative overflow-hidden">
          
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center relative cursor-pointer" onClick={isListening ? stopListening : startListening}>
            {/* Pulsing Aura Rings */}
            <div className={`absolute inset-0 rounded-full border-2 ${isListening ? 'border-rose-500 animate-ping' : isSpeaking ? 'border-emerald-400 animate-pulse' : 'border-[#00F2FE]'}`}></div>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isListening ? 'bg-rose-500/20 text-rose-400' : isSpeaking ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#00F2FE]/20 text-[#00F2FE]'}`}>
              {isListening ? <Mic className="w-8 h-8 animate-bounce" /> : <Mic className="w-8 h-8" />}
            </div>
          </div>

          <button
            onClick={isListening ? stopListening : startListening}
            className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer transition ${
              isListening ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'bg-[#00F2FE] text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.4)]'
            }`}
          >
            {isListening ? 'LISTENING... CLICK TO SUBMIT' : 'TAP MICROPHONE TO SPEAK'}
          </button>

          {/* Audio Mute Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setSpeechMuted(!speechMuted)}
              className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              {speechMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{speechMuted ? 'SPEECH SYNTHESIS MUTED' : 'SPEECH SYNTHESIS ENABLED'}</span>
            </button>
          </div>
        </div>

        {/* Live Transcript & Voice Response */}
        <div className="space-y-3 font-sans text-xs">
          
          {transcript && (
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase font-bold block">Officer Voice Query:</span>
              <p className="text-slate-200 font-bold">"{transcript}"</p>
            </div>
          )}

          {voiceResponse && (
            <div className="bg-slate-950 p-4 rounded-xl border border-[#00F2FE]/40 space-y-2">
              <span className="text-[10px] font-mono-tech text-[#00F2FE] uppercase font-bold block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Voice Copilot Answer:
              </span>
              <p className="text-slate-100 font-medium leading-relaxed">
                {voiceResponse}
              </p>
            </div>
          )}

        </div>

        {/* Sample Guardrail Quick Test Buttons */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">TRY QUICK VOICE QUERIES:</span>
          
          <div className="flex flex-wrap gap-2 text-[10px]">
            <button
              onClick={() => {
                setTranscript("What is the density at Silk Board?");
                processQuery("What is the density at Silk Board?");
              }}
              className="bg-slate-900 border border-white/10 hover:border-[#00F2FE] p-2 rounded-lg text-slate-300 cursor-pointer"
            >
              "Silk Board density status?"
            </button>

            <button
              onClick={() => {
                setTranscript("Activate emergency ambulance corridor");
                processQuery("Activate emergency ambulance corridor");
              }}
              className="bg-slate-900 border border-white/10 hover:border-rose-500 p-2 rounded-lg text-rose-300 cursor-pointer"
            >
              "Activate emergency corridor"
            </button>

            <button
              onClick={() => {
                setTranscript("Who won the IPL cricket match?");
                processQuery("Who won the IPL cricket match?");
              }}
              className="bg-slate-900 border border-white/10 hover:border-amber-500 p-2 rounded-lg text-amber-300 cursor-pointer"
            >
              "Who won IPL?" (Test Out-of-Domain Guardrail 🛑)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
