import React, { useState } from 'react';
import ServicesHero from '../components/ServicesHero';
import ServiceList from '../components/ServiceList';
import ServiceGrid from '../components/ServiceGrid';
import ServiceCTA from '../components/ServiceCTA';

const ServicePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Only show the big popular service banner if no active search query 
  // and either all categories or marketing category is selected.
  const showMainBanner = searchQuery === '' && (selectedCategory === 'All' || selectedCategory === 'Marketing');

  return (
    <>
      <ServicesHero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <div className="bg-[#F8F9FA] min-h-screen">
        {showMainBanner && <ServiceList />}
        <ServiceGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
        <ServiceCTA />
      </div>
    </>
  );
};

export default ServicePage;
