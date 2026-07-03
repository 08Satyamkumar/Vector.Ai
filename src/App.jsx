import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PricingPage from './pages/PricingPage';
import TeamPage from './pages/TeamPage';
import ProjectPage from './pages/ProjectPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-lime selection:text-white pb-2 relative">
        <Navbar />
        <main className="pt-24">
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><ServicePage /></PageTransition>} />
            <Route path="/services/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
            <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
            <Route path="/project" element={<PageTransition><ProjectPage /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
