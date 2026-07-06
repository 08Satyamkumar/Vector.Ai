import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { motion } from 'framer-motion';

const ServiceGrid = ({ searchQuery = '', selectedCategory = 'All' }) => {
  const filteredServices = servicesData.filter(service => {
    // Exclude the popular main banner service from the grid unless we are actively searching or filtering by category
    const isMainBanner = service.slug === 'digital-marketing-services';
    if (isMainBanner && searchQuery === '' && selectedCategory === 'All') {
      return false;
    }

    // Category filter logic
    const matchesCategory = selectedCategory === 'All' || service.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search query filter logic
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  if (filteredServices.length === 0) {
    return (
      <section className="w-full max-w-[88rem] mx-auto px-6 lg:px-16 pb-24 text-center py-20">
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 max-w-lg mx-auto">
          <h3 className="text-xl font-bold text-[#0B0F19] mb-2">No Services Found</h3>
          <p className="text-gray-500 text-[14px]">We couldn't find any services matching "{searchQuery}" under "{selectedCategory}". Try searching for another keyword.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[88rem] mx-auto px-6 lg:px-16 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
            className="h-full"
          >
            <Link to={`/services/${service.slug}`} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full">
            {/* Image container */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B0F19] text-[11px] font-bold px-3 py-1.5 rounded-full">
                {service.category}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-[20px] font-bold text-[#0B0F19] group-hover:text-[#0054D2] transition-colors mb-3">
              {service.title}
            </h3>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-2">
              {service.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#0054D2]" fill="currentColor" stroke="none" />
                  <span className="text-[13px] font-medium text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Link */}
            <div className="inline-flex items-center gap-2 text-[#0B0F19] font-bold text-[14px] mt-auto transition-colors group/link">
              Learn More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceGrid;
