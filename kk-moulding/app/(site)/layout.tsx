// app/(site)/layout.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FloatingCall from '@/components/FloatingCall';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[56px] lg:pt-[64px]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <FloatingCall />
    </>
  );
}
