import React from 'react';
import { motion } from 'framer-motion';
import { magneticButton } from '../utils/effects';

const CTA: React.FC = () => {
  return (
    <section className="relative min-h-screen px-4 overflow-hidden flex items-center justify-center">
      {/* Particle Effect Background */}
      <div className="absolute inset-0">
        {/* Multiple gradient orbs for particle effect */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-gold-500/6 to-transparent animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500/4 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-radial from-gold-500/8 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        <h2 className="text-[120px] lg:text-[160px] font-black leading-[0.8] mb-12">
          <div className="text-white mb-4" style={{ textShadow: '0 0 120px rgba(255,255,255,0.2)' }}>
            START YOUR
          </div>
          <div className="shimmer-text mb-4" style={{ textShadow: '0 0 120px rgba(201,168,76,0.4), 0 0 240px rgba(201,168,76,0.2)' }}>
            JOURNEY
          </div>
          <div 
            className="text-[120px] lg:text-[160px] font-black"
            style={{ 
              WebkitTextStroke: '2px rgba(201,168,76,0.6)',
              color: 'transparent',
              textShadow: '0 0 80px rgba(201,168,76,0.3)'
            }}
          >
            TODAY.
          </div>
        </h2>

        {/* Gold glow behind heading */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold-500/10 blur-[100px] -z-10" />

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="magnetic border-glow-animated px-20 py-6 bg-gradient-to-r from-gold-500 to-gold-300 text-black font-black text-lg tracking-[0.12em] rounded-full shadow-[0_0_80px_rgba(201,168,76,0.6),0_0_160px_rgba(201,168,76,0.3),0_0_240px_rgba(201,168,76,0.12)] hover:shadow-[0_0_100px_rgba(201,168,76,0.8),0_0_200px_rgba(201,168,76,0.4),0_0_300px_rgba(201,168,76,0.16)] text-xl relative overflow-hidden group"
        >
          <span className="relative z-10">CREATE FREE ACCOUNT</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTA;
