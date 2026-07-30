/**
 * TrafficMitra AI — Vercel AI SDK Chatbot Integration Service
 * Inspired by https://github.com/vercel/chatbot
 */

export const TRAFFICMITRA_SYSTEM_PROMPT = `
You are TrafficMitra AI — an advanced, intelligent Traffic Control Room & Municipal Infrastructure Copilot for India.
Your mission is to assist authorized police officers and municipal engineers in optimizing signal timings, clearing emergency ambulance corridors, monitoring ANPR plate flags, inspecting 3D WebGL junction telemetry, and handling traffic queries.

System Context:
- Active Junctions: Silk Board Junction (Bengaluru, 84% congestion, 64s wait), Dadar T.T. Circle (Mumbai, 91% congestion, 72s wait), Connaught Place (New Delhi, 42% congestion), Cyber Towers (Hyderabad, 78% congestion).
- Features: 3D WebGL junction simulator, client-side TensorFlow.js MobileNet object detector, ANPR plate flagging (human-in-the-loop review), Driver AR HUD cruise speed (38 km/h), Fail-Safe 45-second fixed safety timer fallback.
- Legal & Privacy: Human-in-the-loop enforcement (no auto-fines), IT Act Sec. 66 compliance, zero persistent plate data storage.

Instructions:
1. Always begin responses with "Hello, main Traffic Mitra AI hoon." when speaking in Hindi/Hinglish, or "Hello, I am TrafficMitra AI." when speaking in English.
2. Provide direct, highly accurate, and helpful answers for any question about traffic, website features, tech stack, junctions, or emergency corridors.
3. If asked an out-of-domain question (e.g. sports, IPL, movies, recipes), politely decline: "Hello, main Traffic Mitra AI hoon. Kshama karein, main ek specialized Traffic Intelligence Model hoon..."
`;

/**
 * Simulates a streaming Vercel AI Chatbot completion response for client-side execution.
 * If VITE_GEMINI_API_KEY or OPENAI_API_KEY is present in import.meta.env, it uses live API completion.
 */
export async function streamVercelChatbotResponse({ messages, selectedJunction, isEmergencyActive, onChunk }) {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const q = lastMessage.toLowerCase().trim();

  // Check for live environment API key (optional serverless extension)
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.VITE_OPENAI_API_KEY;

  if (apiKey) {
    try {
      // Live Gemini / OpenAI fetch if key configured
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${TRAFFICMITRA_SYSTEM_PROMPT}\nUser Query: ${lastMessage}` }] }]
        })
      });
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        onChunk(text);
        return text;
      }
    } catch (err) {
      console.warn("Vercel AI SDK API fallback to local NLU engine:", err);
    }
  }

  // High-Speed Built-In Vercel AI Response Synthesizer
  let fullResponse = "";
  const greeting = "Hello, main Traffic Mitra AI hoon. ";

  const isOutofDomain = 
    q.includes('ipl') || q.includes('cricket') || q.includes('match') || q.includes('movie') ||
    q.includes('song') || q.includes('biryani') || q.includes('recipe') || q.includes('prime minister') ||
    q.includes('modi') || q.includes('president') || q.includes('game') || q.includes('football');

  if (isOutofDomain) {
    fullResponse = `${greeting}Kshama karein, main ek specialized Traffic Intelligence Copilot hoon. Main sirf TrafficMitra AI, road telemetry, signal optimization, aur command control operations ke baare me sahi uttar de sakta hoon.`;
  } else if (q.includes('ambulance') || q.includes('emergency') || q.includes('rasta') || q.includes('corridor')) {
    fullResponse = `${greeting}Emergency Ambulance Corridor instant activate kar diya gaya hai! Siren audio sensors synchronized hain aur ${selectedJunction.name} trajectory par opposing signals RED kar diye gaye hain.`;
  } else if (q.includes('silk board') || q.includes('bengaluru') || q.includes('bangalore')) {
    fullResponse = `${greeting}Silk Board Junction (Bengaluru) par abhi congestion index 84% heavy hai. NVIDIA Jetson Nano #42 edge unit active hai. Wait time 142s se ghat kar 64s ho gaya hai.`;
  } else if (q.includes('dadar') || q.includes('mumbai')) {
    fullResponse = `${greeting}Dadar T.T. Circle (Mumbai) par congestion index 91% critical hai. NVIDIA Jetson Orin Nano #12 active hai. AI signal timing ne wait time ko 165s se 72s kar diya hai.`;
  } else if (q.includes('anpr') || q.includes('challan') || q.includes('plate') || q.includes('fine')) {
    fullResponse = `${greeting}Plate-Flag Advisory module automatic number plate recognition se red-light jump aur helmetless riding detect karke police dashboard par flag karta hai (Human-in-the-Loop review).`;
  } else if (q.includes('website') || q.includes('project') || q.includes('app') || q.includes('kya karta hai')) {
    fullResponse = `${greeting}TrafficMitra AI ek complete intelligent traffic control room hai jisme 3D WebGL simulator, live device webcam ML detector, ANPR plate flagging, driver AR HUD, aur emergency ambulance green wave feature shamil hain.`;
  } else if (q.includes('tech') || q.includes('code') || q.includes('react') || q.includes('three') || q.includes('vercel')) {
    fullResponse = `${greeting}Mera system React 18, Vite, Three.js 3D WebGL, Tailwind CSS v4, Vercel AI SDK integration, aur Vercel Edge Platform par built hai.`;
  } else {
    fullResponse = `${greeting}${selectedJunction.name} par abhi congestion index ${selectedJunction.congestionIndex}% (${selectedJunction.status}) hai. AI adaptive signal active hai jo wait time 55% Reduce kar raha hai.`;
  }

  // Simulate Vercel AI SDK streaming chunk effect
  const words = fullResponse.split(' ');
  let currentText = '';
  for (let i = 0; i < words.length; i++) {
    currentText += (i === 0 ? '' : ' ') + words[i];
    onChunk(currentText);
    await new Promise(res => setTimeout(res, 25)); // 25ms word streaming
  }

  return fullResponse;
}
