import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  return (
    <section className="w-full max-w-[85rem] mx-auto px-6 lg:px-12 pb-24">
      
      {/* Service Card */}
      <Link to="/services/digital-marketing-services" className="relative w-full min-h-[500px] md:min-h-[600px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-8 md:p-16 group block cursor-pointer">
        
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2400")' }}
        ></div>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div> {/* Extra darkening */}

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-start">
          
          {/* Badge */}
          <div className="bg-[#0054D2] text-white text-[12px] font-bold tracking-wide px-4 py-1.5 rounded-full mb-6">
            Most Popular
          </div>

          {/* Title */}
          <h2 className="text-[3rem] md:text-[4rem] font-display font-bold text-white leading-tight mb-4 tracking-tight">
            Digital Marketing Services
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-[16px] md:text-[18px] mb-10 max-w-2xl">
            Comprehensive performance marketing strategies to dominate your market.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            {[
              'Google Ads (Search, Display, Video)',
              'Facebook & Instagram Ads',
              'Lead Generation Campaigns'
            ].map((feature, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0054D2]" fill="currentColor" stroke="none" />
                <span className="text-white text-[13.5px] font-medium tracking-wide">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Link Text */}
          <div className="group/link flex items-center gap-2 text-white font-bold text-[15px] border-b border-white pb-1 group-hover:text-[#0054D2] group-hover:border-[#0054D2] transition-colors w-fit mt-4">
            View Details 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </div>
          
        </div>
      </Link>
      
    </section>
  );
};

export default ServiceList;
