import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Zap, Rocket, Users, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { 
      icon: Zap, 
      title: 'AI MATCHMAKING', 
      desc: 'Neural-powered algorithms connect elite talent with premium opportunities at scale.',
      color: 'gold'
    },
    { 
      icon: ShieldCheck, 
      title: 'ENTERPRISE SECURITY', 
      desc: 'Military-grade encryption and real-time threat monitoring for every session.',
      color: 'silver'
    },
    { 
      icon: Globe, 
      title: 'GLOBAL NETWORK', 
      desc: 'Access curated opportunities from Fortune 500 companies across 50+ countries worldwide.',
      color: 'gold'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students' },
    { number: '50+', label: 'Companies' },
    { number: '98%', label: 'Placement' },
    { number: 'Global', label: 'Reach' }
  ];

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-luxury text-white relative">
      
      {/* Navigation */}
      <nav className="luxury-navbar fixed top-0 left-0 right-0 z-50 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <ShieldCheck className="text-gold-primary" size={28} />
            <span className="font-black text-2xl tracking-wider">
              ELITEX <span className="gold-text">AI</span>
            </span>
         </div>
         <div className="hidden md:flex gap-10">
            {['PLATFORM', 'SECURITY', 'ENTERPRISE', 'CAREERS'].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-gold-primary transition-all"
              >
                {link}
              </a>
            ))}
         </div>
         <button 
           onClick={() => navigate('/login')} 
           className="silver-btn"
         >
           GET ACCESS
         </button>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-10 flex flex-col items-center justify-center min-h-screen text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-6xl space-y-12"
        >
            {/* Top Badge */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-gold-primary opacity-50"></span>
              <span className="badge-gold">
                ✦ AI-POWERED PLACEMENT PLATFORM
              </span>
              <span className="w-12 h-[1px] bg-gold-primary opacity-50"></span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
              <div className="text-white">REDEFINE YOUR</div>
              <div className="gold-text gold-glow mt-2">CAREER.</div>
              <div className="text-white mt-2">TRAJECTORY.</div>
            </h1>
            
            {/* Sub Text */}
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              The most intelligent AI-powered internship and placement ecosystem — 
              engineered for the next generation of tech professionals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
               <button 
                 onClick={() => navigate('/login')} 
                 className="gold-btn text-lg flex items-center gap-4 group shadow-lg"
               >
                 ACCESS PLATFORM <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
               <button className="silver-btn">
                 WATCH DEMO
               </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-16 pt-12 border-t border-gold-primary opacity-20">
              {stats.map((stat, i) => (
                <div key={i} className="stats-card">
                  <div className="stats-number">{stat.number}</div>
                  <div className="stats-label">{stat.label}</div>
                </div>
              ))}
            </div>
        </motion.div>

        {/* Features Section */}
        <section className="w-full max-w-6xl mt-32 mb-20">
          <div className="text-center mb-16">
            <div className="badge-gold mb-6">✦ WHAT WE OFFER ✦</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              <span className="silver-text">PLATFORM</span>{' '}
              <span className="gold-text">CAPABILITIES</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {features.map((feature, idx) => (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 whileInView={{ opacity: 1, scale: 1 }} 
                 viewport={{ once: true }} 
                 className="feature-card text-center group"
               >
                  <feature.icon 
                    className={`mb-8 mx-auto ${
                      feature.color === 'gold' ? 'text-gold-primary' : 'text-silver-primary'
                    }`} 
                    size={48} 
                    strokeWidth={2} 
                  />
                  <h3 className="text-2xl font-black tracking-tighter mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {feature.desc}
                  </p>
               </motion.div>
             ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 relative z-10 text-center border-t border-silver-border">
         <p className="text-xs font-black uppercase tracking-widest text-text-muted">
           © 2026 ELITEX AI. ENGINEERED FOR EXCELLENCE.
         </p>
         <div className="mt-8 flex justify-center gap-8">
            <Sparkles className="text-gold-primary opacity-30" size={20} />
            <Sparkles className="text-gold-primary opacity-50" size={20} />
            <Sparkles className="text-gold-primary opacity-30" size={20} />
         </div>
      </footer>
    </div>
  );
};

export default Landing;
