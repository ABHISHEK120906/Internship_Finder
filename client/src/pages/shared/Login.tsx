import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Briefcase, Lock, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const { setTheme, setUser } = useStore();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<null | 'student' | 'admin' | 'company'>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const roles = [
    { 
      id: 'student', 
      label: 'STUDENT PORTAL', 
      icon: User, 
      desc: 'Launch your career with AI-guided intelligence.',
      badge: 'FOR STUDENTS',
      badgeColor: 'silver'
    },
    { 
      id: 'admin', 
      label: 'ADMIN CONSOLE', 
      icon: ShieldCheck, 
      desc: 'Complete system control and oversight.',
      badge: 'RESTRICTED ACCESS',
      badgeColor: 'gold'
    },
    { 
      id: 'company', 
      label: 'ENTERPRISE PORTAL', 
      icon: Briefcase, 
      desc: 'Discover and acquire elite talent globally.',
      badge: 'FOR COMPANIES',
      badgeColor: 'silver'
    }
  ];

  const handleRoleSelect = (roleId: 'student' | 'admin' | 'company') => {
    setSelectedRole(roleId);
    setTheme(roleId);
  };

  const handleBackToSelection = () => {
    setSelectedRole(null);
    setFormData({ email: '', password: '' });
    setTheme('student');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: selectedRole
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save to localStorage
        localStorage.setItem('elitex_token', data.token);
        localStorage.setItem('elitex_role', selectedRole!);
        localStorage.setItem('elitex_user', JSON.stringify(data.user));

        // Update store
        setUser(data.user);

        // Show success toast
        toast.success('Login successful! Redirecting...', {
          className: 'toast-gold'
        });

        // Redirect based on role
        setTimeout(() => {
          navigate(`/${selectedRole}/dashboard`);
        }, 1000);
      } else {
        toast.error(data.message || 'Invalid credentials. Try again.', {
          className: 'toast-error'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Server offline. Please try again.', {
        className: 'toast-error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-luxury overflow-hidden flex items-center justify-center relative p-10 select-none">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold-primary rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-silver-primary rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-gold-primary/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl h-full flex flex-col justify-center items-center gap-16 z-10">
        
        {/* Header Section */}
        <header className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-4"
          >
             <ShieldCheck className="mx-auto text-gold-primary mb-6" size={48} />
             <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white">
               ELITEX <span className="gold-text">AI</span>
             </h1>
             <p className="text-sm uppercase font-bold tracking-widest text-silver-primary">
               INTELLIGENT ACCESS PORTAL
             </p>
          </motion.div>
        </header>

        {/* Dynamic Area: Selector or Form */}
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="selector" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
            >
              {roles.map((role) => (
                <motion.div 
                  key={role.id} 
                  onClick={() => handleRoleSelect(role.id as any)} 
                  className={`portal-card text-center group ${
                    role.id === selectedRole ? 'selected' : ''
                  }`}
                >
                  <div className="mb-8">
                    <role.icon 
                      className={`mx-auto mb-6 text-5xl transition-all duration-300 ${
                        role.id === 'admin' ? 'text-silver-primary' : 'text-gold-primary'
                      } group-hover:scale-110`} 
                    />
                    <h3 className="text-2xl font-black tracking-tighter text-white mb-4">
                      {role.label}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {role.desc}
                    </p>
                    <div className={`inline-block ${
                      role.badgeColor === 'gold' ? 'badge-gold' : 'badge-silver'
                    }`}>
                      {role.badge}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gold-primary opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-xs font-bold uppercase tracking-widest">Enter Portal</span>
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="form" 
              initial={{ opacity: 0, scale: 0.98, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="w-full max-w-lg login-form"
            >
               <button 
                 onClick={handleBackToSelection} 
                 className="text-text-muted hover:text-gold-primary mb-10 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
               >
                  <ChevronLeft size={14} /> Change Portal
               </button>
               
               <div className="flex items-center gap-6 mb-12">
                  <div className="p-4 rounded-2xl bg-black-pure border border-silver-border text-gold-primary">
                    <Lock size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black tracking-tighter text-white uppercase">
                      {selectedRole === 'student' ? 'STUDENT ACCESS' : 
                       selectedRole === 'admin' ? 'ADMIN CONSOLE' : 
                       'ENTERPRISE ACCESS'}
                    </h4>
                    <p className="text-xs font-bold text-silver-primary uppercase tracking-widest mt-2">
                       SECURE · ENCRYPTED · PRIVATE
                    </p>
                  </div>
               </div>

               <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="luxury-input w-full" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                      Password
                    </label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="luxury-input w-full" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="gold-btn w-full flex items-center justify-center gap-4"
                    disabled={isLoading}
                  >
                     {isLoading ? (
                       <>
                         <div className="spinner"></div>
                         AUTHENTICATING...
                       </>
                     ) : (
                       <>
                         SECURE LOGIN <ArrowRight size={18} />
                       </>
                     )}
                  </button>
               </form>
               
               <p className="text-center mt-12 text-xs font-bold text-silver-primary uppercase tracking-widest flex items-center justify-center gap-3">
                 <Sparkles size={12} /> 🔒 256-bit encrypted · JWT secured <Sparkles size={12} />
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
