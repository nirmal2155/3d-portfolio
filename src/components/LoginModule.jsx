import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  User, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  Radio, 
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function LoginModule({ onLoginSuccess }) {
  const [role, setRole] = useState('police'); // 'police' | 'engineer'
  const [username, setUsername] = useState('officer_sharma');
  const [password, setPassword] = useState('police2026');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('849-201');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setErrorMessage('');
    if (selectedRole === 'police') {
      setUsername('officer_sharma');
      setPassword('police2026');
    } else {
      setUsername('engineer_patel');
      setPassword('traffic2026');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (!username || !password) {
        setErrorMessage('ERROR: Username & Passphrase required.');
        setIsLoading(false);
        return;
      }

      const userData = {
        role,
        username,
        badgeId: role === 'police' ? 'POLICE BADGE #4092' : 'MUNICIPAL ENG #1088',
        name: role === 'police' ? 'Inspector Sharma' : 'Chief Eng. Patel',
        clearanceLevel: role === 'police' ? 'LEVEL 5 COMMAND ACCESS' : 'LEVEL 4 ENGINEERING CLEARANCE',
        loginTime: new Date().toLocaleTimeString()
      };

      localStorage.setItem('trafficmitra_user', JSON.stringify(userData));
      setIsLoading(false);
      onLoginSuccess(userData);
    }, 800);
  };

  return (
    <div className="min-h-screen relative bg-[#060B13] text-slate-200 flex items-center justify-center p-4 font-mono-tech select-none">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.08)_0%,transparent_65%)] pointer-events-none"></div>

      {/* Main Login Panel */}
      <div className="w-full max-w-md core-panel p-8 rounded-2xl space-y-6 relative z-10 border border-rose-500/40 shadow-[0_0_50px_rgba(244,63,94,0.15)]">
        
        {/* Strict Authorization Banner */}
        <div className="bg-rose-500/15 border border-rose-500/40 p-2.5 rounded-xl text-center flex items-center justify-center gap-2 text-[10px] text-rose-300 font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
          <span>RESTRICTED ACCESS: AUTHORIZED PERSONNEL ONLY</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 border-b border-white/10 pb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 p-0.5 mx-auto shadow-[0_0_20px_rgba(244,63,94,0.4)]">
            <div className="w-full h-full bg-[#060B13] rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-rose-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-xl font-extrabold text-white tracking-widest uppercase">
            POLICE_COMMAND_AUTH
          </h1>
          <p className="text-xs text-slate-400">
            SECTOR_01 LAW ENFORCEMENT & MUNICIPAL CLEARANCE
          </p>
        </div>

        {/* Authorized Roles Only Selection */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            SELECT AUTHORIZED CLEARANCE LEVEL:
          </span>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              type="button"
              onClick={() => handleRoleSelect('police')}
              className={`p-3 rounded-xl border text-center font-bold cursor-pointer transition ${
                role === 'police'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              👮 TRAFFIC POLICE OFFICER
              <span className="block text-[9px] font-normal text-slate-400 mt-0.5">LEVEL 5 COMMAND</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('engineer')}
              className={`p-3 rounded-xl border text-center font-bold cursor-pointer transition ${
                role === 'engineer'
                  ? 'bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              🏙️ MUNICIPAL ENGINEER
              <span className="block text-[9px] font-normal text-slate-400 mt-0.5">LEVEL 4 CLEARANCE</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          
          {/* Username Input */}
          <div className="space-y-1">
            <label className="text-slate-400 font-bold block">OFFICER BADGE ID / USERNAME</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Badge ID"
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-slate-200 font-mono-tech focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-slate-400 font-bold block">COMMAND PASSPHRASE</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Passphrase"
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-slate-200 font-mono-tech focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 2FA Token Simulation */}
          <div className="space-y-1">
            <label className="text-slate-400 font-bold block flex justify-between">
              <span>SECURITY TOKEN (2FA)</span>
              <span className="text-emerald-400">HARDWARE TOKEN VERIFIED</span>
            </label>
            <input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-rose-400 font-mono-tech text-center font-bold tracking-widest focus:outline-none"
            />
          </div>

          {errorMessage && (
            <div className="p-2.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-[11px] font-bold">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)] cursor-pointer hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? (
              <span>VERIFYING POLICE CLEARANCE...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>AUTHENTICATE AUTHORIZED SESSION</span>
              </>
            )}
          </button>

        </form>

        {/* Legal Disclaimer Footer */}
        <div className="pt-3 border-t border-white/10 text-center text-[9px] text-slate-400 space-y-1">
          <p className="text-rose-400 font-bold">
            NOTICE: UNAUTHORIZED ACCESS IS PROHIBITED UNDER INDIAN IT ACT 2000 SEC. 66
          </p>
          <div className="flex items-center justify-between text-slate-400 pt-1">
            <span>256-BIT ENCRYPTED COMMAND TUNNEL</span>
            <span className="text-cyan-400 font-bold">CLEARANCE VALID</span>
          </div>
        </div>

      </div>

    </div>
  );
}
