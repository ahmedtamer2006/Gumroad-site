/**
 * ============================================================================
 * DEVMASTER PRO — MAIN JAVASCRIPT CONTROLLER
 * High-performance, modular Vanilla JS (zero external runtime dependencies).
 * 
 * TABLE OF CONTENTS:
 * 1. Dark/Light Mode Theme Switcher (localStorage + system preference)
 * 2. Mobile Hamburger Navigation Drawer
 * 3. Course Track Switcher (Tabs with butter-smooth fade/slide)
 * 4. Syllabus Module Accordion (Animated height expansion)
 * 5. Pricing Billing Toggle (Monthly vs Annual rates)
 * 6. Sticky Bottom "Enroll Now" Bar (IntersectionObserver)
 * 7. AOS (Animate On Scroll) Initialization
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. DARK / LIGHT THEME TOGGLE
     Remembers user preference via localStorage and detects OS preference.
     CLIENT: To set default to dark mode for new visitors, change 'light' to 'dark'
     in the getInitialTheme() function below.
     ========================================================================== */
  const initTheme = () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    // Detect saved theme or fall back to system color scheme
    const getInitialTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply theme to the <html> element
    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    };

    // Initialize on load
    setTheme(getInitialTheme());

    // Click handler to toggle theme
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(targetTheme);
    });

    // Listen to OS-level theme changes if no explicit user override is stored
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  };


  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER (HAMBURGER)
     CLIENT: Controls the slide-down menu on mobile screens.
     Automatically closes when any navigation link is clicked.
     ========================================================================== */
  const initMobileNav = () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    const toggleMenu = (isOpen) => {
      const state = typeof isOpen === 'boolean' ? isOpen : !hamburger.classList.contains('is-active');
      hamburger.classList.toggle('is-active', state);
      hamburger.setAttribute('aria-expanded', state);
      mobileMenu.classList.toggle('is-open', state);
      mobileMenu.setAttribute('aria-hidden', !state);
    };

    hamburger.addEventListener('click', () => toggleMenu());

    // Auto-close menu when a link inside it is clicked
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu when pressing the Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('is-active')) {
        toggleMenu(false);
        hamburger.focus();
      }
    });
  };


  /* ==========================================================================
     3. COURSE TRACK SWITCHER (TABS)
     CLIENT: Switches between course tracks (Frontend, Backend, Fullstack).
     Uses CSS opacity and translateY transforms to provide zero-jank transitions.
     ========================================================================== */
  const initCourseTabs = () => {
    const tabButtons = document.querySelectorAll('.tabs__btn');
    const tabPanels = document.querySelectorAll('.tabs__panel');
    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTabId = button.getAttribute('data-tab');

        // Update Tab Buttons state
        tabButtons.forEach(btn => {
          const isActive = btn === button;
          btn.classList.toggle('tabs__btn--active', isActive);
          btn.setAttribute('aria-selected', isActive);
        });

        // Update Tab Panels with smooth transition
        tabPanels.forEach(panel => {
          if (panel.id === targetTabId) {
            panel.classList.add('tabs__panel--active');
          } else {
            panel.classList.remove('tabs__panel--active');
          }
        });
      });
    });
  };


  /* ==========================================================================
     4. SYLLABUS MODULE ACCORDION
     CLIENT: Expands/collapses week modules.
     Dynamically sets max-height based on scrollHeight for fluid CSS transitions.
     ========================================================================== */
  const initAccordion = () => {
    const accordionItems = document.querySelectorAll('.accordion__item');
    if (!accordionItems.length) return;

    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion__trigger');
      const body = item.querySelector('.accordion__body');
      if (!trigger || !body) return;

      // Set initial state for the first item if marked open
      if (trigger.getAttribute('aria-expanded') === 'true') {
        body.style.maxHeight = body.scrollHeight + 'px';
      }

      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Toggle state
        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = '0px';
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });

    // Recalculate expanded accordion heights if window resizes
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        accordionItems.forEach(item => {
          const trigger = item.querySelector('.accordion__trigger');
          const body = item.querySelector('.accordion__body');
          if (trigger && body && trigger.getAttribute('aria-expanded') === 'true') {
            body.style.maxHeight = body.scrollHeight + 'px';
          }
        });
      }, 100);
    });
  };


  /* ==========================================================================
     5. PRICING BILLING PERIOD TOGGLE (MONTHLY VS ANNUAL)
     CLIENT: Swaps between monthly and discounted annual pricing rates.
     Prices are retrieved from data-monthly and data-annual attributes in HTML.
     ========================================================================== */
  const initPricingToggle = () => {
    const billingToggle = document.getElementById('billingToggle');
    const labelMonthly = document.getElementById('label-monthly');
    const labelAnnual = document.getElementById('label-annual');
    const priceAmounts = document.querySelectorAll('.pricing-card__amount');
    const pricePeriods = document.querySelectorAll('.pricing-card__period');
    if (!billingToggle || !priceAmounts.length) return;

    const updatePricing = (isAnnual) => {
      billingToggle.setAttribute('aria-checked', isAnnual);
      if (labelMonthly) labelMonthly.classList.toggle('billing-toggle__label--active', !isAnnual);
      if (labelAnnual) labelAnnual.classList.toggle('billing-toggle__label--active', isAnnual);

      priceAmounts.forEach(amount => {
        // Quick subtle fade effect during price update
        amount.style.opacity = '0';
        amount.style.transform = 'scale(0.95)';

        setTimeout(() => {
          amount.textContent = isAnnual 
            ? amount.getAttribute('data-annual') 
            : amount.getAttribute('data-monthly');
          amount.style.opacity = '1';
          amount.style.transform = 'scale(1)';
        }, 120);
      });

      pricePeriods.forEach(period => {
        period.textContent = isAnnual ? '/mo (billed annually)' : '/month';
      });
    };

    billingToggle.addEventListener('click', () => {
      const isCurrentlyAnnual = billingToggle.getAttribute('aria-checked') === 'true';
      updatePricing(!isCurrentlyAnnual);
    });

    if (labelMonthly) {
      labelMonthly.addEventListener('click', () => updatePricing(false));
    }
    if (labelAnnual) {
      labelAnnual.addEventListener('click', () => updatePricing(true));
    }
  };


  /* ==========================================================================
     6. STICKY BOTTOM "ENROLL NOW" CTA BAR
     CLIENT: Monitors the Hero section. As soon as the hero leaves the screen,
     the sticky CTA bar slides smoothly up from the bottom.
     ========================================================================== */
  const initStickyCta = () => {
    const heroSection = document.getElementById('hero');
    const footerSection = document.getElementById('footer');
    const stickyCta = document.getElementById('stickyCta');
    if (!heroSection || !stickyCta) return;

    let isHeroVisible = true;
    let isFooterVisible = false;

    const updateVisibility = () => {
      // Show sticky CTA only when scrolled past the hero AND not inside the footer
      if (!isHeroVisible && !isFooterVisible) {
        stickyCta.classList.add('is-visible');
        stickyCta.setAttribute('aria-hidden', 'false');
      } else {
        stickyCta.classList.remove('is-visible');
        stickyCta.setAttribute('aria-hidden', 'true');
      }
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        updateVisibility();
      });
    }, {
      root: null,
      threshold: 0.1
    });

    heroObserver.observe(heroSection);

    if (footerSection) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isFooterVisible = entry.isIntersecting;
          updateVisibility();
        });
      }, {
        root: null,
        threshold: 0.05
      });

      footerObserver.observe(footerSection);
    }
  };


  /* ==========================================================================
     7. AOS (ANIMATE ON SCROLL) INITIALIZATION
     CLIENT: Configures the scroll animation triggers.
     - once: true (animates only on the first scroll down, saves CPU cycles)
     - duration: 600 (animation speed in ms)
     - easing: 'ease-out-cubic' (smooth premium feel)
     ========================================================================== */
  const initScrollAnimations = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 650,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: 'mobile' // Optional: can set to false if animations on mobile are desired
      });
    }
  };


  /* ==========================================================================
     EXECUTE MODULES
     ========================================================================== */
  initTheme();
  initMobileNav();
  initCourseTabs();
  initAccordion();
  initPricingToggle();
  initStickyCta();
  initScrollAnimations();

});
