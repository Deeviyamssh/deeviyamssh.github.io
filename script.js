document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(currentTheme);

  const updateThemeIcon = () => {
    const themeIcon = document.getElementById('theme-icon');
    if (body.classList.contains('dark')) {
      themeIcon.textContent = '☀️';
      themeIcon.style.color = '#fff'; // White sun icon in dark mode
    } else {
      themeIcon.textContent = '🌙';
      themeIcon.style.color = '#000'; // Black moon icon in light mode
    }
  };

  updateThemeIcon(); // Set initial icon

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    let theme = 'light';
    if (body.classList.contains('dark')) {
      theme = 'dark';
    }
    localStorage.setItem('theme', theme);
    updateThemeIcon();
  });

  // Back to Top Button Functionality
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // Show button after scrolling 200px
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
    threshold: 0.3 // Percentage of section visible to trigger
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`nav a[href="#${id}"]`);

      if (entry.isIntersecting) {
        // Add 'active' class to nav link
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }

        // Add 'visible' class to section for animations (like wipe/mask)
        entry.target.classList.add('visible');

      } else {
        // Remove 'visible' class when not intersecting
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

  // Get the element under the cursor
  const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
  let dotColor = '';
  let shadowColor = '';

  // Check the background color of the element under the cursor
  if (elementUnderCursor) {
    const computedStyle = getComputedStyle(elementUnderCursor);
    const bgColor = computedStyle.backgroundColor;

    // Get the computed values of beige and dark grey variables from CSS
    const beigeComputed = getComputedStyle(document.documentElement).getPropertyValue('--beige').trim();
    const darkGreyComputed = getComputedStyle(document.documentElement).getPropertyValue('--dark-grey').trim();

    // Convert RGB to hex for reliable comparison if necessary (though direct string comparison of computedStyle might work for simple colors)
    // A more robust solution might involve comparing against the *semantic* color variables, not just computed RGB.
    // For simplicity, let's check if the computed background is close to our main theme colors.
    // Note: computedStyle.backgroundColor returns rgb(r, g, b) or rgba(...) strings.

    // This is a simplified check. In a complex scenario, we'd need a more robust color comparison.
    // Let's assume the computed style will match our variable colors directly for the main sections.
    if (bgColor === `rgb(${hexToRgb(beigeComputed).r}, ${hexToRgb(beigeComputed).g}, ${hexToRgb(beigeComputed).b})`) {
        // If background is beige, set dot to dark grey and shadow to lavender (or accent)
        dotColor = darkGreyComputed;
        shadowColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim(); // Or another accent color
    } else if (bgColor === `rgb(${hexToRgb(darkGreyComputed).r}, ${hexToRgb(darkGreyComputed).g}, ${hexToRgb(darkGreyComputed).b})`) {
        // If background is dark grey, set dot to beige and shadow to lavender (or accent)
        dotColor = beigeComputed;
        shadowColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim(); // Or another accent color
    } else {
        // Default color if not over a main theme section (e.g., nav, footer, other elements)
        dotColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim();
        shadowColor = dotColor;
    }
  }

  // Fallback if element under cursor is null or logic fails
  if (!dotColor) {
      dotColor = getComputedStyle(document.documentElement).getPropertyValue('--lavender').trim();
      shadowColor = dotColor;
  }

  dot.style.left = `${e.clientX - 4}px`; // Adjust position to center dot
  dot.style.top = `${e.clientY - 4}px`;   // Adjust position to center dot
  dot.style.backgroundColor = dotColor;
  dot.style.boxShadow = `0 0 16px 4px ${shadowColor}`;

  document.body.appendChild(dot);

  // Remove the dot after animation
  setTimeout(() => {
    dot.remove();
  }, 180);
});

// Helper function to convert hex to RGB for comparison (basic version)
function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}
