import React from 'react';
import './Education.css';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="section-header">
        <span className="sec-num">// 01</span>
        <h2>Education</h2>
        <div className="divider"></div>
      </div>

      <div className="education-grid">
        {/* UCI Card */}
        <div className="edu-card uci-card">
          <div className="edu-top-bar uci-bar"></div>
          <div className="edu-header">
            <span className="edu-emoji">🎓</span>
            <div className="edu-title-group">
              <h3 className="edu-degree">M.S. Computer Engineering</h3>
              <p className="edu-inst">University of California, Irvine</p>
            </div>
          </div>

          <div className="edu-details">
            <div className="edu-row">
              <span className="edu-label">PERIOD</span>
              <span className="edu-value">Aug 2025 – Dec 2026</span>
            </div>
            <div className="edu-row">
              <span className="edu-label">STATUS</span>
              <span className="edu-value status-badge status-progress">IN PROGRESS →</span>
            </div>
            <div className="edu-row">
              <span className="edu-label">EXPECTED</span>
              <span className="edu-value">Dec 2026</span>
            </div>
          </div>

          <div className="edu-divider"></div>

          <div className="edu-coursework">
            <span className="edu-subtitle">COURSEWORK</span>
            <div className="course-chips">
              <span className="course-chip">Computer Architecture</span>
              <span className="course-chip">Network Science</span>
              <span className="course-chip">System Software</span>
              <span className="course-chip">Design & Analysis of Algorithms</span>
            </div>
          </div>

          <div className="edu-divider"></div>

          <div className="edu-location">
            <span className="edu-subtitle">LOCATION</span>
            <span className="edu-loc-text">Irvine, California, USA</span>
          </div>
        </div>

        {/* BIT Card */}
        <div className="edu-card bit-card">
          <div className="edu-top-bar bit-bar"></div>
          <div className="edu-header">
            <span className="edu-emoji">🏛️</span>
            <div className="edu-title-group">
              <h3 className="edu-degree">B.E. Electronics & Communication Engineering</h3>
              <p className="edu-inst">Bangalore Institute of Technology</p>
            </div>
          </div>

          <div className="edu-details">
            <div className="edu-row">
              <span className="edu-label">PERIOD</span>
              <span className="edu-value">Aug 2018 – Jul 2022</span>
            </div>
            <div className="edu-row">
              <span className="edu-label">STATUS</span>
              <span className="edu-value status-badge status-completed">COMPLETED ✓</span>
            </div>
            <div className="edu-row">
              <span className="edu-label">CGPA</span>
              <span className="edu-value">8.59 / 10.0</span>
            </div>
          </div>

          <div className="edu-divider"></div>

          <div className="edu-coursework">
            <span className="edu-subtitle">COURSEWORK</span>
            <div className="course-chips">
              <span className="course-chip">Data Structures & Algorithms</span>
              <span className="course-chip">Digital Signal Processing</span>
              <span className="course-chip">Embedded Systems</span>
              <span className="course-chip">Microprocessors & Microcontrollers</span>
              <span className="course-chip">Computer Networks</span>
              <span className="course-chip">VLSI Design</span>
            </div>
          </div>

          <div className="edu-divider"></div>

          <div className="edu-location">
            <span className="edu-subtitle">LOCATION</span>
            <span className="edu-loc-text">Bengaluru, Karnataka, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
