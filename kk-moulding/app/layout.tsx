import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const defaultMeta = {
    title: 'K K Moulding | Premium Architectural Woodwork',
    description: 'Premium wooden mouldings, structural door chaukats, and bespoke wall panels crafted for luxury interiors across India.',
  };

  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) return defaultMeta;
    
    // Fetch directly from Firestore REST API (server-side, fast, requires no auth if rules are open)
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/main`, { next: { revalidate: 0 } });
    if (res.ok) {
      const data = await res.json();
      const fields = data.fields;
      if (fields) {
        return {
          metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
          title: fields.seoTitle?.stringValue || defaultMeta.title,
          description: fields.seoDescription?.stringValue || defaultMeta.description,
          keywords: fields.seoKeywords?.stringValue
            ? fields.seoKeywords.stringValue.split(',').map((k: string) => k.trim())
            : [],
          authors: fields.ownerName?.stringValue
            ? [{ name: fields.ownerName.stringValue }]
            : [],
        };
      }
    }
  } catch (error) {
    console.error('Failed to fetch SEO settings:', error);
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    ...defaultMeta
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <head>
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body className="antialiased bg-[#FFFFFF] text-[#3E2723] font-sans selection:bg-[#3E2723] selection:text-[#FFFFFF]">
        <AuthProvider>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#3E2723',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '0.875rem',
              },
            }}
          />
          <SpeedInsights />
        </AuthProvider>
        <Script id="chatbase-script" strategy="afterInteractive">
          {`
            (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="8xfCz6aPc8K8_mtkN_TLT";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
          `}
        </Script>
      </body>
    </html>
  );
}
