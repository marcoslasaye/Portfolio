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

/* ============================================ */
/* GENERAR EFECTO MATRIX (Caracteres japoneses) */
/* ============================================ */

/* 
    Esta función genera dinámicamente los caracteres japoneses para el efecto matrix.
    Los caracteres se generan en una cuadrícula y pulsan con diferentes colores.
    
    Funcionamiento:
    1. Obtiene el contenedor del matrix por su ID
    2. Define un array con caracteres japoneses (katakana)
    3. Calcula cuántos caracteres caben en el contenedor
    4. Genera los caracteres dinámicamente y los añade al contenedor
    
    Basado en: https://uiverse.io/solowzrd/wet-lionfish-63
*/

// Función para generar el efecto matrix
function generateMatrix() {
  // Obtiene el contenedor del matrix por su ID
  const matrixContainer = document.getElementById('matrix-container');
  
  // Si no existe el contenedor, no hace nada
  if (!matrixContainer) return;
  
  // Array con caracteres japoneses (katakana)
  // Estos son los caracteres que se mostrarán en el efecto matrix
  const japaneseChars = [
    'ア', 'イ', 'ウ', 'エ', 'オ',
    'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ',
    'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
    'ル', 'レ', 'ロ', 'ワ', 'ヲ',
    'ン', 'ガ', 'ギ', 'グ', 'ゲ',
    'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ',
    'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ',
    'ド', 'バ', 'ビ', 'ブ', 'ベ',
    'ボ', 'パ', 'ピ', 'プ', 'ペ',
    'ポ'
  ];
  
  // Calcula cuántos caracteres caben en el contenedor
  // Obtiene el ancho y alto del contenedor
  const containerWidth = matrixContainer.offsetWidth || window.innerWidth;
  const containerHeight = matrixContainer.offsetHeight || window.innerHeight;
  
  // Calcula el número de columnas y filas basado en el tamaño del contenedor
  // Cada carácter ocupa aproximadamente 40px (definido en CSS)
  const cols = Math.ceil(containerWidth / 40);
  const rows = Math.ceil(containerHeight / 40);
  
  // Calcula el número total de caracteres necesarios
  const totalChars = cols * rows;
  
  // Genera los caracteres dinámicamente
  for (let i = 0; i < totalChars; i++) {
    // Crea un elemento span para cada carácter
    const span = document.createElement('span');
    
    // Selecciona un carácter aleatorio del array
    const randomChar = japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
    
    // Añade el carácter al span
    span.textContent = randomChar;
    
    // Añade el span al contenedor
    matrixContainer.appendChild(span);
  }
}

// Ejecuta la función cuando el DOM esté completamente cargado
// DOMContentLoaded: se ejecuta cuando el HTML está completamente cargado
document.addEventListener('DOMContentLoaded', generateMatrix);

// También ejecuta la función cuando la ventana cambia de tamaño
// Esto asegura que el matrix se ajuste si cambia el tamaño de la ventana
window.addEventListener('resize', () => {
  // Limpia el contenedor antes de regenerar
  const matrixContainer = document.getElementById('matrix-container');
  if (matrixContainer) {
    matrixContainer.innerHTML = '';
    generateMatrix();
  }
});

