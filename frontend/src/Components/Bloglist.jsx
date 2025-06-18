import React from 'react';
import GuestBlogPost from './Guestblogpost';

const BlogList = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs.map((blog) => (
        <GuestBlogPost key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
