/// <reference types="vite/client" />

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

export interface GalleryItem {
  id: string;
  type: "image" | "youtube";
  url: string;
  aspect?: "short" | "landscape" | "square" | "portrait";
}

// 📌 PASTE YOUR YOUTUBE LINKS HERE LATER (Shorts or Widescreen)
const YOUTUBE_VIDEOS: GalleryItem[] = [
  { 
    id: "yt-rickroll", 
    type: "youtube", 
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Never gonna give you up!
    aspect: "landscape" 
  },
  /* Examples when you add yours later:
  { id: "yt-1", type: "youtube", url: "https://www.youtube.com/shorts/YOUR_SHORT_ID", aspect: "short" },
  { id: "yt-2", type: "youtube", url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", aspect: "landscape" },
  */
];

function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);
  return match && match[2].length === 11 ? match[2] : urlOrId;
}

function detectAspect(item: GalleryItem): string {
  if (item.aspect) {
    if (item.aspect === "short") return "aspect-[9/16]";
    if (item.aspect === "landscape") return "aspect-[16/9]";
    if (item.aspect === "square") return "aspect-square";
    return "aspect-[4/5]";
  }

  if (item.type === "youtube" && item.url.includes("/shorts/")) {
    return "aspect-[9/16]";
  }

  return "aspect-[4/5]";
}

export function CircularGallery({ customYouTubeVideos }: { customYouTubeVideos?: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);

  useEffect(() => {
    let loadedImages: GalleryItem[] = [];

    // Auto-grab images from /public/assets/gallery/
    try {
      const imageFiles = (import.meta as any).glob(
        '/public/assets/gallery/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,WEBP}',
        { eager: true, import: 'default' }
      ) as Record<string, string>;

      const filePaths = Object.keys(imageFiles);
      loadedImages = filePaths.map((filePath, index) => ({
        id: `local-img-${index + 1}`,
        type: "image",
        url: filePath.replace(/^\/public/, ''),
        aspect: "portrait",
      }));
    } catch (err) {
      console.warn("Error reading local gallery images:", err);
    }

    const ytList = customYouTubeVideos || YOUTUBE_VIDEOS;
    const combined = [...loadedImages, ...ytList];

    // Shuffle so YouTube videos mix in with local images
    const shuffled = [...combined].sort((a, b) => {
      let hashA = 0, hashB = 0;
      for (let i = 0; i < a.id.length; i++) hashA += a.id.charCodeAt(i);
      for (let i = 0; i < b.id.length; i++) hashB += b.id.charCodeAt(i);
      return (hashA % 13) - (hashB % 13);
    });

    setItems(shuffled);
  }, [customYouTubeVideos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, items.length]);

  if (items.length === 0) return null;

  const desktopCol1 = items.filter((_, i) => i % 3 === 0);
  const desktopCol2 = items.filter((_, i) => i % 3 === 1);
  const desktopCol3 = items.filter((_, i) => i % 3 === 2);

  const desktopColumns = [
    { id: "d1", items: desktopCol1, direction: "down" },
    { id: "d2", items: desktopCol2, direction: "up" },
    { id: "d3", items: desktopCol3, direction: "down" },
  ];

  const mobileCol1 = items.filter((_, i) => i % 2 === 0);
  const mobileCol2 = items.filter((_, i) => i % 2 === 1);

  const mobileColumns = [
    { id: "m1", items: mobileCol1, direction: "down" },
    { id: "m2", items: mobileCol2, direction: "up" },
  ];

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  const renderMediaCard = (item: GalleryItem, originalIndex: number) => {
    const isYT = item.type === "youtube";
    const ytId = isYT ? extractYouTubeId(item.url) : "";
    const thumbnailUrl = isYT
      ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
      : item.url;
    const aspectClass = detectAspect(item);

    return (
      <div
        key={item.id}
        onClick={() => setLightboxIndex(originalIndex)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg active:scale-95 bg-gray-900"
      >
        <div className={`w-full relative bg-black/20 flex items-center justify-center overflow-hidden ${aspectClass}`}>
          <img
            src={thumbnailUrl}
            alt="Gallery item"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isYT && (
            <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes slowScrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0%); } }
        @keyframes slowScrollUp { 0% { transform: translateY(0%); } 100% { transform: translateY(-50%); } }
        .animate-slow-down { animation: slowScrollDown 45s linear infinite; }
        .animate-slow-up { animation: slowScrollUp 45s linear infinite; }
      `}</style>

      {/* MOBILE VIEW */}
      <div className="md:hidden relative h-[600px] w-full overflow-hidden">
        <div className="grid grid-cols-2 gap-3 h-full">
          {mobileColumns.map((col) => {
            const duplicatedItems = [...col.items, ...col.items];
            const isPaused = hoveredCol === col.id;

            return (
              <div
                key={col.id}
                className="relative overflow-hidden h-full"
                onTouchStart={() => setHoveredCol(col.id)}
                onTouchEnd={() => setHoveredCol(null)}
              >
                <div
                  className={`flex flex-col gap-3 ${col.direction === "down" ? "animate-slow-down" : "animate-slow-up"}`}
                  style={{ animationPlayState: isPaused ? "paused" : "running", willChange: "transform" }}
                >
                  {duplicatedItems.map((item, itemIdx) => {
                    const originalIndex = items.findIndex((i) => i.id === item.id);
                    return <React.Fragment key={`m-${item.id}-${itemIdx}`}>{renderMediaCard(item, originalIndex)}</React.Fragment>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block relative h-[700px] w-full overflow-hidden">
        <div className="grid grid-cols-3 gap-4 h-full">
          {desktopColumns.map((col) => {
            const duplicatedItems = [...col.items, ...col.items];
            const isPaused = hoveredCol === col.id;

            return (
              <div
                key={col.id}
                className="relative overflow-hidden h-full"
                onMouseEnter={() => setHoveredCol(col.id)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <div
                  className={`flex flex-col gap-4 ${col.direction === "down" ? "animate-slow-down" : "animate-slow-up"}`}
                  style={{ animationPlayState: isPaused ? "paused" : "running", willChange: "transform" }}
                >
                  {duplicatedItems.map((item, itemIdx) => {
                    const originalIndex = items.findIndex((i) => i.id === item.id);
                    return <React.Fragment key={`d-${item.id}-${itemIdx}`}>{renderMediaCard(item, originalIndex)}</React.Fragment>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX POPUP */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/40 transition"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1)); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/40 transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0)); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/40 transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className={`relative overflow-hidden rounded-2xl bg-black shadow-2xl flex items-center justify-center ${
              activeItem.type === "youtube" && activeItem.url.includes("/shorts/")
                ? "h-[85vh] w-[48vh] max-w-full"
                : "h-[80vh] w-[90vw] max-w-4xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.type === "youtube" ? (
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(activeItem.url)}?autoplay=1`}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-2xl border-0"
              />
            ) : (
              <img
                src={activeItem.url}
                alt="Gallery item"
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}