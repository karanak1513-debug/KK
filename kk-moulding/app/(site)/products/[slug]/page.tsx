// app/(site)/products/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, addEnquiry } from '@/lib/firestore';
import { Product } from '@/lib/types';
import toast from 'react-hot-toast';

const fallbackProduct: Product = {
  id: '1',
  title: 'Classic Teak Architrave',
  slug: 'classic-teak-architrave',
  category: 'Wooden Mouldings',
  woodType: 'Teak',
  finish: 'Raw / Unfinished',
  dimensions: '75mm × 18mm × custom length',
  description:
    'A traditional architrave profile in solid teak. Clean lines, tight grain, and consistent dimension throughout. Ideal for door surrounds, window frames, and wall trim in both contemporary and classical interiors.',
  usage: 'Door frames, window surrounds, wall trim, picture rails',
  customization: 'Available in custom widths from 50mm to 150mm. Pre-primed, sanded, or raw finish. Length to order.',
  images: [
    'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80',
    'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&q=80',
  ],
  featured: true,
  createdAt: '',
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug)
      .then((p) => setProduct(p || { ...fallbackProduct, slug }))
      .catch(() => setProduct({ ...fallbackProduct, slug }));
  }, [slug]);

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error('Name and phone are required.'); return; }
    setSending(true);
    try {
      await addEnquiry({ ...form, product: product?.title });
      toast.success('Enquiry sent! We\'ll contact you soon.');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to send. Try WhatsApp instead.');
    } finally {
      setSending(false);
    }
  };

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9718503557';

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="font-sans text-sm tracking-widest uppercase text-[#8C6239] animate-pulse">Loading piece...</div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [fallbackProduct.images[0]];

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 lg:p-12 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <img 
            src={images[activeImage]} 
            alt="Enlarged view" 
            className="max-w-full max-h-full object-contain"
          />
          <button 
            className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full hover:bg-white hover:text-black transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="pt-8 pb-8 container-editorial">
        <nav className="flex items-center gap-4 font-sans text-[0.65rem] tracking-widest uppercase text-[#999999]">
          <Link href="/" className="hover:text-[#3E2723] transition-colors">Home</Link>
          <span className="w-4 h-[1px] bg-[#E6D5C3]"></span>
          <Link href="/products" className="hover:text-[#3E2723] transition-colors">Collection</Link>
          <span className="w-4 h-[1px] bg-[#E6D5C3]"></span>
          <span className="text-[#3E2723]">{product.title}</span>
        </nav>
      </div>

      <section className="pb-16">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
            
            {/* Left: Gallery */}
            <div className="lg:col-span-7">
              <div 
                className="relative bg-[#F4F1ED] mb-6 overflow-hidden cursor-zoom-in aspect-[4/3] lg:aspect-[4/3] rounded-lg shadow-sm border border-[#E6D5C3]"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={images[activeImage]}
                  alt={`${product.title} view`}
                  className="w-full h-full object-cover animate-fade-in transition-transform duration-700 hover:scale-105"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 aspect-square overflow-hidden transition-all duration-500 rounded border ${i === activeImage ? 'opacity-100 border-[#3E2723]' : 'opacity-40 border-transparent hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Elegant Details */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col pt-4">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#8C6239] mb-4 block font-medium">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-5xl mb-6 text-[#3E2723] leading-tight tracking-tight font-medium">
                {product.title}
              </h1>
              
              <div className="w-16 h-[1px] bg-[#E6D5C3] mb-8"></div>
              
              <p className="font-sans text-sm text-[#8C6239] mb-12 leading-loose font-light">
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-y-10 gap-x-8 mb-16">
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Wood Type</span>
                  <span className="text-md text-[#3E2723] block">{product.woodType}</span>
                </div>
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Finish</span>
                  <span className="text-md text-[#3E2723] block">{product.finish}</span>
                </div>
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Dimensions</span>
                  <span className="text-md text-[#3E2723] block">{product.dimensions}</span>
                </div>
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Recommended Usage</span>
                  <span className="text-md text-[#3E2723] block">{product.usage}</span>
                </div>
              </div>

              {/* Enquiry Form */}
              <div className="border-t border-[#E6D5C3] pt-10">
                <span className="text-2xl text-[#3E2723] mb-8 block">Request Quotation</span>
                <form onSubmit={handleEnquiry} className="flex flex-col gap-6 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-sm focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] placeholder-[#999999] transition-colors"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-sm focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] placeholder-[#999999] transition-colors"
                      placeholder="Your phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="requirement" className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Additional Details (Optional)</label>
                  <textarea
                    id="requirement"
                    rows={2}
                    className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-sm focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] placeholder-[#999999] transition-colors resize-none"
                    placeholder="E.g. required dimensions, finish preference, order quantity..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-pill-dark w-full justify-center"
                >
                  {sending ? 'Submitting...' : 'Request Enquiry'}
                </button>
                </form>

                <div className="flex items-center gap-4">
                  <span className="font-sans text-xs text-[#8C6239]">Or connect instantly</span>
                  <div className="flex-1 h-[1px] bg-[#E6D5C3]"></div>
                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi, I'm interested in ${product.title}. Please share details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[0.65rem] tracking-widest uppercase text-[#3E2723] hover:text-[#8C6239] transition-colors flex items-center gap-2 font-medium"
                  >
                    WhatsApp
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
