import React from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TeamHero = () => {
  return (
    <section className="w-full bg-[#F8F9FA] pt-16 pb-10 px-6 lg:px-16">
      <div className="max-w-[88rem] mx-auto">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#E5F0FF] text-[#0054D2] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
            THE BRAINS BEHIND THE BRAND
          </div>
          <h1 className="text-[3rem] md:text-[4.5rem] leading-[1.1] font-display font-bold text-[#0B0F19] mb-6 tracking-tight">
            Driven by Passion, <br className="hidden md:block" />
            Powered by Code.
          </h1>
          <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed">
            We are a collective of thinkers, creators, and engineers united by a single mission: to help your business scale effortlessly.
          </p>
        </div>

        {/* Founder Card */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto bg-[#0B0F19] rounded-[2.5rem] p-6 md:p-12 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative"
        >
          
          {/* Image Side */}
          <div className="relative w-full md:w-2/5 shrink-0">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1000" 
                alt="Satyam Samrat Singh - Founder & CEO" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 md:-right-8 bg-[#0054D2] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center border-[6px] border-[#0B0F19] shadow-lg">
              <span className="font-bold text-xl leading-none mb-1">10+</span>
              <span className="text-[8px] font-bold tracking-widest uppercase">YEARS EXP.</span>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-3/5 text-left pt-4 md:pt-0">
            <div className="text-[#0054D2] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              FOUNDER & CEO
            </div>
            <h2 className="text-[2.5rem] md:text-[3rem] font-display font-bold text-white mb-6 tracking-tight">
              Satyam Samrat Singh
            </h2>
            <p className="text-gray-400 text-[15px] md:text-[16px] leading-relaxed mb-10 max-w-lg">
              "At Vector.Ai, we don't just build software; we engineer growth. Our mission is to accelerate digital evolution by creating intelligent, scalable platforms that empower visionary businesses to lead in an AI-driven world."
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#linkedin" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0077b5] transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1DA1F2] transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default TeamHero;
