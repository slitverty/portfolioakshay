import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Headphones } from 'lucide-react';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import './Works.css';

const projects = [
  {
    id: 1,
    title: "Vocal Performance 1",
    role: "Vocals",
    description: "An emotional and dynamic vocal performance, showcasing range and control.",
    videoUrl: "https://www.youtube.com/embed/BejBpmafsXE",
    spotifyUrl: "",
    instaUrl: ""
  },
  {
    id: 2,
    title: "Acoustic Session",
    role: "Vocals & Sound Engineering",
    description: "A stripped-down acoustic session, carefully mixed to retain the natural warmth of the room.",
    videoUrl: "https://www.youtube.com/embed/N8v7CiJEMLA",
    spotifyUrl: ""
  },
  {
    id: 3,
    title: "Studio Mix 1",
    role: "Sound Engineering",
    description: "A complex studio mix where punchy drums and clear vocals sit perfectly together.",
    videoUrl: "https://www.youtube.com/embed/EGiuvAgGKac",
    instaUrl: ""
  },
  {
    id: 4,
    title: "Vocal Performance 2",
    role: "Vocals",
    description: "Live raw vocal performance emphasizing clarity and emotional nuance.",
    videoUrl: "https://www.youtube.com/embed/-Ak45SmoeJM",
  },
  {
    id: 5,
    title: "Studio Mix 2",
    role: "Mixing & Mastering",
    description: "Mastered for streaming platforms with optimal loudness and stereo width.",
    videoUrl: "https://www.youtube.com/embed/m0BSdUmepS4",
  }
];

const WorkItem = ({ project, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  return (
    <div className="work-item" ref={ref}>
      <motion.div 
        className="work-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="video-container">
          {/* We only render the iframe if it's in view, or just handle autoplay. Here we use an iframe placeholder. */}
          <div className={`video-wrapper ${inView ? 'active-video' : ''}`}>
            {inView ? (
              <iframe 
                src={`${project.videoUrl}?autoplay=1&mute=1&controls=0&loop=1`} 
                title={project.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
               <div className="video-placeholder"></div>
            )}
          </div>
          <div className="video-glow"></div>
        </div>

        <div className="work-details">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="work-title">{project.title}</h2>
            <div className="work-role">{project.role}</div>
            <p className="work-desc">{project.description}</p>
            
            <div className="work-links">
              {project.videoUrl && (
                <a href={project.videoUrl} target="_blank" rel="noreferrer" className="icon-link yt-link">
                  <FaYoutube /> <span>Watch</span>
                </a>
              )}
              {project.spotifyUrl && (
                <a href={project.spotifyUrl} target="_blank" rel="noreferrer" className="icon-link sp-link">
                  <Headphones /> <span>Listen</span>
                </a>
              )}
              {project.instaUrl && (
                <a href={project.instaUrl} target="_blank" rel="noreferrer" className="icon-link ig-link">
                  <FaInstagram /> <span>Cover</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Works = () => {
  return (
    <section id="works" className="works-section">
      <div className="works-parallax-container">
        {projects.map((proj, idx) => (
          <WorkItem key={proj.id} project={proj} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Works;
