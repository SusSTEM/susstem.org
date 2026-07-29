import React from "react";
import { CircularGallery } from "../components/ui/circular-gallery";

interface CircularGalleryShowcaseProps {
  onNavigate?: (page: string) => void;
}

// Section embed version
export function CircularGalleryShowcase({ onNavigate }: CircularGalleryShowcaseProps) {
  return (
    <section className="w-full bg-white pt-0 pb-6 text-[#072d2d]">
      <div className="w-full px-4 sm:px-8">
        <div className="relative -top-[3px] mb-[9px] text-center">
          <h2 className="text-3xl font-bold sm:text-4xl text-[#072d2d]">
            Content Library
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

// Full page view
export function CircularGalleryPage({ onNavigate }: CircularGalleryPageProps) {
  return (
    <div className="min-h-screen w-full bg-white pt-0 pb-10 text-[#072d2d]">
      <div className="w-full px-4 sm:px-8 relative pt-2">
        
        {/* Navigation Button */}
        {onNavigate && (
          <button
            onClick={() => onNavigate("home")}
            className="absolute top-2 right-4 sm:right-8 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm active:scale-95 z-20"
          >
            Back Home
          </button>
        )}

        {/* Title shifted 3px up, spacing kept at 9px */}
        <div className="relative -top-[3px] mb-[9px] text-center">
          <h1 className="text-3xl font-bold sm:text-4xl text-[#072d2d]">
            Gallery
          </h1>
        </div>

        {/* Infinite Grid Canvas */}
        <CircularGallery />
      </div>
    </div>
  );
}