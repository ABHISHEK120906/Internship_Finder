import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalEffects } from '../hooks/useEffects';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  useGlobalEffects();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Timeline />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
