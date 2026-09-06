import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envText = await fs.readFile(path.join(root, ".env.local"), "utf8").catch(() => "");
const readEnv = (name) => process.env[name] || envText.match(new RegExp(`^${name}=(.*)$`, "m"))?.[1]?.trim();
const supabaseUrl = readEnv("VITE_SUPABASE_URL") || readEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
if (!supabaseUrl || !serviceRoleKey) throw new Error("Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.");

const supabase = createClient(supabaseUrl, serviceRoleKey);
const heroSources = [
  ["public/images/main pages/SusSTEM_Banner_Selfie.jpg", "Inspiring the next generation of sustainable innovators"],
  ["public/images/main pages/cutemelookingatlegosusstem.jpg", "STEM-Powered Minds for a Sustainable Tomorrow"],
  ["public/images/main pages/arduinobreadboardimagesusstem.jpg", "Sustainability + STEM"],
  ["public/images/main pages/dudeholdingstemsusstem.jpg", "STEM for every child, everywhere"],
  ["public/images/main pages/floodforherosusstem.jpg", "Solving global sustainability challenges with STEM"],
];
const manifest = JSON.parse(await fs.readFile(path.join(root, "public/assets/gallery/manifest.json"), "utf8"));
const sources = [
  ...heroSources.map(([file, title], sortOrder) => ({ file, title, placement: "hero", sortOrder })),
  ...manifest.filter((item) => item.type === "image" || item.type === "video").map((item, sortOrder) => ({ file: decodeURIComponent(item.url.replace(/^\/assets\//, "public/assets/")), title: item.title || "Gallery media", placement: "gallery", sortOrder })),
];

function stableId(file) {
  const hex = crypto.createHash("sha256").update(file).digest("hex").slice(0, 32).split("");
  hex[12] = "4";
  hex[16] = ((Number.parseInt(hex[16], 16) & 3) | 8).toString(16);
  return `${hex.slice(0, 8).join("")}-${hex.slice(8, 12).join("")}-${hex.slice(12, 16).join("")}-${hex.slice(16, 20).join("")}-${hex.slice(20).join("")}`;
}

for (const source of sources) {
  const absoluteFile = path.join(root, source.file);
  const fileBuffer = await fs.readFile(absoluteFile);
  const extension = path.extname(absoluteFile).toLowerCase();
  const mediaType = [".mp4", ".webm", ".mov", ".m4v"].includes(extension) ? "video" : "image";
  const id = stableId(source.file);
  const storagePath = `${mediaType}s/${source.placement}/${id}${extension}`;
  const contentType = mediaType === "video" ? `video/${extension.slice(1)}` : `image/${extension === ".jpg" ? "jpeg" : extension.slice(1)}`;
  const { error: uploadError } = await supabase.storage.from("media").upload(storagePath, fileBuffer, { contentType, upsert: true });
  if (uploadError) throw uploadError;
  const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(storagePath);
  const { error: rowError } = await supabase.from("media_assets").upsert({
    id,
    storage_bucket: "media",
    storage_path: storagePath,
    public_url: publicUrl.publicUrl,
    media_type: mediaType,
    title: source.title,
    alt_text: source.title,
    native_width: 0,
    native_height: 0,
    placement: source.placement,
    sort_order: source.sortOrder,
    is_published: true,
    zoom: 1,
    focal_point_x: 50,
    focal_point_y: 50,
    object_fit: "auto",
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  if (rowError) throw rowError;
  console.log(`Migrated ${source.file}`);
}
