// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getProducts, getGallery, getEnquiries, getFAQs } from '@/lib/firestore';
import Link from 'next/link';

interface Stats {
  products: number;
  gallery: number;
  enquiries: number;
  unreadEnquiries: number;
  faqs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, gallery: 0, enquiries: 0, unreadEnquiries: 0, faqs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getGallery(), getEnquiries(), getFAQs()])
      .then(([products, gallery, enquiries, faqs]) => {
        setStats({
          products: products.length,
          gallery: gallery.length,
          enquiries: enquiries.length,
          unreadEnquiries: enquiries.filter((e) => !e.read).length,
          faqs: faqs.length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.products, href: '/admin/products', color: '#8C6239' },
    { label: 'Gallery Images', value: stats.gallery, href: '/admin/gallery', color: '#8C6239' },
    { label: 'Total Enquiries', value: stats.enquiries, href: '/admin/enquiries', color: '#8C6239' },
    { label: 'Unread Enquiries', value: stats.unreadEnquiries, href: '/admin/enquiries', color: '#D32F2F' },
  ];

  const quickActions = [
    { label: 'Add New Product', href: '/admin/products?action=new', icon: '+' },
    { label: 'Upload Gallery Image', href: '/admin/gallery?action=new', icon: '⊕' },
    { label: 'View Enquiries', href: '/admin/enquiries', icon: '✉' },
    { label: 'Edit Site Settings', href: '/admin/settings', icon: '⚙' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-[#3E2723]">Dashboard</h1>
        <p className="font-sans text-sm mt-2 text-[#8C6239]">
          Overview of your K K Moulding website content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-[#FFFFFF] border border-[#E6D5C3] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow block"
          >
            {loading ? (
              <div className="w-10 h-8 rounded animate-pulse bg-[#FAFAFA]" />
            ) : (
              <p className="font-serif text-4xl font-semibold mb-2" style={{ color: card.color }}>{card.value}</p>
            )}
            <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-4">Quick Actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-4 p-4 bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg transition-colors hover:bg-[#F5EFE9] text-[#3E2723]"
            >
              <span className="text-xl text-[#8C6239]">{action.icon}</span>
              <span className="font-sans text-sm font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] border border-[#E6D5C3] p-8 rounded-lg shadow-sm">
          <p className="font-serif text-xl font-medium mb-6 text-[#3E2723]">Website Links</p>
          <div className="space-y-4">
            {['/', '/products', '/gallery', '/faq', '/contact'].map((path) => (
              <a
                key={path}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 border-b border-[#E6D5C3] font-sans text-sm transition-colors text-[#8C6239] hover:text-[#3E2723] pb-3"
              >
                <span className="font-medium">{path === '/' ? 'Homepage' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}</span>
                <span className="text-lg leading-none">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E6D5C3] p-8 rounded-lg shadow-sm">
          <p className="font-serif text-xl font-medium mb-6 text-[#3E2723]">Content Status</p>
          <div className="space-y-4">
            {[
              { label: 'Products', count: stats.products, href: '/admin/products' },
              { label: 'Gallery Images', count: stats.gallery, href: '/admin/gallery' },
              { label: 'FAQ Items', count: stats.faqs, href: '/admin/faq' },
            ].map(({ label, count, href }) => (
              <div key={label} className="flex items-center justify-between border-b border-[#E6D5C3] pb-3">
                <Link href={href} className="font-sans text-sm font-medium text-[#8C6239] hover:text-[#3E2723] transition-colors">{label}</Link>
                <span className="font-sans text-xs px-3 py-1 bg-[#FAFAFA] border border-[#E6D5C3] text-[#8C6239] rounded-full font-medium">
                  {loading ? '…' : count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
