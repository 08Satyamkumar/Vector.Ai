import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactHero = () => {
  return (
    <section className="w-full bg-[#F8F9FA] pt-16 pb-12 px-6 lg:px-16">
      <div className="max-w-[88rem] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-[3rem] md:text-[4.5rem] font-display font-bold text-[#0B0F19] leading-tight mb-6 tracking-tight">
            Let's start a <br /> conversation
          </h1>
          <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed">
            Ready to scale your business? Whether you have a question about pricing, services, or just want to say hello, we're ready to answer.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Contact Info & Hours */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Dark Contact Card */}
            <div className="bg-[#0B0F19] rounded-[2rem] p-10 relative overflow-hidden">
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
              
              <h3 className="text-white text-[24px] font-bold mb-10 relative z-10 flex items-center gap-2">
                Contact <span className="text-[#0054D2]">Info</span>
              </h3>

              <div className="flex flex-col gap-8 relative z-10">
                 {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#0054D2]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[11px] font-bold tracking-wider uppercase mb-1">Email Us</div>
                    <a href="mailto:vector.ai09@gmail.com" className="block text-white text-[15px] font-medium hover:text-[#0054D2] transition-colors">
                      vector.ai09@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#0054D2]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[11px] font-bold tracking-wider uppercase mb-1">Call Us</div>
                    <a href="tel:+919217571488" className="block text-white text-[16px] font-bold hover:text-[#0054D2] transition-colors">
                      +91 9217571488
                    </a>
                    <a href="tel:+919122135215" className="block text-white text-[16px] font-bold hover:text-[#0054D2] transition-colors mt-1">
                      +91 9122135215
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#0054D2]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[11px] font-bold tracking-wider uppercase mb-1">Visit Us</div>
                    <p className="text-white text-[15px] leading-relaxed pr-4 font-medium">
                      Gaur Yamuna City, Greater Noida, Uttar Pradesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center text-gray-500">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-[#0B0F19] text-[16px] font-bold">Business Hours</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-gray-500">Monday - Friday</span>
                  <span className="text-[#0B0F19] font-bold">10 AM - 7 PM</span>
                </div>
                <div className="w-full border-t border-dashed border-gray-200"></div>
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-gray-500">Saturday</span>
                  <span className="text-[#0B0F19] font-bold">11 AM - 4 PM</span>
                </div>
                <div className="w-full border-t border-dashed border-gray-200"></div>
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-gray-500">Sunday</span>
                  <span className="bg-[#FFF0F0] text-[#E84545] text-[11px] font-bold px-3 py-1 rounded">Closed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <form className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#0B0F19] text-[13px] font-bold">Name</label>
                  <input 
                    type="text" 
                    placeholder="Priya Sharma"
                    className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0B0F19] text-[13px] font-bold">Email</label>
                  <input 
                    type="email" 
                    placeholder="priya@example.com"
                    className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#0B0F19] text-[13px] font-bold">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0B0F19] text-[13px] font-bold">Service Interest</label>
                  <div className="relative">
                    <select className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all appearance-none cursor-pointer">
                      <option>Digital Marketing</option>
                      <option>Web Development</option>
                      <option>App Development</option>
                      <option>SEO Services</option>
                      <option>Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#0B0F19] text-[13px] font-bold">Message</label>
                <textarea 
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#0B0F19] text-white text-[15px] font-bold py-4 rounded-xl hover:bg-black transition-colors mt-2"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;
