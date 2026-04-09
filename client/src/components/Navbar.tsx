import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { magneticButton } from '../utils/effects';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = ['Features', 'How It Works', 'Testimonials', 'Pricing'];

  return (
    <>
      {/* Progress Bar */}
      <div className="scroll-progress" />
      
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div
          className={`flex items-center justify-center gap-8 px-8 py-4 rounded-full backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? 'bg-black/90 border border-white/10 shadow-[0_0_0_1px_rgba(201,168,76,0.15),0_24px_48px_rgba(0,0,0,0.6)] scale-95'
              : 'bg-black/60 border border-white/6 shadow-[0_0_0_1px_rgba(201,168,76,0.08),0_12px_24px_rgba(0,0,0,0.3)]'
          }`}
        >
          {/* Logo with Gold Dot Separator */}
          <div className="flex items-center gap-3">
            <span className="text-white font-black text-xl italic tracking-[0.02em]">ELITEX</span>
            <span className="w-2 h-2 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full shadow-[0_0_12px_rgba(201,168,76,0.6)] animate-pulse" />
            <span className="shimmer-text font-black text-xl tracking-[0.02em]">AI</span>
          </div>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-xs text-white/40 hover:text-white transition-all duration-300 tracking-[0.05em] hover:tracking-[0.08em] hover:text-gold-400 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button - Hidden on Mobile */}
          <button className="hidden lg:block magnetic px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-300 text-black font-black text-xs tracking-[0.12em] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.5),0_0_60px_rgba(201,168,76,0.2)] hover:scale-105">
            ACCESS PLATFORM
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/60 hover:text-white transition-colors duration-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-white font-black text-2xl italic">ELITEX</span>
                <span className="w-3 h-3 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full shadow-[0_0_12px_rgba(201,168,76,0.6)]" />
                <span className="shimmer-text font-black text-2xl">AI</span>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl text-white/60 hover:text-white hover:text-gold-400 transition-all duration-300 tracking-[0.05em]"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                onClick={() => setMobileMenuOpen(false)}
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-300 text-black font-black text-sm tracking-[0.12em] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.5),0_0_60px_rgba(201,168,76,0.2)]"
              >
                ACCESS PLATFORM
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
