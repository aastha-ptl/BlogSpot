import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaCommentAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;
  const isLoggedIn = !!token && !!currentUserId;

  // Blog-specific like state
  const [likes, setLikes] = useState(blog.likes?.map(id => id.toString()) || []);
  const [liked, setLiked] = useState(false);

  //  Set initial liked state on mount
  useEffect(() => {
    console.log('useEffect RUN', { likes, currentUserId });
    setLiked(isLoggedIn && likes.includes(currentUserId));

  }, [likes, currentUserId, isLoggedIn]);

 const handleReadMore = () => {
  if (isLoggedIn) {
    navigate(`/user/blogdetail/${blog.id}`);
  } else {
    navigate(`/blogdetail/${blog.id}`);
  }
};
 const handleLikeClick = async () => {
  if (!isLoggedIn) {
    navigate('/login');
    return;
  }

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/blog/likes/${blog.id}`,
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
    console.log("🛠 Blog ID:", blog._id);


  } catch (error) {
    console.error('Error toggling like:', error);
  }
};



  const handleCommentClick = () => {
    navigate(isLoggedIn ? `/blog/${blog._id}` : '/login');
  };

  const shortDescription =
    blog.description.length > 250
      ? `${blog.description.slice(0, 200)}...`
      : blog.description;

  const likeColor = liked ? 'text-blue-700' : 'text-gray-500';
  const commentColor = 'text-gray-500'; // keep consistent or update if needed

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full">
      <div className="w-full h-70">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow p-5">
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-2">{blog.title}</h2>
          <p className="text-gray-700 text-sm mb-4">{shortDescription}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-4 items-center border-t border-gray-100 pt-4">
          <button
            onClick={handleReadMore}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
          >
            Read More
          </button>

          <button
            onClick={handleLikeClick}
            title={isLoggedIn ? 'Like this blog' : 'Login to like'}
            className={`flex items-center gap-1 text-sm ${likeColor}`}
          >
            <FaThumbsUp className={likeColor} />
            {likes.length}
          </button>

          <button
            onClick={handleCommentClick}
            title={isLoggedIn ? 'View/Add comments' : 'Login to comment'}
            className={`flex items-center gap-1 text-sm ${commentColor}`}
          >
            <FaCommentAlt className={commentColor} />
            {blog.comments?.length || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
