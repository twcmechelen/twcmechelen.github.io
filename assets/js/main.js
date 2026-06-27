/* ============================================================
   TWC MECHELEN — MAIN JS
   Init volgorde: Lenis → GSAP ScrollTrigger → secties
   ============================================================ */

/* --- Lenis smooth scroll --- */
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* --- GSAP ScrollTrigger init (Lenis eerst!) --- */
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* --- prefers-reduced-motion: alle animaties skippen --- */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  initScrollAnimations();
}

/* ============================================================
   SECTIE 2: OVER ONS
   ============================================================ */
function initScrollAnimations() {

  /* Parallax achtergrond */
  gsap.to('.over-ons-bg', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#over-ons',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  /* Section label */
  gsap.to('#over-ons .section-label', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#over-ons', start: 'top 75%' }
  });

  /* Tekst-regels één voor één */
  gsap.to('.text-line', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.over-ons-text-lines', start: 'top 80%' }
  });

  /* Copy-tekst */
  gsap.to('.over-ons-copy', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.over-ons-copy', start: 'top 85%' }
  });

  /* Jubileum badge */
  gsap.to('.jubileum-badge', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.jubileum-badge', start: 'top 90%' }
  });

  /* 1977 counter */
  const counterEl = document.querySelector('.counter-1977');
  if (counterEl) {
    ScrollTrigger.create({
      trigger: '#over-ons',
      start: 'top 60%',
      once: true,
      onEnter: () => {
        let start = 1900;
        const end = 1977;
        const duration = 1200;
        const step = (end - start) / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
          current = Math.min(current + step, end);
          counterEl.textContent = Math.round(current);
          if (current >= end) clearInterval(timer);
        }, 16);
      }
    });
  }

  /* ============================================================
     SECTIE 4: HET SHIRT
     ============================================================ */

  /* Shirt reveal: scale + brightness via ScrollTrigger */
  ScrollTrigger.create({
    trigger: '#het-shirt',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      const shirtCard = document.querySelector('.shirt-card');
      if (shirtCard) shirtCard.closest('.shirt-visual')?.closest('#het-shirt')?.querySelector('.shirt-visual')?.classList.add('shirt-revealed');

      document.querySelector('#het-shirt .shirt-visual')?.classList.add('shirt-revealed');

      gsap.to('.shirt-face img, .shirt-back img', {
        scale: 1,
        y: 0,
        filter: 'brightness(1)',
        duration: 1.2,
        ease: 'power3.out'
      });
    }
  });

  /* Shirt section-label */
  gsap.to('#het-shirt .section-label', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#het-shirt', start: 'top 70%' }
  });

  /* Shirt tekst slide-in van links */
  gsap.to('.shirt-right', {
    opacity: 1,
    x: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#het-shirt', start: 'top 65%' }
  });

  /* Jersey hover: flip */
  const shirtCard = document.querySelector('.shirt-card');
  if (shirtCard) {
    shirtCard.addEventListener('click', () => {
      shirtCard.classList.toggle('flipped');
    });
  }

  /* ============================================================
     SECTIE 5: SPONSORS
     ============================================================ */

  /* "Onze partners" label */
  gsap.to('#sponsors .section-label', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#sponsors', start: 'top 75%' }
  });

  /* Sponsors fade-in bij scroll */
  gsap.fromTo('.sponsor-item', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power2.out',
    delay: 0.2,
    scrollTrigger: { trigger: '#sponsors', start: 'top 75%' }
  });

  /* ============================================================
     SECTIE 6: CONTACT
     ============================================================ */

  /* Parallax achtergrond */
  gsap.to('.contact-bg', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.contact-headline', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });

  gsap.to('.contact-sub', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.15,
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });

  gsap.to('.contact-cta', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'back.out(1.7)',
    delay: 0.3,
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });

  gsap.to('.contact-socials', {
    opacity: 1,
    duration: 0.7,
    delay: 0.45,
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });
}
