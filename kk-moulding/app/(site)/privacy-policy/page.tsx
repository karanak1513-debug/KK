import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | K K Moulding',
  description: 'Privacy Policy of K K Moulding.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-20 text-[#3E2723]">
      <div className="container-editorial max-w-4xl">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-8">Privacy Policy</h1>
        <p className="font-sans text-sm text-[#8C6239] mb-12 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <div className="prose prose-brown max-w-none font-sans text-[#3E2723]/80 leading-relaxed space-y-6">
          <p>
            At K K Moulding, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Information We Collect</h2>
          <p>
            We may collect information that you voluntarily provide through contact forms, enquiry forms, phone calls, or email communications. This may include your name, phone number, email address, company name, and project requirements.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">How We Use Your Information</h2>
          <p>The information collected may be used to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to enquiries and requests.</li>
            <li>Provide product information and quotations.</li>
            <li>Improve our website and customer experience.</li>
            <li>Communicate important updates regarding our products and services.</li>
            <li>Maintain business records and customer support.</li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Cookies & Analytics</h2>
          <p>
            Our website may use cookies and analytics tools to understand visitor behavior and improve website performance. These tools help us analyze traffic and enhance user experience.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Data Protection</h2>
          <p>
            We implement reasonable security measures to protect your information from unauthorized access, misuse, or disclosure. However, no internet transmission can be guaranteed to be completely secure.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Third-Party Services</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external websites.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Information Sharing</h2>
          <p>
            K K Moulding does not sell, rent, or trade your personal information to third parties. Information may only be shared when required by law or to provide requested services.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by contacting us through our website.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with the updated revision date.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please contact us through our website.
          </p>
          <p>
            Website: <a href="http://kkmoulding.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#8C6239]">kkmoulding.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
