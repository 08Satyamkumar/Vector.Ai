import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = ['Home', 'Service', 'Pricing', 'Team', 'Project', 'Blog', 'Contact'];
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const getPath = (link) => {
    let path = `/#${link.toLowerCase()}`;
    if (link === 'Home') path = '/';
    if (link === 'Service') path = '/services';
    if (link === 'Pricing') path = '/pricing';
    if (link === 'Team') path = '/team';
    if (link === 'Project') path = '/project';
    if (link === 'Blog') path = '/blog';
    if (link === 'Contact') path = '/contact';
    return path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-brand-bg/95 backdrop-blur-sm px-6 lg:px-20 py-4 flex items-center justify-between z-[100] border-b border-gray-200">
      
      {/* Mobile Menu Button (Hamburger) */}
      <button 
        className="lg:hidden p-2 -ml-2 text-[#0B0F19]"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Logo */}
      <div className="flex flex-col items-center lg:items-start absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none">
        <a href="/" className="flex items-center gap-[0.5px] font-display">
          <span className="text-brand-dark font-black text-xl md:text-2xl tracking-tight leading-none">Vector</span>
          <span className="text-brand-red font-black text-xl md:text-2xl tracking-tight leading-none">.Ai</span>
        </a>
        <span className="text-brand-lime font-bold text-[7px] md:text-[8px] tracking-[0.2em] mt-1 pl-[1px]">
          IT SOLUTION
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => {
          const path = getPath(link);
          const isActive = location.pathname === path;

          return (
            <Link
              key={link}
              to={path}
              className={`text-[15px] transition-colors ${isActive ? 'font-extrabold text-black' : 'font-medium text-gray-600 hover:text-black'}`}
            >
              {link}
            </Link>
          );
        })}
      </div>

      {/* Desktop Actions & WhatsApp */}
      <div className="flex items-center gap-4">
        <Link
          to="/contact"
          className="hidden md:flex items-center justify-center px-6 py-2.5 border border-brand-dark rounded-full text-[15px] font-bold text-brand-dark hover:bg-brand-dark hover:text-white active:bg-black transition-all"
        >
          Get started
        </Link>
        <a
          href="https://wa.me/919217571488"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-transparent text-[#25D366] border-[2px] border-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white hover:border-transparent hover:ring-4 hover:ring-white hover:shadow-md hover:scale-105 transition-all duration-300 box-content"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[102] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <a href="/" className="flex items-center gap-[0.5px] font-display">
                    <span className="text-brand-dark font-black text-2xl tracking-tight leading-none">Vector</span>
                    <span className="text-brand-red font-black text-2xl tracking-tight leading-none">.Ai</span>
                  </a>
                  <span className="text-brand-lime font-bold text-[8px] tracking-[0.2em] mt-1 pl-[1px]">
                    IT SOLUTION
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
                {navLinks.map((link) => {
                  const path = getPath(link);
                  const isActive = location.pathname === path;

                  return (
                    <Link
                      key={link}
                      to={path}
                      className={`text-[20px] tracking-tight ${isActive ? 'font-extrabold text-black' : 'font-medium text-gray-600'}`}
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center px-6 py-4 bg-brand-dark rounded-xl text-[16px] font-bold text-white hover:bg-black transition-all shadow-lg shadow-brand-dark/20"
                >
                  Get Started Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
