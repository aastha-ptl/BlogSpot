import React from 'react';
import { FaCode, FaBrain, FaHeart, FaGlobe, FaLaptop, FaFeather } from 'react-icons/fa';

const categories = [
  { name: 'Tech', icon: <FaCode /> },
  { name: 'Personal Growth', icon: <FaBrain /> },
  { name: 'Lifestyle', icon: <FaHeart /> },
  { name: 'World News', icon: <FaGlobe /> },
  { name: 'Programming', icon: <FaLaptop /> },
  { name: 'Creative Writing', icon: <FaFeather /> },
];

const CategoriesSection = () => {
  return (
    <div className="py-16 px-6 md:px-20 mt-20 mb-20 border border-blue-200 rounded-lg shadow-lg bg-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-800 mb-3">Explore Categories</h2>
        <p className="text-blue-700 text-md">
          Browse blogs by topics that interest you the most.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-[#F0F9FF]  p-4 rounded-xl shadow hover:shadow-md hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="text-blue-600 text-3xl mb-2">{cat.icon}</div>
            <div className="text-sm font-medium text-gray-800">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
