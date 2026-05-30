import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | K K Moulding',
  description: 'Terms and Conditions of K K Moulding.',
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-20 text-[#3E2723]">
      <div className="container-editorial max-w-4xl">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-8">Terms & Conditions</h1>
        <p className="font-sans text-sm text-[#8C6239] mb-12 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <div className="prose prose-brown max-w-none font-sans text-[#3E2723]/80 leading-relaxed space-y-6">
          <p>
            Welcome to K K Moulding. These terms and conditions outline the rules and regulations for the use of K K Moulding's Website and Services.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use K K Moulding's website if you do not accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">1. General</h2>
          <p>
            All products and services provided by K K Moulding are subject to availability. We reserve the right to modify or discontinue any product without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">2. Pricing and Payments</h2>
          <p>
            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. Quotes provided for custom orders are valid for a specified period and may be subject to change depending on material costs and specifications.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">3. Accuracy, Completeness and Timeliness of Information</h2>
          <p>
            We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">4. Intellectual Property</h2>
          <p>
            Unless otherwise stated, K K Moulding and/or its licensors own the intellectual property rights for all material on K K Moulding. All intellectual property rights are reserved. You may access this from K K Moulding for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">6. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at info@kkmoulding.com.
          </p>
        </div>
      </div>
    </div>
  );
}
