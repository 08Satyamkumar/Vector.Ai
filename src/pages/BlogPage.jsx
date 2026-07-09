import React, { useState } from 'react';
import BlogHero from '../components/BlogHero';
import BlogList from '../components/BlogList';
import NewsletterCTA from '../components/NewsletterCTA';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <>
      <BlogHero 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogList 
        searchQuery={searchQuery}
        activeCategory={activeCategory}
      />
      <NewsletterCTA />
    </>
  );
};

export default BlogPage;
