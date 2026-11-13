// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Project filters
const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    projects.forEach((p) =>
      p.classList.toggle("hidden", f !== "all" && p.dataset.category !== f)
    );
  })
);

// Terminal typing effect — edit these lines to whatever you like
const lines = [
  "semgrep scan ./repo",
  "gitleaks detect --source .",
  "trivy fs .",
  "echo \"Let's connect!\"",
];
const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typedEl.textContent = lines[0];
} else {
  let lineIdx = 0, charIdx = 0, deleting = false;
  (function type() {
    const current = lines[lineIdx];
    typedEl.textContent = current.slice(0, charIdx);
    if (!deleting && charIdx < current.length) charIdx++;
    else if (deleting && charIdx > 0) charIdx--;
    else if (!deleting) { deleting = true; return setTimeout(type, 1600); }
    else { deleting = false; lineIdx = (lineIdx + 1) % lines.length; }
    setTimeout(type, deleting ? 35 : 75);
  })();
}

// Fade-in sections on scroll
const revealTargets = document.querySelectorAll(".section-title, .job, .skill-card, .project, .cert, .contact-card, .about-grid");
revealTargets.forEach((el) => el.classList.add("reveal"));
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
revealTargets.forEach((el) => observer.observe(el));
