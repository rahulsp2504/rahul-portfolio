import React, { useState, useEffect } from 'react';
import './Hero.css';
import HeroMap from './HeroMap';

export default function Hero() {
  const [mapFullscreen, setMapFullscreen] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMapFullscreen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section className={`hero ${mapFullscreen ? 'has-fullscreen' : ''}`} id="hero">
      {/* Background glow */}
      <div className="hero-glow" />

      <div className={`hero-content ${mapFullscreen ? 'has-fullscreen' : ''}`}>
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="hero-tag">
              <span className="eyebrow-dot" />
              <span>Available for work</span>
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-first">Rahul</span>
            <br />
            <span className="hero-last">Pandit</span>
          </h1>

          <p className="hero-subtitle">
            M.S. Computer Engineering <span className="neon">@</span> UC Irvine
            <br />
            Ex Software Engineer <span className="neon">@</span> Target
            <br />
            <span className="hero-spec">Full Stack · Geospatial · AI Systems</span>
          </p>

          <div className="hero-actions">
            <button onClick={() => setMapFullscreen(true)} className="btn btn-primary">
              <span>Explore Journey</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>

        <div className={`hero-right ${mapFullscreen ? 'has-fullscreen' : ''}`}>
          <div className={`hero-map-wrapper ${mapFullscreen ? 'has-fullscreen' : ''}`}>
            <HeroMap fullscreen={mapFullscreen} onClose={() => setMapFullscreen(false)} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span className="scroll-text">scroll</span>
      </div>
    </section>
  );
}
