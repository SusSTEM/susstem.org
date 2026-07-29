/// <reference types="vite/client" />

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  type: "image" | "video";
  aspectRatio?: "portrait" | "landscape" | "square" | "tall";
  media: {
    url: string;
    alt?: string;
  };
}

function getYouTubeEmbedUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
    : null;
}

interface GalleryProps {
  items?: GalleryItem[];
}

export function CircularGallery({ items: initialItems }: GalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems || []);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);

  useEffect(() => {
    if (!initialItems || initialItems.length === 0) {
      try {
        // Read files using Vite's glob import
        const mediaFiles = (import.meta as any).glob(
          '/public/assets/gallery/*.{jpg,jpeg,png,gif,webp,mp4,webm,mov,JPG,JPEG,PNG,MP4}',
          {
            eager: true,
            import: 'default',
          }
        ) as Record<string, string>;

        const aspectRatios: Array<"portrait" | "landscape" | "square" | "tall"> = [
          "portrait",
          "landscape",
          "square",
          "tall",
        ];

        const filePaths = Object.keys(mediaFiles);

        if (filePaths.length === 0) {
          console.warn("No gallery files found in /public/assets/gallery/");
          setItems([]);
          return;
        }

        const loadedItems: GalleryItem[] = filePaths.map((filePath, index) => {
          const cleanUrl = filePath.replace(/^\/public/, '');
          const fileName = filePath.split('/').pop() || `Item ${index + 1}`;
          const ext = fileName.split('.').pop()?.toLowerCase() || '';
          const isVideo = ['mp4', 'webm', 'mov'].includes(ext);

          const title = fileName
            .replace(/\.[^.]+$/, '')
            .replace(/[-_]+/g, ' ')
            .trim();

          return {
            id: `gallery-${index + 1}`,
            title: title || `Gallery Item ${index + 1}`,
            type: isVideo ? 'video' : 'image',
            aspectRatio: aspectRatios[index % aspectRatios.length],
            media: {
              url: cleanUrl,
            },
          };
        });

        setItems(loadedItems);
      } catch (error) {
        console.error("Error loading gallery files:", error);
      }
    }
  }, [initialItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, items.length]);

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No gallery assets found in /public/assets/gallery.
      </div>
    );
  }

  // Desktop: 3 Columns
  const desktopCol1 = items.filter((_, i) => i % 3 === 0);
  const desktopCol2 = items.filter((_, i) => i % 3 === 1);
  const desktopCol3 = items.filter((_, i) => i % 3 === 2);

  const desktopColumns = [
    { id: "d1", items: desktopCol1, direction: "down" },
    { id: "d2", items: desktopCol2, direction: "up" },
    { id: "d3", items: desktopCol3, direction: "down" },
  ];

  // Mobile: 2 Columns
  const mobileCol1 = items.filter((_, i) => i % 2 === 0);
  const mobileCol2 = items.filter((_, i) => i % 2 === 1);

  const mobileColumns = [
    { id: "m1", items: mobileCol1, direction: "down" },
    { id: "m2", items: mobileCol2, direction: "up" },
  ];

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  const renderMediaCard = (item: GalleryItem, originalIndex: number) => {
    const aspectClass =
      item.aspectRatio === "tall"
        ? "aspect-[3/5]"
        : item.aspectRatio === "portrait"
        ? "aspect-[4/5]"
        : item.aspectRatio === "landscape"
        ? "aspect-[16/10]"
        : "aspect-square";

    const ytEmbed = item.type === "video" ? getYouTubeEmbedUrl(item.media.url) : null;

    return (
      <div
        key={item.id}
        onClick={() => setLightboxIndex(originalIndex)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg active:scale-95"
      >
        <div className={`w-full ${aspectClass} relative bg-gray-100`}>
          {item.type === "video" ? (
            <div className="relative h-full w-full bg-gray-900 flex items-center justify-center">
              <video
                src={item.media.url}
                className="h-full w-full object-cover opacity-85"
                muted
                playsInline
              />
              <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <Play className="h-4 w-4 fill-current ml-0.5" />
              </div>
            </div>
          ) : (
            <img
              src={item.media.url}
              alt={item.media.alt || item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 text-white opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100 flex flex-col justify-end">
            <p className="text-xs font-bold leading-tight truncate">{item.title}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes slowScrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        @keyframes slowScrollUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-slow-down {
          animation: slowScrollDown 75s linear infinite;
        }
        .animate-slow-up {
          animation: slowScrollUp 75s linear infinite;
        }
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
                  className={`flex flex-col gap-3 ${
                    col.direction === "down" ? "animate-slow-down" : "animate-slow-up"
                  }`}
                  style={{
                    animationPlayState: isPaused ? "paused" : "running",
                    willChange: "transform",
                  }}
                >
                  {duplicatedItems.map((item, itemIdx) => {
                    const originalIndex = items.findIndex((i) => i.id === item.id);
                    return (
                      <React.Fragment key={`m-${item.id}-${itemIdx}`}>
                        {renderMediaCard(item, originalIndex)}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block relative h-[720px] w-full overflow-hidden">
        <div className="grid grid-cols-3 gap-5 h-full">
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
                  className={`flex flex-col gap-5 ${
                    col.direction === "down" ? "animate-slow-down" : "animate-slow-up"
                  }`}
                  style={{
                    animationPlayState: isPaused ? "paused" : "running",
                    willChange: "transform",
                  }}
                >
                  {duplicatedItems.map((item, itemIdx) => {
                    const originalIndex = items.findIndex((i) => i.id === item.id);
                    return (
                      <React.Fragment key={`d-${item.id}-${itemIdx}`}>
                        {renderMediaCard(item, originalIndex)}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/40 transition"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/40 transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/40 transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl bg-black shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.type === "video" ? (
              <video
                src={activeItem.media.url}
                controls
                autoPlay
                className="max-h-[75vh] w-auto object-contain rounded-t-2xl"
              />
            ) : (
              <img
                src={activeItem.media.url}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto object-contain rounded-t-2xl"
              />
            )}

            <div className="w-full bg-[#1c1c1e] p-3.5 text-center text-white">
              <h3 className="text-sm font-bold">{activeItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}