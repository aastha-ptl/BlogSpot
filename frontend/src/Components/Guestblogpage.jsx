import React, { useState } from 'react'
import BlogList from '../Components/Bloglist'

const dummyBlogs = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    content: 'React Hooks are functions that let you use state and other React features without writing a class...',
    likes: 124,
    comments: [
      { id: 1, name: 'Alice', text: 'Great explanation!' },
      { id: 2, name: 'Bob', text: 'Helped me a lot, thanks!' },
      { id: 3, name: 'Eva', text: 'This is really helpful.' },
      { id: 4, name: 'John', text: 'Nicely written!' },
    ],
  },
  {
    id: 2,
    title: 'Intro to Tailwind CSS',
    content: 'Tailwind CSS is a utility-first CSS framework...',
    likes: 98,
    comments: [
      { id: 1, name: 'Meera', text: 'Love Tailwind!' },
      { id: 2, name: 'Chris', text: 'So productive!' },
    ],
  },
  {
    id: 3,
    title: 'What is Node.js?',
    content: 'Node.js is a JavaScript runtime built on Chrome’s V8 engine...',
    likes: 150,
    comments: [
      { id: 1, name: 'Sam', text: 'Node is amazing!' },
      { id: 2, name: 'Tina', text: 'Thanks for the info!' },
    ],
  },
  {
    id: 4,
    title: 'Exploring Express.js',
    content: 'Express.js is a minimal and flexible Node.js framework...',
    likes: 76,
    comments: [{ id: 1, name: 'Dev', text: 'Helpful for backend devs!' }],
  },
]

const GuestBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [blogs, setBlogs] = useState(dummyBlogs)

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setBlogs(dummyBlogs)
      return
    }

    const filtered = dummyBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setBlogs(filtered)
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Guest Blog Posts</h1>

      {/* 🔍 Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search blog title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#005A9C] text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* 🔽 Blog List */}
      {blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        <p className="text-gray-500">No blog posts found for "{searchTerm}"</p>
      )}
    </div>
  )
}

export default GuestBlogPage
