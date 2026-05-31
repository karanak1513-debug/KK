// components/home/AboutStrip.tsx
import Link from 'next/link';

export default function AboutStrip() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-beige)' }}>
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-serif font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
              Why We Love<br />
              <em style={{ color: 'var(--color-walnut)', fontStyle: 'italic' }}>the Grain</em>
            </h2>
            <div className="divider" />
            <p className="font-sans text-base leading-relaxed mb-6" style={{ color: 'var(--color-stone)' }}>
              At K K Moulding, every piece begins with a single question: how can wood serve the spaces people love? For over a decade, our workshop in Delhi has been a quiet place of careful hands and honest materials — no shortcuts, no compromises.
            </p>
            <p className="font-sans text-base leading-relaxed mb-10" style={{ color: 'var(--color-stone)' }}>
              We work with architects, contractors, and discerning homeowners who understand that the right moulding completes a room the way punctuation completes a sentence. Understated, essential, and made to last.
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              {[['10+', 'Years of Craft'], ['5,000+', 'Projects Delivered'], ['All India', 'Supply']].map(
                ([num, label]) => (
                  <div key={label}>
                    <p className="font-serif text-3xl font-semibold" style={{ color: 'var(--color-walnut)' }}>
                      {num}
                    </p>
                    <p className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>{label}</p>
                  </div>
                )
              )}
            </div>
            <Link href="/about" className="btn-primary">
              Read Our Story
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="img-zoom-wrap" style={{ aspectRatio: '4/5' }}>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format&fit=crop"
                alt="Our woodworking workshop"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small accent image */}
            <div
              className="absolute -bottom-6 -left-6 w-36 h-36 lg:w-48 lg:h-48 border-4 overflow-hidden"
              style={{ borderColor: 'var(--color-ivory)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1572537800927-f28f7b26ab20?w=400&q=80&auto=format&fit=crop"
                alt="Wood texture detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
