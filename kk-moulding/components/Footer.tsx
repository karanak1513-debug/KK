import Link from 'next/link';

async function getSettings() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;
  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/main`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      return data.fields;
    }
  } catch (e) {}
  return null;
}

export default async function Footer() {
  const settings = await getSettings();
  const phone = settings?.phone?.stringValue || '+91 9718503557';
  const email = settings?.email?.stringValue || 'K.KMolding5@gmail.com';
  const address = settings?.address?.stringValue || 'B-116 Basement, Front Side, W.H.S Timber Market, Kirti Nagar, New Delhi 110015, India';
  const ownerName = settings?.ownerName?.stringValue || '';
  const gstNumber = settings?.gstNumber?.stringValue || '';
  const instagram = settings?.instagram?.stringValue || 'https://www.instagram.com/kk_moulding?igsh=MTd0bGVnY2ZrZGoyNw%3D%3D';

  return (
    <footer className="bg-[#3E2723] text-[#FFFFFF] pt-10 pb-8">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Desc */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 h-20 w-auto bg-white rounded-md p-2">
              <img 
                src="/logo.png?v=6" 
                alt="K K Moulding Logo" 
                className="h-full w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="font-sans text-[#A3A3A3] text-xs leading-relaxed mb-6 max-w-[200px]">
              Premium wooden mouldings and architectural woodwork crafted with passion and perfection.
            </p>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.15em] uppercase text-[#A3A3A3] hover:text-[#FFFFFF] transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-6 font-bold text-[#FFFFFF]">QUICK LINKS</h4>
            <ul className="space-y-3 font-sans text-xs text-[#A3A3A3]">
              <li><Link href="/" className="hover:text-[#FFFFFF] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#FFFFFF] transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-[#FFFFFF] transition-colors">Products</Link></li>
              <li><Link href="/gallery" className="hover:text-[#FFFFFF] transition-colors">Gallery</Link></li>
              <li><Link href="/faq" className="hover:text-[#FFFFFF] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#FFFFFF] transition-colors">Contact</Link></li>
            </ul>
          </div>


          {/* Column 4: Contact */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-6 font-bold text-[#FFFFFF]">CONTACT US</h4>
            <ul className="space-y-4 font-sans text-xs text-[#A3A3A3]">
              {ownerName && (
                <li className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span>{ownerName} (Owner)</span>
                </li>
              )}
              {gstNumber && (
                <li className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="16" y1="2" x2="16" y2="4" /><line x1="8" y1="2" x2="8" y2="4" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  <span>GSTIN: {gstNumber}</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-[#FFFFFF] transition-colors">{phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href={`mailto:${email}`} className="hover:text-[#FFFFFF] transition-colors">{email}</a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="leading-relaxed">{address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333333] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-sans font-light text-[0.65rem] tracking-wide text-[#A3A3A3]">
          <p>© 2025 K K Moulding. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#FFFFFF] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#FFFFFF] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
