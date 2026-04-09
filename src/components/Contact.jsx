import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Headphones } from 'lucide-react';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Let's Create</h2>
          <p className="contact-text">
            Interested in collaborating on a track, need mixing/mastering services, or just want to connect? 
            Reach out through the form or social channels.
          </p>
          
          <div className="social-links-lg">
            <a href="#" className="social-icon"><FaYoutube /></a>
            <a href="#" className="social-icon"><Headphones /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="mailto:hello@akshoysarkar.com" className="social-icon"><Mail /></a>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </motion.div>
      </div>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Akshoy Sarkar. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;
