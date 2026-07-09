import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import config from '../data/companyConfig.json';

const ProjectGrid = () => {
  const projects = config.projects;

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
            <a 
              key={index} 
              href={project.link || "#case-study"} 
              target={project.link ? "_blank" : "_self"} 
              rel="noopener noreferrer" 
              className="group block cursor-pointer"
            >
              
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
