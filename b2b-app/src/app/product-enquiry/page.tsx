import Link from 'next/link';

export default function ProductEnquiry() {
  return (
    <main className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
      <h1 className="title-lg" style={{ textAlign: 'center', marginBottom: '16px' }}>Product Enquiry</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '48px' }}>
        Have questions about a specific product? Send us a message and our technical team will assist you.
      </p>
      
      <div className="card" style={{ padding: '40px' }}>
        <form>
          <div className="form-group">
            <label className="form-label">Product of Interest</label>
            <select className="form-select">
              <option value="PRO-101">PRO-101: Industrial Conveyor Belt</option>
              <option value="FL-500">FL-500: Heavy Duty Forklift</option>
              <option value="SH-100">SH-100: Safety Harness Pro</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" className="form-input" required />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Enquiry Details *</label>
            <textarea className="form-textarea" required placeholder="What would you like to know about this product?"></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Attach File (Optional)</label>
            <input type="file" className="form-input" style={{ padding: '8px' }} />
          </div>
          
          <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.125rem', marginTop: '16px' }}>
            Send Enquiry
          </button>
        </form>
      </div>
    </main>
  );
}
