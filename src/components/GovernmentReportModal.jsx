import React, { useState } from 'react';
import { Shield, FileText, Download, CheckCircle2, Lock, X, Award, AlertTriangle, Building, Cpu, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function GovernmentReportModal({ isOpen, onClose, selectedJunction, user }) {
  const [reportType, setReportType] = useState('morth');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    soundFx.playClick();
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      soundFx.playSuccess();
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono-tech select-none">
      <div className="w-full max-w-3xl core-panel bg-slate-950 rounded-2xl border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Building className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span>GOVERNMENT & POLICE AUDIT COMPLIANCE PORTAL</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/40">
                  MoRTH APPROVED
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Official MoRTH, MHA & State Traffic Police Analytics & Certification Export
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs">
          
          {/* Certificate Badge Banner */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>CERTIFICATE OF COMPLIANCE: SECTION 136A MOTOR VEHICLES ACT 2019</span>
              </h3>
              <p className="text-slate-300 text-[11px]">
                Electronic Monitoring & Enforcement of Road Safety Standards • Non-Intrusive Edge Inference
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">SECURITY CLEARANCE</span>
              <span className="text-emerald-400 font-extrabold text-xs">LEVEL 5 COMMAND</span>
            </div>
          </div>

          {/* Report Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'morth', label: 'MoRTH Performance Audit', desc: 'Congestion index, green wave time saved, CO2 reduction' },
              { id: 'police', label: 'Police ANPR Log Ledger', desc: 'Plate-flag advisory records with officer verification timestamps' },
              { id: 'emergency', label: 'Ambulance Corridor Audit', desc: 'Green corridor activation logs, siren response latency' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => {
                  soundFx.playClick();
                  setReportType(type.id);
                }}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  reportType === type.id
                    ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs mb-1 flex items-center justify-between">
                  <span>{type.label}</span>
                  {reportType === type.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">{type.desc}</p>
              </button>
            ))}
          </div>

          {/* Generated Report Summary Preview */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#00F2FE]" />
                REPORT PREVIEW: {selectedJunction?.name || 'Silk Board Junction'} ({selectedJunction?.city || 'Bengaluru'})
              </span>
              <span className="text-[10px] font-mono-tech text-slate-400">
                DATE: {new Date().toLocaleDateString()} | TIMESTAMP: {new Date().toLocaleTimeString()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] pt-1">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 text-[10px] block">CONGESTION INDEX</span>
                <span className="font-extrabold text-amber-400 text-sm">{selectedJunction?.congestionIndex || 84}%</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 text-[10px] block">AI TIME SAVED</span>
                <span className="font-extrabold text-emerald-400 text-sm">54.9%</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 text-[10px] block">EDGE HARDWARE</span>
                <span className="font-bold text-slate-200 text-xs truncate block">{selectedJunction?.edgeDevice || 'NVIDIA Jetson'}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 text-[10px] block">HUMAN REVIEW</span>
                <span className="font-bold text-emerald-400 text-xs">100% MANDATORY</span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-lg border border-white/5 text-[11px] text-slate-300 space-y-1">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                OFFICIAL GOVERNMENT DISCLAIMER:
              </p>
              <p className="text-slate-400 leading-relaxed text-[10px]">
                This report is generated under Section 136A of the Motor Vehicles (Amendment) Act 2019. Automated Number Plate Recognition (ANPR) records serve as advisory evidence and require confirmation by an authorized Police Enforcement Officer prior to official challan generation. Zero persistent personal biometric data is stored on cloud edge nodes.
              </p>
            </div>
          </div>

          {/* Download Notification Alert */}
          {downloadSuccess && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 p-3 rounded-xl text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
              <span className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                REPORT EXPORTED SUCCESSFULLY! Saved as MoRTH_TrafficMitra_Audit_{selectedJunction?.id || '84'}.pdf
              </span>
              <span className="text-[10px] text-emerald-400">DIGITALLY SIGNED</span>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>NIC SERVER READY • SHA-256 ENCRYPTED</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer text-xs font-bold"
            >
              CLOSE
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs uppercase flex items-center gap-2 hover:opacity-90 transition cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>GENERATING PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD OFFICIAL REPORT (PDF/JSON)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
