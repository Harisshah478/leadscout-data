# LeadScout Data — Personal Website

A static landing page for a personal data-extraction / lead-sourcing service. Pulls together business & contact data (name, title, phone, company, industry, keyword, company number, location, LinkedIn URL, company URL, Facebook, Google Maps listing data) and presents it as a service offering.

## Structure

```
index.html           Home
about.html            About
services.html         Services & pricing
portfolio.html        Samples (illustrative example datasets)
contact.html          Contact
css/styles.css        All styling (shared across every page)
design-mockup/        Editable design canvas (source mockup, published as a Claude Artifact)
CONVERSATION_LOG.md   Running log of decisions made while building this site
```

## Running locally

This is a plain static site — no build step. Just open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
```

## Status

- [x] Domain name ideas drafted
- [x] Landing page design mockup drafted (Claude Design canvas)
- [x] Multi-page static site built (Home, About, Services, Samples, Contact)
- [ ] Real contact details (email/phone/WhatsApp/LinkedIn/Facebook) filled in — currently placeholders across the footer and `contact.html`
- [ ] Domain purchased
- [ ] Hosting connected (deliberately last — decide once the site content is finalized)
