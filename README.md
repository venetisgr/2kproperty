# 2k@property — new website

Redesign of [2kproperty.gr](https://www.2kproperty.gr/) — engineering & property services office in Arta, Greece.

A fast, dependency-free static site (HTML + CSS + vanilla JS). Upload the folder to any web host or GitHub Pages.

## What's inside

```
index.html        Single page: hero, quick "what do you need?" finder, services, process, projects, team, contact
css/styles.css    All styles (mobile-first responsive, no framework)
js/main.js        Menu, Greek/English toggle, project gallery lightbox, filters, form validation
assets/img/       Logo, favicon, optimised WebP project photos (full + "-sm" thumbnails)
```

## Features

- **Quick finder** – 8 most common jobs (topographic survey, transfer certificate, EPC, legalisation, permits…). One tap pre-fills the contact form.
- **Click-to-call / email / directions** everywhere, plus a sticky action bar on mobile.
- **Greek / English** toggle (remembers the visitor's choice).
- **Services** as collapsible panels instead of long walls of text.
- **Project gallery** with filters, specs and a swipeable lightbox.
- **Contact form** with friendly validation and a subject selector, plus embedded Google map.
- **SEO**: meta description, Open Graph, `schema.org` LocalBusiness data, descriptive alt text.
- **Performance**: ~13 requests / ~450 KB on first load (old site: ~39 requests / ~2.2 MB).
- **Accessibility**: semantic HTML, keyboard navigation, skip link, visible focus, reduced-motion support.

## Editing content

- Greek text lives directly in `index.html`. English translations are in the `EN` object at the top of `js/main.js`, keyed by each element's `data-i18n` attribute.
- Projects: add photos to `assets/img/projects/<id>/` (`name.webp` + `name-sm.webp`), add a card in `index.html` and an entry in `PROJECTS` in `js/main.js`.

## Contact form

The form currently validates input and opens the visitor's email app with a pre-filled message to `info@2kproperty.gr` (works on any host, no server needed). To receive submissions directly, point it at a form service (Formspree, Netlify Forms, etc.) or a small PHP endpoint on the existing hosting.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
