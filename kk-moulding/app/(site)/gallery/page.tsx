// app/(site)/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getGallery } from '@/lib/firestore';
import { GalleryItem } from '@/lib/types';
import type { Metadata } from 'next';

const fallbackGallery: GalleryItem[] = [
  { id: '1', title: 'Installed Teak Moulding', category: 'Installations', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '2', title: 'Wood Grain Detail', category: 'Textures', image: 'https://images.unsplash.com/photo-1572537800927-f28f7b26ab20?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '3', title: 'Workshop Interior', category: 'Workshop', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '4', title: 'Moulding Profile Close-up', category: 'Products', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '5', title: 'Sal Door Frame', category: 'Installations', image: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '6', title: 'Pine Wall Panels', category: 'Installations', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '7', title: 'Hand Sanding', category: 'Workshop', image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '8', title: 'Milling Machine', category: 'Workshop', image: 'https://images.unsplash.com/photo-1545211345-d43bc1b17c45?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '9', title: 'Wood Texture Stack', category: 'Textures', image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '10', title: 'Decorative Profile Detail', category: 'Products', image: 'https://images.unsplash.com/photo-1592347535538-81d9be6e7e0d?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '11', title: 'Interior Installation', category: 'Installations', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=75&auto=format&fit=crop', createdAt: '' },
  { id: '12', title: 'Raw Door Planks', category: 'Products', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75&auto=format&fit=crop', createdAt: '' },
];

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
