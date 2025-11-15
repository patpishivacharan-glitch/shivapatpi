import React from 'react';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to ShivaPatpi</h1>
          <p className="hero-subtitle">
            Exploring the intersection of technology, spirituality, and human connections
          </p>
          <div className="hero-buttons">
            <a href="/about" className="btn btn-primary">Learn About Me</a>
            <a href="/technical" className="btn btn-secondary">View My Work</a>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <div className="container">
          <h2>What You'll Find Here</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Technical Excellence</h3>
              <p>Discover my journey through software development, programming skills, and innovative projects.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧘</div>
              <h3>Spiritual Insights</h3>
              <p>Explore thoughts on mindfulness, personal growth, and the deeper meaning of existence.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Meaningful Connections</h3>
              <p>Meet the amazing people who have been part of my journey and continue to inspire me.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;