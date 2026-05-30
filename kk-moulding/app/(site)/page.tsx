import Link from 'next/link';
import { getSiteSettings, getFeaturedProducts, getGallery } from '@/lib/firestore';

export default async function Home() {
  const [settings, products, gallery] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFeaturedProducts().catch(() => []),
    getGallery().catch(() => [])
  ]);

  return (
    <div className="bg-[#FFFFFF] min-h-screen overflow-hidden text-[#3E2723]">
      {/* Hero Section */}
      <section className="pt-12 lg:pt-10 pb-16">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column - Text */}
            <div className="lg:col-span-5 pr-4 lg:pr-12">
              <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#8C6239] mb-6 block font-medium">
                HANDCRAFTED TO PERFECTION
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-8 tracking-tight">
                {settings?.heroHeading || 'Premium Wooden Mouldings'}
              </h1>
              <div className="w-12 h-[2px] bg-[#E6D5C3] mb-8"></div>
              <p className="font-sans text-base text-[#8C6239] leading-relaxed mb-10 max-w-sm">
                {settings?.heroSubheading || 'Crafted for timeless interiors and architectural spaces.'}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/products" className="btn-pill-dark">
                  Explore Collection
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/contact" className="btn-pill-outline">
                  Request Enquiry
                </Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:col-span-7 relative h-[50vh] lg:h-[75vh]">
              <div className="absolute inset-0 bg-[#E6D5C3]/30 rounded">
                {settings?.heroImage && (
                  <img
                    src={settings.heroImage}
                    alt="Premium wooden moulding detail"
                    className="w-full h-full object-contain rounded"
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-12">
        <div className="container-editorial">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <h2 className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#3E2723] font-bold">
                FEATURED PRODUCTS
              </h2>
              <div className="w-16 h-[1px] bg-[#E6D5C3] hidden sm:block"></div>
            </div>
            <Link href="/products" className="font-sans text-sm text-[#3E2723] hover:text-[#8C6239] flex items-center gap-2 transition-colors">
              View all products →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {products.map((prod, i) => (
              <Link href={`/products`} key={prod.id} className="group block">
                <div className="aspect-[4/5] bg-[#E6D5C3]/30 overflow-hidden rounded-[4px] mb-4 relative">
                  {prod.images?.[0] && (
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-sans text-sm text-[#3E2723] font-medium group-hover:text-[#8C6239] transition-colors">{prod.title}</h3>
                <p className="font-sans text-xs text-[#8C6239] mt-1">{prod.category}</p>
              </Link>
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-12 text-center text-[#8C6239] font-sans text-sm">
                No featured products yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 lg:py-12 bg-[#EBE5DE]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 h-[400px] lg:h-[600px] rounded-[4px] overflow-hidden bg-[#DED6CC]">
              {settings?.craftLeftImage && (
                <img 
                  src={settings.craftLeftImage}
                  alt="Workshop interior"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Center Content */}
            <div className="lg:col-span-4 px-4 lg:px-8">
              <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#8C6239] mb-4 block font-medium">
                CRAFTSMANSHIP
              </span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
                {settings?.aboutTitle || 'Built by Hand. Perfected by Time.'}
              </h2>
              <p className="font-sans text-sm text-[#8C6239] leading-relaxed mb-8 max-w-sm whitespace-pre-wrap">
                {settings?.aboutText || 'Each piece is carefully handcrafted by our experienced artisans using traditional techniques and modern tools for precision and durability.'}
              </p>
              
              <ul className="space-y-3 mb-10">
                {['Finest Quality Materials', 'Precision Craftsmanship', 'Attention to Detail', 'Long Lasting Beauty'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-[#3E2723]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8C6239]">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/about" className="btn-pill-outline px-6">
                Our Process →
              </Link>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-3 h-[300px] lg:h-[450px] rounded-[4px] overflow-hidden self-end hidden lg:block bg-[#DED6CC]">
              {settings?.craftRightImage && (
                <img 
                  src={settings.craftRightImage}
                  alt="Craftsmanship detail"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Our Work / Enquiry */}
      <section className="py-20 lg:py-12">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
            
            {/* Left - Our Work */}
            <div>
              <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#8C6239] mb-4 block font-medium">
                OUR WORK
              </span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight mb-8">
                Precision in Every Detail,<br />
                Beauty in Every Space.
              </h2>
              <Link href="/gallery" className="font-sans text-sm text-[#3E2723] hover:text-[#8C6239] flex items-center gap-2 transition-colors mb-10">
                View Gallery →
              </Link>

              {settings?.homeGalleryImage ? (
                <div className="w-full aspect-[16/9] lg:aspect-[4/3] rounded-[4px] bg-[#E6D5C3]/30 overflow-hidden">
                  <img src={settings.homeGalleryImage} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {gallery.slice(0, 4).map((item, i) => (
                    <div key={item.id || i} className="aspect-[4/3] rounded-[4px] bg-[#E6D5C3]/30 overflow-hidden">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Enquiry */}
            <div className="relative bg-[#E6D5C3]/50 rounded-[4px] p-8 lg:p-12 overflow-hidden flex flex-col justify-center min-h-[400px]">
              <div className="relative z-10 max-w-sm">
                <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#8C6239] mb-4 block font-medium">
                  ENQUIRY
                </span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
                  Have a Project<br />
                  in Mind?
                </h2>
                <p className="font-sans text-sm text-[#8C6239] leading-relaxed mb-10">
                  We are here to bring your vision to life with custom solutions and expert support.
                </p>
                <Link href="/contact" className="btn-pill-dark mb-10">
                  Request Enquiry
                </Link>
                
                <div className="flex items-center gap-8 font-sans text-sm text-[#3E2723] font-medium">
                  <a href={`https://wa.me/${(settings?.whatsapp || '919876543210').replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 hover:text-[#8C6239] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                    WhatsApp Us
                  </a>
                  <a href={`tel:${(settings?.phone || '+919876543210').replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-[#8C6239] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
              {settings?.enquiryImage && (
                <img 
                  src={settings.enquiryImage} 
                  alt="Decorative" 
                  className="absolute right-0 bottom-0 w-2/3 h-full object-cover opacity-60 mix-blend-multiply"
                />
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 border-t border-[#E6D5C3]">
        <div className="container-editorial">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Premium Quality Wood', sub: 'Carefully selected for durability and elegance' },
              { title: 'Skilled Artisans', sub: 'Expert craftsmanship passed down through generations' },
              { title: 'Custom Solutions', sub: 'Tailored designs to suit your unique requirements' },
              { title: 'Timely Delivery', sub: 'Reliable and committed to on-time delivery' }
            ].map((feat, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#E6D5C3] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-[#3E2723] mb-1">{feat.title}</h4>
                  <p className="font-sans text-xs text-[#8C6239] leading-relaxed">{feat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
