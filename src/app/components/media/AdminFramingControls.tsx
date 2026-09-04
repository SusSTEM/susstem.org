import { useState } from "react";
import { Move, RotateCcw } from "lucide-react";
import type { MediaAsset, MediaObjectFit } from "../../media/mediaTypes";

interface AdminFramingControlsProps { asset: MediaAsset; onChange: (asset: MediaAsset) => void; }

export function AdminFramingControls({ asset, onChange }: AdminFramingControlsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const update = (patch: Partial<MediaAsset>) => onChange({ ...asset, ...patch });
  return (
    <div className="space-y-4 rounded-2xl border border-[#dce8e5] bg-[#f7fbfa] p-4">
      <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-[#072d2d]">Framing controls</p><p className="text-xs text-[#5c7774]">Tune how this media sits inside its frame.</p></div><button type="button" onClick={() => update({ zoom: 1, focalPointX: 50, focalPointY: 50, objectFit: "auto" })} className="inline-flex items-center gap-1 text-xs font-medium text-[#20593a] hover:text-[#072d2d]"><RotateCcw className="h-3.5 w-3.5" /> Reset</button></div>
      <label className="block text-xs font-semibold text-[#35514e]">Zoom <span className="float-right font-normal">{asset.zoom.toFixed(2)}x</span><input type="range" min="0.75" max="2.5" step="0.05" value={asset.zoom} onChange={(event) => update({ zoom: Number(event.target.value) })} className="mt-2 w-full accent-[#20593a]" /></label>
      <div><p className="mb-2 text-xs font-semibold text-[#35514e]">Fit mode</p><div className="grid grid-cols-4 gap-1.5">{(["auto", "cover", "contain", "original"] as MediaObjectFit[]).map((fit) => <button key={fit} type="button" onClick={() => update({ objectFit: fit })} className={`rounded-lg px-2 py-2 text-[11px] font-medium capitalize transition ${asset.objectFit === fit ? "bg-[#20593a] text-white" : "bg-white text-[#35514e] ring-1 ring-[#dce8e5] hover:bg-[#eaf3f1]"}`}>{fit}</button>)}</div></div>
      <div><p className="mb-2 flex items-center gap-1 text-xs font-semibold text-[#35514e]"><Move className="h-3.5 w-3.5" /> Focal point</p><div className={`relative h-28 overflow-hidden rounded-xl bg-[#dce8e5] ${isDragging ? "cursor-grabbing" : "cursor-crosshair"}`} onPointerDown={(event) => { setIsDragging(true); event.currentTarget.setPointerCapture(event.pointerId); const rect = event.currentTarget.getBoundingClientRect(); update({ focalPointX: Math.round(((event.clientX - rect.left) / rect.width) * 100), focalPointY: Math.round(((event.clientY - rect.top) / rect.height) * 100) }); }} onPointerMove={(event) => { if (!isDragging) return; const rect = event.currentTarget.getBoundingClientRect(); update({ focalPointX: Math.max(0, Math.min(100, Math.round(((event.clientX - rect.left) / rect.width) * 100))), focalPointY: Math.max(0, Math.min(100, Math.round(((event.clientY - rect.top) / rect.height) * 100))) }); }} onPointerUp={() => setIsDragging(false)}><img src={asset.url} alt="Focal point preview" className="h-full w-full object-cover opacity-70" style={{ objectPosition: `${asset.focalPointX}% ${asset.focalPointY}%`, transform: `scale(${asset.zoom})` }} /><span className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_2px_#20593a]" style={{ left: `${asset.focalPointX}%`, top: `${asset.focalPointY}%` }} /></div></div>
    </div>
  );
}
