// app/(site)/faq/page.tsx
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
  { id: '7', question: 'How long does delivery take?', answer: 'Standard products are typically ready within 5–10 working days. Custom profiles and large orders may take 2–4 weeks. Urgent requirements can often be accommodated — contact us to discuss.', order: 7 },
  { id: '8', question: 'Do you offer samples before bulk orders?', answer: 'Yes. We can provide sample pieces for most standard profiles before you commit to a large order. There may be a nominal charge for samples including courier costs.', order: 8 },
  { id: '9', question: 'Can you machine a profile I have drawn or designed?', answer: 'Yes. We accept profiles from drawings, DXF files, or physical samples. Send us your design and we will quote for profile creation and per-unit pricing.', order: 9 },
  { id: '10', question: 'Are your mouldings suitable for exterior use?', answer: 'Most of our products are designed for interior use. However, we do offer specific species and finishes suitable for sheltered exterior applications. Please specify your use case when enquiring.', order: 10 },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFAQs);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    getFAQs().then((f) => { if (f.length > 0) setFaqs(f); }).catch(() => {});
  }, []);

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-16">
      {/* Hero */}
      <section className="pt-16 pb-16">
        <div className="container-editorial max-w-4xl">
          <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#8C6239] mb-4 block font-medium">Help</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#3E2723] mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-[1px] bg-[#E6D5C3] mb-8"></div>
          <p className="font-sans text-sm text-[#8C6239] leading-loose font-light max-w-xl">
            Answers to the most common questions about our products, ordering, and supply. For bespoke requirements, please reach out to our team directly.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section>
        <div className="container-editorial max-w-4xl">
          <div className="border-t border-[#E6D5C3]">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-[#E6D5C3]">
                <button
                  className="w-full text-left py-8 flex items-start justify-between gap-6 group"
                  onClick={() => setOpen(open === faq.id ? null : faq.id ?? null)}
                >
                  <span
                    className={`font-sans text-sm md:text-base transition-colors ${open === faq.id ? 'text-[#3E2723] font-medium' : 'text-[#8C6239] group-hover:text-[#3E2723]'}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-500 mt-1"
                    style={{
                      transform: open === faq.id ? 'rotate(45deg)' : 'none',
                      color: open === faq.id ? '#3E2723' : '#999999',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: open === faq.id ? '400px' : '0',
                    opacity: open === faq.id ? 1 : 0,
                  }}
                >
                  <p className="font-sans text-sm text-[#8C6239] leading-loose pb-8 font-light pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 p-12 bg-[#FFFFFF] text-center rounded-[4px] border border-[#E6D5C3]">
            <h3 className="font-serif text-3xl text-[#3E2723] mb-4 tracking-tight">
              Didn't find your answer?
            </h3>
            <p className="font-sans text-sm text-[#8C6239] mb-8 font-light">
              Contact us directly and our team will get back to you promptly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-pill-dark">Send a Message</Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-outline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
