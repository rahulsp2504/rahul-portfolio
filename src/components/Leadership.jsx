import React from 'react';
import './Leadership.css';

const roles = [
  {
    title: 'Tech Mentor — UpCurve',
    org: 'Target Corporation',
    period: '07/2023 – 12/2024',
    icon: '👩‍💻',
    description:
      'Mentored 3 undergraduate women in technology through Target\'s UpCurve initiative, providing guidance on software engineering career paths, technical skill development, and project portfolio building.',
  },
  {
    title: 'Joint Secretary — Rotaract Club',
    org: 'BIT Bengaluru',
    period: '08/2020 – 07/2021',
    icon: '🤝',
    description:
      'Co-organized 15+ community service and professional development events with combined attendance of 1,500+ participants, managing logistics, speaker coordination, and community outreach.',
  },
  {
    title: 'Class Representative — ECE',
    org: 'BIT Bengaluru',
    period: '08/2019 – 07/2020',
    icon: '🎓',
    description:
      'Acted as primary student-faculty liaison for the Electronics & Communication Engineering department, facilitating communication on curriculum feedback, exam schedules, and student welfare concerns.',
  },
];

export default function Leadership() {
  return (
    <section id="leadership">
      <div className="section">
        <div className="section-header">
          <span className="sec-num">{'// 05'}</span>
          <h2>Leadership</h2>
          <div className="divider" />
        </div>

        <div className="leadership-grid">
          {roles.map((role, i) => (
            <div key={i} className="leadership-card card">
              <div className="lead-icon-wrap">
                <span className="lead-icon">{role.icon}</span>
              </div>
              <div className="lead-body">
                <h3 className="lead-title">{role.title}</h3>
                <div className="lead-meta">
                  <span className="lead-org">{role.org}</span>
                  <span className="lead-dot" />
                  <span className="lead-period">{role.period}</span>
                </div>
                <p className="lead-desc">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
