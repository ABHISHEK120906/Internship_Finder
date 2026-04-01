import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, ShieldCheck, Mail, ArrowUpRight, Clock, Target, Rocket, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 78 },
];

const StudentDashboard: React.FC = () => {
  const readinessScore = 78;

  const stats = [
    { label: 'Applications', value: 12, icon: Briefcase, color: '#FFD700' },
    { label: 'Active Tasks', value: 4, icon: Target, color: '#4CAF50' },
    { label: 'Pending Docs', value: 2, icon: Mail, color: '#FF6B00' },
    { label: 'Lab Score', value: 92, icon: ShieldCheck, color: '#2196F3' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Welcome (Student Profile) */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
           <h2 className="text-6xl font-black italic tracking-tighter mb-6 relative">
             BORN TO <span className="text-[var(--primary)] neon-text">EXCEL.</span>
             <Rocket size={40} className="absolute -top-10 -right-4 text-[var(--primary)] animate-bounce" />
           </h2>
           <p className="text-gray-400 font-medium text-lg leading-relaxed mb-8">
             Your AI-driven career path starts here. Review your readiness score and personalized matching opportunities.
           </p>
           <div className="flex gap-4">
             <button className="premium-btn">Check Readiness</button>
             <button className="px-8 py-4 rounded-[var(--radius-sm)] border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">Download Report</button>
           </div>
        </div>

        {/* Readiness Score Circle */}
        <div className="glass-card p-10 flex flex-col items-center justify-center aspect-square w-80 relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full border-[10px] border-white/5 rounded-full"></div>
           <svg className="w-full h-full transform -rotate-90">
             <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="var(--primary)" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * readinessScore) / 100} className="transition-all duration-1000 ease-out" style={{ stroke: 'var(--primary)', filter: 'drop-shadow(0 0 10px var(--primary))' }} />
           </svg>
           <div className="absolute flex flex-col items-center">
             <span className="text-6xl font-black italic tracking-tighter">{readinessScore}%</span>
             <span className="text-[10px] uppercase font-black text-white/30 tracking-widest">Readiness Score</span>
           </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-card p-8 group relative overflow-hidden">
             <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-[var(--primary)]/5 blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
             <stat.icon size={28} className="mb-6 opacity-60" style={{ color: stat.color }} />
             <div className="flex items-baseline gap-2">
               <h4 className="text-4xl font-black tracking-tighter mb-1">{stat.value}</h4>
               {stat.label.includes('Score') && <span className="text-green-400 text-xs font-black">HIGH</span>}
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Main Insights (Chart + Timeline) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 glass-card p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-4">
              <div className="w-10 h-[2px] bg-[var(--primary)]"></div> IMPROVEMENT CURVE
            </h3>
            <span className="text-[10px] font-black tracking-widest text-[var(--primary)] animate-pulse uppercase">Live AI Insight</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="score" stroke="var(--primary)" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 glass-card p-10">
           <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4">
            <CheckCircle2 className="text-[var(--primary)]" /> RECENT SUCCESS
           </h3>
           <div className="space-y-8">
             {[
               { title: 'Resume Analyzed', time: '2h ago', status: 'Completed', color: 'green' },
               { title: 'Interview with Adobe', time: 'Tomorrow', status: 'Upcoming', color: 'orange' },
               { title: 'Skill Test', time: 'Yesterday', status: 'Passed', color: 'blue' }
             ].map((task, idx) => (
               <div key={idx} className="flex gap-6 items-center">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                   <Clock size={20} />
                 </div>
                 <div>
                   <h6 className="font-bold text-sm tracking-tight">{task.title}</h6>
                   <div className="flex items-center gap-3 mt-1">
                     <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">{task.time}</span>
                     <span className="w-1 h-1 rounded-full bg-white/20"></span>
                     <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: task.color }}>{task.status}</span>
                   </div>
                 </div>
                 <ArrowUpRight size={16} className="ml-auto text-white/10 group-hover:text-white" />
               </div>
             ))}
           </div>
           <button className="w-full mt-12 py-5 bg-white/5 border border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">View All Activity</button>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
