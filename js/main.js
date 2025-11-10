/* ============================================ */
/* ANIMACIÓN DE SCROLL REVEAL */
/* ============================================ */

/* 
    Esta función hace que los elementos aparezcan suavemente cuando haces scroll
    y entran en el viewport (área visible de la pantalla).
    
    Funcionamiento:
    1. Selecciona todos los elementos con la clase 'scroll-reveal'
    2. Crea un IntersectionObserver que observa cuando los elementos entran/salen del viewport
    3. Cuando un elemento entra en el viewport (isIntersecting = true), añade la clase 'visible'
    4. Cuando sale del viewport, quita la clase 'visible'
    
    - threshold: 0.2 = el elemento debe estar 20% visible para activarse
    - La clase 'visible' está definida en CSS y hace que el elemento aparezca con animación
*/

// Selecciona todos los elementos con la clase 'scroll-reveal' (secciones, footer, etc.)
const elements = document.querySelectorAll('.scroll-reveal');

// Crea un observador que detecta cuando los elementos entran/salen del viewport
const observer = new IntersectionObserver((entries) => {
  // Por cada elemento observado
  entries.forEach(entry => {
    // Si el elemento está visible (isIntersecting = true), añade la clase 'visible'
    // Si no está visible, quita la clase 'visible'
    // toggle(className, condition): añade la clase si condition es true, la quita si es false
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { 
  // threshold: 0.2 significa que el elemento debe estar 20% visible para activarse
  // Puedes cambiar este valor (0.0 a 1.0) para ajustar cuándo se activa la animación
  threshold: 0.2 
});

// Observa cada elemento con la clase 'scroll-reveal'
elements.forEach(el => observer.observe(el));

/* ============================================ */
/* CAMBIAR ESTILO DEL HEADER AL HACER SCROLL */
/* ============================================ */

/* 
    Esta función cambia el estilo del header cuando haces scroll hacia abajo.
    Cuando haces scroll más de 50px, añade la clase 'scrolled' al header,
    lo que cambia su apariencia (más opaco, más visible).
    
    Funcionamiento:
    1. Obtiene el elemento del header por su ID
    2. Escucha el evento 'scroll' en la ventana
    3. Si el scroll es mayor a 50px, añade la clase 'scrolled'
    4. Si el scroll es menor a 50px, quita la clase 'scrolled'
*/

// Obtiene el elemento del header por su ID
const header = document.getElementById("main-header");

// Escucha el evento de scroll en la ventana
window.addEventListener("scroll", () => {
  // window.scrollY: cantidad de píxeles que se ha hecho scroll verticalmente
  // Si scrollY > 50, añade la clase 'scrolled' (header más visible)
  // Si scrollY <= 50, quita la clase 'scrolled' (header transparente)
  // El operador ?. (optional chaining) evita errores si header es null
  header?.classList.toggle("scrolled", window.scrollY > 50);
});

/* ============================================ */
/* MENÚ MÓVIL (Hamburguesa) */
/* ============================================ */

/* 
    Esta función controla el menú móvil (hamburguesa).
    Cuando haces clic en el botón del menú, muestra/oculta el menú móvil.
    
    Funcionamiento:
    1. Obtiene el botón del menú hamburguesa por su ID
    2. Obtiene el menú móvil por su ID
    3. Escucha el evento 'click' en el botón
    4. Alterna (toggle) la clase 'hidden' del menú (muestra/oculta)
    
    - La clase 'hidden' está definida en Tailwind CSS y oculta el elemento
    - Cuando se quita 'hidden', el menú se muestra
    - Cuando se añade 'hidden', el menú se oculta
*/

// Obtiene el botón del menú hamburguesa por su ID
const menuBtn = document.getElementById('menu-btn');

// Obtiene el menú móvil por su ID
const menu = document.getElementById('mobile-menu');

// Escucha el evento 'click' en el botón del menú
// El operador ?. (optional chaining) evita errores si menuBtn es null
menuBtn?.addEventListener('click', () => {
  // Alterna la clase 'hidden' del menú
  // Si tiene 'hidden', la quita (muestra el menú)
  // Si no tiene 'hidden', la añade (oculta el menú)
  menu.classList.toggle('hidden');
});

