import React from 'react';
import BlogHero from '../components/BlogHero';
import BlogList from '../components/BlogList';
import NewsletterCTA from '../components/NewsletterCTA';

const BlogPage = () => {
  return (
    <>
      <BlogHero />
      <BlogList />
      <NewsletterCTA />
    </>
  );
};

export default BlogPage;
