import React from 'react';
import './Contact.css';

const contactItems = [
  {
    icon: '✉',
    label: 'Email',
    value: 'rspandit@uci.edu',
    href: 'mailto:rspandit@uci.edu',
    color: 'neon',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '(949) 231-8645',
    href: 'tel:+19492318645',
    color: 'neon2',
  },
  {
    icon: '🔗',
    label: 'LinkedIn',
    value: 'linkedin.com/in/rahulsharadpandit',
    href: 'https://linkedin.com/in/rahulsharadpandit',
    color: 'neon4',
  },
  {
    icon: '⌥',
    label: 'GitHub',
    value: 'github.com/rahulsp2504',
    href: 'https://github.com/rahulsp2504',
    color: 'neon2',
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="section">
        <div className="section-header">
          <span className="sec-num">{'// 06'}</span>
          <h2>Contact</h2>
          <div className="divider" />
        </div>

        <div className="contact-panel card">
          <div className="contact-left">
            <h3 className="contact-heading">
              Let's build something
              <br />
              <span className="neon">together.</span>
            </h3>
            <p className="contact-sub">
              Open to new opportunities in geospatial engineering,
              backend systems, and applied AI. Based in Irvine, CA.
            </p>
            <div className="contact-availability">
              <span className="avail-dot" />
              <span>Available for full-time roles & collaborations</span>
            </div>
          </div>

          <div className="contact-right">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`contact-link contact-${item.color}`}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <div className="contact-icon-box">
                  <span>{item.icon}</span>
                </div>
                <div className="contact-info">
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
