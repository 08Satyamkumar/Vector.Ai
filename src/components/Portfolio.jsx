import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Hoarding Booking App',
    category: 'Web Application',
    badge: 'Real-time Inventory',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Prescripto',
    category: 'Healthcare App',
    badge: '5k+ Bookings',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'QuickBite',
    category: 'Food Delivery',
    badge: '30min Delivery',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  },
];

const Portfolio = () => {
  return (
    <section className="w-full">
      <div className="container-wide section-padding">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4"
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <span className="text-[#0054D2] text-xs font-bold tracking-widest uppercase mb-3 block">
            PORTFOLIO
          </span>
          <h2 className="text-[2.75rem] leading-[1.1] font-display font-bold text-[#0B0F19] tracking-tight">
            Selected Work
          </h2>
        </div>
        <Link
          to="/project"
          className="text-sm font-bold text-[#0B0F19] border-b-2 border-[#0B0F19] pb-0.5 hover:text-[#0054D2] hover:border-[#0054D2] transition-colors"
        >
          View All Projects
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            className="group cursor-pointer flex flex-col h-full"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
          >
            {/* Image Card */}
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-5">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] font-bold text-gray-800 shadow-sm">
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-display font-bold text-[#0B0F19] mb-1 flex items-center gap-2 group-hover:text-[#0054D2] transition-colors">
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#0054D2] transition-colors" />
                </h3>
                <p className="text-gray-500 text-sm">{project.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Portfolio;
