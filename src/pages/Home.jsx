import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Trust from '../components/Trust';
import FounderQuote from '../components/FounderQuote';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Trust />
      <FounderQuote />
      <Team />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
