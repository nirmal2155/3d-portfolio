import React from 'react';
import { Search, Settings, Bell, User, MapPin, Globe, LogOut, ShieldCheck, Lock, Mic } from 'lucide-react';

export default function Header({ 
  selectedJunction, 
  setSelectedJunction, 
  junctions, 
  lang, 
  setLang, 
  user, 
  onLogout,
  onOpenAuth,
  onOpenSettings,
  onOpenNotifications,
  onOpenVoiceAgent,
  topTab,
  setTopTab,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header className="border-b border-white/10 bg-[#060B13]/90 px-6 py-3 font-mono-tech text-xs select-none flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Top Navigation Tabs */}
      <div className="flex items-center gap-6">
        {[
          { id: 'live', label: 'LIVE_FEED' },
          { id: 'grid', label: 'CITY_GRID' },
          { id: 'strategy', label: 'STRATEGY' },
          { id: 'analytics', label: 'ANALYTICS' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setTopTab(tab.id)}
            className={`pb-1 font-bold tracking-wider cursor-pointer transition ${
              topTab === tab.id
                ? 'border-b-2 border-[#00F2FE] text-[#00F2FE]'
                : 'text-slate-400 hover:text-slate-200 border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Center Search & Junction Selector */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="QUERY_OBJECT_ID (e.g. Silk Board / CAM-104)..."
            className="w-full bg-slate-900/90 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 font-mono-tech focus:outline-none focus:border-[#00F2FE]/50"
          />
        </div>

        {/* Junction Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg text-slate-200">
          <MapPin className="w-3.5 h-3.5 text-[#00F2FE]" />
          <select
            value={selectedJunction.id}
            onChange={(e) => {
              const j = junctions.find(item => item.id === e.target.value);
              if (j) setSelectedJunction(j);
            }}
            className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer text-slate-200"
          >
            {junctions.map(j => (
              <option key={j.id} value={j.id} className="bg-slate-950 text-white">
                {j.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Actions & User Badge */}
      <div className="flex items-center gap-2.5">
        
        {/* AI Voice Copilot Button */}
        <button
          onClick={onOpenVoiceAgent}
          title="AI Voice Copilot Assistant"
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00F2FE]/20 to-emerald-500/20 border border-[#00F2FE]/50 text-[#00F2FE] font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition cursor-pointer shadow-[0_0_12px_rgba(0,242,254,0.3)] animate-pulse"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>VOICE COPILOT</span>
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="System Settings"
          className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-[#00F2FE]/50 transition cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          title="Critical Alerts & Notifications"
          className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer relative"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5 animate-pulse"></span>
        </button>

        {/* User Badge / Login Trigger */}
        {user ? (
          <div 
            onClick={onOpenAuth}
            title="Click to Switch Authorized Officer"
            className="flex items-center gap-2 bg-slate-900 border border-rose-500/40 px-3 py-1 rounded-lg text-[11px] text-rose-300 font-bold cursor-pointer hover:bg-slate-800 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>{user.name.toUpperCase()} ({user.badgeId})</span>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-amber-500 px-3.5 py-1.5 rounded-lg text-white font-bold text-xs uppercase shadow-[0_0_15px_rgba(244,63,94,0.4)] cursor-pointer hover:opacity-90 transition"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>LOGIN / AUTHENTICATE</span>
          </button>
        )}

        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="border border-white/10 bg-slate-900 px-2.5 py-1 rounded text-[11px] font-bold text-emerald-400 flex items-center gap-1 cursor-pointer hover:bg-slate-800"
        >
          <Globe className="w-3 h-3" />
          <span>{lang === 'en' ? 'HI' : 'EN'}</span>
        </button>

        {user && (
          <button 
            onClick={onLogout}
            title="Log Out Session"
            className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}

      </div>

    </header>
  );
}
