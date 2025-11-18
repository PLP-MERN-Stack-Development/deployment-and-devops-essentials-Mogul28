import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: '', content: '', tags: '' });

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts/${id}`
      );
      setPost(response.data.data);
      setEditData({
        title: response.data.data.title,
        content: response.data.data.content,
        tags: response.data.data.tags?.join(', ') || ''
      });
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts/${id}`
      );
      navigate('/posts');
    } catch (err) {
      alert('Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        ...editData,
        tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts/${id}`,
        updateData
      );
      setPost(response.data.data);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update post');
      console.error('Error updating post:', err);
    }
  };

  if (loading) {
    return <div className="container">Loading post...</div>;
  }

  if (error || !post) {
    return <div className="container error">{error || 'Post not found'}</div>;
  }

  const isAuthor = user && post.author._id === user.id;

  return (
    <div className="post-detail-container">
      <div className="container">
        <Link to="/posts" className="back-link">← Back to Posts</Link>
        
        {isEditing ? (
          <div className="post-form">
            <h1>Edit Post</h1>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={editData.tags}
                  onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Update Post</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="post-detail">
            <div className="post-header">
              <h1>{post.title}</h1>
              {isAuthor && (
                <div className="post-actions">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="post-meta">
              <span>By {post.author?.name || 'Unknown'}</span>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
            <div className="post-content">
              <p>{post.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

