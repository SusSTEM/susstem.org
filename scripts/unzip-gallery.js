import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";
import { imageSize } from "image-size";

const rootDir = path.join(process.cwd());
const galleryDir = path.join(rootDir, "public", "assets", "gallery");
const manifestPath = path.join(galleryDir, "manifest.json");
const mediaExtensions = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg", ".mp4", ".webm", ".mov", ".m4v"]);

function titleFromName(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim() || "Media";
}

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
    const filePath = path.join(galleryDir, entry.name);
    let nativeWidth = 0;
    let nativeHeight = 0;

    if (type === "image") {
      try {
        const dimensions = imageSize(fs.readFileSync(filePath));
        nativeWidth = dimensions.width ?? 0;
        nativeHeight = dimensions.height ?? 0;
      } catch {
        // The browser can still display the asset if its format is not supported by image-size.
      }
    }

    return {
      id: `local-img-${index + 1}`,
      type,
      url: `/assets/gallery/${encodedName}`,
      title: titleFromName(entry.name),
      aspect: index % 3 === 0 ? "portrait" : index % 2 === 0 ? "landscape" : "square",
      nativeWidth,
      nativeHeight,
    };
  });

fs.writeFileSync(manifestPath, `${JSON.stringify(mediaFiles, null, 2)}\n`);
console.log(`${zipFiles.length ? "Unzipped successfully and " : ""}updated gallery manifest with ${mediaFiles.length} media files.`);