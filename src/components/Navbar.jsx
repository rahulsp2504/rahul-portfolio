import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const navLinks = [
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isDark ? '' : 'navbar-light'}`}>
      <div className="navbar-inner">
        <a href="#hero" className="nav-logo">rsp<span>.dev</span></a>

        <ul className="nav-links">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="nav-link">{label}</a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/rahulsp2504"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-github"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            transition: 'color 0.2s',
            border: '1px solid var(--border)',
            padding: '0.35rem 0.8rem',
            marginRight: '0.5rem',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--neon)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          ⌥ GitHub
        </a>

        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          <span className="toggle-icon">☀️</span>
          <div className={`toggle-track ${isDark ? 'toggle-dark' : ''}`}>
            <div className={`toggle-thumb ${isDark ? 'toggle-thumb-dark' : ''}`} />
          </div>
          <span className="toggle-icon">🌙</span>
        </button>

        <a
          href="https://drive.google.com/file/d/1np8cH452nQHTeSC_MNPFq-vZAFFqvB-a/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta hire-me-btn"
        >
          Resume
        </a>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
