/**
 * MT Fitness — Shared JS
 * Handles: nav CTA per page, copyright year, scroll reveal.
 */

// Enable reveal animations (CSS hides elements under .js class)
document.documentElement.classList.add('js');

// ── Per-page nav CTA ──────────────────────────────────────────────────────────
var page   = document.body.getAttribute('data-page') || 'home';
var navCta = document.querySelector('.nav-cta');
if (navCta && (page === 'contact' || page === 'success' || page === 'error')) {
  navCta.href        = 'index.html';
  navCta.textContent = '← Back Home';
  navCta.classList.add('nav-cta--back');
}

// ── Copyright year ────────────────────────────────────────────────────────────
var yearEl = document.querySelector('.footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function revealInViewport() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom >= 0) {
      el.classList.add('visible');
    }
  });
}
revealInViewport();
window.addEventListener('scroll', revealInViewport, { passive: true });
setTimeout(revealInViewport, 150);
