'use client';

export default function FloatingCall() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 9718503557';
  const telUrl = `tel:${phoneNumber.replace(/\s/g, '')}`;

  return (
    <a
      href={telUrl}
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#8C6239] text-white rounded-full shadow-lg hover:bg-[#7A5330] transition-transform hover:scale-110"
      aria-label="Call Now"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  );
}
