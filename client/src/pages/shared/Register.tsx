import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, ArrowRight, Sparkles, ChevronLeft, UserPlus, Key, Building, GraduationCap, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../api/auth';

const Register: React.FC = () => {
  const { setTheme, setUser } = useStore();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<null | 'student' | 'company'>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    college: '',
    branch: '',
    year: '',
    companyName: '',
    website: '',
    industry: '',
    accessKey: ''
  });

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
      id: 'company', 
      label: 'ENTERPRISE PORTAL', 
      icon: Briefcase, 
      desc: 'Discover and acquire elite talent globally.',
      badge: 'FOR COMPANIES',
      badgeColor: 'silver'
    }
  ];

  const handleRoleSelect = (roleId: 'student' | 'company') => {
    setSelectedRole(roleId);
    setTheme(roleId);
  };

  const handleBackToSelection = () => {
    setSelectedRole(null);
    setFormData({ 
      name: '', 
      email: '', 
      password: '', 
      confirmPassword: '',
      college: '',
      branch: '',
      year: '',
      companyName: '',
      website: '',
      industry: '',
      accessKey: ''
    });
    setTheme('student');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        className: 'toast-error'
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters', {
        className: 'toast-error'
      });
      setIsLoading(false);
      return;
    }

    try {
      const requestData: any = { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password, 
        confirmPassword: formData.confirmPassword,
        role: selectedRole 
      };

      // Add role-specific fields
      if (selectedRole === 'student') {
        requestData.college = formData.college;
        requestData.branch = formData.branch;
        requestData.year = formData.year;
      } else if (selectedRole === 'company') {
        requestData.companyName = formData.companyName;
        requestData.website = formData.website;
        requestData.industry = formData.industry;
        requestData.accessKey = formData.accessKey;
      }

      const response = await registerUser(requestData);

      if (response.data.success) {
        localStorage.setItem('elitex_token', response.data.token);
        localStorage.setItem('elitex_role', response.data.user.role);
        localStorage.setItem('elitex_user', JSON.stringify(response.data.user));

        setUser(response.data.user);

        toast.success('Welcome to ELITEX AI! 🎉', {
          className: 'toast-gold'
        });

        setTimeout(() => {
          const role = response.data.user.role;
          if (role === 'student') 
            navigate('/student/dashboard');
          else if (role === 'company') 
            navigate('/company/dashboard');
        }, 1000);
      }
    } catch (err: unknown) {
      const error = err as any;
      const msg = error.response?.data?.message 
        || 'Registration failed. Try again.';
      toast.error(msg, {
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
             <UserPlus className="mx-auto text-gold-primary mb-6" size={48} />
             <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white">
               ELITEX <span className="gold-text">AI</span>
             </h1>
             <p className="text-sm uppercase font-bold tracking-widest text-silver-primary">
               CREATE YOUR ACCOUNT
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
              className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl"
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
                    <span className="text-xs font-bold uppercase tracking-widest">Create Account</span>
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
              
              {/* Admin Registration Disabled Notice */}
              <motion.div className="portal-card text-center opacity-50 cursor-not-allowed">
                <div className="mb-8">
                  <ShieldCheck className="mx-auto mb-6 text-5xl text-silver-primary" />
                  <h3 className="text-2xl font-black tracking-tighter text-white mb-4">
                    ADMIN CONSOLE
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    Complete system control and oversight.
                  </p>
                  <div className="badge-silver">
                    REGISTRATION DISABLED
                  </div>
                </div>
              </motion.div>
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
                    {selectedRole === 'student' ? <GraduationCap size={32} /> : <Building size={32} />}
                  </div>
                  <div>
                    <h4 className="text-3xl font-black tracking-tighter text-white uppercase">
                      {selectedRole === 'student' ? 'STUDENT ACCESS' : 'ENTERPRISE ACCESS'}
                    </h4>
                    <p className="text-xs font-bold text-silver-primary uppercase tracking-widest mt-2">
                       SECURE · ENCRYPTED · PRIVATE
                    </p>
                  </div>
               </div>

               <form onSubmit={handleRegister} className="space-y-6">
                  {/* Common Fields */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="luxury-input w-full" 
                    />
                  </div>
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
                      Password (min 6 chars)
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
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                      Confirm Password
                    </label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="luxury-input w-full" 
                    />
                  </div>

                  {/* Role-specific Fields */}
                  {selectedRole === 'student' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                          College Name
                        </label>
                        <input 
                          type="text" 
                          placeholder="Your college/university"
                          value={formData.college}
                          onChange={(e) => setFormData({...formData, college: e.target.value})}
                          className="luxury-input w-full" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                          Branch/Department
                        </label>
                        <input 
                          type="text" 
                          placeholder="Computer Science, Engineering, etc."
                          value={formData.branch}
                          onChange={(e) => setFormData({...formData, branch: e.target.value})}
                          className="luxury-input w-full" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                          Year of Study
                        </label>
                        <input 
                          type="text" 
                          placeholder="1st, 2nd, 3rd, 4th year"
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: e.target.value})}
                          className="luxury-input w-full" 
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                          Company Name
                        </label>
                        <input 
                          type="text" 
                          placeholder="Your company name"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="luxury-input w-full" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                          Official Email
                        </label>
                        <input 
                          type="email" 
                          placeholder="company@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="luxury-input w-full" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                          Company Website
                        </label>
                        <input 
                          type="url" 
                          placeholder="https://www.company.com"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="luxury-input w-full" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1">
                          Industry Type
                        </label>
                        <input 
                          type="text" 
                          placeholder="Technology, Finance, Healthcare, etc."
                          value={formData.industry}
                          onChange={(e) => setFormData({...formData, industry: e.target.value})}
                          className="luxury-input w-full" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-silver-primary tracking-widest ml-1 flex items-center gap-2">
                          <Key size={14} />
                          Company Access Key
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Enter company access key"
                          value={formData.accessKey}
                          onChange={(e) => setFormData({...formData, accessKey: e.target.value})}
                          className="luxury-input w-full" 
                        />
                        <p className="text-xs text-silver-primary ml-1">
                          Contact admin for access key
                        </p>
                      </div>
                    </>
                  )}

                  <button 
                    type="submit" 
                    className="gold-btn w-full flex items-center justify-center gap-4 mt-8"
                    disabled={isLoading}
                  >
                     {isLoading ? (
                       <>
                         <div className="spinner"></div>
                         CREATING ACCOUNT...
                       </>
                     ) : (
                       <>
                         {selectedRole === 'student' ? 'CREATE STUDENT ACCOUNT' : 'REGISTER COMPANY'} <ArrowRight size={18} />
                       </>
                     )}
                  </button>
               </form>
               
               <p className="text-center mt-12 text-xs font-bold text-silver-primary uppercase tracking-widest flex items-center justify-center gap-3">
                 <Sparkles size={12} /> 🔒 256-bit encrypted · JWT secured <Sparkles size={12} />
               </p>
               
               {/* Toggle between Register and Login */}
               <div className="text-center mt-8">
                 <p className="text-sm text-silver-primary mb-4">
                   Already have account?{' '}
                   <Link 
                     to="/login" 
                     className="text-gold-primary hover:text-gold-secondary font-bold uppercase tracking-wider transition-colors"
                   >
                     LOGIN HERE →
                   </Link>
                 </p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;
