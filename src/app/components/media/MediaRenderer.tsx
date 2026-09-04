import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { MediaAsset } from "../../media/mediaTypes";
import { getMediaAspect } from "../../media/mediaTypes";

interface MediaRendererProps {
  asset: MediaAsset;
  className?: string;
  eager?: boolean;
  controls?: boolean;
  onMetadata?: (width: number, height: number) => void;
}

export function MediaRenderer({ asset, className = "", eager = false, controls = false, onMetadata }: MediaRendererProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const fit = asset.objectFit === "auto" ? "contain" : asset.objectFit;
  const objectFit = asset.objectFit === "original" ? "none" : fit;
  const mediaStyle = {
    objectFit,
    objectPosition: `${asset.focalPointX}% ${asset.focalPointY}%`,
    transform: `scale(${asset.zoom})`,
  } as const;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => setProgress(video.duration ? video.currentTime / video.duration : 0);
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  if (asset.mediaType === "image") {
    return (
      <img
        src={asset.url}
        alt={asset.altText || asset.title}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        width={asset.nativeWidth || undefined}
        height={asset.nativeHeight || undefined}
        onLoad={(event) => {
          const image = event.currentTarget;
          onMetadata?.(image.naturalWidth, image.naturalHeight);
        }}
        className={`h-full w-full transition-transform duration-300 ${className}`}
        style={mediaStyle}
      />
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ aspectRatio: getMediaAspect(asset) }}>
      <video
        ref={videoRef}
        src={asset.url}
        preload="metadata"
        playsInline
        muted={isMuted}
        onLoadedMetadata={(event) => onMetadata?.(event.currentTarget.videoWidth, event.currentTarget.videoHeight)}
        className="h-full w-full"
        style={mediaStyle}
      />
      {controls ? (
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-black/65 px-3 py-2 text-white backdrop-blur-md">
          <button type="button" onClick={() => { const video = videoRef.current; if (!video) return; if (video.paused) { void video.play(); setIsPlaying(true); } else { video.pause(); setIsPlaying(false); } }} aria-label={isPlaying ? "Pause video" : "Play video"}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <input aria-label="Video progress" type="range" min="0" max="1" step="0.01" value={progress} onChange={(event) => { const video = videoRef.current; if (video) video.currentTime = Number(event.target.value) * video.duration; setProgress(Number(event.target.value)); }} className="min-w-0 flex-1 accent-white" />
          <button type="button" onClick={() => setIsMuted((value) => !value)} aria-label={isMuted ? "Unmute video" : "Mute video"}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input aria-label="Video volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => { const nextVolume = Number(event.target.value); setVolume(nextVolume); if (videoRef.current) videoRef.current.volume = nextVolume; }} className="w-16 accent-white" />
          <button type="button" onClick={() => { void videoRef.current?.requestFullscreen?.(); }} aria-label="Fullscreen video"><Maximize2 className="h-4 w-4" /></button>
        </div>
      ) : null}
    </div>
  );
}
