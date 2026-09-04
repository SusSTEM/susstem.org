export type MediaType = "image" | "video";
export type MediaObjectFit = "auto" | "cover" | "contain" | "original";
export type MediaPlacement = "gallery" | "hero" | "both";

export interface MediaAsset {
  id: string;
  url: string;
  mediaType: MediaType;
  title: string;
  altText: string;
  nativeWidth: number;
  nativeHeight: number;
  zoom: number;
  focalPointX: number;
  focalPointY: number;
  objectFit: MediaObjectFit;
  placement: MediaPlacement;
  sourceName?: string;
  createdAt: string;
}

export const MEDIA_STORAGE_KEY = "susstem-media-assets-v1";

export const DEFAULT_MEDIA_ASSET: Pick<
  MediaAsset,
  "zoom" | "focalPointX" | "focalPointY" | "objectFit" | "placement"
> = {
  zoom: 1,
  focalPointX: 50,
  focalPointY: 50,
  objectFit: "auto",
  placement: "gallery",
};

export function readMediaAssets(): MediaAsset[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(MEDIA_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeMediaAssets(assets: MediaAsset[]): void {
  window.localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(assets));
  window.dispatchEvent(new CustomEvent("susstem-media-updated"));
}

export function getMediaAspect(asset: Pick<MediaAsset, "nativeWidth" | "nativeHeight">): string {
  if (!asset.nativeWidth || !asset.nativeHeight) return "4 / 5";
  return `${asset.nativeWidth} / ${asset.nativeHeight}`;
}

export function mediaAssetToGalleryItem(asset: MediaAsset) {
  return {
    id: asset.id,
    type: asset.mediaType === "video" ? ("video" as const) : ("image" as const),
    url: asset.url,
    aspect: "portrait" as const,
    title: asset.title,
    alt: asset.altText,
    nativeWidth: asset.nativeWidth,
    nativeHeight: asset.nativeHeight,
  };
}
