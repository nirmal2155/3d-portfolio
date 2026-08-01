/* ==========================================================================
   LIVE PROFILE CONFIGURATOR & REAL-TIME EDIT ENGINE
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'TRIP_3D_PORTFOLIO_CONFIG';

  const defaultConfig = {
    name: 'Nirmalsinh Chauhan',
    title: 'M.Sc. IT (Cloud Computing) & Web Developer',
    whatsapp: '+919327949939',
    email: 'chauhannirmalsinh728@gmail.com',
    bio: 'M.Sc. IT student in IMS & Cloud Computing at Gujarat University. Passed BCA with Distinction. 1+ year web development experience in Laravel, PHP, AI (Gemini API), and 3D WebGL.',
    statProjects: '35+',
    statClients: '20+',
    statExperience: '1 Yr'
  };

  // Load configuration
  window.PortfolioConfig = loadConfig();

  function loadConfig() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultConfig, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse stored config', e);
      }
    }
    return defaultConfig;
  }

  function saveConfig(newConfig) {
    window.PortfolioConfig = { ...window.PortfolioConfig, ...newConfig };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.PortfolioConfig));
    applyConfigToDOM();
  }

  function applyConfigToDOM() {
    const cfg = window.PortfolioConfig;

    // Update Text Elements
    const elementsMap = {
      'cfg-name': cfg.name,
      'cfg-title': cfg.title,
      'cfg-bio': cfg.bio,
      'cfg-stat-projects': cfg.statProjects,
      'cfg-stat-clients': cfg.statClients,
      'cfg-stat-exp': cfg.statExperience,
      'cfg-phone-display': cfg.whatsapp,
      'cfg-email-display': cfg.email,
      'footer-name': cfg.name
    };

    Object.keys(elementsMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = elementsMap[id];
    });

    // Update Floating WhatsApp button wa.me href
    const floatWa = document.getElementById('floating-wa-btn');
    if (floatWa) {
      const cleanPhone = cfg.whatsapp.replace(/[^0-9]/g, '');
      floatWa.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi " + cfg.name + "! I would like to chat about a project.")}`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyConfigToDOM();
    initDrawerControls();
  });

  function initDrawerControls() {
    const drawer = document.getElementById('profile-drawer');
    const openBtn = document.getElementById('open-config-drawer');
    const closeBtn = document.getElementById('close-config-drawer');
    const saveBtn = document.getElementById('save-config-btn');
    const resetBtn = document.getElementById('reset-config-btn');

    if (openBtn && drawer) {
      openBtn.addEventListener('click', () => {
        populateDrawerInputs();
        drawer.classList.add('active');
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const updated = {
          name: document.getElementById('input-cfg-name')?.value || window.PortfolioConfig.name,
          title: document.getElementById('input-cfg-title')?.value || window.PortfolioConfig.title,
          whatsapp: document.getElementById('input-cfg-phone')?.value || window.PortfolioConfig.whatsapp,
          email: document.getElementById('input-cfg-email')?.value || window.PortfolioConfig.email,
          bio: document.getElementById('input-cfg-bio')?.value || window.PortfolioConfig.bio,
          statProjects: document.getElementById('input-cfg-projects')?.value || window.PortfolioConfig.statProjects,
          statClients: document.getElementById('input-cfg-clients')?.value || window.PortfolioConfig.statClients,
          statExperience: document.getElementById('input-cfg-exp')?.value || window.PortfolioConfig.statExperience
        };

        saveConfig(updated);
        if (drawer) drawer.classList.remove('active');
        
        // Show success notification
        alert('🎉 Profile details updated successfully! Your customized settings are active.');
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset portfolio details to default settings?')) {
          localStorage.removeItem(STORAGE_KEY);
          window.PortfolioConfig = { ...defaultConfig };
          applyConfigToDOM();
          populateDrawerInputs();
          if (drawer) drawer.classList.remove('active');
        }
      });
    }
  }

  function populateDrawerInputs() {
    const cfg = window.PortfolioConfig;
    const inputsMap = {
      'input-cfg-name': cfg.name,
      'input-cfg-title': cfg.title,
      'input-cfg-phone': cfg.whatsapp,
      'input-cfg-email': cfg.email,
      'input-cfg-bio': cfg.bio,
      'input-cfg-projects': cfg.statProjects,
      'input-cfg-clients': cfg.statClients,
      'input-cfg-exp': cfg.statExperience
    };

    Object.keys(inputsMap).forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = inputsMap[id];
    });
  }

})();
