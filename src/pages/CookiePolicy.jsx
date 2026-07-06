import React from 'react';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
  const sections = [
    { id: 'definition', label: '1. What Are Cookies' },
    { id: 'usage', label: '2. How We Use Cookies' },
    { id: 'categories', label: '3. Types of Cookies We Use' },
    { id: 'control', label: '4. Managing Cookies' },
    { id: 'updates', label: '5. Policy Updates' }
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
          <h1 className="text-[2.75rem] md:text-[3.5rem] font-display font-bold tracking-tight mb-4">Cookie Policy</h1>
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
          <section id="definition" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">1. What Are Cookies</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                A cookie is a small text file containing a string of characters that is placed on your computer or mobile device when you visit a website. It helps the site recognize your browser upon your next visit, saving settings, preferences, and securing logins.
              </p>
              <p>
                Cookies set by the website owner (in this case, Vector.Ai) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., interactive content, analytics).
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section id="usage" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">2. How We Use Cookies</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Chat Widget Caching:</strong> We use local storage and essential session cookies to remember your conversation history with Maya, our AI support agent, so that the chat state doesn't wipe when you navigate between pages.</li>
                <li><strong>Performance Monitoring:</strong> Standard cookies allow us to gauge page loading speeds and cache static content on Vercel Edge networks to deliver a world-class, sub-second responsive experience.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section id="categories" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">3. Types of Cookies We Use</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                The specific types of first and third-party cookies served through our Website and the purposes they perform are detailed below:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Strictly Necessary Cookies:</strong> Essential for you to browse the site and use its core features (such as secure form submission APIs). Without these cookies, the site cannot operate properly.</li>
                <li><strong>Functionality Cookies:</strong> Remember choices you make (such as holding your active conversation thread in the AI chatbot widget) to provide a personalized experience.</li>
                <li><strong>Performance & Analytics Cookies:</strong> Gather anonymous statistical data about how users interact with our site, helping us identify coding bottlenecks or broken page layouts.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section id="control" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">4. Managing Cookies</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser.
              </p>
              <p>
                As the rules for controlling cookies vary between browsers, you should consult your browser's help menu for more information. Below are links to instructions on how to block or clear cookies in the most popular browsers:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Apple Safari</li>
                <li>Microsoft Edge</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 */}
          <section id="updates" className="scroll-mt-28">
            <h2 className="text-[22px] font-bold text-[#0B0F19] mb-4">5. Policy Updates</h2>
            <div className="text-gray-600 text-[14px] leading-relaxed space-y-4">
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default CookiePolicy;
