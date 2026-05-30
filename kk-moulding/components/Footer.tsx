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

  return (
    <footer className="bg-[#3E2723] text-[#FFFFFF] pt-10 pb-8">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Desc */}
          <div className="lg:col-span-1">
            <span className="font-serif text-xl tracking-[0.15em] uppercase mb-6 inline-block text-[#FFFFFF]">
              K K Moulding
            </span>
            <p className="font-sans text-[#A3A3A3] text-xs leading-relaxed mb-6 max-w-[200px]">
              Premium wooden mouldings and architectural woodwork crafted with passion and perfection.
            </p>

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
