import * as THREE from 'three';

export class ThreeDTrafficRenderer {
  constructor(container) {
    this.container = container;
    this.width = container.clientWidth || 800;
    this.height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#050811');
    this.scene.fog = new THREE.FogExp2('#050811', 0.015);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(45, 35, 55);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap; // PCFShadowMap standard

    // Clear previous children
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.container.appendChild(this.renderer.domElement);

    this.vehicles = [];
    this.lights = {};
    this.angle = 0;
    this.isEmergency = false;

    this.initLights();
    this.initEnvironment();
    this.initVehicles();
    this.animate = this.animate.bind(this);
    this.animId = requestAnimationFrame(this.animate);
  }

  initLights() {
    // Ambient Light
    const ambient = new THREE.AmbientLight('#1e293b', 1.2);
    this.scene.add(ambient);

    // Directional Sunlight / Moon
    const dirLight = new THREE.DirectionalLight('#38bdf8', 1.8);
    dirLight.position.set(30, 50, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    // Cyan Ambient Accent Light
    const cyanLight = new THREE.PointLight('#06b6d4', 3, 60);
    cyanLight.position.set(0, 15, 0);
    this.scene.add(cyanLight);

    // Signal Lights (N/S/E/W)
    const signalPos = [
      { id: 'north', x: 0, z: -15, col: '#10b981' },
      { id: 'south', x: 0, z: 15, col: '#ef4444' },
      { id: 'east', x: 15, z: 0, col: '#ef4444' },
      { id: 'west', x: -15, z: 0, col: '#ef4444' }
    ];

    signalPos.forEach(sp => {
      const pLight = new THREE.PointLight(sp.col, 4, 25);
      pLight.position.set(sp.x, 8, sp.z);
      this.scene.add(pLight);

      // Signal Pole Geometry
      const poleGeo = new THREE.CylinderGeometry(0.3, 0.3, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(sp.x, 4, sp.z);
      this.scene.add(pole);

      // Light Sphere
      const sphereGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: sp.col });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(sp.x, 8, sp.z);
      this.scene.add(sphere);

      this.lights[sp.id] = { light: pLight, sphere: sphere, mat: sphereMat };
    });
  }

  initEnvironment() {
    // 3D Ground Plane
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // 3D Road Intersection Mesh
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });

    // North-South Road
    const nsRoadGeo = new THREE.PlaneGeometry(16, 160);
    const nsRoad = new THREE.Mesh(nsRoadGeo, roadMat);
    nsRoad.rotation.x = -Math.PI / 2;
    nsRoad.position.y = 0.05;
    nsRoad.receiveShadow = true;
    this.scene.add(nsRoad);

    // East-West Road
    const ewRoadGeo = new THREE.PlaneGeometry(160, 16);
    const ewRoad = new THREE.Mesh(ewRoadGeo, roadMat);
    ewRoad.rotation.x = -Math.PI / 2;
    ewRoad.position.y = 0.06;
    ewRoad.receiveShadow = true;
    this.scene.add(ewRoad);

    // 3D Grid Lines
    const grid = new THREE.GridHelper(160, 40, 0x06b6d4, 0x1e293b);
    grid.position.y = 0.1;
    this.scene.add(grid);
  }

  createVehicle(type, color, x, z, vx, vz) {
    const group = new THREE.Group();

    // Body Geometry
    let geo;
    if (type === 'bus') geo = new THREE.BoxGeometry(3.5, 3.2, 10);
    else if (type === 'auto') geo = new THREE.BoxGeometry(2.2, 2.0, 3.5);
    else if (type === 'bike') geo = new THREE.BoxGeometry(1.0, 1.2, 2.2);
    else if (type === 'ambulance') geo = new THREE.BoxGeometry(3.2, 2.8, 7.5);
    else geo = new THREE.BoxGeometry(2.8, 2.0, 5.5);

    const mat = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.6,
      roughness: 0.2
    });

    const body = new THREE.Mesh(geo, mat);
    body.position.y = geo.parameters.height / 2;
    body.castShadow = true;
    group.add(body);

    // 3D Bounding Box Holographic Wireframe
    const wireGeo = new THREE.BoxGeometry(
      geo.parameters.width + 0.6,
      geo.parameters.height + 0.6,
      geo.parameters.depth + 0.6
    );
    const wireMat = new THREE.MeshBasicMaterial({
      color: type === 'ambulance' ? 0xef4444 : 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    wire.position.y = geo.parameters.height / 2;
    group.add(wire);

    // Headlights
    const headLight = new THREE.SpotLight(0xffffff, 2, 25, Math.PI / 6);
    headLight.position.set(0, 1.5, geo.parameters.depth / 2);
    headLight.target.position.set(0, 0, geo.parameters.depth / 2 + 10);
    group.add(headLight);
    group.add(headLight.target);

    group.position.set(x, 0, z);
    this.scene.add(group);

    return { group, vx, vz, type };
  }

  initVehicles() {
    this.vehicles = [
      this.createVehicle('car', 0x38bdf8, -4, -40, 0, 0.4),
      this.createVehicle('car', 0x0284c7, 4, 35, 0, -0.35),
      this.createVehicle('bus', 0xa78bfa, -4, 25, 0, -0.2),
      this.createVehicle('auto', 0xfbbf24, 4, -25, 0, 0.3),
      this.createVehicle('bike', 0x34d399, -35, 4, 0.5, 0),
      this.createVehicle('car', 0x38bdf8, 40, -4, -0.45, 0),
      this.createVehicle('auto', 0xfbbf24, -25, -4, 0.35, 0)
    ];
  }

  setEmergency(active) {
    this.isEmergency = active;
    if (active) {
      if (!this.vehicles.some(v => v.type === 'ambulance')) {
        const amb = this.createVehicle('ambulance', 0xef4444, -4, -50, 0, 0.7);
        this.vehicles.unshift(amb);
      }
    } else {
      const ambIdx = this.vehicles.findIndex(v => v.type === 'ambulance');
      if (ambIdx !== -1) {
        this.scene.remove(this.vehicles[ambIdx].group);
        this.vehicles.splice(ambIdx, 1);
      }
    }
  }

  animate() {
    this.animId = requestAnimationFrame(this.animate);

    // Slow Camera Orbit
    this.angle += 0.002;
    this.camera.position.x = Math.sin(this.angle) * 55;
    this.camera.position.z = Math.cos(this.angle) * 55;
    this.camera.lookAt(0, 4, 0);

    // Update Vehicles
    this.vehicles.forEach(v => {
      v.group.position.x += v.vx;
      v.group.position.z += v.vz;

      if (v.group.position.z > 60) v.group.position.z = -60;
      if (v.group.position.z < -60) v.group.position.z = 60;
      if (v.group.position.x > 60) v.group.position.x = -60;
      if (v.group.position.x < -60) v.group.position.x = 60;
    });

    this.renderer.render(this.scene, this.camera);
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  destroy() {
    cancelAnimationFrame(this.animId);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
