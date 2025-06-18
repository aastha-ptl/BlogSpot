import React from 'react';
import HeroSection from './Herosection_home';
import heroImg from '../../image/hero.jpg'; 
import FeaturesSection from './Feature_home';
import CategoriesSection from './Categories_home';

const Home = () => {
  return (
    <>
      <HeroSection
        imageUrl={heroImg}
        title="Welcome to Our BlogSpot"
        subtitle="Discover inspiring stories, tech articles, and practical tips written by passionate contributors. Stay updated and keep learning."
        buttonText="Explore Blogs"
        buttonLink="#blogs"
      />
        <FeaturesSection />
        <CategoriesSection />
    </>
  );
};

export default Home;
