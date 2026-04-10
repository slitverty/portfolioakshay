import React from 'react';
import { motion } from 'framer-motion';
import akshoyImg from '../assets/akshoy.png';
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
            <img
              src={data?.image || akshoyImg}
              alt="About Akshoy"
              className="about-photo"
            />
            <div className="glow-backdrop"></div>
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

          <div className="tools-mastered-section">
            <h3 className="tools-title">TOOLS THAT I HAVE MASTERED</h3>
            <div className="tools-grid">

              {/* Cubase */}
              <div className="tool-icon-wrapper" title="Cubase">
                <div className="tool-icon-wrapper" title="Cubase">
                  <img
                    src="/cubase.png"
                    alt="Cubase"
                    className="tool-img"
                  />
                </div>
              </div>

              {/* Waves */}
              <div className="tool-icon-wrapper" title="Waves">
                <div className="tool-icon-wrapper" title="Waves">
                  <img
                    src="/waves.png"
                    alt="Waves"
                    className="tool-img"
                  />
                </div>
              </div>

              {/* Kontakt */}
              <div className="tool-icon-wrapper" title="Kontakt">
                <div className="tool-icon-wrapper" title="Kontakt">
                  <img
                    src="/kontakt.png"
                    alt="Kontakt"
                    className="tool-img"
                  />
                </div>
              </div>

              {/* Universal Audio */}
              <div className="tool-icon-wrapper" title="Universal Audio">
                <svg viewBox="0 0 100 100" className="tool-svg ua-svg">
                  <rect width="100" height="100" rx="20" fill="#000000" />
                  <path d="M50,15 L95,45 L50,75 L5,45 Z" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
                  <path
                    d="M 32 30 Q 38 30 38 34 L 38 53 C 38 65 48 65 48 53 L 48 24 C 48 18 58 18 58 25 L 58 55 C 58 60 62 60 64 56"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    fill="none"
                  />
                  <path d="M 46 45 L 82 44.5 L 82 45.5 L 46 47 Z" fill="#FFFFFF" />
                  <text x="69" y="41" fill="#FFFFFF" fontSize="7" fontFamily="sans-serif" fontWeight="bold">INC.</text>
                  <text x="50" y="90" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">UNIVERSAL AUDIO</text>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
