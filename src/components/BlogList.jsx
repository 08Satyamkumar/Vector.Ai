import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import config from '../data/companyConfig.json';

const BlogList = () => {
  const posts = config.blogs || [];
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <section className="w-full bg-[#F8F9FA] px-6 lg:px-16 pb-24">
      <div className="max-w-[88rem] mx-auto">
        
        {/* Featured Post */}
        {featuredPost && (
          <Link 
            to={`/blog/${featuredPost.slug}`}
            className="relative w-full min-h-[400px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-8 md:p-12 group mb-12 cursor-pointer block"
          >
            {/* Background Image & Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url("${featuredPost.image}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-3xl flex flex-col items-start">
              
              {/* Meta tags */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#0054D2] text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full uppercase">
                  {featuredPost.category}
                </span>
                <div className="flex items-center text-gray-300 text-[12px] font-medium gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.date}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-white leading-tight mb-4 tracking-tight group-hover:text-gray-200 transition-colors">
                {featuredPost.title}
              </h2>

              {/* Subtitle */}
              <p className="text-gray-300 text-[15px] md:text-[16px] mb-8 max-w-2xl leading-relaxed">
                {featuredPost.description}
              </p>

              {/* Link */}
              <span className="flex items-center gap-2 text-white font-bold text-[14px] border-b border-white pb-1 group-hover:text-gray-300 group-hover:border-gray-300 transition-colors">
                Read Full Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`} 
              className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full no-underline"
            >
              {/* Image container */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B0F19] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center text-gray-400 text-[12px] font-medium gap-1 mb-3">
                <Clock className="w-3.5 h-3.5" />
                {post.date}
              </div>

              {/* Content */}
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#0B0F19] mb-3 leading-tight group-hover:text-[#0054D2] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-2">
                {post.description}
              </p>

              {/* Link */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 text-[#0B0F19] font-bold text-[13px] hover:text-[#0054D2] transition-colors group/link">
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogList;
