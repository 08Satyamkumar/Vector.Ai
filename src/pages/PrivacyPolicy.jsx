import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'data-collection', label: '2. Information We Collect' },
    { id: 'data-usage', label: '3. How We Use Information' },
    { id: 'data-sharing', label: '4. Data Sharing & Transfers' },
    { id: 'data-security', label: '5. Security & Retention' },
    { id: 'user-rights', label: '6. Your Rights & Choices' },
    { id: 'contact', label: '7. Contact Us' }
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
          <h1 className="text-[2.75rem] md:text-[3.5rem] font-display font-bold tracking-tight mb-4">Privacy Policy</h1>
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
          <section id="introduction" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">1. Introduction</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                Welcome to Vector.Ai. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <strong>vector.ai09@gmail.com</strong>.
              </p>
              <p>
                When you visit our website <strong>https://vector-ai-solution.vercel.app</strong> and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section id="data-collection" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">2. Information We Collect</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the website, or otherwise contacting us.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and service interests provided via the contact form.</li>
                <li><strong>Chat Conversations:</strong> Input queries and conversational history with Maya, our support AI chatbot, stored to provide context-aware support.</li>
                <li><strong>Device & Analytics:</strong> Standard connection data, IP address, browser type, operating system, and anonymous usage patterns to optimize platform loading speeds and performance.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section id="data-usage" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">3. How We Use Information</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                We use personal information collected via our website for a variety of business purposes described below:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>To respond to user inquiries:</strong> We use your contact details to schedule calls, send project proposals, and follow up on marketing interests.</li>
                <li><strong>To operate and improve Maya (AI Chatbot):</strong> Conversational input is securely processed to train the AI's answering model, ensuring zero hallucination.</li>
                <li><strong>To optimize experience:</strong> Analyzing anonymous traffic behavior to audit website loads, responsive designs, and static routing policies.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section id="data-sharing" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">4. Data Sharing & Transfers</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
              </p>
              <p>
                We **never sell or lease** your phone numbers, email addresses, or business briefs to third-party data brokers or marketing agencies. Data is exclusively transferred securely to our trusted hosting partner **Vercel** (for frontend state) and **Render** (for backend API computation).
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 */}
          <section id="data-security" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">5. Security & Retention</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                We aim to protect your personal information through a system of organizational and technical security measures.
              </p>
              <p>
                We have implemented appropriate technical security measures (including SSL/HTTPS encryption, secure API integrations via Web3Forms, and rate-limiting) designed to protect the security of any personal information we process. 
              </p>
              <p>
                We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless a longer retention period is required by law.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 6 */}
          <section id="user-rights" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">6. Your Rights & Choices</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                Depending on your location (such as under GDPR or CCPA), you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access and Correction:</strong> The right to request copies of your personal data and demand rectification of any inaccuracies.</li>
                <li><strong>Erasure ("Right to be Forgotten"):</strong> The right to request that we wipe your contact form logs or chat history from our records.</li>
                <li><strong>Data Portability:</strong> Requesting a copy of your submitted project briefs in a machine-readable format.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 7 */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">7. Contact Us</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                If you have questions or comments about this policy, or want to exercise your user rights, you may email us directly at:
              </p>
              <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-100 w-fit">
                <p className="font-bold text-[#0B0F19] mb-1">Vector.Ai Legal Team</p>
                <p className="text-gray-500 mb-1">Email: <strong>vector.ai09@gmail.com</strong></p>
                <p className="text-gray-500">Address: Gaur Yamuna City, Greater Noida, Uttar Pradesh</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
