import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const ambientVideoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p1 = videoRef.current ? videoRef.current.play() : Promise.resolve();
          const p2 = ambientVideoRef.current ? ambientVideoRef.current.play() : Promise.resolve();
          Promise.all([p1, p2]).catch(() => {});
        } else {
          if (videoRef.current) videoRef.current.pause();
          if (ambientVideoRef.current) ambientVideoRef.current.pause();
        }
      },
      { threshold: 0.2 } // Pause when less than 20% of video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full">
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="flex flex-col items-start"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0054D2]/10 to-[#FF1744]/10 border border-[#0054D2]/20 mb-6 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,84,210,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1744] animate-pulse"></span>
              <span className="text-[10px] font-bold text-[#0054D2] tracking-[0.2em] uppercase">
                ENGINEERING THE FUTURE
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-display font-bold leading-[1.05] text-brand-dark mb-6 tracking-tight">
              Building Technology <br className="hidden lg:block" />
              That <span className="bg-gradient-to-r from-[#0054D2] to-[#FF1744] bg-clip-text text-transparent">Moves the World Forward.</span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-[16px] lg:text-[17px] leading-[1.75] max-w-[90%] mb-10">
              We build intelligent digital products, AI systems, software and automation solutions that help businesses operate smarter, scale faster and create what’s next.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/contact"
                className="relative group overflow-hidden px-8 py-3.5 bg-[#0B0F19] text-white rounded-full font-semibold text-[15px] shadow-[0_4px_15px_rgba(11,15,25,0.15)] hover:shadow-[0_8px_25px_rgba(0,84,210,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                {/* Diagonal shiny light reflection that sweeps on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">Build With Us</span>
              </Link>
              <Link
                to="/services"
                className="relative group overflow-hidden px-8 py-3.5 bg-white text-[#0B0F19] rounded-full font-semibold text-[15px] border border-gray-200 shadow-sm hover:shadow-[0_8px_25px_rgba(0,84,210,0.06)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                {/* Diagonal shiny light reflection that sweeps on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">Explore Our Technology</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Video with 3D Effect & Ambilight Glow */}
          <motion.div 
            className="relative w-full aspect-[4/3] lg:aspect-[4/3.2]"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            style={{ perspective: 1000 }}
          >
            {/* Real-time Dynamic Ambient Glow (Ambilight) */}
            <div className="absolute inset-2 rounded-[2.5rem] blur-[50px] opacity-40 pointer-events-none overflow-hidden select-none">
              <video 
                ref={ambientVideoRef}
                src="/hero_video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover scale-[1.15]"
              />
            </div>

            <motion.div 
              whileHover={{ 
                y: -10, 
                rotateX: 2, 
                rotateY: -2,
                shadow: "0px 30px 60px rgba(0, 84, 210, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative border border-gray-200/50 bg-gray-950 group"
            >
              <video 
                ref={videoRef}
                src="/hero_video.mp4" 
                autoPlay 
                loop 
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Subtle tech gradient overlay to make it look premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Futuristic HUD Viewfinder Brackets Overlay */}
              <div className="absolute inset-4 border border-white/5 pointer-events-none rounded-[1.75rem] transition-all duration-700 group-hover:inset-3 group-hover:border-white/10">
                {/* Top-Left Bracket */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl-sm" />
                {/* Top-Right Bracket */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40 rounded-tr-sm" />
                {/* Bottom-Left Bracket */}
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40 rounded-bl-sm" />
                {/* Bottom-Right Bracket */}
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br-sm" />
                
                {/* Tiny tech labels on the corners */}
                <span className="absolute top-1 left-4 text-[7px] font-mono text-white/30 tracking-[0.1em]">SYS.REC // ON</span>
                <span className="absolute bottom-1 right-4 text-[7px] font-mono text-white/30 tracking-[0.1em]">FOC.AUTO [100%]</span>
              </div>

              {/* Controls Overlay */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                {/* Audio Toggle Button */}
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/10 hover:border-white/20 transition-all active:scale-90"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    // Speaker Off Icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
                    </svg>
                  ) : (
                    // Speaker On Icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                  )}
                </button>
                {/* Glowing active light indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-white tracking-[0.1em] uppercase">
                    LIVE STREAM
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
