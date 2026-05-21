# Lim Dong Xian — Portfolio Website

A personal portfolio website with a dark glitch-aesthetic design, smooth scroll reveals, and partial HTML includes. Built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

---

## Project Structure

```
/
├── index.html                  # Main entry point (navbar, footer, section shells)
│
├── css/
│   ├── tokens.css              # Design tokens: colours, fonts, spacing variables
│   ├── base.css                # Shared styles: reset, navbar, footer
│   └── index.css               # Page-specific styles: hero, timeline, cards, etc.
│
├── js/
│   └── section-loader.js       # Fetches HTML partials and wires up interactions
│
├── partials/
│   ├── about.html              # Hero section with glitch name animation
│   ├── education.html          # Timeline: JCU, Southern Uni, SPM, UPSR
│   ├── experience.html         # Work history timeline
│   ├── projects.html           # Personal & university project cards
│   ├── skills.html             # Skill tag cards (3 categories)
│   └── contact.html            # Contact info + message form
│
├── images/
│   ├── JCU.jpg
│   ├── Southern_Uni.jpg
│   ├── Seri_Omega.png
│   └── SJKC_Foon_Yew_2.jpeg
│
└── assets/
    └── LimDongXian_Resume.pdf  # Downloadable resume
```

> **Note:** The CSS files live under `/css/`, partials under `/partials/`, and JS under `/js/` on the server. The paths in the HTML files reflect this structure.

---

## Features

- **Glitch hero animation** — CSS `clip`-based glitch effect on the name using `::before` / `::after` pseudo-elements and `@keyframes`.
- **Partial HTML loading** — `section-loader.js` fetches each section's HTML via `fetch()` and injects it into `<section data-src="...">` shells, keeping `index.html` clean.
- **Scroll reveal** — `IntersectionObserver` adds an `.in-view` class to each section when it enters the viewport, triggering a fade-and-slide-up transition.
- **Smooth scroll** — Custom easing function (`ease-in-out`) overrides the browser default for anchor link navigation, accounting for the fixed navbar height.
- **Expandable course lists** — Each education timeline entry has a toggle button that shows/hides the full subject list.
- **Responsive layout** — Two-column hero collapses to single column on ≤ 860 px; navbar collapses to a hamburger menu on ≤ 700 px.
- **Glassmorphism navbar** — Fixed top bar with `backdrop-filter: blur` and a subtle dark overlay.
- **Active nav link highlight** — Gradient underline on the active section link.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Markup     | HTML5 (semantic, partial includes)              |
| Styling    | CSS3 (custom properties, Flexbox, Grid, keyframes) |
| Scripting  | Vanilla JavaScript (ES2017+, async/await, IntersectionObserver) |
| Fonts      | Google Fonts — Poppins, Inter, Lora             |
| Icons      | Font Awesome 6.5                                |
| Hosting    | Any static file server (no build step needed)  |

---

## Getting Started

### Prerequisites

Any HTTP server that can serve static files. A few options:

```bash
# Python (built-in)
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
# Use the "Live Server" extension
```

> **Important:** The site uses `fetch()` to load HTML partials, so it **must** be served over HTTP/HTTPS. Opening `index.html` directly as a `file://` URL will cause the partials to fail to load due to CORS restrictions.

### Running Locally

1. Clone or download the repository.
2. Place all files in their correct directories (see Project Structure above).
3. Start a local server from the project root.
4. Open `http://localhost:8080` in your browser.

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

Change values here and the entire site retheming follows automatically.

---

## Sections

| Section    | File                      | Description                                                  |
|------------|---------------------------|--------------------------------------------------------------|
| About      | `partials/about.html`     | Hero with glitch name, degree title, bio, and info card      |
| Education  | `partials/education.html` | Four entries (JCU BIT, Southern Uni Diploma, SPM, UPSR)     |
| Experience | `partials/experience.html`| Customer Service / Operations role at The Sushi Shop         |
| Projects   | `partials/projects.html`  | Personal projects + university assignments with tech tags     |
| Skills     | `partials/skills.html`    | Three skill cards: Core Competencies, Programming, 3D Design |
| Contact    | `partials/contact.html`   | Email / GitHub / LinkedIn info + contact form                 |

---

## Browser Support

Requires a modern browser with support for:

- CSS Custom Properties
- `backdrop-filter`
- `IntersectionObserver`
- `fetch` API
- `async/await`

Covers all major evergreen browsers (Chrome, Firefox, Safari, Edge).

---

## License

This project is personal portfolio work. Feel free to use it as inspiration, but please do not republish it as your own.
