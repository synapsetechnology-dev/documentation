/**
 * Synapse Technology Documentation - Interactive Application Logic
 * Clean, lightweight, modular JavaScript
 */

(function () {
  'use strict';

  // State
  const state = {
    currentView: 'getting-started',
    theme: localStorage.getItem('synapse_doc_theme') || 'light',
    searchIndex: [],
    selectedSearchIdx: -1
  };

  // Search Data Registry (Articles and FAQs)
  const searchRegistry = [
    {
      id: 'automobile-portal',
      title: 'Automobile Billing & Workshop POS Documentation Portal',
      category: 'Documentation Portal',
      snippet: 'Dedicated offline portal: 4-step web installer wizard, 5 invoice layouts, touchscreen POS, multi-unit stock, WhatsApp messaging.',
      targetView: 'Automobile-Billing-Inventory-Management-Software/index.html'
    },
    {
      id: 'automobile-billing',
      title: 'Automobile Billing & Workshop POS System (v1.0.0)',
      category: 'Documentation Portal',
      snippet: 'Workshop POS, spare parts inventory, WhatsApp invoicing, 5 invoice layouts, and 4-step web installer.',
      targetView: 'Automobile-Billing-Inventory-Management-Software/index.html'
    },
    {
      id: 'automobile-web-installer',
      title: 'Automobile POS: 4-Step Web Installer Wizard',
      category: 'Installation',
      snippet: 'Setup wizard for Automobile Billing software: validates PHP, MySQL, permissions, and creates admin.',
      targetView: 'Automobile-Billing-Inventory-Management-Software/index.html#auto-web-installer'
    },
    {
      id: 'automobile-pos-invoicing',
      title: 'Automobile POS: 5 Invoice Print Layouts & POS',
      category: 'Billing & POS',
      snippet: 'Thermal 80mm POS receipt, Compact Pro A4/A5, Creative Color, Detailed Corporate, and Modern Simple print formats.',
      targetView: 'Automobile-Billing-Inventory-Management-Software/index.html#auto-pos-invoicing'
    },
    {
      id: 'automobile-inventory',
      title: 'Automobile POS: Spare Parts & Multi-Unit Conversion',
      category: 'Inventory',
      snippet: 'Manage OEM/aftermarket parts, units conversion (Box to Pcs, Barrels to Litres), and barcode printing.',
      targetView: 'Automobile-Billing-Inventory-Management-Software/index.html#auto-inventory'
    },
    {
      id: 'production-deployment',
      title: 'Production Deployment & Server Guide',
      category: 'Production',
      snippet: 'Step-by-step production go-live guide: server checklist, Nginx virtual host, cPanel setup, Supervisor workers, and cron jobs.',
      targetView: 'view-production'
    },
    {
      id: 'production-nginx',
      title: 'Production: Nginx & PHP 8.2-FPM Configuration',
      category: 'Production',
      snippet: 'Nginx virtualhost server block configuration with Gzip, SSL, security headers, and FastCGI timeouts.',
      targetView: 'view-production'
    },
    {
      id: 'production-supervisor',
      title: 'Production: Supervisor Queue Workers & Cron Scheduler',
      category: 'Production',
      snippet: 'Configure background queue workers via Supervisor and automated crontab scheduled tasks.',
      targetView: 'view-production'
    },
    {
      id: 'whatsapp-support',
      title: 'WhatsApp Technical Support (+91 6002552415)',
      category: 'Support',
      snippet: 'Fastest 1-on-1 technical assistance and author support via WhatsApp at +91 6002552415.',
      targetView: 'view-contributions'
    },
    {
      id: 'license-verification',
      title: 'Envato Purchase Code Verification',
      category: 'Support',
      snippet: 'How to locate your Envato purchase code and activate automatic 1-click updates in the admin dashboard.',
      targetView: 'view-license-verification'
    },
    {
      id: 'changelog',
      title: 'Changelog & Updates',
      category: 'Changelog',
      snippet: 'Full version history, new features, bug fixes, and upgrade migration guides.',
      targetView: 'view-changelog'
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions (FAQ)',
      category: 'Support',
      snippet: 'Comprehensive answers to common questions about licenses, customization, updates, and troubleshooting.',
      targetView: 'faq'
    }
  ];

  // DOM Elements
  const DOM = {
    views: document.querySelectorAll('.view-panel'),
    navLinks: document.querySelectorAll('.nav-item-link, .nav-link'),
    sidebarSections: document.querySelectorAll('.nav-section'),
    faqCards: document.querySelectorAll('.faq-card'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    searchTriggerBtns: document.querySelectorAll('[data-action="open-search"]'),
    searchModalBackdrop: document.getElementById('searchModalBackdrop'),
    searchInput: document.getElementById('searchInput'),
    searchResults: document.getElementById('searchResults'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    searchModalClose: document.getElementById('searchModalClose'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    backToTopBtn: document.getElementById('backToTopBtn'),
    toast: document.getElementById('toast'),
    copyButtons: document.querySelectorAll('.copy-btn'),
    feedbackButtons: document.querySelectorAll('.feedback-btn'),
    productsDropdown: document.getElementById('productsDropdown'),
    productsDropdownBtn: document.getElementById('productsDropdownBtn'),
    productsDropdownMenu: document.getElementById('productsDropdownMenu')
  };

  /**
   * Initialize Application
   */
  function init() {
    initTheme();
    initProductsDropdown();
    initSidebarAccordions();
    initFaqAccordions();
    initRouting();
    initSearch();
    initCopyCode();
    initFeedbackWidget();
    initMobileDrawer();
    initBackToTop();
    initReadingProgress();
  }

  /**
   * Theme Management (Light / Dark)
   */
  function initTheme() {
    if (state.theme === 'dark') {
      document.body.classList.add('dark-theme');
      updateThemeIcon(true);
    } else {
      document.body.classList.remove('dark-theme');
      updateThemeIcon(false);
    }

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    state.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('synapse_doc_theme', state.theme);
    updateThemeIcon(isDark);
    showToast(`Switched to ${state.theme} mode`);
  }

  function updateThemeIcon(isDark) {
    if (!DOM.themeToggleBtn) return;
    DOM.themeToggleBtn.innerHTML = isDark
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M19 3v4M21 5h-4" stroke-width="1.75"></path></svg>`;
  }

  /**
   * Header Products Dropdown Interaction
   */
  function initProductsDropdown() {
    if (!DOM.productsDropdownBtn || !DOM.productsDropdown) return;

    // Toggle on button click
    DOM.productsDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = DOM.productsDropdown.classList.contains('open');
      DOM.productsDropdown.classList.toggle('open', !isOpen);
      DOM.productsDropdownBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close when clicking any link inside dropdown
    if (DOM.productsDropdownMenu) {
      DOM.productsDropdownMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
          DOM.productsDropdown.classList.remove('open');
          DOM.productsDropdownBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!DOM.productsDropdown.contains(e.target)) {
        DOM.productsDropdown.classList.remove('open');
        DOM.productsDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.productsDropdown.classList.contains('open')) {
        DOM.productsDropdown.classList.remove('open');
        DOM.productsDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * Sidebar Accordions (Expand / Collapse categories)
   */
  function initSidebarAccordions() {
    DOM.sidebarSections.forEach(section => {
      const header = section.querySelector('.nav-section-header');
      if (!header) return;

      header.addEventListener('click', (e) => {
        // Toggle this section
        section.classList.toggle('collapsed');
        section.classList.toggle('open');
      });
    });
  }

  /**
   * FAQ Accordions
   */
  function initFaqAccordions() {
    DOM.faqCards.forEach(card => {
      const header = card.querySelector('.faq-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');

        // Close other cards for clean accordion feel, or keep independent
        card.classList.toggle('open', !isOpen);
      });
    });
  }

  /**
   * View Routing (Hash & Click navigation)
   */
  function initRouting() {
    // Check initial hash
    const initialHash = window.location.hash.replace('#', '') || 'getting-started';
    switchView(initialHash, false);

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '') || 'getting-started';
      switchView(newHash, false);
    });

    // Delegated click on elements with data-target
    document.addEventListener('click', (e) => {
      const targetEl = e.target.closest('[data-view-target]');
      if (targetEl) {
        e.preventDefault();
        const targetView = targetEl.getAttribute('data-view-target');
        switchView(targetView, true);
        
        // Close mobile drawer if open
        closeMobileSidebar();
      }
    });
  }

  function switchView(viewId, updateHash = true) {
    if (viewId && (viewId.includes('.html') || viewId.startsWith('http'))) {
      window.location.href = viewId;
      return;
    }
    if (viewId === 'support' || viewId === 'view-support') {
      viewId = 'view-contributions';
    }
    if (viewId === 'customization') {
      viewId = 'view-syncing-tools';
    }
    if (viewId === 'products' || viewId === 'product' || viewId === 'automobile-billing' || viewId === 'view-automobile-billing') {
      window.location.href = 'Automobile-Billing-Inventory-Management-Software/index.html';
      return;
    }
    if (viewId === 'home' || viewId === 'view-home') {
      viewId = 'getting-started';
    }
    if (viewId === 'production' || viewId === 'view-production' || viewId === 'prod-checklist' || viewId === 'prod-installer' || viewId === 'prod-env' || viewId === 'prod-nginx' || viewId === 'prod-cpanel' || viewId === 'prod-workers') {
      viewId = 'view-production';
    }

    let targetPanel = document.getElementById(viewId);
    
    // Support without "view-" prefix
    if (!targetPanel && !viewId.startsWith('view-')) {
      targetPanel = document.getElementById('view-' + viewId);
    }
    // Support with "view-" removed
    if (!targetPanel && viewId.startsWith('view-')) {
      targetPanel = document.getElementById(viewId.replace('view-', ''));
    }

    if (!targetPanel) {
      // Default fallback
      targetPanel = document.getElementById('view-getting-started');
      viewId = 'getting-started';
    }

    // Hide all panels
    DOM.views.forEach(panel => panel.classList.remove('active'));

    // Show target panel
    targetPanel.classList.add('active');
    state.currentView = viewId;

    if (updateHash) {
      window.location.hash = viewId;
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active state in sidebar links
    updateActiveSidebarLink(viewId);

    // Expand parent section in sidebar if collapsed
    expandSidebarSectionForView(viewId);
  }

  function updateActiveSidebarLink(viewId) {
    const normView = (viewId || '').replace(/^view-/, '');

    document.querySelectorAll('.nav-item-link').forEach(link => {
      const linkTarget = (link.getAttribute('data-view-target') || '').replace(/^view-/, '');
      if (linkTarget && linkTarget === normView) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Top Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkTarget = (link.getAttribute('data-view-target') || '').replace(/^view-/, '');
      if (linkTarget && linkTarget === normView) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Special check for products dropdown button
    if (DOM.productsDropdownBtn) {
      if (normView === 'automobile-billing') {
        DOM.productsDropdownBtn.classList.add('active');
      } else {
        DOM.productsDropdownBtn.classList.remove('active');
      }
    }
  }

  function expandSidebarSectionForView(viewId) {
    const normView = (viewId || '').replace(/^view-/, '');
    const activeLink = document.querySelector(`.nav-item-link[data-view-target="${viewId}"], .nav-item-link[data-view-target="view-${normView}"], .nav-item-link[data-view-target="${normView}"]`);
    if (activeLink) {
      const section = activeLink.closest('.nav-section');
      if (section) {
        section.classList.remove('collapsed');
        section.classList.add('open');
      }
    } else if (normView === 'getting-started') {
      const homeSec = document.getElementById('sec-getting-started');
      if (homeSec) {
        homeSec.classList.remove('collapsed');
        homeSec.classList.add('open');
      }
    }
  }

  /**
   * Live Search Modal with Keyboard Navigation
   */
  function initSearch() {
    DOM.searchTriggerBtns.forEach(btn => {
      btn.addEventListener('click', openSearchModal);
    });

    // Keyboard shortcut Ctrl+K or Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === 'Escape' && DOM.searchModalBackdrop.classList.contains('open')) {
        closeSearchModal();
      }
    });

    // Close button click
    if (DOM.searchModalClose) {
      DOM.searchModalClose.addEventListener('click', closeSearchModal);
    }

    // Backdrop click
    if (DOM.searchModalBackdrop) {
      DOM.searchModalBackdrop.addEventListener('click', (e) => {
        if (e.target === DOM.searchModalBackdrop) {
          closeSearchModal();
        }
      });
    }

    // Input typing & keyboard navigation
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', handleSearchInput);
      DOM.searchInput.addEventListener('keydown', handleSearchKeynav);
    }
  }

  function openSearchModal() {
    if (!DOM.searchModalBackdrop) return;
    DOM.searchModalBackdrop.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
    if (DOM.searchInput) {
      DOM.searchInput.value = '';
      setTimeout(() => DOM.searchInput.focus(), 50);
      renderSearchResults(searchRegistry);
    }
  }

  function closeSearchModal() {
    if (!DOM.searchModalBackdrop) return;
    DOM.searchModalBackdrop.classList.remove('open', 'active');
    document.body.style.overflow = '';
  }

  function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderSearchResults(searchRegistry);
      return;
    }

    const filtered = searchRegistry.filter(item => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.snippet.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });

    renderSearchResults(filtered, query);
  }

  function handleSearchKeynav(e) {
    const items = DOM.searchResults.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.selectedSearchIdx = (state.selectedSearchIdx + 1) % items.length;
      updateSearchSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.selectedSearchIdx = (state.selectedSearchIdx - 1 + items.length) % items.length;
      updateSearchSelection(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (state.selectedSearchIdx >= 0 && items[state.selectedSearchIdx]) {
        items[state.selectedSearchIdx].click();
      } else if (items[0]) {
        items[0].click();
      }
    }
  }

  function updateSearchSelection(items) {
    items.forEach((item, idx) => {
      if (idx === state.selectedSearchIdx) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  function renderSearchResults(results, query = '') {
    state.selectedSearchIdx = -1;
    if (!results.length) {
      DOM.searchResults.innerHTML = `
        <div class="search-empty">
          <p>No documentation results found for "<strong>${escapeHtml(query)}</strong>"</p>
          <span style="font-size: 0.85rem; color: var(--text-subtle); display: block; margin-top: 6px;">
            Try searching for "installation", "faq", "quick start", or "integrations"
          </span>
        </div>
      `;
      return;
    }

    DOM.searchResults.innerHTML = results.map((item, idx) => {
      const highlightedTitle = highlightMatch(item.title, query);
      const highlightedSnippet = highlightMatch(item.snippet, query);

      return `
        <div class="search-result-item ${idx === 0 ? 'selected' : ''}" data-target="${item.targetView}">
          <div class="search-result-title">
            <div style="display:flex;align-items:center;gap:9px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary);flex-shrink:0;">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>${highlightedTitle}</span>
            </div>
            <span class="search-result-category">${item.category}</span>
          </div>
          <div class="search-result-snippet">${highlightedSnippet}</div>
        </div>
      `;
    }).join('');

    state.selectedSearchIdx = 0;

    // Attach click handlers
    DOM.searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetView = item.getAttribute('data-target');
        closeSearchModal();
        switchView(targetView, true);
      });
    });
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark style="background: rgba(37,99,235,0.2); color: inherit; padding: 0 2px; border-radius: 2px;">$1</mark>');
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s];
    });
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * One-Click Copy Code to Clipboard
   */
  function initCopyCode() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const wrapper = btn.closest('.code-block-wrapper') || btn.closest('.code-block-wrap');
        const codeBlock = wrapper ? wrapper.querySelector('code, pre') : null;
        if (!codeBlock) return;

        const codeText = codeBlock.innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="color:#10b981;font-weight:600;">Copied!</span>
          `;

          const msg = btn.getAttribute('data-action') === 'copy-support-template'
            ? 'Support template copied to clipboard!'
            : 'Code copied to clipboard!';
          showToast(msg);

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
          showToast('Failed to copy to clipboard');
        });
      });
    });
  }

  /**
   * Feedback Widget (Was this helpful?)
   */
  function initFeedbackWidget() {
    DOM.feedbackButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.feedback-buttons');
        parent.querySelectorAll('.feedback-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast('Thank you for your feedback!');
      });
    });
  }

  /**
   * Mobile Sidebar Drawer
   */
  function initMobileDrawer() {
    if (DOM.mobileMenuBtn) {
      DOM.mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
    }
    const closeBtn = document.getElementById('sidebarCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileSidebar);
    }
    if (DOM.sidebarBackdrop) {
      DOM.sidebarBackdrop.addEventListener('click', closeMobileSidebar);
    }
    document.querySelectorAll('.nav-item-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileSidebar();
      });
    });
  }

  function toggleMobileSidebar() {
    if (!DOM.sidebar) return;
    const isOpen = DOM.sidebar.classList.toggle('mobile-open');
    DOM.sidebar.classList.toggle('open', isOpen);
    if (DOM.sidebarBackdrop) {
      DOM.sidebarBackdrop.classList.toggle('active', isOpen);
      DOM.sidebarBackdrop.classList.toggle('open', isOpen);
    }
    document.body.classList.toggle('drawer-open', isOpen);
  }

  function closeMobileSidebar() {
    if (DOM.sidebar) {
      DOM.sidebar.classList.remove('mobile-open', 'open');
    }
    if (DOM.sidebarBackdrop) {
      DOM.sidebarBackdrop.classList.remove('active', 'open');
    }
    document.body.classList.remove('drawer-open');
  }

  /**
   * Back to Top Button
   */
  
  /**
   * Top Reading Progress Indicator
   */
  function initReadingProgress() {
    const bar = document.getElementById('readingProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        bar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
      }
    }, { passive: true });
  }

  function initBackToTop() {
    if (!DOM.backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        DOM.backToTopBtn.classList.add('visible');
      } else {
        DOM.backToTopBtn.classList.remove('visible');
      }
    });

    DOM.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Notification Toast
   */
  let toastTimer = null;
  function showToast(message) {
    if (!DOM.toast) return;
    DOM.toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:9px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${escapeHtml(message)}</span>
      </div>
    `;
    DOM.toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, 2800);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
