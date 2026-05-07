import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const partial = readFileSync(join(root, 'public/partials/header.html'), 'utf8');
const START_TAG = '<div class="nav-overlay">';
const END_TAG   = '</header>';

const files = readdirSync(join(root, 'public'))
    .filter(f => f.endsWith('.html'))
    .map(f => join(root, 'public', f));

let stamped = 0;

for (const file of files) {
    const src = readFileSync(file, 'utf8');

    const startIdx = src.indexOf(START_TAG);
    if (startIdx === -1) {
        console.warn(`⚠  skipped (no header found): ${file}`);
        continue;
    }

    const endIdx = src.indexOf(END_TAG, startIdx) + END_TAG.length;

    // Preserve indentation that sits before the nav-overlay div
    let lineStart = startIdx;
    while (lineStart > 0 && src[lineStart - 1] !== '\n') lineStart--;
    const indent = src.slice(lineStart, startIdx).replace(/\S.*/, '');

    const updated = src.slice(0, lineStart) + indent + partial.trimStart() + src.slice(endIdx);
    writeFileSync(file, updated, 'utf8');
    stamped++;
    console.log(`✓  ${file.replace(root, '').replace(/\\/g, '/')}`);
}

console.log(`\nDone — ${stamped} pages updated.`);
