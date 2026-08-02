/* ==========================================================================
   THREE.JS 3D CANVAS ANIMATION ENGINE
   ========================================================================== */

(function () {
  'use strict';

  const container = document.getElementById('three-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  const isMobile = window.innerWidth <= 768;

  // WebGL Renderer with mobile performance optimizations
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !isMobile,
    powerPreference: 'high-performance',
    precision: isMobile ? 'mediump' : 'highp'
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
  container.appendChild(renderer.domElement);

  // Mouse tracking (Desktop only to prevent mobile touch wobble)
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  if (!isMobile) {
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.0015;
      mouseY = (event.clientY - windowHalfY) * 0.0015;
    }, { passive: true });
  }

  // 1. Particle Starfield Universe (Optimized for Mobile & Laptop)
  const particleCount = isMobile ? 500 : 2000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorOptions = [
    new THREE.Color(0x00f2fe), // Cyan
    new THREE.Color(0x4facfe), // Blue
    new THREE.Color(0x7f00ff), // Purple
    new THREE.Color(0x25D366)  // WhatsApp Emerald
  ];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 120;
    positions[i + 1] = (Math.random() - 0.5) * 120;
    positions[i + 2] = (Math.random() - 0.5) * 120;

    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors[i] = randomColor.r;
    colors[i + 1] = randomColor.g;
    colors[i + 2] = randomColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.35 : 0.25,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, particleMaterial);
  scene.add(particleSystem);

  // 2. Central 3D Interactive Icosahedron Mesh
  const meshGeometry = new THREE.IcosahedronGeometry(isMobile ? 7 : 9, isMobile ? 1 : 2);
  const meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    emissive: 0x128C7E,
    emissiveIntensity: 0.2
  });

  const mainMesh = new THREE.Mesh(meshGeometry, meshMaterial);
  mainMesh.position.set(isMobile ? 0 : 12, isMobile ? -14 : 0, isMobile ? -10 : -5);
  scene.add(mainMesh);

  // Inner Core Sphere
  const coreGeometry = new THREE.SphereGeometry(isMobile ? 3 : 4, 12, 12);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x25D366,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  mainMesh.add(coreMesh);

  // 3. Floating 3D Orbs / Floating Polyhedra
  const floatingGroup = new THREE.Group();
  const floatGeometries = [
    new THREE.OctahedronGeometry(1.8, 0),
    new THREE.TetrahedronGeometry(2, 0),
    new THREE.DodecahedronGeometry(1.5, 0)
  ];

  const floatingObjects = [];
  const floatCount = isMobile ? 3 : 8;

  for (let i = 0; i < floatCount; i++) {
    const geom = floatGeometries[i % floatGeometries.length];
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x00f2fe : 0x25D366,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const obj = new THREE.Mesh(geom, mat);

    obj.position.set(
      (Math.random() - 0.5) * (isMobile ? 35 : 60),
      (Math.random() - 0.5) * (isMobile ? 35 : 40),
      (Math.random() - 0.5) * 30
    );

    obj.rotationSpeed = {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02
    };

    floatingObjects.push(obj);
    floatingGroup.add(obj);
  }
  scene.add(floatingGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00f2fe, 1.8, 50);
  pointLight1.position.set(15, 15, 15);
  scene.add(pointLight1);

  // Page Visibility & Scroll Throttling
  let isTabActive = true;
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    // Skip render if tab is hidden to save GPU & battery
    if (!isTabActive) return;

    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse parallax (Desktop only to guarantee 100% mobile screen stability)
    if (!isMobile) {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x += (targetX * 10 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    }

    // Rotate main 3D Mesh
    mainMesh.rotation.x = elapsedTime * 0.15;
    mainMesh.rotation.y = elapsedTime * 0.2;
    coreMesh.rotation.y = -elapsedTime * 0.3;

    // Rotate particle system slowly
    particleSystem.rotation.y = elapsedTime * 0.02;

    // Animate floating objects
    floatingObjects.forEach((obj, idx) => {
      obj.rotation.x += obj.rotationSpeed.x;
      obj.rotation.y += obj.rotationSpeed.y;
      obj.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.01;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Window Resize Handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth <= 768 ? 1.25 : 2));
    }, 150);
  });
})();
})();
