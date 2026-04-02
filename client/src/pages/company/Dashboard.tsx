import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Plus, 
  Users, 
  MoreVertical, 
  Briefcase, 
  Award, 
  TrendingUp, 
  Mail, 
  CheckCircle2, 
  Clock,
  Building,
  Calendar,
  FileText,
  Search,
  Eye,
  Edit,
  Trash2,
  Target,
  BarChart3
} from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../../hooks/useAuth';

const CompanyDashboard: React.FC = () => {
  const auth = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for charts
  const applicationTrendsData = [
    { name: 'Mon', apps: 45, views: 120 },
    { name: 'Tue', apps: 52, views: 145 },
    { name: 'Wed', apps: 92, views: 189 },
    { name: 'Thu', apps: 68, views: 156 },
    { name: 'Fri', apps: 84, views: 178 },
    { name: 'Sat', apps: 32, views: 89 },
    { name: 'Sun', apps: 28, views: 76 }
  ];

  const skillsDemandData = [
    { skill: 'JavaScript', demand: 45 },
    { skill: 'React', demand: 38 },
    { skill: 'Python', demand: 32 },
    { skill: 'Node.js', demand: 28 },
    { skill: 'TypeScript', demand: 25 }
  ];

  // Pipeline candidates
  const pipeline = [
    { id: 1, name: 'Siddheshwar Mane', status: 'Applied', role: 'Full Stack Intern', score: 92, experience: '2 years', location: 'Mumbai', email: 'siddhesh@example.com' },
    { id: 2, name: 'Isha Rajput', status: 'Reviewing', role: 'Cybersecurity Intern', score: 88, experience: '1 year', location: 'Bangalore', email: 'isha@example.com' },
    { id: 3, name: 'Pankaj Deshmukh', status: 'Interview', role: 'React Developer', score: 95, experience: '3 years', location: 'Pune', email: 'pankaj@example.com' },
    { id: 4, name: 'Aditi Verma', status: 'Selected', role: 'Python Developer', score: 91, experience: '2 years', location: 'Delhi', email: 'aditi@example.com' },
    { id: 5, name: 'Rahul Sharma', status: 'Applied', role: 'Frontend Developer', score: 87, experience: '1 year', location: 'Hyderabad', email: 'rahul@example.com' },
    { id: 6, name: 'Priya Patel', status: 'Reviewing', role: 'Data Science Intern', score: 93, experience: '2 years', location: 'Chennai', email: 'priya@example.com' }
  ];

  // Job postings
  const jobPostings = [
    { id: 1, title: 'Full Stack Developer Intern', applications: 45, status: 'active', posted: '2024-03-01', deadline: '2024-04-15' },
    { id: 2, title: 'React Developer', applications: 32, status: 'active', posted: '2024-03-05', deadline: '2024-04-20' },
    { id: 3, title: 'Python Data Scientist', applications: 28, status: 'closed', posted: '2024-02-15', deadline: '2024-03-30' },
    { id: 4, title: 'Cybersecurity Analyst', applications: 19, status: 'active', posted: '2024-03-10', deadline: '2024-04-25' }
  ];

  const stats = [
    { label: 'Active Jobs', value: 8, icon: Briefcase, trend: '+2', color: 'var(--gold-primary)' },
    { label: 'Total Applicants', value: 245, icon: Users, trend: '+45', color: 'var(--gold-primary)' },
    { label: 'Shortlisted', value: 67, icon: Target, trend: '+12', color: 'var(--silver-primary)' },
    { label: 'Hired This Month', value: 12, icon: CheckCircle2, trend: '+5', color: 'var(--silver-primary)' }
  ];

  const columns = [
    { name: 'Applied', color: 'var(--silver-primary)', icon: Mail },
    { name: 'Reviewing', color: 'var(--gold-primary)', icon: Clock },
    { name: 'Interview', color: '#3B82F6', icon: Users },
    { name: 'Selected', color: '#10B981', icon: CheckCircle2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-subtle';
      case 'closed': return 'text-red-400 bg-red-subtle';
      case 'pending': return 'text-yellow-400 bg-yellow-subtle';
      default: return 'text-silver-primary bg-silver-subtle';
    }
  };

  const filteredCandidates = pipeline.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h2 className="text-6xl font-black tracking-tighter mb-4">COMPANY <span className="gold-text gold-glow">PORTAL</span></h2>
          <p className="text-silver-primary font-black text-xs uppercase tracking-[0.5em] mt-8 pl-1">Talent Acquisition & Management</p>
        </div>
        <div className="flex gap-4">
           <button className="gold-btn flex items-center gap-2">
             <Plus size={20} /> Post New Job
           </button>
           <button className="silver-btn flex items-center gap-2">
             <FileText size={20} /> Export Report
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="luxury-card p-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gold-subtle blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
             <stat.icon size={28} className="mb-6" style={{ color: stat.color }} />
             <div className="flex items-baseline gap-2 mb-2">
               <h4 className="text-4xl font-black tracking-tighter gold-text">{stat.value}</h4>
               <span className="text-sm font-bold text-green-400">{stat.trend}</span>
             </div>
             <p className="text-xs font-black uppercase tracking-widest text-silver-primary">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Trends */}
        <div className="luxury-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
              <div className="w-8 h-[2px] bg-gold-primary"></div> Application Trends
            </h3>
            <span className="text-xs font-black tracking-widest gold-text uppercase px-3 py-1 bg-gold-subtle rounded-full border border-gold-primary/30">7 Days</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTrendsData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--gold-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--gold-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--silver-border)" />
                <XAxis dataKey="name" stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--black-card)', border: '1px solid var(--gold-primary)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="apps" stroke="var(--gold-primary)" fillOpacity={1} fill="url(#colorApps)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Demand */}
        <div className="luxury-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
              <div className="w-8 h-[2px] bg-gold-primary"></div> Top Skills Demand
            </h3>
            <BarChart3 size={20} className="text-gold-primary" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--silver-border)" />
                <XAxis dataKey="skill" stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--black-card)', border: '1px solid var(--gold-primary)', borderRadius: '12px' }} />
                <Bar dataKey="demand" fill="var(--gold-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Job Postings Table */}
      <section className="luxury-card p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
            <div className="w-8 h-[2px] bg-gold-primary"></div> Job Postings
          </h3>
          <button className="gold-btn flex items-center gap-2">
            <Plus size={18} /> Create New Posting
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-silver-border">
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Job Title</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Applications</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Status</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Posted</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Deadline</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobPostings.map((job) => (
                <tr key={job.id} className="border-b border-silver-border/50 hover:bg-gold-subtle/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black-pure border border-silver-border flex items-center justify-center">
                        <Briefcase size={18} className="text-gold-primary" />
                      </div>
                      <span className="font-bold text-white">{job.title}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gold-primary font-bold">{job.applications}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4 text-silver-primary">{job.posted}</td>
                  <td className="py-4 text-silver-primary">{job.deadline}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gold-subtle rounded-lg transition-colors">
                        <Eye size={16} className="text-silver-primary" />
                      </button>
                      <button className="p-2 hover:bg-gold-subtle rounded-lg transition-colors">
                        <Edit size={16} className="text-silver-primary" />
                      </button>
                      <button className="p-2 hover:bg-red-subtle rounded-lg transition-colors">
                        <Trash2 size={16} className="text-silver-primary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Kanban Pipeline */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
            <div className="w-10 h-[2px] bg-gold-primary rounded-full"></div> Candidate Pipeline
          </h3>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-primary" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-black-pure border border-silver-border rounded-lg text-white placeholder-silver-primary focus:outline-none focus:border-gold-primary w-full md:w-64"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-black-pure border border-silver-border rounded-lg text-white focus:outline-none focus:border-gold-primary"
            >
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8">
          {columns.map((column, idx) => (
            <div key={idx} className="min-w-[350px] bg-black-pure border border-silver-border rounded-xl p-6 flex flex-col shrink-0">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${column.color}22`, color: column.color }}>
                      <column.icon size={18} />
                    </div>
                    <h5 className="font-bold uppercase text-sm text-white">{column.name}</h5>
                 </div>
                 <span className="text-xs font-bold text-silver-primary bg-black-pure px-3 py-1 rounded-full border border-silver-border">
                   {filteredCandidates.filter(p => p.status === column.name).length}
                 </span>
               </div>

               <div className="space-y-4 flex-1">
                 {filteredCandidates.filter(p => p.status === column.name).map((candidate) => (
                   <motion.div key={candidate.id} className="p-4 rounded-lg bg-black-pure border border-silver-border hover:border-gold-primary hover:bg-gold-subtle transition-all group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-primary/20 to-silver-primary/20 border border-silver-border flex items-center justify-center text-silver-primary font-bold text-lg group-hover:scale-110 transition-transform">
                           {candidate.name.charAt(0)}
                         </div>
                         <div className="flex items-center gap-2">
                           <span className="text-lg font-bold gold-text">{candidate.score}%</span>
                           <button className="p-1 text-silver-primary hover:text-gold-primary transition-colors">
                             <MoreVertical size={16} />
                           </button>
                         </div>
                      </div>
                      <h6 className="font-bold text-white mb-1 group-hover:text-gold-primary transition-colors">{candidate.name}</h6>
                      <p className="text-xs text-silver-primary mb-3">{candidate.role}</p>
                      
                      <div className="space-y-2 text-xs text-silver-primary">
                        <div className="flex items-center gap-2">
                          <Building size={12} /> {candidate.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} /> {candidate.experience} experience
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-silver-border flex gap-2">
                        <button className="flex-1 py-2 bg-gold-primary text-black rounded-lg font-bold text-xs hover:brightness-110 transition-all">
                          View Profile
                        </button>
                        <button className="flex-1 py-2 bg-black-pure border border-silver-border rounded-lg font-bold text-xs hover:border-gold-primary transition-all">
                          Message
                        </button>
                      </div>
                   </motion.div>
                 ))}
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyDashboard;
