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

  // Only create a dot every 25 milliseconds to avoid too many dots
  if (now - lastTrailTime < 25) return;
  lastTrailTime = now;

  const dot = document.createElement("div");
  dot.className = "trail-dot";

  // Position the dot near your mouse
  dot.style.left = (e.pageX - 4) + "px";
  dot.style.top = (e.pageY - 4) + "px";

  // Add the dot to the page
  document.body.appendChild(dot);

  // Remove the dot after its animation ends
  dot.addEventListener("animationend", () => dot.remove());
});
