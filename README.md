# LeadScout Data — Personal Website

A static landing page for a personal data-extraction / lead-sourcing service. Pulls together business & contact data (name, title, phone, company, industry, keyword, company number, location, LinkedIn URL, company URL, Facebook, Google Maps listing data) and presents it as a service offering.

## Structure

```
index.html          Main landing page
css/styles.css       All styling
design-mockup/       Editable design canvas (source mockup, published as a Claude Artifact)
CONVERSATION_LOG.md  Running log of decisions made while building this site
```

## Running locally

This is a plain static site — no build step. Just open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Status

- [x] Domain name ideas drafted
- [x] Landing page design mockup drafted (Claude Design canvas)
- [x] Static HTML/CSS site built from the mockup
- [ ] Domain purchased
- [ ] Real contact details (email/phone/LinkedIn/Facebook) filled in — currently placeholders in `index.html`
- [ ] Hosting connected (Cloudflare Pages / Netlify / GitHub Pages) and domain pointed at it
