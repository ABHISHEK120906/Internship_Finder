import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { animateCounter } from '../utils/effects';

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
  index: number;
}

const Stat: React.FC<StatProps> = ({ number, label, suffix = '', index }) => {
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
    <div className="flex-1 flex flex-col items-center text-center px-8 relative">
      <div className="flex items-baseline gap-1 mb-2">
        <span 
          ref={ref}
          className="counter text-7xl lg:text-8xl font-black italic shimmer-text"
        >
          0
        </span>
        <span className="text-7xl lg:text-8xl font-black italic shimmer-text">{suffix}</span>
      </div>
      <span className="text-sm tracking-[0.2em] uppercase text-silver-400 font-light">
        {label}
      </span>
      {index < 3 && (
        <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
      )}
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
    <section className="w-full py-20 bg-black border-y border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between py-12">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <Stat {...stat} index={index} />
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
