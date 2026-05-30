// app/(site)/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { addEnquiry, getSiteSettings } from '@/lib/firestore';
import { SiteSettings } from '@/lib/types';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  const whatsapp = settings?.whatsapp || '919718503557';
  const phone = settings?.phone || '+91 9718503557';
  const email = settings?.email || 'K.KMolding5@gmail.com';
  const address = settings?.address || 'B-116 Basement, Front Side, W.H.S Timber Market, Kirti Nagar, New Delhi 110015, India';
  const mapEmbedUrl = settings?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118447.92896374838!2d70.75119!3d22.30390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca4d0c0f0f0f%3A0x5a93938f7ab44b7f!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await addEnquiry(form);
      toast.success('Enquiry sent! We\'ll contact you shortly.');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try WhatsApp or call directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-16">
        <div className="container-editorial max-w-4xl">
          <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[#999999] mb-4 block font-medium">Get In Touch</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#3E2723] mb-6 tracking-tight">
            Contact Us
          </h1>
          <div className="w-16 h-[1px] bg-[#E6D5C3] mb-8"></div>
          <p className="font-sans text-sm text-[#8C6239] leading-loose font-light max-w-xl">
            Tell us about your project and our team will respond with material availability, lead times, and a bespoke quotation.
          </p>
        </div>
      </section>

      {/* Contact Body */}
      <section className="pb-16">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">

            {/* Left — Details */}
            <div className="lg:pr-12">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[#999999] mb-8 block font-medium">Direct Contact</span>
              
              <div className="space-y-10 mb-12">
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Phone</span>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="font-serif text-2xl text-[#3E2723] hover:text-[#8C6239] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Email</span>
                  <a
                    href={`mailto:${email}`}
                    className="font-serif text-2xl text-[#3E2723] hover:text-[#8C6239] transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Workshop Address</span>
                  <p className="font-sans text-sm text-[#8C6239] leading-loose font-light max-w-xs">
                    {address}
                  </p>
                </div>
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-2 block font-medium">Working Hours</span>
                  <p className="font-sans text-sm text-[#8C6239] leading-loose font-light">
                    Monday – Saturday, 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsapp}?text=Hello! I'd like to enquire about your wooden mouldings.`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#3E2723] hover:text-[#8C6239] transition-colors flex items-center gap-3 font-medium mb-12 inline-flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Connect on WhatsApp
              </a>

              {/* Map */}
              <div className="mt-8 aspect-video w-full bg-[#FAFAFA] overflow-hidden border border-[#E6D5C3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118447.92896374838!2d70.75119!3d22.30390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca4d0c0f0f0f%3A0x5a93938f7ab44b7f!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1) brightness(1.1) sepia(0.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="K K Moulding Location"
                />
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-[#FFFFFF] rounded-[4px] p-8 lg:p-12 border border-[#E6D5C3] shadow-sm">
              <span className="font-serif text-2xl text-[#3E2723] mb-10 block tracking-tight">Send an Enquiry</span>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-3 block font-medium" htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-sm focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] placeholder-[#999999] transition-colors"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-3 block font-medium" htmlFor="contact-phone">Phone Number *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-sm focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] placeholder-[#999999] transition-colors"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-3 block font-medium" htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-sm focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] placeholder-[#999999] transition-colors"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-3 block font-medium" htmlFor="contact-message">Message / Requirement *</label>
                  <textarea
                    id="contact-message"
                    className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-sm focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] placeholder-[#999999] min-h-[100px] resize-y transition-colors"
                    placeholder="Describe your project, product required, dimensions, quantity..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-pill-dark w-full justify-center mt-8"
                >
                  {loading ? 'Sending Enquiry…' : 'Submit Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
