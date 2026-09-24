/**
 * Mohd Umar Farooq — Portfolio & Scroll Animation Engine
 * Fast initialization, smooth frame scrubbing, and scroll-reveal.
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 240;
  const FRAME_PREFIX = 'png/ezgif-frame-';
  const FRAME_EXT = '.png';
  const LERP_FACTOR = 0.15; // Smooth momentum factor

  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loader-progress');
  const progressBar = document.getElementById('scroll-progress-bar');

  const images = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let currentFrame = 0;
  let targetFrame = 0;
  let lastDrawnFrame = -1;
  let isReady = false;

  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;

  // Format 1-based index (001 to 240)
  function getFramePath(index) {
    const padded = String(index).padStart(3, '0');
    return `${FRAME_PREFIX}${padded}${FRAME_EXT}`;
  }

  // Set up crisp HiDPI canvas resolution
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    canvas.width = Math.round(viewportWidth * dpr);
    canvas.height = Math.round(viewportHeight * dpr);
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if ('filter' in ctx) {
      ctx.filter = 'contrast(1.06) brightness(1.02) saturate(1.03)';
    }

    lastDrawnFrame = -1; // Force repaint
    const activeFrame = Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES - 1);
    drawFrame(activeFrame);
  }

  // Nearest available frame lookup
  function getAvailableFrame(index) {
    if (images[index] && images[index].complete && images[index].naturalWidth > 0) {
      return images[index];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && images[prev]?.complete && images[prev]?.naturalWidth > 0) {
        return images[prev];
      }
      const next = index + offset;
      if (next < TOTAL_FRAMES && images[next]?.complete && images[next]?.naturalWidth > 0) {
        return images[next];
      }
    }
    return null;
  }

  // Draw frame centered & crisp without subpixel blur
  function drawFrame(frameIdx) {
    const img = getAvailableFrame(frameIdx);
    if (!img) return;

    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, viewportWidth, viewportHeight);

    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;
    const imgRatio = imgWidth / imgHeight;

    const drawHeight = viewportHeight;
    const drawWidth = viewportHeight * imgRatio;
    const offsetX = Math.round((viewportWidth - drawWidth) / 2);
    const offsetY = 0;

    ctx.drawImage(img, offsetX, offsetY, Math.round(drawWidth), Math.round(drawHeight));
    lastDrawnFrame = frameIdx;
  }

  // Calculate target frame from total page scroll & update top progress bar
  function updateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    targetFrame = progress * (TOTAL_FRAMES - 1);

    if (progressBar) {
      progressBar.style.width = `${(progress * 100).toFixed(1)}%`;
    }
  }

  // Silky 60/120fps render loop
  function renderLoop() {
    const delta = targetFrame - currentFrame;

    if (Math.abs(delta) > 0.005) {
      currentFrame += delta * LERP_FACTOR;
    } else {
      currentFrame = targetFrame;
    }

    const frameToDraw = Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES - 1);
    if (frameToDraw !== lastDrawnFrame) {
      drawFrame(frameToDraw);
    }

    requestAnimationFrame(renderLoop);
  }

  // Preload all 240 frames in parallel background
  function preloadImages() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i + 1);

      img.onload = () => {
        images[i] = img;
        loadedCount++;

        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        if (loaderProgress) {
          loaderProgress.textContent = `Loading Experience ${percent}%`;
        }

        if (i === 0) {
          drawFrame(0);
          revealPageContent();
        }

        if (loadedCount === TOTAL_FRAMES) {
          revealPageContent();
        }
      };

      img.onerror = () => {
        loadedCount++;
      };
    }
  }

  function revealPageContent() {
    if (isReady) return;
    isReady = true;

    if (loader) {
      loader.classList.add('hidden');
    }

    updateScrollProgress();
    currentFrame = targetFrame;
    drawFrame(Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES - 1));
    initRevealAnimations();
    initTypewriter();
    initMetricsCounters();
    init3DTilt();
    initSpotlight();
    initSkillsFilter();
    initCopyEmail();
    initScrollspy();
  }

  // Typewriter Effect
  function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const phrases = [
      'AI/ML Engineer',
      'Building Scalable AI Systems',
      'Full-Stack Developer',
      'Open Source Contributor',
      'Machine Learning Enthusiast',
      'Data Scientist & AI Specialist',
      'Co-Founder @ Octor AI'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        el.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before next word
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // Metrics Counter Animation
  function initMetricsCounters() {
    const metricCards = document.querySelectorAll('.metrics-grid');
    if (!metricCards.length) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateNumbers();
        }
      });
    }, { threshold: 0.2 });

    metricCards.forEach(grid => observer.observe(grid));

    function animateNumbers() {
      const numbers = document.querySelectorAll('.metric-number');
      numbers.forEach(numEl => {
        const target = parseFloat(numEl.getAttribute('data-target')) || 0;
        const prefix = numEl.getAttribute('data-prefix') || '';
        const suffix = numEl.getAttribute('data-suffix') || '';
        const isDecimal = numEl.getAttribute('data-decimal') === 'true';

        let start = 0;
        const duration = 1600;
        const steps = 40;
        const stepTime = duration / steps;
        const increment = target / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          start += increment;
          if (currentStep >= steps) {
            start = target;
            clearInterval(timer);
          }
          const formatted = isDecimal ? start.toFixed(2) : Math.floor(start);
          numEl.textContent = `${prefix}${formatted}${suffix}`;
        }, stepTime);
      });
    }
  }

  // 3D Tilt Effect on Hover
  function init3DTilt() {
    const tiltCards = document.querySelectorAll('.interactive-tilt');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // Max ±6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }

  // Cursor Spotlight Follower
  function initSpotlight() {
    const spotlight = document.getElementById('cursor-spotlight');
    if (!spotlight) return;

    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  // Skills Category Filter Bar
  function initSkillsFilter() {
    const filterBtns = document.querySelectorAll('.skills-filter-bar .filter-btn');
    const skillCards = document.querySelectorAll('.skills-grid .skill-category');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden-skill');
          } else {
            card.classList.add('hidden-skill');
          }
        });
      });
    });
  }

  // Copy Email to Clipboard with Toast Notification
  function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    if (!copyBtn) return;

    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'reach.mdumar@gmail.com';

      navigator.clipboard.writeText(email).then(() => {
        if (toast) {
          if (toastMsg) toastMsg.textContent = `Copied ${email} to clipboard!`;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
      }).catch(err => {
        console.error('Failed to copy email: ', err);
      });
    });
  }

  // Scrollspy Navbar Active Link Highlighting
  function initScrollspy() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // IntersectionObserver for reveal animations
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // Smooth Navigation Links Scroll
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Event Listeners
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Init
  resizeCanvas();
  updateScrollProgress();
  preloadImages();
  requestAnimationFrame(renderLoop);

  // Instant safety fallback: reveal page immediately after 400ms so content is never hidden
  setTimeout(() => {
    revealPageContent();
  }, 400);

})();

