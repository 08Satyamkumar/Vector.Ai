import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  const sections = [
    { id: 'agreement', label: '1. Agreement to Terms' },
    { id: 'services', label: '2. Scope of Services' },
    { id: 'payments', label: '3. Fees & Payment Terms' },
    { id: 'intellectual-property', label: '4. Intellectual Property' },
    { id: 'client-obligations', label: '5. Client Responsibilities' },
    { id: 'liability', label: '6. Limitation of Liability' },
    { id: 'governing-law', label: '7. Governing Law' }
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24">
      {/* Premium Header */}
      <div className="bg-[#0B0F19] text-white py-20 px-6 lg:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0054D2]/25 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-[#0054D2] text-xs font-bold tracking-widest uppercase mb-3 block">LEGAL COMPLIANCE</span>
          <h1 className="text-[2.75rem] md:text-[3.5rem] font-display font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-gray-400 text-sm md:text-base">Last Updated: July 6, 2026 • Version 1.1</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[85rem] mx-auto px-6 lg:px-12 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sticky Navigation Sidebar (Desktop) */}
        <aside className="lg:col-span-4 hidden lg:block h-fit sticky top-28 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <h4 className="text-[#0B0F19] font-bold text-[16px] mb-6 tracking-wide">POLICY CONTENTS</h4>
          <nav className="flex flex-col gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className="text-left text-gray-500 hover:text-[#0054D2] transition-colors text-[14px] font-medium border-l-2 border-transparent hover:border-[#0054D2] pl-4 py-0.5"
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Main Text Column */}
        <main className="lg:col-span-8 flex flex-col gap-12 bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
          
          {/* Section 1 */}
          <section id="agreement" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">1. Agreement to Terms</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Vector.Ai (“we,” “us” or “our”), concerning your access to and use of the <strong>https://vector-ai-solution.vercel.app</strong> website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
              </p>
              <p>
                By accessing the Site and utilizing our agency services, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using our services.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section id="services" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">2. Scope of Services</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                Vector.Ai provides digital solutions including: performance marketing (Google & Meta Ads), custom software/web/mobile development, SEO optimization, and workflow automation.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Retainers & Projects:</strong> The exact deliverables, milestones, and timelines will be defined in a separate Service Agreement (SOW) executed for each project.</li>
                <li><strong>AI Chatbot (Maya):</strong> The chatbot on our website provides general information based on our active knowledge base. Custom chatbots built for clients are governed by individual client contracts.</li>
                <li><strong>Revisions:</strong> Minor changes to designs or code are covered under the scoped project timeline, but major revisions outside the initial SOW constitute out-of-scope tasks and will be billed separately.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section id="payments" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">3. Fees & Payment Terms</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                Client agrees to pay the fees outlined in the selected plan (Startup, Growth, Business, or custom Enterprise) or as agreed upon in the project proposal.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Billing Cycles:</strong> Monthly retainer plans (Startup: ₹19,999/mo, Growth: ₹39,999/mo, Business: ₹69,999/mo) are billed in advance on a recurring monthly basis.</li>
                <li><strong>Milestones:</strong> Custom project development requires a 50% upfront deposit, with the remaining balance paid upon project completion or defined milestones.</li>
                <li><strong>Late Payments:</strong> Invoices unpaid after 7 calendar days past the due date may result in a temporary suspension of services, including pausing active ad campaigns and developer workflows.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section id="intellectual-property" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">4. Intellectual Property</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                We respect intellectual property rights. Ownership of deliverables transitions to the client upon full payment:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Client Ownership:</strong> Upon receipt of final payment, all custom-coded repositories, brand graphics, designed layouts, and custom ad creatives become the exclusive property of the Client.</li>
                <li><strong>Agency Portfolio:</strong> Client grants Vector.Ai a non-exclusive license to display the completed work, logos, and case studies in the agency's portfolio, website, and promotional materials unless explicitly agreed otherwise.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 */}
          <section id="client-obligations" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">5. Client Responsibilities</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                To deliver top-tier, world-class results, the client agrees to collaborate in good faith:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Timely Inputs:</strong> Providing copy text, high-resolution media assets, product details, and branding files within the agreed timeframes.</li>
                <li><strong>System Credentials:</strong> Granting necessary access permissions (Google Analytics, Meta Business Suite, hosting environments, CRM accounts) securely to designated Vector.Ai team members.</li>
                <li><strong>Approval Cycles:</strong> Approving draft layouts and campaign setups within 3 business days to prevent delivery delays.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 6 */}
          <section id="liability" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">6. Limitation of Liability</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                Vector.Ai provides services on an "as is" and "as available" basis.
              </p>
              <p>
                We execute performance marketing campaigns based on best practices and data-driven insights. However, we do not warrant or guarantee exact sales volumes, organic rankings, or ad conversions, as these are dependent on external market factors, search engine algorithm changes, and consumer trends.
              </p>
              <p>
                In no event shall Vector.Ai, its directors (including Satyam Samrat Singh), or employees be liable for any indirect, incidental, or consequential damages (including loss of business profits or data leaks caused by third-party hosting platforms).
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 7 */}
          <section id="governing-law" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">7. Governing Law</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of the State of **Uttar Pradesh, India**, without regard to its conflict of law principles.
              </p>
              <p>
                Any legal action or dispute arising under this agreement shall be brought exclusively in the courts located in **Noida, Uttar Pradesh, India**, and you consent to the personal jurisdiction and venue of such courts.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default TermsOfService;
