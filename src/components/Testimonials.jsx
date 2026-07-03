import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: '"The cloud migration strategy was flawless. Zero downtime and improved performance across the board."',
    name: 'Arjun Singh',
    role: 'CTO, TechFlow',
    result: 'RESULT: ZERO DOWNTIME',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 2,
    quote: '"Our ROI on Instagram ads went up by 150% in just two months. The creative team is top-notch."',
    name: 'Meera Reddy',
    role: 'Marketing Director, StyleHub',
    result: 'RESULT: 150% ROI',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 3,
    quote: '"The lead management CRM they built has streamlined our entire sales process. Highly recommended."',
    name: 'Vikram Malhotra',
    role: 'CEO, AutoDrive',
    result: 'RESULT: 2X SALES EFFICIENCY',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 4,
    quote: '"Their SEO strategies helped us rank #1 for our most competitive keywords. Organic traffic is through the roof."',
    name: 'Anita Roy',
    role: 'Founder, Roy Interiors',
    result: 'RESULT: 300% MORE TRAFFIC',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 5,
    quote: '"The web development team built a robust, scalable platform that handles our massive traffic spikes effortlessly."',
    name: 'James Wilson',
    role: 'CTO, LogiTech',
    result: 'RESULT: 99.9% UPTIME',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 6,
    quote: '"The lead generation campaign delivered 500+ qualified leads in the first month. Incredible ROI."',
    name: 'Priya Sharma',
    role: 'Director, EdTech',
    result: 'RESULT: 500+ LEADS',
    image: 'https://images.unsplash.com/photo-1508214751196-bfd141474dda?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 7,
    quote: '"They revamped our UI/UX entirely, resulting in a 40% drop in bounce rate. The design is stunning and intuitive."',
    name: 'David Chen',
    role: 'Product Manager, FinServe',
    result: 'RESULT: -40% BOUNCE RATE',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 8,
    quote: '"From concept to deployment, their team was exceptional. Our mobile app now has a 4.9-star rating on the App Store."',
    name: 'Sarah Jenkins',
    role: 'CEO, HealthPlus',
    result: 'RESULT: 4.9 APP RATING',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 9,
    quote: '"We outsourced our entire digital marketing to them. The team acts as an extension of our own, delivering consistent growth."',
    name: 'Rajat Verma',
    role: 'CMO, NextGen Retail',
    result: 'RESULT: CONSISTENT GROWTH',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, currentIndex]); // Reset interval when currentIndex changes manually

  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = 0; i < itemsToShow; i++) {
      visibleCards.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visibleCards;
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-24 lg:py-32 overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-[#0054D2] text-xs font-bold tracking-widest uppercase mb-3 block">
              TESTIMONIALS
            </span>
            <h2 className="text-[2.75rem] leading-[1.1] font-display font-bold text-[#0B0F19] tracking-tight mb-3">
              What our clients say
            </h2>
            <p className="text-gray-500 text-[15px]">
              Real results from real businesses.
            </p>
          </motion.div>
          
          {/* Navigation Buttons */}
          <motion.div 
            className="flex gap-3 shrink-0"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:border-[#0054D2] hover:text-[#0054D2] transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:border-[#0054D2] hover:text-[#0054D2] transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Cards Carousel */}
        <motion.div 
          className="relative w-full pb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <div className={`grid gap-6 ${itemsToShow === 1 ? 'grid-cols-1' : itemsToShow === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            <AnimatePresence mode="popLayout">
              {getVisibleCards().map((testimonial, idx) => (
                <motion.div 
                  key={`${testimonial.id}-${currentIndex}`} // key based on id and index ensures unmount/mount for animation
                  layout
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_12px_40px_-12px_rgba(0,84,210,0.15)] hover:border-[#0054D2]/20 transition-all duration-300 cursor-default"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FDB022] text-[#FDB022]" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-[#0B0F19] text-[15px] font-medium leading-relaxed mb-8 flex-grow">
                    {testimonial.quote}
                  </p>
                  
                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h4 className="text-[15px] font-bold text-[#0B0F19]">{testimonial.name}</h4>
                      <p className="text-gray-500 text-[13px]">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gray-100 mb-6"></div>

                  {/* Result */}
                  <p className="text-[#0054D2] text-[10px] font-bold tracking-wider uppercase">
                    {testimonial.result}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
