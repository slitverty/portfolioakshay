import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Covers from './components/Covers';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-container">
      <Hero />
      <About />
      <Works />
      <Covers />
      <Contact />
    </div>
  );
}

export default App;
