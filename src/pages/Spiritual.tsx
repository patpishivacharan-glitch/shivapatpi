import React from 'react';
import '../styles/Spiritual.css';

const Spiritual: React.FC = () => {
  const practices = [
    {
      title: 'Why Reading Bhagavad Gita is Important?',
      description: 'This blog post explores the significance of the Bhagavad Gita in today\'s world, highlighting its timeless wisdom and practical teachings for personal growth and spiritual development.',
      icon: '🧘‍♂️'
    },
    {
      title: 'Yoga & Movement',
      description: 'Physical practice that integrates body, breath, and consciousness.',
      icon: '🕉️'
    },
    {
      title: 'Nature Connection',
      description: 'Regular time in nature to ground myself and appreciate the interconnectedness of all life.',
      icon: '🌱'
    },
    {
      title: 'Mindful Living',
      description: 'Bringing awareness and intention to daily activities and interactions.',
      icon: '✨'
    }
  ];

  const insights = [
    {
      title: 'Technology as a Tool for Good',
      content: 'I believe technology should serve humanity\'s highest potential. When we develop software with consciousness and compassion, we can create tools that truly benefit society and support human flourishing.'
    },
    {
      title: 'The Balance of Logic and Intuition',
      content: 'The best solutions often emerge when we balance analytical thinking with intuitive wisdom. Both the logical mind and the intuitive heart have valuable insights to offer.'
    },
    {
      title: 'Interconnectedness in Development',
      content: 'Every line of code we write affects others. Recognizing this interconnectedness helps us write more thoughtful, accessible, and inclusive software.'
    }
  ];

  return (
    <div className="spiritual-page">
      <div className="container">
        <section className="spiritual-hero">
          <h1>Spiritual Journey</h1>
          <p className="lead">
            Exploring the deeper dimensions of existence while integrating 
            ancient wisdom with modern living.
          </p>
        </section>

        <section className="practices-section">
          <h2>Daily Practices</h2>
          <div className="practices-grid">
            {practices.map((practice, index) => (
              <div key={index} className="practice-card">
                <div className="practice-icon">{practice.icon}</div>
                <h3>{practice.title}</h3>
                <p>{practice.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="philosophy-section">
          <h2>Philosophy & Approach</h2>
          <div className="philosophy-content">
            <div className="philosophy-text">
              <p>
                My spiritual journey is rooted in the understanding that consciousness 
                is the fundamental fabric of reality. This perspective influences how I 
                approach both technology and relationships – with mindfulness, compassion, 
                and a deep respect for the interconnected nature of existence.
              </p>
              <p>
                I draw inspiration from various wisdom traditions while maintaining a 
                practical, grounded approach to daily life. The goal is not to escape 
                the world, but to engage with it more skillfully and compassionately.
              </p>
            </div>
          </div>
        </section>

        <section className="insights-section">
          <h2>Insights & Reflections</h2>
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <div key={index} className="insight-card">
                <h3>{insight.title}</h3>
                <p>{insight.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <blockquote className="spiritual-quote">
            "The real voyage of discovery consists not in seeking new landscapes, 
            but in having new eyes."
            <cite>— Marcel Proust</cite>
          </blockquote>
        </section>
      </div>
    </div>
  );
};

export default Spiritual;