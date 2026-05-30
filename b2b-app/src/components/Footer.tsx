import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-brand" style={{ marginBottom: '16px' }}>ProEquip B2B</div>
            <p style={{ color: 'var(--text-muted)' }}>
              Delivering high-quality industrial equipment and solutions to businesses worldwide since 2005.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Company</h4>
            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/careers">Careers</Link>
            </div>
          </div>
          <div>
            <h4 className="footer-heading">Products</h4>
            <div className="footer-links">
              <Link href="/catalog">All Equipment</Link>
              <Link href="/catalog">Machinery</Link>
              <Link href="/catalog">Safety Gear</Link>
            </div>
          </div>
          <div>
            <h4 className="footer-heading">Legal</h4>
            <div className="footer-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>&copy; {new Date().getFullYear()} ProEquip B2B. All rights reserved.</p>
        </div>
      </div>
      
      {/* Floating WhatsApp */}
      <a href="https://wa.me/919718503557" className="floating-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </footer>
  );
}
