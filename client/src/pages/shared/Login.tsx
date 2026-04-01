import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Briefcase, Zap, Globe, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { setTheme, setUser } = useStore();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<null | 'student' | 'admin' | 'company'>(null);
  const [hoveredRole, setHoveredRole] = useState<null | 'student' | 'admin' | 'company'>(null);

  const roles = [
    { id: 'student', label: 'Student Portal', icon: User, tagline: 'Your professional journey starts here.', color: '#FFD700' },
    { id: 'admin', label: 'Admin Controller', icon: ShieldCheck, tagline: 'Secure and monitor the entire system.', color: '#FF6B00' },
    { id: 'company', label: 'Enterprise Lead', icon: Briefcase, tagline: 'Acquire elite talent for your team.', color: '#CC0000' }
  ];

  const handleRoleSelect = (roleId: 'student' | 'admin' | 'company') => {
    setSelectedRole(roleId);
    setTheme(roleId);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Quick Demo mock login
    const mockUser = { id: '1', name: 'Abhishek Mane', role: selectedRole as any, email: 'demo@placexai.com' };
    setUser(mockUser);
    navigate(`/${selectedRole}/dashboard`);
  };

  return (
    <div className="h-screen w-screen bg-[var(--bg-main)] overflow-hidden flex items-center justify-center relative p-10 select-none">
      
      {/* Background Animated Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-mesh transform scale-125 opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[var(--primary)]/10 to-transparent blur-[150px] rounded-full transition-colors duration-1000"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl h-full flex flex-col justify-center items-center gap-16">
        
        {/* Header Section */}
        <header className="text-center z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-8 mb-4">
             <div className="w-1 h-32 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent rounded-full shadow-[0_0_20px_var(--glow)]"></div>
             <div className="space-y-4">
                <Globe className="mx-auto text-[var(--primary)] mb-6 animate-spin-slow" size={48} />
                <h1 className="text-8xl font-black italic tracking-tighter text-white neon-text uppercase leading-[0.8] mb-0">PLACEX <span className="text-[var(--primary)]">AI</span></h1>
                <p className="text-xl uppercase font-black tracking-[0.8em] text-white/30 pl-2">System Access Gateway</p>
             </div>
             <div className="w-1 h-32 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent rounded-full shadow-[0_0_20px_var(--glow)]"></div>
          </motion.div>
        </header>

        {/* Dynamic Area: Selector or Form */}
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div key="selector" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
              {roles.map((role) => (
                <motion.div key={role.id} onHoverStart={() => { setHoveredRole(role.id as any); setTheme(role.id as any); }} onHoverEnd={() => { setHoveredRole(null); setTheme('student'); }} onClick={() => handleRoleSelect(role.id as any)} className="glass-card p-12 cursor-pointer relative overflow-hidden group hover:-translate-y-4 transition-all duration-500">
                  <div className="absolute top-[-20%] right-[-20%] w-48 h-48 rounded-full bg-[var(--primary)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <role.icon size={64} className="mb-10 text-white/20 group-hover:text-[var(--primary)] transition-colors group-hover:scale-110 duration-500" />
                  <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-4">{role.label}</h3>
                  <p className="text-sm font-medium text-white/30 leading-relaxed h-12">{role.tagline}</p>
                  <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Enter Portal <ArrowRight size={14} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, scale: 0.98, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg glass-card p-16 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[4px] bg-[var(--primary)] shadow-[0_0_20px_var(--primary)]"></div>
               <button onClick={() => { setSelectedRole(null); setTheme('student'); }} className="text-white/20 hover:text-white mb-10 transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                  <Globe size={14} /> Change Access Point
               </button>
               
               <div className="flex items-center gap-6 mb-12">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[var(--primary)] shadow-xl">
                    <Lock size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase">{selectedRole === 'student' ? 'Student' : selectedRole === 'admin' ? 'Operator' : 'Hiring'} LOGIN</h4>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-2 flex items-center gap-2 italic">
                       <ShieldCheck size={12} /> SECURE CRYPTO-SESSION ACTIVE
                    </p>
                  </div>
               </div>

               <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-1">Access Token / Email</label>
                    <input type="email" required placeholder="name@placexai.com" className="input-field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-1">Pin Phrase / Password</label>
                    <input type="password" required placeholder="••••••••••••" className="input-field" />
                  </div>
                  <button type="submit" className="premium-btn w-full flex items-center justify-center gap-4 group">
                     START SESSION <Zap size={18} className="group-hover:scale-125 transition-transform" />
                  </button>
               </form>
               
               <p className="text-center mt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                 <Sparkles size={12} /> END-TO-END AI ENCRYPTED <Sparkles size={12} />
               </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info (base) */}
        <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xs text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10 mb-4 transition-colors hover:text-[var(--primary)] cursor-crosshair group flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-white/10"></span> V 4.2.0 GLOBAL ENGINE <span className="w-8 h-[1px] bg-white/10"></span>
            </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
