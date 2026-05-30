import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About K K Moulding',
  description: 'Premium handcrafted wooden mouldings from our workshop in Gujarat, India.',
};

import { getSiteSettings } from '@/lib/firestore';

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const image = settings?.aboutImage || "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=1200&q=80";

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-8 pb-8">
      <div className="container-editorial max-w-4xl mx-auto text-center">
        <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[#999999] mb-2 block font-medium">About Us</span>
        <h1 className="font-serif text-3xl lg:text-4xl text-[#3E2723] tracking-tight mb-4">
          Craftsmanship Rooted in Quality
        </h1>
        <div className="w-16 h-[1px] bg-[#E6D5C3] mx-auto mb-4"></div>
        
        <p className="font-sans text-base text-[#8C6239] leading-normal font-light mb-6 max-w-2xl mx-auto">
          K K Moulding is a trusted name in premium wooden mouldings, door frames (chaukats), wall mouldings, and decorative interior solutions. With a strong focus on quality craftsmanship, precision manufacturing, and attention to detail, we create products that enhance the beauty and character of residential and commercial spaces. Our extensive range is designed to combine durability, functionality, and timeless elegance. We work closely with homeowners, architects, interior designers, and builders to deliver customized solutions that meet diverse project requirements. At K K Moulding, customer satisfaction, superior quality, and reliable service remain at the heart of everything we do.
        </p>

        <div className="relative aspect-video bg-[#FAFAFA] overflow-hidden rounded-[4px] mb-8 shadow-sm max-w-3xl mx-auto">
          <img
            src={image}
            alt="Workshop interior"
            className="w-full h-full object-cover"
          />
        </div>

        <Link href="/contact" className="btn-pill-dark px-10 py-3 text-sm">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
