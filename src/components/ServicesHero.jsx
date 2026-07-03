import React from 'react';
import { Search } from 'lucide-react';

const ServicesHero = () => {
  const categories = ['All', 'Marketing', 'Development', 'Automation & AI', 'Consulting'];

  return (
    <section className="w-full flex flex-col items-center justify-center pt-16 pb-10 px-6 lg:px-16 text-center bg-[#F8F9FA]">
      
      {/* Badge */}
      <div className="bg-[#E5F0FF] text-[#0054D2] text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full mb-6">
        EXPERTISE
      </div>

      {/* Heading */}
      <h1 className="text-[3.5rem] md:text-[4.5rem] font-display font-bold text-[#0B0F19] leading-tight mb-6 tracking-tight">
        Our Services
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-[16px] md:text-[18px] max-w-2xl leading-relaxed mb-12">
        Comprehensive digital solutions tailored to your business goals. We
        integrate technology with creativity to drive revenue.
      </p>

      {/* Search Bar */}
      <div className="relative w-full max-w-xl mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 bg-white text-[15px] text-gray-700"
          placeholder="Find a service (e.g., SEO, AI)..."
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all shadow-sm
              ${index === 0 
                ? 'bg-[#0B0F19] text-white hover:bg-black' 
                : 'bg-white text-[#0B0F19] hover:bg-gray-50'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ServicesHero;
