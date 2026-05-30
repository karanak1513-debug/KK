import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
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
        </AuthProvider>
      </body>
    </html>
  );
}
