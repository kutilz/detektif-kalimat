const sharp = require('sharp');
const fs = require('fs');

async function convert(fileIn, fileOut) {
    await sharp(fileIn).png().toFile(fileOut);
    console.log(`Converted ${fileIn} to ${fileOut}`);
}

async function main() {
    await convert('icons/D-detective-silhouette.svg', 'icons/D-detective-silhouette.png');
    await convert('icons/E-cute-detective.svg', 'icons/E-cute-detective.png');
    await convert('icons/F-person-magnifying-glass.svg', 'icons/F-person-magnifying-glass.png');
}

main().catch(console.error);
