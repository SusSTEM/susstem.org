import { supabase } from "../../lib/supabase";
import type { MediaAsset, MediaPlacement } from "./mediaTypes";

interface MediaRow {
  id: string;
  storage_bucket: string;
  storage_path: string;
  public_url: string;
  media_type: "image" | "video";
  title: string;
  alt_text: string;
  native_width: number;
  native_height: number;
  placement: MediaPlacement;
  sort_order: number;
  is_published: boolean;
  zoom: number;
  focal_point_x: number;
  focal_point_y: number;
  object_fit: MediaAsset["objectFit"];
  brightness: number;
  contrast: number;
  saturation: number;
  created_by: string | null;
  created_at: string;
}

export function mediaRowToAsset(row: MediaRow): MediaAsset {
  return {
    id: row.id,
    url: row.public_url,
    mediaType: row.media_type,
    title: row.title,
    altText: row.alt_text,
    nativeWidth: row.native_width,
    nativeHeight: row.native_height,
    placement: row.placement,
    sortOrder: row.sort_order,
    isPublished: row.is_published,
    storageBucket: row.storage_bucket,
    storagePath: row.storage_path,
    createdBy: row.created_by ?? undefined,
    zoom: row.zoom,
    focalPointX: row.focal_point_x,
    focalPointY: row.focal_point_y,
    objectFit: row.object_fit,
    brightness: row.brightness,
    contrast: row.contrast,
    saturation: row.saturation,
    createdAt: row.created_at,
  };
}

export async function fetchPublishedMedia(placement?: MediaPlacement): Promise<MediaAsset[]> {
  if (!supabase) return [];
  let query = supabase.from("media_assets").select("*").eq("is_published", true).order("sort_order", { ascending: true });
  if (placement) query = query.in("placement", [placement, "both"]);
  const { data, error } = await query;
  if (error) throw error;
  return (data as MediaRow[]).map(mediaRowToAsset);
}

export async function saveMediaAsset(asset: MediaAsset): Promise<MediaAsset> {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase.from("media_assets").upsert({
    id: asset.id,
    storage_bucket: asset.storageBucket ?? "media",
    storage_path: asset.storagePath ?? `legacy/${asset.id}`,
    public_url: asset.url,
    media_type: asset.mediaType,
    title: asset.title,
    alt_text: asset.altText,
    native_width: asset.nativeWidth,
    native_height: asset.nativeHeight,
    placement: asset.placement,
    sort_order: asset.sortOrder ?? 0,
    is_published: asset.isPublished ?? true,
    zoom: asset.zoom,
    focal_point_x: asset.focalPointX,
    focal_point_y: asset.focalPointY,
    object_fit: asset.objectFit,
    brightness: asset.brightness ?? 100,
    contrast: asset.contrast ?? 100,
    saturation: asset.saturation ?? 100,
  }).select().single();
  if (error) throw error;
  return mediaRowToAsset(data as MediaRow);
}

export async function uploadMediaFile(file: File, draft: MediaAsset, existingId?: string): Promise<MediaAsset> {
  if (!supabase) throw new Error("Supabase is not configured");
  const path = `${draft.mediaType}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return saveMediaAsset({ ...draft, id: existingId ?? draft.id, url: data.publicUrl, storageBucket: "media", storagePath: path });
}
