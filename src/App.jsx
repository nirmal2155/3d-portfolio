import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CyberShaderBackground from './components/CyberShaderBackground';
import ErrorBoundary from './components/ErrorBoundary';
import IntroLoader from './components/IntroLoader';

import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import NotificationsModal from './components/NotificationsModal';
import HelpModal from './components/HelpModal';
import VoiceAgentModal from './components/VoiceAgentModal';
import GovernmentReportModal from './components/GovernmentReportModal';
import AudioSettingsModal from './components/AudioSettingsModal';
import KioskModeOverlay from './components/KioskModeOverlay';
import FloatingChatWidget from './components/FloatingChatWidget';

import ComputerVisionModule from './components/ComputerVisionModule';
import AdaptiveSignalModule from './components/AdaptiveSignalModule';
import EChallanModule from './components/EChallanModule';
import DriverHudModule from './components/DriverHudModule';
import ChaosPredictionModule from './components/ChaosPredictionModule';
import CitizenCoPilotModule from './components/CitizenCoPilotModule';
import PoliceDashboardModule from './components/PoliceDashboardModule';
import TrustFailSafeModule from './components/TrustFailSafeModule';
import PitchDeckModule from './components/PitchDeckModule';

import GreenWaveCoordinatorModule from './components/GreenWaveCoordinatorModule';
import DronePatrolModule from './components/DronePatrolModule';
import AcousticSirenModule from './components/AcousticSirenModule';
import CV2XBroadcastModule from './components/CV2XBroadcastModule';

import QuantumTrafficSimulatorModule from './components/QuantumTrafficSimulatorModule';
import SatelliteSarModule from './components/SatelliteSarModule';
import BioDriverStressModule from './components/BioDriverStressModule';

import CityGridModule from './components/CityGridModule';
import StrategyModule from './components/StrategyModule';
import AnalyticsModule from './components/AnalyticsModule';

import { 
  NetworkVitalsWidget, 
  WeatherImpactWidget, 
  CriticalAlertsWidget 
} from './components/FloatingHudWidgets';
import { MOCK_JUNCTIONS } from './data/mockJunctions';
import { soundFx } from './utils/soundEffects';
import { Layers, Filter, ShieldCheck, Play } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isKiosk, setIsKiosk] = useState(false);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [isGovtReportOpen, setIsGovtReportOpen] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);

  // Navigation state
  const [currentTab, setCurrentTab] = useState('cv'); // Sidebar tab
  const [topTab, setTopTab] = useState('live'); // Header tab ('live' | 'grid' | 'strategy' | 'analytics')
  const [searchQuery, setSearchQuery] = useState('');

  const [lang, setLang] = useState('en');
  const [junctions, setJunctions] = useState(MOCK_JUNCTIONS);
  const [selectedJunction, setSelectedJunction] = useState(MOCK_JUNCTIONS[0]);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [cameraFailed, setCameraFailed] = useState(false);

  // Check persistent login session
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('trafficmitra_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      }
    } catch (e) {
      console.warn('Session restoration failed:', e);
    }
  }, []);

  // Filter junctions by search query
  const filteredJunctions = junctions.filter(j => 
    j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.cctvId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    soundFx.playSuccess();
  };

  const handleLogout = () => {
    localStorage.removeItem('trafficmitra_user');
    setUser(null);
    soundFx.playClick();
  };

  const triggerTabChange = (tab, isTop = false) => {
    soundFx.playClick();
    if (isTop) {
      setTopTab(tab);
    } else {
      setCurrentTab(tab);
      setTopTab('live');
    }
  };

  return (
    <div className="min-h-screen relative bg-[#060B13] text-slate-200 flex flex-col font-mono-tech select-none overflow-x-hidden">
      
      {/* 0. High-Tech Animated Intro Logo Loader */}
      {showIntro && (
        <IntroLoader onComplete={() => setShowIntro(false)} />
      )}

      {/* 4K Kiosk Mode Full-Screen Display Overlay */}
      <KioskModeOverlay
        isKiosk={isKiosk}
        setIsKiosk={setIsKiosk}
        selectedJunction={selectedJunction}
      />

      {/* 1. Animated WebGL Cyber Data Flow Shader Background */}
      <ErrorBoundary>
        <CyberShaderBackground />
      </ErrorBoundary>

      {/* Modals & Overlay Drawers */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        isEmergencyActive={isEmergencyActive}
        setIsEmergencyActive={(active) => {
          setIsEmergencyActive(active);
          if (active) soundFx.playSiren();
        }}
      />
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
      <VoiceAgentModal
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
        selectedJunction={selectedJunction}
        isEmergencyActive={isEmergencyActive}
        setIsEmergencyActive={setIsEmergencyActive}
      />
      <GovernmentReportModal
        isOpen={isGovtReportOpen}
        onClose={() => setIsGovtReportOpen(false)}
        selectedJunction={selectedJunction}
        user={user}
      />
      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
      />

      {/* Floating On-Screen Chat Widget (Bottom Right) */}
      <ErrorBoundary>
        <FloatingChatWidget
          selectedJunction={selectedJunction}
          isEmergencyActive={isEmergencyActive}
          setIsEmergencyActive={setIsEmergencyActive}
          onOpenVoiceModal={() => setIsVoiceAgentOpen(true)}
        />
      </ErrorBoundary>

      {/* 2. Top Navigation Header Bar */}
      <div className="relative z-20">
        <ErrorBoundary>
          <Header
            selectedJunction={selectedJunction}
            setSelectedJunction={(j) => {
              setSelectedJunction(j);
              soundFx.playClick();
            }}
            junctions={filteredJunctions.length ? filteredJunctions : junctions}
            lang={lang}
            setLang={(l) => {
              setLang(l);
              soundFx.playClick();
            }}
            user={user}
            onLogout={handleLogout}
            onOpenAuth={() => {
              setIsAuthOpen(true);
              soundFx.playClick();
            }}
            onOpenSettings={() => {
              setIsSettingsOpen(true);
              soundFx.playClick();
            }}
            onOpenNotifications={() => {
              setIsNotificationsOpen(true);
              soundFx.playClick();
            }}
            onOpenVoiceAgent={() => {
              setIsVoiceAgentOpen(true);
              soundFx.playClick();
            }}
            onOpenGovtReport={() => {
              setIsGovtReportOpen(true);
              soundFx.playClick();
            }}
            onOpenAudioSettings={() => {
              setIsAudioSettingsOpen(true);
              soundFx.playClick();
            }}
            onToggleKiosk={() => {
              setIsKiosk(true);
              soundFx.playClick();
            }}
            topTab={topTab}
            setTopTab={(t) => triggerTabChange(t, true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </ErrorBoundary>
      </div>

      <div className="flex flex-1 relative z-10">
        
        {/* 3. Left Navigation Sidebar */}
        <ErrorBoundary>
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={(tab) => triggerTabChange(tab, false)}
            user={user}
            onLogout={handleLogout}
            onOpenAuth={() => {
              setIsAuthOpen(true);
              soundFx.playClick();
            }}
            onOpenHelp={() => {
              setIsHelpOpen(true);
              soundFx.playClick();
            }}
          />
        </ErrorBoundary>

        {/* 4. Central Viewport & Floating HUD Layout */}
        <div className="flex-1 relative flex flex-col justify-between p-6">
          
          {/* Top Bar inside Viewport */}
          <div className="flex justify-between items-start z-10 mb-4">
            
            {/* Viewport Active View Pill with Tactical Indicators */}
            <div className="flex items-center gap-2">
              <div className="core-panel px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 flex items-center gap-2 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse"></span>
                <span>ACTIVE VIEW: {topTab.toUpperCase()}_MODE</span>
              </div>

              <button
                onClick={() => {
                  setShowIntro(true);
                  soundFx.playClick();
                }}
                className="hidden sm:flex items-center gap-1.5 core-panel px-3 py-1.5 rounded-lg text-[10px] text-[#00F2FE] font-bold border border-[#00F2FE]/40 hover:bg-[#00F2FE]/10 transition cursor-pointer"
                title="Replay Intro Logo Animation"
              >
                <Play className="w-3 h-3 text-[#00F2FE]" />
                <span>REPLAY INTRO 🎬</span>
              </button>

              <div className="hidden xl:flex items-center gap-1.5 core-panel px-3 py-1.5 rounded-lg text-[10px] text-emerald-400 font-bold border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TLS 1.3 ENCRYPTED</span>
              </div>

              <div 
                onClick={() => {
                  setIsSettingsOpen(true);
                  soundFx.playClick();
                }}
                className="core-panel p-1.5 rounded-lg text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
              </div>
              <div 
                onClick={() => {
                  setIsNotificationsOpen(true);
                  soundFx.playClick();
                }}
                className="core-panel p-1.5 rounded-lg text-[#00F2FE] hover:text-white cursor-pointer"
              >
                <Filter className="w-4 h-4" />
              </div>
            </div>

            {/* Top-Right Floating Network Vitals Widget */}
            <div className="hidden lg:block">
              <ErrorBoundary>
                <NetworkVitalsWidget />
              </ErrorBoundary>
            </div>
          </div>

          {/* Main Core Module Canvas Viewport with Laser Radar Scan Animation */}
          <div className="flex-1 z-0 relative">
            <div className="radar-scan-line"></div>

            <ErrorBoundary>
              {topTab === 'grid' && (
                <CityGridModule
                  junctions={junctions}
                  selectedJunction={selectedJunction}
                  setSelectedJunction={(j) => {
                    setSelectedJunction(j);
                    soundFx.playClick();
                  }}
                />
              )}

              {topTab === 'strategy' && (
                <StrategyModule selectedJunction={selectedJunction} />
              )}

              {topTab === 'analytics' && (
                <AnalyticsModule selectedJunction={selectedJunction} />
              )}

              {topTab === 'live' && (
                <>
                  {currentTab === 'cv' && (
                    <ComputerVisionModule
                      selectedJunction={selectedJunction}
                      lang={lang}
                      isEmergencyActive={isEmergencyActive}
                      setIsEmergencyActive={(act) => {
                        setIsEmergencyActive(act);
                        if (act) soundFx.playSiren();
                      }}
                    />
                  )}

                  {currentTab === 'adaptive' && (
                    <AdaptiveSignalModule
                      selectedJunction={selectedJunction}
                      lang={lang}
                      isEmergencyActive={isEmergencyActive}
                    />
                  )}

                  {currentTab === 'quantum' && (
                    <QuantumTrafficSimulatorModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'sar' && (
                    <SatelliteSarModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'bio' && (
                    <BioDriverStressModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'greenwave' && (
                    <GreenWaveCoordinatorModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'dronepatrol' && (
                    <DronePatrolModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'acousticsiren' && (
                    <AcousticSirenModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'cv2x' && (
                    <CV2XBroadcastModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'echallan' && (
                    <EChallanModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'driverhud' && (
                    <DriverHudModule selectedJunction={selectedJunction} />
                  )}

                  {currentTab === 'chaos' && (
                    <ChaosPredictionModule
                      selectedJunction={selectedJunction}
                      lang={lang}
                    />
                  )}

                  {currentTab === 'citizen' && (
                    <CitizenCoPilotModule
                      selectedJunction={selectedJunction}
                      lang={lang}
                    />
                  )}

                  {currentTab === 'police' && (
                    <PoliceDashboardModule
                      junctions={junctions}
                      selectedJunction={selectedJunction}
                      setSelectedJunction={setSelectedJunction}
                      lang={lang}
                      isEmergencyActive={isEmergencyActive}
                      setIsEmergencyActive={(act) => {
                        setIsEmergencyActive(act);
                        if (act) soundFx.playSiren();
                      }}
                    />
                  )}

                  {currentTab === 'trust' && (
                    <TrustFailSafeModule
                      lang={lang}
                      cameraFailed={cameraFailed}
                      setCameraFailed={setCameraFailed}
                    />
                  )}

                  {currentTab === 'pitch' && (
                    <PitchDeckModule lang={lang} />
                  )}
                </>
              )}
            </ErrorBoundary>
          </div>

          {/* Bottom Floating HUD Bar */}
          <div className="flex justify-between items-end z-10 pt-4 mt-4">
            {/* Bottom Left Weather & GPS Widget */}
            <div className="hidden sm:block">
              <ErrorBoundary>
                <WeatherImpactWidget selectedJunction={selectedJunction} />
              </ErrorBoundary>
            </div>

            {/* Bottom Right Critical Alerts Widget */}
            <div className="hidden md:block">
              <ErrorBoundary>
                <CriticalAlertsWidget isEmergencyActive={isEmergencyActive} />
              </ErrorBoundary>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
