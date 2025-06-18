import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './Blogcarduser';
import { FaTimes, FaSearch } from 'react-icons/fa';
import Blogimage from '../../image/blog.jpg';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://blogspot-8l4s.onrender.com/api/blog/myblogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
        setFilteredBlogs(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().split(' ').some((word) => word.includes(term))
    );
    setFilteredBlogs(filtered);
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      // Call delete API
      await axios.delete(`https://blogspot-8l4s.onrender.com/api/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to remove the deleted blog
      const updatedBlogs = blogs.filter((blog) => blog._id !== id);
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);

      alert("✅ Blog deleted successfully.");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("❌ Error deleting blog. Please try again.");
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredBlogs(blogs);
  };

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="py-11 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">
        My Blog Posts
      </h2>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-10 relative">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-5 py-3 rounded-full shadow-md focus:outline-none border border-blue-300 pr-12"
        />
        {searchTerm ? (
          <FaTimes
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={clearSearch}
            title="Clear search"
          />
        ) : (
          <FaSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            title="Search"
          />
        )}
      </div>

      {/* Blog Cards */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={{
                _id: blog._id,
                title: blog.title,
                description: blog.description,
                imageUrl: blog.image
                  ? `https://blogspot-8l4s.onrender.com/blog-images/${blog.image}`
                  : Blogimage,
                likes: blog.likes || 0,
                comments: blog.comments || [],
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blogs found.</p>
      )}
    </div>
  );
};

export default MyBlogs;
