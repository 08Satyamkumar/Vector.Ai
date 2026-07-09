import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';
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

  const isAncient = blog.isAncientTheme;

  return (
    <article 
      className={`w-full min-h-screen pb-24 transition-colors duration-500
        ${isAncient 
          ? 'bg-[#FAF6EE] text-[#4A3B32] font-serif selection:bg-[#D4A373]/30' 
          : 'bg-white text-gray-800'
        }
      `}
    >
      {/* Blog Hero Header */}
      <div 
        className={`py-16 lg:py-24 px-6 lg:px-16 border-b transition-colors duration-500
          ${isAncient 
            ? 'bg-[#F4EBD9] border-[#E2D2B4]' 
            : 'bg-[#FAF8F5] border-[#E5DFD5]'
          }
        `}
      >
        <div className="max-w-[56rem] mx-auto">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors mb-8
              ${isAncient 
                ? 'text-[#6B5A4E] hover:text-[#8D5B4C]' 
                : 'text-gray-600 hover:text-[#0054D2]'
              }
            `}
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          {/* Category */}
          <span 
            className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block shadow-sm
              ${isAncient 
                ? 'bg-[#E36947]/10 text-[#E36947] border border-[#E36947]/20 font-sans' 
                : 'bg-[#E8F0FE] text-[#0054D2]'
              }
            `}
          >
            {blog.category}
          </span>

          {/* Ancient Theme Indicator Banner */}
          {isAncient && (
            <div className="flex items-center gap-2 mb-4 text-[#8D5B4C] text-[11px] font-bold tracking-widest uppercase font-sans">
              <BookOpen className="w-4 h-4" /> Ancient Scripture Wisdom Synthesis
            </div>
          )}

          {/* Title */}
          <h1 
            className={`text-[2.5rem] md:text-[3.5rem] font-bold leading-tight tracking-tight mb-8
              ${isAncient 
                ? 'font-serif text-[#3E2F26] border-l-4 border-[#E36947] pl-6' 
                : 'font-display text-[#0B0F19]'
              }
            `}
          >
            {blog.title}
          </h1>

          {/* Author & Meta */}
          <div 
            className={`flex flex-wrap items-center gap-6 pt-6 border-t transition-colors duration-500
              ${isAncient ? 'border-[#E2D2B4]' : 'border-[#E5DFD5]'}
            `}
          >
            <div className="flex items-center gap-3">
              <img 
                src={blog.author.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&q=80"} 
                alt={blog.author.name}
                className={`w-10 h-10 rounded-full object-cover border
                  ${isAncient ? 'border-[#E2D2B4]' : 'border-[#E5DFD5]'}
                `}
              />
              <div>
                <h4 className={`font-bold text-sm ${isAncient ? 'text-[#3E2F26]' : 'text-[#0B0F19]'}`}>
                  {blog.author.name}
                </h4>
                <p className="text-gray-500 text-xs font-sans">{blog.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-500 text-xs font-semibold font-sans">
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
        <div 
          className={`aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-200 border-4
            ${isAncient ? 'border-[#F4EBD9]' : 'border-white'}
          `}
        >
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-[48rem] mx-auto px-6 lg:px-16">
        {/* Ancient-looking decorative divider */}
        {isAncient && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] w-24 bg-[#E2D2B4]"></div>
            <div className="text-[#E36947] text-lg font-serif">✥ ॐ ✥</div>
            <div className="h-[1px] w-24 bg-[#E2D2B4]"></div>
          </div>
        )}

        <div 
          className={`space-y-8 text-[18px] leading-relaxed font-serif
            ${isAncient 
              ? 'text-[#4A3B32] first-letter:text-5xl first-letter:font-bold first-letter:text-[#E36947] first-letter:mr-3 first-letter:float-left first-letter:font-serif' 
              : 'text-gray-700 font-sans'
            }
          `}
        >
          {blog.content.map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <h2 
                  key={idx} 
                  className={`text-2xl md:text-3xl font-bold pt-8 pb-2 leading-tight
                    ${isAncient 
                      ? 'font-serif text-[#3E2F26] border-b border-[#E2D2B4]/60 text-left flex items-center gap-3' 
                      : 'font-display text-[#0B0F19]'
                    }
                  `}
                >
                  {isAncient && <span className="text-[#E36947]">◆</span>}
                  {block.text}
                </h2>
              );
            }
            return (
              <p 
                key={idx} 
                className={`leading-relaxed mb-6
                  ${isAncient ? 'font-serif text-justify text-[#4A3B32]' : 'text-gray-700'}
                `}
              >
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Ancient-looking decorative footer divider */}
        {isAncient && (
          <div className="flex items-center justify-center gap-4 mt-16">
            <div className="h-[1px] w-24 bg-[#E2D2B4]"></div>
            <div className="text-[#E36947] text-lg font-serif">✥ Shanti ✥</div>
            <div className="h-[1px] w-24 bg-[#E2D2B4]"></div>
          </div>
        )}
      </div>

      {/* Newsletter / CTA */}
      <div className="mt-24">
        <NewsletterCTA />
      </div>
    </article>
  );
};

export default BlogDetailPage;
