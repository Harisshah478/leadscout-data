# LeadScout Data — Personal Website

A static landing page for a personal data-extraction / lead-sourcing service. Pulls together business & contact data (name, title, phone, company, industry, keyword, company number, location, LinkedIn URL, company URL, Google Maps listing data) from Google Maps, LinkedIn, Apollo.io, ZoomInfo, Clay and other sales intelligence tools, and presents it as a service offering — dark agency-style theme, with a free-trial lead capture form.

## Structure

```
index.html           Home (hero, free-trial form, stats, sources, dashboard preview, process, CTA)
about.html            About
services.html         Services & pricing
portfolio.html        Samples (illustrative example datasets)
contact.html          Contact
css/styles.css        All styling (shared across every page)
js/animations.js      Scroll-reveal, entrance animation, and stat count-up (vanilla JS, no dependencies)
assets/favicon.svg    Site favicon
robots.txt            Crawler rules + sitemap reference
sitemap.xml           Page list for search engines
design-mockup/        Editable design canvas mockups explored during the build (not all reflect the live site)
CONVERSATION_LOG.md   Running log of decisions made while building this site
```

## Running locally

This is a plain static site — no build step. Just open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
```

## Status

- [x] Multi-page static site built (Home, About, Services, Samples, Contact)
- [x] Real contact details wired in (email, WhatsApp, LinkedIn)
- [x] Dark agency-style theme (inspired by paidmediaguys.com)
- [x] Scroll/entrance animations, stat count-up
- [x] SEO: per-page meta titles/descriptions, Open Graph + Twitter cards, canonical links, JSON-LD structured data (homepage), `robots.txt`, `sitemap.xml`
- [x] Free-trial lead capture form ("Get 100 Free Verified Contacts") on the homepage
- [ ] **Free-trial form needs a real Formspree endpoint** — currently `action="https://formspree.io/f/YOUR_FORM_ID"` in `index.html`. Sign up at formspree.io, create a form, and swap in the real endpoint URL, or the form won't actually deliver submissions.
- [ ] `robots.txt`, `sitemap.xml`, and every page's canonical/OG URL use a **placeholder domain** (`https://leadscoutdata.com`) — update all of these once the real domain is purchased.
- [ ] Facebook contact link intentionally removed (was a placeholder, Haris asked to drop it)
- [ ] Domain purchased
- [ ] Hosting connected (deliberately last — decide once the site content is finalized)
