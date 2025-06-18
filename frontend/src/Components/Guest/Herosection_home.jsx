import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ imageUrl, title, subtitle, buttonText, buttonLink }) => {
  return (
    <div className="bg-white py-4 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Left: Text Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
          {title || 'Welcome to Our BlogSpot'}
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          {subtitle ||
            'Discover inspiring stories, tech articles, and practical tips written by passionate contributors. Stay updated and keep learning.'}
        </p>
        <Link
          to={'/blogs'}
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-lg transition duration-300"
        >
          {buttonText || 'Explore Blogs'}
        </Link>
      </div>

      {/* Right: Hero Image */}
      <div className="md:w-1/2">
        <img
          src={
            imageUrl ||
            'https://source.unsplash.com/600x400/?blog,technology'
          }
          alt="Hero"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    </div>
  );
};

export default HeroSection;
