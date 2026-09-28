/**
 * Automobile Billing & Workshop POS System
 * Official Interactive Documentation Logic
 * Synapse Technology Engine - CodeCanyon Verified
 * 100% Responsive, Clean & Modern UI
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currentView: 'auto-overview',
    theme: localStorage.getItem('auto_doc_theme') || 'light',
    searchIndex: [],
    selectedSearchIdx: -1
  };

  // Search Data Registry (Complete 19 Sections indexed for instant Ctrl+K lookup)
  const searchRegistry = [
    {
      id: 'auto-overview',
      title: 'Product Overview & Key Features',
      category: 'Getting Started',
      snippet: 'Automobile Billing & Workshop POS is an all-in-one ERP designed for mechanic garages, car wash centers, and auto spare parts retailers.',
      targetView: 'auto-overview'
    },
    {
      id: 'auto-requirements',
      title: 'Server Requirements (PHP 8.2+, MySQL 5.7+)',
      category: 'Getting Started',
      snippet: 'System prerequisites: PHP 8.2, 8.3, or 8.4+, MySQL 5.7+ / MariaDB 10.3+, Apache mod_rewrite, BCMath, cURL, GD, PDO, OpenSSL.',
      targetView: 'auto-requirements'
    },
    {
      id: 'auto-package',
      title: "What's Included in the Download Package",
      category: 'Getting Started',
      snippet: 'CodeCanyon release contents: Main_Files source code, automated Web Installer, offline HTML documentation, standalone SQL dump, and graphics.',
      targetView: 'auto-package'
    },
    {
      id: 'auto-web-installer',
      title: '4-Step Web Installation Wizard (/install)',
      category: 'Installation & Setup',
      snippet: 'Automated 4-step wizard: check PHP requirements, folder permissions, live database connection test, and business profile initialization.',
      targetView: 'auto-web-installer'
    },
    {
      id: 'auto-cpanel-install',
      title: 'Manual Installation via cPanel & phpMyAdmin',
      category: 'Installation & Setup',
      snippet: 'Step-by-step cPanel guide: upload zip, point document root to public/, create MySQL database, import Database/database.sql, and configure .env.',
      targetView: 'auto-cpanel-install'
    },
    {
      id: 'auto-vps-install',
      title: 'VPS, Ubuntu & Terminal CLI Deployment',
      category: 'Installation & Setup',
      snippet: 'Deploy on Ubuntu 22.04/24.04 via composer install, php artisan key:generate, migrate --seed, storage:link, and cron schedule setup.',
      targetView: 'auto-vps-install'
    },
    {
      id: 'auto-credentials',
      title: 'Default Login Credentials & Access',
      category: 'Installation & Setup',
      snippet: 'Default credentials: URL /login. Super Admin: admin / admin123. Cashier Staff: cashier / cashier123. Remember to update upon first login!',
      targetView: 'auto-credentials'
    },
    {
      id: 'auto-settings',
      title: 'Store Configuration, Multi-Currency & Taxes (GST/VAT)',
      category: 'Configuration & Print',
      snippet: 'Customize workshop brand, logo, currency symbol ($ / Rs / AED / €), symbol placement, invoice numbering, and custom tax slabs.',
      targetView: 'auto-settings'
    },
    {
      id: 'auto-invoice-layouts',
      title: '5 Built-in Invoice Layouts & Thermal Receipts',
      category: 'Configuration & Print',
      snippet: 'Choose between Clean Modern A4, Compact Minimalist, Creative Color, Detailed Workshop Job-Card, and 80mm/58mm Thermal POS receipts.',
      targetView: 'auto-invoice-layouts'
    },
    {
      id: 'auto-inventory',
      title: 'Spare Parts & Inventory Management',
      category: 'Core Business Modules',
      snippet: 'Manage automotive parts, SKU barcodes, brand/category classification, purchase billing, selling margins, and real-time low-stock alerts.',
      targetView: 'auto-inventory'
    },
    {
      id: 'auto-unit-conversion',
      title: 'Intelligent Multi-Unit Conversion Engine',
      category: 'Core Business Modules',
      snippet: 'Define secondary units (1 Box = 10 Pcs, 1 Barrel = 200 LTR). Invoices automatically calculate fractions and deduct base stock accurately.',
      targetView: 'auto-unit-conversion'
    },
    {
      id: 'auto-pos-invoicing',
      title: 'POS Billing & Instant WhatsApp Invoicing',
      category: 'Core Business Modules',
      snippet: 'Rapid POS counter, vehicle plate registration lookup, multi-tender split payments (Cash, Card, UPI, Credit), and 1-click WhatsApp alerts.',
      targetView: 'auto-pos-invoicing'
    },
    {
      id: 'auto-customer-ledgers',
      title: 'Customer Running Ledgers & FIFO Batch Allocation',
      category: 'Core Business Modules',
      snippet: 'Chronological customer statements, debit/credit entries, outstanding dues tracking, and automatic FIFO chronological invoice clearing.',
      targetView: 'auto-customer-ledgers'
    },
    {
      id: 'auto-backups',
      title: '1-Click Database Backups & System Utilities',
      category: 'Maintenance & Utilities',
      snippet: 'Automated 1-click SQL backups saved securely in storage/app/backups/, restore tools, cache clearing, and route optimization utilities.',
      targetView: 'auto-backups'
    },
    {
      id: 'auto-troubleshooting',
      title: 'Troubleshooting & Error Solutions',
      category: 'Maintenance & Utilities',
      snippet: 'Solutions for 500 internal errors, 404 route issues (mod_rewrite), MySQL connection refused, missing storage links, and white screens.',
      targetView: 'auto-troubleshooting'
    },
    {
      id: 'auto-faq',
      title: 'Frequently Asked Questions (FAQ)',
      category: 'General',
      snippet: 'Answers on license terms, installation on shared hosting, thermal printer compatibility, offline usage, and customization queries.',
      targetView: 'auto-faq'
    },
    {
      id: 'auto-changelog',
      title: 'Version History & Release Notes',
      category: 'General',
      snippet: 'Release notes for version 1.0.0: added 4-step web installer wizard, updated invoice print engines, and performance enhancements.',
      targetView: 'auto-changelog'
    },
    {
      id: 'auto-support',
      title: 'Author Technical Support & Helpdesk (+91 6002552415)',
      category: 'Support',
      snippet: 'Priority customer support from author via WhatsApp direct chat (+91 6002552415) and CodeCanyon official item comments.',
      targetView: 'auto-support'
    },
    {
      id: 'auto-credits',
      title: 'Third-Party Sources, Assets & Licensing Credits',
      category: 'Credits',
      snippet: 'CodeCanyon submission credits: Laravel Framework (MIT), Chart.js (MIT), Ace Editor (BSD), Plus Jakarta Sans (OFL), Lucide Icons (MIT).',
      targetView: 'auto-credits'
    }
  ];

  // DOM Elements Cache
  const DOM = {
    views: document.querySelectorAll('.view-panel'),
    navLinks: document.querySelectorAll('.nav-item-link, .nav-link'),
    sidebarSections: document.querySelectorAll('.nav-section'),
    faqCards: document.querySelectorAll('.faq-card'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    searchTriggerBtns: document.querySelectorAll('[data-action="open-search"], .search-trigger-btn'),
    searchModalBackdrop: document.getElementById('searchModalBackdrop'),
    searchInput: document.getElementById('searchInput'),
    searchResults: document.getElementById('searchResults'),
    searchModalClose: document.getElementById('searchModalClose'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
    backToTopBtn: document.getElementById('backToTopBtn'),
    readingProgress: document.getElementById('readingProgress'),
    toast: document.getElementById('toast'),
    copyButtons: document.querySelectorAll('.copy-btn'),
    feedbackButtons: document.querySelectorAll('.feedback-btn')
  };

  /**
   * Application Initialization
   */
  function init() {
    state.searchIndex = searchRegistry;

    initTheme();
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
    const isDark = state.theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    updateThemeIcon(isDark);

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    state.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('auto_doc_theme', state.theme);
    updateThemeIcon(isDark);
  }

  function updateThemeIcon(isDark) {
    if (!DOM.themeToggleBtn) return;
    if (isDark) {
      // Sun Icon for Dark Mode (click to switch to light)
      DOM.themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      DOM.themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    } else {
      // Moon Icon for Light Mode (click to switch to dark)
      DOM.themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      DOM.themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    }
  }

  /**
   * Sidebar Accordions
   */
  function initSidebarAccordions() {
    document.querySelectorAll('.nav-section-header').forEach(header => {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        const section = header.closest('.nav-section');
        if (section) {
          section.classList.toggle('open');
        }
      });
    });
  }

  /**
   * FAQ Accordions
   */
  function initFaqAccordions() {
    document.querySelectorAll('.faq-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.faq-card');
        if (card) {
          const isOpen = card.classList.contains('open');
          // Optional: close other FAQ items
          document.querySelectorAll('.faq-card').forEach(c => {
            if (c !== card) c.classList.remove('open');
          });
          card.classList.toggle('open', !isOpen);
        }
      });
    });
  }

  /**
   * Hash Routing & View Management
   */
  function initRouting() {
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashRouting);

    // Click handler for all view-target links throughout the document
    document.addEventListener('click', (e) => {
      const targetEl = e.target.closest('[data-view-target]');
      if (targetEl) {
        const targetView = targetEl.getAttribute('data-view-target');
        if (targetView) {
          e.preventDefault();
          window.location.hash = targetView;
          switchView(targetView);
          closeMobileSidebar();
        }
      }
    });

    // Handle initial load
    handleHashRouting();
  }

  function handleHashRouting() {
    let hash = window.location.hash.replace(/^#/, '').trim();
    if (hash.startsWith('view-')) {
      hash = hash.replace(/^view-/, '');
    }
    if (hash && (document.getElementById('view-' + hash) || document.getElementById(hash))) {
      switchView(hash);
    } else {
      switchView('auto-overview');
    }
  }

  function switchView(viewId) {
    if (viewId.startsWith('view-')) {
      viewId = viewId.replace(/^view-/, '');
    }
    const targetPanel = document.getElementById('view-' + viewId) || document.getElementById(viewId);
    if (!targetPanel) return;

    // Deactivate all panels and activate target
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    targetPanel.classList.add('active');
    state.currentView = viewId;

    // Update active state in sidebar links
    document.querySelectorAll('.nav-item-link').forEach(link => {
      const target = (link.getAttribute('data-view-target') || '').replace(/^view-/, '');
      if (target === viewId) {
        link.classList.add('active');
        // Ensure parent accordion is open
        const parentSection = link.closest('.nav-section');
        if (parentSection) {
          parentSection.classList.add('open');
        }
      } else {
        link.classList.remove('active');
      }
    });

    // Update top nav links
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
      const target = (link.getAttribute('data-view-target') || '').replace(/^view-/, '');
      link.classList.toggle('active', target === viewId);
    });

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Search Engine (Command Palette Ctrl+K)
   */
  function initSearch() {
    // Open buttons
    document.querySelectorAll('[data-action="open-search"], .search-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearchModal();
      });
    });

    // Close button
    if (DOM.searchModalClose) {
      DOM.searchModalClose.addEventListener('click', closeSearchModal);
    }

    // Backdrop click close
    if (DOM.searchModalBackdrop) {
      DOM.searchModalBackdrop.addEventListener('click', (e) => {
        if (e.target === DOM.searchModalBackdrop) {
          closeSearchModal();
        }
      });
    }

    // Global keyboard shortcut (Ctrl+K or ⌘+K, and Esc to close)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const isOpen = DOM.searchModalBackdrop && (DOM.searchModalBackdrop.classList.contains('open') || DOM.searchModalBackdrop.classList.contains('active'));
        if (isOpen) {
          closeSearchModal();
        } else {
          openSearchModal();
        }
      } else if (e.key === 'Escape') {
        closeSearchModal();
        closeMobileSidebar();
      }
    });

    // Input handlers
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', handleSearchInput);
      DOM.searchInput.addEventListener('keydown', handleSearchKeydown);
    }
  }

  function openSearchModal() {
    if (!DOM.searchModalBackdrop) return;
    DOM.searchModalBackdrop.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
    if (DOM.searchInput) {
      DOM.searchInput.value = '';
      setTimeout(() => DOM.searchInput.focus(), 50);
      renderSearchResults(state.searchIndex.slice(0, 6));
    }
  }

  function closeSearchModal() {
    if (!DOM.searchModalBackdrop) return;
    DOM.searchModalBackdrop.classList.remove('open', 'active');
    document.body.style.overflow = '';
  }

  function handleSearchInput(e) {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      renderSearchResults(state.searchIndex.slice(0, 6));
      return;
    }

    const filtered = state.searchIndex.filter(item => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.snippet.toLowerCase().includes(query)
      );
    });

    renderSearchResults(filtered);
  }

  function renderSearchResults(items) {
    if (!DOM.searchResults) return;
    state.selectedSearchIdx = -1;

    if (items.length === 0) {
      DOM.searchResults.innerHTML = `
        <div class="search-empty">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p>No documentation results matching your search.</p>
        </div>
      `;
      return;
    }

    let html = '';
    items.forEach((item, idx) => {
      html += `
        <a href="#${item.targetView}" class="search-result-item" data-view-target="${item.targetView}" data-index="${idx}">
          <div class="search-result-header">
            <span class="search-result-title">${escapeHtml(item.title)}</span>
            <span class="search-result-badge">${escapeHtml(item.category)}</span>
          </div>
          <p class="search-result-snippet">${escapeHtml(item.snippet)}</p>
        </a>
      `;
    });

    DOM.searchResults.innerHTML = html;

    // Attach click event to newly rendered result links
    DOM.searchResults.querySelectorAll('.search-result-item').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view-target');
        if (targetView) {
          window.location.hash = targetView;
          switchView(targetView);
          closeSearchModal();
        }
      });
    });
  }

  function handleSearchKeydown(e) {
    const items = DOM.searchResults ? DOM.searchResults.querySelectorAll('.search-result-item') : [];
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.selectedSearchIdx = Math.min(state.selectedSearchIdx + 1, items.length - 1);
      updateSelectedSearchItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.selectedSearchIdx = Math.max(state.selectedSearchIdx - 1, 0);
      updateSelectedSearchItem(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (state.selectedSearchIdx >= 0 && items[state.selectedSearchIdx]) {
        items[state.selectedSearchIdx].click();
      }
    }
  }

  function updateSelectedSearchItem(items) {
    items.forEach((el, idx) => {
      if (idx === state.selectedSearchIdx) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  /**
   * Code Copy to Clipboard
   */
  function initCopyCode() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const wrap = btn.closest('.code-block-wrap');
        if (!wrap) return;
        const codeEl = wrap.querySelector('code, pre');
        if (!codeEl) return;

        const textToCopy = codeEl.innerText.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span style="color:#10b981;">Copied!</span>
          `;
          showToast('Code copied to clipboard!');

          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2200);
        }).catch(() => {
          showToast('Failed to copy code.');
        });
      });
    });
  }

  /**
   * Feedback Widget (Yes / No)
   */
  function initFeedbackWidget() {
    document.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.feedback-actions, .feedback-buttons, .feedback-widget, .article-feedback');
        if (parent) {
          const container = parent.querySelector('.feedback-actions, .feedback-buttons') || parent;
          container.innerHTML = `
            <span class="feedback-thanks">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Thank you for your feedback!
            </span>
          `;
        }
        showToast('Thank you for your feedback!');
      });
    });
  }

  /**
   * Mobile Sidebar Drawer
   */
  function initMobileDrawer() {
    if (DOM.mobileMenuBtn && DOM.sidebar) {
      DOM.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = DOM.sidebar.classList.toggle('mobile-open');
        DOM.sidebar.classList.toggle('open', isOpen);
        if (DOM.sidebarBackdrop) {
          DOM.sidebarBackdrop.classList.toggle('active', isOpen);
          DOM.sidebarBackdrop.classList.toggle('open', isOpen);
        }
        document.body.classList.toggle('drawer-open', isOpen);
      });
    }

    if (DOM.sidebarCloseBtn) {
      DOM.sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
    }

    if (DOM.sidebarBackdrop) {
      DOM.sidebarBackdrop.addEventListener('click', closeMobileSidebar);
    }
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
  function initBackToTop() {
    if (!DOM.backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        DOM.backToTopBtn.classList.add('visible');
      } else {
        DOM.backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    DOM.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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

  /**
   * Notification Toast
   */
  let toastTimer = null;
  function showToast(message) {
    if (!DOM.toast) return;
    DOM.toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;
    DOM.toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, 2400);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
