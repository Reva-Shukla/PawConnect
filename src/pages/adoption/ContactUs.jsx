
import { useState } from 'react';
import './SupportPages.css';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href =
      `mailto:letsconnectpaws@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="support-page">
      <div className="support-card">
        <h1>Contact Us 🐾</h1>
        <p>
          Have a question about pet adoption or rescue?
          We would love to hear from you.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows="5"
            required
          />

          <button type="submit" className="support-button">
            Send Message
          </button>
        </form>

        <p className="support-email">
          Or email us at{' '}
          <a href="mailto:letsconnectpaws@gmail.com">
            letsconnectpaws@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
