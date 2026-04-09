import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Headphones } from "lucide-react";
import { FaYoutube, FaInstagram } from "react-icons/fa";

import "./Works.css";

// ✅ Convert YouTube URL → Embed URL
const getEmbedUrl = (url) => {
  if (!url) return "";
  let videoId = "";

  if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
  }
  return url;
};

// ✅ Convert Spotify link → Embed
const getSpotifyEmbed = (url) => {
  if (!url) return null;
  const trackId = url.split("track/")[1]?.split("?")[0];
  return `https://open.spotify.com/embed/track/${trackId}`;
};

const WorkItem = ({ project, index }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Once visible, keep the iframe loaded to avoid constant reload flicker
  useEffect(() => {
    if (inView) setHasBeenVisible(true);
  }, [inView]);

  return (
    <motion.div
      className="work-item"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      <div ref={ref} className="work-content">

        {/* 🎬 VIDEO SECTION */}
        <div className="video-container">
          <div className={`video-wrapper ${inView ? "active-video" : ""}`}>
            {hasBeenVisible ? (
              <iframe
                className={`video-frame ${inView ? "visible" : ""}`}
                src={getEmbedUrl(project.videoUrl)}
                title={project.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="video-placeholder">
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>

          {/* 🎵 Waveform Animation */}
          {inView && (
            <div className="waveform">
              {[...Array(20)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* 📄 DETAILS */}
        <motion.div
          className="work-details"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="work-title">{project.title}</h2>
          <div className="work-role">{project.role}</div>
          <p className="work-desc">{project.description}</p>

          {/* 🎧 Spotify Player */}
          {project.spotifyUrl && hasBeenVisible && (
            <iframe
              src={getSpotifyEmbed(project.spotifyUrl)}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media"
              loading="lazy"
              className="spotify-player"
            ></iframe>
          )}

          {/* 🔗 LINKS */}
          <div className="work-links">
            {(project.youtubeUrl || project.videoUrl) && (
              <a
                href={project.youtubeUrl || project.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="icon-link yt-link"
              >
                <FaYoutube /> <span>Watch</span>
              </a>
            )}

            {project.spotifyUrl && (
              <a
                href={project.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="icon-link sp-link"
              >
                <Headphones /> <span>Listen</span>
              </a>
            )}

            {project.instaUrl && (
              <a
                href={project.instaUrl}
                target="_blank"
                rel="noreferrer"
                className="icon-link ig-link"
              >
                <FaInstagram /> <span>Cover</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Works = ({ data }) => {
  return (
    <section id="works" className="works-section">
      <div className="works-container">
        {(data || []).map((proj, idx) => (
          <WorkItem key={proj.id || idx} project={proj} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Works;