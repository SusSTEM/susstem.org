import path from "path";
import { readdir } from "fs/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GalleryAspectRatio = "portrait" | "landscape" | "square" | "tall";
type GalleryMediaType = "image" | "video";

interface GalleryRouteItem {
  id: string;
  title: string;
  type: GalleryMediaType;
  aspectRatio: GalleryAspectRatio;
  media: {
    url: string;
  };
}

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov", ".m4v"]);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"]);
const ASPECT_RATIOS: GalleryAspectRatio[] = ["portrait", "landscape", "square", "tall"];
const GALLERY_DIRECTORIES = [
  path.join(process.cwd(), "public", "images", "main pages"),
  path.join(process.cwd(), "public", "assets", "gallery"),
];

function toTitleCase(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase()) || "Gallery Item";
}

function getMediaType(fileName: string): GalleryMediaType | null {
  const extension = path.extname(fileName).toLowerCase();
  if (VIDEO_EXTENSIONS.has(extension)) {
    return "video";
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    return "image";
  }

  return null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

export async function GET() {
  try {
    for (const directory of GALLERY_DIRECTORIES) {
      try {
        const directoryEntries = await readdir(directory, { withFileTypes: true });

        const items: GalleryRouteItem[] = directoryEntries
          .filter((entry) => entry.isFile())
          .map((entry, index) => {
            const mediaType = getMediaType(entry.name);
            if (!mediaType) {
              return null;
            }

            const displayTitle = toTitleCase(entry.name);
            const aspectRatio = ASPECT_RATIOS[index % ASPECT_RATIOS.length];
            const fileUrl = directory.includes("main pages")
              ? `/images/main%20pages/${encodeURIComponent(entry.name)}`
              : `/assets/gallery/${encodeURIComponent(entry.name)}`;

            return {
              id: `gallery-${index + 1}-${slugify(displayTitle)}`,
              title: displayTitle,
              type: mediaType,
              aspectRatio,
              media: {
                url: fileUrl,
              },
            } satisfies GalleryRouteItem;
          })
          .filter((item): item is GalleryRouteItem => item !== null)
          .sort((left, right) => left.title.localeCompare(right.title, undefined, { sensitivity: "base" }));

        if (items.length > 0) {
          return Response.json({ items });
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }
    }

    return Response.json({ items: [] satisfies GalleryRouteItem[] });
  } catch (error) {
    return Response.json(
      {
        items: [] as GalleryRouteItem[],
        error: "Unable to read gallery assets.",
      },
      { status: 500 },
    );
  }
}
