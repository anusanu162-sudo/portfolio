# Anu M — Portfolio

A single-page portfolio built with plain HTML, CSS and JavaScript. No build step, no frameworks,
no npm install — open `index.html` and it runs.

**Live site:** https://anusanu162-sudo.github.io/portfolio/
**Repository:** https://github.com/anusanu162-sudo/portfolio

## Files

```text
portfolio/
├── index.html                    all the content and markup
├── styles.css                    design system, layout, responsive rules, animations
├── script.js                     scroll reveals, counters, typing effect, menu, copy-email
└── assets/
    ├── profile.jpg               your photo (used in the hero)
    ├── Anu-M-Resume.pdf          the file the "Resume" buttons download
    └── Anu-M-Resume.docx         editable source of that resume (not linked from the site)
```

## Open it

- Double-click `index.html`, **or**
- Right-click → *Open with* → Chrome / Edge.

To serve it locally instead (recommended if you later add a contact form):

```bash
cd portfolio
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Edit the content

| What you want to change | Where |
|---|---|
| Name, intro, stats, sections | `index.html` |
| Photo | replace `assets/profile.jpg` (keep the same file name) |
| Resume PDF | replace `assets/Anu-M-Resume.pdf` |
| Colours, fonts, spacing | the `:root` block at the top of `styles.css` |
| Section order | move the `<section>` blocks inside `<main>` |

All text was taken from `anu last resume (1).pdf`. Nothing was invented — no fake dates,
employers, metrics or links.

## Links wired in

- GitHub — https://github.com/anusanu162-sudo
- LinkedIn — https://linkedin.com/in/anu-sanu-sheeba254363331
- Email — anusanu162@gmail.com
- Phone — +91 76958 78528
- Project repos — django-blog, accessibility-auditor, hate-speech-detector
- The grievance system is labelled *Final Year Project* and has no repo link, because the
  resume does not list one. Add a link once the repository is public.

## Deploy (free)

**GitHub Pages**

1. Create a repository, for example `portfolio`.
2. Upload these files (keep `index.html` at the root, `assets/` beside it).
3. Repo → *Settings* → *Pages* → Source: `Deploy from a branch` → branch `main`, folder `/ (root)`.
4. Your site appears at `https://anusanu162-sudo.github.io/portfolio/`.

**Netlify / Vercel** — drag the `portfolio` folder onto the dashboard; no configuration needed.

## Accessibility & performance notes

- Checked with axe-core (WCAG 2.1 A/AA + best practice): **0 violations**.
- Keyboard navigable, visible focus rings, skip link, semantic headings.
- Honour `prefers-reduced-motion` — all animation stops.
- No external JavaScript; only Google Fonts is external, with system-font fallbacks.
- Responsive from 320 px up; no horizontal scrolling at any width.
