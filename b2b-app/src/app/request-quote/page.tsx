import Link from 'next/link';

export default function RequestQuote() {
  return (
    <main className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
      <h1 className="title-lg" style={{ textAlign: 'center', marginBottom: '16px' }}>Request a Quote</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '48px' }}>
        Fill out the form below and our sales team will get back to you with a customized quote within 24 hours.
      </p>
      
      <div className="card" style={{ padding: '40px' }}>
        <form>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Person *</label>
              <input type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp / Phone Number *</label>
              <input type="tel" className="form-input" required />
            </div>
          </div>
          
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Delivery City</label>
            <input type="text" className="form-input" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Required Timeline</label>
            <select className="form-select">
              <option>Immediate (Within 1 week)</option>
              <option>Standard (2-4 weeks)</option>
              <option>Planning (1-3 months)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Products to Quote & Quantities</label>
            <div style={{ background: 'var(--background)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 500 }}>PRO-101: Industrial Conveyor Belt</span>
                <input type="number" defaultValue="10" min="10" className="form-input" style={{ width: '80px', padding: '8px' }} />
              </div>
              {/* More items would populate here in a real app */}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Additional Comments</label>
            <textarea className="form-textarea" placeholder="Any special requirements?"></textarea>
          </div>
          
          <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.125rem', marginTop: '16px' }}>
            Submit Quote Request
          </button>
        </form>
      </div>
    </main>
  );
}
