import React from 'react';
import './Hero.css';

const stats = [
  {
    value: '46%',
    label: 'Reduction in manual work via automation',
    color: 'neon',
    delay: '0.1s',
  },
  {
    value: '27%',
    label: 'Accuracy lift in AI expression detection',
    color: 'neon2',
    delay: '0.25s',
  },
  {
    value: '23%',
    label: 'Data accuracy improvement via geocoding',
    color: 'neon3',
    delay: '0.4s',
  },
];

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background glow */}
      <div className="hero-glow" />

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>Engineer</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-first">Rahul</span>
            <span className="hero-last">Pandit</span>
          </h1>

          <p className="hero-subtitle">
            M.S. Computer Engineering <span className="neon">@</span> UC Irvine
            <br />
            Ex Software Engineer <span className="neon">@</span> Target
            <br />
            <span className="hero-spec"> Full Stack Engineering · Geospatial · AI Systems · </span>
          </p>


          <div className="hero-actions">
            <a href="#career-map" className="btn btn-primary">
              <span>Explore Journey</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="hero-right">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-card stat-${s.color}`}
              style={{ animationDelay: s.delay }}
            >
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
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
