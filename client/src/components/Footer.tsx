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
    <footer className="relative border-t border-gold-500/20 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Row 1: Logo and Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-center mb-12"
        >
          {/* Logo Left */}
          <div className="flex items-center gap-3 mb-6 lg:mb-0">
            <span className="text-white font-black text-xl italic tracking-[0.02em]">ELITEX</span>
            <span className="w-2 h-2 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full shadow-[0_0_12px_rgba(201,168,76,0.6)]" />
            <span className="shimmer-text font-black text-xl tracking-[0.02em]">AI</span>
          </div>

          {/* Links Right */}
          <div className="flex flex-wrap justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-silver-400 hover:text-gold-400 transition-all duration-300 text-sm tracking-[0.05em] hover:tracking-[0.08em] relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Row 2: Social Icons and Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          {/* Social Icons with Hover Glow */}
          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-gold-500/20 flex items-center justify-center hover:border-gold-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.6)] transition-all duration-300 group hover:scale-110"
              >
                <social.icon className="w-5 h-5 text-silver-400 group-hover:text-gold-500 transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Made in India Badge */}
          <div className="flex items-center gap-2 px-4 py-2 border border-gold-500/30 rounded-full bg-gold-500/5">
            <span className="text-lg">IN</span>
            <span className="text-xs text-silver-400 font-medium">Made in India</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
