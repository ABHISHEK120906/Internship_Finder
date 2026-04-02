import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck, 
  Rocket, 
  Users, 
  Award, 
  ArrowRight, 
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Building,
  Star,
  CheckCircle,
  Play,
  Menu,
  Phone,
  Globe as LinkIcon,
  User as UserIcon,
  MessageCircle,
  X,
  Mail
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
    const targetStats = { students: 1247, companies: 89, placement: 98, countries: 50 };
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
      icon: Brain, 
      title: 'AI MATCHMAKING', 
      desc: 'Neural-powered algorithms connect elite talent with premium opportunities at scale.',
      color: 'gold',
      details: ['Machine Learning', 'Skill Analysis', 'Perfect Matches']
    },
    { 
      icon: ShieldCheck, 
      title: 'ENTERPRISE SECURITY', 
      desc: 'Military-grade encryption and real-time threat monitoring for every session.',
      color: 'silver',
      details: ['256-bit Encryption', 'Real-time Monitoring', 'GDPR Compliant']
    },
    { 
      icon: Globe, 
      title: 'GLOBAL NETWORK', 
      desc: 'Access curated opportunities from Fortune 500 companies across 50+ countries worldwide.',
      color: 'gold',
      details: ['50+ Countries', 'Fortune 500', 'Global Reach']
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Register',
      desc: 'Create your profile and showcase your skills to top companies',
      icon: Users
    },
    {
      step: '02',
      title: 'AI Match',
      desc: 'Our intelligent algorithm matches you with perfect opportunities',
      icon: Brain
    },
    {
      step: '03',
      title: 'Apply',
      desc: 'One-click applications to multiple companies instantly',
      icon: Target
    },
    {
      step: '04',
      title: 'Get Placed',
      desc: 'Land your dream job with our comprehensive support system',
      icon: Award
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Google',
      image: 'SC',
      quote: 'ELITEX AI helped me land my dream job at Google. The AI matching was incredibly accurate!',
      rating: 5,
      college: 'IIT Bombay'
    },
    {
      name: 'Rahul Kumar',
      role: 'Frontend Developer',
      company: 'Microsoft',
      image: 'RK',
      quote: 'The platform streamlined my job search and connected me with amazing opportunities.',
      rating: 5,
      college: 'IIT Delhi'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Scientist',
      company: 'Amazon',
      image: 'PS',
      quote: 'Best career decision I made! The AI recommendations were spot-on.',
      rating: 5,
      college: 'IIT Madras'
    }
  ];

  const stats = [
    { number: animatedStats.students, label: 'Registered Students', suffix: '+', icon: Users },
    { number: animatedStats.companies, label: 'Partner Companies', suffix: '+', icon: Building },
    { number: animatedStats.placement, label: 'Placement Rate', suffix: '%', icon: TrendingUp },
    { number: animatedStats.countries, label: 'Countries', suffix: '+', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-silver-border' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-primary to-gold-light rounded-lg flex items-center justify-center">
                <Brain className="text-black" size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter">
                ELITEX <span className="gold-text">AI</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['PLATFORM', 'SECURITY', 'ENTERPRISE', 'CAREERS'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-sm font-bold uppercase tracking-wider text-silver-primary hover:text-gold-primary transition-all"
                >
                  {link}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')} 
                className="hidden md:block px-6 py-2 border border-gold-primary text-gold-primary rounded-lg font-bold text-sm hover:bg-gold-primary hover:text-black transition-all"
              >
                GET ACCESS
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
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-silver-border"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {['PLATFORM', 'SECURITY', 'ENTERPRISE', 'CAREERS'].map((link) => (
                  <a 
                    key={link} 
                    href="#" 
                    className="block text-sm font-bold uppercase tracking-wider text-silver-primary hover:text-gold-primary transition-all py-2"
                  >
                    {link}
                  </a>
                ))}
                <button 
                  onClick={() => navigate('/login')} 
                  className="w-full px-6 py-2 bg-gold-primary text-black rounded-lg font-bold text-sm hover:brightness-110 transition-all"
                >
                  GET ACCESS
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-silver-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gold-primary/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-gold-subtle border border-gold-primary/30 rounded-full"
            >
              <Sparkles className="text-gold-primary" size={16} />
              <span className="text-sm font-bold text-gold-primary uppercase tracking-wider">
                AI-POWERED PLACEMENT PLATFORM
              </span>
              <Sparkles className="text-gold-primary" size={16} />
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
            >
              <div className="text-white">REDEFINE YOUR</div>
              <div className="gold-text gold-glow mt-2">CAREER.</div>
              <div className="text-white mt-2">TRAJECTORY.</div>
            </motion.h1>
            
            {/* Sub Text */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-silver-primary max-w-3xl mx-auto leading-relaxed"
            >
              The most intelligent AI-powered internship and placement ecosystem — 
              engineered for the next generation of tech professionals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <button 
                onClick={() => navigate('/login')} 
                className="group px-8 py-4 bg-gradient-to-r from-gold-primary to-gold-light text-black rounded-lg font-black text-lg hover:shadow-xl hover:shadow-gold-primary/50 transition-all flex items-center gap-3"
              >
                ACCESS PLATFORM 
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </button>
              <button className="group px-8 py-4 border border-silver-border text-silver-primary rounded-lg font-black text-lg hover:border-gold-primary hover:text-gold-primary transition-all flex items-center gap-3">
                <Play size={20} />
                WATCH DEMO
              </button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className="text-gold-primary" size={20} />
                    <div className="text-4xl md:text-5xl font-black gold-text">
                      {stat.number}{stat.suffix}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-silver-primary uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-silver-subtle border border-silver-border rounded-full mb-6">
              <Star className="text-silver-primary" size={16} />
              <span className="text-sm font-bold text-silver-primary uppercase tracking-wider">
                WHAT WE OFFER
              </span>
              <Star className="text-silver-primary" size={16} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              <span className="text-white">PLATFORM</span>{' '}
              <span className="gold-text">CAPABILITIES</span>
            </h2>
            <p className="text-silver-primary max-w-2xl mx-auto">
              Cutting-edge features designed to accelerate your career journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                <div className="h-full p-8 bg-black-card border border-silver-border rounded-2xl hover:border-gold-primary transition-all">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                    feature.color === 'gold' ? 'bg-gold-subtle' : 'bg-silver-subtle'
                  }`}>
                    <feature.icon 
                      className={
                        feature.color === 'gold' ? 'text-gold-primary' : 'text-silver-primary'
                      } 
                      size={32} 
                    />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-silver-primary mb-6">
                    {feature.desc}
                  </p>
                  <div className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="text-gold-primary" size={16} />
                        <span className="text-sm text-silver-primary">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-black-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold-subtle border border-gold-primary/30 rounded-full mb-6">
              <Rocket className="text-gold-primary" size={16} />
              <span className="text-sm font-bold text-gold-primary uppercase tracking-wider">
                HOW IT WORKS
              </span>
              <Rocket className="text-gold-primary" size={16} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              <span className="text-white">YOUR PATH TO</span>{' '}
              <span className="gold-text">SUCCESS</span>
            </h2>
            <p className="text-silver-primary max-w-2xl mx-auto">
              Four simple steps to launch your career with ELITEX AI
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gold-primary/20 border-2 border-gold-primary rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="text-gold-primary" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-primary text-black rounded-full flex items-center justify-center font-black text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-black mb-3 text-white">{step.title}</h3>
                <p className="text-silver-primary">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-silver-subtle border border-silver-border rounded-full mb-6">
              <Award className="text-silver-primary" size={16} />
              <span className="text-sm font-bold text-silver-primary uppercase tracking-wider">
                SUCCESS STORIES
              </span>
              <Award className="text-silver-primary" size={16} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              <span className="text-white">STUDENT</span>{' '}
              <span className="gold-text">TESTIMONIALS</span>
            </h2>
            <p className="text-silver-primary max-w-2xl mx-auto">
              Hear from our successful alumni who landed their dream jobs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                <div className="h-full p-8 bg-black-card border border-silver-border rounded-2xl hover:border-gold-primary transition-all">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-gold-primary fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-silver-primary mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold-primary/20 border border-gold-primary rounded-full flex items-center justify-center font-black text-gold-primary">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-silver-primary">{testimonial.role} at {testimonial.company}</p>
                      <p className="text-xs text-gold-primary">{testimonial.college}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-gold-primary/10 to-gold-light/10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              <span className="text-white">READY TO LAUNCH</span>{' '}
              <span className="gold-text">YOUR CAREER?</span>
            </h2>
            <p className="text-xl text-silver-primary">
              Join 1000+ students on ELITEX AI and start your journey to success
            </p>
            <button 
              onClick={() => navigate('/login')} 
              className="px-8 py-4 bg-gradient-to-r from-gold-primary to-gold-light text-black rounded-lg font-black text-lg hover:shadow-xl hover:shadow-gold-primary/50 transition-all flex items-center gap-3 mx-auto"
            >
              GET STARTED FREE 
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-silver-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-primary to-gold-light rounded-lg flex items-center justify-center">
                  <Brain className="text-black" size={24} />
                </div>
                <span className="font-black text-2xl tracking-tighter">
                  ELITEX <span className="gold-text">AI</span>
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
              <div className="flex gap-4 mb-4">
                <a href="#" className="w-10 h-10 bg-black-card border border-silver-border rounded-lg flex items-center justify-center hover:border-gold-primary transition-colors">
                  <LinkIcon className="text-silver-primary" size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-black-card border border-silver-border rounded-lg flex items-center justify-center hover:border-gold-primary transition-colors">
                  <UserIcon className="text-silver-primary" size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-black-card border border-silver-border rounded-lg flex items-center justify-center hover:border-gold-primary transition-colors">
                  <MessageCircle className="text-silver-primary" size={18} />
                </a>
              </div>
              <div className="space-y-2">
                <a href="mailto:info@elitex.ai" className="flex items-center gap-2 text-silver-primary hover:text-gold-primary text-sm transition-colors">
                  <Mail size={16} /> info@elitex.ai
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-silver-primary hover:text-gold-primary text-sm transition-colors">
                  <Phone size={16} /> +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-silver-border text-center">
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
