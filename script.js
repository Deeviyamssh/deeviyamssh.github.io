// ------------------------------
// Hide/show navigation on scroll
// ------------------------------
const nav = document.querySelector(".site-nav"); // Make sure your nav has class="site-nav"
let lastScroll = 0;

window.addEventListener("scroll", () => {
  if (!nav) return;
  const currentScroll = window.pageYOffset;

  // Hide nav on scroll down, show on scroll up
  if (currentScroll > lastScroll) {
    nav.classList.add("nav-hidden");
  } else {
    nav.classList.remove("nav-hidden");
  }

  lastScroll = currentScroll;
});

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
