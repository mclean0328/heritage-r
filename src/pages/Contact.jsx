import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const { error } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email,
        message: form.message,
      });

      if (error) throw error;

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have a question or want to get involved? Reach out below.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-card">
            <span className="contact-icon">&#x2709;</span>
            <h3>Email</h3>
            <p>hello@heritage-r.com</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">&#x1F4CD;</span>
            <h3>Massachusetts</h3>
            <p>USA</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">&#x1F554;</span>
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Tell us about your build, ask a question, or just say hello..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'sent' && (
            <p className="form-success">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="form-error">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
