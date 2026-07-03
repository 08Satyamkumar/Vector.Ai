import React from 'react';

const NewsletterCTA = () => {
  return (
    <section className="w-full bg-[#F8F9FA] px-6 lg:px-16 pb-24">
      <div className="w-full max-w-[88rem] mx-auto bg-[#0a1128] rounded-[2.5rem] py-20 px-6 text-center flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Subtle Gradient/Glow (optional, like in the screenshot it's just very dark blue) */}
        
        {/* Heading */}
        <h2 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-white mb-6 tracking-tight relative z-10 leading-tight">
          Stay updated with the <br className="hidden md:block" />
          latest <span className="text-[#0054D2]">digital trends</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-[14px] md:text-[15px] max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
          Join 5,000+ marketers and business owners receiving our weekly insights.
        </p>

        {/* Input & Button Form */}
        <form className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            required
            className="w-full sm:flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-400 text-[14px] px-6 py-3.5 rounded-full focus:outline-none focus:border-[#0054D2] transition-colors"
          />
          <button 
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0054D2] hover:bg-[#0042a3] text-white text-[14px] font-bold rounded-full transition-colors flex-shrink-0"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default NewsletterCTA;
