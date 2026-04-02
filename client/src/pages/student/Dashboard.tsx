import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  ArrowUpRight, 
  Clock, 
  Target, 
  Rocket, 
  CheckCircle2,
  Building,
  MapPin,
  Calendar,
  TrendingUp,
  FileText,
  Award
} from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../hooks/useAuth';

const data = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 78 },
  { name: 'Apr', score: 85 },
];

const mockApplications = [
  {
    id: 1,
    company: 'Google',
    role: 'Software Engineer Intern',
    location: 'Bangalore',
    status: 'shortlisted',
    appliedDate: '2024-03-15',
    stipend: '₹50,000/month'
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'Frontend Developer',
    location: 'Hyderabad',
    status: 'applied',
    appliedDate: '2024-03-18',
    stipend: '₹45,000/month'
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Cloud Engineer',
    location: 'Chennai',
    status: 'interview',
    appliedDate: '2024-03-10',
    stipend: '₹60,000/month'
  }
];

const mockRecommendations = [
  {
    id: 1,
    company: 'Meta',
    role: 'React Developer',
    location: 'Remote',
    stipend: '₹55,000/month',
    match: '92%',
    skills: ['React', 'JavaScript', 'TypeScript']
  },
  {
    id: 2,
    company: 'Apple',
    role: 'iOS Developer',
    location: 'Cupertino',
    stipend: '$8,000/month',
    match: '88%',
    skills: ['Swift', 'iOS', 'Mobile']
  },
  {
    id: 3,
    company: 'Netflix',
    role: 'Full Stack Engineer',
    location: 'Los Gatos',
    stipend: '$10,000/month',
    match: '85%',
    skills: ['Node.js', 'React', 'AWS']
  }
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [readinessScore] = useState(78);
  const [activeApplications] = useState(5);
  const [profileViews] = useState(23);
  const [interviewsScheduled] = useState(2);

  const stats = [
    { label: 'Active Applications', value: activeApplications, icon: Briefcase, color: 'var(--gold-primary)' },
    { label: 'Profile Views', value: profileViews, icon: TrendingUp, color: 'var(--silver-primary)' },
    { label: 'Interviews Scheduled', value: interviewsScheduled, icon: Calendar, color: 'var(--gold-primary)' },
    { label: 'Placement Readiness', value: `${readinessScore}%`, icon: Award, color: 'var(--silver-primary)' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'text-silver-primary bg-silver-subtle';
      case 'shortlisted': return 'text-gold-primary bg-gold-subtle';
      case 'interview': return 'text-blue-400 bg-blue-subtle';
      case 'selected': return 'text-green-400 bg-green-subtle';
      case 'rejected': return 'text-red-400 bg-red-subtle';
      default: return 'text-silver-primary bg-silver-subtle';
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Welcome */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
           <h2 className="text-6xl font-black tracking-tighter mb-6 relative">
             Welcome back, <span className="gold-text gold-glow">{user?.name || 'Student'}</span> 👋
             <Rocket size={40} className="absolute -top-10 -right-4 text-gold-primary animate-bounce" />
           </h2>
           <p className="text-silver-primary font-medium text-lg leading-relaxed mb-8">
             Your AI-driven career path starts here. Review your readiness score and personalized matching opportunities.
           </p>
           <div className="flex gap-4">
             <button className="gold-btn flex items-center gap-2">
               <Target size={18} /> Update Profile
             </button>
             <button className="silver-btn flex items-center gap-2">
               <FileText size={18} /> Download Resume
             </button>
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
             </div>
             <p className="text-xs font-black uppercase tracking-widest text-silver-primary">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Recent Applications */}
      <section className="luxury-card p-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
            <div className="w-10 h-[2px] bg-gold-primary"></div> RECENT APPLICATIONS
          </h3>
          <button className="text-gold-primary hover:text-gold-secondary font-bold text-sm uppercase tracking-wider transition-colors">
            View All →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-silver-border">
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Company</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Role</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Location</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Stipend</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Status</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Applied</th>
              </tr>
            </thead>
            <tbody>
              {mockApplications.map((app) => (
                <tr key={app.id} className="border-b border-silver-border/50 hover:bg-gold-subtle/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black-pure border border-silver-border flex items-center justify-center">
                        <Building size={18} className="text-gold-primary" />
                      </div>
                      <span className="font-bold text-white">{app.company}</span>
                    </div>
                  </td>
                  <td className="py-4 text-silver-primary">{app.role}</td>
                  <td className="py-4 text-silver-primary flex items-center gap-2">
                    <MapPin size={14} /> {app.location}
                  </td>
                  <td className="py-4 text-gold-primary font-bold">{app.stipend}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 text-silver-primary">{app.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
            <div className="w-10 h-[2px] bg-gold-primary"></div> AI RECOMMENDATIONS
          </h3>
          <span className="text-xs font-black tracking-widest gold-text animate-pulse uppercase">Personalized for you</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockRecommendations.map((job) => (
            <motion.div key={job.id} className="luxury-card p-8 group hover:border-gold-primary transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-black-pure border border-silver-border flex items-center justify-center">
                  <Building size={24} className="text-gold-primary" />
                </div>
                <span className="px-3 py-1 bg-gold-primary text-black rounded-full text-xs font-bold uppercase tracking-wider">
                  {job.match} Match
                </span>
              </div>
              
              <h4 className="text-xl font-black tracking-tighter text-white mb-2">{job.role}</h4>
              <p className="text-gold-primary font-bold mb-4">{job.company}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-silver-primary text-sm">
                  <MapPin size={14} /> {job.location}
                </div>
                <div className="flex items-center gap-2 text-gold-primary font-bold text-sm">
                  <Award size={14} /> {job.stipend}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-black-pure border border-silver-border rounded text-xs text-silver-primary">
                    {skill}
                  </span>
                ))}
              </div>
              
              <button className="w-full gold-btn py-3 text-sm">
                Apply Now →
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="luxury-card p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
              <div className="w-10 h-[2px] bg-gold-primary"></div> PROGRESS TRACKER
            </h3>
            <span className="text-xs font-black tracking-widest gold-text animate-pulse uppercase">4 Month Trend</span>
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

        <div className="luxury-card p-10">
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
            <CheckCircle2 className="text-gold-primary" /> RECENT ACTIVITY
           </h3>
           <div className="space-y-8">
             {[
               { title: 'Resume Analyzed', time: '2h ago', status: 'Completed', color: 'green' },
               { title: 'Interview with Adobe', time: 'Tomorrow', status: 'Upcoming', color: 'orange' },
               { title: 'Skill Test Passed', time: 'Yesterday', status: 'Passed', color: 'blue' },
               { title: 'Profile Updated', time: '3 days ago', status: 'Updated', color: 'purple' }
             ].map((task, idx) => (
               <div key={idx} className="flex gap-6 items-center">
                 <div className="w-12 h-12 rounded-2xl bg-black-pure border border-silver-border flex items-center justify-center text-silver-primary">
                   <Clock size={20} />
                 </div>
                 <div className="flex-1">
                   <h6 className="font-bold text-sm tracking-tight text-white">{task.title}</h6>
                   <div className="flex items-center gap-3 mt-1">
                     <span className="text-xs font-black uppercase text-silver-primary tracking-widest">{task.time}</span>
                     <span className="w-1 h-1 rounded-full bg-silver-border"></span>
                     <span className="text-xs font-black uppercase tracking-widest text-gold-primary">{task.status}</span>
                   </div>
                 </div>
                 <ArrowUpRight size={16} className="text-silver-primary hover:text-gold-primary cursor-pointer" />
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
