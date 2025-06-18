import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const dummyBlogs = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    content:
      'React Hooks are functions that let you use state and other React features without writing a class. They simplify component logic, improve code readability, and make it easier to reuse stateful logic across components...',
  },
  {
    id: 2,
    title: 'Intro to Tailwind CSS',
    content:
      'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs directly in your markup. It promotes consistency and speeds up the styling process...',
  },
  {
    id: 3,
    title: 'What is Node.js?',
    content:
      'Node.js is a JavaScript runtime built on Chrome’s V8 engine. It allows developers to build scalable backend applications using JavaScript. It’s event-driven and non-blocking...',
  },
  {
    id: 4,
    title: 'Exploring Express.js',
    content:
      'Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications...',
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = dummyBlogs.find((b) => b.id === Number(id));

  if (!blog) return <div className="p-6">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Blogs
      </button>

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-blue-900 mb-6">{blog.title}</h1>

      {/* Blog Content */}
      <p className="text-lg text-gray-800 leading-relaxed">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
