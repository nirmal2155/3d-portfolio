/* ==========================================================================
   PORTFOLIO MAIN INTERACTIVE APPLICATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  initTypewriter();
  init3DTiltCards();
  initSkillsFilter();
  initScrollSpy();
  initSoundSynth();
  initIntersectionObservers();
});

/* 1. Typewriter Effect for Hero */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const roles = [
    '3D Web Experiences',
    'Interactive Web Apps',
    'AI Systems & Dashboards',
    'High-Converting Visuals'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      el.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* 2. 3D Interactive Card Tilt Effect */
function init3DTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card, .avatar-3d-card, .project-card, .skill-card, .glass-panel');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* 3. Skills & Projects Category Filter */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter Skill Cards
      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => (card.style.opacity = '1'), 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => (card.style.display = 'none'), 300);
        }
      });

      // Filter Project Cards
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => (card.style.opacity = '1'), 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => (card.style.display = 'none'), 300);
        }
      });
    });
  });
}

/* 4. Scroll Spy */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 5. Web Audio API Sound Synthesizer Feedback */
function initSoundSynth() {
  let audioCtx = null;
  let soundEnabled = true;

  const soundBtn = document.getElementById('sound-toggle-btn');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.classList.toggle('muted', !soundEnabled);
      soundBtn.innerHTML = soundEnabled
        ? '<i class="ri-volume-up-line"></i>'
        : '<i class="ri-volume-mute-line"></i>';
    });
  }

  function playTone(freq, type = 'sine', duration = 0.1) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context policy safe fallback
    }
  }

  // Hover tone feedback on buttons
  document.querySelectorAll('.btn, .floating-whatsapp, .filter-btn, .nav-link').forEach((el) => {
    el.addEventListener('mouseenter', () => playTone(600, 'sine', 0.05));
    el.addEventListener('click', () => playTone(880, 'triangle', 0.12));
  });
}

/* 6. Intersection Observer for Animations */
function initIntersectionObservers() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width') || '85%';
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.2 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
}
