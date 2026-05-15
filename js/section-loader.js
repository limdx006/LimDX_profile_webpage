// section-loader.js
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
          // Optionally update URL hash without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // Start loading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSections);
  } else {
    loadAllSections();
  }
})();