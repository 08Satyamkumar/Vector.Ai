import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const BlogList = () => {
  const posts = [
    {
      id: 1,
      category: 'SEO',
      date: 'Sep 28, 2024',
      title: 'Top 5 SEO Strategies for 2025',
      description: 'Stay ahead of algorithm updates with these proven search engine optimization techniques.',
      image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      category: 'Web Development',
      date: 'Sep 15, 2024',
      title: 'Why Your Website Needs to be Fast',
      description: 'Page speed is a critical ranking factor. Learn how to optimize your site for lightning-fast performance.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      category: 'Marketing',
      date: 'Aug 30, 2024',
      title: "Mastering Google Ads: A Beginner's Guide",
      description: 'A comprehensive guide to setting up and managing profitable Google Ad campaigns.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      category: 'Content Strategy',
      date: 'Aug 10, 2024',
      title: 'The Power of Video Marketing',
      description: 'Video content is king. Discover how to create engaging videos that drive conversions.',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      category: 'Branding',
      date: 'Jul 22, 2024',
      title: 'Building a Brand Identity that Lasts',
      description: 'Your brand is more than just a logo. Learn the secrets of building a strong, memorable brand.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] px-6 lg:px-16 pb-24">
      <div className="max-w-[88rem] mx-auto">
        
        {/* Featured Post */}
        <div className="relative w-full min-h-[400px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-8 md:p-12 group mb-12 cursor-pointer">
          
          {/* Background Image & Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2400")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-start">
            
            {/* Meta tags */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#0054D2] text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full uppercase">
                AI Trends
              </span>
              <div className="flex items-center text-gray-300 text-[12px] font-medium gap-1">
                <Clock className="w-3.5 h-3.5" />
                Oct 12, 2024
              </div>
            </div>

            {/* Title */}
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-white leading-tight mb-4 tracking-tight group-hover:text-gray-200 transition-colors">
              The Future of AI in Digital Marketing
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 text-[15px] md:text-[16px] mb-8 max-w-2xl leading-relaxed">
              How artificial intelligence is reshaping the way brands interact with customers and optimize campaigns.
            </p>

            {/* Link */}
            <span className="flex items-center gap-2 text-white font-bold text-[14px] border-b border-white pb-1 group-hover:text-gray-300 group-hover:border-gray-300 transition-colors">
              Read Full Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a key={post.id} href={`#post-${post.id}`} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full">
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
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogList;
