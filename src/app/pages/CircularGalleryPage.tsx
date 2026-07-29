import React from "react";
import { CircularGallery } from "../components/ui/circular-gallery";

interface CircularGalleryShowcaseProps {
  onNavigate?: (page: string) => void;
}

export function CircularGalleryShowcase({ onNavigate }: CircularGalleryShowcaseProps) {
  return (
    <section className="w-full bg-white pt-0 pb-6 text-[#072d2d]">
      <div className="w-full px-4 sm:px-8">
        <div className="relative -top-[3px] mb-[9px] text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#072d2d] sm:text-4xl">
            Gallery
          </h2>
        </div>

        <CircularGallery />
      </div>
    </section>
  );
}

interface CircularGalleryPageProps {
  onNavigate?: (page: string) => void;
}

export function CircularGalleryPage({ onNavigate }: CircularGalleryPageProps) {
  return (
    <div className="relative min-h-screen w-full bg-white pt-0 pb-10 text-[#072d2d]">
      {onNavigate ? (
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="absolute right-4 top-2 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-[#072d2d] shadow-sm ring-1 ring-black/5 transition hover:bg-white sm:right-8"
        >
          Back Home
        </button>
      ) : null}

      <div className="w-full px-4 sm:px-8">
        <div className="relative -top-[3px] mb-[9px] text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-[#072d2d] sm:text-4xl">
            Content Library
          </h1>
        </div>

        <CircularGallery />
      </div>
    </div>
  );
}