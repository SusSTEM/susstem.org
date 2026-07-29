"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

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

type GalleryStatus = Record<string, "loading" | "loaded" | "error">;

const ASPECT_RATIO_MAP: Record<NonNullable<GalleryItem["aspectRatio"]>, string> = {
  portrait: "4 / 5",
  landscape: "16 / 10",
  square: "1 / 1",
  tall: "3 / 5",
};

const PLACEHOLDER_ASPECTS: NonNullable<GalleryItem["aspectRatio"]>[] = [
  "portrait",
  "landscape",
  "square",
  "tall",
];

function getAspectRatioStyle(aspectRatio?: GalleryItem["aspectRatio"]): React.CSSProperties {
  return {
    aspectRatio: ASPECT_RATIO_MAP[aspectRatio ?? "square"],
  };
}

function toTitleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function escapeSvgText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createFallbackPreview(title: string, type: GalleryItem["type"]): string {
  const safeTitle = escapeSvgText(title || "Gallery item");
  const label = type === "video" ? "Video" : "Image";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#dfeeed"/>
          <stop offset="50%" stop-color="#f7fbfb"/>
          <stop offset="100%" stop-color="#d5e8e6"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="1500" fill="url(#g)"/>
      <circle cx="600" cy="580" r="132" fill="#072d2d" fill-opacity="0.10"/>
      <circle cx="600" cy="580" r="94" fill="#072d2d" fill-opacity="0.16"/>
      <rect x="546" y="524" width="108" height="108" rx="34" fill="#072d2d" fill-opacity="0.85"/>
      <path d="M585 556 L585 600 L620 578 Z" fill="#ffffff"/>
      <text x="600" y="846" fill="#072d2d" fill-opacity="0.84" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700" text-anchor="middle">${safeTitle}</text>
      <text x="600" y="916" fill="#072d2d" fill-opacity="0.58" font-family="Arial, Helvetica, sans-serif" font-size="28" text-anchor="middle">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)/i.test(url);
}

function getYouTubeVideoId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? null;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0` : null;
}

function getYouTubeThumbnailUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|mov|m4v)(?:\?.*)?$/i.test(url);
}

function splitIntoColumns<T>(items: T[], columnCount: number): T[][] {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex),
  );
}

function buildLoopItems<T>(items: T[], minimumCount: number): T[] {
  if (items.length === 0) {
    return [];
  }

  const loopItems: T[] = [];
  while (loopItems.length < minimumCount) {
    loopItems.push(...items);
  }

  return loopItems;
}

function buildPlaceholderItems(count: number): GalleryItem[] {
  return Array.from({ length: count }, (_, index) => {
    const aspectRatio = PLACEHOLDER_ASPECTS[index % PLACEHOLDER_ASPECTS.length];

    return {
      id: `placeholder-${index}`,
      title: "Loading gallery item",
      type: "image",
      aspectRatio,
      media: { url: "" },
    } satisfies GalleryItem;
  });
}

interface CircularGalleryProps {
  items?: GalleryItem[];
}

function GalleryTile({
  item,
  index,
  onOpen,
  status,
  setStatus,
}: {
  item: GalleryItem;
  index: number;
  onOpen?: (index: number) => void;
  status: GalleryStatus;
  setStatus: React.Dispatch<React.SetStateAction<GalleryStatus>>;
}) {
  const isPlaceholder = item.id.startsWith("placeholder-");
  const isVideoPreview = item.type === "video";
  const previewSrc =
    isPlaceholder
      ? ""
      : status[item.id] === "error"
        ? createFallbackPreview(item.title, item.type)
        : isVideoPreview
          ? isYouTubeUrl(item.media.url)
            ? getYouTubeThumbnailUrl(item.media.url) ?? createFallbackPreview(item.title, item.type)
            : createFallbackPreview(item.title, item.type)
          : item.media.url;

  const showImage = !isPlaceholder;
  const isLoaded = isPlaceholder ? true : status[item.id] === "loaded" || status[item.id] === "error";

  return (
    <button
      type="button"
      disabled={isPlaceholder}
      onClick={() => {
        if (!isPlaceholder) {
          onOpen?.(index);
        }
      }}
      className="group block w-full text-left outline-none disabled:cursor-default"
      aria-label={isPlaceholder ? "Loading gallery item" : `Open ${item.title}`}
    >
      <div
        className="relative w-full overflow-hidden rounded-[24px] bg-[#e7f1f0] shadow-[0_0_0_1px_rgba(7,45,45,0.04)]"
        style={getAspectRatioStyle(item.aspectRatio)}
      >
        {showImage ? (
          <>
            <img
              src={previewSrc}
              alt={item.media.alt || item.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={() => setStatus((current) => ({ ...current, [item.id]: "loaded" }))}
              onError={() =>
                setStatus((current) => ({
                  ...current,
                  [item.id]: "error",
                }))
              }
              className={`absolute inset-0 h-full w-full object-cover transition duration-500 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              } ${isVideoPreview ? "scale-[1.01]" : ""}`}
              sizes="(min-width: 768px) 33vw, 50vw"
            />
            {!isLoaded ? <div className="absolute inset-0 animate-pulse bg-[#dde9e7]" /> : null}
            {isVideoPreview ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition duration-300 group-hover:scale-105">
                  <Play className="h-6 w-6 fill-current" />
                </span>
              </div>
            ) : null}
          </>
        ) : (
          <div className="absolute inset-0 animate-pulse bg-[#dde9e7]" />
        )}
      </div>
    </button>
  );
}

function GalleryColumn({
  items,
  direction,
  duration,
  onOpen,
  status,
  setStatus,
  paused,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
}: {
  items: GalleryItem[];
  direction: "up" | "down";
  duration: string;
  onOpen?: (index: number) => void;
  status: GalleryStatus;
  setStatus: React.Dispatch<React.SetStateAction<GalleryStatus>>;
  paused: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onTouchCancel?: () => void;
}) {
  const loopItems = useMemo(() => {
    const minimumLength = Math.max(8, items.length * 2);
    const baseItems = buildLoopItems(items, minimumLength);
    return [...baseItems, ...baseItems];
  }, [items]);

  return (
    <div
      className="relative h-full overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      <div
        className={`flex flex-col gap-3 sm:gap-4 ${direction === "down" ? "gallery-scroll-down" : "gallery-scroll-up"}`}
        style={{
          animationDuration: duration,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {loopItems.map((item, loopIndex) => {
          const originalIndex = items.findIndex((candidate) => candidate.id === item.id);
          return (
            <GalleryTile
              key={`${item.id}-${loopIndex}`}
              item={item}
              index={originalIndex >= 0 ? originalIndex : 0}
              onOpen={onOpen}
              status={status}
              setStatus={setStatus}
            />
          );
        })}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[600px] md:h-[720px] w-full items-center justify-center rounded-[28px] bg-[#f4f8f7] px-6 text-center text-sm text-[#4b6665]">
      No gallery assets were found in /public/assets/gallery.
    </div>
  );
}

function GalleryLoadingState() {
  const placeholderItems = useMemo(() => buildPlaceholderItems(12), []);
  const desktopColumns = splitIntoColumns(placeholderItems, 3);
  const mobileColumns = splitIntoColumns(placeholderItems, 2);

  return (
    <div className="w-full">
      <style>{galleryStyles}</style>
      <div className="grid grid-cols-2 gap-2.5 md:hidden">
        {mobileColumns.map((columnItems, columnIndex) => (
          <div key={`loading-mobile-${columnIndex}`} className="flex flex-col gap-2.5">
            <GalleryColumn
              items={columnItems}
              direction={columnIndex % 2 === 0 ? "down" : "up"}
              duration={columnIndex % 2 === 0 ? "42s" : "48s"}
              paused={false}
              status={{}}
              setStatus={() => undefined}
            />
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <div className="grid h-[720px] grid-cols-3 gap-5">
          {desktopColumns.map((columnItems, columnIndex) => (
            <GalleryColumn
              key={`loading-desktop-${columnIndex}`}
              items={columnItems}
              direction={columnIndex % 2 === 0 ? "down" : "up"}
              duration={columnIndex % 2 === 0 ? "56s" : "64s"}
              paused={false}
              status={{}}
              setStatus={() => undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const galleryStyles = `
  @keyframes gallery-scroll-up {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }

  @keyframes gallery-scroll-down {
    from {
      transform: translateY(-50%);
    }
    to {
      transform: translateY(0);
    }
  }

  .gallery-scroll-up {
    animation-name: gallery-scroll-up;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .gallery-scroll-down {
    animation-name: gallery-scroll-down;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;

export function CircularGallery({ items }: CircularGalleryProps) {
  const [remoteItems, setRemoteItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(items === undefined);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<GalleryStatus>({});
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  useEffect(() => {
    if (items !== undefined) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    let isMounted = true;

    setIsLoading(true);
    fetch("/api/gallery", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Gallery fetch failed with ${response.status}`);
        }

        return response.json();
      })
      .then((data: unknown) => {
        if (!isMounted) {
          return;
        }

        const nextItems = Array.isArray(data)
          ? data
          : data && typeof data === "object" && "items" in data
            ? (data as { items?: GalleryItem[] }).items ?? []
            : [];

        setRemoteItems(nextItems);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (isMounted) {
          setRemoteItems([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [items]);

  const galleryItems = items ?? remoteItems;
  const displayItems = isLoading && galleryItems.length === 0 ? buildPlaceholderItems(12) : galleryItems;
  const hasGalleryItems = displayItems.length > 0;
  const desktopColumns = useMemo(() => splitIntoColumns(displayItems, 3), [displayItems]);
  const mobileColumns = useMemo(() => splitIntoColumns(displayItems, 2), [displayItems]);
  const activeItem = activeIndex !== null ? displayItems[activeIndex] : null;

  useEffect(() => {
    if (activeIndex !== null && activeIndex >= displayItems.length) {
      setActiveIndex(null);
    }
  }, [activeIndex, displayItems.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
        return;
      }

      if (displayItems.length === 0) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }
          return (current - 1 + displayItems.length) % displayItems.length;
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }
          return (current + 1) % displayItems.length;
        });
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, displayItems.length]);

  return (
    <div className="w-full">
      <style>{galleryStyles}</style>

      {isLoading && galleryItems.length === 0 ? (
        <GalleryLoadingState />
      ) : hasGalleryItems ? (
        <>
          <div className="grid grid-cols-2 gap-2.5 md:hidden h-[600px]">
            {mobileColumns.map((columnItems, columnIndex) => (
              <GalleryColumn
                key={`mobile-${columnIndex}`}
                items={columnItems}
                direction={columnIndex % 2 === 0 ? "down" : "up"}
                duration={columnIndex % 2 === 0 ? "42s" : "48s"}
                paused={isTouchPaused}
                onOpen={setActiveIndex}
                status={status}
                setStatus={setStatus}
                onTouchStart={() => setIsTouchPaused(true)}
                onTouchEnd={() => setIsTouchPaused(false)}
                onTouchCancel={() => setIsTouchPaused(false)}
              />
            ))}
          </div>

          <div className="hidden md:block h-[720px] w-full overflow-hidden">
            <div className="grid h-full grid-cols-3 gap-5">
              {desktopColumns.map((columnItems, columnIndex) => {
                const direction = columnIndex % 2 === 0 ? "down" : "up";
                return (
                  <GalleryColumn
                    key={`desktop-${columnIndex}`}
                    items={columnItems}
                    direction={direction}
                    duration={columnIndex % 2 === 0 ? "56s" : "64s"}
                    paused={hoveredColumn === columnIndex}
                    onOpen={setActiveIndex}
                    status={status}
                    setStatus={setStatus}
                    onMouseEnter={() => setHoveredColumn(columnIndex)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <EmptyState />
      )}

      {activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 text-white backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex(null);
            }}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((current) => {
                if (current === null || displayItems.length === 0) {
                  return current;
                }
                return (current - 1 + displayItems.length) % displayItems.length;
              });
            }}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((current) => {
                if (current === null || displayItems.length === 0) {
                  return current;
                }
                return (current + 1) % displayItems.length;
              });
            }}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next media"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative flex max-h-[88vh] w-full max-w-[96vw] flex-col overflow-hidden rounded-[28px] bg-black shadow-2xl lg:max-w-[1200px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex items-center justify-center bg-black/90">
              {isYouTubeUrl(activeItem.media.url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeItem.media.url) ?? undefined}
                  title={activeItem.title}
                  className="h-[70vh] w-full max-w-[1200px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeItem.type === "video" || isVideoFile(activeItem.media.url) ? (
                <video
                  src={activeItem.media.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[82vh] w-full object-contain"
                />
              ) : (
                <img
                  src={activeItem.media.url}
                  alt={activeItem.media.alt || activeItem.title}
                  className="max-h-[82vh] w-full object-contain"
                />
              )}
            </div>

            <div className="border-t border-white/10 bg-black/80 px-4 py-3 text-center">
              <h3 className="text-sm font-semibold tracking-wide text-white">{activeItem.title}</h3>
              {activeItem.subtitle ? (
                <p className="mt-0.5 text-xs text-white/65">{activeItem.subtitle}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
