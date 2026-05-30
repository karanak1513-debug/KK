import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | K K Moulding',
  description: 'Terms and Conditions of K K Moulding.',
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-20 text-[#3E2723]">
      <div className="container-editorial max-w-4xl">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-8">Terms & Conditions</h1>
        <p className="font-sans text-sm text-[#8C6239] mb-12 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <div className="prose prose-brown max-w-none font-sans text-[#3E2723]/80 leading-relaxed space-y-6">
          <p>
            Welcome to K K Moulding. By accessing and using this website, you agree to comply with and be bound by the following Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">1. About Us</h2>
          <p>
            K K Moulding specializes in premium wooden mouldings, door frames (chaukats), wall mouldings, and interior decorative solutions for residential and commercial projects.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">2. Website Use</h2>
          <p>
            The information provided on this website is for general informational purposes only. We reserve the right to modify, update, or remove content without prior notice.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">3. Product Information</h2>
          <p>
            We strive to ensure that all product descriptions, images, and specifications are accurate. However, slight variations in color, texture, finish, and dimensions may occur due to the natural characteristics of wood and manufacturing processes.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">4. Pricing & Availability</h2>
          <p>
            Product prices, availability, and specifications are subject to change without notice. Displaying a product on the website does not guarantee its availability.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">5. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, graphics, designs, and product information, is the property of K K Moulding and may not be copied, reproduced, or distributed without written permission.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or policies of external websites.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">7. Limitation of Liability</h2>
          <p>
            K K Moulding shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on the information provided herein.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">8. User Enquiries</h2>
          <p>
            By submitting an enquiry through our website, you agree to provide accurate information. We reserve the right to respond, decline, or discontinue communication at our discretion.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">9. Privacy</h2>
          <p>
            Any personal information submitted through contact forms will be handled in accordance with our Privacy Policy.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">10. Governing Law</h2>
          <p>
            These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the jurisdiction of the courts in Delhi, India.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2723] mt-10 mb-4">11. Contact Information</h2>
          <p>
            K K Moulding<br />
            Website: <a href="http://www.kkmoulding.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#8C6239]">www.kkmoulding.com</a>
          </p>
          <p>
            For any questions regarding these Terms & Conditions, please contact us through our website.
          </p>
        </div>
      </div>
    </div>
  );
}
