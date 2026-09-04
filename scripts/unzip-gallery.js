import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

const rootDir = path.join(process.cwd());
const galleryDir = path.join(rootDir, "public", "assets", "gallery");
const manifestPath = path.join(galleryDir, "manifest.json");
const mediaExtensions = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg", ".mp4", ".webm", ".mov", ".m4v"]);

if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

const zipFiles = fs
  .readdirSync(rootDir)
  .filter((file) => file.toLowerCase().endsWith(".zip"));

for (const zipFile of zipFiles) {
  const zipPath = path.join(rootDir, zipFile);
  console.log(`Found zip file: ${zipFile}. Extracting to public/assets/gallery...`);

  const zip = new AdmZip(zipPath);
  zip.extractAllTo(galleryDir, true);

  fs.unlinkSync(zipPath);
  console.log(`Removed ${zipFile}`);
}

const mediaFiles = fs
  .readdirSync(galleryDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && mediaExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry, index) => {
    const extension = path.extname(entry.name).toLowerCase();
    const type = extension === ".mp4" || extension === ".webm" || extension === ".mov" || extension === ".m4v" ? "video" : "image";
    const encodedName = encodeURIComponent(entry.name);
    return {
      id: `local-img-${index + 1}`,
      type,
      url: `/assets/gallery/${encodedName}`,
      aspect: index % 3 === 0 ? "portrait" : index % 2 === 0 ? "landscape" : "square",
    };
  });

fs.writeFileSync(manifestPath, `${JSON.stringify(mediaFiles, null, 2)}\n`);
console.log(`${zipFiles.length ? "Unzipped successfully and " : ""}updated gallery manifest with ${mediaFiles.length} media files.`);