// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="text-center px-4">
        <h1 className="font-serif font-semibold" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--color-walnut)' }}>
          404
        </h1>
        <p className="font-serif text-2xl mb-4" style={{ color: 'var(--color-ink)' }}>
          Page Not Found
        </p>
        <p className="font-sans text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--color-stone)' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
