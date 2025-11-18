import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts`
      );
      setPosts(response.data.data);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts/${id}`
      );
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      alert('Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  if (loading) {
    return <div className="container">Loading posts...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div className="posts-container">
      <div className="container">
        <div className="posts-header">
          <h1>All Posts</h1>
          <Link to="/posts/new" className="btn btn-primary">
            Create New Post
          </Link>
        </div>
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Create your first post!</p>
            <Link to="/posts/new" className="btn btn-primary">
              Create Post
            </Link>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post._id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-content">{post.content.substring(0, 150)}...</p>
                <div className="post-meta">
                  <span>By {post.author?.name || 'Unknown'}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="post-actions">
                  <Link to={`/posts/${post._id}`} className="btn btn-primary">
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;

