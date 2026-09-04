import { useRef, useState } from "react";
import JSZip from "jszip";
import { FileArchive, FileImage, FileVideo, UploadCloud, X } from "lucide-react";
import type { MediaAsset, MediaType } from "../../media/mediaTypes";
import { DEFAULT_MEDIA_ASSET } from "../../media/mediaTypes";

interface UnifiedUploadDropzoneProps { onAssetsReady: (assets: MediaAsset[]) => void; }
const ACCEPTED = "image/*,video/*,.zip";
const isVideo = (file: File) => file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
const isMedia = (file: File) => file.type.startsWith("image/") || isVideo(file);

function readAsDataUrl(file: Blob): Promise<string> { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); }); }
function getDimensions(file: File, url: string, type: MediaType): Promise<{ width: number; height: number }> { return new Promise((resolve) => { if (type === "image") { const image = new Image(); image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight }); image.onerror = () => resolve({ width: 0, height: 0 }); image.src = url; return; } const video = document.createElement("video"); video.onloadedmetadata = () => resolve({ width: video.videoWidth, height: video.videoHeight }); video.onerror = () => resolve({ width: 0, height: 0 }); video.src = url; }); }
function titleFromName(name: string) { return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }

export function UnifiedUploadDropzone({ onAssetsReady }: UnifiedUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pending, setPending] = useState<MediaAsset[]>([]);
  const [message, setMessage] = useState("Drop images, videos, or a ZIP archive here");

  const processFiles = async (files: File[]) => {
    const expanded: File[] = [];
    const archives = files.filter((file) => file.name.toLowerCase().endsWith(".zip"));
    const direct = files.filter(isMedia);
    expanded.push(...direct);
    for (const archive of archives) { const zip = await JSZip.loadAsync(archive); const entries = Object.values(zip.files); for (const entry of entries) { if (entry.dir || !/\.(jpe?g|png|gif|webp|avif|mp4|webm|mov|m4v)$/i.test(entry.name)) continue; const blob = await entry.async("blob"); expanded.push(new File([blob], entry.name.split("/").pop() || "media", { type: blob.type })); } } 
    const assets: MediaAsset[] = [];
    for (let index = 0; index < expanded.length; index += 1) { const file = expanded[index]; const mediaType: MediaType = isVideo(file) ? "video" : "image"; const url = await readAsDataUrl(file); const dimensions = await getDimensions(file, url, mediaType); assets.push({ id: `upload-${Date.now()}-${index}`, url, mediaType, title: titleFromName(file.name), altText: titleFromName(file.name), nativeWidth: dimensions.width, nativeHeight: dimensions.height, ...DEFAULT_MEDIA_ASSET, sourceName: file.name, createdAt: new Date().toISOString() }); setProgress(Math.round(((index + 1) / expanded.length) * 100)); }
    setPending(assets); onAssetsReady(assets); setMessage(`${assets.length} media item${assets.length === 1 ? "" : "s"} ready to review`);
  };

  return <div className="space-y-4"><button type="button" onClick={() => inputRef.current?.click()} onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); void processFiles(Array.from(event.dataTransfer.files)); }} className={`flex min-h-48 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 text-center transition ${isDragging ? "border-[#20593a] bg-[#eaf3f1]" : "border-[#cbded9] bg-[#fbfdfc] hover:border-[#7da79e] hover:bg-[#f5faf8]"}`}><input ref={inputRef} type="file" accept={ACCEPTED} multiple className="hidden" onChange={(event) => { void processFiles(Array.from(event.target.files || [])); event.currentTarget.value = ""; }} /><span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf3f1] text-[#20593a]"><UploadCloud className="h-6 w-6" /></span><strong className="text-sm text-[#072d2d]">{message}</strong><span className="mt-1 text-xs text-[#607975]">Choose one or many files, drag them in, or upload a ZIP</span></button>{progress > 0 && progress < 100 ? <div><div className="mb-1 flex justify-between text-xs text-[#56716d]"><span>Preparing previews</span><span>{progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#e5efed]"><div className="h-full rounded-full bg-[#20593a] transition-all" style={{ width: `${progress}%` }} /></div></div> : null}{pending.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{pending.map((asset) => <div key={asset.id} className="relative aspect-square overflow-hidden rounded-xl bg-[#eaf3f1]">{asset.mediaType === "video" ? <video src={asset.url} muted className="h-full w-full object-cover" /> : <img src={asset.url} alt={asset.altText} className="h-full w-full object-cover" />}<span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{asset.mediaType === "video" ? <FileVideo className="inline h-3 w-3" /> : <FileImage className="inline h-3 w-3" />} {asset.nativeWidth}x{asset.nativeHeight}</span><button type="button" onClick={() => { const next = pending.filter((item) => item.id !== asset.id); setPending(next); onAssetsReady(next); }} className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white" aria-label={`Remove ${asset.title}`}><X className="h-3 w-3" /></button></div>)}</div> : null}</div>;
}
