// Generate PWA icon PNGs from the master artwork using sharp.
// Source: src/assets/app-icon-source.jpg (magnifying glass over S-P-O puzzle).
// Run with: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPath = join(root, 'src/assets/app-icon-source.jpg');
const outDir = join(root, 'public');
mkdirSync(outDir, { recursive: true });

// Detect the flat background colour from the top-left pixel so we can both
// trim the artwork and rebuild a clean full-bleed background behind it.
const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
const BG = { r: data[0], g: data[1], b: data[2] };

// Crop away the empty margin so the magnifying glass is centred on its own bbox.
const glassBuf = await sharp(srcPath).trim({ background: BG, threshold: 28 }).png().toBuffer();

async function make(name, size, frac) {
  const max = Math.round(size * frac);
  const glass = await sharp(glassBuf).resize(max, max, { fit: 'inside' }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 3, background: BG } })
    .composite([{ input: glass, gravity: 'center' }])
    .png()
    .toFile(join(outDir, name));
  console.log('generated', name);
}

// `frac` = how much of the canvas the artwork fills. Maskable needs a bigger
// safe margin so nothing important is clipped by the OS mask.
await make('pwa-192x192.png', 192, 0.9);
await make('pwa-512x512.png', 512, 0.9);
await make('maskable-icon-512x512.png', 512, 0.66);
await make('apple-touch-icon-180x180.png', 180, 0.86);
await make('favicon-32x32.png', 32, 0.92);
console.log('done');
