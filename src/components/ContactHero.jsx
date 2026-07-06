import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Check, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactHero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Digital Marketing',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-close modal after 7 seconds
  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "d316d7e7-6a74-486d-a7f6-f87fed68732d",
          subject: `New Lead from Vector.Ai: ${formData.name}`,
          from_name: "Vector.Ai Portfolio",
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Digital Marketing',
          message: ''
        });
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Contact Info
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#0B0F19] text-[13px] font-bold">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0B0F19] text-[13px] font-bold">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0B0F19] text-[13px] font-bold">Service Interest</label>
                  <div className="relative">
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
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
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full bg-[#F8F9FA] border-none text-[14px] text-[#0B0F19] px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#0054D2]/20 focus:outline-none transition-all placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0B0F19] text-white text-[15px] font-bold py-4 rounded-xl hover:bg-black transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop with Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-[#0B0F19]/45 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-[#0B0F19] text-white rounded-[2.5rem] p-10 shadow-2xl border border-white/10 overflow-hidden text-center z-10"
            >
              {/* Top Right Close Button */}
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Glowing Blue Circle Behind Checkmark */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#0054D2]/30 rounded-full blur-[60px] pointer-events-none -z-10"></div>

              {/* Animated Icon */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-[#0054D2] to-[#00A3FF] rounded-full flex items-center justify-center shadow-lg shadow-[#0054D2]/30 mb-8 relative">
                <Check className="w-10 h-10 text-white" strokeWidth={3.5} />
                <span className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping opacity-75"></span>
              </div>

              {/* Title */}
              <h3 className="text-[22px] font-bold mb-3 tracking-tight font-display">
                Details Transmitted!
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 text-[14px] leading-relaxed mb-8 px-2">
                Thank you for reaching out. Your project brief has been sent to our corporate inbox. Satyam Samrat Singh and the Vector.Ai strategy team will reach out to you within 24 hours.
              </p>

              {/* Action Button */}
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3.5 bg-white text-[#0B0F19] hover:bg-gray-100 rounded-full text-[14px] font-bold shadow-md transition-colors"
              >
                Acknowledge
              </button>

              {/* Countdown Progress Bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#0054D2] to-[#00A3FF]"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactHero;
