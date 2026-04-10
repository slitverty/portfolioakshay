import React, { useState, useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion';
import './Covers.css';

const getInstagramEmbed = (url) => {
  if (!url) return "";
  // Ensure the URL ends with /embed/
  const baseUrl = url.split("?")[0].replace(/\/$/, ""); 
  return `${baseUrl}/embed`;
};

const CoverItem = ({ cover, idx }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) setHasBeenVisible(true);
  }, [inView]);

  return (
    <motion.div 
      ref={ref}
      className="cover-item"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="cover-video-container">
        {hasBeenVisible || inView ? (
          <iframe
            className="instagram-frame"
            src={getInstagramEmbed(cover.videoUrl || cover.img)}
            title={cover.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="loading-spinner"></div>
        )}
      </div>
    </motion.div>
  );
};

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
            <CoverItem key={cover.id || idx} cover={cover} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Covers;
