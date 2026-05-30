// components/home/FeaturedProducts.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/firestore';
import { Product } from '@/lib/types';

const fallbackProducts: Product[] = [
  {
    id: '1',
    title: 'Classic Teak Architrave',
    slug: 'classic-teak-architrave',
    category: 'Wooden Mouldings',
    woodType: 'Teak',
    finish: 'Raw / Unfinished',
    dimensions: '75mm × 18mm',
    description: 'A traditional architrave profile in solid teak. Clean lines, tight grain, and consistent dimension throughout.',
    usage: 'Door frames, window surrounds, wall trim',
    customization: 'Available in custom widths. Can be supplied pre-primed.',
    images: ['https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=75&auto=format&fit=crop'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Colonial Door Chaukat',
    slug: 'colonial-door-chaukat',
    category: 'Door Chaukat',
    woodType: 'Sal',
    finish: 'Smooth Sanded',
    dimensions: 'Standard & Custom',
    description: 'Heavy-duty sal wood door frames designed for single and double doors. Built for strength, finished for beauty.',
    usage: 'Main entrances, internal doors',
    customization: 'Any size to order. Mortice cuts available.',
    images: ['https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=600&q=75&auto=format&fit=crop'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Shiplap Wall Panel',
    slug: 'shiplap-wall-panel',
    category: 'Wall Panels',
    woodType: 'Pine',
    finish: 'Natural',
    dimensions: '120mm × 15mm per board',
    description: 'Interlocking pine shiplap panels for warm, textural wall cladding in any room.',
    usage: 'Feature walls, accent cladding, reception areas',
    customization: 'Length to order. Pre-finished options available.',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=75&auto=format&fit=crop'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Ogee Decorative Profile',
    slug: 'ogee-decorative-profile',
    category: 'Decorative Profiles',
    woodType: 'Engineered Hardwood',
    finish: 'Smooth',
    dimensions: '50mm × 12mm',
    description: 'A traditional ogee curve, machined to precision. Perfect for adding elegance to shelving, cabinetry, and cornices.',
    usage: 'Furniture trim, cornice work, cabinet facing',
    customization: 'Custom profiles machined to drawing.',
    images: ['https://images.unsplash.com/photo-1592347535538-81d9be6e7e0d?w=600&q=75&auto=format&fit=crop'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    getFeaturedProducts()
      .then((p) => { if (p.length > 0) setProducts(p); })
      .catch(() => {});
  }, []);

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9718503557';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} whatsapp={whatsapp} />
      ))}
    </div>
  );
}

function ProductCard({ product, whatsapp }: { product: Product; whatsapp: string }) {
  return (
    <div className="card-premium flex flex-col group">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100 border-b border-[#e5e7eb]">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=75&auto=format&fit=crop'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-[#d97706] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded shadow-sm">
          Featured
        </span>
      </Link>
      <div className="p-4 flex flex-col flex-1 text-left">
        <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-1 font-semibold">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[#111827] font-bold text-lg mb-2 group-hover:text-[#d97706] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="mt-auto pt-4 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="btn-outline flex-1 text-xs py-2 justify-center"
          >
            Details
          </Link>
          <a
            href={`https://wa.me/${whatsapp}?text=Hi, I'm interested in ${product.title}. Please share more details.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-3 justify-center"
            title="Inquire via WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
