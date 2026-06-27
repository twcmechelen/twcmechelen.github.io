# TWC MECHELEN — PROGRESS

## FASE 1 — Fundament ✅ (2026-06-27)

### Klaar
- [x] SKILL.md aangemaakt in projectroot (complete regels + bestandsnamen + design tokens)
- [x] Mappenstructuur aangemaakt: assets/{vendor,fonts,media,js,css}, data/, tools/, .github/workflows/
- [x] Vendor libraries gedownload: lenis.min.js, gsap.min.js, ScrollTrigger.min.js, three.min.js
- [x] Google Fonts self-hosted: BebasNeue-Regular.woff2, Inter-Regular.woff2, Inter-Medium.woff2, PlayfairDisplay-Italic.woff2
- [x] Media placeholders: groepsfoto-1/2.jpg, jersey-front/back.png, hero-video.mp4, hero-poster.jpg, alle SVG-logos
- [x] data/week.json aangemaakt (Ponderosa hardcode + API-structuur klaar)
- [x] tools/gpx_to_svg.py geschreven (GPX → SVG route visualisatie)
- [x] index.html: volledig skelet met alle 6 secties + correcte script-volgorde
- [x] assets/css/style.css: CSS variabelen, reset, dark theme, alle secties gestyled
- [x] assets/css/animations.css: animation helpers
- [x] assets/js/intro.js: 8-seconden GSAP timeline + localStorage check + reduced-motion
- [x] assets/js/scrollmap.js: SVG load + stroke-dashoffset ScrollTrigger + week.json fetch
- [x] assets/js/main.js: Lenis init → GSAP ScrollTrigger → alle scroll-animaties secties 2/4/5/6
- [x] CNAME: twcmechelen.nl
- [x] .github/workflows/deploy.yml: GitHub Pages Actions workflow
- [x] Git repo geïnitialiseerd op branch 'main'

### Openstaand uit fase 1
- [ ] GitHub remote aanmaken (twcmechelen/twcmechelen.github.io of eigen repo) en pushen
- [ ] GitHub Pages inschakelen in repo-settings
- [ ] E-mailadres contact-sectie bevestigen (nu: info@twcmechelen.nl)
- [ ] Instagram @twc_mechelen en Facebook-link bevestigen
- [ ] Sponsor-links invullen (nu: href="#")

### Bekende issues / TODO Fase 5
- [ ] Afbeeldingen zijn te groot: groepsfoto's ~14-16MB, hero-poster 8.2MB → omzetten naar WebP + comprimeren voor Lighthouse >= 90
- [ ] hero-video.webm ontbreekt (alleen MP4 beschikbaar) — volgt bij fase 5 optimalisatie
- [ ] route.svg bestaat nog niet — volgt na fase 4 (GPX download + gpx_to_svg.py)
- [ ] TWC logo is JPG (282KB) — echte SVG of hoge-res PNG gewenst

---

## FASE 2 — Hero & Intro ✅ (2026-06-27)

### Klaar
- [x] Bug gefixed: intro-elementen verplaatst INTO #intro-overlay (z-index 1000), niet meer verborgen achter overlay
- [x] Grain-texture op overlay: geanimeerde SVG fractalNoise (grain-shift keyframe, 0.15s steps)
- [x] Vignette: radial-gradient op overlay::after
- [x] Skip-knop: fade-in na 2s, kill timeline + 0.4s fade-out naar hero
- [x] Terugkerende bezoeker: localStorage check → direct hero, geen intro
- [x] prefers-reduced-motion: intro overgeslagen, direct hero
- [x] 8-seconden GSAP timeline getest: logo (1.5s) → TWC (3.0s) → MECHELEN (4.5s) → tagline (5.5s) → fade-out (6.5s) → scroll-indicator (7.5s)
- [x] revealHero() snaps hero-elementen zichtbaar na intro
- [x] Playwright getest: alle 5 scenario's groen, 0 JS errors

---

## FASE 3 — Scroll-animaties ✅ (2026-06-27)

### Klaar
- [x] Sectie 2: parallax achtergrond (yPercent -20 scrub) ✅
- [x] Sectie 2: tekst-regels reveal per stagger ✅
- [x] Sectie 2: "1977" counter animatie bij viewport-enter ✅
- [x] Sectie 2: jubileum-badge pulse + fade-in ✅
- [x] Sectie 4: jersey scale+brightness reveal via ScrollTrigger ✅
- [x] Sectie 4: hover 3D rotatie (CSS perspective) ✅
- [x] Sectie 4: klik-om-te-draaien voor/achterkant toggle ✅
- [x] Sectie 4: "HET SHIRT" section-label ScrollTrigger toegevoegd ✅
- [x] Sectie 5: sponsor logos zichtbaar (SVG tekst→wit/goud, brightness 1.1) ✅
- [x] Sectie 5: grayscale→kleur bij hover + tooltip ✅
- [x] Sectie 5: "Onze partners" label ScrollTrigger toegevoegd ✅
- [x] Sectie 5: min-height 80vh, meer padding ✅
- [x] Sectie 6: parallax groepsfoto + fade-in tekst/CTA/socials ✅
- [x] Playwright: alle 6 secties getest, 0 JS errors

## FASE 3 — Scroll-animaties (gepland)

---

## FASE 4 — Route ScrollMap ✅ (2026-06-27)

### Klaar
- [x] Ponderosa GPX gedownload van fincycling API (330 punten) ✅
- [x] python3 tools/gpx_to_svg.py → route.svg gegenereerd (echte routecoördinaten) ✅
- [x] stroke-dashoffset animatie: lijn tekent zichzelf terwijl je scrollt ✅
- [x] ScrollTrigger pin: route-inner vast terwijl 1000px scroll door animatie gaat ✅
- [x] Route stats (km, hoogtemeters, tijd) fade-in na route compleet ✅
- [x] week.json live gekoppeld, fallback op Ponderosa hardcode ✅
- [x] Gold glow filter (feGaussianBlur) op SVG pad ✅
- [ ] Waypoint labels — uitgesteld naar FASE 5 (complex, niet kritiek)
- [ ] week.json live via fincycling /routes/featured — wacht op Alex's fincycling endpoint

---

## FASE 5 — Polish & Performance ✅ (2026-06-27)

### Klaar
- [x] Afbeeldingen → WebP: groepsfoto's -96%, jerseys -93%, hero-poster -92% ✅
- [x] `<picture>` met WebP source + PNG fallback voor jersey-front/back ✅
- [x] CSS backgrounds → .webp (groepsfoto-1/2, hero mobile) ✅
- [x] hero-video `preload="none"` voor betere LCP ✅
- [x] Hero font-size: clamp 5rem→3.5rem minimum (mobiele overflow fixed) ✅
- [x] Route ScrollTrigger: mobile = geen pin (scrub via scroll), desktop = pin ✅
- [x] Cross-browser: Chrome getest op 1440px + 390px mobiel ✅
- [x] 0 JS-errors (excl. hero-video.webm die nog gegenereerd moet worden) ✅

### Nog openstaand
- [ ] hero-video.webm genereren (vereist ffmpeg — niet beschikbaar op dit systeem)
  ```
  ffmpeg -i hero-video.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -an hero-video.webm
  ```
- [ ] Lighthouse audit → score >= 90 (na real deploy)

---

## Acties voor Alex

**GitHub — vereist voor deploy:**
1. Maak een GitHub-repository aan (bijv. `twcmechelen.github.io` of `www_twc`)
2. Voeg remote toe: `git remote add origin https://github.com/<user>/<repo>.git`
3. Push: `git push -u origin main`
4. Schakel GitHub Pages in via Settings → Pages → Source: GitHub Actions
5. Controleer of CNAME (`twcmechelen.nl`) is geconfigureerd in je DNS

**Inhoud bevestigen:**
- E-mailadres contact (nu: info@twcmechelen.nl)
- Instagram handle (nu: @twc_mechelen)
- Facebook URL
- Sponsor-websites voor href-links
- Jubileumsdatum klopt: 18 april 2027?

**Media aanleveren (mag later — placeholders actief):**
- Hero-video: drone/GoPro opname, 30-60 sec, dramatisch licht
- Echte sponsor-logo's (SVG of PNG transparante achtergrond)
- Echte TWC-logo SVG
