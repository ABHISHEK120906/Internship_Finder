import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { typeWriter, magneticButton } from '../utils/effects';
import { Lock, Zap, Globe, Eye, EyeOff, Loader, Check } from 'lucide-react';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'company' | 'admin'>('student');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });

  useEffect(() => {
    // Initialize typing animation
    const taglineElement = document.getElementById('tagline');
    if (taglineElement) {
      typeWriter(taglineElement, 'Where Talent Meets Opportunity', 100);
    }

    // Initialize magnetic buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => magneticButton(el as HTMLElement));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 2000);
  };

  const trustBadges = [
    { icon: Lock, text: '256-bit Encrypted' },
    { icon: Zap, text: 'AI-Powered' },
    { icon: Globe, text: '50+ Countries' }
  ];

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Panel - 40% */}
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden">
        {/* Pure Black with Gold Glow Background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/8 to-transparent" />
        
        {/* Gold Glow Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-[100px]" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-black text-white mb-2">
              ELITEX <span className="text-gold-500">•</span> AI
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 h-8"
          >
            <p id="tagline" className="text-xl text-silver-400"></p>
          </motion.div>

          {/* Floating 3D Card Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="spotlight-card p-8 animate-float max-w-sm">
              <div className="text-center">
                <div className="text-3xl font-black shimmer-text mb-2">94%</div>
                <div className="text-sm text-silver-400 mb-4">Placement Score</div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gold-500 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent blur-sm" />
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 border border-gold-500/30 rounded-full"
              >
                <badge.icon className="w-3 h-3 text-gold-500" />
                <span className="text-xs text-gold-500">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel - 60% */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-8 lg:p-12 bg-black/50">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Role Tabs */}
          <div className="mb-8">
            <div className="inline-flex bg-white/3 border border-white/6 rounded-full p-1">
              {[
                { id: 'student', label: '🎓 STUDENT' },
                { id: 'company', label: '🏢 COMPANY' },
                { id: 'admin', label: '🛡️ ADMIN' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-[0.05em] transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-gold-500 to-gold-300 text-black'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <div className="border-glow-animated p-12">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white mb-2">
                {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
              </h2>
              <p className="text-sm text-silver-400">
                {isLogin ? 'Sign in to ELITEX AI' : 'Join the future of placements'}
              </p>
            </div>

            {/* Login/Register Toggle */}
            <div className="mb-8">
              <div className="inline-flex bg-white/3 rounded-full p-1 w-full">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 rounded-full text-xs font-black tracking-[0.05em] transition-all duration-300 ${
                    isLogin
                      ? 'bg-white/10 text-white'
                      : 'text-white/30'
                  }`}
                >
                  LOGIN
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 rounded-full text-xs font-black tracking-[0.05em] transition-all duration-300 ${
                    !isLogin
                      ? 'bg-white/10 text-white'
                      : 'text-white/30'
                  }`}
                >
                  REGISTER
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-white/8 rounded-lg text-white placeholder-white/30 focus:border-gold-500/50 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-white/8 rounded-lg text-white placeholder-white/30 focus:border-gold-500/50 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-white/8 rounded-lg text-white placeholder-white/30 focus:border-gold-500/50 focus:outline-none transition-colors duration-300 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && activeTab === 'company' && (
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-white/8 rounded-lg text-white placeholder-white/30 focus:border-gold-500/50 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="magnetic border-glow-animated w-full py-3 bg-gradient-to-r from-gold-500 to-gold-300 text-black font-black text-sm tracking-[0.05em] rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.4),0_0_80px_rgba(201,168,76,0.15)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Success!</span>
                  </div>
                ) : (
                  <span>{isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/8" />
              </div>
              <div className="relative flex justify-center text-xs text-silver-400">
                <span className="bg-black px-4">OR CONTINUE WITH</span>
              </div>
            </div>

            {/* Social Login */}
            <button className="w-full py-3 bg-white/4 border border-white/8 text-silver-400 font-bold text-sm rounded-lg hover:bg-white/8 hover:border-gold-500/30 hover:text-white transition-all duration-300">
              Login with Google
            </button>

            {/* Security Note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-silver-400">
              <Lock className="w-3 h-3" />
              <span>Protected by 256-bit encryption</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
