// --- Scroll reveal ---
const elements = document.querySelectorAll('.scroll-reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.2 });
elements.forEach(el => observer.observe(el));

// --- Cambiar estilo del header al hacer scroll ---
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 50);
});

// --- Menú móvil ---
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
menuBtn?.addEventListener('click', () => menu.classList.toggle('hidden'));

