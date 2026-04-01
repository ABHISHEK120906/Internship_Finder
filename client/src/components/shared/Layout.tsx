import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { LayoutDashboard, Users, Briefcase, FileText, Award, ShieldCheck, LogOut, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, logout } = useStore();
  const navigate = useNavigate();

  const menuItems = {
    student: [
      { icon: LayoutDashboard, label: 'Overview', path: '/student/dashboard' },
      { icon: Briefcase, label: 'Jobs & Internships', path: '/student/jobs' },
      { icon: Award, label: 'AI Skills Mentor', path: '/student/ai-mentor' },
      { icon: FileText, label: 'Resume Analyzer', path: '/student/resume' },
      { icon: ShieldCheck, label: 'Cyber Labs', path: '/student/labs' }
    ],
    admin: [
      { icon: LayoutDashboard, label: 'Control Room', path: '/admin/dashboard' },
      { icon: Users, label: 'User Management', path: '/admin/users' },
      { icon: ShieldCheck, label: 'Threat Intel', path: '/admin/security' },
      { icon: Bell, label: 'Visitor Logs', path: '/admin/logs' }
    ],
    company: [
      { icon: LayoutDashboard, label: 'Hiring Dashboard', path: '/company/dashboard' },
      { icon: Users, label: 'Applicants', path: '/company/applicants' },
      { icon: Briefcase, label: 'Manage Postings', path: '/company/jobs' },
      { icon: Award, label: 'Match Making', path: '/company/matching' }
    ]
  };

  return (
    <div className="flex h-screen bg-mesh overflow-hidden relative">
      
      {/* Sidebar - Locked Vertical */}
      <aside className="w-80 h-screen border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col pt-12 pb-8 px-8 relative shrink-0 z-50">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--primary)]/30 to-transparent"></div>
        
        <header className="mb-16 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-[var(--radius-md)] bg-[var(--primary)] flex items-center justify-center text-black shadow-[0_0_40px_var(--glow)] border border-white/20">
            <ShieldCheck size={44} strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tighter uppercase text-white">ELITEX <span className="gold-text">AI</span></h1>
            <p className="text-[10px] uppercase font-black tracking-[0.5em] text-white/30 mt-2">Next-Gen Interface</p>
          </div>
        </header>

        <nav className="flex-1 space-y-4 overflow-y-auto scrollbar-hide">
          {menuItems[theme].map((item, idx) => (
            <button key={idx} onClick={() => navigate(item.path)} className="w-full flex items-center gap-5 px-6 py-5 rounded-[var(--radius-sm)] transition-all group border border-transparent hover:bg-white/5 hover:border-white/10 active:scale-95">
               <item.icon size={22} className="text-white/40 group-hover:text-[var(--primary)] transition-colors" />
               <span className="font-bold uppercase tracking-widest text-xs text-white/40 group-hover:text-white transition-all">{item.label}</span>
            </button>
          ))}
        </nav>

        <footer className="pt-8 border-t border-white/5">
          <button onClick={() => { logout(); navigate('/login'); }} className="w-full flex items-center gap-5 px-6 py-5 rounded-[var(--radius-sm)] border border-red-500/20 bg-red-500/5 transition-all group hover:bg-red-500 hover:border-red-500 active:scale-95">
             <LogOut size={22} className="text-red-500 group-hover:text-white" />
             <span className="font-black uppercase tracking-widest text-xs text-red-500 group-hover:text-white">Sign Out</span>
          </button>
        </footer>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden relative">
        <header className="h-24 px-12 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md z-40 shrink-0">
           <div className="relative group w-96">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--primary)] transition-colors" size={20} />
             <input type="text" placeholder="Global placement search..." className="input-field pl-16 rounded-full" />
           </div>
           
           <div className="flex items-center gap-6">
              <button aria-label="Notifications" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[var(--primary)]/50 transition-all relative">
                <Bell size={24} />
                <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"></span>
              </button>
              <div className="w-[1px] h-10 bg-white/5 mx-2"></div>
              <div className="flex items-center gap-5">
                 <div className="text-right">
                    <p className="font-black text-xs uppercase tracking-widest text-white leading-none">Abhishek Mane</p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Super Admin</p>
                 </div>
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-black text-xl shadow-xl">
                   A
                 </div>
              </div>
           </div>
        </header>

        <section className="flex-1 overflow-y-auto p-12 scrollbar-hide">
           <AnimatePresence mode="wait">
             <motion.div key={location.pathname} initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-full">
               {children}
             </motion.div>
           </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Layout;
