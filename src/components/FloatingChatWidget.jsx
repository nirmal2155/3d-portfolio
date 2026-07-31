import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Volume2, VolumeX, Maximize2, Sparkles, Activity } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { streamVercelChatbotResponse } from '../services/vercelAiService';

export default function FloatingChatWidget({ selectedJunction, isEmergencyActive, setIsEmergencyActive, onOpenVoiceModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'bot',
      text: "Hello, main Traffic Mitra AI hoon. Aap yahan mujhse traffic telemetry, 20+ Indian cities, live camera ML, ya ambulance corridors ke baare me type karke pooch sakte hain.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const speakResponse = (text) => {
    if (speechMuted || typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isGenerating) return;

    soundFx.playClick();
    setIsGenerating(true);

    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const initialBotMsg = {
      sender: 'bot',
      text: '...',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...chatHistory, userMsg];
    setChatHistory([...newMessages, initialBotMsg]);
    setInputText('');

    const fullText = await streamVercelChatbotResponse({
      messages: newMessages.map(m => ({ role: m.sender, content: m.text })),
      selectedJunction,
      isEmergencyActive,
      onChunk: (chunkText) => {
        setChatHistory(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            sender: 'bot',
            text: chunkText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return updated;
        });
      }
    });

    setIsGenerating(false);
    speakResponse(fullText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-mono-tech select-none">
      
      {/* Expanded Floating Chat Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[490px] core-panel rounded-2xl border border-[#00F2FE]/50 shadow-[0_0_50px_rgba(0,242,254,0.3)] flex flex-col mb-4 bg-slate-950/95 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-slate-900/90">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#00F2FE]/20 border border-[#00F2FE]/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#00F2FE] animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>TRAFFICMITRA AI CHAT</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </h3>
                <p className="text-[9px] text-slate-400 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Vercel AI SDK • 12ms Latency</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onOpenVoiceModal}
                title="Expand to Full Voice Copilot"
                className="p-1.5 rounded text-slate-400 hover:text-[#00F2FE] hover:bg-slate-800 transition cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSpeechMuted(!speechMuted)}
                title={speechMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="p-1.5 rounded text-slate-400 hover:text-white transition cursor-pointer"
              >
                {speechMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Stream Viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs bg-slate-950/60">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                  msg.sender === 'user'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/30'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>

                <div className={`max-w-[85%] p-3 rounded-xl space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 border border-rose-500/30 text-slate-100 rounded-tr-none'
                    : 'bg-slate-950 border border-[#00F2FE]/30 text-slate-100 rounded-tl-none shadow-[0_0_10px_rgba(0,242,254,0.1)]'
                }`}>
                  <p className="leading-relaxed font-medium text-[11px]">
                    {msg.text}
                  </p>
                  {msg.sender === 'bot' && msg.text !== '...' && (
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => speakResponse(msg.text)}
                        className="text-[9px] font-mono-tech text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-2.5 h-2.5" /> Replay 🔊
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-1.5 bg-slate-950 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[9px] font-mono-tech scrollbar-none">
            <button
              onClick={() => handleSendMessage("Pune traffic status batao")}
              className="bg-slate-900 border border-white/10 hover:border-[#00F2FE] px-2.5 py-0.5 rounded-full text-slate-300 whitespace-nowrap cursor-pointer"
            >
              Pune Traffic?
            </button>
            <button
              onClick={() => handleSendMessage("Ambulance corridor clear karo")}
              className="bg-slate-900 border border-white/10 hover:border-rose-500 px-2.5 py-0.5 rounded-full text-rose-300 whitespace-nowrap cursor-pointer"
            >
              Clear Corridor 🚑
            </button>
            <button
              onClick={() => handleSendMessage("Live webcam stream ML detection kya hai")}
              className="bg-slate-900 border border-white/10 hover:border-emerald-400 px-2.5 py-0.5 rounded-full text-emerald-300 whitespace-nowrap cursor-pointer"
            >
              Live Webcam ML?
            </button>
            <button
              onClick={() => handleSendMessage("Tech stack kya hai")}
              className="bg-slate-900 border border-white/10 hover:border-cyan-400 px-2.5 py-0.5 rounded-full text-cyan-300 whitespace-nowrap cursor-pointer"
            >
              Tech Stack?
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask TrafficMitra AI anything about traffic, cities, tech..."
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-sans focus:outline-none focus:border-[#00F2FE]"
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="p-2 rounded-lg bg-[#00F2FE] text-slate-950 font-bold hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Chat Button Trigger */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          soundFx.playClick();
        }}
        title={isOpen ? 'Close Chat' : 'Open TrafficMitra AI Chat'}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00F2FE] via-emerald-400 to-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.5)] cursor-pointer hover:scale-105 transition animate-bounce ml-auto"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

    </div>
  );
}
