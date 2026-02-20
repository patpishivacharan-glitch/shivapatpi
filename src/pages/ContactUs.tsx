import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import "../styles/ContactUs.css";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // EmailJS configuration - You'll need to set these in your .env file
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS is properly configured
    if (!serviceId || !templateId || !publicKey || 
        publicKey === 'YOUR_PUBLIC_KEY_HERE' || 
        serviceId === 'service_shivapatpi' || 
        templateId === 'template_contact') {
      
      // EmailJS not configured, use fallback method
      console.log('EmailJS not configured, using fallback method');
      setIsSubmitting(false);
      
      const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Open email client directly
      window.open(`mailto:patpi.shivacharan@gmail.com?subject=${subject}&body=${body}`);
      
      // Reset form and show success message
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus('success');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
      return;
    }

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: 'patpi.shivacharan@gmail.com',
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    };

    try {
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Show success message
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      
      // Offer fallback option to open email client
      const fallbackEmail = () => {
        const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        window.open(`mailto:patpi.shivacharan@gmail.com?subject=${subject}&body=${body}`);
      };
      
      // Show error with fallback option
      if (window.confirm('Failed to send message through the form. Would you like to open your email client instead?')) {
        fallbackEmail();
      }
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
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

              {submitStatus === 'success' && (
                <div className="status-message success">
                  ✅ Email client opened successfully! Please send the pre-filled message.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="status-message error">
                  ❌ Failed to send message. Opening email client as backup option.
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
