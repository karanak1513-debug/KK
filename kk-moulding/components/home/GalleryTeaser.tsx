// components/home/GalleryTeaser.tsx
import Link from 'next/link';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75&auto=format&fit=crop', alt: 'Installed wooden moulding in living room' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=75&auto=format&fit=crop', alt: 'Close-up wood grain detail' },
  { src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=75&auto=format&fit=crop', alt: 'Workshop craftsmanship' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75&auto=format&fit=crop', alt: 'Teak door chaukat detail' },
  { src: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=75&auto=format&fit=crop', alt: 'Wood moulding profile' },
  { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75&auto=format&fit=crop', alt: 'Installed wall panels' },
];

export default function GalleryTeaser() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-beige)' }}>
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-label mb-3">Portfolio</p>
            <h2 className="font-serif font-semibold" style={{ color: 'var(--color-ink)' }}>
              Recent Work
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-sans text-sm font-medium self-start"
            style={{
              color: 'var(--color-walnut)',
              borderBottom: '1px solid var(--color-walnut)',
              paddingBottom: '2px',
            }}
          >
            View Full Gallery →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {galleryImages.map((img, i) => (
            <div key={i} className="img-zoom-wrap" style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
