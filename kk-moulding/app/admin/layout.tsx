// app/admin/layout.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/products', label: 'Products', icon: '⬡' },
  { href: '/admin/gallery', label: 'Gallery', icon: '⬢' },
  { href: '/admin/faq', label: 'FAQ', icon: '?' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: '✉' },
  { href: '/admin/settings', label: 'Settings & SEO', icon: '⚙' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin border-[#8C6239]" />
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-[#FAFAFA]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-[#E6D5C3] bg-[#FFFFFF] min-h-screen">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-[#E6D5C3]">
          <Link href="/" target="_blank" className="block group">
            <span className="font-serif text-xl tracking-[0.15em] uppercase text-[#3E2723] group-hover:text-[#8C6239] transition-colors">K K Moulding</span>
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase mt-2 text-[#8C6239]">Admin Panel</p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 font-sans text-sm tracking-wide ${
                  isActive 
                    ? 'bg-[#8C6239] text-[#FFFFFF] shadow-md' 
                    : 'text-[#8C6239] hover:bg-[#F5EFE9] hover:text-[#3E2723]'
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#E6D5C3]">
          <div className="px-4 py-3 mb-2 bg-[#FAFAFA] rounded-md border border-[#E6D5C3]">
            <p className="font-sans text-xs font-medium text-[#3E2723] truncate">
              {user?.email || 'Admin'}
            </p>
          </div>
          <button
            onClick={() => logout().then(() => router.push('/admin/login'))}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md transition-all duration-200 font-sans text-sm tracking-wide text-[#8C6239] hover:bg-[#F5EFE9] hover:text-[#3E2723]"
          >
            <span className="w-5 text-center">⎋</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar Mobile */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#E6D5C3] bg-[#FFFFFF] lg:hidden z-20">
          <span className="font-serif text-lg tracking-widest uppercase text-[#3E2723]">K K Admin</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-[#3E2723] hover:text-[#8C6239]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {sidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </header>

        {/* Mobile nav overlay */}
        {sidebarOpen && (
          <div className="lg:hidden absolute top-[73px] left-0 w-full bg-[#FFFFFF] border-b border-[#E6D5C3] shadow-lg z-10 px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 font-sans text-sm tracking-wide ${
                    isActive 
                      ? 'bg-[#8C6239] text-[#FFFFFF]' 
                      : 'text-[#8C6239] hover:bg-[#F5EFE9]'
                  }`}
                >
                  <span className="w-5 text-center">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => logout().then(() => router.push('/admin/login'))}
              className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md transition-all duration-200 font-sans text-sm tracking-wide text-[#8C6239] hover:bg-[#F5EFE9]"
            >
              <span className="w-5 text-center">⎋</span>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        )}

        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
