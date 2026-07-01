document.getElementById('year').textContent = new Date().getFullYear();

// Header shadow once the page is scrolled
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Scroll-reveal animations (falls back to always-visible without support)
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger siblings inside grids for a nicer cascade
    el.style.setProperty('--reveal-delay', `${(i % 3) * 0.08}s`);
    observer.observe(el);
  });
} else {
  document.documentElement.classList.add('no-observer');
}
