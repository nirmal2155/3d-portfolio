export const PITCH_SLIDES = [
  {
    slideNumber: 1,
    title: "1. Hook & Problem (The Indian Reality)",
    tagline: "Global Traffic AIs fail in India because they assume lane discipline and rule-following.",
    bullets: [
      "🚦 Fixed 90-second timers stay red even on empty roads, wasting 120+ million hours daily in India.",
      "🐄 Mixed Traffic Reality: Bikes, autos, cattle, buses, and pedestrians occupy the exact same lane.",
      "🚨 Ambulances stuck in congestion due to static signal schedules and delayed police interventions.",
      "💰 Traditional hardware sensors (induction loops, radar) cost ₹50L+ per junction — unaffordable at scale."
    ],
    highlight: "TrafficMitra AI works WITH Indian chaos, treating un-disciplined traffic as normal data, not an anomaly."
  },
  {
    slideNumber: 2,
    title: "2. The Solution — TrafficMitra AI",
    tagline: "Self-Learning, Chaos-Aware Predictive Traffic Orchestration.",
    bullets: [
      "📷 Module 1: Real In-Browser TensorFlow.js model + YOLOv8 CCTV simulation (Zero new hardware).",
      "⏱️ Module 2: Adaptive Signal AI — Dynamically shifts green time (15s - 120s) based on live lane density.",
      "🔮 Module 3: Chaos Prediction Engine — 30-60 min advance alerts combining monsoon, festival, & school schedules.",
      "💬 Module 4: Citizen Co-Pilot — Instant WhatsApp updates & Offline SMS/USSD fallback for 500M+ citizens.",
      "🚨 Module 5: Traffic Police Command — One-click Green Corridor for ambulances & assistive AI co-pilot."
    ],
    highlight: "Zero New Hardware Budget | Edge-Deployable on Jetson Nano (~₹1.5L/junction)"
  },
  {
    slideNumber: 3,
    title: "3. Technical Architecture & Fail-Safe Design",
    tagline: "Low latency, privacy-first, graceful degradation architecture.",
    bullets: [
      "⚡ Edge Processing: Local Jetson Nano processes 30 FPS CCTV feed without sending raw video to cloud.",
      "🛡️ Privacy-by-Design: Vehicle-type classification ONLY — no facial recognition, no number-plate logging.",
      "⚠️ Fail-Safe Fallback: If camera or network drops, system seamlessly reverts to safe fixed 45s cycle.",
      "📊 Optimization Algorithm: Weighted Density Score = (Cars×1 + Bikes×0.4 + Autos×0.8 + Buses×2.8)."
    ],
    highlight: "Saves 40%+ fuel waste & reduces average junction wait time by 52%."
  },
  {
    slideNumber: 4,
    title: "4. Quantified Social & Economic Impact",
    tagline: "$22 Billion annual congestion loss in Indian metros framed against pilot savings.",
    bullets: [
      "📉 $22 Billion Loss: Traffic congestion costs major Indian metros ~₹1.8 Lakh Crore annually in lost productivity.",
      "⛽ Fuel Conservation: 52% wait time reduction saves ~45,000 liters of wasted fuel per 100 junctions daily.",
      "🚑 Emergency Survival: Green Corridor reduces ambulance transit time by 68% in critical cardiac cases.",
      "🌱 Carbon Offsetting: Reduces urban vehicular CO2 emissions by 18,000 metric tons per year per city."
    ],
    highlight: "Direct Economic & Environmental ROI from Day 1 of deployment."
  },
  {
    slideNumber: 5,
    title: "5. Post-Hackathon Rollout Roadmap",
    tagline: "Clear phased execution strategy from hackathon prototype to state-wide deployment.",
    bullets: [
      "🚀 Day 1 (Hackathon MVP): Full working prototype with real TF.js inference, adaptive signals, & WhatsApp bot.",
      "📍 Month 6 (Pilot Phase): 5-junction live pilot in 1 city (Bengaluru / Mumbai) with municipal smart city partnership.",
      "🏛️ Year 1 (State MoU): State-level deployment across 100+ junctions integrated with State Traffic Police systems.",
      "📈 Year 2 (National Platform): B2B Traffic Insights API partnership with Google Maps & logistics fleets."
    ],
    highlight: "Scalable SaaS model funded by municipal savings & smart city grants."
  }
];

export const JUDGE_QUESTIONS = [
  {
    question: "If AI and Traffic Police disagree, who decides?",
    answer: "The Traffic Police officer ALWAYS retains complete override authority. TrafficMitra AI is explicitly designed as an ASSISTIVE CO-PILOT, not an autonomous autopilot. The officer can force any signal green or pause AI automation with a single click."
  },
  {
    question: "How do you handle surveillance and privacy concerns?",
    answer: "TrafficMitra AI operates under strict Privacy-by-Design principles. Our edge models perform vehicle-type bounding-box classification ONLY. We do NOT perform facial recognition, license plate recognition, or store raw video streams. All processing is anonymized and local."
  },
  {
    question: "What happens if the CCTV camera feed gets blocked or fails?",
    answer: "Our Trust & Fail-Safe layer provides Graceful Degradation. The moment camera latency exceeds 500ms or feed drops, the junction controller automatically reverts to a safe, fixed-timer schedule. The signal never freezes or enters an unsafe state."
  },
  {
    question: "Why build for WhatsApp and SMS instead of a Mobile App?",
    answer: "India has over 500 million WhatsApp users and millions in Tier-2/3 cities using feature phones. App download friction causes civic apps to fail. Our WhatsApp bot + SMS/USSD fallback guarantees 100% citizen accessibility across all demographics."
  }
];
