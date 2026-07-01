document.getElementById('year').textContent = new Date().getFullYear();

// Header shadow once the page is scrolled
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Marquee: clone groups until each half of the track covers the viewport,
// otherwise a gap scrolls into view on wide screens before the loop wraps.
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const group = marqueeTrack.querySelector('.marquee-group');
  const SPEED = 60; // px per second

  const fillMarquee = () => {
    const groupWidth = group.offsetWidth;
    if (!groupWidth) return;

    // Copies per half, so the track is two identical halves (for the -50% loop)
    const perHalf = Math.max(1, Math.ceil(window.innerWidth / groupWidth));
    while (marqueeTrack.children.length < perHalf * 2) {
      marqueeTrack.appendChild(group.cloneNode(true));
    }
    marqueeTrack.style.animationDuration = `${(perHalf * groupWidth) / SPEED}s`;
  };

  fillMarquee();
  window.addEventListener('resize', fillMarquee, { passive: true });
  // Re-measure once web fonts are in, since they change the group width
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fillMarquee);
  }
}

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
