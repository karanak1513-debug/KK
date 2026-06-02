'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-end"
      style={{ backgroundColor: '#2a1f17' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop"
          alt="Handcrafted wooden mouldings workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            opacity: loaded ? 0.55 : 0,
            transition: 'opacity 1.2s ease',
            filter: 'brightness(0.85) saturate(0.9)',
          }}
          onLoad={() => setLoaded(true)}
        />
        {/* Gradient overlay — bottom heavy for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(20,13,8,0.92) 0%, rgba(20,13,8,0.55) 40%, rgba(20,13,8,0.15) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-editorial w-full pb-20 lg:pb-28">
        <div
          className="max-w-2xl"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        >
          <p
            className="section-label mb-5"
            style={{ color: 'rgba(169,133,98,0.9)', letterSpacing: '0.18em' }}
          >
            Since 2010 · Delhi, India
          </p>
          <h1
            className="font-serif font-semibold leading-tight mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            Handcrafted<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(169,133,98,0.95)' }}>Wooden</em>{' '}
            Mouldings
          </h1>
          <p
            className="font-sans text-base lg:text-lg mb-10 max-w-md leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.68)' }}
          >
            Crafted for timeless interiors and architectural spaces. Every piece made with honest materials and careful hands.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-walnut">
              Explore Collection
            </Link>
            <Link
              href="/contact"
              className="btn-outline"
              style={{ borderColor: 'rgba(255,255,255,0.45)', color: '#fff' }}
            >
              Request Enquiry
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-8 lg:right-16 flex flex-col items-center gap-2"
          style={{
            opacity: loaded ? 0.6 : 0,
            transition: 'opacity 0.8s ease 1s',
          }}
        >
          <div
            className="w-px h-12"
            style={{ background: 'rgba(255,255,255,0.4)', animation: 'scrollIndicator 2s ease-in-out infinite' }}
          />
          <p
            className="font-sans text-xs tracking-widest uppercase text-white"
            style={{ writingMode: 'vertical-rl', letterSpacing: '0.15em' }}
          >
            Scroll
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollIndicator {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}
