import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, Smartphone, Send, AlertTriangle, Route, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CitizenCoPilotModule({ selectedJunction, lang }) {
  const t = TRANSLATIONS[lang];
  const [activeChannel, setActiveChannel] = useState('whatsapp');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Namaste! 🚦 TrafficMitra AI Citizen Co-Pilot me aapka swagat hai.\n\nAap Silk Board Junction (ya nearby areas) ka live status & smart alternate route pooch sakte hain!`,
      time: '19:02'
    },
    {
      id: 2,
      sender: 'user',
      text: `${selectedJunction.name} signal wait time kitna hai?`,
      time: '19:03'
    },
    {
      id: 3,
      sender: 'bot',
      text: `🟢 **${selectedJunction.name} Live Status:**\n- Active Green: North Arm (42s)\n- AI Wait Time: **${selectedJunction.aiWaitTimeSec}s** (vs 142s traditional!)\n- Traffic Flow: ${selectedJunction.status}`,
      time: '19:03'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    setTimeout(() => {
      let botReplyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('route') || lower.includes('rasta') || lower.includes('alternate')) {
        botReplyText = `🗺️ **TrafficMitra Smart Reroute:**\n- Main Flyover has monsoon waterlogging.\n- **Recommended Bypass:** Take 100ft Inner Ring Road → Sarjapur Flyover.\n- ⏱️ **Time Saved:** 18 Minutes!`;
      } else {
        botReplyText = `🚦 **TrafficMitra AI Telemetry for ${selectedJunction.name}:**\n- Congestion Index: ${selectedJunction.congestionIndex}%\n- Signals adjusting dynamically to clear queue density.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 700);
  };

  return (
    <div className="space-y-6">

      {/* Header Bar */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">Citizen Co-Pilot & Public Access Wire</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Zero-App friction public communication via WhatsApp Bot & Offline SMS / USSD fallback.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/10 text-xs font-mono-tech">
          <button
            onClick={() => setActiveChannel('whatsapp')}
            className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition ${
              activeChannel === 'whatsapp' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            WhatsApp Bot
          </button>
          <button
            onClick={() => setActiveChannel('sms')}
            className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition ${
              activeChannel === 'sms' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Offline SMS / USSD Mode
          </button>
        </div>
      </div>

      {activeChannel === 'whatsapp' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Chat Container */}
          <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="font-bold text-slate-200 text-sm">WhatsApp Business Co-Pilot (#TM-BOT)</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-3 py-1 rounded-full font-mono-tech">
                VERIFIED OFFICIAL
              </span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto p-3 rounded-xl bg-slate-950/80 border border-white/5 no-scrollbar font-mono-tech text-xs">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3.5 rounded-2xl max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 rounded-tr-none'
                      : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1.5">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Chips */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <button
                onClick={() => handleSendMessage("Silk Board junction status")}
                className="bg-slate-900 hover:bg-slate-800 border border-white/10 text-cyan-300 px-3 py-1.5 rounded-xl font-mono-tech cursor-pointer transition"
              >
                🚦 Junction Status
              </button>
              <button
                onClick={() => handleSendMessage("Alternate route to HSR Layout")}
                className="bg-slate-900 hover:bg-slate-800 border border-white/10 text-emerald-300 px-3 py-1.5 rounded-xl font-mono-tech cursor-pointer transition"
              >
                🗺️ Smart Alternate Route
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message or query..."
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono-tech focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={() => handleSendMessage()}
                className="btn-tactile-primary text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>

          {/* Reroute Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase font-mono-tech tracking-wider">Zero-Friction Citizen Access</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                India has 500M+ WhatsApp users. Zero-app friction guarantees immediate adoption across all demographics without requiring storage or updates.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3 border-l-4 border-emerald-500">
              <span className="text-xs font-bold text-emerald-400 font-mono-tech uppercase">Societal Impact</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reduces panic rerouting during monsoon floods and festival processions by providing proactive, localized WhatsApp dispatches.
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* SMS Fallback */
        <div className="glass-panel p-8 rounded-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-slate-100">Offline SMS & USSD Quick Dispatch</h3>
            <p className="text-xs text-slate-400 mt-1">Designed for feature phones (2G/3G networks) without smartphone internet access.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-3 font-mono-tech text-xs">
              <span className="text-cyan-400 font-bold block">SMS COMMAND SERVICE</span>
              <code className="block p-3 bg-slate-900 text-emerald-400 rounded-xl border border-white/5">
                SMS: TRAFFIC SILKBOARD to 56161
              </code>
              <span className="text-slate-300 block pt-2 leading-relaxed">
                REPLY: [TrafficMitra] Silk Board: 12 min delay. Alt route via HSR 100ft Inner Ring Rd (Save 18 mins).
              </span>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-3 font-mono-tech text-xs">
              <span className="text-amber-400 font-bold block">USSD QUICK DIAL CODE</span>
              <code className="block p-3 bg-slate-900 text-amber-300 rounded-xl border border-white/5">
                DIAL *140*88#
              </code>
              <span className="text-slate-300 block pt-2 leading-relaxed">
                1. Silk Board Status | 2. Dadar Circle Status | 3. Emergency Corridor Alert
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
