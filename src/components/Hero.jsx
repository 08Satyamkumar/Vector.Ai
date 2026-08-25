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
              We build intelligent digital products, AI systems, software and automation solutions that help businesses operate smarter, scale faster and create what’s next.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/contact"
                className="relative group overflow-hidden px-8 py-3.5 bg-[#0B0F19] text-white rounded-full font-semibold text-[15px] shadow-[0_4px_15px_rgba(11,15,25,0.15)] hover:shadow-[0_8px_25px_rgba(0,84,210,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                {/* Diagonal shiny light reflection that sweeps on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">Build With Us</span>
              </Link>
              <Link
                to="/services"
                className="relative group overflow-hidden px-8 py-3.5 bg-white text-[#0B0F19] rounded-full font-semibold text-[15px] border border-gray-200 shadow-sm hover:shadow-[0_8px_25px_rgba(0,84,210,0.06)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                {/* Diagonal shiny light reflection that sweeps on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">Explore Our Technology</span>
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
