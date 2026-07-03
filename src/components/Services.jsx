import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { motion } from 'framer-motion';

const Services = () => {
  const services = servicesData.slice(0, 6);
  return (
    <section id="service" className="w-full">
      <div className="container-wide section-padding">
      {/* Header Section */}
      <motion.div 
        className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-2xl">
          <span className="text-brand-lime text-xs font-bold tracking-widest uppercase mb-4 block">
            OUR EXPERTISE
          </span>
          <h2 className="text-[2.75rem] leading-[1.1] font-display font-bold text-brand-dark mb-4 tracking-tight">
            Digital Solutions for <br />
            <span className="text-brand-lime">Modern Businesses</span>
          </h2>
          <p className="text-gray-500 text-lg">
            We provide integrated growth ecosystems. From SEO to AI Automation, we have the expertise to scale your revenue.
          </p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-full text-[15px] font-medium text-brand-dark hover:bg-brand-dark hover:text-white transition-colors shrink-0"
        >
          Explore All Services <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
            className="h-full"
          >
            <Link to={`/services/${service.slug}`} className="group flex flex-col bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
            {/* Image Card */}
            <div className="relative w-full aspect-[4/2.5] rounded-[2rem] overflow-hidden mb-6 bg-gray-100">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-brand-dark shadow-sm">
                  {service.category || service.badge}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-[1.35rem] font-display font-bold text-brand-dark group-hover:text-[#0054D2] transition-colors mb-3 px-1">
              {service.title}
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-grow px-1">
              {service.description}
            </p>

            {/* Features */}
            <ul className="space-y-2.5 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 px-1">
                  <Zap className="w-4 h-4 text-[#0054D2] shrink-0 mt-0.5 fill-[#0054D2]" />
                  <span className="text-[14px] text-gray-600 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Link */}
            <div className="inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-dark mt-auto pt-2 px-1">
              Learn More <ArrowRight className="w-4 h-4" />
            </div>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Services;
