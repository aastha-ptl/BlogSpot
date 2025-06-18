import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPenNib, FaLaptopCode, FaRegLightbulb } from 'react-icons/fa';

const features = [
  {
    icon: <FaPenNib className="text-blue-600 text-3xl" />,
    title: 'Quality Content',
    description: 'Read well-written, insightful, and original blog posts from passionate authors.',
  },
  {
    icon: <FaLaptopCode className="text-blue-600 text-3xl" />,
    title: 'Developer Friendly',
    description: 'Tech blogs with real code examples, tutorials, and guides for developers.',
  },
  {
    icon: <FaRegLightbulb className="text-blue-600 text-3xl" />,
    title: 'Fresh Ideas',
    description: 'Explore trending topics, personal growth tips, and startup journeys.',
  },
];

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-[#E0F2FE] py-16 px-6 md:px-20 text-gray-800 mt-20 mb-20 border border-blue-200 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-blue-800">Why Choose Our BlogSpot?</h2>
        <p className="text-lg text-blue-700">
          We empower creators and readers with a seamless blogging experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white rounded-2xl p-6 text-center shadow-lg transform transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
