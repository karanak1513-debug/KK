// app/(site)/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getGallery } from '@/lib/firestore';
import { GalleryItem } from '@/lib/types';
import type { Metadata } from 'next';

const fallbackGallery: GalleryItem[] = [];

// const galleryCategories = ['All', 'Installations', 'Workshop', 'Products', 'Textures'];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(fallbackGallery);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    getGallery()
      .then((g) => { if (g.length > 0) setItems(g); })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

  return (
    <div className="bg-[#FFFFFF] min-h-screen">

      {/* Filter */}
      <div className="sticky top-16 z-40 border-b border-[#E6D5C3] bg-[#FFFFFF]">
        <div className="container-editorial">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {['All', ...Array.from(new Set(items.map(i => i.category))).filter(Boolean)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 font-sans text-[0.65rem] px-5 py-2 transition-colors uppercase tracking-[0.15em] font-medium"
                style={{
                  backgroundColor: activeCategory === cat ? '#3E2723' : 'transparent',
                  color: activeCategory === cat ? '#FFFFFF' : '#3E2723',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#3E2723' : '#E6D5C3',
                  borderRadius: '9999px'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-[#FFFFFF]">
        <div className="container-editorial">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="relative group overflow-hidden cursor-zoom-in aspect-[4/5] bg-[#FFFFFF]"
                onClick={() => setLightboxSrc(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
                >
                  <p className="font-sans text-sm text-white font-medium tracking-wide">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-6 text-white font-sans text-4xl w-12 h-12 flex items-center justify-center hover:text-[#E6D5C3] transition-colors"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={lightboxSrc}
            alt="Gallery item expanded"
            className="max-w-full max-h-full object-contain"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
