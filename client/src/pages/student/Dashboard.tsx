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
    { label: 'Applications', value: 12, icon: Briefcase, color: 'var(--gold-primary)' },
    { label: 'Active Tasks', value: 4, icon: Target, color: 'var(--silver-primary)' },
    { label: 'Pending Docs', value: 2, icon: Mail, color: 'var(--gold-primary)' },
    { label: 'Lab Score', value: 92, icon: ShieldCheck, color: 'var(--silver-primary)' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Welcome (Student Profile) */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
           <h2 className="text-6xl font-black tracking-tighter mb-6 relative">
             Welcome back, <span className="gold-text gold-glow">Student</span>
             <Rocket size={40} className="absolute -top-10 -right-4 text-gold-primary animate-bounce" />
           </h2>
           <p className="text-silver-primary font-medium text-lg leading-relaxed mb-8">
             Your AI-driven career path starts here. Review your readiness score and personalized matching opportunities.
           </p>
           <div className="flex gap-4">
             <button className="gold-btn">Check Readiness</button>
             <button className="silver-btn">Download Report</button>
           </div>
        </div>

        {/* Readiness Score Circle */}
        <div className="luxury-card p-10 flex flex-col items-center justify-center aspect-square w-80 relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full border-[10px] border-silver-border rounded-full"></div>
           <svg className="w-full h-full transform -rotate-90">
             <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="var(--gold-primary)" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * readinessScore) / 100} className="transition-all duration-1000 ease-out" style={{ filter: 'drop-shadow(0 0 10px var(--gold-primary))' }} />
           </svg>
           <div className="absolute flex flex-col items-center">
             <span className="text-6xl font-black tracking-tighter gold-text">{readinessScore}%</span>
             <span className="text-xs uppercase font-black text-silver-primary tracking-widest">Readiness Score</span>
           </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="luxury-card p-8 group relative overflow-hidden">
             <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-gold-subtle blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
             <stat.icon size={28} className="mb-6" style={{ color: stat.color }} />
             <div className="flex items-baseline gap-2">
               <h4 className="text-4xl font-black tracking-tighter mb-1 gold-text">{stat.value}</h4>
               {stat.label.includes('Score') && <span className="text-gold-primary text-xs font-black">HIGH</span>}
             </div>
             <p className="text-xs font-black uppercase tracking-widest text-silver-primary">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Main Insights (Chart + Timeline) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 luxury-card p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
              <div className="w-10 h-[2px] bg-gold-primary"></div> IMPROVEMENT CURVE
            </h3>
            <span className="text-xs font-black tracking-widest gold-text animate-pulse uppercase">Live AI Insight</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--gold-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--gold-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--silver-border)" />
                <XAxis dataKey="name" stroke="var(--silver-primary)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--black-card)', border: '1px solid var(--gold-primary)', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="score" stroke="var(--gold-primary)" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 luxury-card p-10">
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
            <CheckCircle2 className="text-gold-primary" /> RECENT SUCCESS
           </h3>
           <div className="space-y-8">
             {[
               { title: 'Resume Analyzed', time: '2h ago', status: 'Completed', color: 'green' },
               { title: 'Interview with Adobe', time: 'Tomorrow', status: 'Upcoming', color: 'orange' },
               { title: 'Skill Test', time: 'Yesterday', status: 'Passed', color: 'blue' }
             ].map((task, idx) => (
               <div key={idx} className="flex gap-6 items-center">
                 <div className="w-12 h-12 rounded-2xl bg-black-pure border border-silver-border flex items-center justify-center text-silver-primary">
                   <Clock size={20} />
                 </div>
                 <div>
                   <h6 className="font-bold text-sm tracking-tight text-white">{task.title}</h6>
                   <div className="flex items-center gap-3 mt-1">
                     <span className="text-xs font-black uppercase text-silver-primary tracking-widest">{task.time}</span>
                     <span className="w-1 h-1 rounded-full bg-silver-border"></span>
                     <span className="text-xs font-black uppercase tracking-widest text-gold-primary">{task.status}</span>
                   </div>
                 </div>
                 <ArrowUpRight size={16} className="ml-auto text-silver-primary hover:text-gold-primary" />
               </div>
             ))}
           </div>
           <button className="w-full mt-12 py-5 bg-black-pure border border-silver-border rounded-2xl font-black text-xs uppercase tracking-widest hover:border-gold-primary hover:text-gold-primary transition-all">View All Activity</button>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
