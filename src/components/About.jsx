import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Sliders } from 'lucide-react';
import './About.css';

const About = () => {
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
            {/* Visual placeholder for Akshoy portrait */}
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
          <h2 className="section-title">The Journey</h2>
          <p className="about-text">
            Bridging the gap between raw emotion and technical perfection. As a vocalist and sound engineer, 
            I craft auditory experiences that resonate. Every track is a canvas, and sound is my medium.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <Mic className="feature-icon" />
              <h3>Vocalist</h3>
              <p>Soulful renditions, dynamic range, and emotional storytelling through voice.</p>
            </div>
            
            <div className="feature-card">
              <Sliders className="feature-icon" />
              <h3>Sound Engineer</h3>
              <p>Precision mixing, spatial mastering, and pristine audio production.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
