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
  
  // Get the accent color from CSS variable
  const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-color')
    .trim();
  
  dot.style.left = `${e.clientX - 4}px`;
  dot.style.top = `${e.clientY - 4}px`;
  dot.style.backgroundColor = accentColor;
  dot.style.boxShadow = `0 0 16px 4px ${accentColor}`;
  
  document.body.appendChild(dot);
  
  // Remove the dot after animation
  setTimeout(() => {
    dot.remove();
  }, 180);
});
