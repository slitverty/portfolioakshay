import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Headphones } from 'lucide-react';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = ({ data }) => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Using environment variables. Make sure to define these in your .env file
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    if (serviceId === "YOUR_SERVICE_ID") {
      console.error("EmailJS credentials not configured.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      title: "New Inquiry from Portfolio",
      name: e.target.name.value,
      from_email: e.target.email.value,
      email: e.target.email.value,
      message: e.target.message.value,
      time: new Date().toLocaleString()
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        console.log(result.text);
        setSubmitStatus('success');
        setIsSubmitting(false);
        e.target.reset();
      }, (error) => {
        console.error(error.text);
        setSubmitStatus('error');
        setIsSubmitting(false);
      });
  };
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
          <h2 className="section-title">Connect With Me</h2>
          <p className="contact-text">
            {data?.text}
          </p>

          <div className="social-links-lg">
            <a
              href="https://www.youtube.com/@akashtuness"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.instagram.com/akashtunes_/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaInstagram />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                formRef.current?.querySelector('input[name="name"]')?.focus();
              }}
              className="social-icon email-link"
              title="akash4akshoy@gmail.com"
            >
              <Mail />
              <span className="email-text">email us at akash4akshoy@gmail.com</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
            <input type="hidden" name="title" value="New Inquiry from Portfolio" />
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && <p className="success-msg" style={{ color: '#4ade80', marginTop: '1rem', textAlign: 'center' }}>Message sent successfully!</p>}
            {submitStatus === 'error' && <p className="error-msg" style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>Failed to send message. Check console or credentials.</p>}
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
