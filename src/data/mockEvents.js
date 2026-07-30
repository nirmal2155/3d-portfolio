export const MOCK_EVENTS = [
  {
    id: "evt-101",
    title: "Ganesh Visarjan Procession",
    category: "Festival",
    severity: "CRITICAL",
    predictedDelayMin: 45,
    location: "Dadar T.T. Circle & Girgaon Chowpatty",
    timeWindow: "16:00 - 22:00 IST",
    impactScore: 92,
    recommendedAction: "Activate Green Corridor for West Arm, divert heavy vehicles to Eastern Express Highway",
    status: "Active Alert"
  },
  {
    id: "evt-102",
    title: "Heavy Monsoon Downpour Risk",
    category: "Weather",
    severity: "HIGH",
    predictedDelayMin: 30,
    location: "Silk Board Flyover Underpass, Bengaluru",
    timeWindow: "18:30 - 20:30 IST",
    impactScore: 78,
    recommendedAction: "Extend East-West Green cycles by 25% due to waterlogging speed reduction",
    status: "Predicted (In 35 mins)"
  },
  {
    id: "evt-103",
    title: "Tech Park Shift Discharge",
    category: "Routine Traffic",
    severity: "MEDIUM",
    predictedDelayMin: 20,
    location: "Cyber Towers, Hyderabad",
    timeWindow: "17:30 - 19:30 IST",
    impactScore: 65,
    recommendedAction: "Prioritize North-East arms output flow to ORR expressway",
    status: "Active Routine"
  },
  {
    id: "evt-104",
    title: "VIP Convoy Movement (PM Route)",
    category: "VIP Movement",
    severity: "CRITICAL",
    predictedDelayMin: 40,
    location: "Connaught Place Janpath Arterial, New Delhi",
    timeWindow: "19:15 - 19:45 IST",
    impactScore: 88,
    recommendedAction: "Pre-emptively stagger Janpath signal duration and divert non-essential traffic",
    status: "Scheduled (In 15 mins)"
  }
];

export const HISTORICAL_HOURLY_DATA = [
  { time: "06:00", traditionalWaitSec: 35, aiWaitSec: 18, congestion: 20 },
  { time: "08:00", traditionalWaitSec: 95, aiWaitSec: 42, congestion: 75 },
  { time: "10:00", traditionalWaitSec: 140, aiWaitSec: 62, congestion: 90 },
  { time: "12:00", traditionalWaitSec: 80, aiWaitSec: 38, congestion: 55 },
  { time: "14:00", traditionalWaitSec: 70, aiWaitSec: 32, congestion: 48 },
  { time: "16:00", traditionalWaitSec: 110, aiWaitSec: 50, congestion: 80 },
  { time: "18:00", traditionalWaitSec: 165, aiWaitSec: 68, congestion: 95 },
  { time: "20:00", traditionalWaitSec: 120, aiWaitSec: 52, congestion: 82 },
  { time: "22:00", traditionalWaitSec: 45, aiWaitSec: 20, congestion: 30 }
];
