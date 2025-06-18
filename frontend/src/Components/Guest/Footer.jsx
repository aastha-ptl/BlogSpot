import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#004ba6] text-white">
      {/* Top Section */}
      <div className="py-12 px-4 text-center border-t border-[#004ba6]">
        <h5 className="text-xl font-bold mb-3">📝 BlogSpot</h5>
        <p className="text-sm max-w-2xl mx-auto">
          BlogSpot is a place to explore insightful articles, tech updates, personal thoughts, and tutorials—crafted with passion and designed for developers, creators, and curious minds.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="py-4 text-center text-sm border-t border-white/20">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} BlogSpot — All Rights Reserved
        </p>
        <p>
          Designed and Developed by <strong>Aastha Patel</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
    