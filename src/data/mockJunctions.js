export const MOCK_JUNCTIONS = [
  {
    id: "junc-01",
    name: "Silk Board Junction",
    city: "Bengaluru",
    state: "Karnataka",
    coordinates: { lat: 12.9177, lng: 77.6238 },
    cctvId: "CAM-BLR-104",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #42",
    status: "Heavy",
    congestionIndex: 84,
    avgWaitTimeSec: 142, // Traditional wait time
    aiWaitTimeSec: 64,  // TrafficMitra AI wait time
    timeSavedPercent: 55,
    arms: [
      {
        id: "north",
        name: "North (Hosur Rd / Electronic City)",
        vehicles: { car: 18, bike: 42, auto: 14, bus: 4, truck: 2, pedestrian: 12, cattle: 0, ambulance: 0 },
        densityScore: 88,
        lightState: "GREEN",
        timeRemainingSec: 42,
        maxGreenSec: 90,
        minGreenSec: 20
      },
      {
        id: "south",
        name: "South (BTM Layout / Bannerghatta)",
        vehicles: { car: 12, bike: 30, auto: 10, bus: 2, truck: 1, pedestrian: 8, cattle: 1, ambulance: 0 },
        densityScore: 62,
        lightState: "RED",
        timeRemainingSec: 42,
        maxGreenSec: 60,
        minGreenSec: 15
      },
      {
        id: "east",
        name: "East (HSR Layout / Sarjapur)",
        vehicles: { car: 15, bike: 35, auto: 12, bus: 3, truck: 0, pedestrian: 15, cattle: 0, ambulance: 0 },
        densityScore: 74,
        lightState: "RED",
        timeRemainingSec: 84,
        maxGreenSec: 75,
        minGreenSec: 15
      },
      {
        id: "west",
        name: "West (Koramangala 100ft Rd)",
        vehicles: { car: 9, bike: 22, auto: 8, bus: 1, truck: 0, pedestrian: 5, cattle: 0, ambulance: 0 },
        densityScore: 45,
        lightState: "RED",
        timeRemainingSec: 126,
        maxGreenSec: 45,
        minGreenSec: 15
      }
    ]
  },
  {
    id: "junc-02",
    name: "Dadar T.T. Circle",
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.0178, lng: 72.8478 },
    cctvId: "CAM-MUM-089",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Orin Nano #12",
    status: "Critical",
    congestionIndex: 91,
    avgWaitTimeSec: 165,
    aiWaitTimeSec: 72,
    timeSavedPercent: 56,
    arms: [
      {
        id: "north",
        name: "North (Dr. Ambedkar Rd / Sion)",
        vehicles: { car: 22, bike: 48, auto: 20, bus: 6, truck: 3, pedestrian: 25, cattle: 0, ambulance: 0 },
        densityScore: 95,
        lightState: "GREEN",
        timeRemainingSec: 55,
        maxGreenSec: 90,
        minGreenSec: 25
      },
      {
        id: "south",
        name: "South (Parel / Lalbaug)",
        vehicles: { car: 16, bike: 38, auto: 18, bus: 4, truck: 1, pedestrian: 20, cattle: 0, ambulance: 0 },
        densityScore: 82,
        lightState: "RED",
        timeRemainingSec: 55,
        maxGreenSec: 75,
        minGreenSec: 20
      },
      {
        id: "east",
        name: "East (Wadala Flyover / Harbour)",
        vehicles: { car: 10, bike: 25, auto: 12, bus: 2, truck: 2, pedestrian: 10, cattle: 0, ambulance: 0 },
        densityScore: 58,
        lightState: "RED",
        timeRemainingSec: 110,
        maxGreenSec: 50,
        minGreenSec: 15
      },
      {
        id: "west",
        name: "West (Dadar Station / Ranade Rd)",
        vehicles: { car: 14, bike: 32, auto: 15, bus: 3, truck: 0, pedestrian: 40, cattle: 0, ambulance: 0 },
        densityScore: 88,
        lightState: "RED",
        timeRemainingSec: 160,
        maxGreenSec: 80,
        minGreenSec: 20
      }
    ]
  },
  {
    id: "junc-03",
    name: "Connaught Place Outer Ring",
    city: "New Delhi",
    state: "Delhi NCR",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    cctvId: "CAM-DEL-201",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #88",
    status: "Normal",
    congestionIndex: 42,
    avgWaitTimeSec: 90,
    aiWaitTimeSec: 42,
    timeSavedPercent: 53,
    arms: [
      {
        id: "north",
        name: "North (Barakhamba Road)",
        vehicles: { car: 10, bike: 15, auto: 6, bus: 2, truck: 0, pedestrian: 8, cattle: 0, ambulance: 0 },
        densityScore: 40,
        lightState: "GREEN",
        timeRemainingSec: 25,
        maxGreenSec: 60,
        minGreenSec: 15
      },
      {
        id: "south",
        name: "South (Janpath)",
        vehicles: { car: 8, bike: 12, auto: 5, bus: 1, truck: 0, pedestrian: 6, cattle: 0, ambulance: 0 },
        densityScore: 32,
        lightState: "RED",
        timeRemainingSec: 25,
        maxGreenSec: 45,
        minGreenSec: 15
      },
      {
        id: "east",
        name: "East (Kasturba Gandhi Marg)",
        vehicles: { car: 11, bike: 18, auto: 8, bus: 2, truck: 0, pedestrian: 10, cattle: 0, ambulance: 0 },
        densityScore: 48,
        lightState: "RED",
        timeRemainingSec: 50,
        maxGreenSec: 50,
        minGreenSec: 15
      },
      {
        id: "west",
        name: "West (Parliament Street)",
        vehicles: { car: 6, bike: 10, auto: 4, bus: 1, truck: 0, pedestrian: 4, cattle: 0, ambulance: 0 },
        densityScore: 28,
        lightState: "RED",
        timeRemainingSec: 75,
        maxGreenSec: 40,
        minGreenSec: 15
      }
    ]
  },
  {
    id: "junc-04",
    name: "Cyber Towers Junction",
    city: "Hyderabad",
    state: "Telangana",
    coordinates: { lat: 17.4504, lng: 78.3808 },
    cctvId: "CAM-HYD-055",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #31",
    status: "Heavy",
    congestionIndex: 78,
    avgWaitTimeSec: 130,
    aiWaitTimeSec: 58,
    timeSavedPercent: 55,
    arms: [
      {
        id: "north",
        name: "North (HITEC City Flyover)",
        vehicles: { car: 20, bike: 40, auto: 12, bus: 3, truck: 1, pedestrian: 5, cattle: 0, ambulance: 0 },
        densityScore: 84,
        lightState: "GREEN",
        timeRemainingSec: 38,
        maxGreenSec: 85,
        minGreenSec: 20
      },
      {
        id: "south",
        name: "South (Madhapur Main Rd)",
        vehicles: { car: 14, bike: 32, auto: 15, bus: 2, truck: 0, pedestrian: 12, cattle: 0, ambulance: 0 },
        densityScore: 72,
        lightState: "RED",
        timeRemainingSec: 38,
        maxGreenSec: 70,
        minGreenSec: 20
      },
      {
        id: "east",
        name: "East (Kondapur / Gachibowli)",
        vehicles: { car: 18, bike: 35, auto: 10, bus: 4, truck: 1, pedestrian: 8, cattle: 0, ambulance: 0 },
        densityScore: 80,
        lightState: "RED",
        timeRemainingSec: 76,
        maxGreenSec: 75,
        minGreenSec: 20
      },
      {
        id: "west",
        name: "West (Kukatpally Rd)",
        vehicles: { car: 12, bike: 25, auto: 8, bus: 2, truck: 1, pedestrian: 6, cattle: 0, ambulance: 0 },
        densityScore: 56,
        lightState: "RED",
        timeRemainingSec: 114,
        maxGreenSec: 55,
        minGreenSec: 15
      }
    ]
  }
];
