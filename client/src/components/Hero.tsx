import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TextScramble, createParticles, magneticButton } from '../utils/effects';

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Initialize particle system
    createParticles();

    // Initialize text scramble effect
    if (headingRef.current) {
      const scramble = new TextScramble(headingRef.current);
      setTimeout(() => {
        scramble.setText('REDEFINE YOUR CAREER TRAJECTORY.');
      }, 1200);
    }

    // Initialize magnetic buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => magneticButton(el as HTMLElement));
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Gold Glow Top Left */}
      <div className="absolute inset-0 opacity-100">
        <div className="absolute -top-[10%] -left-[10%] w-[1200px] h-[900px] rounded-full bg-gradient-radial from-gold-500/12 to-transparent" />
      </div>

      {/* Silver Glow Bottom Right */}
      <div className="absolute inset-0 opacity-100">
        <div className="absolute -bottom-[10%] -right-[10%] w-[800px] h-[600px] rounded-full bg-gradient-radial from-silver-400/6 to-transparent" />
      </div>

      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8"
        >
          <div className="px-5 py-2 bg-gold-500/6 border border-gold-500/30 rounded-full">
            <span className="shimmer-text text-xs font-black tracking-[0.4em]">
              ◆ THE FUTURE OF PLACEMENT IS HERE ◆
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-[96px] font-black leading-[0.95] tracking-[-0.03em]">
            <div className="text-white" style={{ textShadow: '0 0 80px rgba(255,255,255,0.1)' }}>
              REDEFINE
            </div>
            <div className="text-[108px] shimmer-text mb-2" style={{ textShadow: '0 0 80px rgba(201,168,76,0.3), 0 0 160px rgba(201,168,76,0.1)' }}>
              YOUR CAREER
            </div>
            <div 
              ref={headingRef}
              className="text-white/15"
              style={{ 
                WebkitTextStroke: '1px rgba(255,255,255,0.3)'
              }}
            >
              TRAJECTORY.
            </div>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="max-w-[480px] text-center text-base text-white/45 leading-[1.8] tracking-[0.01em] mb-12"
        >
          The most intelligent AI-powered placement ecosystem. Built for India's top tech talent.
        </motion.p>

        {/* Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button className="magnetic border-glow-animated px-12 py-4 bg-gradient-to-r from-gold-500 to-gold-300 text-black font-black text-sm tracking-[0.12em] rounded-full shadow-[0_0_40px_rgba(201,168,76,0.4),0_0_80px_rgba(201,168,76,0.15)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5),0_0_120px_rgba(201,168,76,0.2),0_0_200px_rgba(201,168,76,0.08)] relative overflow-hidden group">
            <span className="relative z-10">ACCESS PLATFORM →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </button>
          
          <button className="px-10 py-4 bg-white/4 border border-white/8 text-white/60 font-bold text-sm tracking-[0.05em] rounded-full hover:bg-white/8 hover:border-gold-500/30 hover:text-white transition-all duration-300">
            WATCH DEMO
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-gold-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-500/50 rounded-full mt-2 animate-bounce" />
          </div>
          <span className="text-xs text-silver-400">SCROLL</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
