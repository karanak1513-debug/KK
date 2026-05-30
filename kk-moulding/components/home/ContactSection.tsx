// components/home/ContactSection.tsx
'use client';

import { useState } from 'react';
import { addEnquiry } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210';
  const email = process.env.NEXT_PUBLIC_EMAIL || 'info@kkmoulding.com';
  const address = process.env.NEXT_PUBLIC_ADDRESS || 'Industrial Area, Rajkot, Gujarat';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await addEnquiry(form);
      toast.success('Enquiry sent! We\'ll be in touch shortly.');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please try WhatsApp or call directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-beige)' }}>
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Info */}
          <div>
            <p className="section-label mb-3">Get In Touch</p>
            <h2 className="font-serif font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
              Ready to Start<br />
              <em style={{ color: 'var(--color-walnut)', fontStyle: 'italic' }}>Your Project?</em>
            </h2>
            <div className="divider" />
            <p className="font-sans text-base leading-relaxed mb-8" style={{ color: 'var(--color-stone)' }}>
              Tell us about your project and we'll get back to you with options, lead times, and a custom quote. No pressure, no obligation.
            </p>

            <div className="space-y-5 mb-8">
              <ContactDetail label="Phone" value={phone} href={`tel:${phone.replace(/\s/g, '')}`} />
              <ContactDetail label="WhatsApp" value={phone} href={`https://wa.me/${whatsapp}`} external />
              <ContactDetail label="Email" value={email} href={`mailto:${email}`} />
              <div>
                <p className="section-label mb-1">Address</p>
                <p className="font-sans text-base" style={{ color: 'var(--color-ink)' }}>{address}</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsapp}?text=Hello! I'd like to enquire about your wooden mouldings.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="section-label block mb-2">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  className="input-field"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="section-label block mb-2">Phone *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  className="input-field"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="section-label block mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="input-field"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="section-label block mb-2">Message / Requirement *</label>
                <textarea
                  id="contact-message"
                  className="input-field"
                  placeholder="Tell us about your project, dimensions, wood type preference…"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button
                id="contact-submit"
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center"
              >
                {loading ? 'Sending…' : 'Send Enquiry'}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16" style={{ height: '320px', overflow: 'hidden' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118447.92896374838!2d70.75119!3d22.30390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca4d0c0f0f0f%3A0x5a93938f7ab44b7f!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0, filter: 'grayscale(0.3) sepia(0.15)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="K K Moulding Location"
          />
        </div>
      </div>
    </section>
  );
}

function ContactDetail({
  label, value, href, external,
}: {
  label: string; value: string; href: string; external?: boolean;
}) {
  return (
    <div>
      <p className="section-label mb-1">{label}</p>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="font-sans text-base transition-colors hover:text-walnut-600"
        style={{ color: 'var(--color-ink)' }}
      >
        {value}
      </a>
    </div>
  );
}
