import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Store Hours Optimization',
    period: '12/2024 – 03/2025',
    description:
      'Built ARIMA-based time series models analyzing retail footfall, average cart size, and hourly sales to recommend optimal store operating hours, reducing overhead while maximizing revenue windows.',
    chips: ['ARIMA', 'Python', 'Time Series', 'Retail Analytics'],
    chipColor: 'amber',
    icon: '📈',
  },
  {
    title: 'COVID-19 SpO₂ Monitor',
    period: '08/2021 – 08/2022',
    description:
      'Designed an IoT-based blood oxygen monitoring system with real-time dashboard and automated alert system for healthcare staff, enabling early detection of SpO₂ drops in patient cohorts.',
    chips: ['IoT', 'Embedded C', 'Dashboard', 'Real-time'],
    chipColor: 'blue',
    icon: '🩺',
  },
  {
    title: 'Diabetes Prediction Model',
    period: '03/2022 – 05/2022',
    description:
      'Implemented a KNN-based supervised learning classifier on the Pima Indians Diabetes dataset, applying feature normalization and cross-validated hyperparameter tuning for clinical predictive accuracy.',
    chips: ['KNN', 'Scikit-learn', 'Python', 'ML'],
    chipColor: 'amber',
    icon: '🧬',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="section">
        <div className="section-header">
          <span className="sec-num">{'// 03'}</span>
          <h2>Projects</h2>
          <div className="divider" />
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <div key={i} className="project-card card">
              <div className="proj-top">
                <span className="proj-icon">{proj.icon}</span>
                <span className="proj-period">{proj.period}</span>
              </div>
              <h3 className="proj-title">{proj.title}</h3>
              <p className="proj-desc">{proj.description}</p>
              <div className="proj-chips">
                {proj.chips.map((chip) => (
                  <span key={chip} className={`chip chip-${proj.chipColor}`}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
