/**
 * include.js
 * Fetches navbar.html and footer.html and injects them into
 * any page that has <div id="navbar-placeholder"> and
 * <div id="footer-placeholder">.
 *
 * After injection it marks the correct nav link as "active"
 * by comparing the current filename to each link's data-page attr.
 */

(function () {
  /**
   * Fetch an HTML snippet and inject it into a target element.
   * Returns a Promise that resolves when done.
   */
  function includeHTML(targetId, url) {
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load ' + url);
        return res.text();
      })
      .then(function (html) {
        var el = document.getElementById(targetId);
        if (el) el.innerHTML = html;
      })
      .catch(function (err) {
        console.warn('[include.js]', err.message);
      });
  }

  /**
   * Mark the nav link whose data-page matches the current page filename.
   * e.g.  /projects.html  →  data-page="projects"
   */
  function markActiveLink() {
    var path     = window.location.pathname;          // e.g. /projects.html
    var filename = path.split('/').pop();              // e.g. projects.html
    var page     = filename.replace('.html', '') || 'index'; // e.g. projects

    var links = document.querySelectorAll('[data-page]');
    links.forEach(function (link) {
      if (link.getAttribute('data-page') === page) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Mobile hamburger toggle — called by the button in navbar.html.
   * Exposed on window so the inline onclick can reach it.
   */
  window.toggleMobileNav = function () {
    var menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('open');
  };

  /* Bootstrap */
  var root = '/components/'; // adjust if your folder depth differs

  Promise.all([
    includeHTML('navbar-placeholder', root + 'navbar.html'),
    includeHTML('footer-placeholder', root + 'footer.html'),
  ]).then(markActiveLink);
})();