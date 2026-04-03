import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe, Zap, Shield, Users, TrendingUp } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  stat?: string;
  statLabel?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  tag, 
  stat, 
  statLabel 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="spotlight-card p-12 relative group"
    >
      {/* Tag */}
      {tag && (
        <div className="absolute top-6 right-6">
          <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs font-black text-gold-500">
            {tag}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="w-14 h-14 rounded-full border border-gold-500/30 bg-gold-500/6 backdrop-blur-10 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(201,168,76,0.3)] group-hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] transition-shadow duration-300">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-sm text-white/45 leading-[1.8] mb-6">{description}</p>

      {/* Stat */}
      {stat && (
        <div className="pt-6 border-t border-white/6">
          <div className="text-gold-500 font-bold text-lg">{stat}</div>
          <div className="text-silver-400 text-xs">{statLabel}</div>
        </div>
      )}
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-gold-500" />,
      title: "AI-Powered Matching",
      description: "Advanced machine learning algorithms analyze your profile and match you with perfect internship opportunities based on skills, preferences, and career goals.",
      tag: "NEW",
      stat: "98% Match Accuracy",
      statLabel: "Based on 50K+ placements"
    },
    {
      icon: <Globe className="w-6 h-6 text-gold-500" />,
      title: "Global Opportunities",
      description: "Access internships from leading companies worldwide. From Silicon Valley startups to Fortune 500 giants, your next career move awaits.",
      tag: "GLOBAL",
      stat: "50+ Countries",
      statLabel: "Active partnerships"
    },
    {
      icon: <Zap className="w-6 h-6 text-gold-500" />,
      title: "Instant Applications",
      description: "Apply to multiple internships with a single click. Our streamlined process reduces application time from hours to minutes.",
      tag: "LIVE",
      stat: "30 Sec Apply",
      statLabel: "Average application time"
    },
    {
      icon: <Shield className="w-6 h-6 text-gold-500" />,
      title: "Verified Companies",
      description: "All partner companies undergo rigorous verification. Rest assured you're applying to legitimate, high-quality opportunities.",
      stat: "100% Verified",
      statLabel: "Company screening"
    },
    {
      icon: <Users className="w-6 h-6 text-gold-500" />,
      title: "Mentorship Network",
      description: "Connect with industry professionals who provide guidance, review your applications, and help you navigate your career path.",
      stat: "1000+ Mentors",
      statLabel: "Active professionals"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-gold-500" />,
      title: "Career Analytics",
      description: "Track your application progress, analyze trends, and get insights on how to improve your chances of landing your dream internship.",
      stat: "95% Success Rate",
      statLabel: "Students placed"
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
            CAPABILITIES
          </div>
          <h2 className="text-6xl font-black text-white mb-2">
            BUILT FOR
          </h2>
          <h2 className="text-6xl font-black shimmer-text">
            THE BEST.
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
