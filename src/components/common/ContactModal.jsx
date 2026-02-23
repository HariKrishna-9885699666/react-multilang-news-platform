import { useState } from 'react';
import './ContactModal.css';

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = {
    name: 'Hari Krishna Anem',
    role: 'B.Tech (CSIT)',
    location: 'Hyderabad, India',
    phone: '+91 9885699666',
    email: 'anemharikrishna@gmail.com',
    github: 'HariKrishna-9885699666',
    linkedin: 'anemharikrishna',
    blog: 'hashnode.com/@HariKrishna-9885699666',
    portfolio: 'harikrishna.is-a-good.dev',
  };

  return (
    <>
      <button
        className="floating-contact-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Contact Information"
        title="Contact Developer"
      >
        <svg
          className="contact-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="card-header">
              <div className="user-avatar">HK</div>
              <div className="user-info">
                <h3 className="user-name">{contactInfo.name}</h3>
                <p className="user-role">{contactInfo.role}</p>
                <p className="user-location">📍 {contactInfo.location}</p>
              </div>
            </div>

            <div className="card-body">
              <div className="contact-grid">
                <a href={`tel:${contactInfo.phone}`} className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span className="contact-text">{contactInfo.phone}</span>
                </a>
                <a href={`mailto:${contactInfo.email}`} className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span className="contact-text">Email</span>
                </a>
                <a href={`https://github.com/${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="contact-icon">💻</span>
                  <span className="contact-text">GitHub</span>
                </a>
                <a href={`https://linkedin.com/in/${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="contact-icon">💼</span>
                  <span className="contact-text">LinkedIn</span>
                </a>
                <a href={`https://${contactInfo.blog}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="contact-icon">✍️</span>
                  <span className="contact-text">Blog</span>
                </a>
                <a href={`https://${contactInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="contact-icon">🌐</span>
                  <span className="contact-text">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;
