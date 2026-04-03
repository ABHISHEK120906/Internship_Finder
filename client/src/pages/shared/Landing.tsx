import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  ArrowRight,
  Sparkles,
  Play,
  Menu,
  X,
  ShieldCheck,
  Globe,
  Users,
  Award,
  Star,
  Zap,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    companies: 0,
    placement: 0,
    countries: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targetStats = { students: 1000, companies: 200, placement: 95, countries: 50 };
    const duration = 2000;
    const steps = 60;
    const increment = {
      students: targetStats.students / steps,
      companies: targetStats.companies / steps,
      placement: targetStats.placement / steps,
      countries: targetStats.countries / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedStats({
          students: Math.floor(increment.students * currentStep),
          companies: Math.floor(increment.companies * currentStep),
          placement: Math.floor(increment.placement * currentStep),
          countries: Math.floor(increment.countries * currentStep)
        });
        currentStep++;
      } else {
        setAnimatedStats(targetStats);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { 
      icon: Zap, 
      title: 'AI MATCHMAKING', 
      desc: 'Neural-powered algorithms connect elite talent with premium opportunities at scale — with 98% accuracy rate.',
      stat: '98% Match Accuracy',
      color: 'gold'
    },
    { 
      icon: ShieldCheck, 
      title: 'ENTERPRISE SECURITY', 
      desc: 'Military-grade AES-256 encryption with real-time threat monitoring protecting every session.',
      stat: '256-bit Encrypted',
      color: 'silver'
    },
    { 
      icon: Globe, 
      title: 'GLOBAL NETWORK', 
      desc: 'Access curated opportunities from Fortune 500 companies across 50+ countries worldwide.',
      stat: '50+ Countries',
      color: 'gold'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Register',
      desc: 'Create your profile and showcase your skills to top companies'
    },
    {
      step: '02',
      title: 'AI Match',
      desc: 'Our intelligent algorithm matches you with perfect opportunities'
    },
    {
      step: '03',
      title: 'Apply',
      desc: 'One-click applications to multiple companies instantly'
    },
    {
      step: '04',
      title: 'Get Placed',
      desc: 'Land your dream job with our comprehensive support system'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'SDE Intern @ Google',
      college: 'IIT Bombay, 2024',
      initials: 'RS',
      quote: 'ELITEX AI helped me land my dream internship at Google. The AI matching was incredibly accurate.',
      rating: 5
    },
    {
      name: 'Priya Patel',  
      role: 'Software Engineer @ Microsoft',
      college: 'VJTI Mumbai, 2024',
      initials: 'PP',
      quote: 'The Forage integration and career roadmap section is gold. Got placed at Microsoft in 3 months.',
      rating: 5
    },
    {
      name: 'Arjun Singh',
      role: 'Data Scientist @ Amazon',
      college: 'IIT Delhi, 2024',
      initials: 'AS',
      quote: 'Best placement platform for Indian tech students. The AI resume analyzer is next level.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass bg-black/95 border-b border-gold-primary/30' : 'bg-black/80'
      }`}>
        <div className="px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-primary to-gold-light rounded-lg flex items-center justify-center">
                <Brain className="text-black" size={18} />
              </div>
              <span className="font-black text-2xl tracking-wider italic">
                ELITEX <span className="text-gold-primary">•</span> <span className="text-gold-primary">AI</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['PLATFORM', 'SECURITY', 'ENTERPRISE', 'CAREERS'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="relative text-sm font-bold uppercase tracking-widest text-silver-primary hover:text-white group"
                >
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-primary group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')} 
                className="btn-3d px-6 py-2 text-sm"
              >
                GET ACCESS →
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gold-primary"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
          <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-gold-primary/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-silver-primary/4 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 glass border border-gold-primary/40 rounded-full mb-8 animate-slide-up"
          >
            <Sparkles className="text-gold-primary" size={16} />
            <span className="text-xs font-bold text-gold-primary uppercase tracking-[0.3em]">
              POWERED BY CLAUDE AI
            </span>
            <Sparkles className="text-gold-primary" size={16} />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="font-black text-[80px] leading-none mb-8"
          >
            <div className="text-white animate-slide-up" style={{ animationDelay: '0.1s' }}>REDEFINE YOUR</div>
            <div className="text-gold-primary animate-slide-up mt-2" style={{ 
              animationDelay: '0.2s',
              textShadow: '0 0 80px rgba(201,168,76,0.5)'
            }}>CAREER.</div>
            <div className="text-white animate-slide-up mt-2" style={{ animationDelay: '0.3s' }}>TRAJECTORY.</div>
          </motion.h1>
          
          {/* Sub Text */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="text-silver-primary text-lg max-w-[560px] mx-auto leading-relaxed mb-12 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            The most intelligent AI-powered placement ecosystem — 
            engineered for the next generation of tech professionals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
          >
            <button 
              onClick={() => navigate('/login')} 
              className="btn-3d px-12 py-[18px] text-[14px]"
            >
              ACCESS PLATFORM →
            </button>
            <button className="px-12 py-[18px] glass border border-silver-primary/30 text-silver-primary rounded-lg font-black text-[14px] hover:border-gold-primary hover:text-gold-primary transition-all flex items-center gap-3">
              <Play size={20} />
              WATCH DEMO ▶
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-2 animate-float"
          >
            <ChevronDown className="text-gold-primary" size={20} />
            <span className="text-xs text-silver-primary uppercase tracking-[0.3em]">
              SCROLL TO EXPLORE
            </span>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full bg-gold-primary/5 border-t border-b border-gold-primary/15 py-10">
        <div className="max-w-6xl mx-auto px-16">
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-gold-primary text-[48px] font-black mb-2 animate-counter">
                {animatedStats.students}+
              </div>
              <div className="text-silver-primary text-[13px] font-bold uppercase tracking-wider">
                Students
              </div>
            </div>
            <div className="text-center border-l border-gold-primary/15">
              <div className="text-gold-primary text-[48px] font-black mb-2 animate-counter">
                {animatedStats.companies}+
              </div>
              <div className="text-silver-primary text-[13px] font-bold uppercase tracking-wider">
                Companies
              </div>
            </div>
            <div className="text-center border-l border-gold-primary/15">
              <div className="text-gold-primary text-[48px] font-black mb-2 animate-counter">
                {animatedStats.placement}%
              </div>
              <div className="text-silver-primary text-[13px] font-bold uppercase tracking-wider">
                Placement
              </div>
            </div>
            <div className="text-center border-l border-gold-primary/15">
              <div className="text-gold-primary text-[48px] font-black mb-2 animate-counter">
                {animatedStats.countries}+
              </div>
              <div className="text-silver-primary text-[13px] font-bold uppercase tracking-wider">
                Countries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 glass border border-gold-primary/30 rounded-full mb-6">
              <Sparkles className="text-gold-primary" size={16} />
              <span className="text-xs font-bold text-gold-primary uppercase tracking-[0.4em]">
                ✦ WHAT WE OFFER ✦
              </span>
              <Sparkles className="text-gold-primary" size={16} />
            </div>
            <h2 className="text-[48px] font-black tracking-tighter mb-4">
              <span className="text-silver-primary">PLATFORM</span>{' '}
              <span className="text-gold-primary">CAPABILITIES</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.2 }}
                className="card-3d p-8"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                  feature.color === 'gold' ? 'bg-gold-primary/20 border border-gold-primary/30' : 'bg-silver-primary/10 border border-silver-primary/30'
                }`}>
                  <feature.icon 
                    className={
                      feature.color === 'gold' ? 'text-gold-primary' : 'text-silver-primary'
                    } 
                    size={32} 
                  />
                </div>
                <h3 className="text-white text-[20px] font-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-silver-primary text-[14px] leading-[1.7] mb-6">
                  {feature.desc}
                </p>
                <div className="pt-4 border-t border-gold-primary/30">
                  <span className="text-gold-primary text-sm font-bold">
                    {feature.stat}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-black-card">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 glass border border-gold-primary/30 rounded-full mb-6">
              <Sparkles className="text-gold-primary" size={16} />
              <span className="text-xs font-bold text-gold-primary uppercase tracking-[0.4em]">
                ✦ HOW IT WORKS ✦
              </span>
              <Sparkles className="text-gold-primary" size={16} />
            </div>
            <h2 className="text-[48px] font-black tracking-tighter mb-4">
              <span className="text-white">YOUR PATH TO</span>{' '}
              <span className="text-gold-primary">SUCCESS</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-gold-primary/20 via-gold-primary/60 to-gold-primary/20 hidden md:block"></div>
            
            {howItWorks.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.2 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 glass border border-gold-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold-primary text-[48px] font-black opacity-40">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-white text-[18px] font-black mb-3">{step.title}</h3>
                <p className="text-silver-primary text-[13px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 glass border border-gold-primary/30 rounded-full mb-6">
              <Star className="text-gold-primary" size={16} />
              <span className="text-xs font-bold text-gold-primary uppercase tracking-[0.4em]">
                ✦ SUCCESS STORIES ✦
              </span>
              <Star className="text-gold-primary" size={16} />
            </div>
            <h2 className="text-[48px] font-black tracking-tighter mb-4">
              <span className="text-white">STUDENT</span>{' '}
              <span className="text-gold-primary">TESTIMONIALS</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.2 }}
                className="card-3d p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-gold-primary fill-current" size={16} />
                  ))}
                </div>
                <p className="text-silver-primary mb-6 italic text-[14px] leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold-primary/20 border border-gold-primary rounded-full flex items-center justify-center font-black text-gold-primary text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-silver-primary">{testimonial.role}</p>
                    <p className="text-xs text-gold-primary">{testimonial.college}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-gold-primary/10 to-gold-light/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-[48px] font-black tracking-tighter">
              <span className="text-white">READY TO LAUNCH</span>{' '}
              <span className="text-gold-primary">YOUR CAREER?</span>
            </h2>
            <p className="text-xl text-silver-primary">
              Join 1000+ students on ELITEX AI and start your journey to success
            </p>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-3d px-12 py-4 text-lg mx-auto"
            >
              GET STARTED FREE 
              <ArrowRight size={20} className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-silver-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-primary to-gold-light rounded-lg flex items-center justify-center">
                  <Brain className="text-black" size={24} />
                </div>
                <span className="font-black text-2xl tracking-tighter">
                  ELITEX <span className="text-gold-primary">AI</span>
                </span>
              </div>
              <p className="text-silver-primary text-sm">
                The most intelligent AI-powered placement ecosystem for tech professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                {['Features', 'Security', 'Enterprise', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-silver-primary hover:text-gold-primary text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-silver-primary hover:text-gold-primary text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="mailto:info@elitex.ai" className="flex items-center gap-2 text-silver-primary hover:text-gold-primary text-sm transition-colors">
                  info@elitex.ai
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-silver-primary hover:text-gold-primary text-sm transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-silver-primary/20 text-center">
            <p className="text-silver-primary text-sm">
              © 2024 ELITEX AI. All rights reserved. Built with ❤️ for Indian tech students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
