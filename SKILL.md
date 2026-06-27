# TWC MECHELEN WEBSITE — SKILL
## ALTIJD LEZEN VOOR JE CODE SCHRIJFT

### Wat is dit project?
Cinematografische, donkere single-page website voor TWC Mechelen (twcmechelen.nl).
Wielersportclub uit Zuid-Limburg, ~45 leden, opgericht 1977, jubileum april 2027.
Hosted op GitHub Pages. Geen backend. Geen CMS. Geen database.
Alles draait op vanilla HTML/CSS/JS + GSAP + Lenis.

### Harde regels
1. NOOIT betaalde libraries — alles 100% gratis/open source
2. NOOIT fonts via Google CDN laden — altijd self-hosted in /assets/fonts/
3. NOOIT bestandsnamen van media wijzigen — alleen inhoud vervangen
4. Video ALTIJD: <video autoplay muted loop playsinline poster="assets/media/hero-poster.jpg">
5. Intro-animatie overslaan als: localStorage.getItem('twc-intro-seen') === 'true'
6. ScrollTrigger initialiseren: gsap.registerPlugin(ScrollTrigger) vóór gebruik
7. Lenis initialiseren VOOR GSAP ScrollTrigger
8. Mobile (max-width: 768px): video vervangen door hero-poster.jpg
9. prefers-reduced-motion: alle animaties uitschakelen
10. Na elke fase: PROGRESS.md updaten

### Vaste bestandsnamen (nooit hernoemen)
assets/media/hero-video.mp4
assets/media/hero-video.webm
assets/media/hero-poster.jpg
assets/media/route.svg
assets/media/jersey-front.png
assets/media/jersey-back.png
assets/media/groepsfoto-1.jpg
assets/media/groepsfoto-2.jpg
assets/media/sponsor-gold.svg        (JEF ABELS BIKES)
assets/media/sponsor-silver-1.svg    (DE PAARDESTAL)
assets/media/sponsor-silver-2.svg    (AVANTI werkt vooruit)
assets/media/twc-logo.svg
data/week.json

### CSS variabelen (altijd via variabelen, nooit hardcoded hex)
--color-black:  #0A0A0A
--color-dark:   #111111
--color-accent: #C8A84B   (goud — jubileum, eretitels)
--color-white:  #F0EDE8   (ivoor — niet koud wit)
--color-muted:  #4A4A4A
--color-glow:   rgba(200, 168, 75, 0.4)

### Typografie (self-hosted Google Fonts)
Display:  Bebas Neue              (koppen, hero)
Body:     Inter                   (lopende tekst)
Accent:   Playfair Display Italic (jaartallen, citaten)

### Library laadvolgorde in index.html
1. /assets/vendor/lenis.min.js
2. /assets/vendor/gsap.min.js
3. /assets/vendor/ScrollTrigger.min.js
4. /assets/vendor/three.min.js  (alleen als intro-particles actief)
5. /assets/js/intro.js
6. /assets/js/scrollmap.js
7. /assets/js/main.js

### CDN-bronnen voor vendor downloads
GSAP:           https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
ScrollTrigger:  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js
Lenis:          https://unpkg.com/lenis@1.1.14/dist/lenis.min.js
Three.js:       https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js

### Fincycling API (bestaande app — NIET aanpassen vanuit www_twc)
Routebibliotheek:  https://twcmechelen.pythonanywhere.com/routes
GPX download:      https://twcmechelen.pythonanywhere.com/routes/[ID]/download.gpx
Week-endpoint:     https://twcmechelen.pythonanywhere.com/routes/featured
                   retourneert: { route_id, naam, vibe, conditie, km, hoogte, gpx_url }
                   (dit endpoint bestaat nog niet — Alex bouwt dit in fincycling repo)

### Video optimalisatie (ffmpeg)
MP4:  ffmpeg -i input.mp4 -vf scale=1920:-1 -c:v libx264 -crf 28 -movflags +faststart assets/media/hero-video.mp4
WebM: ffmpeg -i input.mp4 -vf scale=1920:-1 -c:v libvpx-vp9 -crf 30 -b:v 0 assets/media/hero-video.webm
Doel: beide bestanden < 5MB

### GPX naar SVG conversie
Script:  tools/gpx_to_svg.py
Input:   GPX-bestand
Output:  assets/media/route.svg (genormaliseerde SVG path, viewBox 800x600)
Stijl:   zwarte achtergrond #0A0A0A, lijn in #C8A84B, geen kaartachtergrond
Gebruik: python3 tools/gpx_to_svg.py input.gpx

### Deploy
Push naar main branch
→ GitHub Actions (.github/workflows/deploy.yml)
→ automatisch live op twcmechelen.nl via GitHub Pages
CNAME bestand in root met inhoud: twcmechelen.nl
