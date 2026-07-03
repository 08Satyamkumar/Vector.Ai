import React from 'react';
import { motion } from 'framer-motion';

const TeamValues = () => {
  const values = [
    {
      title: 'Client First',
      description: "We obsess over client success. If you don't grow, we don't grow."
    },
    {
      title: 'Data Driven',
      description: "We don't guess. Every decision is backed by analytics and testing."
    },
    {
      title: 'Radical Transparency',
      description: "No hidden fees, no jargon. Just clear communication and results."
    },
    {
      title: 'Continuous Learning',
      description: "Digital moves fast. We stay ahead by learning every single day."
    }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] pb-24 px-6 lg:px-16">
      <div className="max-w-[88rem] mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 shadow-sm flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Content */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/3"
        >
          <div className="text-[#0054D2] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            OUR DNA
          </div>
          <h2 className="text-[2.5rem] md:text-[3rem] font-display font-bold text-[#0B0F19] mb-6 tracking-tight leading-tight">
            Built on Values
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
            Culture isn't just about ping-pong tables. It's about how we solve problems and treat our partners.
          </p>
          <a
            href="#careers"
            className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#0B0F19] text-[#0B0F19] rounded-full text-[14px] font-bold hover:bg-[#0B0F19] hover:text-white transition-colors"
          >
            Join the Team
          </a>
        </motion.div>

        {/* Right Content - Values Grid */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
              className="bg-[#F8F9FA] hover:bg-[#E5F0FF] transition-colors duration-300 rounded-2xl p-8 cursor-pointer"
            >
              <h3 className="text-[18px] font-bold text-[#0B0F19] mb-3">
                {value.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamValues;
