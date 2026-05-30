// app/(site)/layout.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FloatingCall from '@/components/FloatingCall';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[80px] lg:pt-[90px]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <FloatingCall />
    </>
  );
}
