import React from 'react';
import { motion } from 'framer-motion';

const FounderQuote = () => {
  return (
    <section className="w-full bg-[#201d1c]">
      <div className="container-wide section-padding">
        
        {/* Quote Card */}
        <motion.div 
          className="relative w-full max-w-5xl mx-auto bg-[#7a7c7d] rounded-[2rem] p-10 md:p-16 overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-16 border border-white/5"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          {/* Blue Glow Effect */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2B5CA0] rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

           {/* Left: Avatar */}
          <div className="shrink-0 z-10">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-[#0F1C36] overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" // TO USE YOUR OWN PHOTO: Put your image (e.g. satyam.jpg) in the 'public' folder and change this src to "/satyam.jpg"
                alt="Satyam Samrat Singh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Quote Content */}
          <div className="flex-1 z-10 text-center md:text-left">
            {/* Quote Icon */}
            <svg
              className="w-10 h-10 text-[#4c4e4f] mb-6 mx-auto md:mx-0 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Quote Text */}
            <h3 className="text-xl md:text-[1.35rem] leading-relaxed font-display font-medium text-white mb-8 tracking-wide">
              "At Vector.Ai, we don't follow the future—we build it. True innovation isn't about solving today's problems; it's about crafting technology that makes tomorrow's challenges obsolete. We are here to revolutionize how businesses scale through clean code, visionary design, and pure AI intelligence."
            </h3>

            {/* Author */}
            <div>
              <p className="text-base font-bold text-white mb-1">Satyam Samrat Singh</p>
              <p className="text-sm font-medium text-gray-300">Founder & CEO, Vector.Ai</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default FounderQuote;
