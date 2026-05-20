(function() {
  // Load a single partial into a section element
  async function loadSection(sectionEl) {
    const url = sectionEl.getAttribute('data-src');
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      sectionEl.innerHTML = html;
    } catch (err) {
      console.error(`Failed to load ${url}:`, err);
      sectionEl.innerHTML = `<p class="error">❌ Could not load content.</p>`;
    }
  }

  // Load all sections with data-src
  async function loadAllSections() {
    const sections = document.querySelectorAll('section.content-section[data-src]');
    const promises = Array.from(sections).map(section => loadSection(section));
    await Promise.all(promises);
    
    // Set up scroll reveal observer
    setupScrollReveal();
    
    // Set up course expand buttons
    setupCourseExpand();
  }

  // Set up expand/collapse for course lists in education section
  function setupCourseExpand() {
    document.querySelectorAll('.expand-courses-btn').forEach(button => {
      button.addEventListener('click', function() {
        const container = this.closest('.courses-container');
        if (container) {
          container.classList.toggle('expanded');
        }
      });
    });
  }

  // Smooth scroll when clicking any anchor link that points to an id
  function enableSmoothScroll() {
    function smoothScrollToElement(targetElement) {
      const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
      const startY = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = targetElement.getBoundingClientRect().top + startY - headerOffset - 10;
      const duration = 1000;
      const startTime = performance.now();

      function ease(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = ease(progress);
        window.scrollTo(0, Math.round(startY + (targetY - startY) * eased));
        if (elapsed < duration) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }

    document.addEventListener('click', function(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        smoothScrollToElement(targetElement);
        history.pushState(null, null, targetId);
      }
    });
  }

  // Intersection Observer: add 'in-view' class when section enters viewport
  function setupScrollReveal() {
    const sections = document.querySelectorAll('.content-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,        // trigger when 20% of the section is visible
      rootMargin: '0px 0px -80px 0px' // a little offset to avoid navbar overlap
    });

    sections.forEach(section => observer.observe(section));
  }

  // Enable smooth scrolling immediately, even while partial sections are still loading
  enableSmoothScroll();

  // Start loading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSections);
  } else {
    loadAllSections();
  }
})();