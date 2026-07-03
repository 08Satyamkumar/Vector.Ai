import React from 'react';
import ServicesHero from '../components/ServicesHero';
import ServiceList from '../components/ServiceList';
import ServiceGrid from '../components/ServiceGrid';
import ServiceCTA from '../components/ServiceCTA';

const ServicePage = () => {
  return (
    <>
      <ServicesHero />
      <div className="bg-[#F8F9FA] min-h-screen">
        <ServiceList />
        <ServiceGrid />
        <ServiceCTA />
      </div>
    </>
  );
};

export default ServicePage;
