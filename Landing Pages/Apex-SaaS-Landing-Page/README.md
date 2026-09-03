# Apex SaaS Landing Page

A responsive single-page HTML template for SaaS products and digital offerings. It uses locally compiled Tailwind CSS and local Lucide icons, so the included `index.html` opens without a Node.js install or an external Tailwind CDN.

## What's included

- `index.html` — the complete landing page.
- `assets/css/style.min.css` — the compiled Tailwind CSS used by the page.
- `assets/js/lucide.min.js` — Lucide v0.469.0 icon library used by the page.
- `src/input.css` — Tailwind source stylesheet.
- `tailwind.config.js` — color and typography configuration used for the build.
- `LICENSES.md` — third-party notices for Lucide and Tailwind CSS.

## Quick start

1. Extract the ZIP file.
2. Open `index.html` in a browser to preview the template.
3. Edit `index.html` in your preferred code editor.
4. Upload the complete extracted folder to any static web host when ready.

Keep the `assets` folder beside `index.html`; the page relies on its local CSS and icon files.

## Customization

Search for `CUSTOMIZE` in `index.html` before publishing. In particular, replace:

- `example.com` in canonical, Open Graph, and Twitter URL metadata.
- Placeholder checkout links and the `#` Privacy Policy and Terms links.
- Sample announcement, pricing plans, pricing copy, and refund-policy text.
- Example brand logos, ratings, testimonials, customer names, and roles with content you are authorized to use.

The sample pricing cards are visual examples only. They do not represent included Figma files, extra page variants, consultations, support services, or any license terms. Define the plans, prices, policies, and usage rights that apply to your own offer.

## Rebuilding Tailwind CSS

The package is ready to use as-is; rebuilding is optional. If you use a local Tailwind CLI, rebuild from the project folder with equivalent settings:

```text
tailwindcss -i ./src/input.css -o ./assets/css/style.min.css --minify
```

The compiled stylesheet currently included in `assets/css/style.min.css` was built with Tailwind CSS v3.4.17.

## Deployment

This is a static site. Upload all files while preserving the directory structure. Configure your production domain, legal-page URLs, and any analytics or payment integrations separately.

## Browser support

The template uses modern HTML and CSS, including native `<details>` elements for the FAQ. Test your final customized site in the browsers and screen sizes relevant to your audience.

## Credits and notices

This package includes third-party software under their respective licenses:

- Lucide v0.469.0 — ISC License
- Tailwind CSS v3.4.17 — MIT License

See `LICENSES.md` for the complete notices. Your use of this template itself is governed by the license or terms supplied by its seller.
