import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Kamlesh Gupta',
    role: 'FULL STACK DEVELOPER',
    description: 'Full-stack wizard responsible for the robust and scalable architecture behind our client solutions.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Deepesh Patel',
    role: 'SENIOR FULL STACK DEVELOPER',
    description: 'Specialist in MERN stack and cloud architecture. Builds scalable backend systems for high-traffic applications.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Rohan Deshmukh',
    role: 'BACKEND LEAD',
    description: 'Expert in database optimization and API security. Ensures 99.9% uptime for all client applications.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Priya Singh',
    role: 'CREATIVE DIRECTOR',
    description: 'Award-winning designer with an eye for aesthetics. She ensures every pixel serves the brand narrative.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Aisha Verma',
    role: 'HEAD OF DIGITAL MARKETING',
    description: 'Expert strategist who has managed ad spends over ₹5Cr. Specializes in high-ROI PPC and social media campaigns.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Vikram Malhotra',
    role: 'SEO LEAD',
    description: 'Master of algorithms. Helping clients rank #1 on Google through white-hat technical and content SEO.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    name: 'Neha Kapoor',
    role: 'CLIENT SUCCESS MANAGER',
    description: 'Dedicated to client happiness. She ensures smooth communication and timely delivery of all projects.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
];

const Team = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % teamMembers.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Show 4 items dynamically, wrapping around the array
  const getVisibleCards = () => {
    const cards = [];
    const numCards = 4; // Render 4 items for the flex container
    for (let i = 0; i < numCards; i++) {
      cards.push(teamMembers[(startIndex + i) % teamMembers.length]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[#0054D2] text-xs font-bold tracking-widest uppercase mb-3 block">
          OUR TEAM
        </span>
        <h2 className="text-[2.75rem] leading-[1.1] font-display font-bold text-[#0B0F19] tracking-tight">
          Meet The Experts
        </h2>
      </div>

      {/* Auto-Sliding Carousel */}
      <div className="relative w-full">
        {/* We use flex layout and overflow-visible to allow smooth sliding */}
        <div className="flex gap-6 justify-start md:justify-center">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="group flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex flex-col items-start bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
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
                
                {/* Info */}
                <h3 className="text-[1.1rem] font-bold text-[#0B0F19] mb-1.5 px-2">{member.name}</h3>
                <p className="text-gray-500 text-[12px] leading-relaxed px-2 pb-2 line-clamp-2 text-left">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Team;
