import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { magneticButton } from '../utils/effects';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize magnetic buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => magneticButton(el as HTMLElement));
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div
        className={`flex items-center gap-8 px-6 py-3 rounded-full backdrop-blur-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 border border-white/8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_48px_rgba(0,0,0,0.4)]'
            : 'bg-black/60 border border-white/6'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-lg italic">ELITEX</span>
          <span className="text-gold-500 font-black text-lg animate-pulse">•</span>
          <span className="shimmer-text font-black text-lg">AI</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {['Features', 'How It Works', 'Testimonials', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-xs text-white/50 hover:text-white transition-colors duration-200 tracking-[0.05em] hover:tracking-[0.08em]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button className="magnetic px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-300 text-black font-black text-xs tracking-[0.12em] rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.3),0_0_40px_rgba(201,168,76,0.15)]">
          ACCESS PLATFORM →
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
