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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0054D2]/10 to-[#FF1744]/10 border border-[#0054D2]/20 mb-6 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,84,210,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1744] animate-pulse"></span>
              <span className="text-[10px] font-bold text-[#0054D2] tracking-[0.2em] uppercase">
                ENGINEERING THE FUTURE
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-display font-bold leading-[1.05] text-brand-dark mb-6 tracking-tight">
              Building Technology <br className="hidden lg:block" />
              That <span className="bg-gradient-to-r from-[#0054D2] to-[#FF1744] bg-clip-text text-transparent">Moves the World Forward.</span>
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
