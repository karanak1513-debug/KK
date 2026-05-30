// components/home/FAQSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { getFAQs } from '@/lib/firestore';
import { FAQItem } from '@/lib/types';
import Link from 'next/link';

const defaultFAQs: FAQItem[] = [
  { id: '1', question: 'Which wood types are available?', answer: 'We work with teak, sal, pine, engineered hardwood, and MDF-core profiles. Specific wood types can be requested on enquiry — availability depends on current stock and order size.', order: 1 },
  { id: '2', question: 'Do you offer custom sizes?', answer: 'Yes. All our products can be made to custom dimensions. Share your specifications when you enquire and we will confirm feasibility and lead time.', order: 2 },
  { id: '3', question: 'Can I order in bulk?', answer: 'Absolutely. We welcome bulk and trade orders from contractors, architects, and builders. Bulk pricing is available on request. Please contact us with your volume requirements.', order: 3 },
  { id: '4', question: 'Do you supply across India?', answer: 'Yes. We supply to all major cities and states across India. Freight is coordinated through reliable transport partners. Delivery timelines vary by location.', order: 4 },
  { id: '5', question: 'Is unfinished wood available?', answer: 'Yes. All our products are available in raw, unfinished form so you can apply your own stain, paint, or lacquer on-site. We also offer pre-sanded and pre-primed options.', order: 5 },
  { id: '6', question: 'What is the minimum order quantity?', answer: 'We supply to both retail and trade customers. There is no strict minimum for most products, though custom profiles may require a minimum run. Please enquire for specifics.', order: 6 },
];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFAQs);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    getFAQs().then((f) => { if (f.length > 0) setFaqs(f); }).catch(() => {});
  }, []);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <p className="section-label mb-3">Common Questions</p>
            <h2 className="font-serif font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
              Have a Question?
            </h2>
            <div className="divider" />
            <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: 'var(--color-stone)' }}>
              If you don't see your question here, reach out directly — we respond to every enquiry.
            </p>
            <Link href="/faq" className="btn-outline">
              All FAQs
            </Link>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-2 divide-y" style={{ borderColor: 'var(--color-beige-dark)', borderTop: '1px solid var(--color-beige-dark)' }}>
            {faqs.slice(0, 5).map((faq) => (
              <div key={faq.id} className="divide-y" style={{ borderColor: 'var(--color-beige-dark)' }}>
                <button
                  className="w-full text-left py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpen(open === faq.id ? null : faq.id ?? null)}
                >
                  <span
                    className="font-sans font-medium text-base"
                    style={{ color: open === faq.id ? 'var(--color-walnut)' : 'var(--color-ink)' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300"
                    style={{
                      transform: open === faq.id ? 'rotate(45deg)' : 'none',
                      color: 'var(--color-walnut)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: open === faq.id ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}
                >
                  <p className="font-sans text-sm leading-relaxed pb-5" style={{ color: 'var(--color-stone)' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
