import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Monitor, Smartphone, MapPin, Search, Filter, ShieldCheck, Zap, TrendingUp, Users, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const visitorAlerts = [
    { id: 1, action: 'Page Visit', page: '/product', location: 'Mumbai, India', device: 'Desktop', time: '10s ago', color: '#4CAF50' },
    { id: 2, action: 'Form Submit', page: '/contact', location: 'Bangalore, India', device: 'Mobile', time: '1m ago', color: '#2196F3' },
    { id: 3, action: 'Resume Download', page: '/student/profile', location: 'Nagpur, India', device: 'Desktop', time: '2m ago', color: '#f44336' },
  ];

  const chartData = [
    { name: 'Mon', count: 124 },
    { name: 'Tue', count: 86 },
    { name: 'Wed', count: 142 },
    { name: 'Thu', count: 98 },
    { name: 'Fri', count: 120 },
    { name: 'Sat', count: 64 },
    { name: 'Sun', count: 88 }
  ];

  const stats = [
    { label: 'Active Sessions', value: 24, icon: Zap, trend: '+12%', color: '#FF6B00' },
    { label: 'System Match Rate', value: '98%', icon: Target, trend: '+5%', color: '#4CAF50' },
    { label: 'Network Threats', value: 1, icon: ShieldAlert, trend: 'Critical', color: '#f44336' },
    { label: 'New Students', value: 45, icon: Users, trend: '+8%', color: '#2196F3' }
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h2 className="text-5xl font-black italic tracking-tighter mb-4 neon-text">MASTER <span className="text-[var(--primary)]">CONTROL</span></h2>
          <p className="text-white/30 font-black text-xs uppercase tracking-[0.5em] mt-8 pl-1">Global System Surveillance</p>
        </div>
        <div className="flex gap-4">
           <button className="premium-btn">Export System Logs</button>
           <button aria-label="System Health" className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all"><Filter size={20} /></button>
        </div>
      </header>

      {/* Admin Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="glass-card p-10 group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--primary)]/20 to-transparent blur-2xl group-hover:scale-150 transition-all duration-700"></div>
             <stat.icon size={26} className="mb-6 opacity-60" style={{ color: stat.color }} />
             <h4 className="text-5xl font-black mb-3 tracking-tighter">{stat.value}</h4>
             <div className="flex items-center gap-3">
               <p className="text-white/30 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
               <span className={`text-[10px] px-3 py-1 rounded-full font-black ${stat.trend.includes('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>{stat.trend}</span>
             </div>
          </motion.div>
        ))}
      </section>

      {/* Insights Section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 glass-card p-12">
          <div className="flex justify-between items-center mb-12 px-2">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-4">
               <div className="w-12 h-1 bg-[var(--primary)] rounded-full"></div> LIVE TRAFFIC ACTIVITY
            </h3>
            <div className="flex gap-3">
               <span className="p-3 bg-white/5 rounded-xl text-white/40 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all">Daily</span>
               <span className="p-3 bg-white/5 rounded-xl text-white/40 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all">Weekly</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'var(--accent)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.count > 100 ? 'var(--primary)' : 'rgba(255,255,255,0.2)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Visitor Feed */}
        <div className="xl:col-span-1 glass-card p-12 flex flex-col">
           <div className="flex justify-between items-center mb-10 px-2">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-4 uppercase italic">
                <Activity className="text-[var(--primary)]" /> LOGS
              </h3>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] uppercase font-black text-white/30 tracking-widest group-hover:text-white transition-all">Streaming Live</span>
              </div>
           </div>

           <div className="space-y-6 flex-1 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide">
              <AnimatePresence>
                {visitorAlerts.map((alert) => (
                  <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-6 rounded-[24px] bg-white/5 border border-white/5 flex items-center gap-6 group hover:border-[var(--primary)]/30 transition-all cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all group-hover:scale-110" style={{ backgroundColor: `${alert.color}22`, border: `1px solid ${alert.color}44` }}>
                        {alert.device === 'Desktop' ? <Monitor size={24} style={{ color: alert.color }} /> : <Smartphone size={24} style={{ color: alert.color }} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h5 className="font-black text-md tracking-tight uppercase" style={{ color: alert.color }}>{alert.action}</h5>
                      </div>
                      <p className="text-white/40 font-medium text-xs tracking-tight">Active on <span className="text-white">{alert.page}</span></p>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-black text-[var(--primary)] tracking-widest uppercase">{alert.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
           <button className="w-full mt-10 py-5 bg-[var(--primary)] border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#000] hover:brightness-110 shadow-xl transition-all">Open Full Audit Log</button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
