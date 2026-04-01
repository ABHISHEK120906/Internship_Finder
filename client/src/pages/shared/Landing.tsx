import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Zap, Rocket, Users, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Zap, title: 'AI Matchmaking', desc: 'Neural-powered candidate matching with 98% accuracy.' },
    { icon: ShieldCheck, title: 'Secure Gateway', desc: 'End-to-end encrypted session monitoring for admins.' },
    { icon: Globe, title: 'Global Reach', desc: 'Connect with top-tier enterprise partners worldwide.' }
  ];

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-[var(--bg-main)] text-white relative">
      
      {/* Background Animated Atmosphere */}
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/10 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[var(--primary)]/5 blur-[100px] rounded-full"></div>

      {/* Navigation (Floating Glass) */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-full max-w-5xl h-20 glass-card px-10 flex items-center justify-between z-50">
         <div className="flex items-center gap-4">
            <ShieldCheck className="text-[var(--primary)] shadow-[0_0_15px_var(--primary)]" size={28} />
            <span className="font-black italic text-xl tracking-tighter uppercase">PLACEX <span className="text-[var(--primary)]">AI</span></span>
         </div>
         <div className="hidden md:flex gap-10">
            {['Technology', 'Security', 'Enterprise'].map((link) => (
              <a key={link} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">{link}</a>
            ))}
         </div>
         <button onClick={() => navigate('/login')} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--primary)] hover:text-black transition-all">Portal Access</button>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-60 pb-40 px-10 flex flex-col items-center justify-center min-h-screen text-center z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl space-y-12">
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-white/20"></span>
              <span className="text-[10px] font-black uppercase tracking-[1em] text-[var(--primary)] animate-pulse pl-4">V 4.2.0 GLOBAL ENGINE</span>
              <span className="w-12 h-[1px] bg-white/20"></span>
            </div>
            
            <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85] neon-text">
              ARCHITECTING THE <br/> <span className="text-[var(--primary)]">FUTURE</span> OF HIRING.
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-white/40 max-w-2xl mx-auto leading-relaxed">
              The world's first AI-powered internship and placement ecosystem with real-time visitor intelligence.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
               <button onClick={() => navigate('/login')} className="premium-btn text-lg px-12 py-6 flex items-center gap-4 group">
                 GET STARTED <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
               <div className="flex items-center gap-6">
                 <div className="flex -space-x-4">
                   {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-[10px]">P</div>)}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/20 text-left">Trusted by <br/> 50+ Global Teams</p>
               </div>
            </div>
        </motion.div>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-60 max-w-6xl w-full">
           {features.map((feature, idx) => (
             <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card p-12 group hover:-translate-y-4 transition-all duration-500">
                <feature.icon className="text-[var(--primary)] mb-8" size={40} strokeWidth={2.5} />
                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{feature.title}</h4>
                <p className="text-sm font-medium text-white/30 leading-relaxed">{feature.desc}</p>
             </motion.div>
           ))}
        </section>

        {/* Global Stats Footer */}
        <section className="mt-60 grid grid-cols-2 md:grid-cols-4 gap-20 w-full max-w-5xl">
           {[ { l: 'ACTIVE USERS', v: '12K+' }, { l: 'PLACEMENTS', v: '850' }, { l: 'AI DECISIONS', v: '2.4M' }, { l: 'SECURE NODES', v: '14' }].map((stat, i) => (
             <div key={i} className="text-center group">
                <h5 className="text-5xl font-black italic tracking-tighter mb-2 group-hover:text-[var(--primary)] transition-colors">{stat.v}</h5>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">{stat.l}</p>
             </div>
           ))}
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 relative z-10 text-center">
         <p className="text-[10px] font-black uppercase tracking-widest text-white/10">© 2026 PLACEX AI. ENGINEERED FOR EXCELLENCE.</p>
         <div className="mt-8 flex justify-center gap-10">
            <Sparkles className="text-white/5" size={20} />
            <Sparkles className="text-white/5" size={20} />
            <Sparkles className="text-white/5" size={20} />
         </div>
      </footer>
    </div>
  );
};

export default Landing;
