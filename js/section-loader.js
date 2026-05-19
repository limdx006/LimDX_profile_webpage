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
    
    // After loading, enable smooth scroll for nav links
    enableSmoothScroll();
    
    // Set up scroll reveal observer
    setupScrollReveal();
  }

  // Smooth scroll when clicking any anchor link that points to an id
  function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, null, targetId);
        }
      });
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
          // Optional: keep observing? If you want to remove after first reveal:
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,        // trigger when 20% of the section is visible
      rootMargin: '0px 0px -80px 0px' // a little offset to avoid navbar overlap
    });

    sections.forEach(section => observer.observe(section));
  }

  // Start loading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSections);
  } else {
    loadAllSections();
  }
})();