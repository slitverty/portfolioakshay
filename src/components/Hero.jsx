import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="section hero-section">
      <div className="hero-background">
        <div className="gradient-sphere"></div>
        {/* Placeholder for dynamic visualizer */}
        <div className="waveform-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="hero-title glow-text">Akshoy Sarkar</h1>
          <p className="hero-subtitle">Singer <span className="divider">|</span> Sound Engineer</p>
        </motion.div>
        
        <motion.a 
          href="#works"
          className="cta-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Explore My Work
          <ChevronDown className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
