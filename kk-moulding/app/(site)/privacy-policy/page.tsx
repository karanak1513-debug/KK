import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | K K Moulding',
  description: 'Privacy Policy of K K Moulding.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-20 text-[#3E2723]">
      <div className="container-editorial max-w-4xl">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-8">Privacy Policy</h1>
        <p className="font-sans text-sm text-[#8C6239] mb-12 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <div className="prose prose-brown max-w-none font-sans text-[#3E2723]/80 leading-relaxed space-y-6">
          <p>
            At K K Moulding, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or interact with our services.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products, participating in activities on the Website, or otherwise contacting us. The personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and Contact Data (email address, phone number, postal address)</li>
            <li>Business Information (company name, GST number)</li>
            <li>Communication history and inquiry details</li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To fulfill and manage your orders, payments, and inquiries.</li>
            <li>To send administrative information to you regarding our services and products.</li>
            <li>To protect our Services and improve user experience.</li>
            <li>To respond to legal requests and prevent harm.</li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">3. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">4. Sharing Your Information</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell or rent your personal data to third parties.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us at info@kkmoulding.com or by post to:
            <br /><br />
            <strong>K K Moulding</strong><br />
            Industrial Area, Rajkot<br />
            Gujarat, India
          </p>
        </div>
      </div>
    </div>
  );
}
