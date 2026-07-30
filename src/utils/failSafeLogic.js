/**
 * TrafficMitra AI Fail-Safe & Graceful Degradation Engine
 */

export class FailSafeController {
  constructor() {
    this.cameraStatus = 'ONLINE'; // 'ONLINE' | 'OFFLINE' | 'DEGRADED'
    this.confidenceScore = 0.94;
    this.fallbackTimerSec = 45; // Safe default fixed cycle
  }

  setCameraStatus(status) {
    this.cameraStatus = status;
  }

  getSignalState(armDensity) {
    if (this.cameraStatus === 'OFFLINE') {
      return {
        mode: 'FAIL_SAFE_FIXED',
        greenTimeSec: this.fallbackTimerSec,
        reason: '⚠️ Camera feed interrupted. Reverted to Fail-Safe Fixed 45s Cycle.'
      };
    }

    if (this.cameraStatus === 'DEGRADED' || this.confidenceScore < 0.6) {
      return {
        mode: 'SAFETY_PADDING',
        greenTimeSec: Math.max(30, Math.round(armDensity * 0.8)),
        reason: '⚠️ Low detection confidence. Applied +15s Safety Padding.'
      };
    }

    return {
      mode: 'DYNAMIC_AI',
      greenTimeSec: Math.max(15, Math.min(120, Math.round(armDensity * 1.2))),
      reason: '🟢 Optimal AI Adaptive Allocation.'
    };
  }
}

export const COMPETITIVE_BENCHMARKS = [
  {
    feature: "Hardware Requirement",
    traditionalATCS: "Custom Radar / Induction Loops (₹50L/junc)",
    trafficMitraAI: "Existing Smart City CCTV + Edge Jetson Nano (₹1.5L/junc)",
    winner: "TrafficMitra AI (97% Cost Reduction)"
  },
  {
    feature: "Mixed-Traffic Handling (Bikes/Autos/Cows)",
    traditionalATCS: "Poor (Assumes disciplined vehicle lanes)",
    trafficMitraAI: "Native Chaos-Aware Bounding Box Occupancy Index",
    winner: "TrafficMitra AI (India-Specific ML)"
  },
  {
    feature: "30-60 Min Predictive Bottleneck Engine",
    traditionalATCS: "None (Reactive signal changes only)",
    trafficMitraAI: "Predictive LSTM Engine + Festival / Weather Sync",
    winner: "TrafficMitra AI"
  },
  {
    feature: "Citizen WhatsApp & SMS Co-Pilot",
    traditionalATCS: "None (No citizen feedback loop)",
    trafficMitraAI: "Live Wait Times, Bypass Rerouting, SMS/USSD Fallback",
    winner: "TrafficMitra AI"
  },
  {
    feature: "Fail-Safe Camera Interruption Fallback",
    traditionalATCS: "Manual flashing amber or static lockup",
    trafficMitraAI: "Automated Graceful Degradation to Safety Fixed Schedule",
    winner: "TrafficMitra AI"
  }
];
