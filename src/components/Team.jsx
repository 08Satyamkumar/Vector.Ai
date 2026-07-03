import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24; // width of card (320px) + gap (24px)
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

      {/* Scrollable Carousel Wrapper */}
      <div className="relative w-full group/carousel">
        
        {/* Navigation Buttons (visible on hover / focus) */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-gray-700 border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#0054D2] hover:text-white transition-all z-10 md:opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 transition-opacity duration-300"
          aria-label="Scroll Left"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-gray-700 border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#0054D2] hover:text-white transition-all z-10 md:opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 transition-opacity duration-300"
          aria-label="Scroll Right"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Scrollable Flex Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group flex-none w-[280px] sm:w-[320px] snap-start flex flex-col items-start bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden mb-6 bg-gray-200">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
