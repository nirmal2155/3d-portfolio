import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, Send, Bot, User, ShieldCheck, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function VoiceAgentModal({ isOpen, onClose, selectedJunction, isEmergencyActive, setIsEmergencyActive }) {
  if (!isOpen) return null;

  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'bot',
      text: "Hello, main Traffic Mitra AI hoon. Main aapka Command Control Voice Assistant hoon. Aap mujhse Traffic Mitra AI telemetry, signal timings, e-Challan advisory, ya emergency corridors ke baare me kuch bhi pooch sakte hain.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll chat stream to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Initialize Speech Recognition API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'hi-IN'; // Multi-lingual Support

        rec.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setInputText(text);
          handleSendMessage(text);
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

  // Process Query and Return "Hello, main Traffic Mitra AI hoon..."
  const generateResponse = (queryText) => {
    const q = queryText.toLowerCase().trim();
    if (!q) return "";

    const greeting = "Hello, main Traffic Mitra AI hoon. ";

    // Domain Check
    const isTrafficRelated = 
      q.includes('traffic') || q.includes('density') || q.includes('silk board') ||
      q.includes('dadar') || q.includes('signal') || q.includes('ambulance') ||
      q.includes('corridor') || q.includes('fail-safe') || q.includes('failsafe') ||
      q.includes('camera') || q.includes('vehicle') || q.includes('car') ||
      q.includes('bus') || q.includes('auto') || q.includes('bike') ||
      q.includes('anpr') || q.includes('challan') || q.includes('hud') ||
      q.includes('wait') || q.includes('junction') || q.includes('model') ||
      q.includes('system') || q.includes('police') || q.includes('engineer') ||
      q.includes('weather') || q.includes('tech') || q.includes('react') ||
      q.includes('speed') || q.includes('chalu') || q.includes('kaise') ||
      q.includes('batao') || q.includes('kaun') || q.includes('helo') || q.includes('hello');

    if (!isTrafficRelated) {
      return `${greeting}Kshama karein, main ek specialized Traffic Intelligence Model hoon. Main sirf Traffic Mitra AI, road density, signal timings, aur command control operations ke baare me uttar de sakta hoon. Kisi anya vishay ke liye main uttar nahi de sakta.`;
    }

    // Comprehensive Traffic Intelligence Responses
    if (q.includes('density') || q.includes('silk board') || q.includes('status') || q.includes('traffic')) {
      return `${greeting}Abhi ${selectedJunction.name} par congestion index ${selectedJunction.congestionIndex}% hai, aur traffic flow ${selectedJunction.status} hai. TrafficMitra AI ki vajah se wait time 142 seconds se ghat kar 64 seconds ho gaya hai.`;
    } 
    
    if (q.includes('ambulance') || q.includes('emergency') || q.includes('rasta') || q.includes('corridor')) {
      if (!isEmergencyActive) {
        setIsEmergencyActive(true);
        soundFx.playSiren();
        return `${greeting}Emergency Ambulance Corridor instant activate kar diya gaya hai! Silk Board trajectory par sabhi opposing signals ko RED kar ke ambulance ke liye GREEN wave clear kar di gayi hai.`;
      } else {
        return `${greeting}Emergency Ambulance Corridor pehle se hi active hai! Siren audio sensors synchronized hain aur clear path open hai.`;
      }
    } 

    if (q.includes('fail-safe') || q.includes('failsafe') || q.includes('camera') || q.includes('fail')) {
      return `${greeting}Humara Fail-Safe Engine camera disconnect hone par automatically 45-second fixed safety timer mode me switch kar leta hai, jisse kabhi bhi junction par lockup ya jam nahi hota.`;
    } 

    if (q.includes('anpr') || q.includes('challan') || q.includes('plate') || q.includes('fine')) {
      return `${greeting}Plate-Flag Advisory module potential red-light jump aur helmetless riding ko detect karke police dashboard par flag karta hai. Yahan Human-in-the-Loop policy hai — jab tak officer confirm na kare, koi automatic fine issue nahi hota.`;
    } 

    if (q.includes('hud') || q.includes('driver') || q.includes('speed') || q.includes('cruise')) {
      return `${greeting}Connected vehicles ke Driver AR HUD par hum 38 km/h ki optimal green-wave cruise speed recommend karte hain, jisse vehicle bina rukey green signal cross kar leta hai.`;
    } 

    if (q.includes('tech') || q.includes('technology') || q.includes('react') || q.includes('three') || q.includes('bana')) {
      return `${greeting}Mera pura system React 18, Vite, Three.js 3D WebGL simulator, TensorFlow.js MobileNet client-side ML, aur GLSL WebGL fragment shader background canvas par chalta hai.`;
    } 

    if (q.includes('vehicle') || q.includes('car') || q.includes('bus') || q.includes('count') || q.includes('kitne')) {
      return `${greeting}Current YOLOv8 detection stream me 18 cars, 42 two-wheelers, 14 autos, 4 buses, aur 12 pedestrians 98.4% confidence score ke sath detect hue hain.`;
    } 

    if (q.includes('weather') || q.includes('mausam') || q.includes('temp')) {
      return `${greeting}Abhi junction par temperature 24°C hai, humidity 88% hai, aur visibility 800 meters moderate hai. Monsoon waterlogging risk 68% estimated hai.`;
    }

    return `${greeting}Main Traffic Mitra AI operational hoon. Aap mujhse kisi bhi junction ka live density index, ambulance emergency corridor, ya e-Challan review status pooch sakte hain.`;
  };

  // Speak Response Out Loud
  const speakResponse = (text) => {
    if (speechMuted || typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    soundFx.playClick();

    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const replyText = generateResponse(text);

    const botMsg = {
      sender: 'bot',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg, botMsg]);
    setInputText('');
    speakResponse(replyText);
  };

  const startListening = () => {
    soundFx.playClick();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    } else {
      const sample = prompt("TrafficMitra AI Voice Assistant - Query dalein:", "Silk Board traffic status?");
      if (sample) handleSendMessage(sample);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-mono-tech select-none">
      
      {/* Modal Container */}
      <div className="w-full max-w-2xl core-panel rounded-2xl flex flex-col h-[600px] relative z-10 border border-[#00F2FE]/50 shadow-[0_0_60px_rgba(0,242,254,0.25)] overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F2FE] to-emerald-400 p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.4)]">
              <div className="w-full h-full bg-[#060B13] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#00F2FE] animate-pulse" />
              </div>
            </div>

            <div>
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span>TRAFFICMITRA AI VOICE COPILOT</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">GEMINI CHAT ENGINE</span>
              </h2>
              <p className="text-[10px] text-slate-400">
                DOMAIN SCOPED INTELLIGENCE • AUTHORIZED COMMAND ACCESS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeechMuted(!speechMuted)}
              title={speechMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {speechMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gemini-Style Conversational Chat Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-xs bg-slate-950/50">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold ${
                msg.sender === 'user'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[80%] p-4 rounded-2xl space-y-1.5 ${
                msg.sender === 'user'
                  ? 'bg-slate-900 border border-rose-500/30 text-slate-100 rounded-tr-none'
                  : 'bg-slate-950 border border-[#00F2FE]/30 text-slate-100 rounded-tl-none shadow-[0_0_15px_rgba(0,242,254,0.1)]'
              }`}>
                <div className="flex justify-between items-center text-[10px] font-mono-tech text-slate-400 mb-1">
                  <span className="font-bold text-cyan-300">
                    {msg.sender === 'user' ? 'COMMAND OFFICER' : 'TRAFFICMITRA AI'}
                  </span>
                  <span>{msg.time}</span>
                </div>

                <p className="leading-relaxed font-medium">
                  {msg.text}
                </p>

                {msg.sender === 'bot' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => speakResponse(msg.text)}
                      className="text-[10px] font-mono-tech text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" /> Replay Speech 🔊
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 bg-slate-950 border-t border-white/5 flex flex-wrap gap-2 text-[10px] font-mono-tech">
          <button
            onClick={() => handleSendMessage("Silk Board traffic status batao")}
            className="bg-slate-900 border border-white/10 hover:border-[#00F2FE] px-3 py-1 rounded-full text-slate-300 cursor-pointer"
          >
            "Silk Board status?"
          </button>
          <button
            onClick={() => handleSendMessage("Ambulance aayi hai corridor clear karo")}
            className="bg-slate-900 border border-white/10 hover:border-rose-500 px-3 py-1 rounded-full text-rose-300 cursor-pointer"
          >
            "Clear ambulance corridor 🚑"
          </button>
          <button
            onClick={() => handleSendMessage("Fail-Safe engine kaise kaam karta hai")}
            className="bg-slate-900 border border-white/10 hover:border-emerald-400 px-3 py-1 rounded-full text-emerald-300 cursor-pointer"
          >
            "Fail-Safe engine?"
          </button>
          <button
            onClick={() => handleSendMessage("IPL match kisne jeeta?")}
            className="bg-slate-900 border border-white/10 hover:border-amber-400 px-3 py-1 rounded-full text-amber-300 cursor-pointer"
          >
            "IPL score?" (Test Guardrail 🛑)
          </button>
        </div>

        {/* Input Bar & Voice Button */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center gap-3">
          <button
            onClick={isListening ? stopListening : startListening}
            title={isListening ? 'Stop Listening' : 'Start Voice Listening'}
            className={`p-3 rounded-xl border flex-shrink-0 transition cursor-pointer ${
              isListening
                ? 'bg-rose-500 border-rose-500 text-white animate-bounce shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'bg-slate-900 border-white/10 text-[#00F2FE] hover:border-[#00F2FE]'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex-1 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask TrafficMitra AI anything about traffic, signals, or corridors..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-sans focus:outline-none focus:border-[#00F2FE]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#00F2FE] text-slate-950 font-bold hover:opacity-90 transition cursor-pointer flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
