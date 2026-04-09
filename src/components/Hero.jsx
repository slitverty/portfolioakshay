import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = ({ data }) => {
  const renderTitle = (title) => {
    const textToRender = title || "Akshoy Sarkar (Akash)";
    const parts = textToRender.split(/(\(.*\))/);
    return parts.map((part, index) => {
      if (part.startsWith('(') && part.endsWith(')')) {
        return <span key={index} className="hero-title-alias">{part}</span>;
      }
      return part.trim();
    });
  };

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
          <h1 className="hero-title glow-text">{renderTitle(data?.title)}</h1>
          <p className="hero-subtitle">
            {data?.subtitle || "Music Producer"}
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
