/**
 * Copia las fuentes web necesarias desde node_modules a fonts/ y genera
 * css/fonts.css con las reglas @font-face.
 *
 * Solo se usa Orbitron en el sitio (cyber-text, cyber-button, cyber-card h3).
 * Ubuntu y Poppins estaban declaradas pero no se usaban en ninguna regla.
 *
 * Uso: npm run copy:fonts
 */
import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const FAMILY = 'orbitron';
const WEIGHTS = [400, 700];

const root = process.cwd();
const outDir = path.join(root, 'fonts');
const cssOut = path.join(root, 'css', 'fonts.css');

await mkdir(outDir, { recursive: true });

const faces = [];
let total = 0;

for (const weight of WEIGHTS) {
  const file = `${FAMILY}-latin-${weight}-normal.woff2`;
  const src = path.join(root, 'node_modules', '@fontsource', FAMILY, 'files', file);
  const dest = path.join(outDir, file);

  await copyFile(src, dest);
  const { size } = await stat(dest);
  total += size;

  faces.push(`@font-face {
  font-family: 'Orbitron';
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url('../fonts/${file}') format('woff2');
}`);
}

const css = `/* Generado por tools/copy-fonts.mjs - no editar a mano. */
${faces.join('\n\n')}
`;

await writeFile(cssOut, css, 'utf8');

console.log(`fuentes copiadas: ${WEIGHTS.length} (${(total / 1024).toFixed(1)} KB)`);
console.log(`css generado: css/fonts.css`);
