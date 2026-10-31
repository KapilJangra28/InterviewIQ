import React from 'react';

export const BrandList = {};

export default function BrandSlider({ brandList = [] }) {
  // Default benchmark tech brands if none provided
  const defaultBrands = [
    { name: 'Google', symbol: 'Google' },
    { name: 'Microsoft', symbol: 'Microsoft' },
    { name: 'Amazon', symbol: 'Amazon' },
    { name: 'Meta', symbol: 'Meta' },
    { name: 'Netflix', symbol: 'Netflix' },
    { name: 'Uber', symbol: 'Uber' },
    { name: 'Stripe', symbol: 'Stripe' },
    { name: 'Salesforce', symbol: 'Salesforce' },
  ];

  const items = brandList.length > 0 ? brandList : defaultBrands;
  // Double list for seamless looping marquee
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="py-12 border-y border-[#E8EAED]/80 bg-white/60 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#737987]">
          Trusted by candidates placed at 850+ leading engineering enterprises
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16">
          {marqueeItems.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex items-center gap-2.5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer shrink-0"
            >
              {brand.image ? (
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-7 w-auto object-contain max-w-[120px]"
                />
              ) : (
                <div className="px-4 py-1.5 rounded-xl bg-gray-100/80 border border-gray-200/80 text-xs font-bold text-gray-700 tracking-tight flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6655D9]" />
                  <span>{brand.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
