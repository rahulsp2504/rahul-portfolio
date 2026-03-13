import React from 'react';
import './Skills.css';

const skillGroups = [
  {
    title: 'Languages',
    icon: '{ }',
    color: 'neon',
    skills: ['Python', 'Java', 'C', 'C++', 'Embedded C', 'MATLAB'],
  },
  {
    title: 'Geospatial',
    icon: '🌐',
    color: 'neon2',
    skills: ['ArcGIS Enterprise', 'ESRI', 'ArcGIS Server', 'OSRM', 'Bing Routes'],
  },
  {
    title: 'Backend & Data',
    icon: '⚙',
    color: 'neon3',
    skills: ['Kafka', 'REST APIs', 'Postgres', 'Linux', 'Git'],
  },
  {
    title: 'Frontend & Tools',
    icon: '◈',
    color: 'neon4',
    skills: ['React', 'RTOS', 'Agile / Scrum', 'Stakeholder Comms'],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section">
        <div className="section-header">
          <span className="sec-num">{'// 04'}</span>
          <h2>Skills</h2>
          <div className="divider" />
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className={`skill-card card skill-${group.color}`}>
              <div className="skill-card-header">
                <span className="skill-icon">{group.icon}</span>
                <h3 className="skill-title">{group.title}</h3>
              </div>
              <div className="skill-badges">
                {group.skills.map((skill) => (
                  <span key={skill} className={`skill-badge badge-${group.color}`}>
                    {skill}
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
