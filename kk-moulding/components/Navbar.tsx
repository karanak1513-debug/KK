'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always render with consistent server-safe classes; only apply scroll styles after mount
  const isScrolled = mounted && scrolled;
  const isMenuOpen = mounted && menuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen ? 'bg-white border-b border-[#E6D5C3]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-editorial flex items-center justify-between py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" className="font-serif text-base tracking-[0.12em] uppercase text-[#3E2723] z-50">
          K K Moulding
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-sm transition-colors ${
                    pathname === link.href ? 'text-[#3E2723] font-medium' : 'text-[#8C6239] hover:text-[#3E2723]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex items-center">
          <Link href="/contact" className="btn-pill-outline px-6 py-2">
            Request Enquiry
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#3E2723] z-50 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className="lg:hidden fixed inset-0 bg-[#FFFFFF] transition-transform duration-500 ease-in-out"
        style={{
          paddingTop: '64px',
          backgroundColor: '#FFFFFF',
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: isMenuOpen ? 'auto' : 'none',
        }}
      >
        <div className="container-editorial h-full flex flex-col pt-8">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-serif text-3xl ${
                    pathname === link.href ? 'text-[#3E2723]' : 'text-[#8C6239]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-pill-dark w-full justify-center text-sm"
            >
              Request Enquiry
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
