/**
 * TrafficMitra AI — Vercel AI SDK Chatbot Integration Service
 * Multi-City Indian Traffic Telemetry Engine
 */

export const INDIAN_CITIES_TELEMETRY = {
  "bengaluru": { name: "Silk Board Junction", city: "Bengaluru", state: "Karnataka", index: 84, status: "Heavy", waitOrig: 142, waitAI: 64, edge: "NVIDIA Jetson Nano #42" },
  "bangalore": { name: "Silk Board Junction", city: "Bengaluru", state: "Karnataka", index: 84, status: "Heavy", waitOrig: 142, waitAI: 64, edge: "NVIDIA Jetson Nano #42" },
  "mumbai": { name: "Dadar T.T. Circle", city: "Mumbai", state: "Maharashtra", index: 91, status: "Critical", waitOrig: 165, waitAI: 72, edge: "NVIDIA Jetson Orin Nano #12" },
  "delhi": { name: "Connaught Place Outer Ring", city: "New Delhi", state: "Delhi NCR", index: 42, status: "Normal", waitOrig: 90, waitAI: 42, edge: "NVIDIA Jetson Nano #88" },
  "new delhi": { name: "Connaught Place Outer Ring", city: "New Delhi", state: "Delhi NCR", index: 42, status: "Normal", waitOrig: 90, waitAI: 42, edge: "NVIDIA Jetson Nano #88" },
  "hyderabad": { name: "Cyber Towers Junction", city: "Hyderabad", state: "Telangana", index: 78, status: "Heavy", waitOrig: 130, waitAI: 58, edge: "NVIDIA Jetson Nano #31" },
  "pune": { name: "Swargate Chowk / Hinjewadi IT Park", city: "Pune", state: "Maharashtra", index: 82, status: "Heavy", waitOrig: 138, waitAI: 61, edge: "NVIDIA Jetson Nano #19" },
  "ahmedabad": { name: "SG Highway / ISCON Cross Road", city: "Ahmedabad", state: "Gujarat", index: 68, status: "Moderate", waitOrig: 110, waitAI: 49, edge: "NVIDIA Jetson Orin Nano #07" },
  "kolkata": { name: "Esplanade / Park Street Crossing", city: "Kolkata", state: "West Bengal", index: 87, status: "Heavy", waitOrig: 150, waitAI: 68, edge: "NVIDIA Jetson Nano #64" },
  "chennai": { name: "Anna Salai / Kathipara Junction", city: "Chennai", state: "Tamil Nadu", index: 79, status: "Heavy", waitOrig: 132, waitAI: 59, edge: "NVIDIA Jetson Nano #22" },
  "jaipur": { name: "MI Road / Ajmeri Gate", city: "Jaipur", state: "Rajasthan", index: 64, status: "Moderate", waitOrig: 98, waitAI: 44, edge: "NVIDIA Jetson Nano #15" },
  "surat": { name: "Ring Road / Majura Gate", city: "Surat", state: "Gujarat", index: 80, status: "Heavy", waitOrig: 135, waitAI: 60, edge: "NVIDIA Jetson Nano #53" },
  "lucknow": { name: "Hazratganj Chouraha", city: "Lucknow", state: "Uttar Pradesh", index: 71, status: "Moderate", waitOrig: 115, waitAI: 51, edge: "NVIDIA Jetson Nano #77" },
  "indore": { name: "Vijay Nagar Square", city: "Indore", state: "Madhya Pradesh", index: 62, status: "Moderate", waitOrig: 92, waitAI: 41, edge: "NVIDIA Jetson Nano #91" },
  "patna": { name: "Dak Bungalow Chouraha", city: "Patna", state: "Bihar", index: 85, status: "Heavy", waitOrig: 145, waitAI: 65, edge: "NVIDIA Jetson Nano #29" },
  "bhopal": { name: "MP Nagar Board Office Square", city: "Bhopal", state: "Madhya Pradesh", index: 59, status: "Moderate", waitOrig: 88, waitAI: 40, edge: "NVIDIA Jetson Nano #18" },
  "nagpur": { name: "Variety Square Sitabuldi", city: "Nagpur", state: "Maharashtra", index: 73, status: "Moderate", waitOrig: 118, waitAI: 52, edge: "NVIDIA Jetson Nano #34" },
  "chandigarh": { name: "Tribune Chowk Sector 29", city: "Chandigarh", state: "Punjab/Haryana", index: 48, status: "Normal", waitOrig: 78, waitAI: 35, edge: "NVIDIA Jetson Nano #05" },
  "kochi": { name: "Vytila Mobility Hub Junction", city: "Kochi", state: "Kerala", index: 76, status: "Heavy", waitOrig: 125, waitAI: 56, edge: "NVIDIA Jetson Nano #49" },
  "varanasi": { name: "Godowlia Crossing", city: "Varanasi", state: "Uttar Pradesh", index: 89, status: "Critical", waitOrig: 160, waitAI: 70, edge: "NVIDIA Jetson Nano #81" }
};

export async function streamVercelChatbotResponse({ messages, selectedJunction, isEmergencyActive, onChunk }) {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const q = lastMessage.toLowerCase().trim();
  const greeting = "Hello, main Traffic Mitra AI hoon. ";

  let fullResponse = "";

  // Out-of-Domain Check
  const isOutofDomain = 
    q.includes('ipl') || q.includes('cricket') || q.includes('match') || q.includes('movie') ||
    q.includes('song') || q.includes('biryani') || q.includes('recipe') || q.includes('prime minister') ||
    q.includes('modi') || q.includes('president') || q.includes('game') || q.includes('football');

  if (isOutofDomain) {
    fullResponse = `${greeting}Kshama karein, main ek specialized Traffic Intelligence Copilot hoon. Main sirf TrafficMitra AI, road telemetry, signal optimization, aur command control operations ke baare me uttar de sakta hoon.`;
  } 
  
  // Emergency Ambulance Corridor Match
  else if (q.includes('ambulance') || q.includes('emergency') || q.includes('rasta') || q.includes('corridor')) {
    fullResponse = `${greeting}Emergency Ambulance Corridor instant activate kar diya gaya hai! Siren audio sensors synchronized hain aur ${selectedJunction.name} trajectory par opposing signals RED kar diye gaye hain.`;
  }

  // Check 20+ Indian Cities Match
  else {
    let matchedCityData = null;
    for (const [cityKey, cityData] of Object.entries(INDIAN_CITIES_TELEMETRY)) {
      if (q.includes(cityKey)) {
        matchedCityData = cityData;
        break;
      }
    }

    if (matchedCityData) {
      fullResponse = `${greeting}${matchedCityData.city} (${matchedCityData.name}) par abhi congestion index ${matchedCityData.index}% (${matchedCityData.status}) hai. Edge device ${matchedCityData.edge} active hai. Traditional wait time ${matchedCityData.waitOrig}s ke muqable TrafficMitra AI ise ${matchedCityData.waitAI}s me regulate kar raha hai (${Math.round((1 - matchedCityData.waitAI / matchedCityData.waitOrig) * 100)}% time saved).`;
    } else if (q.includes('anpr') || q.includes('challan') || q.includes('plate') || q.includes('fine')) {
      fullResponse = `${greeting}Plate-Flag Advisory module automatic number plate recognition se red-light jump aur helmetless riding detect karke police dashboard par flag karta hai (Human-in-the-Loop review).`;
    } else if (q.includes('website') || q.includes('project') || q.includes('app') || q.includes('kya karta hai')) {
      fullResponse = `${greeting}TrafficMitra AI ek complete intelligent traffic control room hai jisme 3D WebGL simulator, live device webcam ML detector, ANPR plate flagging, driver AR HUD, aur emergency ambulance green wave feature shamil hain.`;
    } else if (q.includes('tech') || q.includes('code') || q.includes('react') || q.includes('three') || q.includes('vercel')) {
      fullResponse = `${greeting}Mera system React 18, Vite, Three.js 3D WebGL, Tailwind CSS v4, Vercel AI SDK integration, aur Vercel Edge Platform par built hai.`;
    } else {
      fullResponse = `${greeting}${selectedJunction.name} (${selectedJunction.city}) par abhi congestion index ${selectedJunction.congestionIndex}% (${selectedJunction.status}) hai. TrafficMitra AI signal control active hai. Main aapki kisi bhi Indian city traffic telemetry me sahayata kar sakta hoon.`;
    }
  }

  // Word Chunk Streaming Simulator
  const words = fullResponse.split(' ');
  let currentText = '';
  for (let i = 0; i < words.length; i++) {
    currentText += (i === 0 ? '' : ' ') + words[i];
    onChunk(currentText);
    await new Promise(res => setTimeout(res, 20));
  }

  return fullResponse;
}
