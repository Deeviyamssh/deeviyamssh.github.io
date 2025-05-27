// Navigation scroll handling
const nav = document.querySelector(".site-nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    nav.classList.add("nav-hidden");
  } else {
    nav.classList.remove("nav-hidden");
  }
  lastScroll = currentScroll;
});

// Back to top button
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Section reveal on scroll
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

// Cursor trail effect
document.addEventListener("mousemove", (e) => {
  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = `${e.clientX - 4}px`;
  dot.style.top = `${e.clientY - 4}px`;
  document.body.appendChild(dot);
  setTimeout(() => {
    dot.remove();
  }, 180);
});
