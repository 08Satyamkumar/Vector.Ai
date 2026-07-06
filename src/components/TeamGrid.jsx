import React from 'react';
import { motion } from 'framer-motion';

const TeamGrid = () => {
  const team = [
    {
      id: 1,
      name: 'Shivam K@ushik',
      role: 'FULL STACK DEVELOPER',
      description: 'Full-stack wizard responsible for the robust and scalable architecture behind our client solutions.',
      image: '/shivam_kaushik.png',
    },
    {
      id: 2,
      name: 'Adarsh Bhardwaj',
      role: 'SENIOR FULL STACK DEVELOPER',
      description: 'Specialist in MERN stack and cloud architecture. Builds scalable backend systems for high-traffic applications.',
      image: '/adarsh_bhardwaj.png',
    },
    {
      id: 3,
      name: 'Rohan Deshmukh',
      role: 'BACKEND LEAD',
      description: 'Expert in database optimization and API security. Ensures 99.9% uptime for all client applications.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 4,
      name: 'Priya Singh',
      role: 'CREATIVE DIRECTOR',
      description: 'Award-winning designer with an eye for aesthetics. She ensures every pixel serves the brand narrative.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 5,
      name: 'Muskan K@ushik',
      role: 'AI AUTOMATION LEAD',
      description: 'Expert strategist specializing in custom AI chatbot integration, CRM automation, and high-converting social media marketing automation.',
      image: '/muskan_kaushik.png',
    },
    {
      id: 6,
      name: 'Vikram Malhotra',
      role: 'SEO LEAD',
      description: 'Master of algorithms. Helping clients rank #1 on Google through white-hat technical and content SEO.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 7,
      name: 'Neha Kapoor',
      role: 'CLIENT SUCCESS MANAGER',
      description: 'Dedicated to client happiness. She ensures smooth communication and timely delivery of all projects.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] py-16 lg:py-24 px-6 lg:px-16">
      <div className="max-w-[88rem] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-[#0B0F19] mb-4 tracking-tight">
            Meet the Core Team
          </h2>
          <p className="text-gray-500 text-[15px] md:text-[16px] max-w-2xl mx-auto">
            Expertise across every digital discipline, working together to deliver excellence.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={member.id} 
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
              className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Image with rounded top corners */}
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-gray-200">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-white/95 backdrop-blur-sm text-[#0B0F19] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm capitalize">
                    {member.role.toLowerCase()}
                  </span>
                  <a 
                    href="#" 
                    onClick={(e) => e.stopPropagation()} 
                    className="w-8 h-8 bg-white text-gray-500 rounded-full flex items-center justify-center shadow-md hover:bg-[#0077b5] hover:text-white transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-[20px] font-bold text-[#0B0F19] mb-3">
                {member.name}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamGrid;
