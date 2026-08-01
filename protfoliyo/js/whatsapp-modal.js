/* ==========================================================================
   WHATSAPP INTEGRATION ENGINE & MESSAGE BUILDER
   ========================================================================== */

(function () {
  'use strict';

  // Default config - editable via Live Profile Configurator
  window.PortfolioConfig = window.PortfolioConfig || {
    name: 'Nirmalsinh Chauhan',
    phone: '+919327949939',
    title: 'M.Sc. IT (Cloud Computing) & Web Developer',
    email: 'chauhannirmalsinh728@gmail.com'
  };

  // Templates
  const templates = {
    hire: "Hi Nirmal! 👋 I visited your 3D Portfolio website and I'd like to hire you for a project.",
    inquiry: "Hi Nirmal! 🚀 I visited your 3D Portfolio website and I have a query for you.",
    consultation: "Hi Nirmal! I need consultation regarding Web Architecture & Cloud Computing. When can we talk?",
    custom: "Hi Nirmal! I visited your 3D Portfolio website and I have a query."
  };

  document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppForm();
    initWhatsAppModal();
  });

  // Direct WhatsApp Launcher Function
  window.openWhatsAppChat = function (customMessage, projectTitle) {
    const rawPhone = (window.PortfolioConfig.phone || '+919327949939').replace(/[^0-9]/g, '');
    let finalMsg = customMessage || "Hi Nirmal! 👋 I visited your 3D portfolio website and I have a query for you.";
    
    if (projectTitle) {
      finalMsg = `Hi Nirmal! 👋 I saw your project *"${projectTitle}"* on your 3D Portfolio website and have a query regarding it.`;
    }

    const encodedMsg = encodeURIComponent(finalMsg);
    const waUrl = `https://wa.me/${rawPhone}?text=${encodedMsg}`;
    
    window.open(waUrl, '_blank');
  };

  // Form Section WhatsApp Builder
  function initWhatsAppForm() {
    const form = document.getElementById('whatsapp-form');
    if (!form) return;

    const templateChips = document.querySelectorAll('.template-chip');
    const messageInput = document.getElementById('wa-message');
    const nameInput = document.getElementById('wa-name');
    const serviceInput = document.getElementById('wa-service');

    templateChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        templateChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        const key = chip.getAttribute('data-template');
        if (templates[key] !== undefined) {
          messageInput.value = templates[key];
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = nameInput ? nameInput.value.trim() : '';
      const service = serviceInput ? serviceInput.value.trim() : 'Web Development';
      const userMsg = messageInput ? messageInput.value.trim() : '';

      if (!userMsg) {
        alert('Please enter your message before sending via WhatsApp!');
        return;
      }

      // Save lead to local Excel database
      saveLeadToExcelDatabase({ name: name || 'Anonymous', service, message: userMsg, timestamp: new Date().toLocaleString() });

      // Send to Google Sheets if Web App URL is configured
      sendToGoogleSheets({ name: name || 'Anonymous', service, message: userMsg, timestamp: new Date().toLocaleString() });

      let formattedText = `*New Inquiry from Portfolio Website* 🚀\n\n`;
      if (name) formattedText += `👤 *Name:* ${name}\n`;
      formattedText += `💼 *Service:* ${service}\n\n`;
      formattedText += `💬 *Message:* ${userMsg}`;

      window.openWhatsAppChat(formattedText);
    });
  }

  // Local Excel Lead Database Logger
  function saveLeadToExcelDatabase(lead) {
    try {
      const existing = JSON.parse(localStorage.getItem('PORTFOLIO_EXCEL_LEADS') || '[]');
      existing.push(lead);
      localStorage.setItem('PORTFOLIO_EXCEL_LEADS', JSON.stringify(existing));
    } catch (e) {
      console.error('Failed to log lead', e);
    }
  }

  // Download All Leads as Excel CSV File
  window.downloadExcelLeadsFile = function () {
    try {
      const leads = JSON.parse(localStorage.getItem('PORTFOLIO_EXCEL_LEADS') || '[]');
      let csvContent = "data:text/csv;charset=utf-8,Timestamp,Name,Service,Message\n";
      
      if (leads.length === 0) {
        csvContent += `"${new Date().toLocaleString()}","Sample Lead","3D Website Inquiry","No form submissions logged yet."\n`;
      } else {
        leads.forEach(l => {
          csvContent += `"${l.timestamp}","${(l.name||'').replace(/"/g, '""')}","${(l.service||'').replace(/"/g, '""')}","${(l.message||'').replace(/"/g, '""')}"\n`;
        });
      }

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `portfolio_leads_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert('Error exporting Excel CSV file.');
    }
  };

  // Google Sheets Helper Integration
  function sendToGoogleSheets(data) {
    if (window.GOOGLE_SHEETS_WEB_APP_URL) {
      fetch(window.GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.error('Google Sheets submission error:', err));
    }
  }

  // Quick Modal Controls
  function initWhatsAppModal() {
    const modal = document.getElementById('whatsapp-modal');
    const openBtns = document.querySelectorAll('.trigger-wa-modal');
    const closeBtn = document.getElementById('close-wa-modal');

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectTitle = btn.getAttribute('data-project');
        if (projectTitle) {
          window.openWhatsAppChat(null, projectTitle);
        } else if (modal) {
          modal.classList.add('active');
        } else {
          window.openWhatsAppChat();
        }
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  }
})();
