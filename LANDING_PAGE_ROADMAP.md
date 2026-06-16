# Landing Page Roadmap

Improvements for the SkinXray web landing page (`src/pages/LandingNew/`), prioritized for when time allows.

**Last updated:** June 8, 2026

---

## Completed (Web UI/UX Redesign)

- [x] Split landing into section components (`sections/LandingNav`, `HeroSection`, `TrustBar`, etc.)
- [x] Replace hero rash photo with product UI mockup
- [x] Soften trust claims (privacy-first, educational framing)
- [x] Remove placeholder reviews section
- [x] Add sample report section (`SampleReportSection.jsx`)
- [x] Hero secondary CTA — "See how it works"
- [x] Align copy with mobile (educational tone, Important Notice)
- [x] Enable iOS App Store badge + TestFlight note
- [x] Use React Router `Link` for blog navigation
- [x] Standardize plan slug to `expert-care`
- [x] Shared design system: Sora font, ThemeContext light/dark, PrimaryButton, Card, Badge
- [x] Auth layout visual bridge (gradient + card)
- [x] App shell with branded nav, theme toggle, subscription route fix
- [x] Home scan redesign + AnalysisResult component
- [x] Remove unused `PricingComponent/` scaffold

---

## Remaining polish

### SEO and sharing
- Add Open Graph and Twitter Card meta tags
- Add structured data (Organization, SoftwareApplication)
- Add canonical URL

**Files:** `LandingNew.jsx` (Helmet block)

---

### Performance
- Self-host Sora font instead of Google Fonts `@import`
- Lazy-load below-fold images

**Files:** `global.style.js`, `index.html`

---

### Real social proof
- Replace removed reviews section with real App Store / Google Play reviews when available

---

### Guest scan flow (product)
- Optional "Try a free scan" without full signup — requires backend guest-scan endpoint

---

## Notes

- Legal pages use starter content — have legal counsel review before heavy marketing.
- Privacy copy should stay aligned across FAQ, Features, and Privacy Policy as retention policy evolves.
