import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaCommentDots, FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserBlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [likesOpen, setLikesOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blog/${id}/secure`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBlog(res.data);
                setLiked(res.data.likes.includes(res.data.currentUser));
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (err) {
                console.error('Fetch blog failed:', err);
            }
        };
        fetchBlog();
    }, [id]);

    const handleLike = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/blog/like/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlog(prev => ({ ...prev, likes: res.data.likes }));
            setLiked(res.data.liked);
        } catch (err) {
            console.error('Like failed:', err);
        }
    };

    const handleComment = async () => {
        if (!commentText.trim()) return;
        try {
            const res = await axios.post(`http://localhost:5000/api/blog/comments/${id}`, {
                text: commentText,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlog(prev => ({ ...prev, comments: [...prev.comments, res.data] }));
            setCommentText('');
        } catch (err) {
            console.error('Comment failed:', err);
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 shadow-md rounded">
            <button onClick={() => navigate('/user/blogs')} className="flex items-center text-blue-600 hover:underline mb-4">
                <FaArrowLeft className="mr-2" /> Back to Explore Blogs
            </button>

            <h1 className="text-2xl font-bold text-blue-800 mb-2">{blog.title}</h1>
            {blog.author && (
                <p className="text-gray-400 text-sm mb-3">
                    By <span className="font-sm">{blog.author}</span>
                </p>
            )}

            <p className="text-gray-700 text-sm mb-4">{blog.description}</p>

            <div className="mb-3">
                <strong>Tags:</strong>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    {blog.tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
            </div>

            {blog.videoLinks.length > 0 && (
                <div className="mb-4">
                    <strong>Video Links:</strong>
                    <ul className="list-disc list-inside text-sm text-blue-700">
                        {blog.videoLinks.map((link, i) => (
                            <li key={i}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex items-center text-sm text-gray-700 space-x-4 mt-4">
                <button onClick={handleLike} className="flex items-center">
                    <FaThumbsUp className={`mr-1 ${liked ? 'text-blue-600' : 'text-gray-500'}`} /> {blog.likes.length} Likes
                </button>
                <button onClick={() => setCommentsOpen(true)} className="flex items-center">
                    <FaCommentDots className="mr-1 text-gray-500" /> {blog.comments.length} Comments
                </button>
                <button onClick={() => setLikesOpen(true)} className="text-sm text-blue-600 hover:underline">View Likes</button>
                <button onClick={() => setCommentsOpen(true)} className="text-sm text-blue-600 hover:underline">View Comments</button>
            </div>

            <div className="mt-4">
                <textarea
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    rows="2"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button
                    onClick={handleComment}
                    className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                    Post Comment
                </button>
            </div>

            {likesOpen && (
                <div className="mt-4 max-h-40 overflow-y-auto border p-3 rounded bg-gray-50">
                    <h3 className="font-semibold text-sm mb-2">Liked by:</h3>
                    {blog.likes.map((user, i) => (
                        <p key={i} className="text-sm text-gray-800 flex items-center">
                            <FaUserCircle className="mr-2 text-gray-600" />
                            {user?.name || 'Unknown User'}
                        </p>
                    ))}
                </div>
            )}


            {commentsOpen && (
                <div className="mt-4 max-h-40 overflow-y-auto border p-3 rounded bg-gray-50">
                    <h3 className="font-semibold text-sm mb-2">Comments:</h3>
                    {blog.comments.map((comment, i) => (
                        <div key={i} className="text-sm text-gray-800 mb-1 flex items-start">
                            <FaUserCircle className="mr-2 mt-[2px] text-gray-600" />
                            <span>
                                <span className="font-medium">{comment.user?.name || 'Anonymous'}</span>: {comment.text}
                            </span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default UserBlogDetail;
