import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="w-full bg-[#0a1128] py-20 lg:py-32 relative">
      <div className="container-wide">
        
        {/* Animated Card */}
        <motion.div 
          className="relative max-w-5xl mx-auto bg-[#0F1C36] border border-white/5 rounded-[2.5rem] overflow-hidden p-10 md:p-20 shadow-2xl flex flex-col items-center text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          {/* Background Grid Pattern inside Card */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>

          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Top Badge */}
            <div className="inline-block border border-white/20 rounded-full px-5 py-2 mb-8 bg-white/5 backdrop-blur-sm">
              <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                START YOUR GROWTH JOURNEY
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] font-display font-bold text-white mb-6 tracking-tight max-w-4xl">
              Ready to scale your <br />
              <span className="relative inline-block">
                revenue?
                {/* Hand-drawn underline effect */}
                <svg 
                  className="absolute w-full h-4 -bottom-1 left-0 text-[#0054D2] fill-current" 
                  viewBox="0 0 200 12" 
                  preserveAspectRatio="none"
                >
                  <path d="M2.5,9.5 C45,2.5 130,-2.5 197.5,7.5 C150,5.5 65,5.5 10.5,10.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Stop guessing with your marketing budget. Join hundreds of fast-growing companies using Scallar's data-driven strategies.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-white text-[#0B0F19] rounded-full text-[15px] font-bold hover:bg-gray-100 transition-colors"
              >
                Let's Discuss <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#success-stories"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-transparent text-white border border-white/20 rounded-full text-[15px] font-medium hover:bg-white/5 transition-colors"
              >
                View Success Stories <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
