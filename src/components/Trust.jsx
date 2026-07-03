import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Trust = () => {
  return (
    <section className="w-full">
      <div className="container-wide section-padding">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-center">

          {/* Left Side - Image */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/4.5] w-full">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Team working together"
                className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </div>
          </motion.div>
          {/* Right Side - Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-[#0054D2] text-xs font-bold tracking-widest uppercase mb-4 block">
              WHY TRUST US
            </span>
            <h2 className="text-[3rem] lg:text-[3.5rem] leading-[1.05] font-display font-bold text-[#0B0F19] mb-6 tracking-tight">
              We Combine Data <br />
              With Design.
            </h2>
            <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-12 max-w-lg">
              In a crowded digital landscape, we stand out by diving deep into your business model. We don't just "do marketing"; we build sustainable <strong className="text-gray-800 font-bold">revenue engines</strong>.
            </p>

            <div className="space-y-8">
              {/* Point 1 */}
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-[#0B0F19]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0B0F19] mb-1.5 font-display">Proven ROI Strategies</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    Our campaigns are engineered for profit, not just clicks.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-[#0B0F19]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0B0F19] mb-1.5 font-display">Transparent Reporting</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    You get clear, actionable weekly reports showing exactly where your money goes.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-[#0B0F19]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0B0F19] mb-1.5 font-display">End-to-End Execution</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    From design to code to marketing, we handle the entire lifecycle.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Trust;
