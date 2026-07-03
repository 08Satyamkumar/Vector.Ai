import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCTA = () => {
  return (
    <section className="w-full max-w-[88rem] mx-auto px-6 lg:px-16 pb-24">
      <div className="w-full bg-[#0B0F19] rounded-[2.5rem] py-20 px-6 text-center flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Heading */}
        <h2 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-white mb-4 tracking-tight relative z-10">
          Not sure what <span className="text-[#0054D2]">you need?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-[15px] md:text-[16px] max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
          Book a free discovery call. We'll audit your business and recommend the perfect strategy.
        </p>

        {/* Button */}
        <Link
          to="/contact"
          className="inline-flex items-center justify-center bg-[#0054D2] text-white px-8 py-3.5 rounded-full text-[14px] font-bold hover:bg-[#0042a3] transition-colors relative z-10"
        >
          Book Free Consultation
        </Link>
      </div>
    </section>
  );
};

export default ServiceCTA;
