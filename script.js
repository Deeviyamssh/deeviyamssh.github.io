// Theme Toggle Functionality
function setTheme(theme) {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${theme}-mode`);
  localStorage.setItem('theme', theme);

  const themeIcon = document.getElementById('theme-icon');
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);
});

// Back-to-Top Button & Scroll Events
const backBtn = document.getElementById('backToTop');
const navbar = document.querySelector('.site-nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav a');
let lastScrollTop = 0;

function highlightNav() {
  const scrollMiddle = window.scrollY + window.innerHeight / 2;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.site-nav a[href="#${id}"]`);
    if (scrollMiddle >= top && scrollMiddle < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      link && link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  const st = window.pageYOffset || document.documentElement.scrollTop;

  // Hide/show navbar
  if (st > lastScrollTop && st > 50) {
    navbar.classList.add('nav-hidden');
  } else {
    navbar.classList.remove('nav-hidden');
  }
  lastScrollTop = st;

  // Show/hide back-to-top
  backBtn.style.display = st > 300 ? 'block' : 'none';

  // Highlight nav link
  highlightNav();
});

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cursor Trail Effect (throttled)
let lastTrail = 0;
document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastTrail < 50) return;
  lastTrail = now;

  const dot = document.createElement('div');
  dot.classList.add('trail-dot');
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;

  const isDark = document.body.classList.contains('dark-mode');
  const color = isDark ? '#fdd835' : '#b0bec5';
  dot.style.backgroundColor = color;
  dot.style.boxShadow = `0 0 6px ${color}`;

  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 300);
});
