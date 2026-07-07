import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#3d3937] pt-20 pb-8 rounded-t-[3rem] relative overflow-hidden mt-2">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="container-wide relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Left Column (Logo & CTA) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Logo */}
            <div className="flex flex-col mb-8 w-fit bg-white/95 px-5 py-2.5 rounded-2xl shadow-sm border border-white/10">
              <a href="/" className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Vector.Ai Logo" 
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>

            {/* Heading */}
            <h2 className="text-[2.5rem] lg:text-[3rem] leading-[1.1] font-display font-bold text-white mb-6">
              Ready to scale your <br />
              <span className="text-[#0054D2]">revenue?</span>
            </h2>

            {/* Paragraph */}
            <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-sm">
              Join hundreds of businesses that trust Vector.Ai for their digital growth.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 mb-10">
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-white text-[#0B0F19] rounded-full text-[14px] font-bold hover:bg-gray-100 transition-colors"
              >
                Book a Call
              </Link>
              <Link
                to="/services"
                className="px-6 py-2.5 bg-transparent text-white border border-white/20 rounded-full text-[14px] font-medium hover:bg-white/5 transition-colors"
              >
                Our Services
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077b5] transition-colors text-white">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] transition-colors text-white">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1DA1F2] transition-colors text-white">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors text-white">
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Columns (Links) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:pl-16">
            
            {/* Column 1: Company */}
            <div>
              <h4 className="text-white font-bold mb-6 text-[15px]">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Contact</a></li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-white font-bold mb-6 text-[15px]">Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">SEO Optimization</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">PPC Ads</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Web Dev</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">AI Automation</a></li>
              </ul>
            </div>

            {/* Column 3: Connect */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold mb-6 text-[15px]">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-1 group">
                    Linkedin <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-1 group">
                    Instagram <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                  </a>
                </li>
                <li><a href="mailto:vector.ai09@gmail.com" className="text-gray-400 hover:text-white transition-colors text-[14px]">vector.ai09@gmail.com</a></li>
                <li><a href="tel:+919217571488" className="text-gray-400 hover:text-white transition-colors text-[14px]">+91 9217571488</a></li>
                <li><a href="tel:+919122135215" className="text-gray-400 hover:text-white transition-colors text-[14px]">+91 9122135215</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[13px]">
            © 2026 Vector.Ai. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-[13px]">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white transition-colors text-[13px]">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-white transition-colors text-[13px]">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
