import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const ProjectGallery = ({ images = [], projectTitle }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const currentImage = images[activeImageIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Featured Primary Visual with Zoom Trigger */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 bg-navy-950 shadow-elevated cursor-pointer group"
      >
        <img
          src={currentImage}
          alt={`${projectTitle} screenshot ${activeImageIndex + 1}`}
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors" />

        <div className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-navy-950/80 border border-slate-700 text-slate-300 group-hover:text-electric-cyan backdrop-blur-md transition-colors">
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-electric-cyan ${
                activeImageIndex === idx
                  ? 'border-electric-cyan ring-1 ring-electric-cyan'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${projectTitle} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Accessible Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close image lightbox"
            className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-white bg-navy-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full text-slate-300 hover:text-white bg-navy-900/80 border border-slate-800 hover:border-electric-cyan/40 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl"
          >
            <img
              src={currentImage}
              alt={`${projectTitle} full view ${activeImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full text-slate-300 hover:text-white bg-navy-900/80 border border-slate-800 hover:border-electric-cyan/40 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
