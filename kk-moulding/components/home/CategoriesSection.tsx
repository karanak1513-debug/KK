// components/home/CategoriesSection.tsx
'use client';
import Link from 'next/link';

const categories = [
  {
    title: 'Wooden Mouldings',
    desc: 'Classic and contemporary profiles for ceilings, walls, and frames.',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=75&auto=format&fit=crop',
    href: '/products?category=Wooden+Mouldings',
  },
  {
    title: 'Door Chaukat',
    desc: 'Solid wood door frames crafted for strength and lasting beauty.',
    image: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=800&q=75&auto=format&fit=crop',
    href: '/products?category=Door+Chaukat',
  },
  {
    title: 'Raw Wooden Doors',
    desc: 'Unfinished hardwood doors ready for custom paint or polish.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75&auto=format&fit=crop',
    href: '/products?category=Raw+Wooden+Doors',
  },
  {
    title: 'Decorative Profiles',
    desc: 'Ornamental trim and carved profiles for premium interiors.',
    image: 'https://images.unsplash.com/photo-1592347535538-81d9be6e7e0d?w=800&q=75&auto=format&fit=crop',
    href: '/products?category=Decorative+Profiles',
  },
  {
    title: 'Wall Panels',
    desc: 'Textured wood wall cladding for statement architectural walls.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75&auto=format&fit=crop',
    href: '/products?category=Wall+Panels',
  },
];

export default function CategoriesSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">Our Range</p>
            <h2 className="font-serif font-semibold" style={{ color: 'var(--color-ink)' }}>
              Featured Categories
            </h2>
          </div>
          <Link
            href="/products"
            className="font-sans text-sm font-medium self-start md:self-auto"
            style={{
              color: 'var(--color-walnut)',
              borderBottom: '1px solid var(--color-walnut)',
              paddingBottom: '2px',
              letterSpacing: '0.04em',
            }}
          >
            View All Products →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.title} {...cat} tall />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
          {categories.slice(3).map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  title, desc, image, href, tall,
}: {
  title: string; desc: string; image: string; href: string; tall?: boolean;
}) {
  return (
    <Link href={href} className="group relative overflow-hidden block" style={{ aspectRatio: tall ? '4/5' : '16/8' }}>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.75) saturate(0.85)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(26,13,6,0.85) 0%, rgba(26,13,6,0.2) 55%, transparent 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <h3
          className="font-serif font-medium mb-2 text-white"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
        >
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
          {desc}
        </p>
        <p
          className="font-sans text-xs font-medium mt-4 tracking-wider uppercase"
          style={{
            color: 'var(--color-walnut-light, #A98562)',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'opacity 0.3s, transform 0.3s',
          }}
          data-hover-text
        >
          Explore →
        </p>
      </div>
      <style jsx>{`
        .group:hover [data-hover-text] {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </Link>
  );
}
