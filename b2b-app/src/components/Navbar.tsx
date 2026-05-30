import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="nav-brand">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          ProEquip B2B
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/catalog" className="nav-link">Catalog</Link>
          <Link href="/about" className="nav-link">About Us</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <Link href="/request-quote" className="btn btn-primary">Request Quote</Link>
        </div>
      </div>
    </nav>
  );
}
