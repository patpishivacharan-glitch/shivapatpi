import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Auto-rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="home-page">
      <section className="hero-spiritual-section">
        <div className="hero-profile">
          <div className="container">
            <div className="profile-content">
              <div className="profile-image-container">
                <img 
                  src="/icons/shivapatpi.jpg" 
                  alt="Shiva Patpi" 
                  className="profile-image"
                />
              </div>
              <div className="profile-text">
                <h1 className="profile-name">Shivapatpi</h1>
                <p className="profile-tagline">
                  Full Stack Developer | Spiritual Seeker | Lifelong Learner
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="spiritual-carousel">
          <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              <div className={`spiritual-card ${currentSlide === 0 ? 'active' : ''}`}>
                <div className="card-glow"></div>
                <div className="card-icon">🧘</div>
                <h3 className="card-title">Living Consciously</h3>
                <p className="card-message">
                  Many people go through life solely on the shores of life and death, building castles of worldly accomplishments in the name of material existence. But at the dusk of life, the rising ocean of time will wash everything away. For a truly lasting legacy, live a life grounded in mindful intention and love.
                </p>
              </div>
              
              <div className={`spiritual-card ${currentSlide === 1 ? 'active' : ''}`}>
                <div className="card-glow"></div>
                <div className="card-icon">💖</div>
                <h3 className="card-title">Pure Love</h3>
                <p className="card-message">
                  Bhakti is the motivation to please the supreme Beloved through loving service. All material and spiritual goals should begin and end with pure love for the supreme.
                </p>
              </div>
              
              <div className={`spiritual-card ${currentSlide === 2 ? 'active' : ''}`}>
                <div className="card-icon">🌟</div>
                <h3 className="card-title">Inner Wisdom</h3>
                <p className="card-message">
                  True knowledge comes not from external sources alone, but from the divine spark within. When we quiet the mind and listen to our inner voice, we discover profound truths.
                </p>
              </div>
              
              <div className={`spiritual-card ${currentSlide === 3 ? 'active' : ''}`}>
                <div className="card-icon">🕯️</div>
                <h3 className="card-title">Sacred Service</h3>
                <p className="card-message">
                  Service to others is service to the divine. When we act with compassion and selflessness, we transcend the boundaries of ego.
                </p>
              </div>
              
              <div className={`spiritual-card ${currentSlide === 4 ? 'active' : ''}`}>
                <div className="card-icon">🙏</div>
                <h3 className="card-title">Gratitude & Grace</h3>
                <p className="card-message">
                  In every moment, there exists an opportunity for gratitude. When we recognize divine grace, we open our hearts to infinite blessings.
                </p>
              </div>
            </div>
          </div>
          
          <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="carousel-dots">
            {[0, 1, 2, 3, 4].map(index => (
              <span 
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`} 
                onClick={() => goToSlide(index)}
              ></span>
            ))}
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