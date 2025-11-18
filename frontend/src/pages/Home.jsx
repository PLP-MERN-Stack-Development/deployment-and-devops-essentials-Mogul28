import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="container">
        <div className="home-content">
          <h1>Welcome to MERN Stack Application</h1>
          <p className="home-description">
            A full-stack web application built with MongoDB, Express, React, and Node.js.
            This application demonstrates authentication, CRUD operations, and modern web development practices.
          </p>
          {user ? (
            <div className="home-actions">
              <Link to="/posts" className="btn btn-primary">
                View Posts
              </Link>
              <Link to="/posts/new" className="btn btn-primary">
                Create Post
              </Link>
            </div>
          ) : (
            <div className="home-actions">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

