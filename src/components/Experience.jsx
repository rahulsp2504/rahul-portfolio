import React from 'react';
import './Experience.css';

const experiences = [
  {
    company: 'Target Corporation',
    role: 'Software Engineer — Geospatial & Mapping',
    location: 'Bengaluru, India',
    period: '08/2022 – 08/2025',
    color: 'neon',
    bullets: [
      <>Reduced manual location data processing by <span className="neon">46%</span> through development of Python-based ETL pipelines that automated geocoding workflows across 2,000+ store locations.</>,
      <>Improved geospatial data accuracy by <span className="neon">23%</span> by integrating Bing Routes Geocoding API, replacing legacy text-based lookups with coordinate-level precision.</>,
      <>Served as <span className="neon">ArcGIS Enterprise administrator</span>, managing ESRI platform deployments and licensing for nationwide mapping infrastructure.</>,
      <>Engineered migration from Google Maps to <span className="neon">OSRM routing engine</span>, processing <span className="neon">20,000+ routing requests/day</span> with zero downtime during cutover.</>,
      <>Built adaptive mapping services with dynamic feature layer configuration for real-time store operations including drive-through queuing and fulfillment zone management.</>,
    ],
  },
  {
    company: 'W4Talent',
    role: 'Software Engineer Intern — AI & Computer Vision',
    location: 'Bengaluru, India',
    period: '11/2020 – 04/2021',
    color: 'neon2',
    bullets: [
      <>Improved facial expression recognition model accuracy by <span className="neon2">27%</span> by implementing multi-stage data augmentation, hyperparameter tuning, and transfer learning on pre-trained CNNs.</>,
      <>Developed modular preprocessing pipeline in Python reducing inference latency and enabling real-time analysis in interview simulation platform serving 500+ users.</>,
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section">
        <div className="section-header">
          <span className="sec-num">{'// 02'}</span>
          <h2>Experience</h2>
          <div className="divider" />
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={i} className={`timeline-entry entry-${exp.color}`}>
              <div className="timeline-dot" />

              <div className="timeline-content card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-company">{exp.company}</h3>
                    <div className="exp-role">{exp.role}</div>
                  </div>
                  <div className="exp-meta">
                    <div className="exp-period">{exp.period}</div>
                    <div className="exp-location">{exp.location}</div>
                  </div>
                </div>

                <ul className="exp-bullets">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="exp-bullet">
                      <span className={`bullet-dot ${exp.color}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
