import React, { useState } from "react";
import "../styles/ContactUs.css";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "patpi.shivacharan@gmail.com",
      link: "patpi.shivacharan@gmail.com",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "/in/shivapatpi",
      link: "https://www.linkedin.com/in/shiva-patpi-62994a6/",
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "@shivapatpi",
      link: "https://github.com/patpishivacharan-glitch/",
    },
    {
      icon: "🐦",
      title: "Twitter",
      value: "@shivapatpi",
      link: "https://twitter.com/shivapatpi",
    },
  ];

  return (
    <div className="contact-page">
      <div className="container">
        <section className="contact-hero">
          <h1>Let's Connect</h1>
          <p className="lead">
            I'd love to hear from you! Whether you want to collaborate on a
            project, discuss technology, share spiritual insights, or just say
            hello.
          </p>
        </section>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Feel free to reach out through any of these channels. I typically
              respond within 24-48 hours.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="contact-method"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-icon">{method.icon}</span>
                  <div className="contact-details">
                    <h4>{method.title}</h4>
                    <span>{method.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="availability">
              <h3>Availability</h3>
              <p>I'm generally available for:</p>
              <ul>
                <li>Technical consultations and collaborations</li>
                <li>Speaking engagements on technology and spirituality</li>
                <li>Mentoring and coaching sessions</li>
                <li>Open source project contributions</li>
                <li>Meaningful conversations and connections</li>
              </ul>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a Message</h2>

              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="collaboration">
                    Collaboration Opportunity
                  </option>
                  <option value="technical">Technical Discussion</option>
                  <option value="spiritual">Spiritual Conversation</option>
                  <option value="mentoring">Mentoring Request</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, question, or just say hello!"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
