import React from 'react';
import '../styles/Technical.css';

const Technical: React.FC = () => {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Redux'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'Java', 'REST APIs', 'GraphQL'] },
    { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Linux', 'VS Code', 'Jira'] }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack React application with Node.js backend and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      title: 'Task Management System',
      description: 'Collaborative project management tool with real-time updates',
      technologies: ['TypeScript', 'React', 'Socket.io', 'PostgreSQL']
    },
    {
      title: 'Weather Analytics Dashboard',
      description: 'Data visualization dashboard for weather patterns and analytics',
      technologies: ['Python', 'Django', 'Chart.js', 'REST APIs']
    }
  ];

  return (
    <div className="technical-page">
      <div className="container">
        <section className="technical-hero">
          <h1>Technical Skills & Experience</h1>
          <p className="lead">
            Passionate about building scalable solutions and staying current with 
            emerging technologies. Here's an overview of my technical expertise.
          </p>
        </section>

        <section className="skills-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <div key={index} className="skill-category">
                <h3>{skillGroup.category}</h3>
                <div className="skill-items">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="projects-section">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="experience-section">
          <h2>Professional Experience</h2>
          <div className="experience-timeline">
            <div className="timeline-item">
              <div className="timeline-date">2022 - Present</div>
              <div className="timeline-content">
                <h3>Senior Software Developer</h3>
                <p>Leading full-stack development projects, mentoring junior developers, and implementing best practices for code quality and performance optimization.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2020 - 2022</div>
              <div className="timeline-content">
                <h3>Full Stack Developer</h3>
                <p>Developed and maintained web applications using modern JavaScript frameworks, collaborated with cross-functional teams, and contributed to system architecture decisions.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Technical;