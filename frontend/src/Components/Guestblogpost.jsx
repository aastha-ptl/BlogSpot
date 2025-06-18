import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GuestBlogPost = ({ blog }) => {
  const [showLikeTooltip, setShowLikeTooltip] = useState(false);
  const [showCommentTooltip, setShowCommentTooltip] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const navigate = useNavigate();

  const comments = blog?.comments || [];
  const hasMoreThanTwoComments = comments.length > 2;

  const commentHeight = 24;
  const commentGap = 4;
  const fixedCommentAreaHeight = 2 * (commentHeight + commentGap);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col max-w-full h-[420px]">
      {/* Blog Title + Content */}
      <div style={{ minHeight: 110 }} className="mb-4">
        <h2 className="text-xl font-bold text-blue-800 mb-2">{blog.title}</h2>

        <p className="text-gray-700 text-sm">
          {`${blog.content.slice(0, 150)}...`}
        </p>

        <button
          onClick={() => navigate(`/blog/${blog.id}`)}
          className="text-sm text-[#005A9C] font-medium hover:underline mt-1"
        >
          Read More
        </button>
      </div>

      {/* Comments Section */}
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Comments</h3>

        <div
          className="pr-1"
          style={{
            height: fixedCommentAreaHeight,
            overflowY: showAllComments ? 'auto' : 'hidden',
          }}
        >
          {(showAllComments ? comments : comments.slice(0, 2)).map((comment) => (
            <div
              key={comment.id}
              className="mb-1 text-sm"
              style={{ height: commentHeight, marginBottom: commentGap }}
            >
              <span className="font-medium text-blue-600">{comment.name}: </span>
              <span className="text-gray-700">{comment.text}</span>
            </div>
          ))}
        </div>

        {/* Read More / Read Less Button */}
        <div style={{ height: 24 }}>
          {hasMoreThanTwoComments && (
            <button
              onClick={() => setShowAllComments((prev) => !prev)}
              className="text-sm text-[#005A9C] font-medium hover:underline mt-1 self-start"
            >
              {showAllComments ? 'Read Less Comments' : 'Read More Comments'}
            </button>
          )}
        </div>

        {/* Comment box */}
        <div className="relative mt-3">
          <textarea
            className="w-full border rounded p-2 text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
            rows="2"
            placeholder="Log in to write a comment..."
            onFocus={() => setShowCommentTooltip(true)}
            onBlur={() => setShowCommentTooltip(false)}
            disabled
          />
          {showCommentTooltip && (
            <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg z-10">
              Please{' '}
              <a href="#" className="underline text-blue-400">
                log in
              </a>{' '}
              to comment.
            </div>
          )}
        </div>
      </div>

      {/* Push like to bottom */}
      <div className="flex-grow"></div>

      {/* Like Button */}
      <div className="mt-3 relative">
        <button
          className="text-white bg-[#005A9C] px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          onMouseEnter={() => setShowLikeTooltip(true)}
          onMouseLeave={() => setShowLikeTooltip(false)}
        >
          <FaThumbsUp /> Like ({blog.likes || 0})
        </button>

        {showLikeTooltip && (
          <div className="absolute left-0 top-12 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg z-10">
            Please{' '}
            <a href="#" className="underline text-blue-400">
              log in
            </a>{' '}
            to like this post.
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestBlogPost;
