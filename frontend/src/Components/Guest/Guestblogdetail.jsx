import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaThumbsUp, FaCommentAlt, FaArrowLeft } from 'react-icons/fa';

const GuestBlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');

 useEffect(() => {
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/gusetview/${id}`);
      setBlog(res.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to fetch blog details');
    }
  };

  fetchBlog();
}, [id]);


  if (error) return <div className="text-red-500">{error}</div>;
  if (!blog) return <div>Loading...</div>;

  const validVideoLinks = blog.videoLinks.filter(link => link?.trim());

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 shadow-md rounded">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">{blog.title}</h1>

      <p className="text-gray-700 text-sm mb-4">{blog.description}</p>

      <div className="mb-3">
        <strong>Tags:</strong>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {blog.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>

      {validVideoLinks.length > 0 && (
        <div className="mb-4">
          <strong>Video Links:</strong>
          <ul className="list-disc list-inside text-sm text-blue-700">
            {validVideoLinks.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 text-gray-600 text-sm flex gap-6 items-center">
        <span className="flex items-center gap-1">
          <FaThumbsUp className="text-gray-500" /> {blog.likeCount}
        </span>
        <span className="flex items-center gap-1">
          <FaCommentAlt className="text-gray-500" /> {blog.commentCount}
        </span>
      </div>

      {/* ✅ Back to blogs link */}
      <div className="mt-6">
        <Link
          to="/blogs"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <FaArrowLeft className="mr-1" />
          Back to Explore Blogs
        </Link>
      </div>
    </div>
  );
};

export default GuestBlogDetail;
