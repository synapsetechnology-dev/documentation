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
      id: 'getting-started',
      title: 'Getting Started',
      category: 'Overview',
      snippet: 'Welcome to Synapse Technology platform documentation. Explore quick setup guides and foundational concepts.',
      targetView: 'getting-started'
    },
    {
      id: 'what-is-synapse',
      title: 'What is Synapse?',
      category: 'Getting Started',
      snippet: 'Synapse is an AI-powered SaaS and workflow automation platform built for high-performance CodeCanyon deployments.',
      targetView: 'view-what-is-synapse'
    },
    {
      id: 'how-it-works',
      title: 'How it Works',
      category: 'Getting Started',
      snippet: 'Understand the core architecture, reactive event dispatchers, database schemas, and background worker queues.',
      targetView: 'view-how-it-works'
    },
    {
      id: 'quick-start',
      title: 'Quick Start',
      category: 'Getting Started',
      snippet: 'Get up and running in under 5 minutes with our automated installation wizard and initial configuration.',
      targetView: 'view-quick-start'
    },
    {
      id: 'syncing-tools',
      title: 'Syncing Your Tools',
      category: 'Customization',
      snippet: 'Connect external webhooks, configure background cron synchronization, and map incoming payload schemas.',
      targetView: 'view-syncing-tools'
    },
    {
      id: 'builder',
      title: 'Introduction to the Builder',
      category: 'Customization',
      snippet: 'Learn how to use the drag-and-drop workflow canvas and modular UI customizer included with Synapse.',
      targetView: 'view-builder'
    },
    {
      id: 'connecting-tools',
      title: 'Connecting Third Party Tools',
      category: 'Customization',
      snippet: 'Set up Stripe, PayPal, SMTP mailers, OpenAI GPT-4o, and Google Gemini API credentials.',
      targetView: 'view-connecting-tools'
    },
    {
      id: 'installation',
      title: 'Installation & Requirements',
      category: 'Advanced Features',
      snippet: 'Server requirements: PHP 8.2+, MySQL 8.0, Apache/Nginx, SSL certificates, and folder permission setup.',
      targetView: 'view-installation'
    },
    {
      id: 'understanding-integrations',
      title: 'Understanding Integrations',
      category: 'Advanced Features',
      snippet: 'Explore REST API endpoints, bearer token authentication headers, webhooks, and rate limiting rules.',
      targetView: 'view-understanding-integrations'
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions (FAQ)',
      category: 'Support',
      snippet: 'Comprehensive answers to common questions about licenses, customization, updates, and troubleshooting.',
      targetView: 'faq'
    },
    {
      id: 'contributions',
      title: 'Contributions & Support',
      category: 'Community',
      snippet: 'Official CodeCanyon item support policy, opening helpdesk tickets, and community Discord links.',
      targetView: 'view-contributions'
    },
    {
      id: 'license-verification',
      title: 'Envato Purchase Code Verification',
      category: 'Community',
      snippet: 'How to locate your Envato purchase code and activate automatic 1-click updates in the admin dashboard.',
      targetView: 'view-license-verification'
    },
    {
      id: 'changelog',
      title: 'Changelog & Updates',
      category: 'Community',
      snippet: 'Full version history, new features, bug fixes, and upgrade migration guides.',
      targetView: 'view-changelog'
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
    feedbackButtons: document.querySelectorAll('.feedback-btn')
  };

  /**
   * Initialize Application
   */
  function init() {
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
    document.querySelectorAll('.nav-item-link').forEach(link => {
      const linkTarget = link.getAttribute('data-view-target');
      if (
        linkTarget === viewId ||
        linkTarget === 'view-' + viewId ||
        linkTarget.replace('view-', '') === viewId
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Top Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkTarget = link.getAttribute('data-view-target');
      if (linkTarget === viewId || linkTarget === 'view-' + viewId || linkTarget.replace('view-', '') === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function expandSidebarSectionForView(viewId) {
    const activeLink = document.querySelector(`.nav-item-link[data-view-target="${viewId}"], .nav-item-link[data-view-target="view-${viewId}"]`);
    if (activeLink) {
      const section = activeLink.closest('.nav-section');
      if (section && section.classList.contains('collapsed')) {
        section.classList.remove('collapsed');
        section.classList.add('open');
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
    DOM.searchModalBackdrop.classList.add('open');
    DOM.searchInput.value = '';
    DOM.searchInput.focus();
    renderSearchResults(searchRegistry);
  }

  function closeSearchModal() {
    DOM.searchModalBackdrop.classList.remove('open');
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
        const codeBlock = btn.closest('.code-block-wrapper').querySelector('code, pre');
        if (!codeBlock) return;

        const codeText = codeBlock.innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="color:#10b981;font-weight:600;">Copied!</span>
          `;

          showToast('Code copied to clipboard!');

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
    if (DOM.sidebarBackdrop) {
      DOM.sidebarBackdrop.addEventListener('click', closeMobileSidebar);
    }
  }

  function toggleMobileSidebar() {
    const isOpen = DOM.sidebar.classList.toggle('mobile-open');
    DOM.sidebarBackdrop.classList.toggle('active', isOpen);
    document.body.classList.toggle('drawer-open', isOpen);
  }

  function closeMobileSidebar() {
    if (DOM.sidebar) DOM.sidebar.classList.remove('mobile-open');
    if (DOM.sidebarBackdrop) DOM.sidebarBackdrop.classList.remove('active');
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
