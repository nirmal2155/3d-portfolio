/**
 * Next-Gen Enterprise Command Center AR HUD Canvas Renderer
 * Features AR bounding boxes with corner brackets, laser scanning beams,
 * distance readouts, compass HUD, and high-contrast telemetry.
 */

const JUNCTION_STREET_CONFIGS = {
  "junc-01": {
    streetName: "HOSUR ROAD / SILK BOARD FLYOVER INTERSECTION",
    city: "BENGALURU, KARNATAKA",
    coordinates: "12.9177° N, 77.6238° E",
    date: "LIVE TELEMETRY STREAM",
    flyover: true
  },
  "junc-02": {
    streetName: "DR. BABASAHEB AMBEDKAR RD / DADAR T.T. CIRCLE",
    city: "MUMBAI, MAHARASHTRA",
    coordinates: "19.0178° N, 72.8478° E",
    date: "LIVE TELEMETRY STREAM",
    flyover: true
  },
  "junc-03": {
    streetName: "CONNAUGHT PLACE OUTER RING / JANPATH",
    city: "NEW DELHI, DELHI NCR",
    coordinates: "28.6315° N, 77.2167° E",
    date: "LIVE TELEMETRY STREAM",
    flyover: false
  },
  "junc-04": {
    streetName: "HITEC CITY MAIN RD / CYBER TOWERS CIRCLE",
    city: "HYDERABAD, TELANGANA",
    coordinates: "17.4504° N, 78.3808° E",
    date: "LIVE TELEMETRY STREAM",
    flyover: true
  }
};

const VEHICLE_COLORS = {
  car: '#38BDF8',        // Sky Blue
  bike: '#34D399',       // Emerald Green
  auto: '#FBBF24',       // Luminous Amber
  bus: '#A78BFA',        // Purple
  truck: '#94A3B8',      // Slate
  pedestrian: '#F43F5E', // Rose
  cattle: '#2DD4BF',     // Teal
  ambulance: '#EF4444'   // Bright Crimson
};

export class YoloSimulator {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.entities = [];
    this.scanLineY = 0;
    this.scanDirection = 1;
    this.initEntities();
  }

  initEntities() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    this.entities = [
      { type: 'car', label: 'Car • 12m away (94%)', x: width * 0.16, y: height * 0.46, w: 115, h: 62, vx: 0.7, vy: 0.2 },
      { type: 'auto', label: 'Auto Rickshaw • 8m away (91%)', x: width * 0.36, y: height * 0.56, w: 80, h: 60, vx: 0.5, vy: 0.3 },
      { type: 'bike', label: 'Scooter • 6m away (88%)', x: width * 0.26, y: height * 0.64, w: 50, h: 42, vx: 0.9, vy: 0.3 },
      { type: 'bike', label: 'Motorcycle • 15m away (93%)', x: width * 0.28, y: height * 0.40, w: 48, h: 40, vx: 0.8, vy: 0.2 },
      { type: 'bus', label: 'BMTC Transit Bus • 25m (96%)', x: width * 0.56, y: height * 0.30, w: 170, h: 88, vx: -0.4, vy: 0.2 },
      { type: 'pedestrian', label: 'Pedestrian • 5m away (85%)', x: width * 0.08, y: height * 0.72, w: 32, h: 54, vx: 0.2, vy: -0.1 },
      { type: 'pedestrian', label: 'Pedestrian • 7m away (89%)', x: width * 0.12, y: height * 0.76, w: 32, h: 54, vx: 0.2, vy: -0.2 },
      { type: 'cattle', label: 'Stray Cow • 18m away (92%)', x: width * 0.74, y: height * 0.60, w: 88, h: 60, vx: -0.1, vy: 0.05 },
      { type: 'car', label: 'Car • 14m away (90%)', x: width * 0.48, y: height * 0.68, w: 105, h: 60, vx: 0.6, vy: -0.2 },
      { type: 'auto', label: 'Auto • 11m away (87%)', x: width * 0.66, y: height * 0.46, w: 72, h: 54, vx: -0.4, vy: 0.2 }
    ];
  }

  setEmergencyVehicle(active) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    if (active) {
      if (!this.entities.some(e => e.type === 'ambulance')) {
        this.entities.unshift({
          type: 'ambulance',
          label: 'ALERT: AMBULANCE SIREN • 10m (99%)',
          x: width * 0.40,
          y: height * 0.60,
          w: 135,
          h: 78,
          vx: 1.4,
          vy: -0.6
        });
      }
    } else {
      this.entities = this.entities.filter(e => e.type !== 'ambulance');
    }
  }

  drawFrame(junctionId, junctionName, isEmergencyActive = false) {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const config = JUNCTION_STREET_CONFIGS[junctionId] || JUNCTION_STREET_CONFIGS["junc-01"];

    // 1. Deep Midnight Background
    ctx.fillStyle = '#070B12';
    ctx.fillRect(0, 0, width, height);

    // Sky Horizon Gradient
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.45);
    sky.addColorStop(0, '#030712'); sky.addColorStop(1, '#0F172A');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height * 0.45);

    // Road Gradient
    const road = ctx.createLinearGradient(0, height * 0.45, 0, height);
    road.addColorStop(0, '#0F172A'); road.addColorStop(1, '#070B12');
    ctx.fillStyle = road; ctx.fillRect(0, height * 0.45, width, height * 0.55);

    // Glowing Cyan Center Markings
    ctx.strokeStyle = '#06B6D4'; ctx.lineWidth = 2.5; ctx.setLineDash([16, 12]);
    ctx.beginPath(); ctx.moveTo(width * 0.5, height * 0.45); ctx.lineTo(width * 0.40, height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(width * 0.5, height * 0.45); ctx.lineTo(width * 0.60, height); ctx.stroke();
    ctx.setLineDash([]);

    // 2. Animated Laser Scan Line Beam
    this.scanLineY += 1.8 * this.scanDirection;
    if (this.scanLineY > height) this.scanDirection = -1;
    if (this.scanLineY < 0) this.scanDirection = 1;

    const scanGrad = ctx.createLinearGradient(0, this.scanLineY - 8, 0, this.scanLineY + 8);
    scanGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
    scanGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.4)');
    scanGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, this.scanLineY - 8, width, 16);

    ctx.strokeStyle = '#22D3EE'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, this.scanLineY); ctx.lineTo(width, this.scanLineY); ctx.stroke();

    // 3. Render AR Corner Bracket Bounding Boxes
    this.entities.forEach(ent => {
      ent.x += ent.vx;
      ent.y += ent.vy;

      if (ent.x < 15 || ent.x > width - 130) ent.vx *= -1;
      if (ent.y < height * 0.40 || ent.y > height - 90) ent.vy *= -1;

      const isAmbulance = ent.type === 'ambulance';
      const color = VEHICLE_COLORS[ent.type] || '#38BDF8';
      const bracketLen = 14;

      // Glow Shadow
      ctx.shadowColor = color;
      ctx.shadowBlur = isAmbulance ? 18 : 8;

      // Corner Brackets
      ctx.strokeStyle = color;
      ctx.lineWidth = isAmbulance ? 3 : 2;

      const { x, y, w, h } = ent;
      // Top-Left Corner
      ctx.beginPath(); ctx.moveTo(x, y + bracketLen); ctx.lineTo(x, y); ctx.lineTo(x + bracketLen, y); ctx.stroke();
      // Top-Right Corner
      ctx.beginPath(); ctx.moveTo(x + w - bracketLen, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + bracketLen); ctx.stroke();
      // Bottom-Left Corner
      ctx.beginPath(); ctx.moveTo(x, y + h - bracketLen); ctx.lineTo(x, y + h); ctx.lineTo(x + bracketLen, y + h); ctx.stroke();
      // Bottom-Right Corner
      ctx.beginPath(); ctx.moveTo(x + w - bracketLen, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - bracketLen); ctx.stroke();

      // Semi-transparent box fill
      ctx.fillStyle = `${color}15`;
      ctx.fillRect(x, y, w, h);

      // Label Badge
      ctx.fillStyle = color;
      const tagWidth = Math.max(w, 185);
      ctx.fillRect(x, y - 22, tagWidth, 22);

      ctx.shadowBlur = 0;

      // White Monospace Label
      ctx.fillStyle = '#070B12';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText(ent.label, x + 6, y - 7);
    });

    // 4. AR Overlay Metadata Readouts
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(12, 12, 340, 32);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeRect(12, 12, 340, 32);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(`📍 ${config.streetName}`, 22, 32);

    if (isEmergencyActive) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.fillRect(width - 270, 12, 258, 32);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText('🚑 EMERGENCY CORRIDOR CLEARANCE ACTIVE', width - 260, 32);
    }
  }
}
