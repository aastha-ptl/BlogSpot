const Blog = require('../Models/Blog');
const path = require('path');
//create new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, videoLinks } = req.body;
    const image = req.file ? req.file.filename : '';

    const blog = new Blog({
      user: req.user.id,
      title,
      description,
      tags: JSON.parse(tags),
      videoLinks: JSON.parse(videoLinks),
      image,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  res.json(blogs);
};

exports.incrementView = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.views += 1;
    await blog.save();
    res.json({ views: blog.views });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update views' });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const userId = req.user.id;

    const alreadyLiked = blog.likes.includes(userId);
    if (alreadyLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    // ✅ Send full updated likes array
    res.json({ liked: !alreadyLiked, likes: blog.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to like blog' });
  }
};
exports.addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const { text } = req.body;

    const comment = {
      user: req.user.id,
      text,
    };

    blog.comments.push(comment);
    await blog.save();

    const newComment = blog.comments[blog.comments.length - 1];
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
exports.getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogs = await Blog.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user blogs' });
  }
};
const fs = require('fs');
//update blog
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) return res.status(404).json({ error: 'Blog not found' });

    if (existingBlog.user.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this blog' });
    }

    const { title, description, tags, videoLinks } = req.body;

    existingBlog.title = title || existingBlog.title;
    existingBlog.description = description || existingBlog.description;

    if (tags) existingBlog.tags = JSON.parse(tags);
    if (videoLinks) existingBlog.videoLinks = JSON.parse(videoLinks);

    if (req.file) {
      // Delete old image
      if (existingBlog.image) {
        const oldImagePath = path.join(__dirname, '../uploads/blog-images', existingBlog.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      existingBlog.image = req.file.filename;
    }

    const updatedBlog = await existingBlog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update blog' });
  }
};
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'name');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.status(200).json({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      tags: blog.tags || [],
      videoLinks: blog.videoLinks || [],
      imageUrl: blog.image ? `http://localhost:5000/uploads/blog-images/${blog.image}` : '',

    });
  } catch (err) {
    console.error('Fetch blog error:', err);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    // Check if the blog belongs to the logged-in user
    if (blog.user.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this blog' });
    }

    // Delete blog image from the file system if exists
    if (blog.image) {
      const imagePath = path.join(__dirname, '../uploads/blog-images', blog.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await blog.deleteOne(); // delete the blog document
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Delete blog error:', err);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

exports.getPublicBlogView = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'name');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.status(200).json({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      tags: blog.tags || [],
      videoLinks: blog.videoLinks || [],
      imageUrl: '', 
      likeCount: blog.likes.length,
      commentCount: blog.comments.length,
    });
  } catch (err) {
    console.error('Fetch blog error:', err);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

exports.getBlogDetailsForUser = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('user', 'name')
      .populate('likes', 'name')
      .populate('comments.user', 'name');

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const userLiked = blog.likes.some(like => like._id.toString() === req.user.id);

    res.status(200).json({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      tags: blog.tags || [],
      videoLinks: blog.videoLinks || [],
      likeCount: blog.likes.length,
      commentCount: blog.comments.length,
      userLiked,
      author: blog.user.name,
      likes: blog.likes.map(user => ({ _id: user._id, name: user.name })),
      comments: blog.comments.map(c => ({
        _id: c._id,
        text: c.text,
        user: c.user ? { _id: c.user._id, name: c.user.name } : { _id: null, name: 'Unknown User' },
        createdAt: c.createdAt,
      })),
    });
  } catch (err) {
    console.error('Secure blog fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};
