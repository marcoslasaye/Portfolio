/**
 * Optimiza las imagenes de img/ a WebP redimensionado.
 *
 * Uso: npm run optimize:images
 *
 * - Detecta que imagenes usa realmente el HTML (index.html, contact.html).
 * - Redimensiona segun el rol: las cards del grid renderizan ~400px de CSS,
 *   asi que 800px cubre pantallas retina sin desperdiciar bytes.
 * - Nunca sobreescribe los originales: todo sale a img/optimized/.
 * - Idempotente: si el HTML ya apunta a img/optimized/, resuelve el origen igual.
 */

import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'img');
const OUT_DIR = path.join(SRC_DIR, 'optimized');
const HTML_FILES = ['index.html', 'contact.html'];

/** Ancho maximo por defecto (cards del grid). */
const CARD_MAX_WIDTH = 800;

/** Overrides por archivo cuando el rol visual es distinto al de una card. */
const WIDTH_OVERRIDES = {
  'marcoslasaye_profile.png': 192, // avatar circular w-24 h-24 (96px CSS)
  'point-down.png': 160, // flecha decorativa
};

/** Calidad WebP. 80 es el punto donde el ojo deja de notar el cambio. */
const QUALITY = 80;

/** Archivos que no son imagenes optimizables. */
const IGNORED = /\.(ico|pdf|svg)$/i;

/** El preview social se genera aparte, no se convierte. */
const GENERATED = /^preview\.(jpe?g|webp)$/i;

async function collectReferences() {
  const refs = new Set();
  for (const file of HTML_FILES) {
    const html = await readFile(path.join(ROOT, file), 'utf8');
    for (const match of html.matchAll(/["']\.?\/?img\/([^"']+\.(?:png|jpe?g|webp))["']/gi)) {
      refs.add(path.posix.normalize(match[1]).replace(/^optimized\//, ''));
    }
  }
  return refs;
}

async function sizeOf(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return 0;
  }
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function main() {
  const refs = await collectReferences();
  if (refs.size === 0) {
    throw new Error('No se encontro ninguna referencia a img/ en el HTML.');
  }

  await mkdir(OUT_DIR, { recursive: true });

  const manifest = [];
  let totalIn = 0;
  let totalOut = 0;

  for (const name of [...refs].sort()) {
    const sourcePath = path.join(SRC_DIR, name);
    if (IGNORED.test(name) || GENERATED.test(name)) continue;

    const maxWidth = WIDTH_OVERRIDES[name] ?? CARD_MAX_WIDTH;
    const outputName = `${path.parse(name).name}.webp`;

    const image = sharp(sourcePath, { failOn: 'none' });
    const meta = await image.metadata();

    const { data, info } = await image
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer({ resolveWithObject: true });

    await writeFile(path.join(OUT_DIR, outputName), data);

    const bytesIn = await sizeOf(sourcePath);
    totalIn += bytesIn;
    totalOut += info.size;

    manifest.push({
      source: `img/${name}`,
      output: `img/optimized/${outputName}`,
      width: info.width,
      height: info.height,
      originalWidth: meta.width ?? null,
      originalHeight: meta.height ?? null,
      bytesIn,
      bytesOut: info.size,
    });

    const saved = bytesIn > 0 ? `${(100 - (info.size / bytesIn) * 100).toFixed(0)}%` : 'n/a';
    console.log(
      `${name} -> ${outputName}  ${meta.width ?? '?'}x${meta.height ?? '?'} => ${info.width}x${info.height}  ${formatKb(bytesIn)} => ${formatKb(info.size)}  (-${saved})`
    );
  }

  // Imagen de preview para og:image / twitter:image (1200x630, formato social).
  const previewSource = path.join(SRC_DIR, 'AerialView_BlueCoralKarimunjawa_min.jpg');
  await sharp(previewSource, { failOn: 'none' })
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(SRC_DIR, 'preview.jpg'));
  console.log('preview.jpg generado (1200x630) para og:image');

  await writeFile(
    path.join(OUT_DIR, 'manifest.json'),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), items: manifest }, null, 2)}\n`
  );

  console.log(
    `\nTotal: ${manifest.length} imagenes  ${formatKb(totalIn)} => ${formatKb(totalOut)}  (-${(100 - (totalOut / totalIn) * 100).toFixed(0)}%)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
