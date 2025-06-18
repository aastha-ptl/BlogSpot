import React from 'react';
import Herosection from './User_hero_home';
import heroImg from '../../image/hero.jpg'; 
import FeaturesSection from '../Guest/Feature_home';
import CategoriesSection from '../Guest/Categories_home';

const Home = () => {
  return (
    <>
      <Herosection
        imageUrl={heroImg}
        title="Welcome to Our BlogSpot"
        subtitle="Discover inspiring stories, tech articles, and practical tips written by passionate contributors. Stay updated and keep learning."
        buttonText="Explore Blogs"
       
      />
        <FeaturesSection />
        <CategoriesSection />
    </>
  );
};

export default Home;
