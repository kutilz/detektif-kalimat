// Generate PWA icon PNGs from the master SVG using sharp.
// Run with: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svg = readFileSync(join(root, 'src/assets/app-icon.svg'));
const outDir = join(root, 'public');
mkdirSync(outDir, { recursive: true });

const targets = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'maskable-icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon-180x180.png', size: 180 },
  { name: 'favicon-32x32.png', size: 32 },
];

for (const t of targets) {
  await sharp(svg)
    .resize(t.size, t.size)
    .png()
    .toFile(join(outDir, t.name));
  console.log('generated', t.name);
}
console.log('done');
