import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { motion } from 'framer-motion';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const service = servicesData.find(s => s.slug === slug);

  useEffect(() => {
    // If no service found, redirect to services page
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  if (!service) return null;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-[#F8F9FA] pt-12 pb-24 px-6 lg:px-16">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start">
            <Link to="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors mb-6 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            
            <h1 className="text-[3rem] md:text-[4rem] font-display font-bold text-brand-dark leading-[1.1] tracking-tight mb-6">
              {service.title}
            </h1>
            
            <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed mb-10 max-w-xl">
              {service.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-3.5 bg-brand-dark text-white rounded-full font-bold text-[14px] hover:bg-black transition-colors">
                Get a Quote
              </Link>
              <a href="#features" className="px-8 py-3.5 bg-white text-brand-dark rounded-full font-bold text-[14px] border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                View Features
              </a>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="relative w-full aspect-[4/3]">
            {/* Image with shadow and rounded corners */}
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
            />
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-[-1rem] lg:left-[-2rem] bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-1 z-10 translate-x-8 animate-float">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client Satisfaction</span>
              <span className="text-3xl font-display font-bold text-[#0054D2]">100%</span>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-3 h-3 text-[#FF4500]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-[10px] font-medium text-gray-500 ml-1">Top Rated Service</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="w-full py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-[88rem] mx-auto">
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <span className="text-[11px] font-bold text-[#0054D2] uppercase tracking-[0.2em] mb-4 block">
              What's Included
            </span>
            <h2 className="text-[2.5rem] font-display font-bold text-brand-dark mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-gray-500 text-[15px] max-w-2xl mx-auto">
              Our {service.title} package is designed to provide comprehensive coverage for your business needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {service.detailedFeatures.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
                className="group bg-[#F8F9FA] rounded-[1.5rem] p-8 hover:shadow-xl hover:bg-[#0B0F19] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F0FE] group-hover:bg-[#0054D2] flex items-center justify-center mb-6 transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#0054D2] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-[18px] font-bold text-brand-dark group-hover:text-white transition-colors duration-300 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-400 text-[14px] leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust CTA Section */}
      <section className="w-full px-6 lg:px-16 pb-24 bg-white">
        <div className="max-w-[88rem] mx-auto bg-[#0B0F19] rounded-[2.5rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left side */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-12 lg:p-16 flex flex-col justify-center"
            >
              <h2 className="text-[2rem] md:text-[2.5rem] font-display font-bold text-white leading-tight mb-12">
                Why trust us with your {service.title}?
              </h2>
              
              <div className="space-y-8">
                {service.trustPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      {idx === 0 ? <ShieldCheck className="w-6 h-6 text-[#0054D2]" /> : <TrendingUp className="w-6 h-6 text-[#0054D2]" />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-[16px] mb-2">{point.title}</h4>
                      <p className="text-gray-400 text-[14px] leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right side box */}
            <div className="p-12 lg:p-16 flex items-center justify-center bg-[#0d1326] relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0054D2]/20 rounded-full blur-[100px]"></div>
              
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="w-full max-w-sm bg-[#121930] border border-white/5 rounded-3xl p-8 relative z-10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0054D2]/20 flex items-center justify-center mb-8">
                  <Sparkles className="w-6 h-6 text-[#0054D2]" />
                </div>
                <h3 className="text-[24px] font-bold text-white mb-3">
                  Ready to get started?
                </h3>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-8">
                  Book a free consultation call with our team to discuss your {service.title} requirements in detail.
                </p>
                <Link to="/contact" className="flex items-center justify-center w-full py-4 bg-[#0054D2] text-white rounded-xl font-bold text-[14px] hover:bg-[#0042a3] transition-colors gap-2">
                  Book a free call <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
