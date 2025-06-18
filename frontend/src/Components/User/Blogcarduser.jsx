import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaCommentAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogCardUser = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;
  const isLoggedIn = !!token && !!currentUserId;

  const [likes, setLikes] = useState(blog.likes?.map(id => id.toString()) || []);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isLoggedIn && likes.includes(currentUserId));
  }, [likes, currentUserId, isLoggedIn]);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/blog/likes/${blog._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedLikes = res.data.likes.map(id => id.toString());
      setLikes(updatedLikes);
      setLiked(updatedLikes.includes(currentUserId));
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const shortDescription =
    blog.description.length > 250
      ? `${blog.description.slice(0, 250)}...`
      : blog.description;

  const likeColor = liked ? 'text-blue-700' : 'text-gray-500';

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full relative">
      {/* Edit/Delete */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={() => navigate(`/user/updateblog/${blog._id}`, { state: blog })}
          title="Edit blog"
          className="text-blue-600 hover:text-blue-800 p-1"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => {
            const confirmed = window.confirm("Are you sure you want to delete this blog?");
            if (confirmed) onDelete(blog._id);
          }}
          title="Delete blog"
          className="text-red-600 hover:text-red-800 p-1"
        >
          <FaTrashAlt size={18} />
        </button>
      </div>

      {/* Image */}
      <div className="w-full h-80">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow p-5">
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            {blog.title}
          </h2>
          <p className="text-gray-700 text-sm mb-4">{shortDescription}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-wrap gap-4 items-center border-t border-gray-100 pt-4">
          <button
            onClick={() => navigate(`/user/blogdetail/${blog._id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
          >
            Read More
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1 text-sm ${likeColor}`}
              title={isLoggedIn ? 'Like this blog' : 'Login to like'}
            >
              <FaThumbsUp className={likeColor} />
              {likes.length}
            </button>

            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <FaCommentAlt /> {blog.comments?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardUser;
