import React from 'react';
import { 
  Activity, 
  Cpu, 
  AlertTriangle, 
  MessageSquare, 
  Radio, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  LogOut,
  Sparkles,
  Lock,
  Camera,
  Navigation,
  Waves,
  Video,
  Volume2,
  Wifi,
  Globe,
  Heart
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, user, onLogout, onOpenAuth, onOpenHelp }) {
  const menuItems = [
    { id: 'cv', label: 'SYSTEM_HEALTH', icon: Activity, badge: null },
    { id: 'adaptive', label: 'DEPLOYMENT', icon: Cpu, badge: null },
    { id: 'quantum', label: 'QUANTUM_AI', icon: Cpu, badge: 'WORLD_FIRST' },
    { id: 'sar', label: 'ISRO_SAR', icon: Globe, badge: 'RADAR' },
    { id: 'bio', label: 'BIO_RADAR', icon: Heart, badge: '60GHZ' },
    { id: 'greenwave', label: 'GREEN_WAVE', icon: Waves, badge: 'CASCADE' },
    { id: 'dronepatrol', label: 'DRONE_PATROL', icon: Video, badge: 'AIRBORNE' },
    { id: 'acousticsiren', label: 'ACOUSTIC_DSP', icon: Volume2, badge: 'SIREN' },
    { id: 'cv2x', label: 'C-V2X_5G', icon: Wifi, badge: 'URLLC' },
    { id: 'echallan', label: 'ANPR_CHALLAN', icon: Camera, badge: 'RTO' },
    { id: 'driverhud', label: 'DRIVER_HUD', icon: Navigation, badge: 'AR' },
    { id: 'chaos', label: 'INCIDENTS', icon: AlertTriangle, badge: '03' },
    { id: 'citizen', label: 'CITIZEN_WIRE', icon: MessageSquare, badge: null },
    { id: 'police', label: 'DRONE_FEEDS', icon: Radio, badge: 'LIVE' },
    { id: 'trust', label: 'FAIL_SAFE', icon: ShieldCheck, badge: null },
    { id: 'pitch', label: 'PITCH_DECK', icon: FileText, badge: 'ROI' },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-[#060B13]/90 flex flex-col justify-between p-4 font-mono-tech text-xs select-none min-h-screen">
      
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00F2FE] animate-pulse" />
            <h1 className="text-sm font-extrabold tracking-widest text-white uppercase">
              TRAFFIC_CORE_V2.4
            </h1>
          </div>

          <div 
            onClick={onOpenAuth}
            className="mt-4 p-2.5 rounded-lg bg-slate-900/80 border border-rose-500/40 flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <div>
              <div className="font-bold text-rose-300 text-[11px]">
                {user?.name?.toUpperCase() || 'AUTHENTICATE ACCESS'}
              </div>
              <div className="text-[9px] text-slate-400 uppercase">
                {user?.badgeId || 'CLICK TO LOGIN'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold tracking-wider transition cursor-pointer text-[11px] ${
                  isActive
                    ? 'bg-[#00F2FE]/15 border-l-4 border-[#00F2FE] text-[#00F2FE]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00F2FE]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${
                    item.badge === 'WORLD_FIRST' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse' :
                    item.badge === 'RADAR' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                    item.badge === '60GHZ' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                    item.badge === 'CASCADE' ? 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Help & Logout */}
      <div className="border-t border-white/10 pt-4 space-y-1">
        <button 
          onClick={onOpenHelp}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-100 font-bold transition cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>HELP & MANUAL</span>
        </button>

        {user ? (
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/20 font-bold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>LOG_OUT</span>
          </button>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#00F2FE] hover:bg-[#00F2FE]/20 font-bold transition cursor-pointer"
          >
            <Lock className="w-4 h-4 text-[#00F2FE]" />
            <span>LOGIN_SYSTEM</span>
          </button>
        )}
      </div>

    </aside>
  );
}
