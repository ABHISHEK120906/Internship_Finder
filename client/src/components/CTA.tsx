import React from 'react';
import { motion } from 'framer-motion';
import { magneticButton } from '../utils/effects';

const CTA: React.FC = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-radial from-gold-500/8 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-[80px] font-black leading-[0.9] mb-8">
          <div className="text-white">START YOUR</div>
          <div className="shimmer-text">JOURNEY TODAY.</div>
          <div 
            className="text-transparent"
            style={{ 
              WebkitTextStroke: '2px rgba(201,168,76,0.5)'
            }}
          >
            TODAY.
          </div>
        </h2>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="magnetic border-glow-animated px-16 py-5 bg-gradient-to-r from-gold-500 to-gold-300 text-black font-black text-sm tracking-[0.12em] rounded-full shadow-[0_0_60px_rgba(201,168,76,0.5),0_0_120px_rgba(201,168,76,0.2),0_0_200px_rgba(201,168,76,0.08)] hover:shadow-[0_0_80px_rgba(201,168,76,0.6),0_0_160px_rgba(201,168,76,0.3),0_0_240px_rgba(201,168,76,0.12)] text-lg relative overflow-hidden group"
        >
          <span className="relative z-10">CREATE FREE ACCOUNT →</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTA;
