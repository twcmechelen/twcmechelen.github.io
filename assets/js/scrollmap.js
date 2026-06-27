/* ============================================================
   TWC MECHELEN — ROUTE SCROLLMAP
   SVG path tekent zichzelf via stroke-dashoffset + ScrollTrigger pin
   ============================================================ */

(function () {
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
    const nameEl   = document.querySelector('.route-naam');
    const vibeEl   = document.querySelector('.route-vibe');
    const kmEl     = document.querySelector('.stat-km');
    const hoogteEl = document.querySelector('.stat-hoogte');

    if (nameEl)   nameEl.textContent   = data.naam;
    if (vibeEl)   vibeEl.textContent   = data.vibe;
    if (kmEl)     kmEl.textContent     = `${data.km} km`;
    if (hoogteEl) hoogteEl.textContent = `${data.hoogte} m`;

    loadRouteSVG();
  }

  function loadRouteSVG() {
    const container = document.querySelector('.route-svg-container');
    if (!container) return;

    fetch('assets/media/route.svg')
      .then(r => r.text())
      .then(svgText => {
        container.innerHTML = svgText;
        setupScrollAnimation();
      })
      .catch(() => {
        container.innerHTML = '<p style="color:var(--color-muted);font-size:0.8rem;padding:1rem">Route SVG niet beschikbaar.</p>';
      });
  }

  function setupScrollAnimation() {
    const container = document.querySelector('.route-svg-container');
    const path = container?.querySelector('#route-path, path');
    if (!path || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const length = path.getTotalLength();
    let revealDone = false;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    /* Section-label en tekst meteen zichtbaar als sectie in beeld */
    gsap.to('#de-route .section-label', {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '#de-route', start: 'top 65%' }
    });
    gsap.to('.route-naam', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#de-route', start: 'top 55%' }
    });
    gsap.to('.route-vibe', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.15,
      scrollTrigger: { trigger: '#de-route', start: 'top 55%' }
    });

    /* Pin de sectie + teken route via scroll */
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.route-inner',
        start: 'top top',
        end: '+=1000',
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (self.progress >= 0.92 && !revealDone) {
            revealDone = true;
            revealRouteInfo();
          }
        }
      }
    });
  }

  function revealRouteInfo() {
    gsap.to('.route-stats', {
      opacity: 1, y: 0, duration: 0.9, ease: 'power2.out'
    });
    gsap.to('.route-update-info', {
      opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.35
    });
  }
})();
