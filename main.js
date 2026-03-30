// Null Signal — main.js (photo site v6)

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.45s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
  else link.classList.remove('active');
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
