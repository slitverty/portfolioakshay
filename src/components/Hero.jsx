import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = ({ data }) => {
  const subtitleParts = data?.subtitle ? data.subtitle.split('|') : ["Singer ", " Sound Engineer"];
  
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
          <h1 className="hero-title glow-text">{data?.title || "Akshoy Sarkar"}</h1>
          <p className="hero-subtitle">
            {subtitleParts[0]} <span className="divider">|</span> {subtitleParts[1]}
          </p>
        </motion.div>
        
        <motion.button
          className="cta-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={() => {
            document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore My Work
          <ChevronDown className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
