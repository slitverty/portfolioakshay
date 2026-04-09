import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import './Covers.css';

const Covers = ({ data }) => {
  return (
    <section className="section covers-section">
      <div className="container">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Covers
        </motion.h2>
        
        <div className="covers-grid">
          {(data || []).map((cover, idx) => (
            <motion.div 
              key={cover.id || idx}
              className="cover-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="cover-image">
                <div className="placeholder-viz" style={{ backgroundImage: `url(${cover.img})` }}></div>
                <div className="cover-overlay">
                  <div className="play-btn">
                    <Play fill="white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Covers;
