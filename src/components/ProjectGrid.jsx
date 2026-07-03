import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectGrid = () => {
  const projects = [
    {
      category: 'WEB APPLICATION',
      title: 'Hoarding Booking App',
      description: 'A comprehensive platform for browsing and booking outdoor advertising spaces with map integration.',
      badge: 'Real-time Inventory',
      image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'HEALTHCARE APP',
      title: 'Prescripto',
      description: 'A doctor appointment booking platform with specialty filtering and profile management.',
      badge: '5k+ Bookings',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'FOOD DELIVERY',
      title: 'QuickBite',
      description: 'A full-stack food delivery application with cart management and order tracking.',
      badge: '30min Delivery',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'HEALTHCARE WEBSITE',
      title: 'Dayal Hospitals',
      description: 'A modern healthcare portal allowing patients to easily find doctors, book appointments, and access services.',
      badge: 'Patient Trust',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'WEB DESIGN & DEVELOPMENT',
      title: 'Inflate Agency',
      description: 'A visually immersive digital agency website featuring fluid animations and high-performance React.',
      badge: 'Site of the Day',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'E-COMMERCE',
      title: 'Forever',
      description: 'A modern fashion e-commerce store with category filtering and cart functionality.',
      badge: '150% Sales Boost',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'WEB DEVELOPMENT',
      title: 'TechNova',
      description: 'A complete overhaul of their corporate website focusing on speed and lead generation.',
      badge: '40% Conversion Lift',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'BRANDING',
      title: 'GreenEarth',
      description: 'Comprehensive brand identity design including logo, guidelines, and packaging.',
      badge: 'Brand of the Year',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'DIGITAL MARKETING',
      title: 'UrbanStyle',
      description: 'Instagram and Facebook ad campaigns targeting fashion-forward millennials.',
      badge: '10x ROAS',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'SEO',
      title: 'HealthFirst',
      description: 'Local SEO strategy that dominated search results for healthcare keywords in their region.',
      badge: '#1 Rank on Google',
      image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e9e9c?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'APP DEVELOPMENT',
      title: 'EduLearn',
      description: 'Cross-platform mobile app for online learning with live video capabilities.',
      badge: '100K+ Downloads',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'AUTOMATION',
      title: 'FoodieExpress',
      description: 'Automated order processing and delivery tracking system using AI.',
      badge: '60% Ops Cost Reduction',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] py-16 lg:py-24 px-6 lg:px-16">
      <div className="max-w-[88rem] mx-auto">
        
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <h1 className="text-[3rem] md:text-[4rem] font-display font-bold text-[#0B0F19] leading-tight mb-4 tracking-tight">
            Our Projects
          </h1>
          <p className="text-gray-500 text-[16px] md:text-[18px]">
            A showcase of our most recent collaborations and the results we achieved.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <a key={index} href="#case-study" className="group block cursor-pointer">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-200">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Icon */}
                <div className="absolute top-4 right-4 bg-white text-[#0B0F19] w-10 h-10 rounded-full flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Content */}
              <div className="text-[#0054D2] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">
                {project.category}
              </div>
              
              <h3 className="text-[20px] font-bold text-[#0B0F19] mb-3 flex items-center gap-2 group-hover:text-[#0054D2] transition-colors">
                {project.title}
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#0054D2] transition-colors" />
              </h3>
              
              <p className="text-gray-500 text-[14px] leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Green Badge */}
              <div className="inline-flex items-center bg-[#E5F5E9] text-[#00A136] text-[11px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                {project.badge}
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectGrid;
