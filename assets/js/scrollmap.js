/* ============================================================
   TWC MECHELEN — ROUTE SCROLLMAP
   SVG path tekent zichzelf via stroke-dashoffset + ScrollTrigger
   Laadt data/week.json voor naam + vibe-tekst
   ============================================================ */

(function () {
  /* Laad week.json voor route-informatie */
  fetch('data/week.json')
    .then(r => r.json())
    .then(initRoute)
    .catch(() => {
      initRoute({
        naam: 'Ponderosa',
        vibe: 'Elke zondag — 09:30 vanuit Mechelen',
        km: 59.3,
        hoogte: 313
      });
    });

  function initRoute(data) {
    /* Vul tekst in */
    const nameEl  = document.querySelector('.route-naam');
    const vibeEl  = document.querySelector('.route-vibe');
    const kmEl    = document.querySelector('.stat-km');
    const hoogteEl= document.querySelector('.stat-hoogte');

    if (nameEl)   nameEl.textContent   = data.naam;
    if (vibeEl)   vibeEl.textContent   = data.vibe;
    if (kmEl)     kmEl.textContent     = `${data.km} km`;
    if (hoogteEl) hoogteEl.textContent = `${data.hoogte} m`;

    /* Laad en animeer route SVG */
    loadRouteSVG();
  }

  function loadRouteSVG() {
    const container = document.querySelector('.route-svg-container');
    if (!container) return;

    fetch('assets/media/route.svg')
      .then(r => r.text())
      .then(svgText => {
        container.innerHTML = svgText;
        setupScrollAnimation(container);
      })
      .catch(() => {
        container.innerHTML = '<p style="color:var(--color-muted);font-size:0.8rem;padding:1rem">Route SVG niet beschikbaar.<br>Genereer via: python3 tools/gpx_to_svg.py input.gpx</p>';
      });
  }

  function setupScrollAnimation(container) {
    const path = container.querySelector('#route-path, path');
    if (!path || typeof gsap === 'undefined') return;

    const length = path.getTotalLength();

    /* Reset dash */
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    /* Teken lijn mee met scroll */
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#de-route',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onComplete: () => {
          document.querySelector('#de-route')?.classList.add('route-complete');
          revealRouteInfo();
        }
      }
    });

    /* Tekst-elementen onthullen met scrollen */
    const section = document.getElementById('de-route');
    if (!section) return;

    gsap.to('.route-naam', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '#de-route', start: 'top 70%' }
    });

    gsap.to('.route-vibe', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.15,
      scrollTrigger: { trigger: '#de-route', start: 'top 70%' }
    });
  }

  function revealRouteInfo() {
    gsap.to('.route-stats', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
    });
    gsap.to('.route-update-info', {
      opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3
    });
  }
})();
