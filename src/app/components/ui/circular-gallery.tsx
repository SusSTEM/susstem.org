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

const initialGalleryItems: GalleryItem[] = [
  { id: "1", title: "Project Item 1", subtitle: "Description here", type: "image", aspectRatio: "tall", media: { url: "/assets/media-1.jpg" } },
  { id: "2", title: "Project Item 2", subtitle: "Description here", type: "image", aspectRatio: "portrait", media: { url: "/assets/media-2.jpg" } },
  { id: "3", title: "Video Showcase", subtitle: "Featured video", type: "video", aspectRatio: "landscape", media: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" } },
  { id: "4", title: "Project Item 4", subtitle: "Description here", type: "image", aspectRatio: "square", media: { url: "/assets/media-4.jpg" } },
  { id: "5", title: "Project Item 5", subtitle: "Description here", type: "image", aspectRatio: "landscape", media: { url: "/assets/media-5.jpg" } },
  { id: "6", title: "Project Item 6", subtitle: "Description here", type: "image", aspectRatio: "square", media: { url: "/assets/media-6.jpg" } },
  { id: "7", title: "Project Item 7", subtitle: "Description here", type: "image", aspectRatio: "portrait", media: { url: "/assets/media-7.jpg" } },
  { id: "8", title: "Video Clip 2", subtitle: "Local video asset", type: "video", aspectRatio: "tall", media: { url: "/assets/media-8.mp4" } },
  { id: "9", title: "Project Item 9", subtitle: "Description here", type: "image", aspectRatio: "landscape", media: { url: "/assets/media-9.jpg" } },
];

interface GalleryProps {
  items?: GalleryItem[];
}

export function CircularGallery({ items = initialGalleryItems }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

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

  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  const desktopColumns = [
    { items: col1, direction: "down" },
    { items: col2, direction: "up" },
    { items: col3, direction: "down" },
  ];

  const mobileCol1 = items.filter((_, i) => i % 2 === 0);
  const mobileCol2 = items.filter((_, i) => i % 2 === 1);
  const mobileColumns = [mobileCol1, mobileCol2];

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
        <div className={`relative w-full ${aspectClass} bg-white`}>
          {item.type === "video" ? (
            <div className="relative flex h-full w-full items-center justify-center bg-white">
              <img
                src={
                  ytEmbed
                    ? `https://img.youtube.com/vi/${item.media.url.match(/v=([^&]+)/)?.[1] || "default"}/hqdefault.jpg`
                    : "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=600&auto=format&fit=crop"
                }
                alt={item.title}
                className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
            </div>
          ) : (
            <img
              src={item.media.url}
              alt={item.media.alt || item.title}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop";
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 text-white opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100 flex flex-col justify-end">
            <p className="text-xs font-bold leading-tight truncate">{item.title}</p>
            {item.subtitle && (
              <p className="text-[11px] text-gray-200 mt-0.5 line-clamp-2 leading-snug">
                {item.subtitle}
              </p>
            )}
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
          animation: slowScrollDown 65s linear infinite;
        }
        .animate-slow-up {
          animation: slowScrollUp 65s linear infinite;
        }
      `}</style>

      {/* MOBILE VIEW */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:hidden">
        {mobileColumns.map((colItems, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2.5 sm:gap-4">
            {colItems.map((item) => {
              const originalIndex = items.findIndex((i) => i.id === item.id);
              return renderMediaCard(item, originalIndex);
            })}
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Pure borderless canvas without top/bottom fade gradients */}
      <div className="hidden md:block relative h-[720px] w-full overflow-hidden">
        <div className="grid grid-cols-3 gap-5 h-full">
          {desktopColumns.map((col, colIdx) => {
            const duplicatedItems = [...col.items, ...col.items];
            const isPaused = hoveredCol === colIdx;

            return (
              <div
                key={colIdx}
                className="relative overflow-hidden h-full"
                onMouseEnter={() => setHoveredCol(colIdx)}
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
                      <React.Fragment key={`${item.id}-${itemIdx}`}>
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

      {/* LIGHTBOX MODAL */}
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
            aria-label="Close"
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
            aria-label="Previous"
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
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl bg-black shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.type === "video" ? (
              getYouTubeEmbedUrl(activeItem.media.url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeItem.media.url)!}
                  title={activeItem.title}
                  className="h-[60vh] w-[80vw] max-w-4xl rounded-t-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeItem.media.url}
                  controls
                  autoPlay
                  className="max-h-[75vh] w-auto object-contain rounded-t-2xl"
                />
              )
            ) : (
              <img
                src={activeItem.media.url}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto object-contain rounded-t-2xl"
              />
            )}

            <div className="w-full bg-[#1c1c1e] p-3.5 text-center text-white">
              <h3 className="text-sm font-bold">{activeItem.title}</h3>
              {activeItem.subtitle && (
                <p className="text-xs text-gray-400 mt-0.5">{activeItem.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}