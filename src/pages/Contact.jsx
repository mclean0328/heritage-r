export default function Contact() {
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

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name" />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Tell us about your build, ask a question, or just say hello..." />
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
}
