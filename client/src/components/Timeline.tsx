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
      className={`flex flex-col ${position === 'above' ? 'items-start mb-8' : 'items-start mt-8'} lg:w-1/4`}
    >
      {/* Step Number (background) */}
      <div className="absolute text-[120px] font-black text-white/6 -z-10">
        {number}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
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
        <div className="relative">
          {/* Center Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent -translate-y-1/2 origin-left"
          />

          {/* Timeline Nodes and Steps */}
          <div className="flex flex-col lg:flex-row relative justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="w-3 h-3 bg-gold-500 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.6)] animate-pulse" />
                </motion.div>

                {/* Step Content */}
                <div className={`absolute ${index % 2 === 0 ? 'top-0' : 'bottom-0'} left-1/2 transform -translate-x-1/2 ${index % 2 === 0 ? 'translate-y-8' : '-translate-y-8'} lg:relative lg:transform-none lg:translate-x-0 lg:translate-y-0`}>
                  <TimelineStep {...step} delay={0.4 + index * 0.1} />
                </div>

                {/* Separator (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block lg:flex-1" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
