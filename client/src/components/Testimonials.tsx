import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  college: string;
  initials: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  role, 
  college, 
  initials 
}) => {
  return (
    <div className="spotlight-card p-8 relative min-w-[350px]">
      {/* Quote Marks */}
      <div className="absolute top-4 left-4 text-6xl text-gold-500/15 font-serif">
        "
      </div>

      {/* Quote */}
      <p className="text-sm text-white/60 italic leading-[1.8] mb-6 relative z-10">
        {quote}
      </p>

      {/* Author Section */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.3)]">
          <span className="text-black font-black text-sm">{initials}</span>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="font-bold text-white">{author}</div>
          <div className="text-gold-500 text-sm">{role}</div>
          <div className="text-silver-400 text-xs">{college}</div>
        </div>

        {/* Stars */}
        <div className="text-gold-500 text-sm">
          {'★'.repeat(5)}
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "ELITEX AI completely transformed my internship search. The AI matching was spot-on and I landed my dream internship at a top tech company within 2 weeks.",
      author: "Priya Sharma",
      role: "Software Engineer Intern",
      college: "IIT Delhi",
      initials: "PS"
    },
    {
      quote: "The platform's analytics helped me understand my strengths and improve my profile. The mentorship network is invaluable for career guidance.",
      author: "Rahul Kumar",
      role: "Data Science Intern",
      college: "IIT Bombay",
      initials: "RK"
    },
    {
      quote: "From application to placement, the entire process was seamless. The instant apply feature saved me hours of work!",
      author: "Ananya Patel",
      role: "Product Management Intern",
      college: "IIT Madras",
      initials: "AP"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled through one complete cycle
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
    };

    const interval = setInterval(scroll, 16);

    // Pause on hover
    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => {
      setInterval(scroll, 16);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden">
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
            SUCCESS STORIES
          </div>
          <h2 className="text-5xl font-black text-white mb-4">
            WHAT OUR
          </h2>
          <h2 className="text-5xl font-black shimmer-text">
            STUDENTS SAY
          </h2>
        </motion.div>

        {/* Infinite Scrolling Carousel */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Original testimonials */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
            
            {/* Duplicated testimonials for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`duplicate-${index}`} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
