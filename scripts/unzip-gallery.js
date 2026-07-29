import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

const rootDir = path.join(process.cwd());
const galleryDir = path.join(rootDir, "public", "assets", "gallery");

if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

const zipFiles = fs
  .readdirSync(rootDir)
  .filter((file) => file.toLowerCase().endsWith(".zip"));

if (zipFiles.length === 0) {
  console.log("No .zip file found in root directory.");
  process.exit(0);
}

for (const zipFile of zipFiles) {
  const zipPath = path.join(rootDir, zipFile);
  console.log(`Found zip file: ${zipFile}. Extracting to public/assets/gallery...`);

  const zip = new AdmZip(zipPath);
  zip.extractAllTo(galleryDir, true);

  fs.unlinkSync(zipPath);
  console.log(`Removed ${zipFile}`);
}

console.log("Unzipped successfully.");