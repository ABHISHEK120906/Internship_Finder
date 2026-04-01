import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Plus, Users, MoreVertical, Briefcase, Award, TrendingUp, ShieldCheck, Mail, CheckCircle2, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', apps: 45 },
  { name: 'Tue', apps: 52 },
  { name: 'Wed', apps: 92 },
  { name: 'Thu', apps: 68 },
  { name: 'Fri', apps: 84 },
  { name: 'Sat', apps: 32 },
  { name: 'Sun', apps: 28 },
];

const CompanyDashboard: React.FC = () => {
  const pipeline = [
    { id: 1, name: 'Siddheshwar Mane', status: 'Applied', role: 'Full Stack Intern', score: 92, photo: 'A' },
    { id: 2, name: 'Isha Rajput', status: 'Reviewing', role: 'Cybersecurity Intern', score: 88, photo: 'I' },
    { id: 3, name: 'Pankaj Deshmukh', status: 'Interview', role: 'React Developer', score: 95, photo: 'P' },
    { id: 4, name: 'Aditi Verma', status: 'Selected', role: 'Python Developer', score: 91, photo: 'A' },
  ];

  const stats = [
    { label: 'Active Opportunities', value: 8, icon: Briefcase, color: 'var(--primary)' },
    { label: 'Talent Matchmaking', value: 45, icon: Award, color: '#C9A84C' },
    { label: 'Hired This Month', value: 12, icon: CheckCircle2, color: '#4CAF50' },
    { label: 'Total Applicants', value: 890, icon: Users, color: '#86a9d6' }
  ];

  const columns = [
    { name: 'Applied', color: '#86a9d6', icon: Mail },
    { name: 'Reviewing', color: '#C9A84C', icon: Clock },
    { name: 'Interview', color: '#2196F3', icon: Users },
    { name: 'Selected', color: '#4CAF50', icon: CheckCircle2 }
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter mb-4 neon-text uppercase">TALENT <span className="text-[var(--primary)]">ACQUISITION</span></h2>
          <p className="text-[var(--secondary)] font-black text-xs uppercase tracking-[0.5em] mt-8 pl-1">Play Bold. Hire Smart.</p>
        </div>
        <div className="flex gap-4">
           <button className="premium-btn flex items-center gap-3">
             <Plus size={20} /> CREATE LISTING
           </button>
        </div>
      </header>

      {/* Mini Stats (RCB themed) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="glass-card p-10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/5 blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
             <stat.icon size={28} className="mb-6 opacity-60" style={{ color: stat.color }} />
             <h4 className="text-4xl font-black tracking-tighter mb-1">{stat.value}</h4>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Applicant Trends (Area Chart) */}
      <section className="glass-card p-12 mb-20">
        <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-4">
              <TrendingUp className="text-[var(--primary)]" /> RECRUITMENT VELOCITY
            </h3>
            <span className="text-[10px] font-black tracking-widest text-[#4CAF50] uppercase px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">System Performance: Optimal</span>
        </div>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}>
               <defs>
                 <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                   <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
               <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} axisLine={false} tickLine={false} />
               <Tooltip contentStyle={{ backgroundColor: 'black', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
               <Area type="monotone" dataKey="apps" stroke="var(--primary)" fillOpacity={1} fill="url(#colorApps)" strokeWidth={4} />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </section>

      {/* Kanban Application Pipeline (RCB themed) */}
      <h3 className="text-2xl font-black italic mb-10 flex items-center gap-4">
        <div className="w-10 h-1 bg-[var(--primary)] rounded-full"></div> CANDIDATE PIPELINE <span className="text-[var(--secondary)] text-sm uppercase font-black tracking-[0.3em]">(AI Match Scores)</span>
      </h3>

      <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide">
        {columns.map((column, idx) => (
          <div key={idx} className="min-w-[350px] bg-white/[0.02] border border-white/5 rounded-[var(--radius-lg)] p-8 flex flex-col shrink-0">
             <div className="flex items-center justify-between mb-10">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${column.color}22`, color: column.color }}>
                    <column.icon size={20} />
                  </div>
                  <h5 className="font-black uppercase tracking-[0.2em] text-[11px] text-white underline underline-offset-8 decoration-[var(--primary)]/40">{column.name}</h5>
               </div>
               <span className="text-[10px] font-black text-white/20 bg-white/5 px-4 py-1.5 rounded-full">{pipeline.filter(p => p.status === column.name).length}</span>
             </div>

             <div className="space-y-6 flex-1">
               {pipeline.filter(p => p.status === column.name).map((candidate) => (
                 <motion.div key={candidate.id} className="p-8 rounded-[var(--radius-md)] bg-white/[0.05] border border-white/5 hover:border-[var(--primary)]/40 hover:bg-white/[0.08] transition-all group cursor-pointer shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-start mb-8 relative z-10">
                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-white/10 flex items-center justify-center text-[var(--secondary)] font-black text-2xl group-hover:scale-110 transition-transform shadow-xl">
                         {candidate.photo}
                       </div>
                       <button aria-label="Menu" className="p-2 text-white/20 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                    </div>
                    <h6 className="font-black text-xl tracking-tighter mb-1 text-white group-hover:text-[var(--primary)] transition-colors">{candidate.name}</h6>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--secondary)] mb-10">{candidate.role}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5 relative z-10">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">AI MATCH</span>
                          <span className="text-xl font-black text-white">{candidate.score}%</span>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-black transition-all">
                         <TrendingUp size={16} />
                       </div>
                    </div>
                    {/* Progress Bar (Visual Polish) */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] transition-all duration-700" style={{ width: `${candidate.score}%` }}></div>
                 </motion.div>
               ))}
               <button className="w-full py-5 rounded-[var(--radius-md)] border border-dashed border-white/10 text-white/20 font-black text-[10px] uppercase tracking-widest hover:border-[var(--primary)]/40 hover:text-white hover:bg-white/5 transition-all">+ Add Candidate manually</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;
