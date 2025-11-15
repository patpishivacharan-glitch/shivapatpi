import React from 'react';
import '../styles/AboutMe.css';

const AboutMe: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <section className="about-hero">
          <div className="about-content">
            <h1>About Me</h1>
            <p className="lead">
              Hello! I'm ShivaPatpi, a passionate individual exploring the beautiful 
              convergence of technology, spirituality, and human connections.
            </p>
          </div>
        </section>

        <section className="about-details">
          <div className="details-grid">
            <div className="detail-card">
              <h3>My Journey</h3>
              <p>
                My path has been one of continuous learning and growth, spanning across 
                technical domains while maintaining a deep connection to spiritual principles. 
                I believe in the power of technology to solve real-world problems while 
                staying grounded in human values.
              </p>
            </div>
            
            <div className="detail-card">
              <h3>Philosophy</h3>
              <p>
                I embrace a holistic approach to life, where technical expertise meets 
                spiritual wisdom. This balance helps me create meaningful solutions and 
                build authentic relationships with people from all walks of life.
              </p>
            </div>
            
            <div className="detail-card">
              <h3>Values</h3>
              <ul>
                <li>Continuous Learning & Growth</li>
                <li>Authentic Human Connections</li>
                <li>Technical Excellence</li>
                <li>Spiritual Awareness</li>
                <li>Community Building</li>
              </ul>
            </div>
            
            <div className="detail-card">
              <h3>Interests</h3>
              <p>
                When I'm not coding or meditating, you'll find me exploring new 
                technologies, reading about consciousness and philosophy, connecting 
                with nature, or engaging in meaningful conversations with friends.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;