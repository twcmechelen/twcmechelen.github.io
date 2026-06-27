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

## FASE 2 — Hero & Intro (gepland)
*Start na fase 1 commit + push*

Taken:
- [ ] Intro-animatie visueel testen en finetunen in browser
- [ ] Grain-texture verbeteren (eventueel canvas-based noise)
- [ ] Hero-video responsiveness testen op mobiel
- [ ] prefers-reduced-motion testen

---

## FASE 3 — Scroll-animaties (gepland)

---

## FASE 4 — Route ScrollMap (gepland)
*Meest complex — Codrops ScrollMap techniek*

Taken:
- [ ] Ponderosa GPX downloaden: `curl -o ponderosa.gpx https://twcmechelen.pythonanywhere.com/routes/110/download.gpx`
- [ ] `python3 tools/gpx_to_svg.py ponderosa.gpx` → route.svg genereren
- [ ] ScrollTrigger stroke-dashoffset animatie testen
- [ ] Waypoint labels op correcte SVG-posities
- [ ] week.json live koppelen als fincycling /routes/featured endpoint beschikbaar is

---

## FASE 5 — Polish & Performance (gepland)

Taken:
- [ ] ffmpeg optimalisatie: hero-video MP4 < 5MB + WebM genereren
- [ ] Afbeeldingen → WebP + resize (groepsfoto's max 1920px breed)
- [ ] Lighthouse audit → score >= 90
- [ ] Cross-browser: Chrome, Firefox, Safari, mobiel
- [ ] Meta-tags volledig invullen (og:image, og:url)

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
