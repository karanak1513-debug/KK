// app/(site)/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProducts, getSiteSettings } from '@/lib/firestore';
import { Product, SiteSettings } from '@/lib/types';
import { Suspense } from 'react';

const fallback: Product[] = [];


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

      {/* Spacer */}
      <div className="py-5 lg:py-6" />

      {/* Minimal Tabs */}
      <div className="border-b border-[#E6D5C3] bg-[#FFFFFF] sticky top-[56px] lg:top-[64px] z-40">
        <div className="container-editorial">
          <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
              {filtered.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  <Link href={`/products/${product.slug}`} className="block mb-2 overflow-hidden aspect-[4/5] bg-[#FAFAFA]">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center text-[#999999] text-[0.6rem] tracking-widest uppercase">
                        No Image
                      </div>
                    )}
                  </Link>
                  <div className="pt-1.5">
                    <span className="font-sans text-[0.55rem] lg:text-[0.6rem] tracking-[0.18em] uppercase text-[#8C6239] mb-0.5 block font-medium leading-tight">
                      {product.category}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-[0.85rem] lg:text-sm text-[#3E2723] mb-1 group-hover:text-[#8C6239] transition-colors leading-snug">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-sans text-[0.55rem] lg:text-[0.6rem] text-[#8C6239] mb-1.5 leading-snug hidden lg:block">
                      {product.woodType} / {product.finish}
                    </p>
                    <Link href={`/products/${product.slug}`} className="font-sans text-[0.5rem] lg:text-[0.55rem] tracking-[0.12em] uppercase text-[#3E2723] group-hover:text-[#8C6239] transition-colors flex items-center gap-1 font-medium">
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
