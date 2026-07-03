import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingPlans = () => {
  const plans = [
    {
      name: 'Startup',
      description: 'Ideal for beginners',
      originalPrice: '₹35,000',
      discount: '45% OFF',
      price: '₹19,999',
      features: [
        { name: 'Social Media Management (2 Platforms)', included: true },
        { name: 'Basic SEO Setup', included: true },
        { name: '5 Graphic Designs/mo', included: true },
        { name: 'Monthly Performance Report', included: true },
        { name: 'Email Support', included: true },
        { name: 'Ads Management', included: false },
        { name: 'AI Automation', included: false },
        { name: '24/7 Support', included: false },
      ]
    },
    {
      name: 'Growth',
      description: 'Everything you need to scale',
      originalPrice: '₹75,000',
      discount: '50% OFF',
      price: '₹39,999',
      isPopular: true,
      features: [
        { name: 'Social Media (4 Platforms)', included: true },
        { name: 'Advanced SEO & Backlinking', included: true },
        { name: 'Google & Meta Ads Management', included: true },
        { name: '10 Graphic Designs + 2 Reels/mo', included: true },
        { name: 'Bi-Weekly Strategy Calls', included: true },
        { name: 'AI Chatbot Integration', included: false },
        { name: 'Custom CRM Setup', included: false },
      ]
    },
    {
      name: 'Business',
      description: 'For aggressive expansion',
      originalPrice: '₹1,20,000',
      discount: '40% OFF',
      price: '₹69,999',
      features: [
        { name: 'Omnichannel Marketing Strategy', included: true },
        { name: 'Full AI Automation Suite', included: true },
        { name: 'Unlimited Graphic Design', included: true },
        { name: 'Video Editing (4 Reels/mo)', included: true },
        { name: 'Custom CRM & Lead Scoring', included: true },
        { name: 'Dedicated Account Manager', included: true },
      ]
    },
    {
      name: 'Enterprise',
      description: 'Custom solution for large orgs',
      price: 'Custom',
      features: [
        { name: 'Full Digital Transformation', included: true },
        { name: 'Custom App/Web Development', included: true },
        { name: 'Dedicated Dev & Marketing Team', included: true },
        { name: '24/7 Priority Support', included: true },
        { name: 'White-label Services', included: true },
      ]
    }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] py-16 lg:py-24 px-6 lg:px-16">
      <div className="max-w-[88rem] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[3rem] md:text-[3.5rem] font-display font-bold text-[#0B0F19] mb-4 tracking-tight">
            Transparent Pricing
          </h2>
          <p className="text-gray-500 text-[16px] md:text-[18px]">
            Choose the perfect plan to scale your business. No hidden fees.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-[2rem] p-8 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                ${plan.isPopular ? 'border-2 border-[#0B0F19] shadow-xl md:-mt-4 md:mb-[-1rem]' : 'border border-gray-100 shadow-sm hover:border-[#0B0F19]/20'}
              `}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0B0F19] text-[#0054D2] text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-1.5 rounded-full border-2 border-[#0B0F19]">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#0B0F19] mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-[13px]">{plan.description}</p>
              </div>

              {/* Price Area */}
              <div className="mb-8">
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-[14px] line-through font-medium">{plan.originalPrice}</span>
                    <span className="bg-[#E5F0FF] text-[#0054D2] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{plan.discount}</span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-bold text-[#0B0F19] tracking-tight">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 text-[14px] font-medium">/mo</span>}
                </div>
              </div>

              {/* Action Button */}
              <button 
                className={`w-full py-3.5 rounded-full text-[14px] font-bold transition-all duration-300 mb-10
                  ${plan.isPopular 
                    ? 'bg-[#0B0F19] text-white hover:bg-black shadow-md' 
                    : 'bg-white text-[#0B0F19] border border-gray-200 hover:bg-[#0B0F19] hover:text-white hover:border-[#0B0F19]'
                  }
                `}
              >
                Choose Plan
              </button>

              {/* Divider for non-popular plans to separate features like in screenshot? Actually no divider is visible, just margin */}
              
              {/* Features List */}
              <ul className="space-y-4 mt-auto">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-[#0054D2] mt-0.5 flex-shrink-0" strokeWidth={3} />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" strokeWidth={3} />
                    )}
                    <span className={`text-[13px] leading-tight ${feature.included ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PricingPlans;
