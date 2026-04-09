import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Works from '../components/Works';
import Covers from '../components/Covers';
import Contact from '../components/Contact';

const Portfolio = ({ data }) => {
  return (
    <div className="portfolio-content">
      <Hero data={data.hero} />
      <About data={data.about} />
      <Works data={data.works} />
      <Covers data={data.covers} />
      <Contact data={data.contact} />
    </div>
  );
};

export default Portfolio;
