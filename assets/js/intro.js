/* ============================================================
   TWC MECHELEN — INTRO ANIMATIE (8 seconden, eenmalig)
   Elementen leven INSIDE #intro-overlay (z-index 1000).
   Na afloop: overlay weg, hero-elementen direct zichtbaar.
   ============================================================ */

(function () {
  const INTRO_KEY = 'twc-intro-seen';
  const overlay   = document.getElementById('intro-overlay');

  if (!overlay) return;

  /* Terugkerende bezoeker of reduced-motion: direct naar site */
  if (
    localStorage.getItem(INTRO_KEY) === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    overlay.remove();
    revealHero();
    return;
  }

  /* Skip-knop */
  const skipBtn = document.getElementById('intro-skip');
  if (skipBtn) skipBtn.addEventListener('click', skipIntro);

  runIntro();

  /* ----------------------------------------------------------
     TIMELINE
  ---------------------------------------------------------- */
  function runIntro() {
    const logo     = document.getElementById('intro-logo');
    const twc      = document.getElementById('intro-twc');
    const mechelen = document.getElementById('intro-mechelen');
    const tagline  = document.getElementById('intro-tagline-text');

    const tl = gsap.timeline({ onComplete: finishIntro });

    /* 1.5s — Logo fadeIn van boven */
    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, 1.5);

    /* 3.0s — "TWC" omhoog */
    tl.to(twc, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out'
    }, 3.0);

    /* 4.5s — "MECHELEN" van rechts */
    tl.to(mechelen, {
      opacity: 1,
      x: 0,
      duration: 0.75,
      ease: 'power3.out'
    }, 4.5);

    /* 5.5s — Tagline */
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 5.5);

    /* 6.5s — Overlay fades out (video wordt zichtbaar) */
    tl.to(overlay, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => overlay.remove()
    }, 6.5);

    /* 7.5s — Scroll-indicator */
    tl.to('.scroll-indicator', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, 7.5);

    /* Sla de timeline op zodat skip hem kan stoppen */
    window._introTimeline = tl;
  }

  /* ----------------------------------------------------------
     SKIP
  ---------------------------------------------------------- */
  function skipIntro() {
    if (window._introTimeline) window._introTimeline.kill();
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: finishIntro
    });
  }

  /* ----------------------------------------------------------
     AFRONDEN
  ---------------------------------------------------------- */
  function finishIntro() {
    if (overlay.parentNode) overlay.remove();
    localStorage.setItem(INTRO_KEY, 'true');
    revealHero();
  }

  function revealHero() {
    /* Hero-elementen direct zichtbaar (geen animatie nodig —
       ze waren verborgen achter de overlay) */
    gsap.set(
      ['#hero-logo', '.line-twc', '.line-mechelen',
       '.hero-tagline', '.scroll-indicator'],
      { opacity: 1, x: 0, y: 0 }
    );
  }
})();
