import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import config from '../data/companyConfig.json';
import NewsletterCTA from '../components/NewsletterCTA';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const blog = (config.blogs || []).find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-display font-bold text-[#0B0F19] mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-8">The blog post you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 bg-[#0B0F19] text-white rounded-full font-bold hover:bg-[#0054D2] transition-colors">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-white min-h-screen pb-24">
      {/* Blog Hero Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E5DFD5] py-16 lg:py-24 px-6 lg:px-16">
        <div className="max-w-[56rem] mx-auto">
          {/* Back Link */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#0054D2] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          {/* Category */}
          <span className="bg-[#E8F0FE] text-[#0054D2] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-[#0B0F19] leading-tight tracking-tight mb-8">
            {blog.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E5DFD5]">
            <div className="flex items-center gap-3">
              <img 
                src={blog.author.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&q=80"} 
                alt={blog.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E5DFD5]"
              />
              <div>
                <h4 className="font-bold text-[#0B0F19] text-sm">{blog.author.name}</h4>
                <p className="text-gray-500 text-xs">{blog.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-500 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                {blog.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                {blog.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-[64rem] mx-auto px-6 lg:px-16 -mt-8 md:-mt-12 mb-16">
        <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-200">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-[48rem] mx-auto px-6 lg:px-16 prose prose-lg prose-slate prose-headings:font-display">
        <div className="space-y-8 text-gray-800 text-[17px] leading-relaxed font-normal">
          {blog.content.map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <h2 key={idx} className="text-2xl md:text-3xl font-display font-black text-[#0B0F19] pt-6 leading-tight">
                  {block.text}
                </h2>
              );
            }
            return (
              <p key={idx} className="leading-relaxed mb-6 font-medium text-gray-700">
                {block.text}
              </p>
            );
          })}
        </div>
      </div>

      {/* Newsletter / CTA */}
      <div className="mt-24">
        <NewsletterCTA />
      </div>
    </article>
  );
};

export default BlogDetailPage;
