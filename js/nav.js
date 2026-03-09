/* ============================================================
   NAV.JS — Shared navbar & footer injection + behavior
   ============================================================ */

const NAV_LINKS = [
  { href: 'index.html',        label: 'Home' },
  { href: 'about.html',        label: 'About' },
  { href: 'academics.html',    label: 'Academics' },
  { href: 'research.html',     label: 'Research' },
  { href: 'projects.html',     label: 'Projects' },
  { href: 'achievements.html', label: 'Achievements' },
  { href: 'feedbacks.html',    label: 'Feedbacks' },
  { href: 'blogs.html',        label: 'Blogs' },
  { href: 'contact.html',      label: 'Contact', isCta: true },
];

function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  return file;
}

function buildNavbar() {
  const current = getCurrentPage();

  const desktopLinks = NAV_LINKS.map(l => {
    const isActive = l.href === current || (current === '' && l.href === 'index.html');
    const cls = [isActive ? 'active' : '', l.isCta ? 'nav-cta' : ''].filter(Boolean).join(' ');
    return `<a href="${l.href}" class="${cls}">${l.label}</a>`;
  }).join('');

  const mobileLinks = NAV_LINKS.map(l => {
    const isActive = l.href === current;
    return `<a href="${l.href}" class="${isActive ? 'active' : ''}" onclick="closeMobileMenu()">${l.label}</a>`;
  }).join('');

  const navbar = document.createElement('header');
  navbar.id = 'navbar';
  navbar.innerHTML = `
    <a href="index.html" class="nav-logo">Serhan Telatar</a>
    <nav class="nav-links">${desktopLinks}</nav>
    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu" onclick="toggleMobileMenu()">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.prepend(navbar);

  // Mobile nav
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'nav-mobile';
  mobileNav.id = 'mobile-nav';
  mobileNav.innerHTML = mobileLinks;
  document.body.insertBefore(mobileNav, navbar.nextSibling);

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobile-nav')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');
}

/* ─── Footer ─────────────────────────────────────────────── */
function buildFooter() {
  const footer = document.createElement('footer');
  footer.id = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="nav-logo">Serhan Telatar</span>
          <p>MSc Artificial Intelligence student at Queen Mary University of London. Passionate about building intelligent systems and pushing the boundaries of AI/ML.</p>
          <div class="footer-socials">
            <a href="https://github.com/SerhanTelatar" target="_blank" class="footer-social-link" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/serhan-telatar/" target="_blank" class="footer-social-link" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"/></svg>
            </a>
            <a href="mailto:telatarserhan@gmail.com" class="footer-social-link" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Pages</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="academics.html">Academics</a></li>
            <li><a href="research.html">Research</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Portfolio</h4>
          <ul>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="achievements.html">Achievements</a></li>
            <li><a href="feedbacks.html">Feedbacks</a></li>
            <li><a href="blogs.html">Blogs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="contact.html">Contact Me</a></li>
            <li><a href="assets/resume.pdf" target="_blank">Download CV</a></li>
            <li><a href="https://github.com/SerhanTelatar" target="_blank">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/serhan-telatar/" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} Serhan Emre Telatar. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

/* ─── Scroll Reveal ────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}

/* ─── Counter Animation ────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isDecimal = el.dataset.decimal === 'true';
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });
}

function initCounterObserver() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  counters.forEach(el => observer.observe(el));
}

/* ─── Init ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildNavbar();
  buildFooter();
  initScrollReveal();
  initCounterObserver();
});
