# 🎓 DevMaster Pro —  Landing Page Template

A modern, high-converting, agency-grade landing page template built specifically for online courses, workshops, bootcamps, and digital academies.

---

##  1. Project Folder Structure

```
Course/
│
├── index.html              # Main webpage (all text, sections, badges & images)
├── README.md               # You are here! Complete step-by-step customization guide
│
├── css/
│   └── style.css           # Design tokens, colors, dark mode, layout & responsive styling
│
├── js/
│   └── script.js           # Interactive controller (Theme switcher, tabs, accordion, animations)
│
└── assets/                 # (Optional) Store your local custom media here
    ├── images/             # Custom course screenshots, instructor photos, logos
    └── icons/              # Custom brand SVG icons or graphics
```

> **Zero Setup Required:** You do not need Node.js, npm, Webpack, or any build tools. Simply double-click `index.html` to view it instantly in any modern web browser!

---

##  2. Customizing Colors, Fonts & Branding

All global design tokens are grouped at the very top of `css/style.css` inside the `:root` and `[data-theme="dark"]` selectors.

### Changing Brand Colors
Open `css/style.css` and edit the hex codes at lines **16–35**:

```css
:root {
  /* Change your primary brand color (Buttons, active tabs, highlights) */
  --color-primary: #6C47FF;         /* Replace with your brand HEX */
  --color-primary-hover: #5835e5;   /* Slightly darker version for hover */

  /* Change your accent color (Badges, special callouts) */
  --color-accent: #FF6B6B;          
  
  /* Background & Surface colors (Light Mode) */
  --color-bg: #F8F9FD;              /* Overall page background */
  --color-surface: #FFFFFF;         /* Cards, modals, containers */
}
```

### Changing Dark Mode Colors
To adjust how the page looks in Dark Mode, scroll slightly down to `[data-theme="dark"]` (lines **65–85** in `css/style.css`):

```css
[data-theme="dark"] {
  --color-primary: #8566FF;         /* Vibrant color for dark background */
  --color-bg: #0B0E14;              /* Deep dark background */
  --color-surface: #141923;         /* Card background */
  --color-text-main: #F1F5F9;       /* Light text */
}
```

### Changing Fonts
By default, the template loads **Poppins** (for bold titles) and **Inter** (for crisp, clean reading) from Google Fonts.

1. Pick your preferred fonts on [fonts.google.com](https://fonts.google.com/).
2. In `index.html` (around line **39**), update the Google Fonts `<link>` tag.
3. In `css/style.css` (lines **48–49**), update the font variables:
```css
--font-heading: 'Poppins', sans-serif;
--font-body: 'Inter', sans-serif;
```

---

##  3. Customizing Content & Text

Every section in `index.html` is preceded by an uppercase comment block starting with `<!-- CLIENT: ... -->` explaining what to edit.

### A. Course Title & Search Description (SEO)
In `index.html` lines **6–15**:
- Update `<title>` with your course name.
- Update `<meta name="description">` with a concise 1-2 sentence pitch for Google.

### B. Hero Section (First Impression)
Around lines **105–175** in `index.html`:
- **Enrollment Badge:** Modify ` Now Enrolling — Cohort 7 Starts Oct 1st`
- **Main Heading:** Change the text inside `<h1 class="hero__heading">`
- **Stats Counter:** Change numbers (e.g., `12K+`, `96%`, `4.9★`) and their labels.

### C. Course Switcher / Tracks
Around lines **245–395** in `index.html`:
- To rename tabs: change the text in `<button class="tabs__btn">`.
- To edit track syllabus & features: edit the corresponding `<div class="tabs__panel">`.
- *Note:* Make sure `data-tab="track-id"` on the button matches the `id="track-id"` on the panel!

### D. Syllabus Accordion (Week-by-Week)
Around lines **400–560** in `index.html`:
- Each module is wrapped in an `<div class="accordion__item">`.
- To add a new week/module: simply copy one entire `<div class="accordion__item">` block and paste it below. Update the module number (e.g., `06`) and lesson items.

### E. Instructor Bio & Credentials
Around lines **640–740** in `index.html`:
- Update the instructor name, title, bio paragraphs, and social links (replace `#` with real profile URLs).
- Update credentials in the `.instructor__credentials` block.

### F. Pricing & Billing Rates
Around lines **845–975** in `index.html`:
- The monthly vs. annual pricing is driven by simple HTML attributes.
- In each card, update:
  ```html
  <span class="pricing-card__amount" data-monthly="$99" data-annual="$59">$99</span>
  ```
  When visitors toggle the switch, the script automatically transitions between `data-monthly` and `data-annual`.

---

##  4. Replacing Images & Media

All placeholder images currently use high-resolution Unsplash URLs. You can easily substitute them with your own images:

1. Place your images inside the `assets/images/` folder (e.g., `instructor.jpg`, `dashboard-preview.png`).
2. Update the `src` attributes in `index.html`:

| Section | Location in `index.html` | Recommended Image Dimensions |
| :--- | :--- | :--- |
| **Hero Dashboard Preview** | `<img class="hero__card-image" ...>` | `600 × 380 px` |
| **Course Track Cards** | `<img class="track-card__image" ...>` | `520 × 340 px` |
| **Instructor Portrait** | `<img class="instructor__photo" ...>` | `300 × 300 px` (Square 1:1) |
| **Student Testimonial Avatars** | `<img class="testimonial-card__avatar" ...>` | `100 × 100 px` (Square 1:1) |

---

##  5. Managing & Customizing Animations

The template uses **AOS (Animate On Scroll)** combined with GPU-composited CSS transitions (`opacity` and `transform`) to guarantee butter-smooth 60fps performance without browser lag.

### Adjusting Animation Speed or Easing
Open `js/script.js` and locate `initScrollAnimations` around line **215**:

```javascript
AOS.init({
  duration: 650,          // Duration in milliseconds (e.g. 500 = faster, 800 = slower)
  easing: 'ease-out-cubic', // Smoothing curve
  once: true,             // true = animate once on scroll down; false = repeat on scroll up
  offset: 50,             // Pixel offset before animation triggers
  disable: 'mobile'       // Set to false if you want animations on small mobile screens
});
```

### Changing Animation Types on Elements
In `index.html`, any element with `data-aos="..."` can be customized:
- `data-aos="fade-up"` (Fade in moving upwards - default)
- `data-aos="fade-down"` (Fade in moving downwards)
- `data-aos="fade-left"` (Slide in from right)
- `data-aos="fade-right"` (Slide in from left)
- `data-aos="zoom-in"` (Subtle zoom scale)
- `data-aos-delay="200"` (Delays the animation by 200ms for staggered effects)

### How to Completely Disable Scroll Animations
If you prefer an instant, static view without any scroll effects:
1. Open `index.html`.
2. Delete line **25** (`<link rel="stylesheet" href="...aos.css" />`).
3. Delete line **1018** (`<script src="...aos.js"></script>`).

---

##  6. Connecting Enrollment & Payment Links

All "Enroll Now" and checkout buttons are ready for your checkout links (e.g., Stripe, Lemon Squeezy, Teachable, Kajabi, or Gumroad):

1. Search for `href="#pricing"` or `href="#"` across `index.html`.
2. Replace with your actual checkout or checkout page URL:
   ```html
   <!-- Example -->
   <a href="https://buy.stripe.com/your-checkout-link" class="btn btn--primary">Enroll Now</a>
   ```

---

##  7. Responsive Breakdown

The layout is built mobile-first and tested rigorously across standard breakpoints:
- **Mobile Phones:** `< 640px` (Streamlined single-column layout, touch-friendly tap targets, hamburger drawer)
- **Tablets:** `640px – 1023px` (2-column balanced grid layouts)
- **Desktops / Large Screens:** `≥ 1024px` (Full multi-column showcase, sticky desktop nav, side-by-side hero)

---

##  Quick Tips for Non-Technical Clients
- **Never delete opening or closing tags:** Always edit text *between* `>` and `<`.
- **Duplicate blocks safely:** If you want another testimonial or feature, simply copy an entire card block from `<!-- TESTIMONIAL ... -->` to `</div>` and paste it right below.
- **Preview as you edit:** Keep `index.html` open in your browser, make your text edits in a text editor (like VS Code or Notepad), save the file, and refresh your browser (`F5` or `Cmd+R`).
