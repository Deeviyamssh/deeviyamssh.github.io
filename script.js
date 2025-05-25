document.addEventListener('DOMContentLoaded', () => {
  // Back to Top Button Functionality
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for section visibility and animations
  const navLinks = document.querySelectorAll('.nav-link');
  const navSections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`nav a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  navSections.forEach(section => {
    observer.observe(section);
  });
});

// Cursor Glow Effect
document.addEventListener('mousemove', e => {
  const dot = document.createElement('div');
  dot.classList.add('trail-dot');

  const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
  let dotColor = '';
  let shadowColor = '';

  if (elementUnderCursor) {
    const computedStyle = getComputedStyle(elementUnderCursor);
    const bgColor = computedStyle.backgroundColor;

    const beigeComputed = getComputedStyle(document.documentElement).getPropertyValue('--beige').trim();
    const darkGreyComputed = getComputedStyle(document.documentElement).getPropertyValue('--dark-grey').trim();

    if (bgColor === `rgb(${hexToRgb(beigeComputed).r}, ${hexToRgb(beigeComputed).g}, ${hexToRgb(beigeComputed).b})`) {
        dotColor = darkGreyComputed;
        shadowColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim();
    } else if (bgColor === `rgb(${hexToRgb(darkGreyComputed).r}, ${hexToRgb(darkGreyComputed).g}, ${hexToRgb(darkGreyComputed).b})`) {
        dotColor = beigeComputed;
        shadowColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim();
    } else {
        dotColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim();
        shadowColor = dotColor;
    }
  }

  if (!dotColor) {
      dotColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim();
      shadowColor = dotColor;
  }

  dot.style.left = `${e.clientX - 4}px`;
  dot.style.top = `${e.clientY - 4}px`;
  dot.style.backgroundColor = dotColor;
  dot.style.boxShadow = `0 0 16px 4px ${shadowColor}`;

  document.body.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 180);
});

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}