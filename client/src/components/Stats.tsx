import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { animateCounter } from '../utils/effects';

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
}

const Stat: React.FC<StatProps> = ({ number, label, suffix = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && ref.current) {
      const counterElement = ref.current.querySelector('.counter') as HTMLElement;
      if (counterElement) {
        animateCounter(counterElement, number, 2000);
      }
    }
  }, [isInView, number]);

  return (
    <div className="flex-1 flex flex-col items-center text-center px-8">
      <div className="flex items-baseline gap-2 mb-4">
        <span 
          ref={ref}
          className="counter text-6xl font-black italic shimmer-text"
        >
          0
        </span>
        <span className="text-6xl font-black italic shimmer-text">{suffix}</span>
      </div>
      <span className="text-xs tracking-[0.4em] uppercase text-white/35">
        {label}
      </span>
    </div>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { number: 50000, label: 'Students Placed', suffix: '+' },
    { number: 500, label: 'Partner Companies', suffix: '+' },
    { number: 95, label: 'Success Rate', suffix: '%' },
    { number: 50, label: 'Countries', suffix: '+' }
  ];

  return (
    <section className="w-full py-20 bg-white/2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <Stat {...stat} />
              {index < stats.length - 1 && (
                <div className="hidden lg:block w-px h-20 bg-white/5" />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
