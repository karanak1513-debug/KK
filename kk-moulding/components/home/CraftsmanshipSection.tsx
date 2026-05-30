// components/home/CraftsmanshipSection.tsx
export default function CraftsmanshipSection() {
  const steps = [
    {
      number: '01',
      title: 'Wood Selection',
      desc: 'We source only premium hardwoods — teak, sal, pine, and engineered alternatives — chosen for grain, density, and lasting performance.',
      image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&q=75&auto=format&fit=crop',
    },
    {
      number: '02',
      title: 'Precision Milling',
      desc: 'Each profile is cut with calibrated machinery ensuring consistent dimensions across every order, whether 10 pieces or 10,000.',
      image: 'https://images.unsplash.com/photo-1579244693210-99f36dbef7e5?w=600&q=75&auto=format&fit=crop',
    },
    {
      number: '03',
      title: 'Hand Finishing',
      desc: 'Surfaces are sanded smooth by experienced hands. Custom finishes, stains, or raw unfinished wood — all available to order.',
      image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=600&q=75&auto=format&fit=crop',
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-ink)' }}>
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 lg:mb-20">
          <div>
            <p className="section-label mb-4" style={{ color: 'rgba(169,133,98,0.8)' }}>
              Our Process
            </p>
            <h2 className="font-serif font-semibold text-white" style={{ lineHeight: 1.15 }}>
              Follow Our<br />
              <em style={{ color: 'rgba(169,133,98,0.9)', fontStyle: 'italic' }}>Workshop Journey</em>
            </h2>
          </div>
          <p className="font-sans text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Every moulding carries the mark of a process built on patience. From the first cut to the last inspection, each step is done with care that shows in the final piece installed in your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {steps.map((step) => (
            <div key={step.number} className="relative group overflow-hidden">
              <div style={{ aspectRatio: '3/4' }}>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.6) saturate(0.75)' }}
                />
              </div>
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                <span
                  className="font-serif text-5xl font-semibold"
                  style={{ color: 'rgba(169,133,98,0.35)', letterSpacing: '-0.04em' }}
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif font-medium text-white mb-2 text-xl">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
