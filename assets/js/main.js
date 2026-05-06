/* assets/js/main.js */

/* ---- Dark/Light Mode ---- */
const themeToggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', saved);
if (themeToggleBtn) themeToggleBtn.textContent = saved === 'dark' ? '☀️' : '🌙';

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

/* ---- Mobile Nav ---- */
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

/* ---- Active Nav Link ---- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('nav-active');
  else a.classList.remove('nav-active');
});

/* ---- Sticky Header Shadow ---- */
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (header) header.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.3)' : 'none';
});

/* ---- IntersectionObserver (reveal & skill bars) ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* Skill bar animation */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target;
      fill.style.width = fill.dataset.width + '%';
      barObs.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bar-fill').forEach(el => barObs.observe(el));

/* ---- Counter Animation ---- */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.target;
      let count = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count.toLocaleString();
        if (count >= target) clearInterval(timer);
      }, 24);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stat-number').forEach(el => counterObs.observe(el));

/* ---- Typed Text Animation ---- */
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const words = ['Full Stack Developer', 'UI/UX Designer', 'SEO Specialist', 'Freelancer', 'Photographer'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 60 : 100;
    if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
    if (deleting && ci < 0)  { deleting = false; wi = (wi + 1) % words.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ---- Contact form (mailto fallback) ---- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = contactForm.querySelector('#cf-name').value;
    const email   = contactForm.querySelector('#cf-email').value;
    const subject = contactForm.querySelector('#cf-subject').value;
    const message = contactForm.querySelector('#cf-message').value;
    window.open(`mailto:webdrakib@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`);
  });
}
