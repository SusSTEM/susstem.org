import { useRef, useState } from "react";
import JSZip from "jszip";
import { FileImage, UploadCloud } from "lucide-react";
import type { MediaAsset, MediaType } from "../../media/mediaTypes";
import { DEFAULT_MEDIA_ASSET } from "../../media/mediaTypes";

interface UnifiedUploadDropzoneProps {
  onAssetsReady: (assets: MediaAsset[]) => void;
  onReplaceFileReady?: (file: File, draft: MediaAsset) => void | Promise<void>;
}

const ACCEPTED = "image/*,video/*,.zip";
const isVideo = (file: File) => file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
const isMedia = (file: File) => file.type.startsWith("image/") || isVideo(file);

function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getDimensions(url: string, type: MediaType): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    if (type === "image") {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => resolve({ width: 0, height: 0 });
      image.src = url;
      return;
    }
    const video = document.createElement("video");
    video.onloadedmetadata = () => resolve({ width: video.videoWidth, height: video.videoHeight });
    video.onerror = () => resolve({ width: 0, height: 0 });
    video.src = url;
  });
}

function titleFromName(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function prepareFiles(files: File[], setProgress: (value: number) => void) {
  const expanded = files.filter(isMedia);
  for (const archive of files.filter((file) => file.name.toLowerCase().endsWith(".zip"))) {
    const zip = await JSZip.loadAsync(archive);
    for (const entry of Object.values(zip.files)) {
      if (entry.dir || !/\.(jpe?g|png|gif|webp|avif|mp4|webm|mov|m4v)$/i.test(entry.name)) continue;
      const blob = await entry.async("blob");
      expanded.push(new File([blob], entry.name.split("/").pop() || "media", { type: blob.type }));
    }
  }

  const drafts: MediaAsset[] = [];
  for (let index = 0; index < expanded.length; index += 1) {
    const file = expanded[index];
    const mediaType: MediaType = isVideo(file) ? "video" : "image";
    const url = await readAsDataUrl(file);
    const dimensions = await getDimensions(url, mediaType);
    drafts.push({
      id: `upload-${Date.now()}-${index}`,
      url,
      mediaType,
      title: titleFromName(file.name),
      altText: titleFromName(file.name),
      nativeWidth: dimensions.width,
      nativeHeight: dimensions.height,
      ...DEFAULT_MEDIA_ASSET,
      sourceName: file.name,
      createdAt: new Date().toISOString(),
    });
    setProgress(Math.round(((index + 1) / expanded.length) * 100));
  }
  return { files: expanded, drafts };
}

export function UnifiedUploadDropzone({ onAssetsReady, onReplaceFileReady }: UnifiedUploadDropzoneProps) {
  const addInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pending, setPending] = useState<MediaAsset[]>([]);
  const [message, setMessage] = useState("Add new media");

  const addFiles = async (files: File[]) => {
    if (!files.length) return;
    const result = await prepareFiles(files, setProgress);
    setPending(result.drafts);
    onAssetsReady(result.drafts);
    setMessage(`${result.drafts.length} new item${result.drafts.length === 1 ? "" : "s"} added`);
  };

  const replaceFile = async (file: File) => {
    const result = await prepareFiles([file], setProgress);
    const draft = result.drafts[0];
    if (!draft || !onReplaceFileReady) return;
    setPending([draft]);
    await onReplaceFileReady(result.files[0], draft);
    setMessage("Selected media replaced");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => addInputRef.current?.click()} onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); void addFiles(Array.from(event.dataTransfer.files)); }} className={`flex min-h-48 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 text-center transition ${isDragging ? "border-[#20593a] bg-[#eaf3f1]" : "border-[#cbded9] bg-[#fbfdfc] hover:border-[#7da79e] hover:bg-[#f5faf8]"}`}>
          <input ref={addInputRef} type="file" accept={ACCEPTED} multiple className="hidden" onChange={(event) => { void addFiles(Array.from(event.target.files || [])); event.currentTarget.value = ""; }} />
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf3f1] text-[#20593a]"><UploadCloud className="h-5 w-5" /></span>
          <strong className="text-sm text-[#072d2d]">{message}</strong>
          <span className="mt-1 text-xs text-[#607975]">Choose files, drag them here, or upload a ZIP</span>
        </button>
        <button type="button" onClick={() => replaceInputRef.current?.click()} className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-[#20593a] bg-[#f1f8f5] px-6 text-center text-sm font-semibold text-[#20593a] transition hover:bg-[#e5f2ec]">
          <input ref={replaceInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void replaceFile(file); event.currentTarget.value = ""; }} />
          <FileImage className="h-6 w-6" />
          <span>Replace selected media</span>
          <span className="text-xs font-normal text-[#607975]">Only the file changes; details stay the same</span>
        </button>
      </div>
      {progress > 0 && progress < 100 ? <div><div className="mb-1 flex justify-between text-xs text-[#56716d]"><span>Preparing previews</span><span>{progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#e5efed]"><div className="h-full rounded-full bg-[#20593a] transition-all" style={{ width: `${progress}%` }} /></div></div> : null}
      {pending.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{pending.map((asset) => <div key={asset.id} className="relative aspect-square overflow-hidden rounded-xl bg-[#eaf3f1]">{asset.mediaType === "video" ? <video src={asset.url} muted className="h-full w-full object-cover" /> : <img src={asset.url} alt={asset.altText} className="h-full w-full object-cover" />}<span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{asset.mediaType === "video" ? "Video" : "Image"}</span></div>)}</div> : null}
    </div>
  );
}
