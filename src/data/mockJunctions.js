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
    avgWaitTimeSec: 142,
    aiWaitTimeSec: 64,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (Hosur Rd)", vehicles: { car: 18, bike: 42, auto: 14, bus: 4, truck: 2, pedestrian: 12 }, densityScore: 88, lightState: "GREEN", timeRemainingSec: 42 },
      { id: "south", name: "South (BTM Layout)", vehicles: { car: 12, bike: 30, auto: 10, bus: 2, truck: 1, pedestrian: 8 }, densityScore: 62, lightState: "RED", timeRemainingSec: 42 }
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
      { id: "north", name: "North (Sion Circle)", vehicles: { car: 22, bike: 48, auto: 20, bus: 6, truck: 3, pedestrian: 25 }, densityScore: 95, lightState: "GREEN", timeRemainingSec: 55 }
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
      { id: "north", name: "North (Barakhamba Road)", vehicles: { car: 10, bike: 15, auto: 6, bus: 2, truck: 0, pedestrian: 8 }, densityScore: 40, lightState: "GREEN", timeRemainingSec: 25 }
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
      { id: "north", name: "North (HITEC City)", vehicles: { car: 20, bike: 40, auto: 12, bus: 3, truck: 1, pedestrian: 5 }, densityScore: 84, lightState: "GREEN", timeRemainingSec: 38 }
    ]
  },
  {
    id: "junc-05",
    name: "Swargate Chowk / Hinjewadi IT Park",
    city: "Pune",
    state: "Maharashtra",
    coordinates: { lat: 18.5018, lng: 73.8586 },
    cctvId: "CAM-PUN-302",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #19",
    status: "Heavy",
    congestionIndex: 82,
    avgWaitTimeSec: 138,
    aiWaitTimeSec: 61,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (Hinjewadi IT Expressway)", vehicles: { car: 24, bike: 52, auto: 16, bus: 5, truck: 2, pedestrian: 14 }, densityScore: 86, lightState: "GREEN", timeRemainingSec: 40 }
    ]
  },
  {
    id: "junc-06",
    name: "SG Highway / ISCON Cross Road",
    city: "Ahmedabad",
    state: "Gujarat",
    coordinates: { lat: 23.0276, lng: 72.5073 },
    cctvId: "CAM-AMD-114",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Orin Nano #07",
    status: "Moderate",
    congestionIndex: 68,
    avgWaitTimeSec: 110,
    aiWaitTimeSec: 49,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (SG Highway / Gandhinagar)", vehicles: { car: 16, bike: 34, auto: 10, bus: 3, truck: 1, pedestrian: 6 }, densityScore: 70, lightState: "GREEN", timeRemainingSec: 35 }
    ]
  },
  {
    id: "junc-07",
    name: "Esplanade / Park Street Crossing",
    city: "Kolkata",
    state: "West Bengal",
    coordinates: { lat: 22.5644, lng: 88.3517 },
    cctvId: "CAM-KOL-405",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #64",
    status: "Heavy",
    congestionIndex: 87,
    avgWaitTimeSec: 150,
    aiWaitTimeSec: 68,
    timeSavedPercent: 54,
    arms: [
      { id: "north", name: "North (Chowringhee Road)", vehicles: { car: 19, bike: 38, auto: 22, bus: 7, truck: 1, pedestrian: 30 }, densityScore: 90, lightState: "GREEN", timeRemainingSec: 48 }
    ]
  },
  {
    id: "junc-08",
    name: "Anna Salai / Kathipara Junction",
    city: "Chennai",
    state: "Tamil Nadu",
    coordinates: { lat: 13.0067, lng: 80.2021 },
    cctvId: "CAM-CHE-501",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #22",
    status: "Heavy",
    congestionIndex: 79,
    avgWaitTimeSec: 132,
    aiWaitTimeSec: 59,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (Guindy Flyover)", vehicles: { car: 17, bike: 41, auto: 13, bus: 4, truck: 2, pedestrian: 10 }, densityScore: 81, lightState: "GREEN", timeRemainingSec: 36 }
    ]
  },
  {
    id: "junc-09",
    name: "MI Road / Ajmeri Gate",
    city: "Jaipur",
    state: "Rajasthan",
    coordinates: { lat: 26.9157, lng: 75.8153 },
    cctvId: "CAM-JAI-108",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #15",
    status: "Moderate",
    congestionIndex: 64,
    avgWaitTimeSec: 98,
    aiWaitTimeSec: 44,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (Pink City Wall)", vehicles: { car: 12, bike: 28, auto: 14, bus: 2, truck: 0, pedestrian: 18 }, densityScore: 66, lightState: "GREEN", timeRemainingSec: 30 }
    ]
  },
  {
    id: "junc-10",
    name: "Ring Road / Majura Gate",
    city: "Surat",
    state: "Gujarat",
    coordinates: { lat: 21.1702, lng: 72.8311 },
    cctvId: "CAM-SUR-209",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #53",
    status: "Heavy",
    congestionIndex: 80,
    avgWaitTimeSec: 135,
    aiWaitTimeSec: 60,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (Textile Market Hub)", vehicles: { car: 21, bike: 45, auto: 18, bus: 3, truck: 2, pedestrian: 15 }, densityScore: 82, lightState: "GREEN", timeRemainingSec: 40 }
    ]
  },
  {
    id: "junc-11",
    name: "Hazratganj Chouraha",
    city: "Lucknow",
    state: "Uttar Pradesh",
    coordinates: { lat: 26.8467, lng: 80.9462 },
    cctvId: "CAM-LKO-307",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #77",
    status: "Moderate",
    congestionIndex: 71,
    avgWaitTimeSec: 115,
    aiWaitTimeSec: 51,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (Vidhan Sabha Marg)", vehicles: { car: 15, bike: 30, auto: 12, bus: 3, truck: 0, pedestrian: 20 }, densityScore: 73, lightState: "GREEN", timeRemainingSec: 32 }
    ]
  },
  {
    id: "junc-12",
    name: "Vijay Nagar Square",
    city: "Indore",
    state: "Madhya Pradesh",
    coordinates: { lat: 22.7533, lng: 75.8937 },
    cctvId: "CAM-IND-112",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #91",
    status: "Moderate",
    congestionIndex: 62,
    avgWaitTimeSec: 92,
    aiWaitTimeSec: 41,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (AB Road Expressway)", vehicles: { car: 14, bike: 26, auto: 8, bus: 2, truck: 1, pedestrian: 7 }, densityScore: 64, lightState: "GREEN", timeRemainingSec: 28 }
    ]
  },
  {
    id: "junc-13",
    name: "Dak Bungalow Chouraha",
    city: "Patna",
    state: "Bihar",
    coordinates: { lat: 25.6093, lng: 85.1376 },
    cctvId: "CAM-PAT-411",
    fps: 30,
    edgeDevice: "NVIDIA Jetson Nano #29",
    status: "Heavy",
    congestionIndex: 85,
    avgWaitTimeSec: 145,
    aiWaitTimeSec: 65,
    timeSavedPercent: 55,
    arms: [
      { id: "north", name: "North (Frazer Road)", vehicles: { car: 16, bike: 44, auto: 25, bus: 4, truck: 1, pedestrian: 22 }, densityScore: 87, lightState: "GREEN", timeRemainingSec: 45 }
    ]
  }
];
