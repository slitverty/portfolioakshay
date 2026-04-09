import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Sliders } from 'lucide-react';
import './About.css';

const About = ({ data }) => {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <motion.div
          className="about-image-container"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-image">
            <div className="image-placeholder">
              <div className="glow-backdrop"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="about-text">
            {data?.text}
          </p>

          <div className="features-grid">
            {data?.features?.map((feature, idx) => (
              <div className="feature-card" key={idx}>
                {idx === 0 ? <Mic className="feature-icon" /> : <Sliders className="feature-icon" />}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
