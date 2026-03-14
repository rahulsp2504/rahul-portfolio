import React from 'react';
import './App.css';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { isDark } = useTheme();
  return (
    <div className={`App ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
