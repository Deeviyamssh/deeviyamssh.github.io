// Custom cursor implementation
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Only initialize cursor on desktop
const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isDesktop) {
  // Show cursor when mouse enters window
  document.addEventListener('mouseenter', () => {
    cursor.classList.add('visible');
  });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });

  // Smooth cursor movement
  let cursorX = 0;
  let cursorY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
    });
  });

  // Smooth animation
  function animate() {
    const ease = 0.2;
    
    currentX += (cursorX - currentX) * ease;
    currentY += (cursorY - currentY) * ease;
    
    cursor.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
    
    requestAnimationFrame(animate);
  }

  animate();
}

// --------------------------------------
// Show/hide Back to Top button on scroll
// --------------------------------------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 300) {
    backToTop.style.display = "flex"; // Show button
  } else {
    backToTop.style.display = "none"; // Hide button
  }
});

// ----------------------------
// Smooth scroll to top on click
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  if (!backToTop) return;
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ------------------------------------------
// Reveal section content on scroll animation
// ------------------------------------------
const sections = document.querySelectorAll(".section");

const revealSections = () => {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealSections);
window.addEventListener("DOMContentLoaded", revealSections);

// ------------------------
// Glowing cursor trail dots
// ------------------------
let lastTrailTime = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrailTime < 30) return; // Throttle for performance
  lastTrailTime = now;

  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = `${e.clientX - 4}px`;
  dot.style.top = `${e.clientY - 4}px`;
  document.body.appendChild(dot);

  // Clean up the dot after animation
  dot.addEventListener("animationend", () => dot.remove());
});