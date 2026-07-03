import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full">
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="flex flex-col items-start"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-gray border border-gray-100 mb-6">
              <span className="text-[11px] font-bold text-gray-800 tracking-[0.15em] uppercase">
                TRUSTED DIGITAL PARTNER
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-display font-bold leading-[1.05] text-brand-dark mb-6 tracking-tight">
              Digital Marketing & <br className="hidden lg:block" />
              AI Automation <br className="hidden lg:block" />
              Agency
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-[16px] lg:text-[17px] leading-[1.75] max-w-[90%] mb-10">
              Top-rated Digital Marketing and AI Automation agency. We specialize in SEO, Web Development, and scaling businesses with data-driven strategies.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-brand-dark text-white rounded-full font-semibold text-[15px] hover:bg-black transition-colors"
              >
                Start Project
              </Link>
              <Link
                to="/services"
                className="px-8 py-3.5 bg-white text-brand-dark rounded-full font-semibold text-[15px] hover:bg-gray-50 border border-gray-200 shadow-sm transition-all"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div 
            className="relative w-full aspect-[4/3] lg:aspect-[4/3.2]"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 relative">
              <img 
                src="/hero-image.png" 
                alt="Modern Office Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
