/* ============================================================
   TWC MECHELEN — INTRO ANIMATIE (8 seconden, eenmalig)
   Vereist: GSAP geladen vóór dit script
   ============================================================ */

(function () {
  const INTRO_KEY = 'twc-intro-seen';
  const overlay = document.getElementById('intro-overlay');

  if (!overlay) return;

  /* Terugkerende bezoeker: intro meteen verwijderen */
  if (localStorage.getItem(INTRO_KEY) === 'true') {
    overlay.remove();
    showHeroContent();
    return;
  }

  /* prefers-reduced-motion: animatie overslaan */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    completeIntro();
    return;
  }

  runIntro();

  function runIntro() {
    const logo        = document.getElementById('hero-logo');
    const lineTwc     = document.querySelector('.line-twc');
    const lineMechelen= document.querySelector('.line-mechelen');
    const tagline     = document.querySelector('.hero-tagline');
    const heroVideo   = document.getElementById('hero-video');
    const scrollInd   = document.querySelector('.scroll-indicator');

    const tl = gsap.timeline({
      onComplete: completeIntro
    });

    /* 0.0s — overlay zichtbaar (is al zwart), grain actief */

    /* 1.5s — TWC logo fadeIn */
    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 1.5);

    /* 3.0s — "TWC" split-tekst reveal */
    tl.to(lineTwc, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, 3.0);

    /* 4.5s — "MECHELEN" slide-in van rechts */
    tl.to(lineMechelen, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, 4.5);

    /* 5.5s — Tagline fadeIn */
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 5.5);

    /* 6.5s — Hero video/foto fade-in via overlay fade-out */
    if (heroVideo) {
      tl.to('#hero-video-overlay', {
        opacity: 0.4,
        duration: 1.2,
        ease: 'power1.inOut'
      }, 6.5);
    }

    tl.to(overlay, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut',
      onComplete: () => overlay.remove()
    }, 6.5);

    /* 7.5s — Scroll indicator bounce-in */
    tl.to(scrollInd, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, 7.5);
  }

  function completeIntro() {
    if (overlay && overlay.parentNode) overlay.remove();
    localStorage.setItem(INTRO_KEY, 'true');
    showHeroContent();
  }

  function showHeroContent() {
    const logo        = document.getElementById('hero-logo');
    const lineTwc     = document.querySelector('.line-twc');
    const lineMechelen= document.querySelector('.line-mechelen');
    const tagline     = document.querySelector('.hero-tagline');
    const scrollInd   = document.querySelector('.scroll-indicator');

    gsap.set([logo, lineTwc, lineMechelen, tagline, scrollInd], {
      opacity: 1,
      x: 0,
      y: 0
    });
  }
})();
