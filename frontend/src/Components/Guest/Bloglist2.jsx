import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './Blogcard2';
import {
  FaTimes,
  FaSearch,
  FaLaptopCode,
  FaUserTie,
  FaCode,
  FaBriefcase,
  FaRegLightbulb,
  FaTags,
} from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';
import Blogimage from '../../image/blog.jpg'; // Placeholder image

const BlogList = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const staticTags = ['technical', 'management', 'coding', 'career', 'softskills'];

  const tagIconComponents = {
    technical: FaLaptopCode,
    management: FaUserTie,
    coding: FaCode,
    career: FaBriefcase,
    softskills: FaRegLightbulb,
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blog');
        setAllBlogs(res.data);
        setFilteredBlogs(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blogs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
  const terms = searchTerm.toLowerCase().split(/\s+/); // split input into words

  const filtered = allBlogs.filter((blog) => {
    const title = blog.title?.toLowerCase() || '';

    // Check that every search word exists somewhere in the title
    const matchesSearch = terms.every((term) => title.includes(term));

    const matchesTag = selectedTag
      ? (blog.tags || []).includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  setFilteredBlogs(filtered);
}, [searchTerm, selectedTag, allBlogs]);


  const clearSearch = () => setSearchTerm('');

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="py-12 px-4 md:px-20 min-h-screen ">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-12 text-center">
        Explore Insights & Blogs
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Filter Panel */}
        <div className="md:w-[22%] w-full flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MdFilterList className="text-blue-600 text-xl" />
            Filter by Tag
          </h3>

          <div className="flex flex-wrap gap-3 justify-start">
            <button
              onClick={() => setSelectedTag('')}
              className={`min-w-[9rem] flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${
                selectedTag === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-100'
              }`}
            >
              <FaTags
                className={`text-base ${
                  selectedTag === '' ? 'text-white' : 'text-blue-600'
                }`}
              />
              All
            </button>

            {staticTags.map((tag) => {
              const Icon = tagIconComponents[tag];
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`min-w-[9rem] flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  <Icon className={`text-base ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block w-[1px] bg-gray-300 shadow-sm mt-2" />

        {/* Blog Content */}
        <div className="flex-1">
          <div className="mb-8 relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search blogs by title, description, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-xl shadow-lg border focus:outline-none border-blue-200 focus:ring-2 focus:ring-blue-400 pr-12 bg-white transition"
            />
            {searchTerm ? (
              <FaTimes
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={clearSearch}
              />
            ) : (
              <FaSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            )}
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={{
                    id: blog._id,
                    title: blog.title,
                    description: blog.description,
                    imageUrl: blog.image
                      ? `http://localhost:5000/blog-images/${blog.image}`
                      : Blogimage,
                    likes: blog.likes || 0,
                    comments: blog.comments || [],
                    tags: blog.tags || [],
                  }}
                  showExcerptOnly={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-10">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;