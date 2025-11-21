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

  const experiences = [
    {
      period: '2023 - Present',
      title: 'Full Stack Software Developer',
      company: 'Microsoft',
      companyIcon: '/icons/microsoft-logo.svg',
      description: 'Leading full-stack development projects, mentoring junior developers, and implementing best practices for code quality and performance optimization.'
    },
    {
      period: '2022 - 2023',
      title: 'Software Developer',
      company: 'Mindtree Consulting Pvt Limited',
      companyIcon: '/icons/mindtree-logo.svg',
      description: 'Developed and maintained web applications using modern JavaScript frameworks, collaborated with cross-functional teams, and contributed to system architecture decisions.'
    },
    {
      period: '2020 - 2022',
      title: 'Customer Engineer',
      company: 'AzTechSoft',
      companyIcon: '/icons/aztechsoft-logo.svg',
      description: 'Provided technical support and solutions to enterprise customers, implemented custom integrations, and optimized system performance for large-scale deployments.'
    },
    {
      period: '2016 - 2020',
      title: 'DevOps Engineer',
      company: 'Infotech Enterprises',
      companyIcon: '/icons/infotech-enterprises-logo.svg',
      description: 'Automated deployment pipelines, managed cloud infrastructure, and established CI/CD best practices to improve development workflow and system reliability.'
    },
    {
      period: '2013 - 2016',
      title: 'Program Manager',
      company: 'Microsoft',
      companyIcon: '/icons/microsoft-logo.svg',
      description: 'Coordinated cross-functional teams, managed project timelines, and ensured successful delivery of software products while maintaining quality standards.'
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
            {experiences.map((experience, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-date">{experience.period}</div>
                <div className="timeline-content">
                  <div className="experience-header">
                    <div className="company-info">
                      <img 
                        src={experience.companyIcon} 
                        alt={`${experience.company} logo`} 
                        className="company-icon"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div>
                        <h3>{experience.title}</h3>
                        <h4 className="company-name">{experience.company}</h4>
                      </div>
                    </div>
                  </div>
                  <p>{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Technical;