import React from 'react';
import { motion } from 'framer-motion';

interface TimelineStepProps {
  number: string;
  title: string;
  description: string;
  position: 'above' | 'below';
  delay: number;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ 
  number, 
  title, 
  description, 
  position,
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'above' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`flex flex-col ${position === 'above' ? 'items-start mb-8' : 'items-start mt-8'} lg:w-1/4 relative`}
    >
      {/* Large faded number background */}
      <div className="absolute text-[180px] lg:text-[200px] font-black text-white/4 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {number}
      </div>

      {/* Content */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-sm text-silver-400 leading-[1.7] max-w-xs">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Profile',
      description: 'Build your comprehensive profile with skills, projects, and career preferences.',
      position: 'above' as const
    },
    {
      number: '02',
      title: 'AI Matching',
      description: 'Our AI analyzes your profile and matches you with the best opportunities.',
      position: 'below' as const
    },
    {
      number: '03',
      title: 'Apply Instantly',
      description: 'Apply to multiple internships with one click and track applications in real-time.',
      position: 'above' as const
    },
    {
      number: '04',
      title: 'Get Placed',
      description: 'Land your dream internship and kickstart your career with top companies.',
      position: 'below' as const
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs tracking-[0.5em] uppercase text-gold-500/60 mb-4">
            PROCESS
          </div>
          <h2 className="text-5xl font-black text-white mb-4">
            HOW IT
          </h2>
          <h2 className="text-5xl font-black shimmer-text">
            WORKS
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative py-20">
          {/* Gold Connecting Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent -translate-y-1/2 origin-left"
          />

          {/* Zigzag Timeline Steps */}
          <div className="relative flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
            {steps.map((step, index) => (
              <div key={index} className="relative w-full lg:w-1/4">
                {/* Gold Dot */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full shadow-[0_0_30px_rgba(201,168,76,0.8)] animate-pulse" />
                </motion.div>

                {/* Step Content - Zigzag Layout */}
                <div className={`relative ${index % 2 === 0 ? 'lg:pr-8 lg:text-left' : 'lg:pl-8 lg:text-right'} ${index % 2 === 0 ? 'lg:items-start' : 'lg:items-end'} flex items-center justify-center lg:justify-start lg:min-h-[200px]`}>
                  <TimelineStep 
                    {...step} 
                    delay={0.4 + index * 0.1}
                    position={index % 2 === 0 ? 'above' : 'below'}
                  />
                </div>

                {/* Connecting Line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-gold-500/20 to-transparent transform translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
