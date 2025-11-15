import React from 'react';
import '../styles/Friends.css';

interface Friend {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  location: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

const Friends: React.FC = () => {
  // Sample friends data with placeholder images
  const friends: Friend[] = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Full Stack Developer",
      description: "Passionate about creating scalable web applications and mentoring aspiring developers. Loves hiking and photography.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "San Francisco, CA",
      skills: ["React", "Node.js", "Python", "AWS"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson"
      }
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "UX Designer & Researcher",
      description: "Designing human-centered experiences that bridge technology and empathy. Advocate for inclusive design practices.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "New York, NY",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen"
      }
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      title: "Data Scientist",
      description: "Turning data into insights that drive meaningful change. Passionate about machine learning and sustainable technology.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      location: "Austin, TX",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        github: "https://github.com/michaelrodriguez"
      }
    },
    {
      id: 4,
      name: "Emma Thompson",
      title: "DevOps Engineer",
      description: "Building robust infrastructure and promoting collaboration between development and operations teams. Yoga enthusiast.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "Seattle, WA",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/emmathompson",
        github: "https://github.com/emmathompson"
      }
    },
    {
      id: 5,
      name: "David Kim",
      title: "Mobile App Developer",
      description: "Creating beautiful and performant mobile experiences. Interested in AR/VR technologies and their potential for human connection.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Los Angeles, CA",
      skills: ["React Native", "Swift", "Flutter", "Firebase"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/davidkim",
        github: "https://github.com/davidkim",
        twitter: "https://twitter.com/davidkim"
      }
    },
    {
      id: 6,
      name: "Priya Patel",
      title: "Product Manager",
      description: "Bridging the gap between user needs and technical solutions. Advocate for ethical technology and digital wellness.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      location: "Chicago, IL",
      skills: ["Product Strategy", "User Analytics", "Agile", "Stakeholder Management"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/priyapatel",
        twitter: "https://twitter.com/priyapatel"
      }
    },
    {
      id: 7,
      name: "James Wilson",
      title: "Blockchain Developer",
      description: "Building decentralized applications and exploring the future of finance. Believes in technology's power to democratize opportunities.",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      location: "Miami, FL",
      skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/jameswilson",
        github: "https://github.com/jameswilson"
      }
    },
    {
      id: 8,
      name: "Lisa Zhang",
      title: "Cybersecurity Specialist",
      description: "Protecting digital assets and educating others about security best practices. Passionate about privacy rights and digital freedom.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      location: "Boston, MA",
      skills: ["Penetration Testing", "Network Security", "Incident Response", "Risk Assessment"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/lisazhang",
        github: "https://github.com/lisazhang"
      }
    }
  ];

  return (
    <div className="friends-page">
      <div className="container">
        <section className="friends-hero">
          <h1>My Amazing Friends</h1>
          <p className="lead">
            These are the incredible people who inspire me, challenge me, and share 
            in this beautiful journey of growth and discovery. Each brings unique 
            perspectives and talents to our shared community.
          </p>
        </section>

        <section className="friends-grid-section">
          <div className="friends-grid">
            {friends.map((friend) => (
              <div key={friend.id} className="friend-card">
                <div className="friend-image-container">
                  <img 
                    src={friend.image} 
                    alt={friend.name}
                    className="friend-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=6366f1&color=fff&size=150`;
                    }}
                  />
                </div>
                
                <div className="friend-content">
                  <h3 className="friend-name">{friend.name}</h3>
                  <p className="friend-title">{friend.title}</p>
                  <p className="friend-location">📍 {friend.location}</p>
                  <p className="friend-description">{friend.description}</p>
                  
                  <div className="friend-skills">
                    {friend.skills.map((skill, index) => (
                      <span key={index} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                  
                  <div className="friend-social">
                    {friend.socialLinks.linkedin && (
                      <a href={friend.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                        💼 LinkedIn
                      </a>
                    )}
                    {friend.socialLinks.github && (
                      <a href={friend.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                        🐙 GitHub
                      </a>
                    )}
                    {friend.socialLinks.twitter && (
                      <a href={friend.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                        🐦 Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="friends-footer">
          <div className="connect-invitation">
            <h2>Want to Connect?</h2>
            <p>
              If you're working on something interesting or just want to chat about 
              technology, spirituality, or life in general, I'd love to meet you too!
            </p>
            <a href="/contact" className="btn btn-primary">Get in Touch</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Friends;