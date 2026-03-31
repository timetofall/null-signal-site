// Null Signal — single-page site

(function initHeroVideo() {
  const video = document.querySelector('.hero-stack__video[data-src]');
  if (!video) return;

  const src = video.dataset.src;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = typeof navigator !== 'undefined' && Boolean(navigator.connection?.saveData);

  if (reducedMotion || saveData) {
    video.removeAttribute('data-src');
    return;
  }

  const attach = () => {
    video.setAttribute('fetchpriority', 'low');
    video.src = src;
    video.removeAttribute('data-src');
    video.load();
    video.play().catch(() => {});
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => attach(), { timeout: 2500 });
  } else {
    window.addEventListener('load', attach, { once: true });
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.45s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));

/* ----- Features carousel ----- */
(function initFeaturesCarousel() {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;

  const viewport = root.querySelector('[data-carousel-viewport]');
  const track = root.querySelector('[data-carousel-track]');
  const slides = [...root.querySelectorAll('.features__slide')];
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const dotsRoot = document.querySelector('[data-carousel-dots]');

  if (!viewport || !track || slides.length === 0 || !prevBtn || !nextBtn || !dotsRoot) return;

  let index = 0;
  let slideW = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'features__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to feature ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsRoot.appendChild(dot);
  });

  const dots = () => [...dotsRoot.querySelectorAll('.features__dot')];

  function measure() {
    slideW = viewport.getBoundingClientRect().width;
    slides.forEach((s) => {
      s.style.flexBasis = `${slideW}px`;
      s.style.width = `${slideW}px`;
    });
    track.style.width = `${slideW * slides.length}px`;
    applyTransform();
  }

  function applyTransform() {
    track.style.transform = `translateX(-${index * slideW}px)`;
    slides.forEach((s, i) => {
      const on = i === index;
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    dots().forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    applyTransform();
  }

  function shift(delta) {
    goTo((index + delta + slides.length) % slides.length);
  }

  prevBtn.addEventListener('click', () => shift(-1));
  nextBtn.addEventListener('click', () => shift(1));

  document.addEventListener('keydown', (e) => {
    if (!root.closest('.reveal')?.classList.contains('is-visible')) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      shift(-1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      shift(1);
    }
  });

  measure();
  requestAnimationFrame(() => measure());
  window.addEventListener('resize', () => {
    measure();
  });
})();
