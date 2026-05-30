import Link from 'next/link';

export default function Catalog() {
  const products = [
    { id: 1, name: 'Industrial Conveyor Belt', sku: 'CB-200', category: 'Machinery' },
    { id: 2, name: 'Heavy Duty Forklift', sku: 'FL-500', category: 'Machinery' },
    { id: 3, name: 'Safety Harness Pro', sku: 'SH-100', category: 'Safety Gear' },
    { id: 4, name: 'Power Drill V2', sku: 'PD-200', category: 'Power Tools' },
    { id: 5, name: 'Steel Workbenches', sku: 'WB-300', category: 'Office Supplies' },
    { id: 6, name: 'Welding Helmet', sku: 'WH-400', category: 'Safety Gear' },
  ];

  return (
    <main className="container" style={{ padding: '60px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="title-lg">Product Catalog</h1>
          <p style={{ color: 'var(--text-muted)' }}>Browse products and request quotes.</p>
        </div>
      </div>

      <div className="grid grid-cols-4">
        <aside style={{ gridColumn: 'span 1' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 className="title-md" style={{ marginBottom: '16px' }}>Filters</h3>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select">
                <option>All Categories</option>
                <option>Machinery</option>
                <option>Safety Gear</option>
                <option>Power Tools</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Search SKU</label>
              <input type="text" className="form-input" placeholder="e.g. CB-200" />
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>Apply Filters</button>
          </div>
        </aside>
        
        <div style={{ gridColumn: 'span 3' }}>
          <div className="grid grid-cols-3">
            {products.map(p => (
              <div key={p.id} className="card">
                <div style={{ height: '180px', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Image</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>{p.category}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{p.sku}</span>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px' }}>{p.name}</h3>
                  <Link href={`/catalog/${p.id}`} className="btn btn-secondary" style={{ width: '100%' }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
