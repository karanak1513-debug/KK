import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <span className="badge">Professional B2B Solutions</span>
          <h1 className="title-xl" style={{ marginTop: '24px', marginBottom: '24px' }}>
            Elevate Your Operations with Industrial-Grade Equipment
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
            Browse our comprehensive catalog of high-quality machinery, tools, and safety gear.
            Request a bulk quote tailored to your business needs today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/catalog" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Browse Catalog
            </Link>
            <Link href="/request-quote" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="title-lg">Shop by Category</h2>
          <p style={{ color: 'var(--text-muted)' }}>Explore our range of equipment categories</p>
        </div>
        <div className="grid grid-cols-4">
          {[
            { id: 1, name: 'Heavy Machinery', icon: '🏗️' },
            { id: 2, name: 'Power Tools', icon: '⚡' },
            { id: 3, name: 'Safety Gear', icon: '🦺' },
            { id: 4, name: 'Office Supplies', icon: '🏢' },
          ].map(cat => (
            <Link href="/catalog" key={cat.id} className="card" style={{ padding: '32px', textAlign: 'center', display: 'block' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{cat.icon}</div>
              <h3 className="title-md">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--surface)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="title-lg">Featured Products</h2>
            <p style={{ color: 'var(--text-muted)' }}>High-demand items ready for bulk orders</p>
          </div>
          <div className="grid grid-cols-3">
            {[1, 2, 3].map(item => (
              <div key={item} className="card">
                <div style={{ height: '200px', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Image Placeholder</span>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>SKU: PRO-10{item}</div>
                  <h3 className="title-md" style={{ marginBottom: '16px' }}>Industrial Grade Item {item}</h3>
                  <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>High performance equipment with minimum order quantity of 50 units.</p>
                  <Link href={`/catalog/${item}`} className="btn btn-secondary" style={{ width: '100%' }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 className="title-lg" style={{ marginBottom: '48px' }}>Trusted by Industry Leaders</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.5 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>GLOBAL CORP</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>INDUSTRIES INC</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>TECH BUILDERS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>MEGA STRUCTURES</div>
        </div>
      </section>
    </main>
  );
}
