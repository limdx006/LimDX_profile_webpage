# Lim Dong Xian — Portfolio Website

A personal portfolio website with a dark glitch-inspired hero section, smooth scrolling, partial HTML includes, and a responsive hamburger navigation menu. Built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

---

## Live Demo

- GitHub Pages: https://limdx006.github.io/LimDX_profile_webpage/
- Netlify: https://limdx-profile.netlify.app/

---

## Project Structure

```
/
├── index.html                  # Main entry point (navbar, footer, section shells)
├── css/
│   ├── tokens.css              # Design tokens: colours, fonts, spacing variables
│   ├── base.css                # Shared layout, navbar, footer, utilities
│   ├── index.css               # Page-specific styles: hero, cards, sections, responsiveness
│   └── kaggle.css              # Special style file for Kaggle html (converted from ipynb)
├── js/
│   └── section-loader.js       # Loads partial HTML sections, scroll reveal, smooth scroll, expand toggles
├── partials/
│   ├── about.html              # Hero section, contact links, resume card
│   ├── education.html          # Education timeline with expandable course lists
│   ├── experience.html         # Work experience timeline
│   ├── projects.html           # Personal and university project cards
│   ├── skills.html             # Skill cards for IT, programming, and design tools
│   └── contact.html            # Contact info, social links, and messaging section
├── assets/
│   ├── kaggle/DL/tasks         # Kaggle notebooks and HTML previews
│   ├── pdf/                    # Preview pdf for report documentation
│   └── readme/                 # Preview pages for assignment/project documentation
│       ├── DM-assessment1.html
│       ├── DL-assessment2.html
│       ├── keylogger.html
│       ├── nutrient-tracker.html
│       ├── recipe-tracker.html
│       └── template.html
├── images/                      # Project and education image assets
└── .github/workflows/ci.yml     # GitHub Actions deployment workflow
```

> **Note:** The site loads section content from `partials/*.html` using `fetch()` in `js/section-loader.js`, so the project must be served over HTTP/HTTPS rather than opened directly from `file://`.

---

## Features

- **HTML partial loading** — `section-loader.js` fetches partial content for each section and injects it into the page dynamically.
- **Smooth scrolling** — Custom anchor scrolling with easing and fixed-navbar offset.
- **Scroll reveal** — `IntersectionObserver` adds `.in-view` classes for smooth section animations.
- **Responsive navigation** — Desktop nav links plus a mobile hamburger menu for smaller screens.
- **Expandable education lists** — Course details can be expanded or collapsed in the education section.
- **Live resume download** — Resume PDF is available from `assets/pdf/LimDongXian_Resume.pdf`.
- **Modern visual style** — Dark theme with glassmorphism navbar, accent colours, and clean section cards.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Markup     | HTML5 (semantic structure, partial includes)     |
| Styling    | CSS3 (custom properties, Flexbox, Grid, keyframes) |
| Scripting  | Vanilla JavaScript (async/await, IntersectionObserver, fetch) |
| Hosting    | Static site hosting (GitHub Pages / Netlify)    |

---

## Getting Started

### Prerequisites

A simple static file server is required because the site loads partial HTML through `fetch()`.

```bash
# Python (built-in)
python -m http.server 8080

# Node.js (npx)
npx serve .
```

### Run Locally

1. Clone or download the repository.
2. Open a terminal in the project root.
3. Start a local HTTP server.
4. Visit `http://localhost:8080` in your browser.

---

## Customisation

All visual tokens (colours, fonts, spacing) are defined in one place:

**`css/tokens.css`**

```css
:root {
  --clr-bg:       #07080f;      /* page background */
  --clr-surface:  #121425;      /* card / navbar background */
  --clr-accent1:  #8263ff;      /* purple accent */
  --clr-accent2:  #38bdf8;      /* sky-blue accent */
  --clr-text:     #e8eaf0;      /* primary text */
  --clr-muted:    #6b7280;      /* secondary / muted text */
  --font-display: 'Poppins', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-name:    'Lora', serif;
}
```

Adjust these values to retheme the site globally.

---

## Sections

| Section    | File                      | Description                                                  |
|------------|---------------------------|--------------------------------------------------------------|
| About      | `partials/about.html`     | Glitch hero, summary, contact links, and resume access       |
| Education  | `partials/education.html` | Education timeline and expandable course details            |
| Experience | `partials/experience.html`| Work history and role summary                                |
| Projects   | `partials/projects.html`  | Personal projects and university assignments                 |
| Skills     | `partials/skills.html`    | Skills and tools grouped by IT and design categories         |
| Contact    | `partials/contact.html`   | Email, LinkedIn, GitHub links, and contact prompts           |

---

## Browser Support

Works best in modern browsers that support:

- CSS Custom Properties
- `backdrop-filter`
- `IntersectionObserver`
- `fetch`
- `async/await`

---

## License

Personal portfolio work. Feel free to use it for inspiration, but do not republish it as your own.
