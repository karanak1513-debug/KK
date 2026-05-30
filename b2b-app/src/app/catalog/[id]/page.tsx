import Link from 'next/link';

export default function SingleProduct() {
  return (
    <main className="container" style={{ padding: '60px 24px' }}>
      <Link href="/catalog" style={{ color: 'var(--text-muted)', marginBottom: '24px', display: 'inline-block' }}>
        &larr; Back to Catalog
      </Link>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <div className="card" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
           <span style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}>Product Image Gallery</span>
        </div>
        
        <div>
          <div style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>SKU: PRO-101 | Category: Machinery</div>
          <h1 className="title-lg" style={{ marginBottom: '24px' }}>Industrial Conveyor Belt System</h1>
          
          <p style={{ fontSize: '1.125rem', color: 'var(--text-main)', marginBottom: '32px' }}>
            High-efficiency conveyor belt system designed for heavy-duty industrial applications. 
            Built with reinforced steel and premium rubber for maximum durability and longevity.
          </p>
          
          <div className="card" style={{ padding: '24px', marginBottom: '32px', backgroundColor: 'var(--background)' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>B2B Information</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Minimum Order Quantity (MOQ):</span>
                <span style={{ fontWeight: 600 }}>10 Units</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Lead Time:</span>
                <span style={{ fontWeight: 600 }}>14-21 Days</span>
              </li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <Link href="/request-quote?product=PRO-101" className="btn btn-primary" style={{ flex: 1 }}>
              Add to Quote
            </Link>
            <Link href="/product-enquiry?product=PRO-101" className="btn btn-secondary" style={{ flex: 1 }}>
              Send Enquiry
            </Link>
          </div>
          
          <div>
            <a href="#" className="btn btn-secondary" style={{ width: '100%' }}>
              📄 Download PDF Brochure
            </a>
          </div>
        </div>
      </div>
      
      <section style={{ marginTop: '80px' }}>
        <h2 className="title-md" style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
          Technical Specifications
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {[
              { label: 'Material', value: 'Reinforced Steel & High-Grade Rubber' },
              { label: 'Weight Capacity', value: '5000 kg/hr' },
              { label: 'Power Source', value: '3-Phase 400V' },
              { label: 'Warranty', value: '2 Years Manufacturer' }
            ].map((spec, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 0', color: 'var(--text-muted)', width: '30%' }}>{spec.label}</td>
                <td style={{ padding: '16px 0', fontWeight: 500 }}>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
