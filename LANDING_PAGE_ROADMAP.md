# Landing Page Roadmap

Improvements for the SkinXray web landing page (`src/pages/LandingNew/LandingNew.jsx`), prioritized for when time allows.

**Last updated:** June 8, 2025

---

## Completed

- [x] Wire up footer legal/company links (About, Terms, HIPAA, Medical Disclaimer)
- [x] Add early medical disclaimer below trust badges
- [x] Reorder sections for conversion: Pricing → Reviews → FAQ

---

## High priority

### Hero image
**Problem:** Current hero (`hero2.png`) shows a clinical rash photo, which can feel alarming rather than product-focused.

**Action:**
- Replace with app/product UI mockup (upload → analysis → report flow)
- Or phone + web side-by-side screenshot
- Or abstract medical-tech illustration

**Files:** `src/assets/images/hero2.png`, `LandingNew.jsx`

---

### Trust claims — substantiate or soften
**Problem:** Unverified claims ("HIPAA Compliant", "50k+ Analyses", "4.9/5 Rating", "95%+ accuracy", "10M+ images") create legal and credibility risk.

**Action:**
- Link claims to evidence (compliance page, App Store ratings, published studies), or
- Rephrase to softer, honest language until data is available

**Files:** `LandingNew.jsx` (trust bar + features section)

---

### Reviews section
**Problem:** Placeholder testimonials ("Sarah M.", "James K.") read as fabricated.

**Action:**
- Replace with real App Store / Google Play reviews, or
- Remove section until authentic social proof exists

**Files:** `LandingNew.jsx` (reviews array)

---

### Product preview / demo section
**Problem:** Users sign up without seeing what an analysis report looks like.

**Action:**
- Add "Sample report" section between Features and Pricing
- Show screenshot or interactive mock of analysis output
- Optional: short demo video

**Files:** New section in `LandingNew.jsx`, new assets

---

## Medium priority

### Hero CTA — secondary action
**Problem:** Single "Get Started" path forces signup before users understand value.

**Action (when ready):**
- Add secondary CTA: "See how it works" (smooth scroll to `#how-it-works`)
- Or "Try a free scan" (guest flow or light signup — requires product work)

**Files:** `LandingNew.jsx`, possibly auth/scan flow

---

### Social links
**Problem:** Twitter, Instagram, LinkedIn footer links point to `#`.

**Action:** Add real profile URLs or hide icons until accounts exist.

**Files:** `LandingNew.jsx`

---

### iOS App Store button
**Problem:** App Store badge is disabled with no explanation.

**Action:** Show "Coming soon" label or hide until the iOS app ships.

**Files:** `LandingNew.jsx`

---

### Brand naming consistency
**Problem:** "SkinXray", "Skinxray", and "skinxray" appear in different places.

**Action:** Pick one canonical brand spelling and apply across landing page, meta tags, and legal pages.

**Files:** `LandingNew.jsx`, legal pages, `index.html`

---

### Plan naming alignment
**Problem:** `handleSignUp('premium')` uses `premium` but Pricing component uses `expert-care`.

**Action:** Standardize on `expert-care` everywhere.

**Files:** `LandingNew.jsx`, `Login.jsx`

---

### Privacy messaging alignment
**Problem:** Features say images are "never stored permanently"; FAQ says data is "stored securely".

**Action:** Align copy with actual data retention policy.

**Files:** `LandingNew.jsx`, `FAQ.jsx`, `PrivacyPolicy.jsx`

---

## Lower priority

### SEO and sharing
- Add Open Graph and Twitter Card meta tags to landing page
- Add structured data (Organization, SoftwareApplication)
- Add canonical URL

**Files:** `LandingNew.jsx` (Helmet block)

---

### Performance
- Replace Google Fonts `@import` in styled-components with preload or self-hosted fonts
- Lazy-load below-fold images

**Files:** `LandingNew.style.js`, `index.html`

---

### Navigation polish
- Use React Router `Link` for Blog nav item (avoid full page reload)
- Make logo click scroll to top / navigate home
- Consider reducing nav item count on smaller desktops

**Files:** `LandingNew.jsx`

---

### Code maintainability
- Extract inline SVG icons to shared icon components or `ds` icons
- Split `LandingNew.jsx` into section components (Hero, Trust, Reviews, etc.)

**Files:** `LandingNew.jsx`, new component files

---

## Suggested implementation order

1. Hero image swap
2. Product preview section
3. Trust claims review
4. Real reviews or remove section
5. Hero secondary CTA (when product supports it)
6. SEO meta tags
7. Remaining polish items

---

## Notes

- Legal pages (`/about`, `/terms-of-service`, `/hipaa-compliance`, `/medical-disclaimer`) are starter content. Have legal counsel review before production marketing.
- For "Try a free scan" without signup, backend and auth flows may need a guest-scan endpoint or rate-limited anonymous access.
