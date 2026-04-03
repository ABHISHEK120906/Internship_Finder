import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, X } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: X, href: '#', label: 'X' }
  ];

  const navLinks = ['Features', 'How It Works', 'Testimonials', 'Pricing', 'About', 'Contact'];

  return (
    <footer className="relative border-t border-white/4 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-center mb-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6 lg:mb-0">
            <span className="text-white font-black text-lg italic">ELITEX</span>
            <span className="text-gold-500 font-black text-lg">•</span>
            <span className="text-silver-400 font-black text-lg">AI</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 lg:mb-0">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-silver-400 hover:text-gold-500 transition-colors duration-200 text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <div className="text-silver-400 text-xs">
            © 2024 ELITEX AI
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-full border border-silver-400/30 flex items-center justify-center hover:border-gold-500 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300 group"
              >
                <social.icon className="w-4 h-4 text-silver-400 group-hover:text-gold-500 transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Made with love */}
          <div className="text-silver-400 text-xs">
            Made with ♥ in India
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
