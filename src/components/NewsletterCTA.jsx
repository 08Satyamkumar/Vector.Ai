import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // Submitting to the Web3Forms endpoint using the same access key as the contact form
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "d316d7e7-6a74-486d-a7f6-f87fed68732d",
          subject: "New Newsletter Subscription - Scaller.in",
          from_name: "Scaller.in Newsletter",
          email: email,
          message: `Congratulations! A new user has subscribed to the Scaller.in newsletter. Email: ${email}`
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="w-full bg-[#F8F9FA] px-6 lg:px-16 pb-24">
        <div className="w-full max-w-[88rem] mx-auto bg-[#0a1128] rounded-[2.5rem] py-20 px-6 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-xl border border-white/5">
          {/* Success Indicator */}
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
            <CheckCircle className="w-8 h-8" />
          </div>
          
          <h2 className="text-[2rem] md:text-[2.5rem] font-display font-bold text-white mb-4 tracking-tight leading-tight">
            You're on the list!
          </h2>

          <p className="text-gray-400 text-[14px] md:text-[15px] max-w-md mx-auto mb-2 leading-relaxed">
            Thank you for subscribing. We will send the latest digital trends, strategy articles, and business updates directly to your inbox.
          </p>
          <span className="text-xs text-gray-500 italic">
            Check your spam folder if you do not receive a confirmation email.
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F8F9FA] px-6 lg:px-16 pb-24">
      <div className="w-full max-w-[88rem] mx-auto bg-[#0a1128] rounded-[2.5rem] py-20 px-6 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-xl border border-white/5">
        
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
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg mx-auto">
          <div className="relative w-full sm:flex-1">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Mail className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              required
              disabled={status === 'loading'}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 text-[14px] pl-12 pr-6 py-3.5 rounded-full focus:outline-none focus:border-[#0054D2] transition-colors disabled:opacity-50"
            />
          </div>
          
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0054D2] hover:bg-[#0042a3] text-white text-[14px] font-bold rounded-full transition-colors flex-shrink-0 flex items-center justify-center gap-2 disabled:bg-[#0054D2]/70 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        {status === 'error' && (
          <p className="text-red-400 text-xs mt-4 font-bold">
            Oops! Something went wrong. Please check your network connection and try again.
          </p>
        )}

      </div>
    </section>
  );
};

export default NewsletterCTA;
