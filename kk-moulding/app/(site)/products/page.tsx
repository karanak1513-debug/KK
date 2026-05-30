// app/(site)/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProducts, getSiteSettings } from '@/lib/firestore';
import { Product, SiteSettings } from '@/lib/types';
import { Suspense } from 'react';

const fallback: Product[] = [
  { id: '1', title: 'Classic Teak Architrave', slug: 'classic-teak-architrave', category: 'Wooden Mouldings', woodType: 'Teak', finish: 'Raw', dimensions: '75mm × 18mm', description: 'A traditional architrave in solid teak.', usage: 'Door frames, window surrounds', customization: 'Custom widths available.', images: ['https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80'], featured: true, createdAt: '' },
  { id: '2', title: 'Colonial Door Chaukat', slug: 'colonial-door-chaukat', category: 'Door Chaukat', woodType: 'Sal', finish: 'Smooth', dimensions: 'Standard & Custom', description: 'Heavy duty sal wood door frames.', usage: 'Main entrances, internal doors', customization: 'Any size to order.', images: ['https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=900&q=80'], featured: true, createdAt: '' },
  { id: '3', title: 'Shiplap Wall Panel', slug: 'shiplap-wall-panel', category: 'Wall Panels', woodType: 'Pine', finish: 'Natural', dimensions: '120mm × 15mm', description: 'Interlocking pine shiplap panels.', usage: 'Feature walls, cladding', customization: 'Length to order.', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80'], featured: false, createdAt: '' },
  { id: '4', title: 'Ogee Decorative Profile', slug: 'ogee-decorative-profile', category: 'Decorative Profiles', woodType: 'Engineered Hardwood', finish: 'Smooth', dimensions: '50mm × 12mm', description: 'Elegant ogee curve profile.', usage: 'Furniture trim, cornice work', customization: 'Custom profiles available.', images: ['https://images.unsplash.com/photo-1592347535538-81d9be6e7e0d?w=900&q=80'], featured: true, createdAt: '' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const [products, setProducts] = useState<Product[]>(fallback);
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    Promise.all([
      getProducts().catch(() => []),
      getSiteSettings().catch(() => null)
    ]).then(([p, s]) => {
      if ((p as Product[]).length > 0) setProducts(p as Product[]);
      setSettings(s as SiteSettings | null);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#FFFFFF] min-h-screen">

      {/* Minimal Tabs */}
      <div className="border-t border-b border-[#E6D5C3] bg-[#FFFFFF] sticky top-[73px] z-40">
        <div className="container-editorial">
          <div className="flex items-center gap-12 overflow-x-auto py-6 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('All')}
              className={`flex-shrink-0 font-sans text-[0.65rem] tracking-[0.2em] uppercase transition-colors pb-1 border-b-2 ${activeCategory === 'All' ? 'text-[#3E2723] border-[#3E2723] font-medium' : 'text-[#8C6239] border-transparent hover:text-[#3E2723]'}`}
            >
              All Collection
            </button>
            {Array.from(new Set(products.map(p => p.category))).filter(Boolean).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 font-sans text-[0.65rem] tracking-[0.2em] uppercase transition-colors pb-1 border-b-2 ${
                  activeCategory === category ? 'text-[#3E2723] border-[#3E2723] font-medium' : 'text-[#8C6239] border-transparent hover:text-[#3E2723]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Grid */}
      <section className="py-8 lg:py-12">
        <div className="container-editorial">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-[#FAFAFA] animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="mb-4 text-[#3E2723]">No pieces found.</h3>
              <p className="text-[#8C8279]">Please select another category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
              {filtered.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  <Link href={`/products/${product.slug}`} className="block mb-6 img-zoom-wrap aspect-[3/4]">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center text-[#999999] text-[0.65rem] tracking-[0.2em] uppercase">
                        No Image
                      </div>
                    )}
                  </Link>
                  <div className="pt-6">
                    <span className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#8C6239] mb-2 block font-medium">
                      {product.category}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-2xl text-[#3E2723] mb-2 group-hover:text-[#8C6239] transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-sans text-xs text-[#8C6239] mb-4">
                      {product.woodType} / {product.finish}
                    </p>
                    <Link href={`/products/${product.slug}`} className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#3E2723] group-hover:text-[#8C6239] transition-colors flex items-center gap-2 font-medium">
                      View Details
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFFFF] pt-10 text-center">Loading collection...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
